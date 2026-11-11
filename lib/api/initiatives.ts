import {
  CreateInitiativeInput,
  GetInitiativeParams,
  Initiative,
} from "@/types/api/initiative";
import { api } from "./client";

export const getInitiatives = async (
  signal: AbortSignal,
  params?: GetInitiativeParams,
): Promise<Initiative[]> => {
  const response = await api.get<Initiative[]>("/initiatives", {
    params,
    signal,
  });
  return response.data;
};

export const createInitiative = async (
  input: CreateInitiativeInput,
): Promise<Initiative> => {
  const response = await api.post<Initiative>("/initiatives", input);
  return response.data;
};
