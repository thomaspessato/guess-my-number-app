import { StyleSheet, Text, View } from "react-native";
import Colors from "../../constants/colors";

function GuessLogItem({ roundNumber, guess }) {
  return (
    <View style={styles.listItem}>
      <Text>Guess #{roundNumber}</Text>
      <Text>Opponent's Guess: {guess}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  listItem: {
    flexDirection: "row",
    borderColor: Colors.primary700,
    borderWidth: 1,
    borderRadius: 10,
    padding: 15,
    marginVertical: 8,
    backgroundColor: Colors.accent500,
    justifyContent: "space-between",
    width: "100%",
    elevation: 4,
    shadowColor: "black",
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
  }
});

export default GuessLogItem;
