import React, { useEffect, useRef, useState } from 'react';
import './style.scss';

const Modal = ({ open, handleClose, children }) => {
  const [showModal, setShowModal] = useState(false);
  const modalRef = useRef(null);

  const handleCloseModal = () => {
    if (handleClose) {
      handleClose();
    }
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (modalRef.current && !modalRef.current.contains(e.target)) {
      handleCloseModal();
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleOutsideClick);
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  });

  return (
    <>
      {open || showModal ? (
        <>
          <section className="modal" role="dialog" ref={modalRef}>
            <button type="button" className="btn--big" onClick={handleCloseModal}>
              ⨉
            </button>
            {children}
          </section>
          <div className="overlay" />
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Modal;
