import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PickBase } from "../components";
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
  theme: "light" | "dark";
  setTheme: (theme: "light" | "dark") => void;
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
        <Text
          style={[text.base, settingStyle.box, { color: colors.primaryLight }]}
        >
          {localization.themeSettings}
        </Text>
        <PickBase<"light" | "dark">
          {...{
            colors,
            option: theme,
            setOption: setTheme,
            pickOptions: ["dark", "light"],
          }}
        />
      </View>
      <View>
        <Text
          style={[text.base, settingStyle.box, { color: colors.primaryLight }]}
        >
          {localization.langSetting}
        </Text>
        <PickBase<"en" | "bg">
          {...{
            colors,
            option: lang,
            setOption: setLang,
            pickOptions: settings.languages as ("en" | "bg")[],
          }}
        />
      </View>
      <View>
        <Text
          style={[text.base, settingStyle.box, { color: colors.primaryLight }]}
        >
          {localization.numberOfQuestions}
        </Text>
        <PickBase<"random" | number>
          {...{
            colors,
            option: numberOfQ,
            setOption: setNumberOfQ,
            pickOptions: settings.numberOfQuestions as (number | "random")[],
          }}
        />
      </View>
    </ScrollView>
  );
};

const settingStyle = StyleSheet.create({
  box: { textAlign: "center", padding: 15 },
});
