import React, { Component } from "react";
import { Modal, Button } from "react-bootstrap";
const InvitationModal = props => {
  const { show, onClose, onSubmit, invitation } = props;
  const projectName = invitation.project_name;
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
          Invitation Accepted
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className="text-center" style={{ fontSize: "16px" }}>
        You've been granted access to {projectName}!
      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger mx-3" onClick={onClose}>
          Close
        </Button>
        <Button
          variant="primary mx-3"
          onClick={() => {
            onSubmit(invitation);
          }}
        >
          Go To Project
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default InvitationModal;
