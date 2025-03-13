import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Board from "./pages/Board";
import QRModal from "./components/QRModal";

const App = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <Router>
      <Header showModal={() => setModalShow(true)} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/board" element={<Board />} />
      </Routes>
      <Footer />
      <QRModal show={modalShow} onHide={() => setModalShow(false)} />
    </Router>
  );
};

export default App;
