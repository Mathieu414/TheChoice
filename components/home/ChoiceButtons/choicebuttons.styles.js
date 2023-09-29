import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  inlineButtonsContainer: {},
  button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    height: 100,
  },
  buttonContainer: {
    marginVertical: 10,
    width: 150,
  },
  title: { fontFamily: "DMBold" },
});

export default styles;
