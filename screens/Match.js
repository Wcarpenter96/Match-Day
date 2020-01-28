import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Match = props => {
  return (
    <View style={styles.screen}>
      <Text>This is the Match Screen.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }
});

export default Match;
