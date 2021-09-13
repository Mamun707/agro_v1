import React from "react";
import cross from "../../assets/cross.png";
import "./modal.css";

function Modal(props) {
  return props.trigger ? (
    <div className="modal">
      <div className="modal-inner">
        <div className="close-btn" onClick={() => props.setTrigger(false)}>
          <img src={cross} alt="cross" />
        </div>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Modal;
