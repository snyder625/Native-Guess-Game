import { Alert, StyleSheet, View, Text, FlatList } from 'react-native'
import React, { useState, useEffect } from 'react'
import { Ionicons } from '@expo/vector-icons'

import Title from '../components/ui/Title'
import NumberContainer from '../components/game/NumberContainer';
import PrimaryButton from '../components/ui/PrimaryButton';
import Card from '../components/ui/Card';
import InstructionText from '../components/ui/InstructionText';
import GuessLogItem from '../components/game/GuessLogItem';

function generateRandomNumber(min, max, exclude) {
  const randomNumber = Math.floor(Math.random() * (max - min)) + min;

  if (randomNumber === exclude) {
    return generateRandomNumber(min, mix, exclude)
  }
  else {
    return randomNumber;
  }
}

let minBoundary = 1;
let maxBoundary = 100;

export default function GameScreen({userNumber, onGameOver}) {

  const initialGuess = generateRandomNumber(1, 100, userNumber);
  const [currentGuess, SetCurrentGuess] = useState(initialGuess);
  const [guessRounds, setGuessRounds] = useState([initialGuess]);

  useEffect(() => {
    if (currentGuess === userNumber) {
      onGameOver(guessRounds.length);
    }
  }, [currentGuess, userNumber, onGameOver]);

  useEffect(() => {
    minBoundary = 1;
    maxBoundary = 100;
  }, [])

  function nextGuessHandler(direction) {

    if ((direction === 'lower' && currentGuess < userNumber) || (direction === 'greater' && currentGuess > userNumber)) {
      Alert.alert("Don't lie", 'You know that this is wrong...', [{text: 'Sorry!', style: 'cancel'}]);
      return;
    }
    if (direction === 'lower') {
      maxBoundary = currentGuess;
    } else {
      minBoundary = currentGuess + 1;
    }
    const newRndNumber = generateRandomNumber(minBoundary, maxBoundary, currentGuess);
    SetCurrentGuess(newRndNumber);
    setGuessRounds(prev => [newRndNumber, ...prev]);
  }

  const guessRoundsListLength = guessRounds.length;

  return (
    <View style={styles.screen}>
      <Title >Opponent's Guess</Title>
      <NumberContainer>{currentGuess}</NumberContainer>
      <Card>
        <InstructionText style={styles.instructionText}>Higher or Lower?</InstructionText>
        <View style={styles.buttonsContainer}>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'lower')} >
              <Ionicons name="md-remove" size={24} color="white" />
            </PrimaryButton>
          </View>
          <View style={styles.buttonContainer}>
            <PrimaryButton onPress={nextGuessHandler.bind(this, 'greater')} >
              <Ionicons name="md-add" size={24} color="white" />
            </PrimaryButton>
          </View>
        </View>
      </Card>
      <View style={styles.listContainer}>
        {/* {guessRounds.map(guessRound => <Text key={guessRounds}>{guessRound}</Text>)} */}
        <FlatList data={guessRounds} renderItem={(itemData) => <GuessLogItem roundNumber={guessRoundsListLength - itemData.index} guess={itemData.item} />} keyExtractor={(item)=>item} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 24,
    },
    instructionText: {
      marginBottom: 12
    },
    buttonsContainer: {
      flexDirection: 'row'
    },
    buttonContainer: {
      flex: 1,
    },
    listContainer: {
      flex: 1,
      padding: 16
    }
})