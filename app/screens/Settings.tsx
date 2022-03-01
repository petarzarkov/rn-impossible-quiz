import React from "react";
import { ScrollView, StyleSheet, Text, View } from "react-native";
import { PickLang, PickNumberQuestions } from "../components";
import { base, text } from "../styles";

export const Settings: React.FC<{
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
  localization: Record<string, string>;
  setNumberOfQ: (n: "random" | number) => void;
  numberOfQ: "random" | number;
  refreshQuestions: () => void;
}> = ({
  lang,
  setLang,
  localization,
  setNumberOfQ,
  numberOfQ,
  refreshQuestions,
}) => {
  const languages = ["en", "bg"];
  const numberOfQuestions = ["random", 20, 35, 50, 80];
  return (
    <ScrollView style={base.containerTab}>
      <View>
        <Text style={[text.grey, settings.box]}>
          {localization.langSetting}
        </Text>
        <PickLang {...{ lang, setLang, languages }} />
      </View>
      <View>
        <Text style={[text.grey, settings.box]}>
          {localization.numberOfQuestions}
        </Text>
        <PickNumberQuestions
          {...{ numberOfQ, setNumberOfQ, numberOfQuestions, refreshQuestions }}
        />
      </View>
    </ScrollView>
  );
};

const settings = StyleSheet.create({
  box: { textAlign: "center", padding: 15 },
});
