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

export const updateStatistics = async (answer, difference) => {
  let userStatistics = await getUserStatistics();

  console.log("User statistics : ", userStatistics);

  if (userStatistics != null) {
    let newUserStatistics = {
      score: answer,
      difference: Math.abs(difference),
    };
    userStatistics.push(newUserStatistics);
    console.log("New user statistics : ", userStatistics);
    await storeUserStatistics(userStatistics);
  } else {
    const newUserStatistics = [
      {
        score: answer,
        difference: Math.abs(difference),
      },
    ];
    console.log("New user statistics : ", newUserStatistics);
    await storeUserStatistics(newUserStatistics);
  }
};
