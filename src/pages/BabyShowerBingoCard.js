import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import Alert from '../components/Alert';
import { babyShowerWords } from '../constants/babyShowerWords';

const BabyShowerBingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const navigate = useNavigate();

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

    const migrateOldFormat = (savedData) => {
        // Convert old column format (B, I, N, G, O) to new flat format (cell-0 to cell-24)
        if (savedData && savedData.B) {
            // Old format detected
            const boardData = {};
            let cellIndex = 0;
            for (let col of ['B', 'I', 'N', 'G', 'O']) {
                if (savedData[col]) {
                    for (let row = 0; row < 5; row++) {
                        boardData[`cell-${cellIndex}`] = savedData[col][row];
                        cellIndex++;
                    }
                }
            }
            return boardData;
        }
        // Already in new format
        return savedData;
    };

    const migrateOldClickedCells = (savedClickedCells) => {
        // Convert old clicked cells format (B-0, I-1, etc) to new format (cell-0, cell-1, etc)
        const migratedCells = {};
        
        for (const key in savedClickedCells) {
            if (key.includes('-')) {
                const [col, row] = key.split('-');
                const colIndex = ['B', 'I', 'N', 'G', 'O'].indexOf(col);
                if (colIndex !== -1) {
                    const cellIndex = colIndex * 5 + parseInt(row);
                    migratedCells[`cell-${cellIndex}`] = savedClickedCells[key];
                } else {
                    // Already new format
                    migratedCells[key] = savedClickedCells[key];
                }
            } else {
                // Already new format
                migratedCells[key] = savedClickedCells[key];
            }
        }
        
        return Object.keys(migratedCells).length > 0 ? migratedCells : savedClickedCells;
    };

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
        // Load bingo card numbers and clicked cells from localStorage or cookies
        const savedBoardNumbers = localStorage.getItem('babyShowerBingoBoardNumbers') || getCookie('babyShowerBingoBoardNumbers');
        const savedClickedCells = localStorage.getItem('babyShowerClickedCells') || getCookie('babyShowerClickedCells');

        if (savedBoardNumbers) {
            const parsedBoard = JSON.parse(savedBoardNumbers);
            const migratedBoard = migrateOldFormat(parsedBoard);
            
            // Check for duplicates and regenerate if found
            if (hasDuplicates(migratedBoard)) {
                generateNewBingoCard();
                setClickedCells({});
            } else {
                setBoardNumbers(migratedBoard);
                if (savedClickedCells) {
                    const parsedClickedCells = JSON.parse(savedClickedCells);
                    const migratedClickedCells = migrateOldClickedCells(parsedClickedCells);
                    setClickedCells(migratedClickedCells);
                }
            }
        } else {
            generateNewBingoCard();
        }
        setTableClass(getRandomTableClass());
    }, []);

    useEffect(() => {
        if (Object.keys(boardNumbers).length > 0) {
            generateBingoBoard();
        }
    }, [boardNumbers, clickedCells]);

    const generateNewBingoCard = () => {
        // Generate 25 unique words
        const uniqueWords = generateRandomWords(25);
        
        const boardData = {};
        uniqueWords.forEach((word, index) => {
            boardData[`cell-${index}`] = word;
        });

        setBoardNumbers(boardData);
        const boardNumbersString = JSON.stringify(boardData);
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

    const hasDuplicates = (boardData) => {
        const values = Object.values(boardData);
        const uniqueValues = new Set(values);
        return values.length !== uniqueValues.size;
    };

    const generateBingoBoard = () => {
        const rows = [];
        for (let row = 0; row < 5; row++) {
            const rowCells = [];
            for (let col = 0; col < 5; col++) {
                const cellKey = `cell-${row * 5 + col}`;
                const isClicked = clickedCells[cellKey];
                const cellContent = boardNumbers[cellKey];
                const cellStyle = {
                    textDecoration: isClicked ? 'line-through' : 'none',
                    fontSize: '1rem',
                    fontWeight: '300',
                    wordWrap: 'break-word',
                    paddingTop: '1rem',
                    paddingBottom: '1rem',
                    paddingLeft: '0.5rem',
                    paddingRight: '0.5rem',
                    minHeight: '60px',
                    verticalAlign: 'middle',
                    textAlign: 'center'
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
        const classes = ['border-primary', 
                          'border-danger', 
                          'border-warning', 
                          'border-dark', 
                          'border-success', 
                          'border-info'];
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

            <style>{`
                #bingo-card.baby-shower-card {
                    background-color: white;
                    border: 10px solid;
                }
                #bingo-card.baby-shower-card tr td {
                    border: 1px solid black;
                    background-color: white;
                }
            `}</style>

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
                    <table id="bingo-card" className={`baby-shower-card ${tableClass}`} style={{ maxWidth: '100vw', width: '100%', tableLayout: 'fixed', margin: '0 auto', borderCollapse: 'collapse' }}>
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
