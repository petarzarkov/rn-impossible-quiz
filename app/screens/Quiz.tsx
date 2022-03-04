/* eslint-disable react-native/no-inline-styles */
import React, { useState, useEffect, useRef, useReducer } from "react";
import {
  Animated,
  ScrollView,
  View,
  ActivityIndicator,
  Text,
} from "react-native";
import {
  ButtonBase,
  Lifeline,
  ProgressBar,
  Question,
  Score,
} from "../components";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, QuestionParsed, QuizState } from "../contracts";
import { base } from "../styles";
import { getData, storeData } from "../store";
import { HotObj } from "../utils";
import { useInterval } from "../hooks";

export const Quiz: React.FC<{
  questions: QuestionParsed[];
  isLoading: boolean;
  refreshQuestions: () => void;
  storeQuestionsInPlace: (questions: string) => void;
  localization: Record<string, string>;
  colors: Colors;
}> = ({
  questions,
  refreshQuestions,
  storeQuestionsInPlace,
  localization,
  isLoading,
  colors,
}) => {
  const isInitialMount = useRef(true);
  const [defaultLives, setDefaultLives] = useState(
    Math.round((questions?.length || 3) / 3) || 1,
  );
  const progress = useRef(new Animated.Value(0)).current;
  const [prevState, updatePrevState] = useState<QuizState | null>(null);
  // eslint-disable-next-line no-spaced-func
  const [currState, updateState] = useReducer<
    (state: QuizState, updates: Partial<QuizState>) => QuizState
  >(
    (state, updates) => {
      updatePrevState(state);
      return {
        ...state,
        ...updates,
      };
    },
    {
      questionIndx: 0,
      answer: null,
      correctAnswer: null,
      answersDisabled: false,
      score: 0,
      showNextButton: false,
      showScoreModal: false,
      showLifeline: false,
      lives: defaultLives,
      livesIcons: [...Array(defaultLives).keys()].map(_icon => "heart"),
      lifeline: { hasFiddy: true },
      progress: useRef(new Animated.Value(0)).current,
    },
  );

  const preserveQuizState = () => {
    if (
      !prevState ||
      !HotObj.shallowEquals(prevState, currState) ||
      !HotObj.shallowEquals(prevState.lifeline, currState.lifeline)
    ) {
      updatePrevState(currState);
      storeData("latest_quiz", currState);
    }
  };

  useInterval(preserveQuizState, 2000);

  const showScoreDead = (timeout = 800) => {
    return new Promise(resolve =>
      setTimeout(() => {
        updateState({
          showScoreModal: true,
          showLifeline: false,
        });
        resolve("OK");
      }, timeout),
    );
  };

  const fiddyFiddy = () => {
    const currentIncorrectAnswers = questions[
      currState.questionIndx
    ]?.answers?.filter(
      a => a !== questions[currState.questionIndx].correctAnswer,
    );

    if (currentIncorrectAnswers.length) {
      questions[currState.questionIndx].answers = [
        currentIncorrectAnswers[
          Math.floor(Math.random() * currentIncorrectAnswers.length)
        ],
        questions[currState.questionIndx].correctAnswer,
      ].sort(() => Math.random() - 0.5);

      updateState({
        lifeline: { ...currState.lifeline, hasFiddy: false },
      });
      storeQuestionsInPlace(JSON.stringify(questions));
    }
  };

  const initFromStorage = async () => {
    const prevData = await getData<QuizState>("latest_quiz");

    if (prevData) {
      updateState(prevData);
    }

    return prevData || currState;
  };

  useEffect(() => {
    // Did mount
    if (isInitialMount.current) {
      isInitialMount.current = false;
      initFromStorage();
    }
  });

  useEffect(() => {
    if (currState.lives === 0) {
      showScoreDead();
    }
  }, [currState.lives]);

  useEffect(() => {
    if (questions?.length) {
      const defLives = Math.round((questions?.length || 3) / 3) || 1;
      setDefaultLives(defLives);
      updateState({
        lives: defLives,
        livesIcons: [...Array(defLives).keys()].map(_icon => "heart"),
      });
    }
  }, [questions?.length]);

  const validateAnswer = (selectedOption: string) => {
    const nextCorrectAnswer = questions[currState.questionIndx].correctAnswer;
    updateState({
      answer: selectedOption,
      correctAnswer: nextCorrectAnswer,
      answersDisabled: true,
    });

    if (selectedOption === nextCorrectAnswer) {
      updateState({
        score: currState.score + 1,
        showNextButton: true,
      });
      return;
    }

    const latestLiveIcon = currState.livesIcons.lastIndexOf("heart");
    if (latestLiveIcon !== -1) {
      currState.livesIcons[latestLiveIcon] = "heart-broken";
    }

    updateState({
      lives: currState.lives - 1,
      livesIcons: currState.livesIcons,
      showNextButton: true,
    });

    return;
  };

  const handleNext = () => {
    const currIndex = currState.questionIndx;
    Animated.timing(progress, {
      toValue: currIndex + 1,
      duration: 500,
      useNativeDriver: false,
    }).start();
    if (currState.questionIndx === questions.length - 1) {
      updateState({
        showScoreModal: true,
        showLifeline: false,
      });
      return;
    }

    updateState({
      questionIndx: currIndex + 1,
      answer: null,
      correctAnswer: null,
      answersDisabled: false,
      showNextButton: false,
    });
    return;
  };

  const restartQuiz = () => {
    updateState({
      answer: null,
      correctAnswer: null,
      questionIndx: 0,
      score: 0,
      lives: defaultLives,
      livesIcons: [...Array(defaultLives).keys()].map(_icon => "heart"),
      answersDisabled: false,
      showNextButton: false,
      showScoreModal: false,
      lifeline: { ...currState.lifeline, hasFiddy: true },
    });

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

  const setShowLifeline = (showLifeline: boolean) => {
    updateState({ showLifeline });
  };

  const {
    lives,
    livesIcons,
    showScoreModal,
    showNextButton,
    showLifeline,
    score,
    questionIndx,
    answersDisabled,
    correctAnswer,
    lifeline,
    answer,
  } = currState;
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
          currQIndx: questionIndx,
          questions,
          answersDisabled,
          correctAnswer,
          currAnswer: answer,
          validateAnswer,
          localization,
        }}
      />
      {!answersDisabled ? (
        <View style={{ padding: 5, maxWidth: "50%" }}>
          <MaterialCommunityIcons.Button
            name={"pulse"}
            backgroundColor={colors.accent}
            size={15}
            key={`${questions[questionIndx]?.question}-pulse`}
            onPress={() => {
              setShowLifeline(true);
            }}
          >
            <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
              {localization.lifeline}
            </Text>
          </MaterialCommunityIcons.Button>
        </View>
      ) : null}
      <ButtonBase
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
          fiddyFiddy,
          showFiddy:
            lifeline.hasFiddy && questions[questionIndx]?.answers?.length > 2,
          showLifelineModal: showLifeline,
          setShow: setShowLifeline,
          questions,
          localization,
        }}
      />
    </ScrollView>
  );
};
