import React from 'react';
import { render } from '@testing-library/react';
import { Provider, useDispatch } from 'react-redux';
import VehicleList from '..';
import useData from '../useData';
import { setError, setLoading, setVehicles } from '../../../redux/actions';
import store from '../../../redux/store';

// jest.mock("../useData");
jest.mock('../useData', () => ({
  __esModule: true,
  default: jest.fn(),
}));

describe('<VehicleList /> Tests', () => {
  beforeEach(() => {
    // Reset the mock implementation before each test
    useData.mockReset();
  });

  it('Should show loading state if it not falsy', () => {
    useData.mockImplementation(() => {
      // Simulate loading, error, and vehicles state
      const dispatch = useDispatch();
      dispatch(setLoading(true));
      dispatch(setError('An error occured'));
      dispatch(setVehicles('results'));
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <VehicleList />
      </Provider>
    );
    expect(queryByTestId('loading')).not.toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show error if it is not falsy and loading is finished', () => {
    useData.mockImplementation(() => {
      // Simulate loading, error, and vehicles state
      const dispatch = useDispatch();
      dispatch(setLoading(false));
      dispatch(setError('An error occured'));
      dispatch(setVehicles('results'));
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <VehicleList />
      </Provider>
    );
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).not.toBeNull();
    expect(queryByTestId('results')).toBeNull();
  });

  it('Should show results if loading successfully finished', () => {
    useData.mockImplementation(() => {
      // Simulate loading, error, and vehicles state
      const dispatch = useDispatch();
      dispatch(setLoading(false));
      dispatch(setError(false));
      dispatch(setVehicles([]));
    });

    const { queryByTestId } = render(
      <Provider store={store}>
        <VehicleList />
      </Provider>
    );
    expect(queryByTestId('loading')).toBeNull();
    expect(queryByTestId('error')).toBeNull();
    expect(queryByTestId('results')).not.toBeNull();
  });
});
