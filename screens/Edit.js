import React, { useEffect, useCallback, useReducer, useState } from "react";
import {
  View,
  ScrollView,
  StyleSheet,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ActivityIndicator
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import * as profileActions from "../store/actions/profile";
import Input from "../components/UI/Input";
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
