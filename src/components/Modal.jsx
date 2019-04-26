import React from 'react';

const Modal = ({ show, wrapperClass, children}) => {
  if (!show) {
    return null;
  }
  return (
    <div className="modal-bg">
      <div className={`container modal-wrapper ${wrapperClass}`}>
        <div className="row">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
