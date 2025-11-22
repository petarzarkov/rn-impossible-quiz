/* eslint-disable react-native/no-inline-styles */
import React from "react";
import { ScrollView, View } from "react-native";
import { PickBase } from "../components";
import { base } from "../styles";
import { settings } from "../config";
import { useQuizProvider } from "../hooks";

export const Settings: React.FC = () => {
  const {
    setTheme,
    theme,
    lang,
    setLang,
    localization,
    setNumberOfQ,
    numberOfQ,
    category,
    setCategory,
  } = useQuizProvider() || {};

  return (
    <ScrollView style={[base.containerTab]}>
      <PickBase<"light" | "dark">
        {...{
          header: localization.themeSettings,
          option: theme,
          setOption: setTheme,
          pickOptions: ["dark", "light"],
          isToggled: true,
        }}
      />
      <PickBase<"en" | "bg">
        {...{
          header: localization.langSetting,
          option: lang,
          setOption: setLang,
          pickOptions: settings.languages as ("en" | "bg")[],
        }}
      />
      <PickBase<"random" | number>
        {...{
          header: localization.numberOfQuestions,
          option: numberOfQ,
          setOption: setNumberOfQ,
          pickOptions: settings.numberOfQuestions as (number | "random")[],
          isToggled: true,
        }}
      />
      <PickBase<string>
        {...{
          header: localization.category,
          option: category,
          setOption: setCategory,
          pickOptions: settings.categories.map(c => c.name),
          pickWidth: { minWidth: "80%" },
        }}
      />
      {/** Empty jsx to fill space after next button on overflow content */}
      <View style={{ padding: 20 }} />
    </ScrollView>
  );
};
