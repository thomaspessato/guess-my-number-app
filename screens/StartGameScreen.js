import React, { useState } from "react";
import { TextInput, View, StyleSheet, Alert } from "react-native";

import PrimaryButton from "../components/ui/PrimaryButton";
import Title from "../components/ui/Title";
import Colors from "../constants/colors";

import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";

function StartGameScreen({ onPickedNumber }) {
  const [enteredValue, setEnteredValue] = useState("");

  const numberInputHandler = (enteredText) => {
    setEnteredValue(enteredText);
  };

  function confirmInputHandler() {
    const chosenNumber = parseInt(enteredValue);
    if (isNaN(chosenNumber) || chosenNumber <= 0 || chosenNumber > 99) {
      // alert("Invalid number!");
      Alert.alert(
        "Invalid number!",
        "Number has to be between 1 and 99. Want to reset or try again?",
        [
          { text: "Cancel", style: "default", onPress: resetInputHandler },
          { text: "Reset", style: "destructive", onPress: resetInputHandler },
        ]
      );
      return;
    }

    onPickedNumber(chosenNumber);
  }

  function resetInputHandler() {
    setEnteredValue("");
  }

  return (
    <View style={styles.rootContainer}>
      <Title>Guess my number</Title>
      <Card>
        <InstructionText>Enter a number between 1 and 99</InstructionText>
        <TextInput
          style={styles.numberInput}
          maxLength={3}
          value={enteredValue}
          onChangeText={numberInputHandler}
          keyboardType="numeric"
          autoCapitalize="none"
          autoCorrect={false}
        />
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={resetInputHandler}>Reset</PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={confirmInputHandler}>Confirm</PrimaryButton>
          </View>
        </View>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    marginTop: 100,
    padding: 24,
    alignItems: "center",
  },
  buttonsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
  },
  buttonContainer: {
    flex: 1,
  },

  numberInput: {
    height: 50,
    width: 120,
    fontSize: 32,
    marginVertical: 16,
    fontWeight: "bold",
    paddingHorizontal: 8,
    borderRadius: 8,
    borderBottomColor: Colors.accent500,
    borderBottomWidth: 2,
    color: "#fff",
    textAlign: "center",
  },
});

export default StartGameScreen;
