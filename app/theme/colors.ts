import { DefaultTheme } from "@react-navigation/native";
import { Colors } from "../contracts";

const Base = {
  ...DefaultTheme.colors,
  success: "#00C851",
  error: "#ff4444",
  accent: "#ff5722",
};

export const Dark: Colors = {
  ...Base,
  primary: "#424242",
  primaryLight: "#8d8d8d",
  text: "#eeeeee",
  background: "#bdbdbd",
};

export const Light: Colors = {
  ...Base,
  primary: "#eeeeee",
  primaryLight: "#ffffff",
  text: "#f5f5f5",
  background: "#616161",
};
