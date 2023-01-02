// An overlay for loading

import { View, ActivityIndicator, StyleSheet } from 'react-native';
import React from 'react';
import { Colors } from '../styles';

function Loading() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    ...StyleSheet.absoluteFill,
    opacity: 0.5,
    backgroundColor: Colors.white,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Loading };
