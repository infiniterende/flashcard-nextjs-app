import { NextRequest, NextResponse } from "next/server";
import z from "zod";
import prisma from "@/prisma/client";

const createDeckSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export async function POST(request: NextRequest) {
  const body = await request.json();
  const validation = createDeckSchema.safeParse(body);
  if (!validation.success) {
    return NextResponse.json(validation.error.errors, { status: 400 });
  }

  const newDeck = await prisma.deck.create({
    data: {
      title: body.title,
      user: body.user,
    },
  });

  return NextResponse.json(newDeck, { status: 201 });
}
