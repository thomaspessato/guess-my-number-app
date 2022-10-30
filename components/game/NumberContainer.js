import React from "react";
import { StyleSheet, Text, View } from "react-native";

import Colors from "../../constants/colors";

function NumberContainer({ children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 4,
    borderColor: Colors.accent500,
    padding: 24,
    margin: 24,
    borderRadius: 8,
    alignItems: "center",
  },
  numberText: {
    fontSize: 40,
    fontFamily: "open-sans-bold",
    textAlign: "center",
    color: Colors.accent500,
  },
});

export default NumberContainer;
