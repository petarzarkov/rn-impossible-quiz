import React from "react";
import { View, StyleSheet, ViewStyle } from "react-native";
import { useQuizProvider } from "../../hooks";
import Dropdown from "../Dropdown";
import { ButtonBase } from "./ButtonBase";

export function PickBase<Option extends string | number>({
  pickOptions,
  option,
  setOption,
  header,
  pickWidth,
  isToggled,
}: {
  option: Option;
  setOption: (opt: Option) => void;
  pickOptions: Option[];
  children?: React.ReactNode;
  header: string;
  pickWidth?: ViewStyle;
  isToggled?: boolean;
}): React.ReactElement | null {
  const { colors } = useQuizProvider() || {};
  return (
    <View>
      <Dropdown label={header} isToggled={isToggled} >
        <View style={[styles.pickContainer]}>
          {pickOptions.map((l, ind) => (
            <ButtonBase
              {...{
                colors,
                key: `${l}-${ind}`,
                disabled: option === l,
                btnStyle: [
                  styles.box,
                  pickWidth,
                  {
                    backgroundColor:
                  option === l ? colors.accent : "transparent",
                  },
                ],
                btnText: l,
                handlePress: () => setOption(l),
              }}
            />
          ))}
        </View>
      </Dropdown>
    </View>
  );
}

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
    minWidth: "40%",
    textAlign: "center",
  },
  pickContainer: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    padding: 4,
  },
});
