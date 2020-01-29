import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Platform,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CardStack, { Card } from "react-native-card-stack-swiper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import * as profileActions from "../store/actions/profile";
import Colors from "../constants/Colors";

const MatchScreen = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const profiles = useSelector(state => state.profile.profiles);
  const dispatch = useDispatch();

  const loadProfiles = useCallback(async () => {
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
    const willFocusSub = props.navigation.addListener(
      "willFocus",
      loadProfiles
    );
    return () => {
      willFocusSub.remove();
    };
  }, [loadProfiles]);

  useEffect(() => {
    setIsLoading(true);
    loadProfiles().then(() => {
      setIsLoading(false);
    });
  }, [dispatch, loadProfiles]);

  // const selectProfileHandler = (id, title) => {
  //   props.navigation.navigate("ProfileDetail", {
  //     profileId: id,
  //     profileTitle: title
  //   });
  // };

  if (error) {
    return (
      <View style={styles.centered}>
        <Text>An error occurred!</Text>
        <Button
          title="Try again"
          onPress={loadProfiles}
          color={Colors.primary}
        />
      </View>
    );
  }

  if (isLoading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (!isLoading && profiles.length === 0) {
    return (
      <View style={styles.centered}>
        <Text>No profiles found.</Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <CardStack
        loop={true}
        horizontalSwipe={false}
        renderNoMoreCards={() => null}
        ref={swiper => (this.swiper = swiper)}
      >
        {profiles.map((profile, index) => (
          <Card style={styles.card} key={index}>
            <Text>{profile.name}</Text>
            <Text>{profile.bio}</Text>
          </Card>
        ))}
      </CardStack>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    height: 600,
    width: 375,
    margin: 20,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Colors.primary
  }
});

export default MatchScreen;
