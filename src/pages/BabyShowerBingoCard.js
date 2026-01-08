import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';

const BabyShowerBingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

    const babyShowerWords = [
        'Baby', 'Diapers', 'Bottle', 'Pacifier', 'Crib', 'Stroller', 'Blanket', 'Rattle', 'Onesie', 'Bib',
        'Booties', 'Teddy Bear', 'Lullaby', 'Rocking Chair', 'Baby Powder', 'Baby Wipes', 'Burp Cloth', 'Changing Table', 'High Chair', 'Baby Monitor',
        'Teething Ring', 'Baby Shampoo', 'Hooded Towel', 'Storybook', 'Mobile', 'Nursery', 'Swaddle', 'Formula', 'Breast Pump', 'Diaper Bag',
        'Car Seat', 'Play Mat', 'Sippy Cup', 'Night Light', 'Baby Lotion', 'Socks', 'Mittens', 'Baby Carrier', 'Tummy Time', 'Growth Chart',
        'Bath Time', 'Baby Food', 'Spoon', 'Bib Clip', 'Cradle', 'Baby Swing', 'Baby Walker', 'Teether', 'Plush Toy', 'Pajamas',
        'Baby Oil', 'Nail Clippers', 'Thermometer', 'First Steps', 'Giggle', 'Yawn', 'Nap Time', 'Peekaboo', 'Lullaby Book', 'Baby Hat',
        'Diaper Rash Cream', 'Feeding Time', 'Milestone', 'Ultrasound', 'Baby Shower', 'Stork', 'Baby Registry', 'Name Reveal', 'Mommy-to-be', 'Daddy-to-be',
        'Gender Reveal', 'Baby Blanket', 'Cradle Cap', 'Newborn', 'Teething Gel'
    ];

    // Helper functions for cookies
    const setCookie = (name, value, days) => {
        const expires = new Date(Date.now() + days * 864e5).toUTCString();
        document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/`;
    };

    const getCookie = (name) => {
        return document.cookie.split('; ').reduce((r, v) => {
            const [key, val] = v.split('=');
            return key === name ? decodeURIComponent(val) : r;
        }, '');
    };

    useEffect(() => {
        // Load bingo card numbers and clicked cells from localStorage or cookies
        const savedBoardNumbers = localStorage.getItem('babyShowerBingoBoardNumbers') || getCookie('babyShowerBingoBoardNumbers');
        const savedClickedCells = localStorage.getItem('babyShowerClickedCells') || getCookie('babyShowerClickedCells');

        if (savedBoardNumbers) {
            setBoardNumbers(JSON.parse(savedBoardNumbers));
        } else {
            generateNewBingoCard();
        }
        if (savedClickedCells) {
            setClickedCells(JSON.parse(savedClickedCells));
        }
        setTableClass(getRandomTableClass());
    }, []);

    useEffect(() => {
        if (Object.keys(boardNumbers).length > 0) {
            generateBingoBoard();
        }
    }, [boardNumbers, clickedCells]);

    const generateNewBingoCard = () => {
        const columns = {
            B: generateRandomWords(5),
            I: generateRandomWords(5),
            N: generateRandomWords(5),
            G: generateRandomWords(5),
            O: generateRandomWords(5)
        };

        setBoardNumbers(columns);
        const boardNumbersString = JSON.stringify(columns);
        localStorage.setItem('babyShowerBingoBoardNumbers', boardNumbersString);
        setCookie('babyShowerBingoBoardNumbers', boardNumbersString, 7);
        setClickedCells({});
        localStorage.removeItem('babyShowerClickedCells');
        setCookie('babyShowerClickedCells', '', -1);
        setTableClass(getRandomTableClass());
    };

    const generateRandomWords = (count) => {
        const words = [];
        const availableWords = [...babyShowerWords];
        
        while (words.length < count && availableWords.length > 0) {
            const randomIndex = Math.floor(Math.random() * availableWords.length);
            words.push(availableWords[randomIndex]);
            availableWords.splice(randomIndex, 1);
        }
        
        return words;
    };

    const generateBingoBoard = () => {
        const rows = [];
        for (let row = 0; row < 5; row++) {
            const rowCells = [];
            for (let col of ['B', 'I', 'N', 'G', 'O']) {
                const cellKey = `${col}-${row}`;
                if (col === 'N' && row === 2) {
                    rowCells.push(<td key={cellKey} className="text-center font-weight-bold text-danger align-middle bg-secondary-subtle">★</td>);
                } else {
                    const isClicked = clickedCells[cellKey];
                    const cellContent = boardNumbers[col] && boardNumbers[col][row];
                    const cellStyle = {
                        textDecoration: isClicked ? 'line-through' : 'none',
                        fontSize: '0.85rem',
                        wordWrap: 'break-word',
                        padding: '0.5rem'
                    };
                    
                    rowCells.push(
                        <td
                            key={cellKey}
                            className={`text-center align-middle bingo-cell ${isClicked ? 'bg-secondary-subtle' : ''}`}
                            style={cellStyle}
                            onClick={() => handleCellClick(cellKey)}
                        >
                            {cellContent}
                        </td>
                    );
                }
            }
            rows.push(<tr key={row}>{rowCells}</tr>);
        }
        setBoardRows(rows);
    };

    const handleCellClick = (cellKey) => {
        const updatedClickedCells = {
            ...clickedCells,
            [cellKey]: !clickedCells[cellKey]
        };
        setClickedCells(updatedClickedCells);
        const clickedCellsString = JSON.stringify(updatedClickedCells);
        localStorage.setItem('babyShowerClickedCells', clickedCellsString);
        setCookie('babyShowerClickedCells', clickedCellsString, 7);
    };

    const getRandomTableClass = () => {
        const classes = ['border-primary bg-primary text-white', 
                          'border-danger bg-danger text-white', 
                          'border-warning bg-warning', 
                          'border-dark bg-dark text-white', 
                          'border-success bg-success text-white', 
                          'border-info bg-info'];
        return classes[Math.floor(Math.random() * classes.length)];
    };

    const handleRefreshClick = () => {
        if (window.confirm('New Bingo card will be created. Your current progress will be lost. Continue?')) {
            generateNewBingoCard();
        }
    };

    return (
        <div className="container text-center my-5 pt-5">
            <Helmet>
                <title>Baby Shower Bingo Card - Player</title>
            </Helmet>

            {/* Bootstrap Alert */}
            {showAlert && (
                <Alert
                    content="Good Luck!"
                    alertClass="alert-success"
                    onClose={() => setShowAlert(false)}
                />
            )}

            <div className="row">
                <div className="col">
                    <table id="bingo-card" className={`table table-responsive-sm mx-auto ${tableClass}`} style={{ maxWidth: '90%' }}>
                        <thead>
                            <tr>
                                <td className={`${tableClass}`}>B</td>
                                <td className={`${tableClass}`}>I</td>
                                <td className={`${tableClass}`}>N</td>
                                <td className={`${tableClass}`}>G</td>
                                <td className={`${tableClass}`}>O</td>
                            </tr>
                        </thead>
                        <tbody>
                            {boardRows}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Refresh Icon */}
            <div className="mt-3">
                <button className="btn btn-outline-secondary" onClick={handleRefreshClick}>
                    NEW CARD!
                </button>
                <button className="btn btn-outline-primary ms-2" onClick={() => navigate('/bingo-card')}>
                    CLASSIC BINGO
                </button>
            </div>
        </div>
    );
};

export default BabyShowerBingoCard;
