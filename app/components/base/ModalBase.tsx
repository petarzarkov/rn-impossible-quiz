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
import { useQuizProvider } from "../../hooks";

export const ModalBase: React.FC<{
  visible: boolean;
  onDismiss: () => void;
  title: string;
}> = ({ visible, onDismiss, title, children }) => {
  const { colors } = useQuizProvider() || {};
  return (
    <View style={[styles.centeredView]}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        collapsable
        onRequestClose={() => {
          onDismiss();
        }}
      >
        <TouchableWithoutFeedback
          onPress={() => {
            onDismiss();
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
            <Text style={{ flex: 1, color: colors.border }}>{title}</Text>
            <View>
              <MaterialCommunityIcons
                name={"close"}
                color={colors.border}
                key={`${title}-close`}
                size={25}
                onPress={() => {
                  onDismiss();
                }}
              />
            </View>
          </View>
          {children}
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
