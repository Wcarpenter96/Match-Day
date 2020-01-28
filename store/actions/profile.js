import Profile from "../../models/profile";

export const UPDATE_PROFILE = "UPDATE_PROFILE";
export const SET_PROFILES = "SET_PROFILES";
export const CREATE_PROFILE = "CREATE_PROFILE";

export const fetchProfiles = () => {
  return async (dispatch, getState) => {
    const id = getState().auth.userId;
    try {
      const response = await fetch(
        "https://match-day-73a8a.firebaseio.com/profiles.json"
      );
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }
      const resData = await response.json();

      const loadedProfiles = [];

      const profiles = Object.values(resData);
      for (let i = 0; i < profiles.length; i++) {
        loadedProfiles.push(
          new Profile(profiles[i].id, profiles[i].name, profiles[i].bio)
        );
      }
      dispatch({
        type: SET_PROFILES,
        profiles: loadedProfiles,
        profile: loadedProfiles.filter(profile => profile.id === id)[0]
      });
    } catch (err) {
      throw err;
    }
  };
};

export const createProfile = (name, bio) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const id = getState().auth.userId;
    const response = await fetch(
      `https://match-day-73a8a.firebaseio.com/profiles.json?auth=${token}`,
      {
        method: "POST",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          id,
          name,
          bio
        })
      }
    );
    const resData = await response.json();
    console.log(resData);
    dispatch({
      type: CREATE_PROFILE,
      profileData: {
        id,
        name,
        bio
      }
    });
  };
};

export const updateProfile = (id, name, bio) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const response = await fetch(
      `https://match-day-73a8a.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          bio
        })
      }
    );
    if (!response.ok) {
      throw new Error("Something went wrong!");
    }
    dispatch({
      type: UPDATE_PROFILE,
      profileData: {
        id,
        name,
        bio
      }
    });
  };
};
