import { AUTHENTICATE, LOGOUT } from "../actions/auth";

const initialState = {
  isAuthenticated: false,
  user: null,
};

function authReducer(state = initialState, action) {
  switch (action.type) {
    case AUTHENTICATE:
      return {
        isAuthenticated: true,
        user: action.user,
      };
    case LOGOUT:
      return initialState;
    default:
      return state;
  }
}

export default authReducer;
