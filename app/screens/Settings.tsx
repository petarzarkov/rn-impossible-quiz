import React from "react";
import {
  ColorSchemeName,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { PickLang, PickNumberQuestions, PickTheme } from "../components";
import { Colors } from "../contracts";
import { base, text } from "../styles";

export const Settings: React.FC<{
  colors: Colors;
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
  localization: Record<string, string>;
  setNumberOfQ: (n: "random" | number) => void;
  numberOfQ: "random" | number;
  refreshQuestions: () => void;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}> = ({
  lang,
  setLang,
  localization,
  setNumberOfQ,
  numberOfQ,
  theme,
  setTheme,
  colors,
}) => {
  const languages = ["en", "bg"];
  const numberOfQuestions = ["random", 20, 35, 50, 80];
  return (
    <ScrollView style={base.containerTab}>
      <View>
        <Text style={[text.grey, settings.box]}>
          {localization.themeSettings}
        </Text>
        <PickTheme {...{ theme, setTheme, colors }} />
      </View>
      <View>
        <Text style={[text.grey, settings.box]}>
          {localization.langSetting}
        </Text>
        <PickLang {...{ lang, setLang, languages, colors }} />
      </View>
      <View>
        <Text style={[text.grey, settings.box]}>
          {localization.numberOfQuestions}
        </Text>
        <PickNumberQuestions
          {...{ numberOfQ, setNumberOfQ, numberOfQuestions, colors }}
        />
      </View>
    </ScrollView>
  );
};

const settings = StyleSheet.create({
  box: { textAlign: "center", padding: 15 },
});
