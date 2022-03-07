import React, { FC, useState } from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { useQuizProvider } from "../hooks";

const Dropdown: FC<{ label: string; isToggled?: boolean }> = ({ label, children, isToggled }) => {
  const [toggled, setToggled] = useState(!!isToggled);
  const { colors } = useQuizProvider() || {};
  const toggleDropdown = () => {
    setToggled(!toggled);
  };

  const renderDropdown = () => {
    if (toggled) {
      return (children);
    }
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, { backgroundColor: colors.background }]}
        onPress={toggleDropdown}
      >
        <Text style={[styles.buttonText, { color: colors.text }]}>{label}</Text>
        <Icon name={toggled ? "chevron-up" : "chevron-down"} style={[styles.icon, { color: colors.accent }]}/>
      </TouchableOpacity>
      {renderDropdown()}
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 15,
    zIndex: 1,
    padding: 15,
    margin: 5,
  },
  buttonText: {
    flex: 1,
    fontSize: 18,
    textAlign: "center",
  },
  icon: {
    fontSize: 26,
  },
});

export default Dropdown;
