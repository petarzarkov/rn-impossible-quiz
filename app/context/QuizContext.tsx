import React from "react";
import { Colors, Expand, QuestionParsed } from "../contracts";
import { localization } from "../config";

export type QuizSettings = {
  theme: "light" | "dark";
  lang: "en" | "bg";
  numberOfQ: "random" | number;
  category: string;
};

export type QuizBaseProvider = Expand<
{
  colors: Colors;
  localization: typeof localization[Pick<QuizSettings, "lang">["lang"]];
  isLoading: boolean;
  questions: QuestionParsed[];
} & QuizSettings
>;

export type QuizContextState = Expand<
QuizBaseProvider & {
  setCategory: (category: string) => void;
  setTheme: (theme: "light" | "dark") => void;
  setLang: (lang: "en" | "bg") => void;
  setNumberOfQ: (n: "random" | number) => void;
  storeQuestionsInPlace: (questions: QuestionParsed[]) => void;
  refreshQuestions: () => Promise<void>;
}
>;

export const QuizContext = React.createContext<QuizContextState | undefined>(
  undefined,
);
