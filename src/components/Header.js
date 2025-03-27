import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { useState } from "react";
import ModalOverlay from "./ModalOverlay";

const Header = ({ showModal }) => {

  const [showQRModal, setShowQRModal] = useState(false);
  const handleShowQRModal = () => setShowQRModal(true);
  const handleHideQRModal = () => setShowQRModal(false);
  
  return (
  <nav className="navbar navbar-dark bg-primary fixed-top box-shadow">
    <div class="container d-flex justify-content-between">
        <Link className="navbar-brand lead" to="/">a.s</Link>
        <div className="ml-auto d-flex align-items-center">
        {/* <Link className="nav-link" to="/about">About</Link> */}
        <Link className="nav-link" to="/bingo-card">bingo-card</Link>
        <Button onClick={handleShowQRModal} className="btn btn-primary rounded-0">[QR]</Button>
        </div>
    </div>

    {/* Overlay for Bingo Card Scanner */}
    <ModalOverlay
      show={showQRModal}
      onHide={handleHideQRModal}
      title="Scan for Bingo Card!"
    >
      <div className="text-center">
          <img src="/qr.png" alt="QR Code for Bingo Card" className="img-fluid"/>
      </div>
    </ModalOverlay>
  </nav>
  
)};

export default Header;