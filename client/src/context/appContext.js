import React, { useReducer, useState, useContext } from "react";
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  REGISTER_USER_BEGIN,
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
  LOGIN_USER_BEGIN,
  LOGIN_USER_ERROR,
  LOGIN_USER_SUCCESS,
  TOGGLE_SIDEBAR,
  LOGOUT_USER,
  VM_BUILD_BEGIN,
  VM_BUILD_SUCCESS,
  VM_BUILD_ERROR,
  VM_CONNECT_BEGIN,
  VM_CONNECT_SUCCESS,
  VM_CONNECT_ERROR,
  VM_DESTROY_BEGIN,
  VM_DESTROY_SUCCESS,
  VM_DESTROY_ERROR,
} from "./actions";
import reducer from "./reducer";
import axios from "axios";

const user = localStorage.getItem("user");
const token = localStorage.getItem("token");
const userLocation = localStorage.getItem("location");
const id = localStorage.getItem("id");
const specs = localStorage.getItem("specs");
const region = localStorage.getItem("region");
const tier = localStorage.getItem("tier");

export const initialState = {
  // general
  isLoading: false,
  showAlert: false,
  alertText: "",
  alertType: "",
  showSidebar: false,
  // user
  user: "",
  token: "",
  userLocation: "",
  // vm instance
  id: "",
  specs: {
    os: { name: "", ver: "" },
    ram: Number,
    storage: Number,
    cpu: Number,
  },
  region: "",
  tier: "",
  pub_key: "",
};

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  // custom axios instance
  const authFetch = axios.create({
    baseURL: "/api/v1",
  });

  // axios.defaults.headers.common['Authorization'] = `Bearer ${state.token}`;

  // axios request interceptor
  // invoked just before request is made
  authFetch.interceptors.request.use((config) => { 
      config.headers.Authorization = `Bearer ${state.token}`;
      console.log(`CONFIG -> ${JSON.stringify(config.headers)}`); 
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  // axios response interceptor
  // invoked just after request is made
  authFetch.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.log(error.message);
      if (error.response.status === 401) {
        console.log("AUTH ERROR");
      }
      return Promise.reject(error);
    }
  );

  const displayAlert = () => {
    // must have type
    dispatch({ type: DISPLAY_ALERT });
    clearAlert();
  };

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT });
    }, 2500);
  };

  const addUserToLocalStorage = ({ user, token, location }) => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("token", token);
    localStorage.setItem("location", location);
  };

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    localStorage.removeItem("location");
  };

  const registerUser = async (currentUser) => {
    dispatch({ type: REGISTER_USER_BEGIN });

    try {
      const response = await axios.post("/api/v1/auth/register", currentUser);
      const { user, token, location } = response.data;
      dispatch({
        type: REGISTER_USER_SUCCESS,
        payload: { user, token, location },
      });

      // add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: REGISTER_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const loginUser = async (currentUser) => {
    dispatch({ type: LOGIN_USER_BEGIN });

    try {
      const { data } = await axios.post("/api/v1/auth/login", currentUser);
      const { user, token, location } = data;
      dispatch({
        type: LOGIN_USER_SUCCESS,
        payload: { user, token, location },
      });
      // add to local storage
      addUserToLocalStorage({ user, token, location });
    } catch (error) {
      dispatch({
        type: LOGIN_USER_ERROR,
        payload: { msg: error.response.data.msg },
      });
    }
    clearAlert();
  };

  const toggleSidebar = () => {
    dispatch({ type: TOGGLE_SIDEBAR });
  };

  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER });
    removeUserFromLocalStorage();
  };

  const updateUser = async (currentUser) => {
    try {
      // use axios instance, authFetch, for requests
      // const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      const { data } = await authFetch.patch("/auth/updateUser", currentUser);
      console.log(data);
      // addUserToLocalStorage
    } catch (error) {
      // console.log(error.response);
    }
  };

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        registerUser,
        loginUser,
        toggleSidebar,
        logoutUser,
        updateUser,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider };
