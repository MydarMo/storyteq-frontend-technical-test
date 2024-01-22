const initialState = {
  loading: true,
  error: '',
  vehicles: [],
  vehicle: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_VEHICLES':
      return { ...state, vehicles: action.payload };
    case 'SET_VEHICLE':
      return { ...state, vehicle: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload };
    default:
      return state;
  }
};

export default rootReducer;
