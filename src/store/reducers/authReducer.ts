const initState = {
  uid: "",
  companyID: "",
  isAuthenticated: false,
  user: null,
  loading: false,
};

type StateType = {
  uid: string | null;
  companyID: string | null;
  isAuthenticated: boolean;
  user: null;
  loading: boolean;
};

type ActionType = {
  type?: string;
  payload: any;
};

const authReducer = (
  state: StateType = initState,
  action: ActionType = { type: "", payload: null }
) => {
  switch (action.type) {
    case "GET_COMPANY_ID":
      return {
        ...state,
        companyID: action.payload,
      };
    case "LOGIN_SUCCESS":
      return {
        ...state,
        uid: action.payload.uid,
        user: action.payload.user,
        isAuthenticated: true,
      };
    case "CLEAR_COMPANY_ID":
      return {
        ...state,
        companyID: "",
      };
    case "LOGOUT":
      return {
        ...state,
        uid: "",
        isAuthenticated: false,
        user: null,
      };
    default:
      return state;
  }
};
export default authReducer;
