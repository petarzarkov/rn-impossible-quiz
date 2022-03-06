import React from "react";
import { QuizContext } from "../context";

export function useQuizProvider() {
  const context = React.useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuizProvider must be used within a QuizProvider");
  }

  return context;
}
