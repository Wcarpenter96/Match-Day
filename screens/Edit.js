import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import * as profileActions from "../store/actions/profile";
import Input from "../components/Input";
import Colors from "../constants/Colors";

// Action type declaration
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// This reducer function changes the App's state when the form is updated
// Same as Auth Screen and Create Screen... TODO: Abstract formReducer
const formReducer = (state, action) => {
  if (action.type === FORM_INPUT_UPDATE) {
    const updatedValues = {
      ...state.inputValues,
      [action.input]: action.value
    };
    const updatedValidities = {
      ...state.inputValidities,
      [action.input]: action.isValid
    };
    let updatedFormIsValid = true;
    for (const key in updatedValidities) {
      updatedFormIsValid = updatedFormIsValid && updatedValidities[key];
    }
    return {
      formIsValid: updatedFormIsValid,
      inputValidities: updatedValidities,
      inputValues: updatedValues
    };
  }
  return state;
};

const EditProfile = props => {
  // States needed for the create profile screen
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const editedProfile = useSelector(state => state.profile.profile);
  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      title: editedProfile ? editedProfile.name : "",
      imageUrl: editedProfile ? editedProfile.bio : ""
    },
    inputValidities: {
      title: editedProfile ? true : false,
      imageUrl: editedProfile ? true : false,
      description: editedProfile ? true : false,
      price: editedProfile ? true : false
    },
    formIsValid: editedProfile ? true : false
  });

  useEffect(() => {
    if (error) {
      Alert.alert("An error occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  const submitHandler = useCallback(async () => {
    if (!formState.formIsValid) {
      Alert.alert("Wrong input!", "Please check the errors in the form.", [
        { text: "Okay" }
      ]);
      return;
    }
    setIsLoading(true);
    setError(false);
    try {
      await dispatch(
        profileActions.updateProfile(
          formState.inputValues.name,
          formState.inputValues.bio,
          editedProfile.image
        )
      );
      props.navigation.goBack();
    } catch (err) {
      setError(err.message);
    }

    setIsLoading(false);
  }, [dispatch, formState]);

  useEffect(() => {
    props.navigation.setParams({ submit: submitHandler });
  }, [submitHandler]);

  const inputChangeHandler = useCallback(
    (inputIdentifier, inputValue, inputValidity) => {
      dispatchFormState({
        type: FORM_INPUT_UPDATE,
        value: inputValue,
        isValid: inputValidity,
        input: inputIdentifier
      });
    },
    [dispatchFormState]
  );

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator
          size="large"
          color={Colors.primary}
          style={styles.centered}
        />
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="padding"
      keyboardVerticalOffset={100}
    >
      <ScrollView>
        <View style={styles.form}>
          <Input
            id="name"
            label="Name"
            errorText="Please enter a valid name!"
            keyboardType="default"
            autoCapitalize="sentences"
            returnKeyType="next"
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.name : ""}
            initiallyValid={!!editedProfile}
            required
          />
          <Input
            id="bio"
            label="Bio"
            errorText="Please enter at least 10 characters!"
            keyboardType="default"
            autoCapitalize="sentences"
            autoCorrect
            multiline
            numberOfLines={3}
            onInputChange={inputChangeHandler}
            initialValue={editedProfile ? editedProfile.bio : ""}
            initiallyValid={!!editedProfile}
            required
            minLength={10}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

EditProfile.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Edit Your Profile",
    headerRight: () => (
      <FontAwesome5 style={styles.text} name={"check"} onPress={submitFn} />
    )
  };
};

const styles = StyleSheet.create({
  form: {
    margin: 20
  },
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    fontSize: 18,
    padding: 10
  }
});

export default EditProfile;
