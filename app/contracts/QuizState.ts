import { Animated } from "react-native";

export type QuizState = {
  questionIndx: number;
  answer: string | null;
  correctAnswer: string | null;
  answersDisabled: boolean;
  score: number;
  showNextButton: boolean;
  showScoreModal: boolean;
  showLifeline: boolean;
  lives: number;
  livesIcons: string[];
  lifeline: {
    hasFiddy: boolean;
  };
  progress: Animated.Value;
};
