// Some useful components for a list

import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { ListStyle, TextStyle } from '../styles';

function DetailsRow({ category, details }) {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{category}:</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{details}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowContainer: {
    ...ListStyle.listItem,
  },

  categoryContainer: {
    width: '40%',
  },

  categoryText: {
    fontWeight: 'bold',
    fontSize: TextStyle.fontSize.medium,
  },

  detailContainer: {
    justifyContent: 'center',
    flex: 1,
  },

  detailText: {
    fontSize: TextStyle.fontSize.small,
  },
});

export { DetailsRow };
