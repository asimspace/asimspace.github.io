import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import Alert from '../components/Alert';
import { Button, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const BingoCard = () => {
    const [boardNumbers, setBoardNumbers] = useState({});
    const [boardRows, setBoardRows] = useState([]);
    const [clickedCells, setClickedCells] = useState({});
    const [tableClass, setTableClass] = useState('');
    const [showAlert, setShowAlert] = useState(true);
    const [isDirty, setIsDirty] = useState(false); 

    const navigate = useNavigate();

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
    }, []);

    useEffect(() => {
      if (Object.keys(boardNumbers).length > 0) {
        generateBingoBoard();
      }
    }, [boardNumbers, clickedCells]);

    useEffect(() => {
      const handleBeforeUnload = (event) => {
          if (isDirty) {
              event.preventDefault();
              event.returnValue = 'Your current Bingo Card will be lost! Do you want to reload the page?'; // Default browser confirmation dialog
          }
      };

      window.addEventListener('beforeunload', handleBeforeUnload);

      return () => {
          window.removeEventListener('beforeunload', handleBeforeUnload);
      };
  }, [isDirty]);

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
      setIsDirty(true);
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

      </div>
    );
};

export default BingoCard;