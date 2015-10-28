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

function DisplayGrid(theGrid) {
    var s = '';
    for (var i = 0; i < 20; i++) {
        s = '<|';
        for (var j = 0; j < 10; j++) {
            if (theGrid[i][j] == null)
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

	currentTet[0].wide = true;
	currentTet[0].offset = 4;
	currentTet[1].offset = 3;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 4;
	currentTet[1].offset = 3;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 5;
	currentTet[1].offset = 2;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 3;
	currentTet[1].offset = 3;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 4;
	currentTet[1].offset = 3;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 4;
	currentTet[1].offset = 3;

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

	currentTet[0].wide = true;
	currentTet[0].offset = 4;
	currentTet[1].offset = 3;

    theGrid[currentTet[0].posY][currentTet[0].posX] = currentTet[0];
    theGrid[currentTet[1].posY][currentTet[1].posX] = currentTet[1];
    theGrid[currentTet[2].posY][currentTet[2].posX] = currentTet[2];
    theGrid[currentTet[3].posY][currentTet[3].posX] = currentTet[3];
}



function MoveLPieceDown(currentTet, theGrid) {
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

function MovePieceDown(currentTet, theGrid) {
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
    return moveDown;
}

function MovePieceRight(currentTet, theGrid) {
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
    return moveRight;
}

function MovePieceLeft(currentTet, theGrid) {
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
    return moveLeft;
}

function CheckForRows() {
    var j = 0;
    var foundHole = false;
    for (var i = 19; i >= 0; i--) {
        j = 0;
        foundHole = false;
        while (j < 10 && foundHole == false) {
            if (theGrid[i][j] == null) {
                foundHole = true;
            }
            j++;
        }
        if (foundHole == false) {
            for (k = 0; k < 10; k++) {
                var removalIndex = stillBlocks.indexOf(theGrid[i][k]);
                stillBlocks.splice(removalIndex, 1);
                theGrid[i][k] = null;
            }
        for (var x = i; x > 0; x--) {
            for (var y = 0; y < 10; y++) {
                if (theGrid[x-1][y] != null) {
                    theGrid[x-1][y].posY += 1;
                    theGrid[x][y] = theGrid[x-1][y];
                    theGrid[x-1][y] = null;
                }
            }

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
	if (currentTet[0].wide == true)
	{
		Rotate (currentTet, theGrid, currentTet[0].offset, 4);
		currentTet[0].wide = false;
	}
	else
	{
		Rotate (currentTet, theGrid, currentTet[1].offset, 4);
		currentTet[0].wide = true;
	}
	DisplayGrid(theGrid);
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
        CheckForRows();
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
    CheckForRows();
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

//horizOffset is the "width" of the piece being operated on +1, so a tallise L piece has a width of 2, so the offset should be 3, a sideways L piece would be 4
//tetSize is the size of the tet, for any tetromino this is 4, it is included at this point purely to allow us to do things like rotate quintonimos if we later add them as a powerup or something
function Rotate (theTet, myArray, horizOffset, tetSize) {
	var localXOffset;
	var localYOffset;
	var minOrigY=21;
	var minOrigX=21;
	/*var rotTet = jQuery.extend(true, {}, theTet);*/
	var rotDummy;

	var rotTet = new Array(tetSize);

	console.log (tetSize);

	for ( i=0; i<tetSize; i++)
	{
		rotTet[i] = new Block;
	}

	for ( i=0; i<tetSize; i++)
	{
		rotTet[i].posX = theTet[i].posX;
		rotTet[i].posY = theTet[i].posY;
	}


	//first thing to do is to define the "local co-ordinates," that is to say that we want to set the piece in the corner containing the origin within the first/fourth quadrant (we're dealing with an inverted Y axis, so it makes referring to the quadrants odd)

	for ( i = 0; i < tetSize; i++){
		if (theTet[i].posX < minOrigX)
		{
			minOrigX = theTet[i].posX;
		}
		if (theTet[i].posY < minOrigY)
		{
			minOrigY = theTet[i].posY;
		}
	}

	// the max/mins have been found at this point, it is now time to set the offsets that will put me in my preferred location in local co-ordinate space
	localXOffset = minOrigX - 1;
	localYOffset = minOrigY - 1;

	//at this point, I'm going to set the co-ordinates for the rotated tet piece
	for (i = 0; i < tetSize; i++)
	{
		rotTet[i].posX = (theTet[i].posX - localXOffset);
		rotTet[i].posY = (theTet[i].posY - localYOffset);
	}

	//at the completion of the above loop, the rotTet entity now has the co-ordinates of theTet, but offset to be nestled in a quadrant's corner, it is time to do the rotation math
	for (i = 0; i < tetSize; i++)
	{
		rotDummy = rotTet[i].posX;
		rotTet[i].posX = -rotTet[i].posY + horizOffset;
		rotTet[i].posY = rotDummy;
	}

	//special case handling and error checking (for clipping and the like) goes here

	for (i=0; i < tetSize; i++)
	{
		myArray[theTet[i].posY][theTet[i].posX] = null;
	}

	//time to make theTet take the values we just calculated and update the game grid
	for (i=0; i < tetSize; i++)
	{
		theTet[i].posX = rotTet[i].posX + localXOffset;
		theTet[i].posY = rotTet[i].posY + localYOffset;
		myArray[theTet[i].posY][theTet[i].posX] = theTet[i];
	}
}

function updateRight (theTet, tetSize)
{
    var bool = true;

    for (i=0; i<tetSize; i++)
	{
	    for (j=0; j<tetSize; j++)
		{
		    if (j != i)
			{
			    //if the current block has a neighboring block
			    if (theTet[i].posX + 1 == theTet[j].posX && theTet[i].posY == theTet[j])
				{
				    theTet[i].right = theTet[j];
				}
			}
		}
	}
}

function updateLeft (theTet, tetSize)
{
}
