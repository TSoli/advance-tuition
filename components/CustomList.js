// Some useful components for a list

import PropTypes from 'prop-types';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { CustomTextStyle, ListStyle } from '../styles';

function DetailsRow({ category, details }) {
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
}

DetailsRow.propTypes = {
  category: PropTypes.string,
  details: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

DetailsRow.defaultProps = {
  category: null,
  details: null,
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
    fontSize: CustomTextStyle.fontSize.medium,
  },

  detailContainer: {
    flex: 1,
  },

  detailText: {
    fontSize: CustomTextStyle.fontSize.small,
  },
});

export { DetailsRow };
