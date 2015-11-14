// Tetris Server
// test test

var Block = function() {
    this.posX = null;
    this.posY = null;
    this.up = null;
    this.right = null;
    this.down = null;
    this.left = null;
    this.blockID = 0;
};

var Game = function(updateFunc, endFunc) {
    this.EndFunc = endFunc;
    this.UpdateFunc = updateFunc;
    this.currentTet = new Array(4);
    this.blockID = 0;
    this.totalClearedRows = 0;
    this.nextLevel = 10;
    this.theGrid = new Block;
    this.stillBlocks = new Array(0);
    this.playerScore = 0;
    this.currentLevel = 0;
    this.currentPieceType = 0;
    this.nextPieceType = Math.floor((Math.random() * 7));
    this.intervalHandle = null;
    
    this.init = function() {
        console.error('test test');
        var deltas = {};
        this.theGrid = this.InitializeGrid();
        this.GeneratePieces(deltas);
        this.intervalHandle = setInterval(this.TimeMoveDown, 1000 - (10 * this.currentLevel), this);
        return this.CreateDeltas(deltas);
    };
    
    this.InitializeGrid = function()  {
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
    };
    
    this.CreateLPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = null;
        this.currentTet[1].right = this.currentTet[2];
        this.currentTet[1].down = null;
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = this.currentTet[3];
        this.currentTet[2].right = null;
        this.currentTet[2].down = null;
        this.currentTet[2].left = this.currentTet[1];
        this.currentTet[3].up = null;
        this.currentTet[3].right = null;
        this.currentTet[3].down = this.currentTet[2];
        this.currentTet[3].left = null;
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 1;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 1;
        this.currentTet[2].posX = 5;
        this.currentTet[2].posY = 1;
        this.currentTet[3].posX = 5;
        this.currentTet[3].posY = 0;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 4;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateJPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = null;
        this.currentTet[1].right = this.currentTet[2];
        this.currentTet[1].down = null;
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = null;
        this.currentTet[2].right = null;
        this.currentTet[2].down = this.currentTet[3];
        this.currentTet[2].left = this.currentTet[1];
        this.currentTet[3].up = this.currentTet[2];
        this.currentTet[3].right = null;
        this.currentTet[3].down = null;
        this.currentTet[3].left = null;
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 0;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 0;
        this.currentTet[2].posX = 5;
        this.currentTet[2].posY = 0;
        this.currentTet[3].posX = 5;
        this.currentTet[3].posY = 1;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 4;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateIPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = null;
        this.currentTet[1].right = this.currentTet[2];
        this.currentTet[1].down = null;
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = null;
        this.currentTet[2].right = this.currentTet[3];
        this.currentTet[2].down = null;
        this.currentTet[2].left = this.currentTet[1];
        this.currentTet[3].up = null;
        this.currentTet[3].right = null;
        this.currentTet[3].down = null;
        this.currentTet[3].left = this.currentTet[2];
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 0;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 0;
        this.currentTet[2].posX = 5;
        this.currentTet[2].posY = 0;
        this.currentTet[3].posX = 6;
        this.currentTet[3].posY = 0;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 5;
        this.currentTet[1].offset = 2;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateOPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = this.currentTet[2];
        this.currentTet[0].left = null;
        this.currentTet[1].up = null;
        this.currentTet[1].right = null;
        this.currentTet[1].down = this.currentTet[3];
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = this.currentTet[0];
        this.currentTet[2].right = this.currentTet[3];
        this.currentTet[2].down = null;
        this.currentTet[2].left = null;
        this.currentTet[3].up = this.currentTet[1];
        this.currentTet[3].right = null;
        this.currentTet[3].down = null;
        this.currentTet[3].left = this.currentTet[2];
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 0;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 0;
        this.currentTet[2].posX = 3;
        this.currentTet[2].posY = 1;
        this.currentTet[3].posX = 4;
        this.currentTet[3].posY = 1;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 3;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateZPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = null;
        this.currentTet[1].right = null;
        this.currentTet[1].down = this.currentTet[2];
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = this.currentTet[0];
        this.currentTet[2].right = this.currentTet[3];
        this.currentTet[2].down = null;
        this.currentTet[2].left = null;
        this.currentTet[3].up = null;
        this.currentTet[3].right = null;
        this.currentTet[3].down = null;
        this.currentTet[3].left = this.currentTet[2];
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 0;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 0;
        this.currentTet[2].posX = 4;
        this.currentTet[2].posY = 1;
        this.currentTet[3].posX = 5;
        this.currentTet[3].posY = 1;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 4;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateSPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = this.currentTet[2];
        this.currentTet[1].right = null;
        this.currentTet[1].down = null;
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = null;
        this.currentTet[2].right = this.currentTet[3];
        this.currentTet[2].down = this.currentTet[1];
        this.currentTet[2].left = null;
        this.currentTet[3].up = null;
        this.currentTet[3].right = null;
        this.currentTet[3].down = null;
        this.currentTet[3].left = this.currentTet[2];
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 1;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 1;
        this.currentTet[2].posX = 4;
        this.currentTet[2].posY = 0;
        this.currentTet[3].posX = 5;
        this.currentTet[3].posY = 0;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 4;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CreateTPiece = function() {
        this.currentTet[0] = new Block;
        this.currentTet[1] = new Block;
        this.currentTet[2] = new Block;
        this.currentTet[3] = new Block;

        this.currentTet[0].up = null;
        this.currentTet[0].right = this.currentTet[1];
        this.currentTet[0].down = null;
        this.currentTet[0].left = null;
        this.currentTet[1].up = this.currentTet[3];
        this.currentTet[1].right = this.currentTet[2];
        this.currentTet[1].down = null;
        this.currentTet[1].left = this.currentTet[0];
        this.currentTet[2].up = null;
        this.currentTet[2].right = null;
        this.currentTet[2].down = null;
        this.currentTet[2].left = this.currentTet[1];
        this.currentTet[3].up = null;
        this.currentTet[3].right = null;
        this.currentTet[3].down = this.currentTet[1];
        this.currentTet[3].left = null;
        this.currentTet[0].posX = 3;
        this.currentTet[0].posY = 1;
        this.currentTet[1].posX = 4;
        this.currentTet[1].posY = 1;
        this.currentTet[2].posX = 5;
        this.currentTet[2].posY = 1;
        this.currentTet[3].posX = 4;
        this.currentTet[3].posY = 0;

        this.currentTet[0].wide = true;
        this.currentTet[0].offset = 4;
        this.currentTet[1].offset = 3;

        this.theGrid[this.currentTet[0].posY][this.currentTet[0].posX] = this.currentTet[0];
        this.theGrid[this.currentTet[1].posY][this.currentTet[1].posX] = this.currentTet[1];
        this.theGrid[this.currentTet[2].posY][this.currentTet[2].posX] = this.currentTet[2];
        this.theGrid[this.currentTet[3].posY][this.currentTet[3].posX] = this.currentTet[3];

        for (var i = 0; i < 4; i++) {
            this.currentTet[i].blockID = this.blockID;
            this.blockID++;
        }
    };
    
    this.CanMoveDown = function() {
        var moveDown = true;
        var count = 0;

        while (count < 4) {
            if (this.currentTet[count].down == null) {
                if (this.currentTet[count].posY + 1 >= 20 || this.theGrid[this.currentTet[count].posY + 1][this.currentTet[count].posX] != null) {
                    moveDown = false;
                    break;
                }
            }
            count++;
        }
        return moveDown;
    };
    
    this.CheckForRows = function(deltas) {
        var j = 0;
        var clearedRows = 0;
        var foundHole = false;
        for (var i = 19; i >= 0; i--) {
            j = 0;
            foundHole = false;
            while (j < 10 && foundHole == false) {
                if (this.theGrid[i][j] == null) {
                    foundHole = true;
                }
                j++;
            }
            if (foundHole == false) {
                clearedRows++;
                for (k = 0; k < 10; k++) {
                    var removalIndex = this.stillBlocks.indexOf(this.theGrid[i][k]);
                    deltas[this.theGrid[i][k].blockID] = this.theGrid[i][k];
                    deltas[this.theGrid[i][k].blockID].dead = true;
                    this.stillBlocks.splice(removalIndex, 1);
                    this.theGrid[i][k] = null;
                }
                for (var x = i; x > 0; x--) {
                    for (var y = 0; y < 10; y++) {
                        if (this.theGrid[x-1][y] != null) {
                            this.theGrid[x-1][y].posY += 1;
                            this.theGrid[x][y] = this.theGrid[x-1][y];
                            this.theGrid[x-1][y] = null;
                            deltas[this.theGrid[x][y].blockID] = this.theGrid[x][y];
                        }
                    }

                }
                i++;
            }
        }

        this.CalculateScore(clearedRows);
    };
    
    this.CalculateScore = function(clearedRows) {
        
        switch (clearedRows) {
            case 0:
                break;
            case 1:
                this.playerScore += (40*(this.currentLevel + 1));
                break;
            case 2:
                this.playerScore += (100*(this.currentLevel + 1));
                break;
            case 3:
                this.playerScore += (300*(this.currentLevel + 1));
                break;
            case 4:
                this.playerScore += (1200*(this.currentLevel + 1));
                break;
        }
        this.totalClearedRows += clearedRows;
        if (this.totalClearedRows >= this.nextLevel) {
            this.currentLevel++;
            this.nextLevel += 10;
        }

    };
    
    this.TetToBlocks = function() {
        for (var i = 0; i < 4; i++) {
            this.currentTet[i].left = null;
            this.currentTet[i].right = null;
            this.currentTet[i].up = null;
            this.currentTet[i].down = null;
            this.stillBlocks.push(this.currentTet[i]);
            this.currentTet[i] = null;
        }
    };
    
    this.GeneratePieces = function(deltas) {

        this.currentPieceType = this.nextPieceType;
        this.nextPieceType = Math.floor((Math.random() * 7));

        switch(this.currentPieceType) {
            case 0:
                this.CreateLPiece();
                break;
            case 1:
                this.CreateJPiece();
                break;
            case 2:
                this.CreateIPiece();
                break;
            case 3:
                this.CreateOPiece();
                break;
            case 4:
                this.CreateZPiece();
                break;
            case 5:
                this.CreateSPiece();
                break;
            case 6:
                this.CreateTPiece();
                break;
        }

        for (var i = 0; i < this.currentTet.length; i++) {
            deltas[this.currentTet[i].blockID] = this.currentTet[i];
        }
    };
    
    this.left = function() {
        console.log("left");
        var moveLeft = true;
        var count = 0;
        var deltas = {};
        

        while (count < 4) {
            if (this.currentTet[count].left == null) {
                if (this.currentTet[count].posX - 1 < 0 || this.theGrid[this.currentTet[count].posY][this.currentTet[count].posX - 1] != null) {
                    moveLeft = false;
                    break;
                }
            }
            count++;
        }
        if (moveLeft == true) {
            for (var i = 0; i < this.currentTet.length; i++) {
                this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = null;
            }           
            for (var i = 0; i < this.currentTet.length; i++) {
               this.currentTet[i].posX -= 1;
            }
            for (var i = 0; i < this.currentTet.length; i++) {
               this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = this.currentTet[i];
            }
        }
        for (var i = 0; i < this.currentTet.length; i++) {
            deltas[this.currentTet[i].blockID] = this.currentTet[i];
        }
        this.DisplayGrid();
        return this.CreateDeltas(deltas);
        //return moveLeft;
    };
    
    this.up = function() {
    
        var deltas = {};
        console.log("up");
        
        if (this.currentTet[0].wide == true)
        {
            this.Rotate (this.currentTet, this.theGrid, this.currentTet[0].offset, 4);
            this.currentTet[0].wide = false;
        }
        else
        {
            this.Rotate (this.currentTet, this.theGrid, this.currentTet[1].offset, 4);
            this.currentTet[0].wide = true;
        }
        for (var i = 0; i < this.currentTet.length; i++) {
            deltas[this.currentTet[i].blockID] = this.currentTet[i];
        }
        this.DisplayGrid();
        return this.CreateDeltas(deltas);
    };
    
    this.down = function() {

        var moveDown = true;
        var count = 0;
        var deltas = {};

        while (count < 4) {
            if (this.currentTet[count].down == null) {
                if (this.currentTet[count].posY + 1 >= 20 || this.theGrid[this.currentTet[count].posY + 1][this.currentTet[count].posX] != null) {
                    moveDown = false;
                    break;
                }
            }
            count++;
        }
        if (moveDown == true) {
            for (var i = 0; i < this.currentTet.length; i++) {
                this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = null;
            }           
            for (var i = 0; i < this.currentTet.length; i++) {
                this.currentTet[i].posY += 1;
            }
            for (var i = 0; i < this.currentTet.length; i++) {
               this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = this.currentTet[i];
            }
        }

        for (var i = 0; i < this.currentTet.length; i++) {
            deltas[this.currentTet[i].blockID] = this.currentTet[i];
        }
        this.DisplayGrid();
        return this.CreateDeltas(deltas);
    };
    
    this.right = function() {
        var moveRight = true;
        var count = 0;
        var deltas = {};

        while (count < 4) {
            if (this.currentTet[count].right == null) {
                if (this.currentTet[count].posX + 1 >= 10 || this.theGrid[this.currentTet[count].posY][this.currentTet[count].posX + 1] != null) {
                    moveRight = false;
                    break;
                }
            }
            count++;
        }
        if (moveRight == true) {
            for (var i = 0; i < this.currentTet.length; i++) {
                this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = null;
            }           
            for (var i = 0; i < this.currentTet.length; i++) {
               this.currentTet[i].posX += 1;
            }
            for (var i = 0; i < this.currentTet.length; i++) {
               this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = this.currentTet[i];
            }
        }
        for (var i = 0; i < this.currentTet.length; i++) {
            deltas[this.currentTet[i].blockID] = this.currentTet[i];
        }
        this.DisplayGrid();
        return this.CreateDeltas(deltas);
    };
    
    this.space = function() {
    
        var moveDown = true;
        var count = 0;
        var deltas = {};
        
        while(this.CanMoveDown() == true) {
            moveDown = true;
            var count = 0;

            while (count < 4) {
                if (this.currentTet[count].down == null) {
                    if (this.currentTet[count].posY + 1 >= 20 || this.theGrid[this.currentTet[count].posY + 1][this.currentTet[count].posX] != null) {
                        moveDown = false;
                        break;
                    }
                }
                count++;
            }
            if (moveDown == true) {
                for (var i = 0; i < this.currentTet.length; i++) {
                    this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = null;
                }           
                for (var i = 0; i < this.currentTet.length; i++) {
                   this.currentTet[i].posY += 1;
                }
                for (var i = 0; i < this.currentTet.length; i++) {
                   this.theGrid[this.currentTet[i].posY][this.currentTet[i].posX] = this.currentTet[i];
                }
            }
        }
        this.TetToBlocks();
        this.CheckForRows(deltas);
        this.GeneratePieces(deltas);
        this.DisplayGrid();
        return this.CreateDeltas(deltas);
    };
    
    this.Rotate = function(theTet, myArray, horizOffset, tetSize) {
        var localXOffset;
        var localYOffset;
        var minOrigY=21;
        var minOrigX=21;
        var rotDummy;
		var legal = true;

        var rotTet = new Array(tetSize);

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
		
		//moving it back into the game grid's space
		for (i=0; i < tetSize; i++)
		{
		  rotTet[i].posX = rotTet[i].posX + localXOffset;
		  rotTet[i].posY = rotTet[i].posY + localYOffset;
		}

        //special case handling and error checking (for clipping and the like) goes here

        for (i=0; i < tetSize; i++)
		{
		    //if the new positions are occupied, it's illegal
		    if (myArray[rotTet[i].posY][rotTet[i].posX] != null)
			{
			    legal = false;
				//if it was occupied by the previous position, it is instead legal
			    for (j = 0; j < tetSize; j++)
				{
				    if (rotTet[i].posY == theTet[j].posY && rotTet[i].posX == theTet[j].posX)
					{
					    legal = true;
					}
				}
				if (legal == false)
				{
				    break;
				}
			}
		}
		
		//boundary testing, if the piece would be out of bounds, it's illegal (wallkicks go here if we get to them)
		if (legal == true)
		{
		    for ( i=0; i < tetSize; i++)
		    {
		        if (rotTet[i].posX < 0 || rotTet[i].posX > 9 || rotTet[i].posY < 0 || rotTet[i].posY > 19)
				{
				    legal = false;
				}
		    }
		}

        //time to make theTet take the values we just calculated and update the game grid
        if (legal == true)
		{
		    for (i=0; i < tetSize; i++)
            {
            myArray[theTet[i].posY][theTet[i].posX] = null;
            }
		    for (i=0; i < tetSize; i++)
            {
                theTet[i].posX = rotTet[i].posX;
                theTet[i].posY = rotTet[i].posY;
                myArray[theTet[i].posY][theTet[i].posX] = theTet[i];
            }

            this.updateRight(theTet, tetSize);
            this.updateLeft(theTet, tetSize);
            this.updateDown(theTet, tetSize);
		}

    };
    
    this.updateRight = function(theTet, tetSize) {
        var bool;

        for (i=0; i<tetSize; i++)
        {
            bool = true;
            for (j=0; j<tetSize; j++)
            {
                if (j != i)
                {
                    //if the current block has a neighbouring block in the active tet, set right to that block
                    if (theTet[i].posX + 1 == theTet[j].posX && theTet[i].posY == theTet[j].posY)
                    {
                        theTet[i].right = theTet[j];
                        bool = false;
                    }
                }
            }

            //if it had no neighbouring blocks in the active tet, set the right to null
            if (bool == true)
            {
                theTet[i].right = null;
            }
        }
    };

    this.updateLeft = function(theTet, tetSize) {
        var bool;

        for (i=0; i<tetSize; i++)
        {
            bool = true;
            for (j=0; j<tetSize; j++)
            {
                if (j != i)
                {
                    if (theTet[i].posX-1 == theTet[j].posX && theTet[i].posY == theTet[j].posY)
                    {
                        theTet[i].left = theTet[j];
                        bool = false;
                    }
                }
            }

            if (bool == true)
            {
                theTet[i].left = null;
            }
        }
    };

    this.updateDown = function(theTet, tetSize) {
        var bool;

        for (i=0; i<tetSize; i++)
        {
            bool = true;
            for (j=0; j<tetSize; j++)
            {
                if (j != i)
                {
                    if (theTet[i].posX == theTet[j].posX && theTet[i].posY + 1 == theTet[j].posY)
                    {
                        theTet[i].down = theTet[j];
                        bool = false;
                    }
                }
            }

            if (bool == true)
            {
                theTet[i].down = null;
            }
        }
    };
    
    this.TimeMoveDown = function(self) {
        
        var moveDown = true;
        var count = 0;
        var deltas = {};

        if (self.CanMoveDown() == false) {
            if (self.CheckEnd()) {
                clearInterval(self.intervalHandle);
                self.EndFunc();
                console.log('THE GAME IS OVER!');
                self.UpdateFunc(self.CreateDeltas(deltas));
                return;
                
            }
            self.TetToBlocks();
            self.CheckForRows(deltas);
            self.GeneratePieces(deltas);
        }
        else {
            while (count < 4) {
                if (self.currentTet[count].down == null) {
                    if (self.currentTet[count].posY + 1 >= 20 || self.theGrid[self.currentTet[count].posY + 1][self.currentTet[count].posX] != null) {
                        moveDown = false;
                        break;
                    }
                }
                count++;
            }
            if (moveDown == true) {
                for (var i = 0; i < self.currentTet.length; i++) {
                    self.theGrid[self.currentTet[i].posY][self.currentTet[i].posX] = null;
                }           
                for (var i = 0; i < self.currentTet.length; i++) {
                   self.currentTet[i].posY += 1;
                }
                for (var i = 0; i < self.currentTet.length; i++) {
                   self.theGrid[self.currentTet[i].posY][self.currentTet[i].posX] = self.currentTet[i];
                }
            }
        }
        for (var i = 0; i < self.currentTet.length; i++) {
            deltas[self.currentTet[i].blockID] = self.currentTet[i];
        }
        self.DisplayGrid();
        self.UpdateFunc(self.CreateDeltas(deltas));
        
    };
    
    this.DisplayGrid = function(theGrid) {
        var s = '';
        s = 'Current Level: ' + this.currentLevel + ' Score: ' + this.playerScore + ' Lines Cleared: ' + this.totalClearedRows;
        console.log(s);
        s = '';
        for (var i = 0; i < 20; i++) {
            s = '<|';
            for (var j = 0; j < 10; j++) {
                if (this.theGrid[i][j] == null)
                    s += '.';
                else
                    s += '█';
            }
            s += '|>'
            console.log(s);
        }
        s = '^^^^^^^^^^^^^^';
        console.log(s);

    };
    
    this.CreateDeltas = function(deltas) {
        var newDeltas = [];
        for(var key in deltas) {
            if (deltas.hasOwnProperty(key)) {
                var newDelta = {};
                newDelta.x = deltas[key].posX;
                newDelta.y = deltas[key].posY;
                newDelta.dead = deltas[key].dead;
                newDelta.id = deltas[key].blockID;
                newDeltas.push(newDelta);
            }
        }
        return newDeltas;
    };
};    

Game.prototype.CheckEnd = function() {
    return (this.theGrid[0][4] != null || this.theGrid[0][5] != null);
};

var Games = {};
var gameID = 0;

function left(gameid, player) {
    return Games[gameid].left();
};

function up(gameid, player) {
    return Games[gameid].up();
};

function down(gameid, player) {
    return Games[gameid].down();
};

function right(gameid, player) {
    return Games[gameid].right();
};

function space(gameid, player) {
    return Games[gameid].space();
};

function pause(gameid, player) {

};

function newGame(player, updateFunc, endFunc) {
    console.error("print please");
    var elGame = {};
    elGame.width = 10;
    elGame.height = 20;
    elGame.gameid = gameID++;
    Games[elGame.gameid] = new Game(updateFunc, endFunc);
    elGame.deltas = Games[elGame.gameid].init();
    console.error('lol el game');
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

