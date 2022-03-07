import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeData = async (
  key: string,
  value: string | Record<string, unknown>,
) => {
  try {
    await AsyncStorage.setItem(
      `@storage_${key}`,
      typeof value === "string" ? value : JSON.stringify(value),
    );
  } catch (e) {
    // saving error
  }
};

export const getData = async <Data = string>(
  key: string,
): Promise<Data | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(`@storage_${key}`);
    try {
      return jsonValue != null ? JSON.parse(jsonValue) as Data : null;
    } catch (error) {
      return jsonValue as unknown as Data;
    }
  } catch (e) {
    return null;
  }
};
