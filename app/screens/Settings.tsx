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
import { settings } from "../config";

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
  return (
    <ScrollView style={base.containerTab}>
      <View>
        <Text style={[text.base, settingStyle.box]}>
          {localization.themeSettings}
        </Text>
        <PickTheme {...{ theme, setTheme, colors }} />
      </View>
      <View>
        <Text style={[text.base, settingStyle.box]}>
          {localization.langSetting}
        </Text>
        <PickLang
          {...{ lang, setLang, languages: settings.languages, colors }}
        />
      </View>
      <View>
        <Text style={[text.base, settingStyle.box]}>
          {localization.numberOfQuestions}
        </Text>
        <PickNumberQuestions
          {...{
            numberOfQ,
            setNumberOfQ,
            numberOfQuestions: settings.numberOfQuestions,
            colors,
          }}
        />
      </View>
    </ScrollView>
  );
};

const settingStyle = StyleSheet.create({
  box: { textAlign: "center", padding: 15 },
});
