import React from 'react';
import { View, StyleSheet } from 'react-native';

import Colors from '../constants/Colors';

// Customized styling to give 'View' a better UI...
const Card = props => {
  return <View style={{...styles.card, ...props.style}}>{props.children}</View>;
};

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    borderRadius: 10,
    backgroundColor: Colors.secondary
  }
});

export default Card;
