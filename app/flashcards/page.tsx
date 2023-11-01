"use client";

import React from "react";
import prisma from "@/prisma/client";

const FlashcardPage = async () => {
  const flashcards = await prisma.flashcard.findMany();
  return <div>FlashcardPage</div>;
};

export default FlashcardPage;
