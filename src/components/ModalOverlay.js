import React from "react";
import { Modal, Button } from "react-bootstrap";

const ModalOverlay = ({ show, onHide, title, children, 
                        footerButtonText, footerBtnColor,
                        onFooterButtonClick }) => {
    return (
        <Modal  show={show} onHide={onHide} >
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