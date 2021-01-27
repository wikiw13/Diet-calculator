import React, { FunctionComponent } from "react";

import classes from "./LoadingModal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import Spinner from "../Spinner/Spinner";

interface ModalProps {
  show: boolean;
  modalClosed: () => void;
}

const Modal: FunctionComponent<ModalProps> = ({ show, modalClosed }) => {
  return (
    <div>
      <Backdrop show={show} clicked={modalClosed}/>
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        <p>Saved succesfully! :)</p>
      </div>
    </div>
  );
};

export default Modal;
