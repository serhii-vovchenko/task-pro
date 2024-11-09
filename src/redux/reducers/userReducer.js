const userReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'UPDATE_USER_PROFILE':
        return {
          ...state,
          name: action.payload.name,
          email: action.payload.email,
          photoUrl: action.payload.photoUrl, 
        };
      default:
        return state;
    }
  };
  