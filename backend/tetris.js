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
var stillBlocks = new Array(0);

/*
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
*/

theGrid = InitializeGrid();

/*
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
*/

theGrid[0][0] = testBlock;

var currentPieceType = 0;
var nextPieceType = Math.floor((Math.random() * 7));

GeneratePieces();


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


function CreateLPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = null;
    currentTet[1].right = currentTet[2];
    currentTet[1].down = null;
    currentTet[1].left = currentTet[0];
    currentTet[2].up = currentTet[3];
    currentTet[2].right = null;
    currentTet[2].down = null;
    currentTet[2].left = currentTet[1];
    currentTet[3].up = null;
    currentTet[3].right = null;
    currentTet[3].down = currentTet[2];
    currentTet[3].left = null;
    currentTet[0].posX = 3;
    currentTet[0].posY = 1;
    currentTet[1].posX = 4;
    currentTet[1].posY = 1;
    currentTet[2].posX = 5;
    currentTet[2].posY = 1;
    currentTet[3].posX = 5;
    currentTet[3].posY = 0;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateJPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = null;
    currentTet[1].right = currentTet[2];
    currentTet[1].down = null;
    currentTet[1].left = currentTet[0];
    currentTet[2].up = null;
    currentTet[2].right = null;
    currentTet[2].down = currentTet[3];
    currentTet[2].left = currentTet[1];
    currentTet[3].up = currentTet[2];
    currentTet[3].right = null;
    currentTet[3].down = null;
    currentTet[3].left = null;
    currentTet[0].posX = 3;
    currentTet[0].posY = 0;
    currentTet[1].posX = 4;
    currentTet[1].posY = 0;
    currentTet[2].posX = 5;
    currentTet[2].posY = 0;
    currentTet[3].posX = 5;
    currentTet[3].posY = 1;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateIPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = null;
    currentTet[1].right = currentTet[2];
    currentTet[1].down = null;
    currentTet[1].left = currentTet[0];
    currentTet[2].up = null;
    currentTet[2].right = currentTet[3];
    currentTet[2].down = null;
    currentTet[2].left = currentTet[1];
    currentTet[3].up = null;
    currentTet[3].right = null;
    currentTet[3].down = null;
    currentTet[3].left = currentTet[2];
    currentTet[0].posX = 3;
    currentTet[0].posY = 0;
    currentTet[1].posX = 4;
    currentTet[1].posY = 0;
    currentTet[2].posX = 5;
    currentTet[2].posY = 0;
    currentTet[3].posX = 6;
    currentTet[3].posY = 0;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateOPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = currentTet[2];
    currentTet[0].left = null;
    currentTet[1].up = null;
    currentTet[1].right = null;
    currentTet[1].down = currentTet[3];
    currentTet[1].left = currentTet[0];
    currentTet[2].up = currentTet[0];
    currentTet[2].right = currentTet[3];
    currentTet[2].down = null;
    currentTet[2].left = null;
    currentTet[3].up = currentTet[1];
    currentTet[3].right = null;
    currentTet[3].down = null;
    currentTet[3].left = currentTet[2];
    currentTet[0].posX = 3;
    currentTet[0].posY = 0;
    currentTet[1].posX = 4;
    currentTet[1].posY = 0;
    currentTet[2].posX = 3;
    currentTet[2].posY = 1;
    currentTet[3].posX = 4;
    currentTet[3].posY = 1;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateZPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = null;
    currentTet[1].right = null;
    currentTet[1].down = currentTet[2];
    currentTet[1].left = currentTet[0];
    currentTet[2].up = currentTet[0];
    currentTet[2].right = currentTet[3];
    currentTet[2].down = null;
    currentTet[2].left = null;
    currentTet[3].up = null;
    currentTet[3].right = null;
    currentTet[3].down = null;
    currentTet[3].left = currentTet[2];
    currentTet[0].posX = 3;
    currentTet[0].posY = 0;
    currentTet[1].posX = 4;
    currentTet[1].posY = 0;
    currentTet[2].posX = 4;
    currentTet[2].posY = 1;
    currentTet[3].posX = 5;
    currentTet[3].posY = 1;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateSPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = currentTet[2];
    currentTet[1].right = null;
    currentTet[1].down = null;
    currentTet[1].left = currentTet[0];
    currentTet[2].up = null;
    currentTet[2].right = currentTet[3];
    currentTet[2].down = currentTet[1];
    currentTet[2].left = null;
    currentTet[3].up = null;
    currentTet[3].right = null;
    currentTet[3].down = null;
    currentTet[3].left = currentTet[2];
    currentTet[0].posX = 3;
    currentTet[0].posY = 1;
    currentTet[1].posX = 4;
    currentTet[1].posY = 1;
    currentTet[2].posX = 4;
    currentTet[2].posY = 0;
    currentTet[3].posX = 5;
    currentTet[3].posY = 0;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CreateTPiece() {
    currentTet[0] = new Block;
    currentTet[1] = new Block;
    currentTet[2] = new Block;
    currentTet[3] = new Block;

    currentTet[0].up = null;
    currentTet[0].right = currentTet[1];
    currentTet[0].down = null;
    currentTet[0].left = null;
    currentTet[1].up = currentTet[3];
    currentTet[1].right = currentTet[2];
    currentTet[1].down = null;
    currentTet[1].left = currentTet[0];
    currentTet[2].up = null;
    currentTet[2].right = null;
    currentTet[2].down = null;
    currentTet[2].left = currentTet[1];
    currentTet[3].up = null;
    currentTet[3].right = null;
    currentTet[3].down = currentTet[1];
    currentTet[3].left = null;
    currentTet[0].posX = 3;
    currentTet[0].posY = 1;
    currentTet[1].posX = 4;
    currentTet[1].posY = 1;
    currentTet[2].posX = 5;
    currentTet[2].posY = 1;
    currentTet[3].posX = 4;
    currentTet[3].posY = 0;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}



function MoveLPieceDown(currentTet, myArray) {
    myArray[currentTet[0].posY][currentTet[0].posX] = null;
    myArray[currentTet[1].posY][currentTet[1].posX] = null;
    myArray[currentTet[2].posY][currentTet[2].posX] = null;
    myArray[currentTet[3].posY][currentTet[3].posX] = null;
    currentTet[0].posY += 1;
    currentTet[1].posY += 1;
    currentTet[2].posY += 1;
    currentTet[3].posY += 1;
    myArray[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    myArray[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    myArray[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    myArray[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}

function CanMoveDown() {
    var moveDown = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].down == null) {
            if (currentTet[count].posY + 1 >= 20 || theGrid[currentTet[count].posY + 1][currentTet[count].posX] != null) {
                moveDown = false;
                break;
            }
        }
        count++;
    }
    return moveDown;
}

function MovePieceDown(currentTet, myArray) {
    var moveDown = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].down == null) {
            if (currentTet[count].posY + 1 >= 20 || myArray[currentTet[count].posY + 1][currentTet[count].posX] != null) {
                moveDown = false;
                break;
            }
        }
        count++;
    }
    if (moveDown == true) {
        myArray[currentTet[0].posY][currentTet[0].posX] = null;
        myArray[currentTet[1].posY][currentTet[1].posX] = null;
        myArray[currentTet[2].posY][currentTet[2].posX] = null;
        myArray[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posY += 1;
        currentTet[1].posY += 1;
        currentTet[2].posY += 1;
        currentTet[3].posY += 1;
        myArray[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        myArray[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        myArray[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        myArray[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
    }
    return moveDown;
}

function MovePieceRight(currentTet, myArray) {
    var moveRight = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].right == null) {
            if (currentTet[count].posX + 1 >= 10 || myArray[currentTet[count].posY][currentTet[count].posX + 1] != null) {
                moveRight = false;
                break;
            }
        }
        count++;
    }
    if (moveRight == true) {
        myArray[currentTet[0].posY][currentTet[0].posX] = null;
        myArray[currentTet[1].posY][currentTet[1].posX] = null;
        myArray[currentTet[2].posY][currentTet[2].posX] = null;
        myArray[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posX += 1;
        currentTet[1].posX += 1;
        currentTet[2].posX += 1;
        currentTet[3].posX += 1;
        myArray[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        myArray[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        myArray[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        myArray[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
    }
    return moveRight;
}

function MovePieceLeft(currentTet, myArray) {
    var moveLeft = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].left == null) {
            if (currentTet[count].posX - 1 < 0 || myArray[currentTet[count].posY][currentTet[count].posX - 1] != null) {
                moveLeft = false;
                break;
            }
        }
        count++;
    }
    if (moveLeft == true) {
        myArray[currentTet[0].posY][currentTet[0].posX] = null;
        myArray[currentTet[1].posY][currentTet[1].posX] = null;
        myArray[currentTet[2].posY][currentTet[2].posX] = null;
        myArray[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posX -= 1;
        currentTet[1].posX -= 1;
        currentTet[2].posX -= 1;
        currentTet[3].posX -= 1;
        myArray[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        myArray[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        myArray[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        myArray[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
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

function TetToBlocks() {
    for (var i = 0; i < 4; i++) {
        
        currentTet[i].left = null;
        currentTet[i].right = null;
        currentTet[i].up = null;
        currentTet[i].down = null;
        stillBlocks.push(currentTet[i]);
        currentTet[i] = null;
    }
}

function GeneratePieces() {
    
    currentPieceType = nextPieceType;
    nextPieceType = Math.floor((Math.random() * 7));
    
    switch(currentPieceType) {
        case 0:
            CreateLPiece();
            break;
        case 1:
            CreateJPiece();
            break;
        case 2:
            CreateIPiece();
            break;
        case 3:
            CreateOPiece();
            break;
        case 4:
            CreateZPiece();
            break;
        case 5:
            CreateSPiece();
            break;
        case 6:
            CreateTPiece();
            break;
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
    var moveDown = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].down == null) {
            if (currentTet[count].posY + 1 >= 20 || theGrid[currentTet[count].posY + 1][currentTet[count].posX] != null) {
                moveDown = false;
                break;
            }
        }
        count++;
    }
    if (moveDown == true) {
        theGrid[currentTet[0].posY][currentTet[0].posX] = null;
        theGrid[currentTet[1].posY][currentTet[1].posX] = null;
        theGrid[currentTet[2].posY][currentTet[2].posX] = null;
        theGrid[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posY += 1;
        currentTet[1].posY += 1;
        currentTet[2].posY += 1;
        currentTet[3].posY += 1;
        theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
    }
    
    if (CanMoveDown() == false) {
        TetToBlocks();
        GeneratePieces();
    }
    DisplayGrid(theGrid);
    
    
    //return moveDown;
};

function right(gameid, player) {
    console.log("right");
    var moveRight = true;
    var count = 0;

    while (count < 4) {
        if (currentTet[count].right == null) {
            if (currentTet[count].posX + 1 >= 10 || theGrid[currentTet[count].posY][currentTet[count].posX + 1] != null) {
                moveRight = false;
                break;
            }
        }
        count++;
    }
    if (moveRight == true) {
        theGrid[currentTet[0].posY][currentTet[0].posX] = null;
        theGrid[currentTet[1].posY][currentTet[1].posX] = null;
        theGrid[currentTet[2].posY][currentTet[2].posX] = null;
        theGrid[currentTet[3].posY][currentTet[3].posX] = null;
        currentTet[0].posX += 1;
        currentTet[1].posX += 1;
        currentTet[2].posX += 1;
        currentTet[3].posX += 1;
        theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
        theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
        theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
        theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
    }
    DisplayGrid(theGrid);
    //if (CanMoveDown() == false)
    //return moveRight;
};

function space(gameid, player) {
    console.log("space");
    var moveDown = true;
    var count = 0;
    while(CanMoveDown() == true) {
        moveDown = true;
        var count = 0;

        while (count < 4) {
            if (currentTet[count].down == null) {
                if (currentTet[count].posY + 1 >= 20 || theGrid[currentTet[count].posY + 1][currentTet[count].posX] != null) {
                    moveDown = false;
                    break;
                }
            }
            count++;
        }
        if (moveDown == true) {
            theGrid[currentTet[0].posY][currentTet[0].posX] = null;
            theGrid[currentTet[1].posY][currentTet[1].posX] = null;
            theGrid[currentTet[2].posY][currentTet[2].posX] = null;
            theGrid[currentTet[3].posY][currentTet[3].posX] = null;
            currentTet[0].posY += 1;
            currentTet[1].posY += 1;
            currentTet[2].posY += 1;
            currentTet[3].posY += 1;
            theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
            theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
            theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
            theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
        }
    }
    TetToBlocks();
    GeneratePieces();
    
    DisplayGrid(theGrid);

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

