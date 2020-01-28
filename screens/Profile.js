import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";

import Card from "../components/Card";
import * as authActions from "../store/actions/auth";
import * as profileActions from "../store/actions/profile";
import Colors from "../constants/Colors";

const Profile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const profile = useSelector(state => state.profile.profile);

  const dispatch = useDispatch();

  const loadProfile = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(profileActions.fetchProfiles());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

  useEffect(() => {
    const willFocusSub = props.navigation.addListener("willFocus", loadProfile);
    return () => {
      willFocusSub.remove();
    };
  }, [loadProfile]);

  useEffect(() => {
    setIsLoading(true);
    loadProfile().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfile]);

  if (isLoading) {
    return (
      <View style={styles.screen}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Card style={styles.card}>
        <Text>Welcome {profile.name}!</Text>
        <Button
          title="Logout"
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
        <Text>Bio: {profile.bio}</Text>
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
