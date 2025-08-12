let score = JSON.parse(localStorage.getItem('score')) || {
  menang: 0,
  kalah: 0,
  seri: 0
};

let intervalID;
let intervalID2;
let isAutoPlay = false;

function autoPlay() {
  if (!isAutoPlay) {
    intervalID2 = setInterval(() => {
      document.querySelector('.js-moves').innerHTML = `
    <span style = "margin-right:40px">
    Loading... </span>

    Loading... 
    `
    }, 5000)
    
    intervalID = setInterval(() => {
      
      const playerMove =
        pickComputerMoves();
      playGame(playerMove)
    }, 6000)
    
    isAutoPlay = true;
  } else {
    clearInterval(intervalID2)
    clearInterval(intervalID);
    isAutoPlay = false;
  }
  
  const name = document.querySelector('.js-autoPlay');
  if (name.innerHTML === 'Auto Play') {
    name.innerHTML = 'Stop Play';
    name.classList.add('auto-play-t');
  } else {
    name.innerHTML = 'Auto Play';
    name.classList.remove('auto-play-t')
  }
  
}

function pickComputerMoves() {
  const randomNamber = Math.floor((Math.random() * 3) + 1);
  
  let computerMove = '';
  
  if (randomNamber === 1) {
    computerMove = 'Gunting';
  } else if (randomNamber === 2) {
    computerMove = 'Batu';
  } else if (randomNamber === 3) {
    computerMove = 'Kertas';
  }
  
  return computerMove;
}

function playGame(playerMove) {
  
  const computerMove = pickComputerMoves();
  
  let result = '';
  
  if (playerMove === 'Gunting') {
    if (computerMove === 'Gunting') {
      result = 'Seri.'
    } else if (computerMove === 'Batu') {
      result = 'Kamu Kalah.'
    } else if (computerMove === 'Kertas') {
      result = 'Kamu Menang. Congrat..!'
    }
  } else if (playerMove === 'Batu') {
    if (computerMove === 'Gunting') {
      result = 'Kamu Menang. Congrat..!'
    } else if (computerMove === 'Batu') {
      result = 'Seri.'
    } else if (computerMove === 'Kertas') {
      result = 'Kamu Kalah.'
    }
  } else if (playerMove === 'Kertas') {
    if (computerMove === 'Gunting') {
      result = 'Kamu Kalah.'
    } else if (computerMove === 'Batu') {
      result = 'Kamu Menang. Congrat..!'
    } else if (computerMove === 'Kertas') {
      result = 'Seri.'
    }
  }
  
  if (result === 'Kamu Menang. Congrat..!') {
    score.menang++;
  } else if (result === 'Kamu Kalah.') {
    score.kalah++;
  } else if (result === 'Seri.') {
    score.seri++;
  }
  
  localStorage.setItem('score', JSON.stringify(score));
  displayUpdateScore();
  
  document.querySelector('.js-result')
    .innerHTML = result;
  
  document.querySelector('.js-moves')
    .innerHTML = `
      Kamu
        <img class="moves-icon2" src="${playerMove}-emoji.png">
        <img class="moves-icon2" src="${computerMove}-emoji.png">
      Komputer
    `
  
}

displayUpdateScore();

function displayUpdateScore() {
  
  document.querySelector('.js-score')
    .innerHTML = `
      Menang : ${score.menang}, Kalah : ${score.kalah}, Seri : ${score.seri}
    
    `
  
}

document.querySelector('.js-gunting')
  .addEventListener('click', () => {
    document.querySelector('.js-moves').innerHTML = `
    <span style = "margin-right:40px">
    Loading... </span>

    Loading... 
    `
    setTimeout(() => {
      playGame('Gunting')
    }, 2000)
    //playGame('Gunting');
  })

document.querySelector('.js-batu')
  .addEventListener('click', () => {
    document.querySelector('.js-moves').innerHTML = `
    <span style = "margin-right:40px">
    Loading... </span>

    Loading... 
    `
    setTimeout(() => {
      playGame('Batu')
    }, 2000)
    //playGame('Batu');
  })

document.querySelector('.js-kertas')
  .addEventListener('click', () => {
    document.querySelector('.js-moves').innerHTML = `
       <span style = "margin-right:40px">
       Loading... </span>

       Loading... 
    `
    setTimeout(() => {
      playGame('Kertas')
    }, 2000)
    //playGame('Kertas');
  })

document.querySelector('.js-reset-score')
  .addEventListener('click', () => {
    score.menang = 0;
    score.kalah = 0;
    score.seri = 0;
    
    displayUpdateScore();
    localStorage.setItem('score', JSON.stringify(score));
    
  })

document.querySelector('.js-autoPlay')
  .addEventListener('click', () => {
    autoPlay();

  })
