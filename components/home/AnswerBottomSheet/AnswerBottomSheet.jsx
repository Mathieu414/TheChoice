import React from 'react'
import { View, Text } from 'react-native'
import { BottomSheetModal, BottomSheetBackdrop, TouchableOpacity } from '@gorhom/bottom-sheet'
import { Icon, Button } from '@rneui/themed'

import styles from './answerbottomsheet.styles'

const AnswerBottomSheet = ({ bottomSheetModalRef, snapPoints, answer, updatePoints, totalDistance1, totalDistance2, }) => {
  const textColor = answer ? 'green' : 'red';

  return (
    <BottomSheetModal
      ref={bottomSheetModalRef}
      index={0}
      snapPoints={snapPoints}
      backdropComponent={(props) => (
        <BottomSheetBackdrop
          {...props}
          disappearsOnIndex={-1}
          appearsOnIndex={0}
          opacity={0.3}
          onPress={updatePoints}
        />
      )}
    >
      <View
        style={{
          flex: 1,
          paddingHorizontal: 24,
          flexDirection: 'column',
          justifyContent: 'space-around',
        }}
      >

        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          {answer ? (<Icon name='checkcircle' type='antdesign' color={textColor} />) : (<Icon name='closecircle' type='antdesign' color={textColor} />)}
          <Text style={[styles.titleText, { color: textColor }]}>
            {answer ? "Bien joué ! 🎉" : "Essaye encore 🫠"}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around' }}>
          <Text style={[styles.text, { color: textColor }]}>
            {`Choix noir : ${Math.round(totalDistance1)}m`}
          </Text>
          <Text style={[styles.text, { color: textColor }]}>
            {`Choix rouge : ${Math.round(totalDistance2)}m`}
          </Text>
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
          }} onPress={() => { bottomSheetModalRef.current?.dismiss(); updatePoints(); }}>
            <Text style={{ fontSize: 20, fontFamily: "DMBold", color: "white" }}>Continuer</Text>
          </TouchableOpacity>
        </View>
      </View>
    </BottomSheetModal>
  )
}

export default AnswerBottomSheet