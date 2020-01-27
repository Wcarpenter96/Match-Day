import React, { useEffect } from "react";
import {
  View,
  ActivityIndicator,
  StyleSheet,
  AsyncStorage
} from "react-native";
import { useDispatch } from "react-redux";

import Colors from "./../constants/Colors";
import * as authActions from "../store/actions/auth";

const Startup = props => {
  // Initialize action dispatcher
  const dispatch = useDispatch();

  // This is essentially a hook that detects whether a user is logged in or not
  useEffect(() => {
    const tryLogin = async () => {
      // Pulls user data from local storage
      const userData = await AsyncStorage.getItem("userData");
      // If its not there, go to authentication screen
      if (!userData) {
        props.navigation.navigate("Auth");
        return;
      }
      // If it is there, pull out the token, user ID, and expiration time
      const transformedData = JSON.parse(userData);
      const { token, userId, expires } = transformedData;
      const expirationDate = new Date(expires);
      // If the token has expired, navigate to the authentication screen
      if (expirationDate <= new Date() || !token || !userId) {
        props.navigation.navigate("Auth");
        return;
      }

      // Update the expiration time for the token
      const expirationTime = expirationDate.getTime() - new Date().getTime();
      // If user data is found and the token is not expired, navigate to the user's profile
      props.navigation.navigate("Profile");
      dispatch(authActions.authenticate(userId, token, expirationTime));
    };

    // Call the function
    tryLogin();
  }, [dispatch]);

  // JSX for the startup screen
  return (
    <View style={styles.screen}>
      {/* Loading wheel as the App launches */}
      <ActivityIndicator size="large" color={Colors.primary} />
    </View>
  );
};

// CSS-like styling fo the startup screen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    justifyContent: "center"
  }
});

export default Startup;
