"use server";

import prisma from "@/prisma/client";
import { redirect } from "next/navigation";

async function getDecks() {
  const decks = await prisma.deck.findMany();
  return decks;
}

async function createDeck(formData: { title: string }) {
  const deck = await prisma.deck.create({
    data: {
      title: formData.title,
    },
  });
  console.log(deck);
  redirect("/decks");
}

async function getDeck({ title }: { title: string }) {
  const deck = await prisma.deck.findFirst({
    where: {
      title: title,
    },
    include: {
      flashcards: true,
    },
  });
  return deck;
}

async function getFlashcardsByDeck(id: number) {
  const flashcards = await prisma.flashcard.findMany({
    where: {
      deckId: id,
      NOT: {
        deckId: null,
      },
    },
  });
  console.log(flashcards);

  return flashcards;
}

async function updateDeck({
  id,
  title,
  flashcard,
}: {
  id: number | undefined;
  title: string;
  flashcard: any;
}) {
  const newFlashcard = await prisma.flashcard.create({
    data: {
      question: flashcard.question,
      answer: flashcard.answer,
      deckId: id,
    },
  });

  console.log(newFlashcard);

  redirect(`/decks/${title}`);
}

export { getDecks, getDeck, createDeck, updateDeck, getFlashcardsByDeck };
