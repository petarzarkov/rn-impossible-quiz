import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PickBase } from "../components";
import { base, text } from "../styles";
import { settings } from "../config";
import { useQuizProvider } from "../hooks";

export const Settings: React.FC = () => {
  const {
    colors,
    setTheme,
    theme,
    lang,
    setLang,
    localization,
    setNumberOfQ,
    numberOfQ,
  } = useQuizProvider() || {};

  const SettingsHeader = ({ header }: { header: string }) => (
    <Text
      style={[
        text.base,
        settingStyle.box,
        { color: colors.text, backgroundColor: colors.primaryLight },
      ]}
    >
      {header}
    </Text>
  );

  return (
    <ScrollView style={[base.containerTab]}>
      <View>
        <SettingsHeader header={localization.themeSettings} />
        <PickBase<"light" | "dark">
          {...{
            option: theme,
            setOption: setTheme,
            pickOptions: ["dark", "light"],
          }}
        />
      </View>
      <View>
        <SettingsHeader header={localization.langSetting} />
        <PickBase<"en" | "bg">
          {...{
            option: lang,
            setOption: setLang,
            pickOptions: settings.languages as ("en" | "bg")[],
          }}
        />
      </View>
      <View>
        <SettingsHeader header={localization.numberOfQuestions} />
        <PickBase<"random" | number>
          {...{
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
  box: { textAlign: "center", padding: 15, margin: 5, borderRadius: 15 },
});
