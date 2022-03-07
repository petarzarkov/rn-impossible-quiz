/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Text } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuizProvider } from "../hooks";
import { AlertBase, ModalBase } from "./base";

export const Lifeline: React.FC<{
  showLifelineModal: boolean;
  restartQuiz: () => void;
  setShow: (show: boolean) => void;
  fiddyFiddy: () => void;
  showFiddy: boolean;
}> = ({ showLifelineModal, restartQuiz, setShow, fiddyFiddy, showFiddy }) => {
  const { colors, localization } = useQuizProvider() || {};

  return (
    <>
      <ModalBase
        visible={showLifelineModal}
        onDismiss={() => setShow(!showLifelineModal)}
        title={localization.lifeline}
      >
        <View
          style={{
            flexDirection: "column",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: 180,
          }}
        >
          {showFiddy ? (
            <View style={{ padding: 5 }}>
              <MaterialCommunityIcons.Button
                name={"circle-half-full"}
                key={`${localization.restartQuiz}-fiddy-fiddy`}
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
              key={`${localization.restartQuiz}-restart`}
              backgroundColor={colors.accent}
              onPress={() => {
                setShow(false);
                return AlertBase({
                  title: "Are you sure?",
                  message: "You want to restart?",
                  onCancel: () => {
                    setShow(true);
                  },
                  onOk: () => {
                    restartQuiz();
                  },
                });
              }}
            >
              <Text>{localization.restartQuiz}</Text>
            </MaterialCommunityIcons.Button>
          </View>
        </View>
      </ModalBase>
    </>
  );
};
