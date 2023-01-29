// An overlay for loading
import React from 'react';
import { ActivityIndicator, StyleSheet, View } from 'react-native';
import { Colors } from '../styles';

function Loading() {
  return (
    <View style={styles.loadingView}>
      <ActivityIndicator size="large" color={Colors.primaryDark} />
    </View>
  );
}

const styles = StyleSheet.create({
  loadingView: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: Colors.white50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export { Loading };
