import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setVehicle } from '../../redux/actions';
import VehicleDetailsModal from '../VehicleModal';
import VehicleCard from '../VehicleCard';
import useData from './useData';
import './style.scss';

export default function VehicleList() {
  // eslint-disable-next-line no-unused-vars
  useData();
  const dispatch = useDispatch();
  const reduxState = useSelector((state) => state);
  const { vehicles, loading, error } = reduxState;

  const [showModal, setShowModal] = useState(false);

  const handleReadMore = (vehicle) => {
    dispatch(setVehicle(vehicle));
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    dispatch(setVehicle({}));
  };

  if (loading) {
    return <div data-testid="loading">Loading</div>;
  }

  if (error) {
    return <div data-testid="error">{error}</div>;
  }

  return (
    <>
      <ul
        aria-label="Vehicles List"
        data-testid="results"
        className="vehicle-list"
      >
        {vehicles.map((vehicle, index) => (
          <VehicleCard
            key={vehicle.id}
            index={index}
            vehicle={vehicle}
            handleReadMore={handleReadMore}
          />
        ))}
      </ul>
      <VehicleDetailsModal
        showModal={showModal}
        handleCloseModal={handleCloseModal}
      />
    </>
  );
}
