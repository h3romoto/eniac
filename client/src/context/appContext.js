import React, { useReducer, useContext } from "react";
import reducer from "./reducer";
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

const initialState = {
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

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT})
    }, 3000)
  };

  const displayAlert = () => {
    dispatch({
      type: DISPLAY_ALERT,
    });
    clearAlert();
  };

  return (
    <AppContext.Provider value={{ ...state, displayAlert }}>
      {/* render app */}
      {children}
    </AppContext.Provider>
  );
};

// custom hook
const useAppContext = () => {
  return useContext(AppContext);
};

export { AppProvider, initialState, useAppContext };
