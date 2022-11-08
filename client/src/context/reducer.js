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
} from "./PaaSActions";

import { initialState } from "./PaaSContext";

const reducer = (state, action) => {
  if (action.type == VM_BUILD_BEGIN) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      AlertText: "Building your virtual machine ...",
    };
  }

  if (action.type == VM_BUILD_SUCCESS) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      AlertText: "Your virtual machine is ready ...",
    };
  }

  if (action.type == VM_BUILD_ERROR) {
    return {
      ...state,
      showAlert: true,
      alertType: "success",
      AlertText: "Something went wrong while building your virtual machine ...",
    };
  }

  throw new Error(`No such action: ${action.type}`);
};

export default reducer;
