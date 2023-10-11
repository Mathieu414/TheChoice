import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeSettings = async (settings) => {
  try {
    console.log("settings", settings);
    await AsyncStorage.setItem("settings", JSON.stringify(settings));
  } catch (error) {
    console.log(error);
  }
};

export const getSettings = async () => {
  try {
    const value = await AsyncStorage.getItem("settings");
    return value != null ? JSON.parse(value) : 0;
  } catch (error) {
    console.log(error);
  }
};

export const removeSettings = async () => {
  try {
    await AsyncStorage.removeItem("settings");
  } catch (e) {
    console.log(e);
  }
};
