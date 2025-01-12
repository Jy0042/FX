import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const ModalComponent = ({ show, title, body, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <ButtonComponent
          className="btn btn-outline-secondary"
          onClick={onClose}
          type="button"
          variant="outline"
        >
          닫기
        </ButtonComponent>
        {onConfirm && (
          <ButtonComponent
            className="btn btn-primary"
            onClick={onConfirm}
            type="button"
            variant="primary"
          >
            확인
          </ButtonComponent>
        )}
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
