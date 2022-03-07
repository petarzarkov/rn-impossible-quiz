/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { text } from "../styles";
import { useQuizProvider } from "../hooks";

export const Question: React.FC<{
  show?: boolean;
  score: number;
  currQIndx: number;
  answersDisabled: boolean;
  correctAnswer: string | null;
  currAnswer: string | null;
  validateAnswer: (answ: string) => void;
}> = ({
  show = true,
  score,
  currQIndx,
  answersDisabled,
  correctAnswer,
  currAnswer,
  validateAnswer,
}) => {
  const { colors, localization, questions } = useQuizProvider() || {};
  if (show) {
    return (
      <View
        style={{
          marginVertical: 5,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Text style={[text.base, { color: colors.primaryLight }]}>
            {" "}
            <Text
              style={{
                color: colors.accent,
                fontSize: 20,
                opacity: 0.6,
                marginRight: 2,
              }}
            >
              {currQIndx + 1}
            </Text>{" "}
            / {questions.length}
          </Text>
          <Text>
            <Text style={[text.base, { color: colors.primaryLight }]}>
              {`${localization.score}: `}
            </Text>
            <Text style={[text.base, { color: colors.accent }]}>
              {score}
            </Text>
          </Text>
        </View>
        <View>
          <Text style={[text.base, { color: colors.primaryLight }]}>
            {localization.difficulty}: {questions[currQIndx]?.difficulty}
          </Text>
        </View>
        <View>
          <Text style={[text.base, { color: colors.primaryLight }]}>
            {localization.category}: {questions[currQIndx]?.category}
          </Text>
        </View>
        <Text
          style={{
            color: colors.text,
            fontSize: 20,
          }}
        >
          {questions[currQIndx]?.question}
        </Text>
        <View>
          {questions[currQIndx]?.answers.map(answer => (
            <TouchableOpacity
              onPress={() => validateAnswer(answer)}
              disabled={answersDisabled}
              key={answer}
              style={{
                borderWidth: 3,
                borderColor:
                  answer === correctAnswer
                    ? colors.success
                    : answer === currAnswer
                      ? colors.error
                      : colors.background + "40",
                backgroundColor:
                  answer === correctAnswer
                    ? colors.success + "20"
                    : answer === currAnswer
                      ? colors.error + "20"
                      : colors.background + "20",
                minHeight: 60,
                maxHeight: 120,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 20, color: colors.text }}>{answer}</Text>
              {answer === correctAnswer ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: colors.success,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="check"
                    style={{
                      color: colors.text,
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : answer === currAnswer ? (
                <View
                  style={{
                    width: 30,
                    height: 30,
                    borderRadius: 30 / 2,
                    backgroundColor: colors.error,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <MaterialCommunityIcons
                    name="close"
                    style={{
                      color: colors.text,
                      fontSize: 20,
                    }}
                  />
                </View>
              ) : null}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    );
  }

  return null;
};
