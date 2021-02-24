import React, { Component } from "react";
import { Modal as MaterialModal } from "@material-ui/core";
import HighlightOffIcon from "@material-ui/icons/HighlightOff";
import Button from "components/Button/Button";

import "./Modal.scss";

export class Modal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isModalOpen: false,
      children: props.children,
      modalTitle: props.modalTitle ? props.modalTitle : null,
      className: props.className ? props.className : "",
      modalFunction: props.modalFunction ? props.modalFunction : null,
      functionButtonTitle: props.functionButtonTitle ? props.functionButtonTitle : null,
      functionButtonTitle: props.functionButtonTitle ? props.functionButtonTitle : null,
      showTopCloseButonn: props.showTopCloseButonn ? props.showTopCloseButonn : true,
    };
  }

  openModal = () => {
    this.setState({
      isModalOpen: true,
    });
  };

  closeModal = () => {
    this.setState({
      isModalOpen: false,
    });
  };
  s;

  render() {
    const {
      isModalOpen,
      children,
      modalTitle,
      className,
      modalFunction,
      functionButtonTitle,
      showTopCloseButonn
    } = this.state;
    return (
      <MaterialModal
        open={isModalOpen}
        onClose={this.closeModal}
        className={`modal ${className}`}
      >
        <div className="modal__content">
          <div className="modal__header">
            {modalTitle ? <span>{modalTitle}</span> : ""}

            {showTopCloseButonn &&  <Button className="modal__close-btn" onClick={this.closeModal}>
              <HighlightOffIcon />
            </Button>}
           
          </div>
          <div className="modal__body">{children}</div>
          <div className="modal__footer">
            <Button className="is-secondary" onClick={this.closeModal}>
              Close
            </Button>
            {modalFunction && (
              <Button className="is-primary" onClick={modalFunction}>
                {functionButtonTitle}
              </Button>
            )}
          </div>
        </div>
      </MaterialModal>
    );
  }
}

export default Modal;
