import z from "zod";

export const CreateInitiativeSchema = z.object({
  title: z.string().min(1, "can't less than 1"),
  description: z.string().min(1, "can't less than 1"),
  location: z.string().min(1, "can't less than 1"),
  startDate: z.string().min(1, "start date can't be empty"),
  endDate: z.string().min(1, "end date can't be empty"),
  coverImage: z.string().nullable(),
});
