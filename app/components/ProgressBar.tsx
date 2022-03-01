import React from "react";
import { View, Animated, StyleSheet } from "react-native";
import { colors } from "../theme";

export const ProgressBar: React.FC<{
  progress: Animated.Value;
  upper: number;
}> = ({ progress, upper }) => {
  const progressAnim = progress.interpolate({
    inputRange: [0, upper],
    outputRange: ["0%", "100%"],
  });

  return (
    <View style={progressStyles.progress}>
      <Animated.View
        style={[
          progressStyles.animation,
          {
            width: progressAnim,
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
    backgroundColor: "#00000020",
  },
  animation: {
    height: 20,
    borderRadius: 20,
    backgroundColor: colors.accent,
  },
});
