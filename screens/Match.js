import React, { useState, useEffect, useCallback } from "react";
import {
  StyleSheet,
  View,
  FlatList,
  Button,
  Text,
  Platform,
  ActivityIndicator,
  Image
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import CardStack, { Card } from "react-native-card-stack-swiper";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import * as profileActions from "../store/actions/profile";
import * as imageActions from "../store/actions/image";
import Colors from "../constants/Colors";
import { TouchableOpacity } from "react-native-gesture-handler";

const Match = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();

  const profiles = useSelector(state => state.profile.profiles);
  const images = useSelector(state => state.image.images);
  console.log(images);

  const dispatch = useDispatch();

  const loadProfiles = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    try {
      await dispatch(profileActions.fetchProfiles());
      await dispatch(imageActions.fetchImages());
    } catch (err) {
      setError(err.message);
      console.log(err);
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

  const openProfileHandler = index => {
    const profile = profiles[index];
    console.log(profile.name);
    props.navigation.navigate("MatchDetail", {
      profileId: profile.id,
      profileName: profile.name
    });
  };

  const renderImage = id => {
    if (images.length > 0 && !isLoading && !isRefreshing) {
      const index = images.findIndex(image => image.id == id);
      const url = images[index].url;
      return <Image source={{ uri: url }} style={styles.imageContainer} />;
    } else {
      return (
        <View style={styles.centered}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      );
    }
  };

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
      <View style={styles.cardContainer}>
        <CardStack
          loop={true}
          disableBottomSwipe={true}
          renderNoMoreCards={() => null}
          ref={swiper => (this.swiper = swiper)}
          onSwipedTop={index => openProfileHandler(index)}
        >
          {profiles.map((profile, index) => (
            <Card style={styles.card} key={index}>
              {renderImage(profile.id)}
              <Text style={styles.title}>{profile.name}</Text>
              <Text style={styles.text}>{profile.bio}</Text>
            </Card>
          ))}
        </CardStack>
      </View>
      <View style={styles.iconContainer}>
        <FontAwesome5
          style={styles.icon}
          name={"arrow-left"}
          onPress={() => {
            this.swiper.goBackFromRight();
          }}
        />
        <FontAwesome5
          style={styles.icon}
          name={"user-circle"}
          solid
          onPress={() => this.swiper.swipeTop()}
        />
        <FontAwesome5
          style={styles.icon}
          name={"arrow-right"}
          onPress={() => {
            this.swiper.swipeRight();
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    flexDirection: "column",
    justifyContent: "flex-start",
    flex: 1
  },
  cardContainer: {
    height: 600,
    width: 375,
    padding: 20,
    marginBottom: 20
  },
  centered: { flex: 1, justifyContent: "center", alignItems: "center" },
  card: {
    height: 600,
    width: 375,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: Colors.primary,
    shadowColor: "black",
    shadowOpacity: 0.26,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8
  },
  text: {
    fontSize: 18,
    padding: 10
  },
  title: {
    fontSize: 30,
    padding: 20
  },
  iconContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  icon: {
    fontSize: 50,
    padding: 20
  },
  imageContainer: {
    width: 200,
    height: 200,
    borderRadius: 100
  }
});

export default Match;
