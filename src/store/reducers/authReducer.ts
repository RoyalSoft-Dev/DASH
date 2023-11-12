const initState = {
  uid: "",
  isAuthenticated: false,
  user: {},
  loading: false,
};

type StateType = {
  uid: string | null;
  isAuthenticated: boolean;
  user: object;
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
    default:
      return {
        ...state,
      };
  }
};
export default authReducer;
