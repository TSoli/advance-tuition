// Defines some useful button components

import React from "react";
import { TouchableOpacity, StyleSheet, Text, Pressable } from "react-native";

import { Colors, Spacing, Buttons } from '../styles';

/* A standard large button component.
  Props:
    text: The text to go on the button.
    textProps: Any extra props for the text (e.g. style e.t.c.)
    rest: The rest of the props will be passed as the TouchableOpacity props (e.g. the style prop
      will be applied to the TouchableOpacity).
*/
const LargeButton = ({ text, textProps, ...rest }) => {
  const { style: textStyle, ...restText } = textProps || {};
  const { style: pressStyle, ...restPress } = {...rest} || {};
  return(
    <TouchableOpacity
      style={ [styles.largeButton, {...pressStyle}] } {...restPress}
    >
      <Text style={ [styles.largeButtonText, textStyle] } {...restText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

/* A rounded action button (i.e with a plus sign in it)
  Props:
    text: The text to go on the button.
    textProps: Any extra props for the text.
    component: A component to render instead of the text (i.e an icon). If a component is defined,
      the text will not be rendered.
    rest: The rest of the props will be passed as the TouchableOpacity props.
*/
const ActionButton = ({ text, textProps, component, ...rest }) => {
  const { style: textStyle, ...restText } = textProps || {};
  const { style: pressStyle, ...restPress } = {...rest} || {};
  return (
    <TouchableOpacity
      style={[ styles.actionButton, pressStyle]} {...restPress}>
        {(component) ?
          component :
          <Text style={[ styles.actionButtonText, textStyle ]} {...restText}>
            {text}
          </Text>
        }
      </TouchableOpacity>
  );
};

/* A floating action button. It is positioned in the bottom right of the screen. The position may
  adjusted using the style prop.
  Props:
    text: The text to go on the button.
    textProps: Any additional props for the text.
    rest: The rest of the props will be passed as the ActionButton props (e.g a component can be
      passed to render the component instead of the text).
*/
const FloatingActionButton = ({ text, textProps, ...rest}) => {
  const { style: pressStyle, ...restPress } = {...rest} || {};
  return(
    <ActionButton
      text={text}
      textProps={textProps}
      style={[ styles.floating, {...pressStyle}]}
      {...restPress}
    />
  );
};

const styles = StyleSheet.create({
  largeButton: {
    ...Buttons.largeRounded,
    marginTop: Spacing.margin.base,
    backgroundColor: Colors.primaryDark,
  },

  largeButtonText: {
    color: Colors.white,
    fontWeight: "bold",
  },

  actionButton: {
    ...Buttons.action,
    backgroundColor: Colors.primaryDark,
  },

  actionButtonText: {
    color: Colors.white,
  },

  floating: {
    position: "absolute",
    bottom: 2*Spacing.margin.medium,
    right: 2*Spacing.margin.medium,
  },
});

export { LargeButton, ActionButton, FloatingActionButton };