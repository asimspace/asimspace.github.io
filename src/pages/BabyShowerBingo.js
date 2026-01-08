import { useState, useEffect, useRef } from "react";
import { Button, Spinner } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import ModalOverlay from "../components/ModalOverlay";
import BouncingBalls from "../components/BouncingBalls";
import PopperEffect from "../components/PopperEffect";

const BabyShowerBingo = ({ automationCallback, isSoundEnabled, onSoundToggle }) => {
    const [generatedNumbers, setGeneratedNumbers] = useState(() => {
        const savedNumbers = localStorage.getItem('babyShowerBingoNumbers');
        return savedNumbers ? JSON.parse(savedNumbers) : [];
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopper, setShowPopper] = useState(false);
    const heartbeatAudioRef = useRef(new Audio('/shake.mp3'));
    const automationIntervalRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('babyShowerBingoNumbers', JSON.stringify(generatedNumbers));
    }, [generatedNumbers]);

    useEffect(() => {
        const audio = heartbeatAudioRef.current;
        if (isGenerating && isSoundEnabled) {
            audio.loop = true;
            audio.play().catch(err => console.log('Autoplay prevented:', err));
        } else {
            audio.pause();
            audio.currentTime = 0;
        }
    }, [isGenerating, isSoundEnabled]);

    useEffect(() => {
        if (!automationCallback) return;

        if (automationCallback.enabled) {
            if (automationIntervalRef.current) {
                clearInterval(automationIntervalRef.current);
            }

            automationIntervalRef.current = setInterval(() => {
                startGenerating();
            }, automationCallback.interval * 1000);
        } else {
            if (automationIntervalRef.current) {
                clearInterval(automationIntervalRef.current);
                automationIntervalRef.current = null;
            }
        }

        return () => {
            if (automationIntervalRef.current) {
                clearInterval(automationIntervalRef.current);
            }
        };
    }, [automationCallback]);

    const startGenerating = () => {
        setIsGenerating(true);
        setTimeout(generateBingoNumber, 2000);
    };

    const generateBingoNumber = () => {
        setIsGenerating(false);
        const babyShowerItems = [
            'Baby', 'Diapers', 'Bottle', 'Pacifier', 'Crib', 'Stroller', 'Blanket', 'Rattle', 'Onesie', 'Bib',
            'Booties', 'Teddy Bear', 'Lullaby', 'Rocking Chair', 'Baby Powder', 'Baby Wipes', 'Burp Cloth', 'Changing Table', 'High Chair', 'Baby Monitor',
            'Teething Ring', 'Baby Shampoo', 'Hooded Towel', 'Storybook', 'Mobile', 'Nursery', 'Swaddle', 'Formula', 'Breast Pump', 'Diaper Bag',
            'Car Seat', 'Play Mat', 'Sippy Cup', 'Night Light', 'Baby Lotion', 'Socks', 'Mittens', 'Baby Carrier', 'Tummy Time', 'Growth Chart',
            'Bath Time', 'Baby Food', 'Spoon', 'Bib Clip', 'Cradle', 'Baby Swing', 'Baby Walker', 'Teether', 'Plush Toy', 'Pajamas',
            'Baby Oil', 'Nail Clippers', 'Thermometer', 'First Steps', 'Giggle', 'Yawn', 'Nap Time', 'Peekaboo', 'Lullaby Book', 'Baby Hat',
            'Diaper Rash Cream', 'Feeding Time', 'Milestone', 'Ultrasound', 'Baby Shower', 'Stork', 'Baby Registry', 'Name Reveal', 'Mommy-to-be', 'Daddy-to-be',
            'Gender Reveal', 'Baby Blanket', 'Cradle Cap', 'Newborn', 'Teething Gel'
        ];
        let bingoItem;
        do {
            bingoItem = babyShowerItems[Math.floor(Math.random() * babyShowerItems.length)];
        } while (generatedNumbers.includes(bingoItem));

        setGeneratedNumbers(prevNumbers => [...prevNumbers, bingoItem]);
    };

    const resetNumber = () => {
        setFadingOut(true);
        generatedNumbers.forEach((_, index) => {
            setTimeout(() => {
                setGeneratedNumbers(prevNumbers => prevNumbers.slice(0, -1));
                if (index === generatedNumbers.length - 1) {
                    setFadingOut(false);
                    localStorage.removeItem('babyShowerBingoNumbers');
                }
            }, index * 100);
        });
    };

    const handleBingoClick = () => {
        setShowOverlay(true);
    };

    const handleVerifyWinner = () => {
        setShowPopper(true);
        resetNumber();
        setShowOverlay(false);
        setTimeout(() => setShowPopper(false), 3000);
    };

    return (
        <>
            <BouncingBalls isGenerating={isGenerating} />
            <PopperEffect trigger={showPopper} />
            <div className="d-flex flex-column min-vh-100">
                <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                    <div className="container text-center">
                        <Helmet>
                            <title>Baby Shower Bingo Generator</title>
                        </Helmet>
                        <div className="row">
                            <div className="col">
                                <h2 className="mb-4">Baby Shower Bingo</h2>
                                <Button 
                                    id="generateButton" 
                                    onClick={startGenerating} 
                                    className="btn btn-info btn-lg rounded-0 fw-light" 
                                    disabled={isGenerating}
                                >
                                    {isGenerating ? (
                                        <>
                                            <Spinner animation="grow" size="sm" /> Picking
                                        </>
                                    ) : (
                                        "Pick an Item"
                                    )}
                                </Button>
                                <div id="bingoNumbers" className="my-5 d-flex flex-wrap justify-content-center gap-1 mt-4">
                                    {generatedNumbers.map((item, index) => {
                                        const badgeClass = "bg-info text-white";
                                        return (
                                            <span 
                                                key={index} 
                                                className={`d-inline px-3 py-2 fw-light ${badgeClass} ${fadingOut ? '' : 'fade-in'}`}
                                                style={{ borderRadius: '0.375rem' }}
                                            >
                                                {item}
                                            </span>
                                        );
                                    })}
                                </div>
                                <Button 
                                    onClick={handleBingoClick} 
                                    variant="success" 
                                    className="btn-lg rounded-0" 
                                    disabled={generatedNumbers.length < 4}
                                >
                                    Bingo!
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ModalOverlay
                show={showOverlay}
                onHide={() => setShowOverlay(false)}
                title="Verify Bingo Items!"
                footerButtonText="We have a Winner!"
                footerBtnColor="success"
                onFooterButtonClick={handleVerifyWinner}
            >
                <div style={{ textAlign: 'center' }}>
                    {generatedNumbers.map((item, index) => (
                        <div key={index} style={{ margin: '0.5rem 0' }}>
                            <span className="badge bg-info text-white" style={{ padding: '0.75rem 1rem', fontSize: '1rem' }}>
                                {item}
                            </span>
                        </div>
                    ))}
                </div>
            </ModalOverlay>
        </>
    );
};

export default BabyShowerBingo;
