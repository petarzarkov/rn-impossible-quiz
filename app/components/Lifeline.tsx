/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, QuestionParsed } from "../contracts";
import { ModalBase } from "./ModalBase";

export const Lifeline: React.FC<{
  colors: Colors;
  showLifelineModal: boolean;
  questions: QuestionParsed[];
  restartQuiz: () => void;
  restartText: string;
  localization: Record<string, string>;
  setShow: (show: boolean) => void;
  fiddyFiddy: () => void;
  showFiddy: boolean;
}> = ({
  showLifelineModal,
  restartQuiz,
  restartText,
  colors,
  setShow,
  fiddyFiddy,
  showFiddy,
  localization,
}) => {
  return (
    <View>
      <ModalBase
        visible={showLifelineModal}
        onDismiss={() => setShow(!showLifelineModal)}
        colors={colors}
        title={localization.lifeline}
      >
        {showFiddy ? (
          <View style={{ padding: 5 }}>
            <MaterialCommunityIcons.Button
              name={"circle-half-full"}
              key={`${restartText}-fiddy-fiddy`}
              backgroundColor={colors.accent}
              onPress={() => {
                fiddyFiddy();
                setShow(false);
              }}
            >
              <Text>{"50:50"}</Text>
            </MaterialCommunityIcons.Button>
          </View>
        ) : null}
        <View style={{ padding: 5 }}>
          <MaterialCommunityIcons.Button
            name={"restart"}
            key={`${restartText}-restart`}
            backgroundColor={colors.accent}
            onPress={() => {
              restartQuiz();
            }}
          >
            <Text>{restartText}</Text>
          </MaterialCommunityIcons.Button>
        </View>
      </ModalBase>
    </View>
  );
};
