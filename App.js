import React from "react";
import { createStore, combineReducers, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import ReduxThunk from "redux-thunk";

import profileReducer from "./store/reducers/profile";
import authReducer from "./store/reducers/auth";
import NavigationContainer from "./navigation/NavigationContainer";

// combine the reducers
const rootReducer = combineReducers({
  auth: authReducer, 
  profile: profileReducer
});

// create the redux store
const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer />
    </Provider>
  );
}
