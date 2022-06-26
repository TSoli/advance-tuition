// Defines some useful button components

import React from "react";
import { TouchableOpacity, StyleSheet, Text } from "react-native";

import { Colors, Spacing, Buttons } from '../styles';

/* A standard large button component.
  Props:
    style: Applied to the TouchableOpacity surrounding the Text.
    onPress: The onPress function for the Button.
    text: The text for the button.
    textStyle: The style props for the text inside the TouchableOpacity.
*/
const LargeButton = (props) => {
  return(
    <TouchableOpacity 
      style={ [styles.largeButton, {...props.style}] } onPress={props.onPress}
    >
      <Text style={ [styles.largeButtonText, {...props.textStyle}] }>
        {props.text}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  largeButton: {
    ...Buttons.largeRounded,
    marginTop: Spacing.margin.base,
    backgroundColor: Colors.darkBlue,
  },
  largeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },
});

export { LargeButton };