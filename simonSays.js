let gameSeq=[];
let userSeq=[];

let highestScore = 0;

let colorBtns = ["green","red","yellow","blue"];

let gameStarted = false;
let level = 0;

let h4 = document.querySelector('h4');

document.addEventListener('keypress', function(){
    if(gameStarted == false) {
        levelUp();
    }
});

function flashBtn(btn) {
    btn.classList.add("flash");

    setTimeout(function(){
        btn.classList.remove("flash");
    }, 250);
}

function levelUp() {
    userSeq = []; // to reset the user colors, so that user clicks all colors in squence again
    gameStarted = true;
    level++;
    h4.innerText = `Level is ${level}`;

    // random color 
    let randomIdx = Math.floor(Math.random()*3);
    let randomColor = colorBtns[randomIdx];
    let randomBtn = document.querySelector(`.${randomColor}`); //  this is very imp to understand this
    gameSeq.push(randomColor);
    flashBtn(randomBtn);
}

function matchSeq(idx){ // we will pass current level in this function, each level generates new color
// curr level will be the size of ur gameSeq and userSeq
    if(gameSeq[idx] === userSeq[idx]){
        if(gameSeq.length == userSeq.length) {
            setTimeout(levelUp, 1000);
            highestScore = level-1;
        }
    } else {
        h4.innerHTML = `Game Over!, <b>Your Score is : ${level-1} and Highest Score is ${highestScore}</b> <br> Press any key to Start`;
        document.querySelector('body').style.backgroundColor = "red";
        setTimeout(function(){
            document.querySelector('body').style.backgroundColor = "white";
        }, 200);
        reset();
    }
}

function btnPress() {
    flashBtn(this);
    let userColor = this.getAttribute("id"); // user pressed color
    userSeq.push(userColor);

    matchSeq(userSeq.length-1);
}

let btns = document.querySelectorAll('.box');
btns.forEach(function(btn){
    btn.addEventListener('click', btnPress);
});

function reset(){
    gameStarted = false;
    gameSeq = [];
    userSeq =[];
    level = 0;
}