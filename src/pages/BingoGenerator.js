import { useState } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const BingoGenerator = () => {
    const [generatedNumbers, setGeneratedNumbers] = useState([]);
    const [isGenerating, setIsGenerating] = useState(false);
  
    const startGenerating = () => {
      setIsGenerating(true);
      setTimeout(generateBingoNumber, 2000);
    };
  
    const generateBingoNumber = () => {
      setIsGenerating(false);
      const bingoLetters = ['B', 'I', 'N', 'G', 'O'];
      const letter = bingoLetters[Math.floor(Math.random() * bingoLetters.length)];
      const number = Math.floor(Math.random() * 15) + 1 + (bingoLetters.indexOf(letter) * 15);
      const bingoNumber = `${letter}- ${number}`;
  
      setGeneratedNumbers(prevNumbers => {
        if (!prevNumbers.includes(bingoNumber)) {
          return [...prevNumbers, bingoNumber];
        }
        return prevNumbers;
      });
    };

    const resetNumber = () => {
        setGeneratedNumbers([]);
    };

  return (
    <div className="container text-center my-5 pt-5">
        <Helmet>
          <title>Free Bingo Number Generator - Home </title>
        </Helmet>
        <div className="row">
            <div className="col">
                <Button id="generateButton" onClick={startGenerating} className="btn btn-primary btn-lg rounded-0" disabled={isGenerating}>
                {isGenerating ? (
                    <>
                      <Spinner animation="border" role="status" size="sm" className="me-2">
                          <span className="visually-hidden">Loading...</span>
                      </Spinner>
                      Generating...
                    </>
                ) : (
                    "Generate a Number"
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
                        <span key={index} className={`d-inline px-1 fw-light ${badgeClass}`}>{num}</span>
                    );
                    })}
                </div>
                <Button onClick={resetNumber} variant="danger" className="btn-lg rounded-0" disabled={generatedNumbers.length < 4}>Bingo!</Button>
            
            </div>
        </div>
    </div>
  );
};

export default BingoGenerator;