// A secure text entry component used for password entry e.t.c

import { Ionicons } from '@expo/vector-icons';
import { ViewStyle } from 'react-native';

interface SecureTextIconProps {
  /** Whether the secure text mode is enabled */
  secureText: boolean;
  /** The color of the icon */
  color?: string;
  /** The size of the icon */
  size?: number;
  style?: ViewStyle | null;
}

export default function SecureTextIcon({
  secureText,
  color = 'white',
  size = 20,
  style = null,
}: SecureTextIconProps) {
  return <Ionicons name={secureText ? 'eye-off' : 'eye'} color={color} size={size} style={style} />;
}
