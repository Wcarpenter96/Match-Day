import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  TouchableHighlight,
  Modal
} from "react-native";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch, useSelector } from "react-redux";
import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import * as FileSystem from "expo-file-system";

import Card from "../components/Card";
import * as authActions from "../store/actions/auth";
import * as profileActions from "../store/actions/profile";
import * as imageActions from "../store/actions/image";
import Colors from "../constants/Colors";

const Profile = props => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [error, setError] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const profile = useSelector(state => state.profile.profile);
  const dispatch = useDispatch();

  const id = useSelector(state => state.auth.userId);
  const image = useSelector(state => state.image.image);
  console.log(useSelector(state => state));

  const loadProfile = useCallback(async () => {
    setError(null);
    setIsRefreshing(true);
    getPermissionAsync();
    try {
      await dispatch(profileActions.fetchProfiles());
      await dispatch(imageActions.fetchImage());
    } catch (err) {
      setError(err.message);
    }
    setIsRefreshing(false);
  }, [dispatch, setIsLoading, setError]);

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

  const uploadImageHandler = async method => {
    try {
      await dispatch(imageActions.uploadImage(method));
      await dispatch(
        profileActions.updateProfile(profile.name, profile.bio, true)
      );
      setModalVisible(false);
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
        <TouchableOpacity
          onPress={() => {
            setModalVisible(true);
          }}
        >
          <Image source={{ uri: image }} style={styles.imageContainer} />
        </TouchableOpacity>
        <Text style={styles.title}>{profile.name} </Text>
        <Text style={styles.text}>{profile.bio}</Text>
        <Button
          title="Logout"
          color={Colors.accent}
          onPress={() => {
            dispatch(authActions.logout());
          }}
        />
      </Card>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        style={styles.modalContainer}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <TouchableOpacity
              onPress={() => {
                uploadImageHandler("camera");
              }}
            >
              <Text style={styles.text}>Take Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                uploadImageHandler("library");
              }}
            >
              <Text style={styles.text}>Choose Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setModalVisible(false);
              }}
            >
              <Text style={styles.text}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
  imageContainer: {
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
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  modal: {
    flex: 0.3,
    height: 100,
    width: 300,
    padding: 30,
    backgroundColor: "white",
    borderRadius: 20,
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center"
  }
});

export default Profile;
