const initialState = {
  someData: null,
};

const someReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'SOME_ACTION_TYPE':
      return {
        ...state,
        someData: action.payload,
      };
    default:
      return state;
  }
};

export default someReducer;