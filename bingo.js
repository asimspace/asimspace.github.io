    let generatedNumbers = [];

    function startGenerating() {
      const generateButton = document.getElementById('generateButton');
      generateButton.disabled = true;

      // Show Bootstrap Spinner
      generateButton.innerHTML = `<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Generating...`;

      setTimeout(generateBingoNumber, 2000);
    }

    function generateBingoNumber() {
      const generateButton = document.getElementById('generateButton');
      generateButton.innerText = "Generate Number";
      generateButton.disabled = false;

      const bingoLetters = ['B', 'I', 'N', 'G', 'O'];
      const letter = bingoLetters[Math.floor(Math.random() * bingoLetters.length)];
      const number = Math.floor(Math.random() * 15) + 1 + (bingoLetters.indexOf(letter) * 15);
      const bingoNumber = `${letter} - ${number}`;

      if (!generatedNumbers.includes(bingoNumber)) {
        generatedNumbers.push(bingoNumber);
        displayNumber(bingoNumber);
      } else {
        generateBingoNumber(); // Avoid duplicates
      }
    }

    function displayNumber(number) {
      const middleSection = document.getElementById('middleSection');
      const badge = document.createElement('span');
      
      // Assign Bootstrap classes based on BINGO letter
      const badgeClass = {
        B: "bg-primary text-white",
        I: "bg-success text-white",
        N: "bg-danger text-white",
        G: "bg-warning",
        O: "bg-dark text-white"
      }[number.charAt(0)];

      badge.className = `d-inline p-1 ${badgeClass}`;
      badge.innerText = number;
      middleSection.appendChild(badge);

      // Enable Bingo Button when at least 4 numbers are generated
      if (generatedNumbers.length >= 4) {
        document.getElementById('bingoButton').disabled = false;
      }
    }

    function resetGame() {
      generatedNumbers = [];
      document.getElementById('middleSection').innerHTML = ''; // Clears numbers
      document.getElementById('bingoButton').disabled = true; // Disable Bingo button again
    }

// Function to generate a BINGO board
function generateBingoBoard() {
    const bingoBoard = document.getElementById("bingoBoard");

    // Generate numbers for each column (B, I, N, G, O)
    const columns = {
        B: generateRandomNumbers(1, 15, 5),
        I: generateRandomNumbers(16, 30, 5),
        N: generateRandomNumbers(31, 45, 5),
        G: generateRandomNumbers(46, 60, 5),
        O: generateRandomNumbers(61, 75, 5)
    };

    // Create the board rows
    for (let row = 0; row < 5; row++) {
        let rowHtml = '<tr>';
        for (let col of ['B', 'I', 'N', 'G', 'O']) {
            // Skip the center square for the "N" column (row 2)
            if (col === 'N' && row === 2) {
                rowHtml += '<td class="text-center font-weight-bold align-middle" onclick="toggleStrikeThrough(this)">X</td>';
            } else {
                rowHtml += `<td class="text-center align-middle" onclick="toggleStrikeThrough(this)">${columns[col][row]}</td>`;
            }
        }
        rowHtml += '</tr>';
        bingoBoard.innerHTML += rowHtml;
    }
}

// Function to generate an array of random numbers within a range
function generateRandomNumbers(min, max, count) {
    let numbers = [];
    while (numbers.length < count) {
        const randNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (!numbers.includes(randNum)) {
            numbers.push(randNum);
        }
    }
    return numbers;
}

// Function to toggle the strikethrough effect in the clicked cell
function toggleStrikeThrough(cell) {
    // Toggle the strikethrough using Bootstrap's text-decoration utility
    cell.classList.toggle('text-decoration-line-through');
    cell.classList.toggle('bg-light');
}

