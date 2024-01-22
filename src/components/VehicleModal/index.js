import React from 'react';
import './style.scss';
import { useSelector } from 'react-redux';
import Modal from '../ReusableModal';

const VehicleDetails = ({ vehicle }) => {
  const {
    id, price, media, description, meta, modelYear
  } = vehicle;
  const { emissions, passengers, bodystyles } = meta;

  return (
    <div className="vehicles-modal__details">
      <div>
        <h2 id="vehicleName">
          <span>{id.toUpperCase()}</span>
        </h2>
        <p className="vehicles-modal__details__price">
          From
          {' '}
          <span>{price}</span>
        </p>
      </div>
      <img src={media[0].url} alt={description} />
      <div>
        <p id="vehicleDescription">
          <span>{description}</span>
        </p>
      </div>
      <div>
        <p>{bodystyles.join(' | ').toUpperCase()}</p>
        <p>
          {passengers}
          {' '}
          Passengers |
          {emissions.value}
          {' '}
          {emissions.template}
        </p>
        <p>
          Model Year:
          {modelYear}
        </p>
      </div>
    </div>
  );
};

const VehicleDetailsModal = ({ showModal, handleCloseModal }) => {
  const vehicle = useSelector((state) => state.vehicle);

  if (!vehicle) {
    return null;
  }

  return (
    <Modal open={showModal} handleClose={handleCloseModal}>
      <div
        aria-labelledby="vehicleName"
        aria-describedby="vehicleDescription"
        className="vehicle-modal"
        data-testid="vehicle-modal"
        id="vehicle-modal"
      >
        <VehicleDetails vehicle={vehicle} />
      </div>
    </Modal>
  );
};

export default VehicleDetailsModal;
