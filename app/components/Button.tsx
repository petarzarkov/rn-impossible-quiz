import React from "react";
import { Text, TextStyle, TouchableOpacity, ViewStyle } from "react-native";
import { colors } from "../theme";

export const Button: React.FC<{
  show?: boolean;
  handlePress: () => void;
  btnText: string;
  btnStyle?: ViewStyle;
  btnTextStyle?: TextStyle;
  disabled?: boolean;
}> = (
  {
    show = true,
    handlePress,
    btnText,
    btnStyle,
    btnTextStyle,
    disabled = false,
  } = {} as any,
) => {
  if (show) {
    return (
      <TouchableOpacity
        disabled={disabled}
        onPress={handlePress}
        style={[
          // eslint-disable-next-line react-native/no-inline-styles
          {
            width: "100%",
            backgroundColor: colors.accent,
            padding: 20,
            borderRadius: 5,
          },
          btnStyle && btnStyle,
        ]}
      >
        <Text
          style={[
            // eslint-disable-next-line react-native/no-inline-styles
            { fontSize: 20, color: colors.white, textAlign: "center" },
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
