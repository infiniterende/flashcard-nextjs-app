"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import SimpleMdeReact from "react-simplemde-editor";

import { TextField, Button, Text } from "@radix-ui/themes";

import createFlashcardSchema from "@/app/createFlashcardSchema";
import Spinner from "@/app/components/Spinner";

import "easymde/dist/easymde.min.css";

type FlashcardForm = z.infer<typeof createFlashcardSchema>;

const NewFlashcardPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FlashcardForm>({ resolver: zodResolver(createFlashcardSchema) });

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await axios.post("/api/flashcards", data);
      router.push("/flashcards");
    } catch (error) {
      setIsSubmitting(false);
      setError("An unexpected error has occurred.");
    }
  });

  return (
    <div className="max-w-xl">
      <form className="space-y-5" onSubmit={onSubmit}>
        <TextField.Root>
          <TextField.Input
            size="3"
            variant="soft"
            placeholder="Question"
            {...register("question")}
          />
        </TextField.Root>

        <Controller
          name="answer"
          control={control}
          render={({ field }) => (
            <SimpleMdeReact placeholder="Answer" {...field} />
          )}
        />

        <Button disabled={isSubmitting}>Add Flashcard</Button>
      </form>
    </div>
  );
};

export default NewFlashcardPage;
