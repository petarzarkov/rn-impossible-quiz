/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef } from "react";
import {
  Animated,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import { Button, Lifeline, ProgressBar, Question, Score } from "../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, QuestionParsed } from "../contracts";
import { base } from "../styles";

export const Quiz: React.FC<{
  questions: QuestionParsed[];
  isLoading: boolean;
  refreshQuestions: () => void;
  localization: Record<string, string>;
  colors: Colors;
}> = ({ questions, refreshQuestions, localization, isLoading, colors }) => {
  const [defaultLives, setDefaultLives] = useState(
    Math.round((questions?.length || 3) / 3) || 1,
  );
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
  const [showLifeline, setShowLifeline] = useState(false);
  const progress = useRef(new Animated.Value(0)).current;

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

  useEffect(() => {
    if (questions?.length) {
      const defLives = Math.round((questions?.length || 3) / 3) || 1;
      setLives(defLives);
      setDefaultLives(defLives);
      setLivesIcons([...Array(defLives).keys()].map(_icon => "heart"));
    }
  }, [questions?.length]);

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
      duration: 500,
      useNativeDriver: false,
    }).start();
    if (currQIndx === questions.length - 1) {
      setShowScoreModal(true);
      return;
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

    setCurrQIndx(0);
    setScore(0);

    setCurrAnswer(null);
    setCorrectOption(null);
    setAnswersDisabled(false);
    setShowNextButton(false);
    setShowScoreModal(false);
    return new Promise(resolve => {
      Animated.timing(progress, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start(({ finished }) => {
        resolve(finished);
      });
    });
  };

  return isLoading ? (
    <View style={[base.container, base.horizontal]}>
      <ActivityIndicator size="large" animating color={colors.accent} />
    </View>
  ) : (
    <ScrollView style={[base.containerTab]}>
      <ProgressBar {...{ progress, upper: questions.length, colors }} />
      <Question
        {...{
          colors,
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
      <View style={{ padding: 5, maxWidth: "50%" }}>
        <MaterialCommunityIcons.Button
          name={"pulse"}
          backgroundColor={colors.accent}
          size={15}
          key={`${questions[currQIndx]?.question}-pulse`}
          onPress={() => {
            setShowLifeline(true);
          }}
        >
          <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
            {localization.lifeline}
          </Text>
        </MaterialCommunityIcons.Button>
      </View>
      <Button
        {...{
          colors,
          btnText: localization.nextBtn,
          show: showNextButton && !showScoreModal && lives !== 0,
          handlePress: handleNext,
          btnStyle: {
            padding: 15,
            marginTop: 20,
          },
        }}
      />
      {/** Empty jsx to fill space after next button on overflow content */}
      <View style={{ padding: 20 }} />
      <Score
        {...{
          colors,
          lives,
          restartHandle: restartQuiz,
          restartText: localization.retryBtn,
          newGameText: localization.newGameText,
          newGameHandle: () => {
            restartQuiz().then(() => refreshQuestions());
          },
          score,
          showScoreModal,
          questions,
          localization,
        }}
      />
      <Lifeline
        {...{
          colors,
          restartText: localization.restartQuiz,
          restartQuiz: () => {
            setShowLifeline(false);
            restartQuiz().then(() => refreshQuestions());
          },
          showLifelineModal: showLifeline,
          setShow: setShowLifeline,
          questions,
          localization,
        }}
      />
    </ScrollView>
  );
};
