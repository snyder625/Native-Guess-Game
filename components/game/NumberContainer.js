import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Colors from '../../constants/color'

export default function NumberContainer({children}) {
  return (
    <View style={styles.container}>
      <Text style={styles.numberText}>{children}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        borderWidth: 4,
        borderColor: Colors.accent500,
        padding: 24,
        margin: 24,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8
    },
    numberText: {
        color: Colors.accent500,
        fontFamily: 'open-sans-bold',
        fontSize: 36,
    }
})