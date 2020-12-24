
const Player = (name, marker) => {
  const message = document.querySelector(".message");
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
        if (privatePoints.length >= 3) {
          const privateSorted = privatePoints.slice().sort();
          console.log(privateSorted);
          for (const x of gameBoard.winCon) {
            if (
              x
                .slice()
                .sort()
                .every((value) => privateSorted.includes(parseInt(value)))
            ) {
              play.update.textContent = `${name} wins!`;
              console.log(`${name} wins!`);

              //setTimeout(window.location.reload.bind(window.location), 3000);
            }
          }
        }
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

//gameBoard render ----------------------------------------------------------------
const gameBoard = (() => {
  let points = ["", "", "", "", "", "", "", "", ""]; //create empty array waiting for marks
  const cells = document.querySelectorAll(".cell"); //selects all spaces in the dom ready to be marked from array

  points = points.map((point, index) => {
    //renders the Point array to the DOM
    cells.forEach((cell) => {
      let idx = parseInt(cell.getAttribute("data-cell-index"));
      if (index == idx) {
        cell.textContent = point;
      }
    });
  });

  const displayTurn = (player) => {
    //play turn function (select cell from DOM)
    if (player.getPlay()) {
      points = points.map(x, (index) => {
        if (index == player.getPlay()) {
          x = player.getMarker;
        }
      });
    }
    return points;
  };

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

  return { displayTurn, winCon };
})();

const play = (() => {
  let playerX;
  let player0;
  let currentPlayer;
  const update = document.querySelector(".update");
  const start = document.querySelector("#start");

  const playGame = (player, x, o) => {
    player = player === x ? o : x;
    gameBoard.displayTurn(player);
    update.textContent = `${player.getName()} playing`;
  };

  let started = "";

  start.addEventListener("click", (e) => {
    let namePlayerX = document.getElementById("playerX").value;
    let namePlayer0 = document.getElementById("player0").value;
    if (started == 1) {
      location.reload();
    } else if (update.textContent != "") {
      started = 1;
      playerX = Player(namePlayerX, "X");
      player0 = Player(namePlayer0, "0");
      Math.round(Math.random()) == 0
        ? (currentPlayer = playerX)
        : (currentPlayer = player0);
      playGame(currentPlayer, playerX, player0);
    }
  });

  return { update };
})();

