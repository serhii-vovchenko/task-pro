const initialState = {
    name: '',
    email: '',
   
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          ...action.payload,
        };
      case 'LOGOUT':
        return initialState; 
      default:
        return state;
    }
  };
  
  export default userReducer;
  