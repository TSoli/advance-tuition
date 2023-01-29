// Defines some useful button components

import React, { ReactNode } from 'react';
import { StyleSheet, Text, TextProps, TouchableOpacity, TouchableOpacityProps } from 'react-native';
import { Buttons, Colors, Spacing } from '../styles';

interface ButtonProps extends TouchableOpacityProps {
  text?: ReactNode;
  textProps?: TextProps;
}

/* A standard large button component.
  Props:
    text: The text to go on the button.
    textProps: Any extra props for the text (e.g. style e.t.c.)
    rest: The rest of the props will be passed as the TouchableOpacity props (e.g. the style prop
      will be applied to the TouchableOpacity).
*/
const LargeButton = ({ text, textProps, ...rest }: ButtonProps) => {
  const { style: textStyle, ...restText } = textProps || {};
  const { style: pressStyle, ...restPress } = { ...rest } || {};
  return (
    <TouchableOpacity style={[styles.largeButton, pressStyle]} {...restPress}>
      <Text style={[styles.buttonText, textStyle]} {...restText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

const MediumButton = ({ text, textProps, ...rest }: ButtonProps) => {
  const { style: textStyle, ...restText } = textProps || {};
  const { style: pressStyle, ...restPress } = { ...rest } || {};
  return (
    <TouchableOpacity style={[styles.mediumButton, pressStyle]} {...restPress}>
      <Text style={[styles.buttonText, textStyle]} {...restText}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

interface ActionButtonProps extends ButtonProps {
  component?: JSX.Element;
}

/* A rounded action button (i.e with a plus sign in it)
  Props:
    text: The text to go on the button.
    textProps: Any extra props for the text.
    component: A component to render instead of the text (i.e an icon). If a component is defined,
      the text will not be rendered.
    rest: The rest of the props will be passed as the TouchableOpacity props.
*/
const ActionButton = ({ text, textProps, component, ...rest }: ActionButtonProps) => {
  const { style: textStyle, ...restText } = textProps || {};
  const { style: pressStyle, ...restPress } = { ...rest } || {};
  return (
    <TouchableOpacity style={[styles.actionButton, pressStyle]} {...restPress}>
      {component || (
        <Text style={[styles.actionButtonText, textStyle]} {...restText}>
          {text}
        </Text>
      )}
    </TouchableOpacity>
  );
};

/* A floating action button. It is positioned in the bottom right of the screen. The position may
  adjusted using the style prop.
  Props:
    Props will be passed as the ActionButton props (e.g a component can be
    passed to render the component instead of the text).
*/
function FloatingActionButton(props: ActionButtonProps) {
  const { style: pressStyle, ...rest } = { ...props } || {};
  return <ActionButton style={[styles.floating, pressStyle]} {...rest} />;
}

const styles = StyleSheet.create({
  largeButton: {
    ...Buttons.largeRounded,
    marginBottom: Spacing.margin.base,
    backgroundColor: Colors.primaryDark,
  },

  mediumButton: {
    ...Buttons.mediumRounded,
    marginBottom: Spacing.margin.base,
    backgroundColor: Colors.primaryDark,
  },

  buttonText: {
    color: Colors.white,
    fontWeight: 'bold',
  },

  actionButton: {
    ...Buttons.action,
    backgroundColor: Colors.primaryDark,
  },

  actionButtonText: {
    color: Colors.white,
  },

  floating: {
    position: 'absolute',
    bottom: 2 * Spacing.margin.medium,
    right: 2 * Spacing.margin.medium,
  },
});

export { LargeButton, MediumButton, ActionButton, FloatingActionButton };
