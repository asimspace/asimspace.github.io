import { useState, useEffect, useRef } from "react";
import { Button, Spinner, Alert } from "react-bootstrap";
import { Helmet } from "react-helmet-async";
import { SortAlphaDown, SortAlphaUp } from "react-bootstrap-icons";
import ModalOverlay from "../components/ModalOverlay";
import PopperEffect from "../components/PopperEffect";
import { babyShowerWords } from "../constants/babyShowerWords";

const BabyShowerBingo = ({ automationCallback, onAutomate }) => {
    const [generatedNumbers, setGeneratedNumbers] = useState(() => {
        const savedNumbers = localStorage.getItem('babyShowerBingoNumbers');
        return savedNumbers ? JSON.parse(savedNumbers) : [];
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [fadingOut, setFadingOut] = useState(false);
    const [showOverlay, setShowOverlay] = useState(false);
    const [showPopper, setShowPopper] = useState(false);
    const [sortOrder, setSortOrder] = useState(null); // 'asc', 'desc', or null
    const [showAllPickedAlert, setShowAllPickedAlert] = useState(false);
    const [isAnimatingBackground, setIsAnimatingBackground] = useState(false);
    const automationIntervalRef = useRef(null);

    useEffect(() => {
        localStorage.setItem('babyShowerBingoNumbers', JSON.stringify(generatedNumbers));
    }, [generatedNumbers]);

    useEffect(() => {
        // Apply gradient background to body for baby shower pages
        document.body.style.background = 'linear-gradient(180deg, #CCFBFF 0%, #EF96C5 100%)';
        document.body.style.minHeight = '100vh';
        
        return () => {
            // Reset to white when leaving the page
            document.body.style.background = 'white';
        };
    }, []);

    useEffect(() => {
        if (!automationCallback) return;

        // Disable automation if all items are picked
        if (generatedNumbers.length === 75 && automationCallback.enabled) {
            onAutomate(false, automationCallback.interval);
            if (automationIntervalRef.current) {
                clearInterval(automationIntervalRef.current);
                automationIntervalRef.current = null;
            }
            return;
        }

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
    }, [automationCallback, generatedNumbers]);

    const startGenerating = () => {
        setIsGenerating(true);
        setTimeout(() => generateBingoNumber(), 2000);
    };

    const generateBingoNumber = () => {
        setGeneratedNumbers(prevNumbers => {
            // Check if all items already picked
            if (prevNumbers.length >= 75) {
                setIsGenerating(false);
                setShowAllPickedAlert(true);
                return prevNumbers;
            }

            let bingoItem;
            let attempts = 0;
            do {
                bingoItem = babyShowerWords[Math.floor(Math.random() * babyShowerWords.length)];
                attempts++;
            } while (prevNumbers.includes(bingoItem) && attempts < 100);
            
            // If couldn't find new item, all items are picked
            if (prevNumbers.includes(bingoItem) && attempts >= 100) {
                setIsGenerating(false);
                setShowAllPickedAlert(true);
                return prevNumbers;
            }
            
            const newNumbers = [...prevNumbers, bingoItem];
            
            // If just reached 75, disable button and show alert
            if (newNumbers.length === 75) {
                setTimeout(() => setIsGenerating(false), 500);
                setTimeout(() => setShowAllPickedAlert(true), 500);
            } else {
                setIsGenerating(false);
            }
            
            return newNumbers;
        });
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
        setSortOrder(null); // Reset sort when opening modal
    };

    const handleSortAscending = () => {
        setSortOrder(sortOrder === 'asc' ? null : 'asc');
    };

    const handleSortDescending = () => {
        setSortOrder(sortOrder === 'desc' ? null : 'desc');
    };

    const getSortedNumbers = () => {
        if (sortOrder === 'asc') {
            return [...generatedNumbers].sort((a, b) => a.localeCompare(b));
        } else if (sortOrder === 'desc') {
            return [...generatedNumbers].sort((a, b) => b.localeCompare(a));
        }
        return generatedNumbers;
    };

    const handleVerifyWinner = () => {
        setShowPopper(true);
        resetNumber();
        setShowOverlay(false);
        setTimeout(() => setShowPopper(false), 3000);
    };

    return (
        <>
            <PopperEffect trigger={showPopper} />
            
            {/* Fixed Pick Button */}
            <Button 
                id="generateButton" 
                onClick={startGenerating} 
                className="btn btn-danger btn-lg rounded-0 fw-light" 
                disabled={isGenerating || generatedNumbers.length === 75}
                style={{
                    position: 'fixed',
                    top: '70px',
                    right: '1rem',
                    zIndex: 1000,
                    minWidth: '150px'
                }}
            >
                {isGenerating ? (
                    <>
                        <Spinner animation="grow" size="sm" /> Picking
                    </>
                ) : (
                    "Pick an Item"
                )}
            </Button>
            
            {showAllPickedAlert && (
                <Alert 
                    variant="warning" 
                    className="mt-3 mx-auto" 
                    style={{ maxWidth: '500px', width: '90%', position: 'fixed', top: '250px', left: '50%', transform: 'translateX(-50%)', zIndex: 999 }}
                    onClose={() => setShowAllPickedAlert(false)}
                    dismissible
                >
                    <Alert.Heading>All Items are Picked!</Alert.Heading>
                    <p>
                        Re-check your Bingo!!
                    </p>
                </Alert>
            )}

            <div className="d-flex flex-column" style={{ minHeight: '80vh' }}>
                <div className="flex-grow-1 d-flex align-items-center justify-content-center">
                    <div className="container text-center">
                        <Helmet>
                            <title>Baby Shower Bingo Generator</title>
                        </Helmet>
                        <div className="row">
                            <div className="col">
                                <div id="bingoNumbers" className="my-5 d-flex flex-wrap justify-content-center gap-1 mt-4" style={{ paddingTop: '2rem' }}>
                                    {generatedNumbers.map((item, index) => {
                                        const badgeClass = "bg-primary text-white";
                                        return (
                                            <span 
                                                key={index} 
                                                className={`d-inline px-3 py-2 fw-light ${badgeClass} ${fadingOut ? '' : 'fade-in'}`}
                                                style={{ borderRadius: '0.375rem', fontSize: 'clamp(0.75rem, 2vw, 1rem)' }}
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
                fullWidth={true}
            >
                <div style={{ marginBottom: '1rem', display: 'flex', justifyContent: 'center', gap: '0.5rem' }}>
                    <button
                        onClick={handleSortAscending}
                        style={{
                            background: sortOrder === 'asc' ? '#0d6efd' : '#f8f9fa',
                            color: sortOrder === 'asc' ? 'white' : 'black',
                            border: '1px solid #dee2e6',
                            borderRadius: '0.375rem',
                            padding: '0.25rem 0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            transition: 'all 0.3s ease'
                        }}
                        title="Sort A-Z"
                    >
                        <SortAlphaDown size={14} /> A-Z
                    </button>
                    <button
                        onClick={handleSortDescending}
                        style={{
                            background: sortOrder === 'desc' ? '#0d6efd' : '#f8f9fa',
                            color: sortOrder === 'desc' ? 'white' : 'black',
                            border: '1px solid #dee2e6',
                            borderRadius: '0.375rem',
                            padding: '0.25rem 0.5rem',
                            cursor: 'pointer',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.25rem',
                            fontSize: '0.75rem',
                            transition: 'all 0.3s ease'
                        }}
                        title="Sort Z-A"
                    >
                        <SortAlphaUp size={14} /> Z-A
                    </button>
                </div>
                <div style={{ textAlign: 'center', display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '0.5rem', width: '100%' }}>
                    {getSortedNumbers().map((item, index) => (
                        <span 
                            key={index} 
                            className="badge bg-info text-white fw-light" 
                            style={{ padding: '0.5rem 0.75rem', fontSize: '0.9rem' }}
                        >
                            {item}
                        </span>
                    ))}
                </div>
            </ModalOverlay>
        </>
    );
};

export default BabyShowerBingo;
