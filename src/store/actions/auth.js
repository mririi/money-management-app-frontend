import axios from "axios";
export const LOGIN = "LOGIN";
export const AUTHENTICATE = "AUTHENTICATE";
export const LOGOUT = "LOGOUT";
export const authenticate = (user) => {
  return (dispatch) => {
    dispatch({
      type: AUTHENTICATE,
      user: user,
    });
  };
};
const API_URL = "http://127.0.0.1:8000/api";
export const login = (values) => {
  return async (dispatch) => {
    await axios
      .post(API_URL + "/login", values)
      .then((response) => {
        dispatch(authenticate(response.data.user));
        saveDataToStorage(response.data.token);
      })
      .catch((error) => {
        console.log(error);
        //throw new Error(message);
      });
  };
};
export const getProfile = (token) => {
  return async (dispatch) => {
    console.log(token);
    await axios
      .get(API_URL + "/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        dispatch(authenticate(response.data));
      })
      .catch((error) => {
        console.log(error);
        //throw new Error(message);
      });
  };
};
export const logOut = () => {
  return (dispatch) => {
    dispatch({ type: LOGOUT });
    localStorage.removeItem("token");
  };
};
const saveDataToStorage = (token) => {
  localStorage.setItem(
    "token",
    JSON.stringify({
      token: token,
    })
  );
};
