import { useState } from "react";
import { StyleSheet, ImageBackground, SafeAreaView } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useFonts } from "expo-font";
import AppLoading from "expo-app-loading";

import StartGameScreen from "./screens/StartGameScreen";
import GameScreen from "./screens/GameScreen";
import Colors from "./constants/colors";
import GameOverScreen from "./screens/GameOverScreen";

export default function App() {
  const [userNumber, setUserNumber] = useState();
  const [gameIsOver, setGameIsOver] = useState(false);
  const [guessRounds, setGuessRounds] = useState(0);

  const [fontsLoaded] = useFonts({
    "open-sans": require("./assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("./assets/fonts/OpenSans-Bold.ttf"),
  });

  if(!fontsLoaded) {
    return <AppLoading />
  }

  function pickedNumberHandler(selectedNumber) {
    setUserNumber(selectedNumber);
    setGameIsOver(false);
  }

  let screen = <StartGameScreen onPickedNumber={pickedNumberHandler} />;
  if (userNumber) {
    screen = (
      <GameScreen onGameOver={gameOverHandler} chosenNumber={userNumber} />
    );
  }

  if (gameIsOver && userNumber) {
    screen = <GameOverScreen userNumber={userNumber} roundsNumber={guessRounds} onStartNewGame={startNewGameHandler} />;
  }

  function gameOverHandler(numberOfRounds) {
    setGameIsOver(true);
    setGuessRounds(numberOfRounds);
  }

  function startNewGameHandler() {
    setGuessRounds(0);
    setUserNumber(null);
    setGameIsOver(false);
  }

  return (
    <LinearGradient
      colors={[
        Colors.primary700,
        Colors.primary500,
        Colors.primary300,
        Colors.accent500,
      ]}
      style={styles.rootScreen}
    >
      <ImageBackground
        source={require("./assets/background.jpg")}
        resizeMode="cover"
        style={styles.backgroundImage}
        imageStyle={styles.backgroundImageStyle}
      >
        <SafeAreaView style={styles.rootScreen}>{screen}</SafeAreaView>
      </ImageBackground>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  rootScreen: {
    flex: 1,
  },
  backgroundImage: {
    flex: 1,
    paddingTop: 45,
  },
  backgroundImageStyle: {
    opacity: 0.3,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
