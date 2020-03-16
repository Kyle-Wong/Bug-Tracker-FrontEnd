import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
const ConfirmDeleteModal = props => {
  const { show, onClose, onDelete } = props;

  return (
    <Modal
      show={show}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      onHide={onClose}
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Delete Project
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ fontSize: "16px" }}>
        Are you sure you wish to delete this?
      </Modal.Body>
      <Modal.Footer className="justify-content-center">
        <Button
          variant="danger mx-3"
          onClick={() => {
            onDelete(props);
            onClose();
          }}
        >
          Delete
        </Button>
        <Button variant="secondary mx-3" onClick={onClose}>
          Cancel
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmDeleteModal;
