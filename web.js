let compmove = '';
let result = '';
let intervalid;
const score = JSON.parse(localStorage.getItem('score')) || { wins: 0, losses: 0, ties: 0 };

function updatescore() {
  document.querySelector('.gamescore').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

updatescore();

function compumove() {
  const x = Math.random();
  
  if (x >= 0 && x < 1/3) {
    compmove = 'ROCK';
  } else if (x > 1/3 && x < 2/3) {
    compmove = 'PAPER';
  } else if (x > 2/3 && x <= 1) {
    compmove = 'SCISSOR';
  } 
  return compmove;
}

function playgame(playermove) {
  const comptmove = compumove();
   
  if (playermove === 'ROCK') {
    if (comptmove === 'ROCK') { result = 'TIED'; }
    else if (comptmove === 'PAPER') { result = 'YOU LOSE'; }
    else if (comptmove === 'SCISSOR') { result = 'YOU WIN'; }
  } else if (playermove === 'PAPER') {
    if (comptmove === 'ROCK') { result = 'YOU WIN'; }
    else if (comptmove === 'PAPER') { result = 'TIED'; }
    else if (comptmove === 'SCISSOR') { result = 'YOU LOSE'; }
  } else {
    if (comptmove === 'ROCK') { result = 'YOU LOSE'; }
    else if (comptmove === 'PAPER') { result = 'YOU WIN'; }
    else if (comptmove === 'SCISSOR') { result = 'TIED'; }
  }

  if (result === 'YOU WIN') {
    score.wins += 1;
  } else if (result === 'YOU LOSE') {
    score.losses += 1;
  } else {
    score.ties += 1;
  }

  localStorage.setItem('score', JSON.stringify(score));
  updatescore();

  document.querySelector('.ymove').innerHTML = `You played: <img class="movepng1" src="${playermove}.png" alt="${playermove}">
       Computer played: <img class="movepng1" src="${compmove}.png" alt="${compmove}">`;

  document.querySelector('.resultt').innerHTML = `${result}`;
}

let isAutoplaying = false;

function autoplay() {
  if (!isAutoplaying) {
    intervalid = setInterval(()=>{
      const playermove = compumove();
      playgame(playermove);
    }, 1000);
    isAutoplaying = true;
  } else {
    clearInterval(intervalid);
    isAutoplaying = false;
  }
}
 document.body.addEventListener('keydown',(event) => {
  if(event.key === 'r') {
    playgame('ROCK');
  } else if(event.key === 'p') {
    playgame('PAPER');
  } else if(event.key === 's') {
    playgame('SCISSOR');
  }
 });