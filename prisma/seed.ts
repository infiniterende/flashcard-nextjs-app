import { PrismaClient } from "@prisma/client";
import getData from "./data.js";

const prisma = new PrismaClient();

const { decks, flashcards } = getData();
console.log(decks);

const load = async () => {
  try {
    await prisma.deck.deleteMany();
    console.log("Deleted decks in product table");

    await prisma.flashcard.deleteMany();

    console.log("Added deck data");

    flashcards.map(
      async (card) =>
        await prisma.flashcard.create({
          data: {
            question: card.question,
            answer: card.answer,
          },
        })
    );

    const resFlashcards = await prisma.flashcard.findMany();

    decks.map(
      async (deck) =>
        await prisma.deck.create({
          data: {
            title: deck.title,
          },
        })
    );

    console.log("Added flashcard data");
  } catch (e) {
    console.error(e);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
};

load();
