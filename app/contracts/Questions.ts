export type QuestionRaw = {
  question: string;
  category: string;
  type: string;
  difficulty: string;
  correct_answer: string;
  incorrect_answers: string[];
};

export type QuestionParsed = {
  question: string;
  answers: string[];
  correctAnswer: string;
  category: string;
  difficulty: string;
};
