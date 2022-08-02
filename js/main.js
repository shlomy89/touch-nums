'use strict';
// Touch the Numbers (proj name: touch-nums)

var gNextNumber, gStartedAt, gClockInterval
var boardSize = 4
var elClock = document.querySelector('.timer span')
var elBoard = document.querySelector('table.board')

function startGame() {
    resetGame()    
    var nums = generateNumbers(boardSize)
    shuffleArray(nums)
    printBoard(nums)
}

function printBoard(nums) {
    for (var row = 0; row < boardSize; row++) {
        // create row element
        var tr = document.createElement('tr')
        elBoard.appendChild(tr)

        for (var col = 0; col < boardSize; col++) {
            // create col element
            var num = nums.pop()
            var td = createCell(num)
            tr.appendChild(td)
        }
    }
}

function resetGame() {
    clearInterval(gClockInterval)
    gNextNumber = 1
    gStartedAt = null
    gClockInterval = null
    elBoard.innerHTML = ''
    elClock.innerText = 0
}

function generateNumbers(size) {
    var nums = []
    for (var i=1; i<=size**2; i++) {
        nums.push(i)
    }
    return nums
}

function changeBoardSize(newSize) {
    boardSize = newSize
    startGame()
}

function onCellClicked(e) {
    var cellValue = e.target.innerText
    cellValue = parseInt(cellValue)
    cellClicked(cellValue)
}

function createCell(value) {
    var td = document.createElement('td')
    td.onclick = onCellClicked
    td.innerText = value
    td.className = `cell_${value}`
    return td
}

function initClock() {
    gStartedAt = Date.now()
    gClockInterval = setInterval(function() {
        var time = ((Date.now() - gStartedAt) / 1000).toFixed(3)
        elClock.innerText = time
    }, 50)
}

function cellClicked(clickedNum) {
    if (gStartedAt === null) {
        initClock()
    }

    if (clickedNum === gNextNumber) {
        var elCell = document.querySelector(`.cell_${clickedNum}`)
        elCell.className += ' clicked'
        gNextNumber++

        if (gNextNumber > boardSize**2) {
            alert('You finished the game at: ' + (elClock.innerText) + 'sec ' + '🏆')
            startGame()
        }
    }
}

/* Randomize array in-place using Durstenfeld shuffle algorithm */
function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
}
