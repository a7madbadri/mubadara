"use client";

import InitiativesList from "@/components/InitiativeList";
import { CreateInitiativeSchema } from "@/shcemas/initiatives";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { CreateInitiativeInput } from "@/types/api/initiative";
import { createInitiative } from "@/lib/api/initiatives";
import { isAxiosError } from "axios";
import useInitiatives from "@/hooks/useInitiatives";
import InputField from "@/components/InputField";

export default function Home() {
  const initiativesData = useInitiatives({
    status: "ACTIVE",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { isSubmitting },
  } = useForm<CreateInitiativeInput>({
    resolver: zodResolver(CreateInitiativeSchema),
    defaultValues: {
      title: "",
      description: "",
      location: "",
      startDate: "",
      endDate: "",
      coverImage: null,
    },
  });
  const onSubmit = async (data: CreateInitiativeInput) => {
    try {
      const initiative = await createInitiative(data);
      console.log("Create: ", initiative);
      initiativesData.retry();
      reset();
    } catch (error) {
      if (isAxiosError(error)) {
        console.log(error.response?.status, error.response?.data);
      } else {
        console.error(error);
      }
    }
  };
  return (
    <div className="p-3">
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <InputField type="text" {...register("title")} />
        <input type="text" {...register("description")} />
        <input type="text" {...register("location")} />
        <input type="date" {...register("startDate")} />
        <input type="date" {...register("endDate")} />
        <button
          className="bg-slate-300 px-5 rounded-full h-10 cursor-pointer disabled:opacity-50"
          disabled={isSubmitting}
        >
          Create Initiative
        </button>
      </form>
      <InitiativesList {...initiativesData} />
    </div>
  );
}
