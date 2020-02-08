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
      const rawProfiles = Object.entries(resData);
      const profiles = [];
      for (let i = 0; i < rawProfiles.length; i++) {
        const newProfile = new Profile(
          rawProfiles[i][0],
          rawProfiles[i][1].name,
          rawProfiles[i][1].bio,
          rawProfiles[i][1].image
        );
        if (newProfile.id != id) {
          profiles.push(newProfile);
        }
      }

      dispatch({
        type: SET_PROFILES,
        profiles: profiles,
        profile: resData[id]
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
      `https://match-day-73a8a.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PUT",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          bio
        })
      }
    );
    const resData = await response.json();
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

export const updateProfile = (name, bio, image) => {
  return async (dispatch, getState) => {
    const token = getState().auth.token;
    const id = getState().auth.userId;
    const response = await fetch(
      `https://match-day-73a8a.firebaseio.com/profiles/${id}.json?auth=${token}`,
      {
        method: "PATCH",
        header: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name,
          bio,
          image
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
        bio,
        image
      }
    });
  };
};
