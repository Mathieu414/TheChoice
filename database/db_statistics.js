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
    return value != null ? JSON.parse(value) : null;
  } catch (error) {
    console.log(error);
  }
};

export const mergeUserStatistics = async (statistics) => {
  try {
    console.log("Merge Statistics : ", statistics);
    await AsyncStorage.mergeItem("userStatistics", JSON.stringify(statistics));
  } catch (error) {
    console.log(error);
  }
};

export const removeStatistics = async () => {
  try {
    await AsyncStorage.removeItem("userStatistics");
  } catch (e) {
    console.log(e);
  }
};

export const removeStatisticsById = async (id) => {
  try {
    let userStatistics = await getUserStatistics();
    delete userStatistics[id];
    if (userStatistics == []) {
      userStatistics = null;
    }
    await storeUserStatistics(userStatistics);
  } catch (e) {
    console.log(e);
  }
};

export const updateStatistics = async (id, data) => {
  let userStatistics = await getUserStatistics();

  console.log("User statistics : ", userStatistics);

  console.log("Id : ", id);

  if (userStatistics != null) {
    userStatistics[id] = data;
    console.log("New user statistics : ", userStatistics);
    await storeUserStatistics(userStatistics);
  } else {
    const newUserStatistics = {
      [id]: data,
    };
    console.log("New user statistics : ", newUserStatistics);
    await storeUserStatistics(newUserStatistics);
  }
};
