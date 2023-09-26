import React, { useEffect, useState } from "react";
import { Icon, Dialog, ListItem } from "@rneui/themed";
import { TouchableOpacity } from "react-native";
import { Link } from "expo-router";

import styles from "./simplemenu.style";

const SimpleMenu = ({ removeFunction }) => {
  const [visible, setVisible] = useState(false);

  const toggleDialog = () => {
    setVisible(!visible);
  };

  return (
    <>
      <TouchableOpacity onPress={toggleDialog}>
        <Icon name="dots-three-vertical" type="entypo" style={{ margin: 10 }} />
      </TouchableOpacity>
      <Dialog isVisible={visible} onBackdropPress={toggleDialog}>
        <Link href="/statistics" asChild>
          <TouchableOpacity onPress={toggleDialog}>
            <ListItem>
              <Icon name="bar-graph" type="entypo" />
              <ListItem.Content>
                <ListItem.Title>Statistiques</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        </Link>
        <TouchableOpacity on={removeFunction()}>
          <ListItem>
            <Icon name="reload1" type="antdesign" />
            <ListItem.Content>
              <ListItem.Title>Remettre à zéro</ListItem.Title>
            </ListItem.Content>
            <ListItem.Chevron />
          </ListItem>
        </TouchableOpacity>
      </Dialog>
    </>
  );
};

export default SimpleMenu;
