import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';

const BingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const [alertClass, setAlertClass] = useState('slide-in');

    useEffect(() => {
      const columns = {
        B: generateRandomNumbers(1, 15, 5),
        I: generateRandomNumbers(16, 30, 5),
        N: generateRandomNumbers(31, 45, 5),
        G: generateRandomNumbers(46, 60, 5),
        O: generateRandomNumbers(61, 75, 5)
      };
      setBoardNumbers(columns);
      setTableClass(getRandomTableClass());

      // Show the alert with a delay of 0.5s
      setTimeout(() => setShowAlert(true), 500);

      // Automatically fade out the alert after 5 seconds
      const timer = setTimeout(() => {
          setAlertClass('slide-out'); // Trigger slide-out animation
          setTimeout(() => setShowAlert(false), 500); // Remove alert after animation
      }, 5500);
    }, []);

    useEffect(() => {
      if (Object.keys(boardNumbers).length > 0) {
        generateBingoBoard();
      }
    }, [boardNumbers, clickedCells]);

    const generateBingoBoard = () => {
      // Create the board rows
      const rows = [];
      for (let row = 0; row < 5; row++) {
        const rowCells = [];
        for (let col of ['B', 'I', 'N', 'G', 'O']) {
          // Skip the center square for the "N" column (row 2)
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

    return (
      <div className="container text-center my-5 pt-5">
        <Helmet>
          <title>Bingo Card - Player</title>
        </Helmet>
        {/* Bootstrap Alert */}
        {showAlert && (
          <div 
            className={`alert alert-success alert-dismissible fade show position-fixed top-0 end-0 m-3 ${alertClass}`} 
            role="alert" 
            style={{ zIndex: 1050 }}
          >
            Good Luck!
            <button 
              type="button" 
              className="btn-close" 
              aria-label="Close" 
              onClick={() => setShowAlert(false)}
            ></button>
          </div>
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
      </div>
    );
};

export default BingoCard;