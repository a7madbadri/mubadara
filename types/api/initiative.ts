import { CreateInitiativeSchema } from "@/shcemas/initiatives";
import type { User } from "./auth";
import type { ApiResponse } from "./common";
import z from "zod";

export type InitiativeStatus = "ACTIVE" | "CANCELLED" | "COMPLETED";

export type Initiative = {
  id: string;
  title: string;
  description: string;
  status: InitiativeStatus;
  location: string;
  startDate: string;
  endDate: string;
  coverImage: string | null;
  followersCount: number;
  activitiesCount: number;
  createdAt: Date;
};

export type InitiativeOrganizer = Omit<User, "email" | "role">;

export type InitiativeResponse = ApiResponse<
  Initiative & {
    organizer: InitiativeOrganizer;
  }
>;

export type CreateInitiativeInput = z.infer<typeof CreateInitiativeSchema>;

export type GetInitiativeParams = {
  status?: InitiativeStatus;
  location?: string;
  search?: string;
};
