/* eslint-disable react-native/no-inline-styles */
import React from "react";
import {
  View,
  Modal,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from "react-native";
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
        <TouchableWithoutFeedback
          onPress={() => {
            setShow(false);
          }}
        >
          <View style={styles.modalOverlay} />
        </TouchableWithoutFeedback>
        <View style={[styles.modalView, { backgroundColor: colors.primary }]}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-around",
              alignItems: "center",
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              backgroundColor: colors.primaryLight,
              padding: 5,
            }}
          >
            <Text style={{ flex: 1 }}>{localization.lifeline}</Text>
            <View>
              <MaterialCommunityIcons
                name={"close"}
                key={`${restartText}-close`}
                size={25}
                onPress={() => {
                  setShow(false);
                }}
              />
            </View>
          </View>
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
                <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
                  {"50:50"}
                </Text>
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
              <Text style={{ fontFamily: "Arial", fontSize: 15 }}>
                {restartText}
              </Text>
            </MaterialCommunityIcons.Button>
          </View>
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
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
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
