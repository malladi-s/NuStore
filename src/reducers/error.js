const initialState = {
  isError: false,
  error: {} // TODO: Think about changing it to an array. Or show one error at a time !?
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATION_LOGIN_FAILURE":
    case "AUTHENTICATION_LOGOUT_FAILURE":
    case "AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE":
    case "AUTHENTICATION_PASSWORD_SAVE_FAILURE":
    case "AUTHENTICATION_REGISTRATION_FAILURE":
    case "USER_LOOKUP_FAILURE": {
      const newState = Object.assign({}, initialState);
      newState.isError = true;
      newState.error = action.error;
      return newState;
    }
    case "ERROR_CLEARED": {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    default: {
      return state;
    }
  }
}
