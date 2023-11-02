"use client";

import React, { useState, useEffect } from "react";
import { Button, Card } from "@radix-ui/themes";
import axios from "axios";
import Spinner from "../components/Spinner";

const FlashcardPage = async () => {
  const [showAnswer, setShowAnswer] = useState(false);
  const [flashcards, setFlashcards] = useState<any>();

  const fetchData = async () => {
    const response = await axios.get("/api/flashcards");
    setFlashcards(response.data.flashcards);
  };

  useEffect(() => {
    fetchData();
  }, []);

  console.log(flashcards);
  return (
    <div className="flex items-center justify-center content-center">
      {flashcards?.map((flashcard: any) => (
        <div>
          {!showAnswer && (
            <div className="flex items-center justify-center content-center max-w-sm p-20 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 m-4">
              {" "}
              {flashcard.question}
            </div>
          )}
          {showAnswer && (
            <div className="flex max-w-sm p-20  items-center justify-center content-center bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              {" "}
              {flashcard.answer}
            </div>
          )}
          <div className="flex items-center justify-center content-center">
            <Button
              color="cyan"
              variant="soft"
              onClick={() => setShowAnswer(!showAnswer)}
            >
              {showAnswer ? "Hide Answer" : "Show Answer"}
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FlashcardPage;
