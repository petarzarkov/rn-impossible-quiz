/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text, Modal } from "react-native";
import { Colors, QuestionParsed } from "../contracts";
import { ButtonBase } from "./base";
import ConfettiCannon from "react-native-confetti-cannon";

export const Score: React.FC<{
  colors: Colors;
  lives: number;
  score: number;
  showScoreModal: boolean;
  questions: QuestionParsed[];
  restartHandle: () => void;
  restartText: string;
  newGameText: string;
  newGameHandle: () => void;
  localization: Record<string, string>;
}> = ({
  lives,
  score,
  showScoreModal,
  questions,
  restartHandle,
  restartText,
  newGameText,
  newGameHandle,
  localization,
  colors,
}) => {
  const hasWon = questions.length === score || lives > 0;
  return (
    <Modal animationType="slide" transparent={true} visible={showScoreModal}>
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {hasWon ? (
          <ConfettiCannon count={200} origin={{ x: -10, y: 0 }} />
        ) : null}
        <View
          style={{
            backgroundColor: colors.background,
            width: "90%",
            borderRadius: 20,
            padding: 20,
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 30, fontWeight: "bold" }}>
            {hasWon ? localization.congratz : localization.fail}
          </Text>

          <View
            style={{
              flexDirection: "row",
              justifyContent: "flex-start",
              alignItems: "center",
              marginVertical: 20,
            }}
          >
            <Text
              style={{
                fontSize: 30,
                color: hasWon ? colors.success : colors.error,
              }}
            >
              {`${score} `}
            </Text>
            <Text
              style={{
                fontSize: 20,
                color: colors.text,
              }}
            >
              / {questions.length}
            </Text>
          </View>
          <ButtonBase
            {...{
              colors,
              handlePress: restartHandle,
              btnText: restartText,
              btnStyle: {
                borderRadius: 20,
              },
            }}
          />
          <ButtonBase
            {...{
              colors,
              handlePress: newGameHandle,
              btnText: newGameText,
              btnStyle: {
                marginTop: 25,
                borderRadius: 20,
              },
            }}
          />
        </View>
      </View>
    </Modal>
  );
};
