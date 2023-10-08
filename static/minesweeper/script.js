// Display/UI

import {
    TILE_STATUSES,
    createBoard,
    markTile,
    revealTile,
    checkWin,
    checkLose,
} from "./Minesweeper.js"

let BOARD_SIZE
let NUMBER_OF_MINES

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)
const boardElement = document.querySelector(".board")
const minesLeftText = document.querySelector("[data-mine-count]")
const messageText = document.querySelector(".subtext")

const gameModeSelect = document.getElementById("game-mode");
gameModeSelect.addEventListener("change", function () {
    const selectedGameMode = gameModeSelect.value;
    // Update BOARD_SIZE and NUMBER_OF_MINES based on the selected game mode
    if (selectedGameMode === "easy") {
        BOARD_SIZE = 5
        NUMBER_OF_MINES = 3
    } else if (selectedGameMode === "medium") {
        BOARD_SIZE = 9
        NUMBER_OF_MINES = 7
    } else if (selectedGameMode === "hard") {
        BOARD_SIZE = 10
        NUMBER_OF_MINES = 15
    }

    // Start a new game with the updated settings
    const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES)

    boardElement.innerHTML = " "

    board.forEach(row => {
        row.forEach(tile => {
            boardElement.append(tile.element)
            tile.element.addEventListener("click", () => {
                revealTile(board, tile)
                checkGameEnd()
            })
            tile.element.addEventListener("contextmenu", e => {
                e.preventDefault()
                markTile(tile)
                listMinesLeft()
            })
        })
    })
    boardElement.style.setProperty("--size", BOARD_SIZE)
    minesLeftText.textContent = NUMBER_OF_MINES

    messageText.content = ""
})

function listMinesLeft() {
    const flaggedTilesCount = board.reduce((count, row) => {
        return (
            count + row.filter(tile => tile.status === TILE_STATUSES.FLAGGED).length
        )
    }, 0)

    minesLeftText.textContent = NUMBER_OF_MINES - flaggedTilesCount
}

function checkGameEnd() {
    const win = checkWin(board)
    const lose = checkLose(board)

    if (win || lose) {
        boardElement.addEventListener("click", stopProp, { capture: true })
        boardElement.addEventListener("contextmenu", stopProp, { capture: true })
    }

    if (win) {
        messageText.textContent = "You Win"
    }
    if (lose) {
        messageText.textContent = "You Lose"
        board.forEach(row => {
            row.forEach(tile => {
                if (tile.status === TILE_STATUSES.FLAGGED) markTile(tile)
                if (tile.mine) revealTile(board, tile)
            })
        })
    }
}

function stopProp(e) {
    e.stopImmediatePropagation()
}