/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { View, Modal, Text, StyleSheet } from "react-native";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { Colors, QuestionParsed } from "../contracts";

export const Lifeline: React.FC<{
  colors: Colors;
  showLifelineModal: boolean;
  questions: QuestionParsed[];
  restartQuiz: () => void;
  restartText: string;
  localization: Record<string, string>;
  setShow: (show: boolean) => void;
}> = ({ showLifelineModal, restartQuiz, restartText, colors, setShow }) => {
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={showLifelineModal}
        collapsable
        onRequestClose={() => {
          setShow(false);
        }}
      >
        <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
          <View style={{ alignSelf: "flex-end" }}>
            <MaterialCommunityIcons
              name={"close"}
              key={`${restartText}-close`}
              size={25}
              onPress={() => {
                setShow(false);
              }}
            />
          </View>
          <MaterialCommunityIcons.Button
            name={"restart"}
            key={`${restartText}-restart`}
            backgroundColor={colors.accent}
            onPress={() => {
              restartQuiz();
            }}
          >
            <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
              {restartText}
            </Text>
          </MaterialCommunityIcons.Button>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    margin: 20,
    borderRadius: 20,
    padding: 5,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
