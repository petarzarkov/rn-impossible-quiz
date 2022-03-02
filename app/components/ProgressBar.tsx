import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { Colors } from "../contracts";

export const ProgressBar: React.FC<{
  colors: Colors;
  progress: Animated.Value;
  upper: number;
}> = ({ progress, upper, colors }) => {
  const progressAnim = progress.interpolate({
    inputRange: [0, upper],
    outputRange: ["0%", "100%"],
  });

  return (
    <View
      style={[
        progressStyles.progress,
        { backgroundColor: colors.primaryLight },
      ]}
    >
      <Animated.View
        style={[
          progressStyles.animation,
          {
            width: progressAnim,
            backgroundColor: colors.accent,
          },
        ]}
      />
    </View>
  );
};

const progressStyles = StyleSheet.create({
  progress: {
    width: "100%",
    height: 20,
    borderRadius: 20,
  },
  animation: {
    height: 20,
    borderRadius: 20,
  },
});
