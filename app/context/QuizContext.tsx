import React from "react";
import { Colors, Expand, QuestionParsed } from "../contracts";
import { localization } from "../config";

export type QuizSettings = {
  theme: "light" | "dark";
  lang: "en" | "bg";
  numberOfQ: "random" | number;
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