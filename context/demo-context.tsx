"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type {
  DemoActionResult,
  DemoActivity,
  DemoInitiative,
  DemoRegistration,
  DemoState,
  DemoUser,
  RegisterActivityResult,
} from "@/types/demo";
import { DEMO_SEED_STATE } from "@/data/demo-seed";

const STORAGE_KEY = "mubadara-demo-v1";

const EMPTY_DEMO_STATE: DemoState = DEMO_SEED_STATE;

export type SignUpInput = Pick<
  DemoUser,
  "firstName" | "lastName" | "email" | "password"
>;

type CreateInitiativeInput = Pick<
  DemoInitiative,
  "title" | "description" | "summary" | "coverImage" | "region" | "gallery"
>;

type CreateActivityInput = Pick<
  DemoActivity,
  "title" | "location" | "startDate" | "maxParticipants"
> & { initiativeId: string };

type DemoContextValue = {
  state: DemoState;
  currentUser: DemoUser | null;
  isReady: boolean;
  signUp: (input: SignUpInput) => DemoActionResult;
  login: (email: string, password: string) => DemoActionResult;
  logout: () => void;
  getInitiatives: () => DemoInitiative[];
  getInitiativeById: (id: string) => DemoInitiative | undefined;
  getActivitiesByInitiative: (initiativeId: string) => DemoActivity[];
  getRegistrationsForCurrentUser: () => DemoRegistration[];
  followInitiative: (initiativeId: string) => DemoActionResult;
  unfollowInitiative: (initiativeId: string) => DemoActionResult;
  createInitiative: (input: CreateInitiativeInput) => DemoActionResult;
  createActivity: (input: CreateActivityInput) => DemoActionResult;
  registerForActivity: (activityId: string) => RegisterActivityResult;
  cancelRegistration: (activityId: string) => DemoActionResult;
  resetDemo: () => void;
};

const DemoContext = createContext<DemoContextValue | null>(null);

function makeId(prefix: string) {
  return `${prefix}_${globalThis.crypto?.randomUUID?.() ?? `${Date.now()}_${Math.random().toString(36).slice(2)}`}`;
}

function now() {
  return new Date().toISOString();
}

export function DemoProvider({
  children,
  initialState = EMPTY_DEMO_STATE,
}: {
  children: ReactNode;
  initialState?: DemoState;
}) {
  const [state, setState] = useState<DemoState>(initialState);
  const stateRef = useRef<DemoState>(initialState);
  const [isReady, setIsReady] = useState(false);

  // Apply updates synchronously to the ref so action methods can return
  // reliable success/error results immediately, while React renders the new state.
  const updateState = useCallback((updater: (prev: DemoState) => DemoState) => {
    const next = updater(stateRef.current);
    stateRef.current = next;
    setState(next);
  }, []);

  // Load persisted demo data once on the client.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as DemoState;
        stateRef.current = parsed;
        setState(parsed);
      }
    } catch (error) {
      console.error("Could not load Mubadara demo data:", error);
    } finally {
      setIsReady(true);
    }
  }, []);

  // Do not write to localStorage before the initial read is complete.
  useEffect(() => {
    if (!isReady) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (error) {
      console.error("Could not save Mubadara demo data:", error);
    }
  }, [state, isReady]);

  const currentUser =
    state.users.find((user) => user.id === state.currentUserId) ?? null;

  const signUp = useCallback(
    (input: SignUpInput): DemoActionResult => {
      const email = input.email.trim().toLowerCase();
      if (
        !input.firstName.trim() ||
        !input.lastName.trim() ||
        !email ||
        !input.password
      ) {
        return {
          success: false,
          message: "Please complete all required fields.",
        };
      }

      let result: DemoActionResult = {
        success: false,
        message: "Could not create account.",
      };

      updateState((prev) => {
        if (prev.users.some((user) => user.email.toLowerCase() === email)) {
          result = {
            success: false,
            message: "An account with this email already exists.",
          };
          return prev;
        }

        const user: DemoUser = {
          id: makeId("user"),
          firstName: input.firstName.trim(),
          lastName: input.lastName.trim(),
          email,
          password: input.password,
        };

        result = { success: true, message: "Account created successfully." };
        return {
          ...prev,
          users: [...prev.users, user],
          currentUserId: user.id,
        };
      });

      return result;
    },
    [updateState],
  );

  const login = useCallback(
    (emailInput: string, password: string): DemoActionResult => {
      const email = emailInput.trim().toLowerCase();
      let result: DemoActionResult = {
        success: false,
        message: "Invalid email or password.",
      };

      updateState((prev) => {
        const user = prev.users.find(
          (item) =>
            item.email.toLowerCase() === email && item.password === password,
        );
        if (!user) return prev;

        result = { success: true, message: "Logged in successfully." };
        return { ...prev, currentUserId: user.id };
      });

      return result;
    },
    [updateState],
  );

  const logout = useCallback(() => {
    updateState((prev) => ({ ...prev, currentUserId: null }));
  }, [updateState]);

  const getInitiatives = useCallback(
    () => state.initiatives,
    [state.initiatives],
  );

  const getInitiativeById = useCallback(
    (id: string) => state.initiatives.find((item) => item.id === id),
    [state.initiatives],
  );

  const getActivitiesByInitiative = useCallback(
    (initiativeId: string) =>
      state.activities.filter(
        (activity) => activity.initiativeId === initiativeId,
      ),
    [state.activities],
  );

  const getRegistrationsForCurrentUser = useCallback(() => {
    if (!state.currentUserId) return [];
    return state.registrations.filter(
      (item) =>
        item.userId === state.currentUserId && item.status !== "CANCELLED",
    );
  }, [state.currentUserId, state.registrations]);

  const followInitiative = useCallback(
    (initiativeId: string): DemoActionResult => {
      let result: DemoActionResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;
        const initiative = prev.initiatives.find(
          (item) => item.id === initiativeId,
        );
        if (!initiative) {
          result = { success: false, message: "Initiative not found." };
          return prev;
        }
        if (initiative.followerIds.includes(prev.currentUserId)) {
          result = {
            success: false,
            message: "You already follow this initiative.",
          };
          return prev;
        }

        result = {
          success: true,
          message: "You are now following this initiative.",
        };
        return {
          ...prev,
          initiatives: prev.initiatives.map((item) =>
            item.id === initiativeId
              ? {
                  ...item,
                  followerIds: [...item.followerIds, prev.currentUserId!],
                }
              : item,
          ),
        };
      });

      return result;
    },
    [updateState],
  );

  const unfollowInitiative = useCallback(
    (initiativeId: string): DemoActionResult => {
      let result: DemoActionResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;
        const initiative = prev.initiatives.find(
          (item) => item.id === initiativeId,
        );
        if (!initiative) {
          result = { success: false, message: "Initiative not found." };
          return prev;
        }

        result = { success: true, message: "You unfollowed this initiative." };
        return {
          ...prev,
          initiatives: prev.initiatives.map((item) =>
            item.id === initiativeId
              ? {
                  ...item,
                  followerIds: item.followerIds.filter(
                    (id) => id !== prev.currentUserId,
                  ),
                }
              : item,
          ),
        };
      });

      return result;
    },
    [updateState],
  );

  const createInitiative = useCallback(
    (input: CreateInitiativeInput): DemoActionResult => {
      let result: DemoActionResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;

        const initiative: DemoInitiative = {
          ...input,
          id: makeId("initiative"),
          organizerId: prev.currentUserId,
          followerIds: [],
          contributorIds: [],
          activityIds: [],
          createdAt: now(),
        };

        result = { success: true, message: "Initiative created successfully." };
        return { ...prev, initiatives: [initiative, ...prev.initiatives] };
      });

      return result;
    },
    [updateState],
  );

  const createActivity = useCallback(
    (input: CreateActivityInput): DemoActionResult => {
      let result: DemoActionResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;

        const initiative = prev.initiatives.find(
          (item) => item.id === input.initiativeId,
        );
        if (!initiative) {
          result = { success: false, message: "Initiative not found." };
          return prev;
        }
        if (initiative.organizerId !== prev.currentUserId) {
          result = {
            success: false,
            message: "Only the initiative organizer can add activities.",
          };
          return prev;
        }

        const activity: DemoActivity = {
          ...input,
          id: makeId("activity"),
          createdAt: now(),
        };

        result = { success: true, message: "Activity created successfully." };
        return {
          ...prev,
          activities: [...prev.activities, activity],
          initiatives: prev.initiatives.map((item) =>
            item.id === input.initiativeId
              ? { ...item, activityIds: [...item.activityIds, activity.id] }
              : item,
          ),
        };
      });

      return result;
    },
    [updateState],
  );

  const registerForActivity = useCallback(
    (activityId: string): RegisterActivityResult => {
      let result: RegisterActivityResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;

        const activity = prev.activities.find((item) => item.id === activityId);
        if (!activity) {
          result = { success: false, message: "Activity not found." };
          return prev;
        }

        const existing = prev.registrations.find(
          (item) =>
            item.userId === prev.currentUserId &&
            item.activityId === activityId &&
            item.status !== "CANCELLED",
        );
        if (existing) {
          result = {
            success: false,
            message: "You are already registered for this activity.",
          };
          return prev;
        }

        const confirmedCount = prev.registrations.filter(
          (item) =>
            item.activityId === activityId && item.status === "CONFIRMED",
        ).length;

        const status =
          confirmedCount < activity.maxParticipants
            ? "CONFIRMED"
            : "WAITLISTED";

        const registration: DemoRegistration = {
          id: makeId("registration"),
          userId: prev.currentUserId,
          activityId,
          status,
          createdAt: now(),
        };

        result = {
          success: true,
          status,
          message:
            status === "CONFIRMED"
              ? "You have successfully registered."
              : "The activity is full. You have been added to the waiting list.",
        };

        return {
          ...prev,
          registrations: [...prev.registrations, registration],
        };
      });

      return result;
    },
    [updateState],
  );

  const cancelRegistration = useCallback(
    (activityId: string): DemoActionResult => {
      let result: DemoActionResult = {
        success: false,
        message: "Please log in first.",
      };

      updateState((prev) => {
        if (!prev.currentUserId) return prev;

        const registration = prev.registrations.find(
          (item) =>
            item.userId === prev.currentUserId &&
            item.activityId === activityId &&
            item.status !== "CANCELLED",
        );

        if (!registration) {
          result = { success: false, message: "Registration not found." };
          return prev;
        }

        result = {
          success: true,
          message: "Your registration has been cancelled.",
        };
        return {
          ...prev,
          registrations: prev.registrations.map((item) =>
            item.id === registration.id
              ? { ...item, status: "CANCELLED" }
              : item,
          ),
        };
      });

      return result;
    },
    [updateState],
  );

  const resetDemo = useCallback(() => {
    stateRef.current = EMPTY_DEMO_STATE;
    setState(EMPTY_DEMO_STATE);
    window.localStorage.removeItem(STORAGE_KEY);
  }, []);

  const value = useMemo<DemoContextValue>(
    () => ({
      state,
      currentUser,
      isReady,
      signUp,
      login,
      logout,
      getInitiatives,
      getInitiativeById,
      getActivitiesByInitiative,
      getRegistrationsForCurrentUser,
      followInitiative,
      unfollowInitiative,
      createInitiative,
      createActivity,
      registerForActivity,
      cancelRegistration,
      resetDemo,
    }),
    [
      state,
      currentUser,
      isReady,
      signUp,
      login,
      logout,
      getInitiatives,
      getInitiativeById,
      getActivitiesByInitiative,
      getRegistrationsForCurrentUser,
      followInitiative,
      unfollowInitiative,
      createInitiative,
      createActivity,
      registerForActivity,
      cancelRegistration,
      resetDemo,
    ],
  );

  return <DemoContext.Provider value={value}>{children}</DemoContext.Provider>;
}

export function useDemo() {
  const context = useContext(DemoContext);
  if (!context) {
    throw new Error("useDemo must be used inside DemoProvider.");
  }
  return context;
}
