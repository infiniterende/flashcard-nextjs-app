"use client";

import React, { useState } from "react";
import { useRouter, redirect } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod";
import SimpleMdeReact from "react-simplemde-editor";

import { TextField, Button, Text } from "@radix-ui/themes";

import Spinner from "@/app/components/Spinner";

import { createDeck } from "../actions";

type DeckForm = {
  title: string;
};
const NewDeckPage = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<DeckForm>();

  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = handleSubmit(async (data) => {
    try {
      setIsSubmitting(true);
      await createDeck(data);
      router.push("/decks");
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
            placeholder="Title"
            {...register("title")}
          />
        </TextField.Root>

        <Button disabled={isSubmitting}>Add Deck</Button>
      </form>
    </div>
  );
};

export default NewDeckPage;
