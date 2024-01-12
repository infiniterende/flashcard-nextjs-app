"use client";

import React, { useState, useEffect } from "react";
import { getFlashcards } from "./actions";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const FlashcardPage = async () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setFlashcards] = useState<any>();

  useEffect(() => {
    const flashcards = async () => {
      const data = await getFlashcards();
      setFlashcards(data);
      console.log(data);
    };
    flashcards();
  }, []);

  return (
    <div className="flex items-center justify-center">
      <Carousel className="w-full flex align-center justify-center max-w-md">
        <CarouselContent>
          {flashcards?.map((flashcard: any, index: number) => (
            <CarouselItem key={index}>
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-video items-center justify-center p-6">
                    {!showAnswer && (
                      <span className="">{flashcard.question}</span>
                    )}
                    {showAnswer && <span className="">{flashcard.answer}</span>}
                  </CardContent>
                </Card>
                <div className="flex flex-col items-center justify-center p-6">
                  <Button onClick={() => setShowAnswer(!showAnswer)}>
                    {showAnswer ? "Hide Answer" : "Show Answer"}
                  </Button>
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FlashcardPage;
