//Players factory -------------------------------------------------------------------------------------------
const Player = (name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;

  return {
    getMarker,
    getName,

  };
};


//Gameboard module ----------------------------------------
let points = ["", "", "", "", "", "", "", "", ""]; 
const cells = document.querySelectorAll(".cell"); 

const rendering = () => {
  let newBoard = points.map((point, index) => {
    cells.forEach((cell) => {
      let idx = parseInt(cell.getAttribute("data-cell-index"));
      if (index == idx) {
        cell.textContent = point;
      }
    });
  });
  return newBoard
}

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

const board = document.querySelector(".game--container");
const update = document.querySelector(".update");
const start = document.querySelector("#start");
let namePlayerX = document.getElementById("playerX");
let namePlayer0 = document.getElementById("player0");
  let started = "";
  let playerX;
  let player0;
  let currentPlayer;
  let xPoints;
  let oPoints;

  //develop all the start options here----
start.addEventListener("click", (e) => {
    if (started == "" || namePlayerX.value == "") {
      gameInit()
      started = 1
    } else {
      location.reload();
      namePlayer0.value = ""
      namePlayerX.value = ""
      gameInit()
      started = 1
    
    }
  });

const gameInit = () => {
    playerX = Player(namePlayerX.value, "X");
    player0 = Player(namePlayer0.value, "0");
    Math.round(Math.random()) == 0
      ? (currentPlayer = playerX)
      : (currentPlayer = player0);
    //playGame(currentPlayer);
    gameRound(currentPlayer)
  };

const playGame = (player) => {
  console.log(player.getMarker())
  board.addEventListener("click", (e) => {
    e.preventDefault()
    let idx = e.target.getAttribute("data-cell-index")
    points.splice(idx, 1, player.getMarker())
    //e.target.textContent === ""? e.target.textContent = player.getMarker():alert("you cannot do this")
    e.target.textContent = player.getMarker()
    //e.target.setAttribute("style","pointer-events: none") 
  })

update.textContent = `${player.getName()} playing`;
};

const winnerChecker = () =>{
}
  
const gameRound = () => {
      currentPlayer = currentPlayer === playerX ? player0 : playerX;
      (console.log("this player is next: ", currentPlayer.getName(), " is playing"))
      playGame(currentPlayer)       
  };

board.addEventListener("click", gameRound)
rendering()

