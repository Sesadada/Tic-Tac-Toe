//Players factory ---------------------------------------------------------------------------------------------------------------
const Player = (name, marker) => {
  let privatePoints = [];
  this.cell;
  let self = this;
  const board = document.querySelector(".game--container");
  const getPlay = () => {
    board.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.textContent == "") {
        e.target.textContent = marker;
        self.cell = parseInt(e.target.getAttribute("data-cell-index"));
        privatePoints.push(self.cell);
        console.log(self.cell);
        console.log(privatePoints);
      }
    });
    return self.cell;
  };
  const getMarker = () => marker;
  const getName = () => name;
  const getPoints = () => privatePoints;
  return {
    getMarker,
    getName,
    getPlay,
    getPoints,
  };
};

//actual creation of the player for this game --> it will be done drom the DOM elements ------------------------------------------
const playerX = Player("Serena", "X");
const player0 = Player("Marco", "0");

//gameBoard render ---------------------------------------------------------------------------------------------------------------
const gameBoard = (() => {
  let points = ["", "", "", "", "", "", "", "", ""]; //create empty array waiting for marks
  const cells = document.querySelectorAll(".cell"); //selects all spaces in the dom ready to be marked from array

  const playTurn = (player) => {
    //play turn function (select cell from DOM)
    if (player.getPlay()) {
      points = points.map(x, (index) => {
        if (index == player.getPlay()) {
          x = player.getMarker;
        }
      });
    }
  };

  points.map((point, index) => {
    //renders the Point array to the DOM
    cells.forEach((cell) => {
      let idx = parseInt(cell.getAttribute("data-cell-index"));
      if (index == idx) {
        cell.textContent = point;
      }
    });
  });

  return { playTurn };
})();

// gameFlow ---------------------------------------------------------------------------------------------------------------
const gameFlow = (() => {
  let current = playerX;

  playerX.getPoints() === 0
    ? gameBoard.playTurn(player0)
    : gameBoard.playTurn(playerX);

  //switch players after playing once
  //check if win
  //declare if win or tie
  //deploy message

  const winCon = [
    ["0", "1", "2"],
    ["3", "4", "5"],
    ["6", "7", "8"],
    ["0", "3", "6"],
    ["1", "4", "7"],
    ["2", "5", "8"],
    ["0", "4", "8"],
    ["2", "4", "6"],
  ];
})();
