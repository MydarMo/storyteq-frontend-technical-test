import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import VehicleCard from '..';

const mockHandleClick = jest.fn();

const mockVehicle = {
  id: 'test',
  media: [
    {
      name: 'vehicle',
      url: '/images/16x9/xe_k17.jpg',
    },
    {
      name: 'vehicle',
      url: '/images/1x1/xe_k17.jpg',
    },
  ],
  description: 'Description for the test vehicle',
  price: '£30,000',
};

describe('<VehicleCard /> Tests', () => {
  it('renders vehicle card with correct accessibility attributes', () => {
    const { queryByTestId, getByText, getByRole } = render(
      <VehicleCard
        vehicle={mockVehicle}
        handleReadMore={mockHandleClick}
      />
    );

    // check the vehicle card renders
    expect(queryByTestId('vehicle-card')).not.toBeNull();

    // check the listitem role is assigned to each vehicleItem
    const listItem = getByRole('listitem');
    expect(listItem).not.toBeNull();
    expect(listItem.data).not.toBeNull();

    // Check accessibility by ensuring images have appropriate src and alt text
    const img = getByRole('img');
    expect(img).not.toBeNull();
    expect(img.src).toContain('/images/16x9/xe_k17.jpg');
    expect(img.alt).toContain('Description for the test vehicle');

    // Check that the vehicle id/name is displayed and in upper case
    expect(getByText('TEST')).not.toBeNull();

    // Check that the price and description is displayed in the card
    expect(getByText(/£30,000/i)).not.toBeNull();
    expect(getByText('Description for the test vehicle')).not.toBeNull();

    // Check if the Read More button is clickable
    const readMoreBtn = getByRole('button', { name: 'Read More' });
    expect(readMoreBtn).not.toBeNull();

    // Fire a click event on the Read More button
    fireEvent.click(readMoreBtn);

    // Check that the handle click function is called
    expect(mockHandleClick).toHaveBeenCalled();
  });
});
