let mark = 'X';
let game_difficulty = '0';
let numPlayers = 1;
let move_count = 0;
let Spaces = [0,1,2,3,4,5,6,7,8];
let xSpots = [
    [0,0,0,0,0], //the extra element will store the 2-6 diagonal sum
    [0,0,0,0],
    [0,0,0,0],
    [0,0,0,0]
];
let gameOver = true;
let canClick = true;

const turnCheck = (spotId) => { // prevents double placement by single player
    if (numPlayers == 1 && canClick == true) {
        placeMark(spotId);
    } else if (numPlayers == 2) {
        placeMark(spotId);
    }
}

function placeMark(idcard) {
    if (gameOver == false) {
        document.getElementById(idcard).innerHTML = `${mark}`;
        document.getElementById(idcard).setAttribute('onclick','');
        
        for (let i = 0; i < Spaces.length; i++) {
            if (Spaces[i] == idcard) {
                Spaces.splice(i, 1);
            }
        }
        
        if (mark == 'X') {
            xSpots[Math.floor(idcard / 3)][idcard % 3] = 1;
            mark = 'O';
            document.getElementById("name_winner").innerHTML = `It is now ${mark}'s turn`;
        } else {
            xSpots[Math.floor(idcard / 3)][idcard % 3] = 4;
            document.getElementById("name_winner").innerHTML = `It is now ${mark}'s turn`;
            mark = 'X';
        }
        
        checkVert();
        checkHoriz();
        checkDiag();
        move_count++;	
        
        if (Spaces.length === 0) {
            nameWinner("draw");
        }
        
        if (numPlayers == 1 && move_count % 2 != 0) {
            //document.getElementById("obscure").style.display = "inline-block";
            canClick = false;
            compChoice(2000);
        }
    }
}

const delay = ms => new Promise(res => setTimeout(res, ms)); // helper function to delay CPU choice

const compChoice = async (delayTime) => { // switch the function call based on user's preferred difficulty
    await delay(delayTime);
    switch (game_difficulty) {
        case '0': compChoiceEasy(); break;
        case '1': compChoiceMed(); break;
        case '2': compChoiceHard(); break;
        default: console.log("An error has occurred.");
    }
    //document.getElementById("obscure").style.display = "none";
    canClick = true;
}

const compChoiceEasy = () => {
    const idcard = Spaces[Math.floor(Math.random()*Spaces.length)];
    placeMark(idcard);
}

const compChoiceMed = () => {
    if (move_count == 1) { // check to see if game just started
        if (xSpots[1][1] == 0) {
            placeMark(4);
        } else {
            placeMark(Spaces[Math.floor(Math.random()*Spaces.length)]);
        }
        
    } else {
        for (let i = 0; i < 3; i++) {
            if (xSpots[i][3] === 2) { // check to stop horizontal win
                for (let j = 0; j < 3; j++) {
                    if (xSpots[i][j] === 0) {
                        placeMark((i*3) + j);
                        return;
                    }
                }
            }
            if (xSpots[3][i] === 2) { // check to stop vertical win
                for (let j = 0; j < 3; j++) {
                    if (xSpots[j][i] === 0) {
                        placeMark((j*3) + i);
                        return;
                    }
                }
            }
        }
        
        if (xSpots[0][4] == 2) {
            (Spaces.includes(2)) ? placeMark(2) : placeMark(6);
        } else if (xSpots[3][3] == 2) {
            (Spaces.includes(0)) ? placeMark(0) : placeMark(8);
        } else {
            placeMark(Spaces[Math.floor(Math.random()*Spaces.length)]);
        }
    }
               
    console.log(move_count);
}

const compChoiceHard = () => {
    if (move_count == 1) { // check to see if game just started
        if (xSpots[1][1] == 0) {
            placeMark(4);
        } else {
            const tempId = Math.floor(Math.random()*Spaces.length);
            (tempId == 3) ? placeMark(tempId + 2) : placeMark(tempId + (tempId % 2));
        }
    } else {
        if (move_count => 3) {
            for (let i = 0; i < 3; i++) {
                if (xSpots[i][3] === 8) { // check to win horizontally
                    for (let j = 0; j < 3; j++) {
                        if (xSpots[i][j] === 0) {
                            placeMark((i*3) + j);
                            return;
                        }
                    }   
             }
                if (xSpots[3][i] === 8) { // check to win vertically
                    for (let j = 0; j < 3; j++) {
                        if (xSpots[j][i] === 0) {
                            placeMark((j*3) + i);
                            return;
                        }
                    }
                }
            }
            
            if (xSpots[0][4] == 8) {
                (Spaces.includes(2)) ? placeMark(2) : placeMark(6);
                return;
            } else if (xSpots[3][3] == 8) {
                (Spaces.includes(0)) ? placeMark(0) : placeMark(8);
                return;
            }
        } 
        for (let i = 0; i < 3; i++) {
            if (xSpots[i][3] === 2) { // check to stop horizontal win
                for (let j = 0; j < 3; j++) {
                    if (xSpots[i][j] === 0) {
                        placeMark((i*3) + j);
                        return;
                    }
                }
            }
            if (xSpots[3][i] === 2) { // check to stop vertical win
                for (let j = 0; j < 3; j++) {
                    if (xSpots[j][i] === 0) {
                        placeMark((j*3) + i);
                        return;
                    }
                }
            }
        }
        
        if (xSpots[0][4] == 2) {
            (Spaces.includes(2)) ? placeMark(2) : placeMark(6);
        } else if (xSpots[3][3] == 2) {
            (Spaces.includes(0)) ? placeMark(0) : placeMark(8);
        } else {
            for (let i = 0; i < 3; i++) {
                if (xSpots[i][3] === 4) { // check for horizontal advantage
                    for (let j = 0; j < 3; j++) {
                        if (xSpots[i][j] === 0) {
                            placeMark((i*3) + j);
                            return;
                        }
                    }
                }
                if (xSpots[3][i] === 4) { // check for vertical advantage
                    for (let j = 0; j < 3; j++) {
                        if (xSpots[j][i] === 0) {
                            placeMark((j*3) + i);
                            return;
                        }
                    }
                }
            }
            if (xSpots[0][4] == 2) { // check for diagonal advantage
                (Spaces.includes(2)) ? placeMark(2) : placeMark(6);
            } else if (xSpots[3][3] == 2) {
                (Spaces.includes(0)) ? placeMark(0) : placeMark(8);
            } else {
                 placeMark(Spaces[Math.floor(Math.random()*Spaces.length)]);
            }
        }
    }
                   
    console.log(move_count);
}

const checkDiag = () => {
    //console.log("checked diagonally");
    xSpots[3][3] = xSpots[0][0] + xSpots[1][1] + xSpots[2][2];
    if (xSpots[3][3] == 3 || xSpots[3][3] == 12) {
        document.getElementById("board").appendChild(document.createElement("div"));
        document.getElementById("board").lastElementChild.setAttribute("class","diag downward");
        (xSpots[3][3] == 3) ? nameWinner('X') : nameWinner('O');
        return xSpots[3][3];
    }
    xSpots[0][4] = xSpots[0][2] + xSpots[1][1] + xSpots[2][0];
    if (xSpots[0][4] == 3 || xSpots[0][4] == 12) {
        document.getElementById("board").appendChild(document.createElement("div"));
        document.getElementById("board").lastElementChild.setAttribute("class","diag upward");
        (xSpots[0][4] == 3) ? nameWinner('X') : nameWinner('O');
        return xSpots[0][4];
    }
    
}

const checkHoriz = () => {
    for (let i = 0; i < 3; i++) {
        xSpots[i][3] = xSpots[i][0] + xSpots[i][1] + xSpots[i][2];
        if (xSpots[i][3] == 3 || xSpots[i][3] == 12) {
            document.getElementById("board").appendChild(document.createElement("div"));
            document.getElementById("board").lastElementChild.setAttribute("class","hori");
            document.getElementById("board").lastElementChild.style.bottom = `${265 - (i * 100)}px`;
            (xSpots[i][3] == 3) ? nameWinner('X') : nameWinner('O');
            return xSpots[i][3];
        } 
        //return sum;
    }
    
}

const checkVert = () => {
    for (let i = 0; i < 3; i++) {
        xSpots[3][i] = xSpots[0][i] + xSpots[1][i] + xSpots[2][i];
        if (xSpots[3][i] == 3 || xSpots[3][i] == 12) {
            document.getElementById("board").appendChild(document.createElement("div"));
            document.getElementById("board").lastElementChild.setAttribute("class","vert");
            document.getElementById("board").lastElementChild.style.left = `${(-103 + (i * 103))}px`;
            (xSpots[3][i] == 3) ? nameWinner('X') : nameWinner('O');
            return xSpots[3][i];
        } 
    }
    
}

const setDifficulty = (difficulty) => {
    game_difficulty = difficulty;
    document.getElementById("select_dif").style.display = "none";
}

const resetGame = () => {
   window.location.reload();
}

const goBack = () => {
    document.getElementById("welcome").style.display = "inline-block";
    document.getElementById("select_dif").style.display = "none";
}

const nameWinner = (mark) => {
    gameOver = true;
    const cells = document.getElementsByTagName("td")
        for (const cell of cells) {
            cell.setAttribute("onclick","");
        }
    (mark == "draw") ? document.getElementById("name_winner").innerHTML = `Draw!` :
    document.getElementById("name_winner").innerHTML = `${mark} is the winner!`;
    document.getElementById("under_board").setAttribute("onclick","resetGame()");
    document.getElementById("under_board").textContent = "Play Again";
}

const startGame = (player_count) => {
    gameOver = false;
    numPlayers = player_count;
    if (player_count == 1) {
        document.getElementById("welcome").style.display = "none";
        document.getElementById("select_dif").style.display = "inline-block";
    } else {
        document.getElementById("welcome").style.display = "none";
    }
    
}
