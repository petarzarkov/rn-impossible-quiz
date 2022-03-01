import React from "react";
import { View, StyleSheet } from "react-native";
import { colors } from "../theme";
import { Button } from "./Button";

export const PickLang: React.FC<{
  lang: "en" | "bg";
  setLang: (lang: "en" | "bg") => void;
}> = ({ lang, setLang }) => {
  return (
    <View style={[styles.lang]}>
      <Button
        {...{
          disabled: lang === "en",
          btnStyle: [
            styles.box,
            {
              backgroundColor: lang === "en" ? colors.lightBlue : "transparent",
            },
          ],
          btnText: "en",
          handlePress: () => setLang("en"),
        }}
      />
      <Button
        {...{
          disabled: lang === "bg",
          btnStyle: [
            styles.box,
            {
              backgroundColor: lang === "bg" ? colors.lightBlue : "transparent",
            },
          ],
          btnText: "bg",
          handlePress: () => setLang("bg"),
        }}
      />
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
  lang: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
  },
});
