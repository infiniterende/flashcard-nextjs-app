"use client";

import prisma from "@/prisma/client";
import React from "react";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

interface Props {
  params: { id: string };
}

const FlashcardDetailPage = async ({ params }: Props) => {
  const flashcard = await prisma.flashcard.findFirst({
    where: {
      id: parseInt(params.id),
    },
  });
  if (!flashcard) return notFound();
  return <Card className="prose">{flashcard.question}</Card>;
};

export default FlashcardDetailPage;
