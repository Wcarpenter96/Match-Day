import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";
import * as firebase from "firebase";

import profileReducer from "./store/reducers/profile";
import authReducer from "./store/reducers/auth";
import imageReducer from "./store/reducers/image";
import NavigationContainer from "./navigation/NavigationContainer";
import Firebase from "./constants/Firebase";

// combine the reducers
const rootReducer = combineReducers({
  auth: authReducer,
  profile: profileReducer,
  image: imageReducer
});

// create the redux store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  if (!firebase.apps.length) {
    firebase.initializeApp(Firebase.Config);
  }
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
