import AsyncStorage from "@react-native-async-storage/async-storage";

export const storeUserStatistics = async (statistics) => {
  try {
    await AsyncStorage.setItem("userStatistics", JSON.stringify(statistics));
  } catch (error) {
    console.log(error);
  }
};

export const getUserStatistics = async () => {
  try {
    const value = await AsyncStorage.getItem("userStatistics");
    if (value !== null) {
      return JSON.parse(value);
    }
  } catch (error) {
    console.log(error);
  }
};
