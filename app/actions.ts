"use server";

import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client";
import createFlashcardSchema from "@/app/createFlashcardSchema";
import z from "zod";

type FlashcardForm = z.infer<typeof createFlashcardSchema>;

async function createFlashcard(formData: FlashcardForm) {
  // server action

  // check's user's input and make sure they're valid
  // create new record in db
  const flashcard = await prisma.flashcard.create({
    data: {
      question: formData.question,
      answer: formData.answer,
    },
  });

  console.log(flashcard);
  // redirect to home page

  redirect("/flashcards");
}

async function getFlashcards() {
  const flashcards = await prisma.flashcard.findMany();
  console.log(flashcards);

  return flashcards;
}

export { createFlashcard, getFlashcards };
