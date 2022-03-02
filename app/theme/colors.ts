import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "../contracts";

const Base = {
  ...DefaultTheme.colors,
  success: "#00C851",
  error: "#ff4444",
};

export const Dark: Colors = {
  ...Base,
  primary: "#424242",
  accent: "#1b1b1b",
  primaryLight: "#6d6d6d",
  text: "#eeeeee",
  background: "#bdbdbd",
};

export const Light: Colors = {
  ...Base,
  primary: "#eeeeee",
  accent: "#bcbcbc",
  primaryLight: "#ffffff",
  text: "#f5f5f5",
  background: "#616161",
};
