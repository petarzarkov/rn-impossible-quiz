import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import { Button } from "./Button";

export const PickLang: React.FC<{
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
  languages: string[];
}> = ({ lang, setLang, languages }) => {
  return (
    <View style={[styles.pickContainer]}>
      {languages.map((l, ind) => (
        <Button
          {...{
            key: `${l}-${ind}`,
            disabled: lang === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor: lang === l ? colors.lightBlue : "transparent",
              },
            ],
            btnText: l,
            handlePress: () => setLang(l as "en" | "bg"),
          }}
        />
      ))}
    </View>
  );
};

export const PickNumberQuestions: React.FC<{
  setNumberOfQ: (n: "random" | number) => void;
  numberOfQ: "random" | number;
  numberOfQuestions: (string | number)[];
  refreshQuestions: () => void;
}> = ({ numberOfQuestions, numberOfQ, setNumberOfQ, refreshQuestions }) => {
  return (
    <View style={[styles.pickContainer]}>
      {numberOfQuestions.map((l, ind) => (
        <Button
          {...{
            key: `${l}-${ind}`,
            disabled: numberOfQ === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor:
                  numberOfQ === l ? colors.lightBlue : "transparent",
              },
            ],
            btnText: l.toString(),
            handlePress: () => {
              setNumberOfQ(l as "random" | number);
              refreshQuestions();
            },
          }}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  box: {
    width: 20,
    paddingHorizontal: 8,
    paddingVertical: 6,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.lightBlue,
    backgroundColor: "oldlace",
    alignSelf: "flex-start",
    marginHorizontal: "1%",
    marginBottom: 6,
    minWidth: "48%",
    textAlign: "center",
  },
  pickContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
