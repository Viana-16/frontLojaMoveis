import React from "react";
import "./Modal.css";

function Modal({ onClose, conteudo }) {
  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <button className="modal-close" onClick={onClose}>✖</button>
        <div className="modal-content">
          {conteudo}
        </div>
      </div>
    </div>
  );
}

export default Modal;
