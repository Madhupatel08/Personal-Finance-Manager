// reducer.js
import { SIGN_IN,SIGN_OUT,INITIALIZE, SIGN_IN_ERROR, SIGN_UP  } from "src/constants/projectConstants";

const initialState = {
  // isAuthenticated: false,
  isLoading: true,
  user: null
};

export const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SIGN_IN:
      return {
        ...state,
        // isAuthenticated: true,
        user: {
          email: action.payload.email,
          // password: action.payload.password
        }
      };
    case SIGN_OUT:
      return {
        ...state,
        // isAuthenticated: false,
        user: null
      };
    case SIGN_UP:
      return {
        ...state,
        user:null
      }
    default:
      return state;
  }
};

