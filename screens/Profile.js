import React from "react";
import { View, Text, StyleSheet } from "react-native";

const Profile = props => {
  return (
    <View style={styles.screen}>
      <Text>Welcome user! This is the Profile Page</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
