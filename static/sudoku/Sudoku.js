var numSelected = null;
var tileSelected = null;

var errors = 0;
var maxErrors = 10;
var errorsLeft = 10;
var board = [
  "--41----5",
  "--78326--",
  "39-7--8--",
  "6--98-1--",
  "8-12-7--4",
  "-49-13--2",
  "-1-3-8296",
  "7-3------",
  "----614-7",
];
var solution = [
  "284196375",
  "157832649",
  "396745821",
  "672984153",
  "831257964",
  "549613782",
  "415378296",
  "763429518",
  "928561437",
];

// Generate the board based on the selected difficulty

window.onload = function () {
  //var difficulty = document.querySelector('input[name="difficulty"]:checked').value;
  setBoard("easy");
};

function setBoard(difficulty) {
  if (difficulty === "easy") {
    board = [
      "--41----5",
      "--78326--",
      "39-7--8--",
      "6--98-1--",
      "8-12-7--4",
      "-49-13--2",
      "-1-3-8296",
      "7-3------",
      "----614-7",
    ];
    solution = [
      "284196375",
      "157832649",
      "396745821",
      "672984153",
      "831257964",
      "549613782",
      "415378296",
      "763429518",
      "928561437",
    ];
    maxErrors = 10;
    errorsLeft = 10;
    // Generate an easy level board
    // ...
  } else if (difficulty === "medium") {
    board = [
      "--6------",
      "2--5-73--",
      "--36---84",
      "-4-752-3-",
      "8-7---54-",
      "-----9---",
      "962-----5",
      "1---24-63",
      "-7-----2-",
    ];
    solution = [
      "496238157",
      "218547396",
      "753691284",
      "649752831",
      "827316549",
      "531489672",
      "962873415",
      "185924763",
      "374165928",
    ];
    maxErrors = 5;
    errorsLeft = 5;
  } else if (difficulty === "hard") {
    board = [
      "-9--32--1",
      "7---9----",
      "--8---96-",
      "5----4---",
      "---2---18",
      "8--6-----",
      "-6-----54",
      "----2---7",
      "--4--1---",
    ];
    solution = [
      "496832571",
      "753196842",
      "218745963",
      "531984726",
      "649257318",
      "827613495",
      "962378154",
      "185429637",
      "374561289",
    ];
    maxErrors = 3;
    errorsLeft = 3;
  }
  // Digits 1-9
  for (let i = 1; i <= 9; i++) {
    //<div id="1" class="number">1</div>
    let number = document.createElement("div");
    number.id = i;
    number.innerText = i;
    number.addEventListener("click", selectNumber);
    number.classList.add("number");
    document.getElementById("digits").appendChild(number);
  }

  // Board 9x9
  for (let r = 0; r < 9; r++) {
    for (let c = 0; c < 9; c++) {
      let tile = document.createElement("div");
      tile.id = r.toString() + "-" + c.toString();
      if (board[r][c] != "-") {
        tile.innerText = board[r][c];
        tile.classList.add("tile-start");
      }
      if (r == 2 || r == 5) {
        tile.classList.add("horizontal-line");
      }
      if (c == 2 || c == 5) {
        tile.classList.add("vertical-line");
      }
      tile.addEventListener("click", selectTile);
      tile.classList.add("tile");
      document.getElementById("board").append(tile);
    }
  }
}

function selectNumber() {
  if (numSelected != null) {
    numSelected.classList.remove("number-selected");
  }
  numSelected = this;
  numSelected.classList.add("number-selected");
}

function selectTile() {
  if (errors >= maxErrors) {
    return;
  }
  if (numSelected) {
    if (this.innerText != "") {
      return;
    }

    // "0-0" "0-1" .. "3-1"
    let coords = this.id.split("-"); //["0", "0"]
    let r = parseInt(coords[0]);
    let c = parseInt(coords[1]);

    if (solution[r][c] == numSelected.id) {
      this.innerText = numSelected.id;
    } else {
      errors += 1;
      errorsLeft -= 1;
      document.getElementById("errors").innerText = errors;
      document.getElementById("errorsLeft").innerText = errorsLeft;
      if (errors >= maxErrors) {
        document.getElementById("gameOver").innerText = "Game Over!";
      }
    }
  }
}
