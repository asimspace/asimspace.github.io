import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Header = ({ showModal }) => (
  <nav className="navbar navbar-dark bg-primary fixed-top box-shadow">
    <div class="container d-flex justify-content-between">
        <Link className="navbar-brand lead" to="/">a.s</Link>
        <div className="ml-auto d-flex align-items-center">
        {/* <Link className="nav-link" to="/about">About</Link> */}
        <Link className="nav-link" to="/bingo-card">bingo-card</Link>
        <Button onClick={showModal} className="btn btn-primary rounded-0">[QR]</Button>
        </div>
    </div>
  </nav>
  
);

export default Header;