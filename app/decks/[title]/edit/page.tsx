"use client";

import React, { useState, useEffect } from "react";
import { useRouter, redirect, useParams } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import SimpleMdeReact from "react-simplemde-editor";

import { TextField, Button, Text } from "@radix-ui/themes";

import createFlashcardSchema from "@/app/createFlashcardSchema";
import Spinner from "@/app/components/Spinner";

import "easymde/dist/easymde.min.css";

import { getDeck, updateDeck } from "../../actions";

type FlashcardForm = z.infer<typeof createFlashcardSchema>;

const EditDeckPage = () => {
  const { title } = useParams<any>();
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FlashcardForm>({ resolver: zodResolver(createFlashcardSchema) });

  useEffect(() => {
    async function getDeckId() {
      const deck = await getDeck(title);
      setDeckId(deck?.id);
      console.log("deck", deck?.id);
    }
    getDeckId();
  }, []);

  const [deckId, setDeckId] = useState<number>();
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await updateDeck({ id: deckId, title, flashcard: data });
      router.push(`/decks/${title}`);
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

export default EditDeckPage;
