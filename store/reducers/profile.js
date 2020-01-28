import {
  UPDATE_PROFILE,
  SET_PROFILES,
  CREATE_PROFILE
} from "../actions/profile";

import Profile from "../../models/profile";

const initialState = {
  profiles: {},
  profile: {}
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET_PROFILES:
      return {
        profiles: action.profiles,
        profile: action.profile
      };
    case CREATE_PROFILE:
      const newProfile = action.profileData.id;
      newProfile.name = action.profileData.name;
      newProfile.bio = action.profileData.bio;
      newProfiles = { ...state.profiles };
      newProfiles[id] = newProfile;
      return {
        ...state,
        profile: newProfile,
        profiles: newProfiles
      };

    case UPDATE_PROFILE:
      // Create a new profile
      const updatedProfile = action.profileData.id;
      updatedProfile.bio = action.profileData.bio;
      updatedProfile.name = action.profileData.name;

      //   Update the profile state from the previous list of profiles
      const updatedProfiles = { ...action.profiles};
      updatedProfiles[action.profileData.id] = updatedProfile;
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
