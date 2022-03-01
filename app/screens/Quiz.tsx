import React, { useState, useEffect } from "react";
import { Animated, ScrollView, StyleSheet } from "react-native";
import { Button, ProgressBar, Question, Score, PickLang } from "../components";
import { QuestionParsed } from "../contracts";

export const Quiz: React.FC<{
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
  questions: QuestionParsed[];
  refreshQuestions: () => void;
  localization: Record<string, string>;
}> = ({ lang, setLang, questions, refreshQuestions, localization }) => {
  const defaultLives = Math.round(questions.length / 3) || 1;
  const [currQIndx, setCurrQIndx] = useState(0);
  const [currAnswer, setCurrAnswer] = useState<string | null>(null);
  const [correctAnswer, setCorrectOption] = useState<string | null>(null);
  const [answersDisabled, setAnswersDisabled] = useState(false);
  const [score, setScore] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [showScoreModal, setShowScoreModal] = useState(false);
  const [lives, setLives] = useState(defaultLives);
  const [livesIcons, setLivesIcons] = useState(
    [...Array(lives).keys()].map(_icon => "heart"),
  );
  const [progress] = useState(new Animated.Value(0));

  const showScoreDead = (timeout = 800) => {
    return new Promise(resolve =>
      setTimeout(() => {
        setShowScoreModal(true);
        resolve("OK");
      }, timeout),
    );
  };

  useEffect(() => {
    if (lives === 0) {
      showScoreDead();
    }
  }, [lives]);

  const validateAnswer = (selectedOption: string) => {
    const nextCorrectAnswer = questions[currQIndx].correctAnswer;
    setCurrAnswer(selectedOption);
    setCorrectOption(nextCorrectAnswer);
    setAnswersDisabled(true);
    if (selectedOption === nextCorrectAnswer) {
      setScore(score + 1);
      return setShowNextButton(true);
    }

    setLives(lives - 1);
    const latestLiveIcon = livesIcons.lastIndexOf("heart");
    if (latestLiveIcon !== -1) {
      livesIcons[latestLiveIcon] = "heart-broken";
      setLivesIcons(livesIcons);
    }

    return setShowNextButton(true);
  };

  const handleNext = () => {
    Animated.timing(progress, {
      toValue: currQIndx + 1,
      duration: 1000,
      useNativeDriver: false,
    }).start();
    if (currQIndx === questions.length - 1) {
      return setShowScoreModal(true);
    }

    setCurrQIndx(currQIndx + 1);
    setCurrAnswer(null);
    setCorrectOption(null);
    setAnswersDisabled(false);
    setShowNextButton(false);
    return;
  };

  const restartQuiz = () => {
    setLives(defaultLives);
    setLivesIcons([...Array(defaultLives).keys()].map(_icon => "heart"));
    setShowScoreModal(false);

    setCurrQIndx(0);
    setScore(0);

    setCurrAnswer(null);
    setCorrectOption(null);
    setAnswersDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false,
    }).start();
  };

  return (
    <ScrollView style={styles.quiz}>
      <PickLang {...{ lang, setLang }} />
      <ProgressBar {...{ progress, upper: questions.length }} />
      <Question
        {...{
          livesIcons,
          show: !showScoreModal,
          score,
          currQIndx,
          questions,
          answersDisabled,
          correctAnswer,
          currAnswer,
          validateAnswer,
          localization,
        }}
      />
      <Button
        {...{
          btnText: localization.nextBtn,
          show: showNextButton && !showScoreModal && lives !== 0,
          handlePress: handleNext,
          btnStyle: {
            padding: 15,
            marginTop: 20,
          },
        }}
      />
      <Score
        {...{
          lives,
          restartHandle: restartQuiz,
          restartText: localization.retryBtn,
          newGameText: localization.newGameText,
          newGameHandle: () => {
            restartQuiz();
            refreshQuestions();
          },
          score,
          showScoreModal,
          questions,
          localization,
        }}
      />
    </ScrollView>
  );
};

export const styles = StyleSheet.create({
  quiz: {
    flex: 1,
    paddingVertical: 15,
    paddingHorizontal: 16,
  },
});
