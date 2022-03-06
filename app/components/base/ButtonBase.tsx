import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { useQuizProvider } from "../../hooks";

export const ButtonBase: React.FC<{
  show?: boolean;
  handlePress: () => void;
  btnText: string | number;
  btnStyle?: ViewStyle;
  btnTextStyle?: TextStyle;
  disabled?: boolean;
}> = ({
  show = true,
  handlePress,
  btnText,
  btnStyle,
  btnTextStyle,
  disabled = false,
}) => {
  const { colors } = useQuizProvider() || {};
  if (show) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: "100%",
            backgroundColor: colors.primaryLight,
            borderColor: colors.primary,
            padding: 20,
            borderRadius: 5,
          },
          btnStyle && btnStyle,
        ]}
      >
        <Text
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { fontSize: 20, color: colors.border, textAlign: "center" },
            btnTextStyle && btnTextStyle,
          ]}
        >
          {btnText}
        </Text>
      </TouchableOpacity>
    );
  }

  return null;
};
