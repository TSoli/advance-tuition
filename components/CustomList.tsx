// Some useful components for a list
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { FontSize, ListStyle } from '../styles';

interface DetailsRowProps {
  category: string | undefined;
  details: string | number | undefined;
}

const DetailsRow = ({ category, details }: DetailsRowProps) => {
  return (
    <View style={styles.rowContainer}>
      <View style={styles.categoryContainer}>
        <Text style={styles.categoryText}>{category}</Text>
      </View>

      <View style={styles.detailContainer}>
        <Text style={styles.detailText}>{details}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  rowContainer: {
    ...ListStyle.listItem,
  },

  categoryContainer: {
    width: '40%',
  },

  categoryText: {
    fontWeight: 'bold',
    fontSize: FontSize.medium,
  },

  detailContainer: {
    flex: 1,
  },

  detailText: {
    fontSize: FontSize.small,
  },
});

export { DetailsRow };
