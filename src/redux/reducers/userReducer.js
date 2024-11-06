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
        name: action.payload.name,
        email: action.payload.email,
        photo: action.payload.photo,
        };
        case 'UPDATE_USER_PROFILE':
          return {
            ...state,
            name: action.payload.name || state.name,
            email: action.payload.email || state.email,
            photo: action.payload.photo || state.photo,
          };
      case 'LOGOUT':
        return initialState; 
      default:
        return state;
    }
  };
  
  export default userReducer;
  