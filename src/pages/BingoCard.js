import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Alert from '../components/Alert';

const BingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);

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
        const savedBoardNumbers = localStorage.getItem('bingoBoardNumbers') || getCookie('bingoBoardNumbers');
        const savedClickedCells = localStorage.getItem('clickedCells') || getCookie('clickedCells');

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
            B: generateRandomNumbers(1, 15, 5),
            I: generateRandomNumbers(16, 30, 5),
            N: generateRandomNumbers(31, 45, 5),
            G: generateRandomNumbers(46, 60, 5),
            O: generateRandomNumbers(61, 75, 5)
        };
        setBoardNumbers(columns);
        const boardNumbersString = JSON.stringify(columns);
        localStorage.setItem('bingoBoardNumbers', boardNumbersString); // Save to localStorage
        setCookie('bingoBoardNumbers', boardNumbersString, 7); // Save to cookies as fallback
        setClickedCells({});
        localStorage.removeItem('clickedCells'); // Clear clicked cells in localStorage
        setCookie('clickedCells', '', -1); // Clear clicked cells in cookies
        setTableClass(getRandomTableClass()); // Change table class
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
                    rowCells.push(
                        <td
                            key={cellKey}
                            className={`text-center align-middle bingo-cell ${isClicked ? 'bg-secondary-subtle' : ''}`}
                            style={{ textDecoration: isClicked ? 'line-through' : 'none' }}
                            onClick={() => handleCellClick(cellKey)}
                        >
                            {boardNumbers[col] && boardNumbers[col][row]}
                        </td>
                    );
                }
            }
            rows.push(<tr key={row}>{rowCells}</tr>);
        }
        setBoardRows(rows);
    };

    const generateRandomNumbers = (min, max, count) => {
        let numbers = [];
        while (numbers.length < count) {
            const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (!numbers.includes(randNum)) {
                numbers.push(randNum);
            }
        }
        return numbers;
    };

    const handleCellClick = (cellKey) => {
        const updatedClickedCells = {
            ...clickedCells,
            [cellKey]: !clickedCells[cellKey]
        };
        setClickedCells(updatedClickedCells);
        const clickedCellsString = JSON.stringify(updatedClickedCells);
        localStorage.setItem('clickedCells', clickedCellsString); // Save clicked cells to localStorage
        setCookie('clickedCells', clickedCellsString, 7); // Save clicked cells to cookies as fallback
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
                <title>Bingo Card - Player</title>
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
             </div>
        </div>
    );
};

export default BingoCard;