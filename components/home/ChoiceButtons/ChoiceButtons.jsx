import React from 'react'
import { View } from 'react-native'
import { Button } from '@rneui/themed'

import styles from './choicebuttons.styles'

const ChoiceButtons = ({pressCallback}) => {
  return <View style={styles.buttonsContainer}>
            <View style={styles.inlineButtonsContainer}>
                <Button
                title="Choix Noir"
                buttonStyle={[styles.button, { backgroundColor: "black" }]}
                containerStyle={[styles.buttonContainer, { marginEnd: 20 }]}
                titleStyle={{ fontWeight: "bold" }}
                onPress={() => pressCallback(1)}
                />
                <Button
                title="Choix Rouge"
                buttonStyle={[styles.button, { backgroundColor: "red" }]}
                containerStyle={[styles.buttonContainer, { marginStart: 20 }]}
                titleStyle={{ fontWeight: "bold" }}
                onPress={() => pressCallback(2)}
                />
            </View>
        </View>
}

export default ChoiceButtons