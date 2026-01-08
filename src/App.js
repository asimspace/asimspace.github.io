import React, { useState } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PlayBingo from "./pages/BingoGenerator";
import BabyShowerBingo from "./pages/BabyShowerBingo";
import About from "./pages/About";
import BingoCard from "./pages/BingoCard";
import BabyShowerBingoCard from "./pages/BabyShowerBingoCard";
import { HelmetProvider } from "react-helmet-async";
import BingoGuide from "./components/BingoGuide";

const App = () => {
  const [modalShow, setModalShow] = useState(false);
  const [offCanvasShow, setOffCanvasShow] = useState(false);
  const [isAutomating, setIsAutomating] = useState(false);
  const [automationCallback, setAutomationCallback] = useState(null);
  const [isSoundEnabled, setIsSoundEnabled] = useState(true);

  const handleAutomate = (enabled, interval) => {
    setIsAutomating(enabled);
    setAutomationCallback({ enabled, interval });
  };

  const handleSoundToggle = (enabled) => {
    setIsSoundEnabled(enabled);
  };

  return (
    <HelmetProvider>
      <Router>
        <Header showModal={() => setModalShow(true)} />
        <main>
          <Routes>
            <Route path="/" element={<Home showOffCanvas={() => setOffCanvasShow(true)}/>} />
            <Route path="/about" element={<About />} />
            <Route path="/play-bingo" element={<PlayBingo automationCallback={automationCallback} isSoundEnabled={isSoundEnabled} onSoundToggle={handleSoundToggle} />} />
            <Route path="/baby-shower-bingo" element={<BabyShowerBingo automationCallback={automationCallback} isSoundEnabled={isSoundEnabled} onSoundToggle={handleSoundToggle} />} />
            <Route path="/bingo-card" element={<BingoCard />} />
            <Route path="/baby-shower-bingo-card" element={<BabyShowerBingoCard />} />
          </Routes>
        </main>
        <Footer onAutomate={handleAutomate} isAutomating={isAutomating} isSoundEnabled={isSoundEnabled} onSoundToggle={handleSoundToggle} />
        <BingoGuide show={offCanvasShow} hide={() => setOffCanvasShow(false)} />
      </Router>
    </HelmetProvider>
  );
};

export default App;
