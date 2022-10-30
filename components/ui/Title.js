import React from "react";
import { StyleSheet, Text } from "react-native";

function Title({ children }) {
  return <Text style={styles.title}>{children}</Text>;
}

const styles = StyleSheet.create({
  title: {
    fontSize: 36,
    fontFamily: "open-sans-bold",
    fontWeight: "bold",
    color: "#fff",
    textAlign: "left",
    padding: 0,
    marginBottom: 20,
  },
});

export default Title;
