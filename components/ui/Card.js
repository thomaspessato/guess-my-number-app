import React from "react";

import { View, StyleSheet } from "react-native";

import Colors from "../../constants/colors";

function Card({ children }) {
  return <View style={styles.card}>{children}</View>;
}

const styles = StyleSheet.create({
  card: {
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    marginHorizontal: 16,
    backgroundColor: Colors.primary700,
    borderRadius: 8,
    shadowOpacity: 0.4,
    shadowRadius: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    elevation: 4,
  },
});

export default Card;
