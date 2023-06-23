import React from 'react';

const Modal = ({ isOpen, onClose, children }) => {
  return (
    <>
      {isOpen && (
        <div className="modal">
          <div className="modal-content">
            <button className="close-button" onClick={onClose}>Close</button>
            {children}
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
