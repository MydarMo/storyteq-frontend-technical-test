import React from 'react';
import './style.scss';

const VehicleCard = ({ vehicle, handleReadMore }) => {
  const {
    id, price, description, media
  } = vehicle;

  return (
    <li
      aria-labelledby="vehicleName"
      aria-describedby="vehicleDescription"
      data-testid="vehicle-card"
      className="vehicle-list__item"
    >
      <img src={media[0].url} alt={description} />
      <div className="vehicle-list__item__details">
        <h2 id="vehicleName" className="vehicle-list__details__name">
          <span>{id.toUpperCase()}</span>
        </h2>
        <p className="vehicle-list__details__price">
          From
          {price}
        </p>
        <p
          className="vehicle-list__details__description"
          id="vehicleDescription"
        >
          {description}
        </p>
        <button
          type="button"
          className="btn--filled btn--small read-more-btn"
          onClick={() => handleReadMore(vehicle)}
          aria-controls="vehicle-modal"
          aria-haspopup="dialog"
        >
          Read More
        </button>
      </div>
    </li>
  );
};

export default VehicleCard;
