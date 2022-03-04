import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../contracts";
import { Button } from "./Button";

export function PickBase<Option>({
  colors,
  pickOptions,
  option,
  setOption,
}: {
  colors: Colors;
  option: Option;
  setOption: (opt: Option) => void;
  pickOptions: Option[];
  children?: React.ReactNode;
}): React.ReactElement | null {
  return (
    <View style={[styles.pickContainer]}>
      {pickOptions.map((l, ind) => (
        <Button
          {...{
            colors,
            key: `${l}-${ind}`,
            disabled: option === l,
            btnStyle: [
              styles.box,
              {
                backgroundColor:
                  option === l ? colors.primaryLight : "transparent",
              },
            ],
            btnText: l as unknown as string,
            handlePress: () => setOption(l),
          }}
        />
      ))}
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
