import { StyleSheet } from "react-native";

export const base = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10,
  },
  containerTab: {
    paddingVertical: 14,
    paddingHorizontal: 16,
  },
});
