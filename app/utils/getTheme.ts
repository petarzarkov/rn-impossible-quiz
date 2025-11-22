import { ColorSchemeName } from "react-native";
import { Colors } from "../contracts";
import { Dark, Light } from "../theme";

export const getTheme = (
  theme: ColorSchemeName,
): { isDarkMode: boolean; colors: Colors } => {
  const currentTheme = theme || "dark";
  const isDarkMode = currentTheme === "dark";

  return {
    isDarkMode,
    colors: isDarkMode ? Dark : Light,
  };
};
