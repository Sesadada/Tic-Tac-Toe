//Players factory -----------------------------------------
const Player = (name, marker) => {
  const getMarker = () => marker;
  const getName = () => name;

  return {
    getMarker,
    getName,

  };
};

//Gameboard module ----------------------------------------
const gameBoard = (() =>{
let points = ["", "", "", "", "", "", "", "", ""]; 
const cells = document.querySelectorAll(".cell"); 

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
return {rendering, winCon, points}
})()

//playGame module-----------------------------------------
const playGame = (()=> { 
const ai = document.querySelector(".game--ai")
const board = document.querySelector(".game--container");
const update = document.querySelector(".update");
const start = document.querySelector("#start");
let namePlayerX = document.getElementById("playerX");
let namePlayer0 = document.getElementById("player0");
let started = "";
let won = "no"
let playerX;
let player0;
let currentPlayer;
let xPoints = []
let oPoints = []


const zero = () => {
  location.reload();
  namePlayer0.value = ""
  namePlayerX.value = ""
  started = ""
}


start.addEventListener("click", (e) => {
  e.preventDefault()
  if (started == "" && namePlayerX.value != "" && namePlayer0.value != "") {
    gameInit(namePlayerX.value,namePlayer0.value)
    started = 1
  } else {
    zero()
    gameInit(namePlayerX.value,namePlayer0.value)
    started = 1
    }
});

const gameInit = (name1, name2) => {
    playerX = Player(name1, "X");
    player0 = Player(name2, "0");
    Math.round(Math.random()) == 0
      ? (currentPlayer = playerX)
      : (currentPlayer = player0);
    gameRound(currentPlayer);
    update.textContent = `${currentPlayer.getName()} starts!`;    
  };

const winnerChecker = (arr, player) =>{
  if (arr.length >= 3) {
    console.log(`${player.getName()} - ${arr}`)
    const privateSorted =  arr.slice().sort();
    for (const x of gameBoard.winCon) {
      if (
        x.slice().sort().every((value) => privateSorted.includes(value))
      ) {
        update.textContent = `${player.getName()} wins!`;
        won = "yes"
      }
    }
  } 
  if(xPoints.length + oPoints.length === 9 && won != "yes"){
    console.log(xPoints.length + oPoints.length)
    console.log("tie")
    update.textContent = `It's a tie!`
  }
}
  
const gameRound = () => {
  currentPlayer = currentPlayer === playerX ? player0 : playerX;
 
  };

board.addEventListener("click", (e) =>{
  e.preventDefault()
  if (started == ""){
    update.textContent = `Either you didn't put the names or press start!`
  } else {
  if(won === "yes"){
    zero()
  } else {
  let idx = e.target.getAttribute("data-cell-index")
  if(gameBoard.points[idx] === "") {
    gameBoard.points.splice(idx, 1, currentPlayer.getMarker())
    e.target.textContent = currentPlayer.getMarker()
    update.textContent = `${currentPlayer.getName()} is playing`;
    if(currentPlayer.getMarker() == "X"){
      xPoints.push(idx)
      winnerChecker(xPoints, currentPlayer)
    } else {
      oPoints.push(idx)
      winnerChecker(oPoints, currentPlayer)
    }
    gameBoard.rendering()
    gameRound()
  } else {
    update.textContent = `This spot is already taken`;
  }}
} 
})
})()
