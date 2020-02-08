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
    async function asyncForEach(array, callback) {
      for (let index = 0; index < array.length; index++) {
        await callback(array[index], index, array);
      }
    }

    const profiles = getState().profile.profiles;
    const images = [];
    const image = getState().image.image;

    try {
      await asyncForEach(profiles, async profile => {
        if (profile.image) {
          let ref = firebase.storage().ref(profile.id);
          url = await ref.getDownloadURL();
        } else {
          url =
            "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png";
        }
        let imageObject = { id: profile.id, url: url };
        images.push(imageObject);
      });
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
    let result;
    try {
      if (method === "camera") {
        result = await ImagePicker.launchCameraAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
      } else {
        result = await ImagePicker.launchImageLibraryAsync({
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1
        });
      }
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
      const updatedImages = getState().image.images;
      const imageIndex = updatedImages.findIndex(image => image.id == id);
      if (imageIndex === -1) {
        updatedImages.push(updatedImage);
      } else {
        updatedImages[imageIndex] = updatedImage;
      }
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
