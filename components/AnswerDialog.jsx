import React from 'react';
import { Button, Dialog } from "@rneui/themed";
import { Text } from 'react-native';

const AnswerDialog = ({answer, totalDistance1, totalDistance2, visible, escapeFunction}) => {
    
    return <Dialog
          isVisible={visible}
          onBackdropPress={escapeFunction}
        >
          <Dialog.Title titleStyle={{ color: answer ? 'green' : 'red' }} title={answer ? "Bonne réponse 🤝" :  "Mauvaise Réponse 🫠"} />
          <Text style={{ fontSize: 20 }}>
            Choix noir : {Math.round(totalDistance1)}
          </Text>
          <Text style={{ fontSize: 20 }}>
            Choix rouge : {Math.round(totalDistance2)}
          </Text>
          <Dialog.Actions>
            <Button
              onPress={escapeFunction}
            >
              OK
            </Button>
          </Dialog.Actions>
        </Dialog>
}

export default AnswerDialog;