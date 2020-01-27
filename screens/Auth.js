import React, { useState, useEffect, useReducer, useCallback } from "react";
import {
  View,
  ScrollView,
  Button,
  KeyboardAvoidingView,
  StyleSheet,
  ActivityIndicator,
  Alert
} from "react-native";
import { useDispatch } from "react-redux";

import Input from "../components/Input";
import Card from "../components/Card";
import Colors from "../constants/Colors";
import * as authActions from "../store/actions/auth";

// Action type declaration
const FORM_INPUT_UPDATE = "FORM_INPUT_UPDATE";

// This reducer function changes the App's state when the form is updated
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

const AuthScreen = props => {
  // Auth states needed in this screen
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState();
  const [isSignup, setIsSignup] = useState(false);
  // Keeps track of the form input state,
  // uses the reducer we declared above with the below initial states
  const [formState, dispatchFormState] = useReducer(formReducer, {
    inputValues: {
      email: "",
      password: ""
    },
    inputValidities: {
      email: false,
      password: false
    },
    formIsValid: false
  });

  // Initialize action dispatcher
  const dispatch = useDispatch();

  // If an error occures, Alert it to the user
  useEffect(() => {
    if (error) {
      Alert.alert("An Error Occurred!", error, [{ text: "Okay" }]);
    }
  }, [error]);

  // This function checks the user's input against the auth actions
  // to determine if the user has correctly entered the information
  // if so, it will navigate the user to the profile page
  // if not, it will set the error message
  const authHandler = async () => {
    let action;
    if (isSignup) {
      action = authActions.signup(
        formState.inputValues.email,
        formState.inputValues.password
      );
    } else {
      action = authActions.login(
        formState.inputValues.email,
        formState.inputValues.password
      );
    }
    setError(null);
    setIsLoading(true);
    try {
      await dispatch(action);
      props.navigation.navigate("Profile");
    } catch (err) {
      setError(err.message);
      setIsLoading(false);
    }
  };

  // This function is called when input is changed
  // It sets the form state to the current input,
  // which automatically dispatches to the reducer to check validation
  // this function uses a callback so it is only built once
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

  // JSX for Authentication Screen
  return (
    // Keeps the View from being blocked by the Keyboard
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={50}
      style={styles.screen}
    >
      {/* Uses customized "Card" component */}
      <Card style={styles.authContainer}>
        <ScrollView>
          {/* Uses customized "Input" component */}
          <Input
            id="email"
            label="E-Mail"
            keyboardType="email-address"
            required
            email
            autoCapitalize="none"
            errorText="Please enter a valid email address."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          <Input
            id="password"
            label="Password"
            keyboardType="default"
            secureTextEntry
            required
            minLength={5}
            autoCapitalize="none"
            errorText="Please enter a valid password."
            onInputChange={inputChangeHandler}
            initialValue=""
          />
          {/* Uses conditional rendering to switch between "Sign up" or "Login" */}
          <View style={styles.buttonContainer}>
            {isLoading ? (
              <ActivityIndicator size="small" color={Colors.primary} />
            ) : (
              <Button
                title={isSignup ? "Sign Up" : "Login"}
                color={Colors.primary}
                onPress={authHandler}
              />
            )}
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title={`Switch to ${isSignup ? "Login" : "Sign Up"}`}
              color={Colors.accent}
              onPress={() => {
                setIsSignup(prevState => !prevState);
              }}
            />
          </View>
        </ScrollView>
      </Card>
    </KeyboardAvoidingView>
  );
};

// Sets header title
AuthScreen.navigationOptions = {
  headerTitle: "Authenticate"
};

// CSS-like style for the Authentication screen
const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  authContainer: {
    width: "80%",
    maxWidth: 400,
    maxHeight: 400,
    padding: 20
  },
  buttonContainer: {
    marginTop: 10
  }
});

export default AuthScreen;
