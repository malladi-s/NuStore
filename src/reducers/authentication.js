const initialState = {
  id: "",
  firstName: "",
  lastName: "",
  email: "",
  username: "",
  about: "",
  isLoggedIn: false,
  isLoggingIn: false,
  isPasswordChanged: false,
  isPasswordReset: false,
  registrationSucceeded: false
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "AUTHENTICATION_LOGIN_ATTEMPT": {
      const newState = Object.assign({}, state);
      newState.isLoggingIn = true;
      return newState;
    }
    case "AUTHENTICATION_LOGIN_FAILURE":
    case "AUTHENTICATION_SESSION_CHECK_FAILURE":
    case "AUTHENTICATION_LOGOUT_SUCCESS": {
      const newState = Object.assign({}, initialState);
      return newState;
    }
    case "AUTHENTICATION_LOGIN_SUCCESS":
    case "AUTHENTICATION_SESSION_CHECK_SUCCESS": {
      const newState = Object.assign({}, state);

      if (action.json.provider == "github") {
        newState.firstName = action.json.displayName;
        newState.id = action.json.id;
        newState.isLoggedIn = true;
        newState.isLoggingIn = false;
        newState.lastName = "";
        newState.about = action.json.about || "";
        newState.username = action.json.username;
        newState.email = action.json.emails[0].value;
      } else if (action.json.provider == "amazon") {
        newState.firstName = action.json.displayName;
        newState.id = action.json.id;
        newState.isLoggedIn = true;
        newState.isLoggingIn = false;
        newState.lastName = "";
        newState.about = action.json.about || "";
        newState.username = action.json.displayName;
        newState.email = action.json.emails[0].value;
      } else {
        newState.firstName = action.json.firstName;
        newState.id = action.json._id;
        newState.isLoggedIn = true;
        newState.isLoggingIn = false;
        newState.about = action.json.about || "";
        newState.lastName = action.json.lastName;
        newState.username = action.json.username;
        newState.email = action.json.email;
      }
      return newState;
    }
    case "AUTHENTICATION_LOGOUT_FAILURE":
    case "AUTHENTICATION_REGISTRATION_FAILURE": {
      return state;
    }
    case "AUTHENTICATION_PASSWORD_RESET_CLEAR":
    case "AUTHENTICATION_PASSWORD_RESET_HASH_FAILURE": {
      const newState = Object.assign({}, state);
      newState.isPasswordReset = false;
      return newState;
    }
    case "AUTHENTICATION_PASSWORD_RESET_HASH_CREATED": {
      const newState = Object.assign({}, state);
      newState.isPasswordReset = true;
      return newState;
    }
    case "AUTHENTICATION_PASSWORD_SAVE_CLEAR": {
      const newState = Object.assign({}, state);
      newState.isPasswordChanged = false;
      return newState;
    }
    case "AUTHENTICATION_PASSWORD_SAVE_SUCCESS": {
      const newState = Object.assign({}, state);
      newState.isPasswordChanged = true;
      return newState;
    }
    case "AUTHENTICATION_REGISTRATION_SUCCESS": {
      const newState = Object.assign({}, state);
      newState.registrationSucceeded = true;
      return newState;
    }
    case "AUTHENTICATION_REGISTRATION_SUCCESS_VIEWED": {
      const newState = Object.assign({}, state);
      newState.registrationSucceeded = false;
      return newState;
    }
    default: {
      return state;
    }
  }
}
