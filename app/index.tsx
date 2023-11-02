import type { GetServerSideProps } from "next";
import prisma from "@/prisma/client";

export const getServerSideProps = async () => {
  const flashcards = await prisma.flashcard.findMany();
  return {
    props: { flashcards },
  };
};
