let playerX;
let player0;
let currentPlayer;

// Player Factory
const Player = (name, marker) => {
  const board = document.querySelector(".board");
  let play;
  const getName = () => name;
  const rendering = () => {
    board.addEventListener("click", (e) => {
      e.preventDefault();
      if (e.target.textContent == "") {
        e.target.textContent = marker;
        play = e.target.id;
        console.log(name, play);
      }
    });
  };

  const getPlay = () => play;

  return {
    getName,
    rendering,
    getPlay,
  };
};

const human = () => {
  let clicked = null;
  const message = document.querySelector(".message");
  const btnHuman = document.querySelector("#human");
  btnHuman.addEventListener("click", () => {
    if (clicked == null) {
      clicked = true;
      const choose = document.createElement("div");
      choose.classList = "choose";
      choose.textContent = "Write you names";
      const input1 = document.createElement("input");
      input1.setAttribute("class", "player1");
      input1.setAttribute("style", "margin-top: 10px");
      input1.placeholder = "Player X (starts)";
      const input2 = document.createElement("input");
      input2.setAttribute("class", "player2");
      input2.setAttribute("style", "margin-top: 10px");
      input2.placeholder = "Player 0";
      const start = document.createElement("button");
      start.textContent = "start";
      start.setAttribute("style", "margin-top: 10px");
      message.appendChild(choose);
      choose.appendChild(input1);
      choose.appendChild(input2);
      choose.appendChild(start);
      start.addEventListener("click", (e) => {
        e.preventDefault();
        console.log("starting game");
        startGame();
        message.removeChild(choose);
      });
    }
  });
};
human();

const startGame = () => {
  playX = [];
  play0 = [];
  let player1 = document.querySelector(".player1").value;
  let player2 = document.querySelector(".player2").value;
  playerX = Player(player1, "X");
  player0 = Player(player2, "0");
  playerX.rendering();
  playX.push(playerX.getPlay());
  console.log(playX);

  const winCon = [
    ["col1", "col2", "col3"],
    ["col4", "col5", "col6"],
    ["col7", "col8", "col9"],
    ["col1", "col4", "col7"],
    ["col2", "col5", "col8"],
    ["col3", "col6", "col9"],
    ["col1", "col5", "col9"],
    ["col3", "col5", "col7"],
  ];
};

//display the game flow controller (object) with module (I only need one)

/*
Logic

- gameboard object ( module ):
     - array with play by player1
     - array with play by player2
     - function rendering the display

- gameFlow controller ( module )
     - controls winner
     - display winner message

- Player object ( factory ):
     - mark the gameboard with its sign 
     - add each time the sign to the array player(1/2)
     - function that checks weather the spot is already taken
     - use rendering function
     


*/

// const gameBoard = [col1, col2, col3, col4, col5, col6, col7, col8, col9];
