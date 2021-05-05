import { LOGIN, LOGOUT } from "../actions/user";

const initialState = {
  id: 0,
  name: "",
  token: "",
  status: false,
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGIN:
      return {
        ...state,
        id: action.payload.id,
        name: action.payload.name,
        token: action.payload.token,
        status: action.payload.status,
      };
    case LOGOUT:
      return {
        state: initialState,
      };
    default:
      return {
        ...state,
      };
  }
};

export default userReducer;
