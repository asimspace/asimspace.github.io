import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalOverlay = ({ show, onHide, title, children, 
                        footerButtonText, footerBtnColor,
                        onFooterButtonClick, fullWidth }) => {
    return (
        <Modal  show={show} onHide={onHide} size={fullWidth ? "lg" : undefined} dialogClassName={fullWidth ? "modal-90w" : ""} >
            <Modal.Header closeButton>
                <Modal.Title>{title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
            {footerButtonText && onFooterButtonClick && (
                <Modal.Footer>
                    <Button variant={footerBtnColor ? footerBtnColor : 'primary'} onClick={onFooterButtonClick}>
                        {footerButtonText}
                    </Button>
                </Modal.Footer>
            )}
        </Modal>
    );
};

export default ModalOverlay;