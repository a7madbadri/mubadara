import type { ApiResponse } from "./common";

export type UserRole = "MEMBER" | "ADMIN";

export type User = {
  id: string;
  name: string;
  email: string;
  avatar: string | null;
  role: UserRole;
};

export type AuthData = {
  user: User;
  accessToken: string;
};

export type AuthResponse = ApiResponse<AuthData>;
export type CurrentUserResponse = ApiResponse<User>;

export type LoginCredentials = {
  email: string;
  password: string;
};
