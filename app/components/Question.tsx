/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { colors } from "../theme";
import { text } from "../styles";
import { QuestionParsed } from "../contracts";

export const Question: React.FC<{
  livesIcons: string[];
  show?: boolean;
  score: number;
  currQIndx: number;
  questions: QuestionParsed[];
  answersDisabled: boolean;
  correctAnswer: string | null;
  currAnswer: string | null;
  validateAnswer: (answ: string) => void;
  localization: Record<string, string>;
}> = ({
  livesIcons,
  show = true,
  score,
  currQIndx,
  questions,
  answersDisabled,
  correctAnswer,
  currAnswer,
  validateAnswer,
  localization,
}) => {
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
          <Text style={text.grey}>
            {" "}
            <Text
              style={{
                color: colors.white,
                fontSize: 20,
                opacity: 0.6,
                marginRight: 2,
              }}
            >
              {currQIndx + 1}
            </Text>{" "}
            / {questions.length}
          </Text>
          <Text style={text.grey}>
            {localization.score}: {score}
          </Text>
        </View>
        <View>
          <Text style={text.grey}>
            {localization.difficulty}: {questions[currQIndx]?.difficulty}
          </Text>
        </View>
        <View>
          <Text style={text.grey}>
            {localization.category}: {questions[currQIndx]?.category}
          </Text>
        </View>
        <View>
          <Text style={text.grey}>
            {localization.lives}:{" "}
            {livesIcons.map((lIcon, icoIndex) => (
              <MaterialCommunityIcons
                name={lIcon}
                key={`${questions[currQIndx]?.question}-${lIcon}-${icoIndex}`}
                style={{
                  color: colors.error,
                  fontSize: 20,
                }}
              />
            ))}
          </Text>
        </View>
        <Text
          style={{
            color: colors.white,
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
                    : colors.secondary + "40",
                backgroundColor:
                  answer === correctAnswer
                    ? colors.success + "20"
                    : answer === currAnswer
                    ? colors.error + "20"
                    : colors.secondary + "20",
                height: 60,
                borderRadius: 20,
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
                paddingHorizontal: 20,
                marginVertical: 5,
              }}
            >
              <Text style={{ fontSize: 20, color: colors.white }}>
                {answer}
              </Text>
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
                      color: colors.white,
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
                      color: colors.white,
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
