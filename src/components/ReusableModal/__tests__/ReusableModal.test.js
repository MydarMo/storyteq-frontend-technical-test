import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import Modal from '..';

const mockHandleClose = jest.fn();

describe('<ReusableModal /> Tests', () => {
  it('renders modal with correct accessibility attributes and closes on outside click', () => {
    const { getByText, getByRole } = render(
      <Modal open handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const modal = getByRole('dialog');
    const closeButton = getByRole('button', { name: '⨉' });

    // Check if the modal and close button is rendered and accessible
    expect(modal).not.toBeNull();
    expect(closeButton).not.toBeNull();

    // Check if the content is rendered inside the modal
    expect(getByText('Modal Content')).not.toBeNull();

    // Fire a click event on the close button
    fireEvent.click(closeButton);

    // Check that the handleClose function is called
    expect(mockHandleClose).toHaveBeenCalled();

    // Fire a click event outside the modal
    fireEvent.mouseDown(document.body);

    // Check that the handleClose function is called on outside click
    expect(mockHandleClose).toHaveBeenCalledTimes(2);
  });

  it('does not render modal when open prop is false', () => {
    const { queryByRole } = render(
      <Modal open={false} handleClose={mockHandleClose}>
        <div>Modal Content</div>
      </Modal>
    );

    const modal = queryByRole('dialog');

    // Check that the modal is not rendered when open prop is false
    expect(modal).toBeNull();
  });
});
