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

var testBlock = new Block;
var currentTet = new Array(4);

console.log('test, test');

var theGrid = new Block;

theGrid = InitializeGrid();

theGrid[4][2] = testBlock;

CreateLPiece(currentTet, theGrid);
DisplayGrid(theGrid);
MoveLPieceDown(currentTet, theGrid);
DisplayGrid(theGrid);


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

function left(gameid, player) {

}

function up(gameid, player) {

}

function down(gameid, player) {

}

function right(gameid, player) {

}

function space(gameid, player) {

}

function pause(gameid, player) {

}

// please return the new game id as an index into the game array
function newGame(player) {
    
}

module.exports = {
    "left": left,
    "up": up,
    "down": down,
    "right": right,
    "space": space,
    "pause": pause
}

