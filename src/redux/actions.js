export const setVehicles = (vehicles) => ({
  type: 'SET_VEHICLES',
  payload: vehicles,
});

export const setVehicle = (vehicle) => ({
  type: 'SET_VEHICLE',
  payload: vehicle,
});

export const setLoading = (loading) => ({
  type: 'SET_LOADING',
  payload: loading,
});

export const setError = (error) => ({
  type: 'SET_ERROR',
  payload: error,
});
