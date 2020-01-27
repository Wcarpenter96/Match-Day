import { AUTHENTICATE, LOGOUT } from "../actions/auth";

// Declare the initial state for token and user ID
const initialState = {
  token: null,
  userId: null
};

// This reducer updates the token and user ID if action is authenticate (login/signup)
// or it clears the token and user ID if action is logout
export default (state = initialState, action) => {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        token: action.token,
        userId: action.userId
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
};
