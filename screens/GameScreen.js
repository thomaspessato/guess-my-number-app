import React, { useState, useEffect, useMemo } from "react";
import { Alert, FlatList, StyleSheet, Text, View } from "react-native";
import Title from "../components/ui/Title";

import { Ionicons } from "@expo/vector-icons";

import NumberContainer from "../components/game/NumberContainer";
import PrimaryButton from "../components/ui/PrimaryButton";
import Card from "../components/ui/Card";
import InstructionText from "../components/ui/InstructionText";
import GuessLogItem from "../components/game/GuessLogItem";

function generateRandomNumberBetween(min, max, exclude) {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rndNum = Math.floor(Math.random() * (max - min)) + min;
  if (rndNum === exclude) {
    return generateRandomNumberBetween(min, max, exclude);
  } else {
    return rndNum;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

function GameScreen({ chosenNumber, onGameOver }) {
  // This should use useMemo because it is a value that is not going to change during the lifetime of the component
  // and it is not going to be used in the render cycle

  const initialGuess = useMemo(
    () => generateRandomNumberBetween(minBoundary, maxBoundary, chosenNumber),
    [chosenNumber]
  );
  const [currentGuess, setCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === chosenNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, []);

  function nextGuessHandler(direction) {
    if (
      (direction === "lower" && currentGuess < chosenNumber) ||
      (direction === "greater" && currentGuess > chosenNumber)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [
        { text: "Sorry!", style: "cancel" },
      ]);
      return;
    }

    if (direction === "lower") {
      maxBoundary = currentGuess - 1;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumberBetween(
      minBoundary,
      maxBoundary,
      currentGuess
    );
    setCurrentGuess(newRndNumber);
    setGuessRounds((prevGuessRounds) => [newRndNumber, ...prevGuessRounds]);
  }

  function renderListItem(listLength, itemData) {
    return (
      <View style={styles.listItem}>
        <InstructionText>#{listLength - itemData.index}</InstructionText>
        <InstructionText>{itemData.item}</InstructionText>
      </View>
    );
  }

  const guessRoundListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title>Opponent's Guess! </Title>
      {/* GUESS */}
      <NumberContainer>{currentGuess}</NumberContainer>

      <Card>
        <InstructionText style={styles.instructionText}>
          Is this number higher or lower than your number?
        </InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "lower")}>
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, "greater")}>
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
        {/* + - */}
      </Card>
      {/* <View>LOG ROUNDS</View> */}
      <View style={styles.listContainer}>
        <FlatList
          keyExtractor={(item) => item}
          data={guessRounds}
          renderItem={(itemData) => (
            <GuessLogItem guess={itemData.item} roundNumber={guessRoundListLength - itemData.index} />
          )}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 20,
  },
  instructionText: {
    marginBottom: 20,
  },
  buttonsContainer: {
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
  },
  listItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    marginVertical: 10,
    backgroundColor: "white",
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
  },
  listContainer: {
    flex: 1,
    width: "100%",
  },
});

export default GameScreen;
