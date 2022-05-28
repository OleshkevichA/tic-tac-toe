const gameContainer = document.querySelector('.game-container');
let move = 0;
let result = '';
const contentResult = document.querySelector('.content');
const resultContainer = document.querySelector('.result-container');
const overlay = document.querySelector('.overlay');
const btnClose = document.querySelector('.btn-close');
let arrResults;
let colorWin = 'rgb(45, 196, 196)';
const audioPlayer = document.querySelector('.audio-player');
const xWin = './sounds/xWin.mp3';
const oWin = './sounds/oWin.mp3';
const draw = './sounds/draw.mp3';
const fight = './sounds/fight.mp3';

window.addEventListener('load', getLocalStorage);
arrResults = getLocalStorage();
getHighScore();
gameContainer.addEventListener('click', event => {
  if (event.target.className == 'box' && event.target.textContent == ''){
    move % 2 === 0? event.target.textContent = 'X' : event.target.textContent = 'O';
    event.target.style.background = 'rgb(26, 27, 27)';
    move++;
    check();
  }
});
overlay.addEventListener('click', closeModel);
btnClose.addEventListener('click', closeModel);
window.addEventListener('beforeunload', setLocalStorage);


// check winning combination
function check(){
  const boxes = document.querySelectorAll('.box');
  const winArrRare = [
    [0, 1, 2, 3, 6],
    [0, 1, 2, 5, 8],
    [2, 5, 6, 7, 8],
    [0, 3, 6, 7 ,8],
    [0, 2, 4, 6, 8]
  ];
  const winArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (j = 0; j < winArrRare.length; j++){
    if (
      boxes[winArrRare[j][0]].textContent == 'X' && boxes[winArrRare[j][1]].textContent == 'X' && boxes[winArrRare[j][2]].textContent == 'X' && boxes[winArrRare[j][3]].textContent == 'X' && boxes[winArrRare[j][4]].textContent == 'X'
      ){
        result = 'X';
        boxes[winArrRare[j][0]].style.background = colorWin;
        boxes[winArrRare[j][1]].style.background = colorWin;
        boxes[winArrRare[j][2]].style.background = colorWin;
        boxes[winArrRare[j][3]].style.background = colorWin;
        boxes[winArrRare[j][4]].style.background = colorWin;
        prepareResult(result);
        audioPlayer.setAttribute('src', xWin);
        audioPlayer.play();
        return;
      }
  }
  for (i = 0; i < winArr.length; i++){
    if (
      boxes[winArr[i][0]].textContent == 'X' && boxes[winArr[i][1]].textContent == 'X' && boxes[winArr[i][2]].textContent == 'X'
      ){
        result = 'X';
        boxes[winArr[i][0]].style.background = colorWin;
        boxes[winArr[i][1]].style.background = colorWin;
        boxes[winArr[i][2]].style.background = colorWin;
        prepareResult(result);
        audioPlayer.setAttribute('src', xWin);
        audioPlayer.play();
      }
    else if (
      boxes[winArr[i][0]].textContent == 'O' && boxes[winArr[i][1]].textContent == 'O' && boxes[winArr[i][2]].textContent == 'O'
      ){
        result = 'O';
        boxes[winArr[i][0]].style.background = colorWin;
        boxes[winArr[i][1]].style.background = colorWin;
        boxes[winArr[i][2]].style.background = colorWin;
        prepareResult(result);
        audioPlayer.setAttribute('src', oWin);
        audioPlayer.play();
      }
    }
    if (move == 9 && result == ''){
      result = 'ничья';
      contentResult.textContent = `В этой игре у нас ${result} ! Для этого понадодобилось ${move} ходов`;
      pushResults();
      setLocalStorage();
      resultContainer.classList.toggle('active');
      audioPlayer.setAttribute('src', draw);
        audioPlayer.play();
    }
}
// get winner
function prepareResult (winner){
  contentResult.textContent = `Победили ${winner} ! Для этого понадодобилось ${move} ходов`;
  pushResults();
  setLocalStorage();
  resultContainer.classList.toggle('active');
}
// close model window
function closeModel (){
  resultContainer.classList.toggle('active');
  location.reload();
}
// push results at results array
function pushResults (){
  if (arrResults.length < 10){
    arrResults.push(result);
  }
  else {
    arrResults.shift();
    arrResults.push(result);
  }
}
// set Array of last 10 results at Local Storage
function setLocalStorage(){
  localStorage.setItem("arrResults", JSON.stringify(arrResults));
}
// get Array of last results from Local Storage
function getLocalStorage(){
    arrResults = JSON.parse(localStorage.getItem("arrResults"));
    if (arrResults == null){
      return arrResults = [];
    }
    else {
      return arrResults = JSON.parse(localStorage.getItem("arrResults"));
    }
}
// show High Score last 10 games
function getHighScore (){
  const xItem = document.querySelector('.x');
  const oItem = document.querySelector('.o');
  const dItem = document.querySelector('.d');
  if (arrResults.length == 0){
    xItem.textContent += '0';
    oItem.textContent += '0';
    dItem.textContent += '0';
  }
  else {
    xItem.textContent += arrResults.filter(elem => elem === 'X').length;
    oItem.textContent += arrResults.filter(elem => elem === 'O').length;
    dItem.textContent += arrResults.filter(elem => elem === 'ничья').length;
  }
}

