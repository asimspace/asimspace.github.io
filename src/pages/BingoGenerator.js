import { useState, useEffect } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";

const BingoGenerator = () => {
    const [generatedNumbers, setGeneratedNumbers] = useState(() => {
        const savedNumbers = localStorage.getItem('generatedNumbers');
        return savedNumbers ? JSON.parse(savedNumbers) : [];
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);

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
                      <Spinner animation="grow" size="sm" /> Generating
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
                        <span key={index} className={`d-inline px-1 fw-light ${badgeClass} ${fadingOut ? '' : 'fade-in'}`}>{num}</span>
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