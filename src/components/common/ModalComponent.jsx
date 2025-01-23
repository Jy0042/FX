import React from 'react';
import { Modal } from 'react-bootstrap';
import ButtonComponent from './ButtonComponent';

const ModalComponent = ({ show, title, body, onClose, onConfirm }) => {
  return (
    <Modal show={show} onHide={onClose || onConfirm} centered>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        {/* 닫기 버튼 (onClose가 있을 경우에만 렌더링) */}
        {onClose && (
          <ButtonComponent
            className="me-2"
            onClick={onClose}
            type="button"
            variant="outline-secondary"
          >
            닫기
          </ButtonComponent>
        )}
        {/* 확인 버튼 */}
        <ButtonComponent
          className="btn-primary"
          onClick={onConfirm}
          type="button"
          variant="primary"
        >
          확인
        </ButtonComponent>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalComponent;
