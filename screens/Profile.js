import React from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from "react-redux";

import Card from "../components/Card";
import * as authActions from "../store/actions/auth";

const Profile = props => {
  const dispatch = useDispatch();
  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text>Welcome user! This is the Profile Page</Text>
        <Button
          title="Logout"
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </Card>
    </View>
  );
};

// Sets header title
Profile.navigationOptions = {
  headerTitle: () => <Text style={styles.text}>Profile</Text>,
  headerRight: () => (
    <FontAwesome5
      style={styles.text}
      name={"edit"}
      onPress={() => alert("This is a button!")}
    />
  )
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
  card: {
    padding: 20
  },
  text: {
    fontSize: 18,
    padding: 10
  }
});

export default Profile;
