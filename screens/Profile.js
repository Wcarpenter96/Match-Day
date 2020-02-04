import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
// import { ImagePicker } from "expo";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

import Card from "../components/Card";
import * as authActions from "../store/actions/auth";
import * as profileActions from "../store/actions/profile";
import Colors from "../constants/Colors";
import { clockRunning } from "react-native-reanimated";

const axios = require("axios");

const Profile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [imageUri, setImageUri] = useState(
    "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png"
  );

  const profile = useSelector(state => state.profile.profile);
  const dispatch = useDispatch();

  // console.log(useSelector(state => state));
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

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(
        Permissions.CAMERA,
        Permissions.CAMERA_ROLL
      );
      if (status !== "granted") {
        alert("Sorry, we need camera permissions to make this work!");
      }
    }
  };

  getPermissionAsync();

  uploadImage = async uri => {
    try {
      const response = await fetch(uri);
      const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child(`${profile.name}`);
      return ref.put(blob);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };

  const onChooseImagePress = async () => {
    // let result = await ImagePicker.launchCameraAsync({
    //   allowsEditing: true,
    //   aspect: [4, 3],
    //   quality: 1
    // });
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    });
    console.log("result: ", result);
    if (!result.cancelled) {
      uploadImage(result.uri);
    }
  };

  const onLoadImagePress = async () => {
    try {
      const ref = firebase.storage().ref(`${profile.name}`);
      const image = await ref.getDownloadURL();
      console.log(image);
      setImageUri(image);
    } catch (error) {
      console.log(error);
    }
  };

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
        <Image source={{ uri: imageUri }} style={styles.image} />
        <Text style={styles.title}>{profile.name} </Text>
        <Text style={styles.text}>{profile.bio}</Text>
        <Button title="Choose image..." onPress={onChooseImagePress} />
        <Button title="Load image..." onPress={onLoadImagePress} />
        <Button
          title="Logout"
          color={Colors.accent}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </Card>
    </View>
  );
};

Profile.navigationOptions = navData => {
  return {
    headerRight: () => (
      <FontAwesome5
        style={styles.text}
        name={"edit"}
        onPress={() => {
          navData.navigation.navigate("Edit");
        }}
      />
    )
  };
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    alignItems: "center",
    padding: 20
  },
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100
  },
  text: {
    fontSize: 20,
    padding: 10
  },
  title: {
    fontSize: 30,
    padding: 20
  }
});

export default Profile;
