import { useState, useEffect } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ModalOverlay from "../components/ModalOverlay";

const BingoGenerator = () => {
    const [generatedNumbers, setGeneratedNumbers] = useState(() => {
        const savedNumbers = localStorage.getItem('generatedNumbers');
        return savedNumbers ? JSON.parse(savedNumbers) : [];
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false); // State to control overlay visibility

    useEffect(() => {
        localStorage.setItem('generatedNumbers', JSON.stringify(generatedNumbers));
    }, [generatedNumbers]);
  
    const startGenerating = () => {
        setIsGenerating(true);
        setTimeout(generateBingoNumber, 2000);
    };
  
    const generateBingoNumber = () => {
      setIsGenerating(false);
      const bingoLetters = ['B', 'I', 'N', 'G', 'O'];
      let bingoNumber;
      do {
        const letter = bingoLetters[Math.floor(Math.random() * bingoLetters.length)];
        const number = Math.floor(Math.random() * 15) + 1 + (bingoLetters.indexOf(letter) * 15);
        bingoNumber = `${letter}-${number}`;
      } while (generatedNumbers.includes(bingoNumber));

      setGeneratedNumbers(prevNumbers => [...prevNumbers, bingoNumber]);
    };

    const resetNumber = () => {
      setFadingOut(true);
      generatedNumbers.forEach((_, index) => {
        setTimeout(() => {
          setGeneratedNumbers(prevNumbers => prevNumbers.slice(0, -1));
          if (index === generatedNumbers.length - 1) {
            setFadingOut(false);
            localStorage.removeItem('generatedNumbers');
          }
        }, index * 100);
      });
    };

    const groupedNumbers = generatedNumbers.reduce((acc, num) => {
      const letter = num.charAt(0);
      const number = num.split('-')[1];
      if (!acc[letter]) {
        acc[letter] = [];
      }
      acc[letter].push(number);
      return acc;
    }, { B: [], I: [], N: [], G: [], O: [] });

    const handleBingoClick = () => {
        setShowOverlay(true); // Show the overlay
    };

    const handleVerifyWinner = () => {
        resetNumber(); // Perform the reset action
        setShowOverlay(false); // Close the overlay
    };

    return (
      <div className="container text-center my-5 pt-5">
        <Helmet>
          <title>Free Bingo Number Generator - Home </title>
        </Helmet>
        <div className="row">
            <div className="col">
                <Button id="generateButton" onClick={startGenerating} className="btn btn-primary btn-lg rounded-0 fw-light" disabled={isGenerating}>
                    {isGenerating ? (
                        <>
                            <Spinner animation="grow" size="sm" /> Picking
                        </>
                    ) : (
                        "Pick a Number"
                    )}
                </Button>
                <div id="bingoNumbers" className="my-5 d-flex flex-wrap justify-content-center gap-1 mt-4">
                    {generatedNumbers.map((num, index) => {
                        const badgeClass = {
                            B: "bg-primary text-white",
                            I: "bg-success text-white",
                            N: "bg-danger text-white",
                            G: "bg-warning",
                            O: "bg-dark text-white"
                        }[num.charAt(0)];
                        return (
                            <span key={index} className={`d-inline px-1 fw-light ${badgeClass} ${fadingOut ? '' : 'fade-in'}`}>{num}</span>
                        );
                    })}
                </div>
                <Button onClick={handleBingoClick} variant="danger" className="btn-lg rounded-0" disabled={generatedNumbers.length < 4}>Bingo!</Button>
            </div>
        </div>

        {/* Overlay Modal */}
        <ModalOverlay
          show={showOverlay}
          onHide={() => setShowOverlay(false)}
          title="Verify Bingo Numbers!"
          footerButtonText="We have a Winner!"
          footerBtnColor="success"
          onFooterButtonClick={handleVerifyWinner}
        >
          <table className="table table-bordered">
            <tbody>
              {Object.entries(groupedNumbers).map(([letter, numbers]) => (
                <tr key={letter}>
                  <td style={{ width: '7%' }}>{letter}</td>
                  <td>
                    {numbers.map((number, index) => (
                      <span key={index} className="badge bg-success mx-1">{number}</span>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </ModalOverlay>
      </div>
    );
};

export default BingoGenerator;