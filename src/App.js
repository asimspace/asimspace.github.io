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
import BingoGuide from "./components/BingoGuide";

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [offCanvasShow, setOffCanvasShow] = useState(false);

  return (
    <HelmetProvider>
      <Router>
        <Header showModal={() => setModalShow(true)} />
        <Routes>
          <Route path="/" element={<Home showOffCanvas={() => setOffCanvasShow(true)}/>} />
          <Route path="/about" element={<About />} />
          <Route path="/play-bingo" element={<PlayBingo />} />
          <Route path="/bingo-card" element={<BingoCard />} />
        </Routes>
        <Footer />
        <QRModal show={modalShow} onHide={() => setModalShow(false)} />
        <BingoGuide show={offCanvasShow} hide={() => setOffCanvasShow(false)} />
      </Router>
    </HelmetProvider>
  );
};

export default App;
