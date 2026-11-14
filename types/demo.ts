export type DemoUser = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string; // DEMO ONLY: never store plaintext passwords in production.
};

export type DemoRegion = {
  state: string;
  city: string;
};

export type DemoActivity = {
  id: string;
  initiativeId: string;
  title: string;
  location: string;
  startDate: string;
  maxParticipants: number;
  createdAt: string;
};

export type DemoInitiative = {
  id: string;
  organizerId: string;
  title: string;
  description: string;       // Long description
  summary: string;           // Short one/two-line description
  coverImage: string;        // Local public path, e.g. /images/initiative.jpg
  region: DemoRegion;
  gallery: string[];
  followerIds: string[];
  contributorIds: string[];
  activityIds: string[];
  createdAt: string;
};

export type DemoRegistration = {
  id: string;
  userId: string;
  activityId: string;
  status: "CONFIRMED" | "WAITLISTED" | "CANCELLED";
  createdAt: string;
};

export type DemoState = {
  users: DemoUser[];
  currentUserId: string | null;
  initiatives: DemoInitiative[];
  activities: DemoActivity[];
  registrations: DemoRegistration[];
};

export type DemoActionResult =
  | { success: true; message: string }
  | { success: false; message: string };

export type RegisterActivityResult =
  | { success: true; status: "CONFIRMED" | "WAITLISTED"; message: string }
  | { success: false; message: string };
