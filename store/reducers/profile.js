import {
  UPDATE_PROFILE,
  SET_PROFILES,
  CREATE_PROFILE
} from "../actions/profile";

import Profile from "../../models/profile";

const initialState = {
  profiles: [],
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
      const newProfile = new Profile(
        action.profileData.id,
        action.profileData.name,
        action.profileData.bio
      );
      const newProfiles = [...state.profiles];
      newProfiles.push(newProfile);

      return {
        ...state,
        profile: newProfile,
        profiles: newProfiles
      };

    case UPDATE_PROFILE:
      const updatedProfile = new Profile(
        action.profileData.id,
        action.profileData.name,
        action.profileData.bio
      );

      const updatedProfiles = [...state.profiles];
      const profileIndex = updatedProfiles.findIndex(
        profile => profile.id == action.profileData.id
      );
      updatedProfiles[profileIndex] = updatedProfile;

      return {
        ...state,
        profiles: updatedProfiles,
        profile: updatedProfile
      };
    default:
      return state;
  }
};
