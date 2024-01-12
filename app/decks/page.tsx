"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getDecks } from "./actions";

import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

type Deck = {
  title: string;
};

const DecksPage = () => {
  const [decks, setDecks] = useState<Deck[]>([]);

  useEffect(() => {
    async function fetchDecks() {
      const response = await getDecks();
      setDecks(response);
    }
    fetchDecks();
  }, []);

  const displayedDecks = decks.map((deck) => (
    <MenubarItem>
      {" "}
      <Link href={`/decks/${deck.title.toLowerCase()}`}>{deck.title}</Link>
    </MenubarItem>
  ));

  return (
    <div>
      <Menubar>
        <MenubarMenu>
          <MenubarTrigger>Decks</MenubarTrigger>
          <MenubarContent>{displayedDecks}</MenubarContent>
        </MenubarMenu>
      </Menubar>
    </div>
  );
};

export default DecksPage;
