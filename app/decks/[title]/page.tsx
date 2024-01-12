"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import { useRouter, redirect, useParams } from "next/navigation";
import { Box, Card, Flex, Grid, Heading, Text } from "@radix-ui/themes";
import { notFound } from "next/navigation";

import { getDeck, getFlashcardsByDeck } from "../actions";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

interface Props {
  params: { title: string };
}

type Flashcard = {
  question: string;
  answer: string;
};
const DeckDetailPage = ({ params }: Props) => {
  const [flashcards, setFlashcards] = useState<any>([]);
  const [deckId, setDeckId] = useState<any>();

  const { title } = useParams<any>();

  useEffect(() => {
    async function getDeckId() {
      const deck = await getDeck(title);
      setDeckId(deck?.id);
      console.log("deck", deck?.id);
    }
    getDeckId();
  }, []);

  useEffect(() => {
    async function fetchDeckFlashcards() {
      const response = await getFlashcardsByDeck(deckId);
      response && setFlashcards(response);
    }
    fetchDeckFlashcards();
    console.log("flashcard", flashcards);
  }, []);

  return (
    <div>
      <Card className="prose">{params.title.toUpperCase()}</Card>
      <Link href={`/decks/${params.title}/edit`}></Link>
      {flashcards.map((flashcard: any) => (
        <Accordion type="single" collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger>{flashcard.question}</AccordionTrigger>
            <AccordionContent>{flashcard.answer}</AccordionContent>
          </AccordionItem>
        </Accordion>
      ))}
    </div>
  );
};

export default DeckDetailPage;
