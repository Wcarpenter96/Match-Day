import React from "react";
import MapView from "react-native-maps";
import { View, Text, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

const Location = props => {
  return (
    <View style={styles.screen}>
      <View style={styles.textContainer}>
        <Text style={styles.text}>Adjust your radius to find matches near you.</Text>
      </View>
      <MapView style={styles.map} />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: 'center'
  },
  textContainer: {
    backgroundColor: Colors.secondary,
    padding: 20,
    borderRadius: 5,
    width: "100%",
  },
  text: {
    fontSize: 16,
    padding: 10
  },
  map: {
    flex: 1,
    width: "100%"
  }
});

export default Location;
