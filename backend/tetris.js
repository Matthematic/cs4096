// Tetris Server
// test test

var Block = function() {
    this.posX = null;
    this.posY = null;
    this.up = null;
    this.right = null;
    this.down = null;
    this.left = null;
}

var myReadLine = require('readline');
var y = myReadLine.createInterface(process.stdin, process.stdout);

var testBlock = new Block;
var currentTet = new Array(4);
var userInput = 0;

console.log('test, test');


var theGrid = new Block;
var stillBlocks = new Array(10);
stillBlocks[0] = new Block;
stillBlocks[1] = new Block;
stillBlocks[2] = new Block;
stillBlocks[3] = new Block;
stillBlocks[4] = new Block;
stillBlocks[5] = new Block;
stillBlocks[6] = new Block;
stillBlocks[7] = new Block;
stillBlocks[8] = new Block;
stillBlocks[9] = new Block;
stillBlocks[10] = new Block;


theGrid = InitializeGrid();

theGrid[5][0] = stillBlocks[0];
theGrid[5][1] = stillBlocks[1];
theGrid[5][2] = stillBlocks[2];
theGrid[5][3] = stillBlocks[3];
theGrid[5][4] = stillBlocks[4];
theGrid[5][5] = stillBlocks[5];
theGrid[5][6] = stillBlocks[6];
theGrid[5][7] = stillBlocks[7];
theGrid[5][8] = stillBlocks[8];
theGrid[5][9] = stillBlocks[9];
theGrid[4][3] = stillBlocks[10];


theGrid[0][0] = testBlock;


CreateLPiece(currentTet, theGrid);


DisplayGrid(theGrid);
var userInput = 0;
//while (userInput != 'q') {
    
    y.question('Your move? :', function(userInput) {
        if (userInput == 'a') {
            MovePieceLeft(currentTet, theGrid);
        }
        else if (userInput == 'd') {
            MovePieceRight(currentTet, theGrid);
        }
        else if (userInput == 's') {
            MovePieceDown(currentTet, theGrid);
        }
        DisplayGrid(theGrid);
        y.close();
        //y.stdin.destroy();
    });
    
    
    //CheckForRows(theGrid, stillBlocks);
    //DisplayGrid(theGrid);
//}

function InitializeGrid() {
    grid = new Array(20);
    for (var i = 0; i < 20; i++) {
        grid[i] = new Array(10);
    }
    for (var j = 0; j < 20; j++) {
        for (var k = 0; k < 10; k++) {
            grid[j][k] = null;
        }
    }
    return grid;
}

function DisplayGrid(myArray) {
    var s = '';
    for (var i = 0; i < 20; i++) {
        s = '<|';
        for (var j = 0; j < 10; j++) {
            if (myArray[i][j] == null)
                s += '.';
            else
                s += 'B';
        }
        s += '|>'
        console.log(s);
    }
    s = '^^^^^^^^^^^^^^';
    console.log(s);
}


function CreateLPiece(theTet, myArray) {
    theTet[0] = new Block;
    theTet[1] = new Block;
    theTet[2] = new Block;
    theTet[3] = new Block;

    theTet[0].up = null;
    theTet[0].right = theTet[1];
    theTet[0].down = null;
    theTet[0].left = null;
    theTet[1].up = null;
    theTet[1].right = theTet[2];
    theTet[1].down = null;
    theTet[1].left = theTet[0];
    theTet[2].up = theTet[3];
    theTet[2].right = null;
    theTet[2].down = null;
    theTet[2].left = theTet[1];
    theTet[3].up = null;
    theTet[3].right = null;
    theTet[3].down = theTet[2];
    theTet[3].left = null;
    theTet[0].posX = 3;
    theTet[0].posY = 1;
    theTet[1].posX = 4;
    theTet[1].posY = 1;
    theTet[2].posX = 5;
    theTet[2].posY = 1;
    theTet[3].posX = 5;
    theTet[3].posY = 0;

    myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
    myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
    myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
    myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
}

function CreateJPiece(theTet, myArray) {
    theTet[0] = new Block;
    theTet[1] = new Block;
    theTet[2] = new Block;
    theTet[3] = new Block;

    theTet[0].up = null;
    theTet[0].right = theTet[1];
    theTet[0].down = null;
    theTet[0].left = null;
    theTet[1].up = null;
    theTet[1].right = theTet[2];
    theTet[1].down = null;
    theTet[1].left = theTet[0];
    theTet[2].up = theTet[3];
    theTet[2].right = null;
    theTet[2].down = null;
    theTet[2].left = theTet[1];
    theTet[3].up = null;
    theTet[3].right = null;
    theTet[3].down = theTet[2];
    theTet[3].left = null;
    theTet[0].posX = 3;
    theTet[0].posY = 1;
    theTet[1].posX = 4;
    theTet[1].posY = 1;
    theTet[2].posX = 5;
    theTet[2].posY = 1;
    theTet[3].posX = 5;
    theTet[3].posY = 0;

    myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
    myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
    myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
    myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
}

function MoveLPieceDown(theTet, myArray) {
    myArray[theTet[0].posY][theTet[0].posX] = null;
    myArray[theTet[1].posY][theTet[1].posX] = null;
    myArray[theTet[2].posY][theTet[2].posX] = null;
    myArray[theTet[3].posY][theTet[3].posX] = null;
    theTet[0].posY += 1;
    theTet[1].posY += 1;
    theTet[2].posY += 1;
    theTet[3].posY += 1;
    myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
    myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
    myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
    myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
}

function CanMoveDown(theTet, myArray) {
    var moveDown = true;
    var count = 0;

    while (count < 4) {
        if (theTet[count].down == null) {
            if (theTet[count].posY + 1 >= 20 || myArray[theTet[count].posY + 1][theTet[count].posX] != null) {
                moveDown = false;
                break;
            }
        }
        count++;
    }
    return moveDown;
}

function MovePieceDown(theTet, myArray) {
    var moveDown = true;
    var count = 0;

    while (count < 4) {
        if (theTet[count].down == null) {
            if (theTet[count].posY + 1 >= 20 || myArray[theTet[count].posY + 1][theTet[count].posX] != null) {
                moveDown = false;
                break;
            }
        }
        count++;
    }
    if (moveDown == true) {
        myArray[theTet[0].posY][theTet[0].posX] = null;
        myArray[theTet[1].posY][theTet[1].posX] = null;
        myArray[theTet[2].posY][theTet[2].posX] = null;
        myArray[theTet[3].posY][theTet[3].posX] = null;
        theTet[0].posY += 1;
        theTet[1].posY += 1;
        theTet[2].posY += 1;
        theTet[3].posY += 1;
        myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
        myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
        myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
        myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
    }
    return moveDown;
}

function MovePieceRight(theTet, myArray) {
    var moveRight = true;
    var count = 0;

    while (count < 4) {
        if (theTet[count].right == null) {
            if (theTet[count].posX + 1 >= 10 || myArray[theTet[count].posY][theTet[count].posX + 1] != null) {
                moveRight = false;
                break;
            }
        }
        count++;
    }
    if (moveRight == true) {
        myArray[theTet[0].posY][theTet[0].posX] = null;
        myArray[theTet[1].posY][theTet[1].posX] = null;
        myArray[theTet[2].posY][theTet[2].posX] = null;
        myArray[theTet[3].posY][theTet[3].posX] = null;
        theTet[0].posX += 1;
        theTet[1].posX += 1;
        theTet[2].posX += 1;
        theTet[3].posX += 1;
        myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
        myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
        myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
        myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
    }
    return moveRight;
}

function MovePieceLeft(theTet, myArray) {
    var moveLeft = true;
    var count = 0;

    while (count < 4) {
        if (theTet[count].left == null) {
            if (theTet[count].posX - 1 < 0 || myArray[theTet[count].posY][theTet[count].posX - 1] != null) {
                moveLeft = false;
                break;
            }
        }
        count++;
    }
    if (moveLeft == true) {
        myArray[theTet[0].posY][theTet[0].posX] = null;
        myArray[theTet[1].posY][theTet[1].posX] = null;
        myArray[theTet[2].posY][theTet[2].posX] = null;
        myArray[theTet[3].posY][theTet[3].posX] = null;
        theTet[0].posX -= 1;
        theTet[1].posX -= 1;
        theTet[2].posX -= 1;
        theTet[3].posX -= 1;
        myArray[theTet[0].posY][theTet[0].posX] = theTet[0];
        myArray[theTet[1].posY][theTet[1].posX] = theTet[1];
        myArray[theTet[2].posY][theTet[2].posX] = theTet[2];
        myArray[theTet[3].posY][theTet[3].posX] = theTet[3];
    }
    return moveLeft;
}

function CheckForRows(myArray, theBlocks) {
    var j = 0;
    var foundHole = false;
    for (var i = 19; i >= 0; i--) {
        j = 0;
        foundHole = false;
        while (j < 10 && foundHole == false) {
            if (myArray[i][j] == null) {
                foundHole = true;
            }
            j++;
        }
        if (foundHole == false) {
            for (k = 0; k < 10; k++) {
                var removalIndex = theBlocks.indexOf(myArray[i][k]);
                theBlocks.splice(removalIndex, 1);
                myArray[i][k] = null;
            }
        }
    }


}

function left(gameid, player) {
    console.log("left");
    var moveLeft = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].left == null) {
            if (currentTet[count].posX - 1 < 0 || theGrid[currentTet[count].posY][currentTet[count].posX - 1] != null) {
                moveLeft = false;
                break;
            }
        }
        count++;
    }
    if (moveLeft == true) {
        theGrid[currentTet[0].posY][currentTet[0].posX] = null;
        theGrid[currentTet[1].posY][currentTet[1].posX] = null;
        theGrid[currentTet[2].posY][currentTet[2].posX] = null;
        theGrid[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posX -= 1;
        currentTet[1].posX -= 1;
        currentTet[2].posX -= 1;
        currentTet[3].posX -= 1;
        theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
    }
    DisplayGrid(theGrid);
    //return moveLeft;
};

function up(gameid, player) {
    console.log("up");
};

function down(gameid, player) {
    console.log("down");
};

function right(gameid, player) {
    console.log("right");
};

function space(gameid, player) {

};

function pause(gameid, player) {

};

// please return the new game id as an index into the game array
function newGame(player) {
    var elGame = {};
    elGame.width = 10;
    elGame.height = 20;
    elGame.gameid = 1;
    return elGame;
};

module.exports = {
    "left": left,
    "up": up,
    "down": down,
    "right": right,
    "space": space,
    "pause": pause,
    "newGame": newGame
};

