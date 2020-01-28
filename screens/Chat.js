import React from "react";
import { View, Text, StyleSheet } from "react-native";

const ChatScreen = props => {
  return (
    <View style={styles.screen}>
      <Text>This is the Chat Screen.</Text>
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

export default ChatScreen;
