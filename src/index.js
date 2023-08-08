let currentPlayer = 'blue';
numberOfColumns = 7;
numberOfRows = 6;
winCondition = 4;

function gameBoard() {
    const container = document.getElementById("container");
    const tbl = document.createElement('table');
    tbl.classList.add("table");
    for (let i = 0; i < 6; ++i) {
		const tr = tbl.insertRow();
		for (let j = 0; j < 7; ++j) {
			const td = tr.insertCell();
			td.style.border = '1px solid black';
			td.setAttribute('dataRow', i);
			td.setAttribute('dataColumn', j);
			if (i === 0) {
				td.style.cursor = "pointer";
				td.setAttribute('onclick', 'addPiece('+j+')');
			}
		}
    }

    container.appendChild(tbl);
}

gameBoard();

function addPiece(columnNumber) {
    let success = false;
    let checkCells = document.querySelectorAll('[dataColumn="' + columnNumber + '"]');
    for(let i = checkCells.length - 1; i >= 0; --i) {
        if (!checkCells[i].hasAttribute('data-value')) {
            checkCells[i].setAttribute('data-value', currentPlayer);
            success = true;
            break;
        }
    }
  let win = checkWin();
  if (success) {
     if (win === 'blue' || win === 'red') {
        displayMessage(currentPlayer + ' wins!');
     } else if (win === 'tie') {
        displayMessage("It's a tie!");
     } else {
        if (currentPlayer === 'blue') {
           currentPlayer = 'red';
        } else {
           currentPlayer = 'blue';
        }

     }
  }
}

function displayMessage(message) {
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = message;
}

function getTile(column, row) {
    return document.querySelector('[dataColumn="'+column+'"][dataRow="'+row+'"]');
}

function getDataValue(column, row) {
    const tile = getTile(column, row);
    return tile ? tile.getAttribute('data-value') : null;
}

function checkWin() {
   const directions = [
      [0, 1],
      [1, 0],
      [1, 1],
      [-1, 1],
   ];

  for (const [dx, dy] of directions) {
     for (let column = 0; column < numberOfColumns; column++) {
        for (let row = 0; row < numberOfRows; row++) {
            const startValue = getDataValue(column, row);
            if (startValue !== null) {
                let winCount = 1;
              for (let i = 1; i < winCondition; i++) {
                    const nextColumn = column + i * dx;
                    const nextRow = row + i * dy;
                    const nextValue = getDataValue(nextColumn, nextRow);
                    if (nextValue === startValue) {
                        winCount++;
                    } else {
                        break;
                    }
              }
              if (winCount === winCondition) {
                 return currentPlayer;
              }
            }
        }
     }
  }
  if (document.querySelectorAll('[data-value]').length === numberOfRows * numberOfColumns) {
     return 'tie';
  }
  return null;
}

const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", restartGame);

function restartGame() {
    const tiles = document.querySelectorAll('[data-value]');
    tiles.forEach(tile => tile.removeAttribute('data-value'));
    const messageContainer = document.getElementById("message-container");
    messageContainer.textContent = "";
    currentPlayer = 'blue';
}