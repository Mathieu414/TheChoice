import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  buttonsContainer: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  buttonContainer: {
    marginVertical: 10,
    width: 150,
  },
  button: {
    borderWidth: 2,
    borderColor: "white",
    borderRadius: 50,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },

  title: { fontFamily: "DMBold", color: "white", fontSize: 18 },
});

export default styles;
