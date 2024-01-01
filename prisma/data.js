const decks = [
  { title: "Computer Science" },
  { title: "Physiology" },
  { title: "Biochemistry" },
];

const flashcards = [
  {
    deck: "Physiology",
    question: "What is an action potential?",
    answer:
      "A transmission of electrical signals from nerve cell to nerve cell that is characterized by a depolarization and subsequent repolarization",
  },
  {
    deck: "Physiology",
    question: "What is the percentage of ECF vs ICF of Total Body Water?",
    answer: "ECF is 1/3, ICF is 2/3 TBW",
  },
  {
    deck: "Physiology",
    question: "What is osmolarity?",
    answer: "Concentration of particles in solution",
  },
];

const getData = () => {
  return { decks, flashcards };
};

export default getData;
