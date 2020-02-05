import { SET, UPDATE } from "../actions/image";

const initialState = {
  image: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png",
  images: []
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SET:
      return {
        ...state,
        image: action.image,
        images: action.images
      };
    case UPDATE:
      return {
        ...state,
        image: action.image,
        images: action.images
      };
    default:
      return state;
  }
};
