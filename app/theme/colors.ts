import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "../contracts";

const Base = {
  primary: "#252c4a",
  primaryLight: "#9cbff7",
  secondary: "#1E90FF",
  accent: "#3498db",

  success: "#00C851",
  error: "#ff4444",
};

export const Dark: Colors = {
  ...DefaultTheme.colors,
  ...Base,
  primary: "#424242",
  accent: "#1b1b1b",
  primaryLight: "#6d6d6d",
  text: "#eeeeee",
  background: "#bdbdbd",
};

export const Light: Colors = {
  ...DefaultTheme.colors,
  ...Base,
  primary: "#eeeeee",
  accent: "#bcbcbc",
  primaryLight: "#ffffff",
  text: "#f5f5f5",
  background: "#616161",
};
