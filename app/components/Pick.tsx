import React from "react";
import { View, StyleSheet, ColorSchemeName } from "react-native";
import { Colors } from "../contracts";
import { Button } from "./Button";

export const PickTheme: React.FC<{
  colors: Colors;
  theme: ColorSchemeName;
  setTheme: (theme: ColorSchemeName) => void;
}> = ({ theme, setTheme, colors }) => {
  return (
    <View style={[styles.pickContainer]}>
      {["dark", "light"].map((l, ind) => (
        <Button
          {...{
            colors,
            key: `${l}-${ind}`,
            disabled: theme === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor: theme === l ? colors.accent : "transparent",
              },
            ],
            btnText: l,
            handlePress: () => setTheme(l as "dark" | "light"),
          }}
        />
      ))}
    </View>
  );
};

export const PickLang: React.FC<{
  colors: Colors;
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
  languages: string[];
}> = ({ lang, setLang, languages, colors }) => {
  return (
    <View style={[styles.pickContainer]}>
      {languages.map((l, ind) => (
        <Button
          {...{
            colors,
            key: `${l}-${ind}`,
            disabled: lang === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor: lang === l ? colors.accent : "transparent",
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
  colors: Colors;
  setNumberOfQ: (n: "random" | number) => void;
  numberOfQ: "random" | number;
  numberOfQuestions: (string | number)[];
}> = ({ numberOfQuestions, numberOfQ, setNumberOfQ, colors }) => {
  return (
    <View style={[styles.pickContainer]}>
      {numberOfQuestions.map((l, ind) => (
        <Button
          {...{
            colors,
            key: `${l}-${ind}`,
            disabled: numberOfQ === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor:
                  numberOfQ === l ? colors.accent : "transparent",
              },
            ],
            btnText: l.toString(),
            handlePress: () => {
              setNumberOfQ(l as "random" | number);
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
