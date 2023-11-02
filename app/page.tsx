import Image from "next/image";
import { Button } from "@radix-ui/themes";
import Link from "next/link";
import "@radix-ui/themes/styles.css";

export default function Home() {
  return (
    <div>
      <Button>
        <Link href="/flashcards/new">New Flashcard</Link>
      </Button>
    </div>
  );
}
