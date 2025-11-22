import { Alert } from "react-native";

export const AlertBase = ({
  title,
  message,
  onCancel,
  onOk,
}: {
  title: string;
  message: string;
  onOk: () => void;
  onCancel: () => void;
}) => {
  return Alert.alert(
    title,
    message,
    [
      {
        text: "Cancel",
        onPress: () => onCancel(),
        style: "cancel",
      },
      { text: "Ok", onPress: () => onOk() },
    ],
    {
      cancelable: true,
      onDismiss: () => onCancel(),
    },
  );
};
