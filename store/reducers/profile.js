import {
  UPDATE_PROFILE,
  SET_PROFILES,
  CREATE_PROFILE
} from "../actions/profile";

import Profile from "../../models/profile";

const initialState = {
  profiles: [],
  profile: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return {
        profiles: action.profiles,
        profile: action.profile
      };
    case CREATE_PROFILE:
      const newProfile = new Profile(
        action.profileData.id,
        action.profileData.name,
        action.profileData.bio
      );
      return {
        ...state,
        profile: newProfile,
        profiles: state.profiles.concat(newProfile)
      };

    case UPDATE_PROFILE:
      // Create a new profile
      const updatedProfile = new Profile(action.id, action.name, action.bio);
      //   Update the profile state from the previous list of profiles
      const profileIndex = state.profiles.findIndex(
        profile => profile.id === action.id
      );
      const updatedProfiles = [...action.profiles];
      updatedProfiles[profileIndex] = updatedProfile;
      // Update the profile and profiles states
      return {
        ...state,
        profiles: updatedProfiles,
        profile: updatedProfile
      };
    default:
      return state;
  }
};
