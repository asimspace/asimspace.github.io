import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Alert from '../components/Alert';


const BingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);

    useEffect(() => {
      // Load bingo card numbers from localStorage if available
      const savedBoardNumbers = localStorage.getItem('bingoBoardNumbers');
      if (savedBoardNumbers) {
        setBoardNumbers(JSON.parse(savedBoardNumbers));
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
        const columns = {
            B: generateRandomNumbers(1, 15, 5),
            I: generateRandomNumbers(16, 30, 5),
            N: generateRandomNumbers(31, 45, 5),
            G: generateRandomNumbers(46, 60, 5),
            O: generateRandomNumbers(61, 75, 5)
        };
        setBoardNumbers(columns);
        localStorage.setItem('bingoBoardNumbers', JSON.stringify(columns)); // Save to localStorage
        setClickedCells({});
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
        setClickedCells(prevState => ({
            ...prevState,
            [cellKey]: !prevState[cellKey]
        }));
    };

    const getRandomTableClass = () => {
        const classes = ['border-primary', 'border-danger', 'border-warning', 'border-dark', 'border-success', 'border-info'];
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
            <table id="bingo-card" className={`table table-bordered table-responsive-sm mx-auto ${tableClass}`} style={{maxWidth: '90%'}}>
              <thead>
                <tr>
                  <td className="text-primary ">B</td>
                  <td className="text-success ">I</td>
                  <td className="text-danger ">N</td>
                  <td className="text-warning ">G</td>
                  <td className="text-dark ">O</td>
                </tr>
              </thead>
              <tbody>
              {boardRows}
              </tbody>
            </table>
          </div>
        </div>

        {/* Refresh Icon */}
        <div className="mt-5">
          <button className="btn btn-outline-secondary" onClick={handleRefreshClick}>
              NEW BINGO CARD!
          </button>
        </div>

      </div>
    );
};

export default BingoCard;