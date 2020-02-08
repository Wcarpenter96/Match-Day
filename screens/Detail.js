import React from "react";
import {
  View,
  SafeAreaView,
  ScrollView,
  Text,
  ImageBackground,
  StyleSheet
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import Colors from "../constants/Colors";

const MatchDetail = props => {
  const profileId = props.navigation.getParam("profileId");
  const imageUrl = props.navigation.getParam("imageUrl");
  const selectedProfile = useSelector(state =>
    state.profile.profiles.find(profile => profile.id === profileId)
  );
  const dispatch = useDispatch();

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{ uri: imageUrl }}
          style={styles.imageContainer}
        >
          <View style={styles.messageButton}>
            <FontAwesome5
              style={{ fontSize: 35, padding: 10 }}
              name={"comment-medical"}
            />
          </View>
          <View style={styles.titleContainer}>
            <Text style={styles.title}>{selectedProfile.name}</Text>
          </View>
        </ImageBackground>
        <Text style={styles.text}>{selectedProfile.bio}</Text>
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

MatchDetail.navigationOptions = navData => {
  return {
    headerTitle: navData.navigation.getParam("profileName")
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1
  },
  container: {
    margin: 10,
    backgroundColor: Colors.secondary
  },
  imageContainer: {
    height: "100%",
    width: "100%",
    justifyContent: "flex-end"
  },
  messageButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: Colors.primary,
    alignSelf: 'flex-end',
    alignItems: 'center',
    justifyContent: 'center',
    margin: 20
  },
  titleContainer: {
    backgroundColor: Colors.primary
  },
  title: {
    fontSize: 30,
    padding: 20
  },
  text: {
    fontSize: 20,
    padding: 10
  }
});

export default MatchDetail;
