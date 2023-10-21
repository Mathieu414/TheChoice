import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { Icon, Button, BottomSheet } from '@rneui/themed'
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

import styles from './answerbottomsheet.styles'

const AnswerBottomSheet = gestureHandlerRootHOC(({ isVisible, answer, totalDistance1, totalDistance2, continueButtonPress }) => {
  const textColor = answer ? 'green' : 'red';

  // if the black is shortest then shortestRoute is true, else it is false
  const shortestRoute = totalDistance1 < totalDistance2;

  return (
    <BottomSheet isVisible={isVisible} containerStyle={{ backgroundColor: 'transparent' }}>
      <View
        style={{
          flex: 1,
          padding: 24,
          flexDirection: 'column',
          justifyContent: 'space-around',
          backgroundColor: 'white',
          borderTopWidth: 3,
          borderTopColor: 'rgb(190, 190, 190)',
        }}
      >

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {answer ? (<Icon name='checkcircle' type='antdesign' color={textColor} />) : (<Icon name='closecircle' type='antdesign' color={textColor} />)}
          <Text style={[styles.titleText, { color: textColor }]}>
            {answer ? "Bien joué ! 🎉" : "Essaye encore 🫠"}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          {
            <Text style={[styles.text, { color: textColor }]}>
              {`Choix ${!shortestRoute ? "noir" : "rouge"} : + ${Math.round(Math.abs(totalDistance1 - totalDistance2))}m`}
            </Text>
          }


        </View>
        <View style={{
          marginHorizontal: 50,
          marginVertical: 10,
        }}>
          <TouchableOpacity style={{
            backgroundColor: textColor,
            borderRadius: 5,
            padding: 8,
            alignItems: 'center',
          }} onPress={() => { continueButtonPress() }}>
            <Text style={{ fontSize: 20, fontFamily: "DMBold", color: "white" }}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheet>
  );
}
);

export default AnswerBottomSheet