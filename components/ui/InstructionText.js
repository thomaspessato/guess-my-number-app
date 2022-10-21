import React from "react";

import { Text, StyleSheet } from "react-native";
import Colors from "../../constants/colors";

// import { Container } from './styles';

function InstructionText({ children, style }) {
  return <Text style={[styles.text, style]}>{children}</Text>;
}

const styles = StyleSheet.create({
  text: {
    fontSize: 20,
    color: Colors.accent500,
    textAlign: "center",
    marginBottom: 15,
  },
});

export default InstructionText;
