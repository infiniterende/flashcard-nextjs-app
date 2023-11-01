import z from "zod";

const createFlashcardSchema = z.object({
  question: z.string().min(1),
  answer: z.string().min(1),
});

export default createFlashcardSchema;
