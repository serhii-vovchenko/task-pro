const initialState = {
    name: '',
    email: '',
    photo: 'path/to/default-avatar.png',
  };
  
  const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER':
        return {
          ...state,
          ...action.payload,
          name: action.payload.name,
          photo: action.payload.photo,
        };
      case 'LOGOUT':
        return initialState; 
      default:
        return state;
    }
  };
  
  export default userReducer;
  