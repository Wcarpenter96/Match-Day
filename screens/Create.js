import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useDispatch } from "react-redux";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import * as profileActions from "../store/actions/profile";
import Input from "../components/Input";
import Colors from "../constants/Colors";

// Action type declaration
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// This reducer function changes the App's state when the form is updated
// Same as Auth Screen... TODO: Abstract formReducer
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

const CreateProfile = props => {
  // States needed for the create profile screen
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();

  const dispatch = useDispatch();

  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      name: "",
      bio: ""
    },
    inputValidities: {
      name: false,
      bio: false
    },
    formIsValid: false
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
        profileActions.createProfile(
          formState.inputValues.name,
          formState.inputValues.bio
        )
      );
      props.navigation.navigate("Profile");
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
            initialValue={""}
            initiallyValid={false}
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
            initialValue={""}
            initiallyValid={false}
            required
            minLength={10}
          />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

CreateProfile.navigationOptions = navData => {
  const submitFn = navData.navigation.getParam("submit");
  return {
    headerTitle: "Create a new Profile",
    headerRight: () => (
      <FontAwesome5
        style={styles.text}
        name={"arrow-right"}
        onPress={submitFn}
      />
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
  }
});

export default CreateProfile;
