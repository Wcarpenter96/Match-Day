import * as firebase from "firebase";
import * as ImagePicker from "expo-image-picker";

export const SET = "SET";
export const UPDATE = "UPDATE";

export const fetchImage = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.userId;
    try {
      const ref = firebase.storage().ref(`${id}`);
      const image = await ref.getDownloadURL();
      const images = getState().image.images;
      dispatch({
        type: SET,
        image: image,
        images: images
      });
    } catch (err) {
      throw err;
    }
  };
};

export const fetchImages = () => {
  return async (dispatch, getState) => {
    const profiles = getState().profile.profiles;
    try {
      const images = [];
      const image = getState().image.image;
      console.log(profiles);
      dispatch({
        type: SET,
        image: image,
        images: images
      });
    } catch (err) {
      throw err;
    }
  };
};

export const uploadImage = method => {
  return async (dispatch, getState) => {
    const id = getState().auth.userId;
    try {
      //   let result;
      //   if (method === "camera") {
      //     result = await ImagePicker.launchImageLibraryAsync({
      //       allowsEditing: true,
      //       aspect: [4, 3],
      //       quality: 1
      //     });
      //   } else {
      let result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1
      });
      //   }
      const image = result.uri;
      const response = await fetch(image);
      const blob = await response.blob();
      var ref = firebase
        .storage()
        .ref()
        .child(`${id}`);
      ref.put(blob);
      updatedImage = {};
      updatedImage.id = id;
      updatedImage.url = image;
      console.log(updatedImage);
      const updatedImages = getState().image.images;
      //   const imageIndex = images.findIndex(image => image.id == id);
      //   updatedImages[imageIndex] = updatedImage;
      dispatch({
        type: UPDATE,
        image: image,
        images: updatedImages
      });
    } catch (err) {
      throw err;
    }
  };
};
