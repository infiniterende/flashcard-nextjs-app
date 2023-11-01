import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

const createFlashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createFlashcardSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newFlashcard = await prisma.flashcard.create({
    data: {
      question: body.question,
      answer: body.answer,
      deckId: body.deck.id || null,
      userId: body.user.id || null,
    },
  });

  return NextResponse.json(newFlashcard, { status: 201 });
}
