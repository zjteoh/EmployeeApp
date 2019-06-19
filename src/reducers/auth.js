const INITIAL_STATE = {
  user: null
};

export default (state=INITIAL_STATE, action) => {
  switch (action.type) {
    case 'LOGIN_USER_SUCCESS': 
      return {...state, user: action.payload};
    default:
      return state;
  }
};
