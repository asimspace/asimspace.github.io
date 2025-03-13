import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PlayBingo from "./pages/BingoGenerator";
import About from "./pages/About";
import BingoCard from "./pages/BingoCard";
import QRModal from "./components/QRModal";
import { HelmetProvider } from "react-helmet-async";

const App = () => {
  const [modalShow, setModalShow] = useState(false);

  return (
    <HelmetProvider>
      <Router>
        <Header showModal={() => setModalShow(true)} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/play-bingo" element={<PlayBingo />} />
          <Route path="/bingo-card" element={<BingoCard />} />
        </Routes>
        <Footer />
        <QRModal show={modalShow} onHide={() => setModalShow(false)} />
      </Router>
    </HelmetProvider>
  );
};

export default App;
