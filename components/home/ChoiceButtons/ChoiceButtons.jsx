import React from 'react'
import { View, Text } from 'react-native'
import { Button } from '@rneui/themed'

import styles from './choicebuttons.styles'
import { TouchableOpacity } from '@gorhom/bottom-sheet'

const ChoiceButtons = ({ pressCallback }) => {
        return <View style={styles.buttonsContainer}>
                <View
                        style={[styles.buttonContainer]}
                >
                        <TouchableOpacity style={[styles.button, , { backgroundColor: "black" }]} onPress={() => pressCallback(1)}>
                                <Text style={styles.title}>Choix Noir</Text>
                        </TouchableOpacity>
                </View>
                <View
                        style={[styles.buttonContainer]}
                >
                        <TouchableOpacity style={[styles.button, , { backgroundColor: "red" }]} onPress={() => pressCallback(2)}>
                                <Text style={styles.title}>Choix Rouge</Text>
                        </TouchableOpacity>
                </View>
        </View>
}

export default ChoiceButtons