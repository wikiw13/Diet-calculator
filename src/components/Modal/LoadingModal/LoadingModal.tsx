import React, { FunctionComponent } from "react";

import classes from "./LoadingModal.module.css";
import Backdrop from "../../Backdrop/LoadingBackdrop";
import Spinner from "../../Spinner/Spinner";

interface ModalProps {
  show: boolean;
  loading: boolean
}

const Modal: FunctionComponent<ModalProps> = ({ show, loading }) => {
  return (
    <div>
      <Backdrop show={show} />
      <div
        className={classes.Modal}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default Modal;
