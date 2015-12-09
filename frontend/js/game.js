(function() {
    var Matrix3x3 = function() {
        var constructor = function(param){
            this.elements = new Float32Array(9);
            var i = 0;
            if(typeof param === 'undefined') {
                for(i = 0; i < 8; i++) {
                    this.elements[i] = 0.0;
                }
                for(i = 0; i < 2; i++) {
                    this.elements[i*3+i] = 1.0;
                }
            } else {
                for(i = 0; i < 8; i++) {
                    this.elements[i] = param.elements[i];
                }
            }
        };

        constructor.prototype.get = function(x, y) {
            if(x < 0 || x > 2 || y < 0 || y > 2) {
                throw {errorStr: "Matrix out of bounds"};
            }
            return this.elements[y + x*3];
        };

        constructor.prototype.set = function(x, y, val) {
            if(x < 0 || x > 2 || y < 0 || y > 2) {
                throw {errorStr: "Matrix out of bounds"};
            }
            this.elements[y + x*3] = val;
        };

        constructor.prototype.mul = function(point, param2) {
            var x, y;
            if(typeof param2 != 'undefined') {
                x = ((this.elements[0] * point.x) + (this.elements[3] * point.y) +
                this.elements[6]);
                y = ((this.elements[1] * point.x) + (this.elements[4] * point.y) +
                this.elements[7]);
            } else {
                var xt = point;
                var yt = param2;
                x = (this.elements[0] * xt) + (this.elements[3] * yt) + this.elements[6];
                y = (this.elements[1] * xt) + (this.elements[4] * yt) + this.elements[7];
            }
            return {'x': x, 'y': y};
        };

        constructor.prototype.invert = function() {
            var m = new Matrix3x3(this);
            var d = 0;

            var i = 0;
            var j = 0;
            for(i = 0; i < 2; i++) {
                var elem = 1;
                for(j = 0; j < 2; j++) {
                    elem *= this.get((j+i)%3, j);
                }
                d += elem;
            }

            for(i = 0; i < 2; i++) {
                var elem = 1
                var k = -1

                for(j = 2; j >= 0; j--) {
                    k++;
                    elem *= this.get((i + k)%3, j);
                }
                d -= elem;
            }

            m.elements[0] = (1/d *((this.get(1, 1) * this.get(2,2)) - (this.get(2,1) *
            this.get(1, 2))));
            m.elements[1] = (-1/d *((this.get(0, 1) * this.get(2,2)) - (this.get(2, 1) *
            this.get(0, 2))));
            m.elements[2] = (1/d *((this.get(0, 1) * this.get(1, 2))- (this.get(1,1) *
            this.get(0, 2))));

            m.elements[3] = (-1/d * ((this.get(1, 0) * this.get(2, 2)) - (this.get(2, 0) *
            this.get(1, 2))));
            m.elements[4] = (1/d * ((this.get(0, 0) * this.get(2, 2)) - (this.get(2, 0) *
            this.get(0, 2))));
            m.elements[5] = (-1/d * ((this.get(0, 0) * this.get(1, 2)) - (this.get(1, 0) *
            this.get(0, 2))));

            m.elements[6] = (1/d * ((this.get(1, 0) * this.get(2, 1)) - (this.get(2, 0) *
            this.get(1, 1))));
            m.elements[7] = (-1/d * ((this.get(0, 0) * this.get(2, 1)) - (this.get(2, 0) *
            this.get(0, 1))));
            m.elements[8] = (1/d * ((this.get(0, 0) * this.get(1, 1)) - (this.get(1, 0) *
            this.get(0, 1))));

            return m;
        };

        constructor.prototype.translate = function(x, y) {
            this.elements[6] =(x * this.elements[0]) + (y * this.elements[3]) + this.elements[6];
            this.elements[7] =(x * this.elements[1]) + (y * this.elements[4]) + this.elements[7];
        };

        constructor.prototype.rotate = function(radians) {
            var temp = [];
            temp[0] = Math.cos(radians);
            temp[1] = -Math.sin(radians);
            temp[2] = Math.sin(radians);
            temp[3] = Math.cos(radians);

            this.elements[0] = (temp[0] * this.elements[0]) + (temp[1] * this.elements[3]);
            this.elements[1] = (temp[0] * this.elements[1]) + (temp[1] * this.elements[4]);
            this.elements[2] = (temp[2] * this.elements[0]) + (temp[3] * this.elements[3]);
            this.elements[3] = (temp[2] * this.elements[1]) + (temp[3] * this.elements[4]);
        };

        constructor.prototype.scale = function(x, y) {
            this.elements[0] = x * this.elements[0];
            this.elements[3] = y * this.elements[3];
            this.elements[1] = x * this.elements[1];
            this.elements[4] = y * this.elements[4];
        };

        return constructor;
    }();

    var Color = function() {
        var constructor = function(r, g, b, a) {
            if(typeof r != 'undefined'){this.r = r;} else {this.r = 1.0;}
            if(typeof g != 'undefined'){this.g = g;} else {this.g = 1.0;}
            if(typeof b != 'undefined'){this.b = b;} else {this.b = 1.0;}
            if(typeof a != 'undefined'){this.a = a;} else {this.a = 1.0;}
        };

        constructor.prototype.setColor = function(r, g, b, a) {
            this.r = r;
            this.g = g;
            this.b = b;
            this.a = a;
        };

        constructor.prototype.toCSS = function () {
            var r = parseInt(this.r * 255);
            r = r.toString(16);
            if(r.length == 1) {r = "0"+r;}
            var g = parseInt(this.g * 255);
            g = g.toString(16);
            if(g.length == 1) {g = "0"+g;}
            var b = parseInt(this.b * 255);
            b = b.toString(16);
            if(b.length == 1) {b = "0"+b;}
            var a = parseInt(this.a * 255);
            a = a.toString(16);
            if(a.length == 1) {a = "0"+a;}
            return "#" + r + g + b;
        };

        return constructor;
    }();

    var Point = function(x, y, z) {
        if(typeof x != 'undefined') {this.x = x;} else {this.x = 0.0;}
        if(typeof y != 'undefined') {this.y = y;} else {this.y = 0.0;}
        if(typeof z != 'undefined') {this.z = z;} else {this.z = 0.0;}
        this.w = 1;
    };

    var Rect = function() {
        this.transform = null;
        this.position = new Point(0, 0, 0)
        this.width = 0.0
        this.height = 0.0
        this.depth = 0.0
        this.strokeColor = new Color(0, 0, 0, 0)
        this.fillColor = new Color(0, 0, 0, 0)
    };

    var RenderWindow = function(id) {
        this.id = id;
        this.canvas = $('#' + id).get(0);
        this.textCanvas = $('#' + id + "-text").get(0);

        this.gl = this.canvas.getContext("webgl", {antialias : false, depth: false});
        this.textCtx = this.textCanvas.getContext("2d");

        if(typeof this.gl == 'undefined') {
            this.gl = canvas.getContext("experimental-webgl");
            if(typeof this.gl == 'undefined') {
                console.log("Your browser does not support the playing of this game");
            }
        }

        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);

        this.gl.clearColor(1.0, 1.0, 1.0, 1.0);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

        var rectVerts = [
            0.0, 0.0,
            1.0, 0.0,
            0.0, 1.0,
            1.0, 1.0,
        ];

        var baseRect = this.gl.createBuffer()
        this.gl.bindBuffer(this.gl.ARRAY_BUFFER, baseRect)
        this.gl.bufferData(this.gl.ARRAY_BUFFER, new Float32Array(rectVerts), this.gl.STATIC_DRAW)
        baseRect.itemSize = 2
        baseRect.numItems = 4

        colorVShaderSource = "\
            attribute vec2 aVertexPosition;\
            \
            uniform mat3 uMVMatrix;\
            \
            void main(void) {\
                vec3 pos = uMVMatrix * vec3(aVertexPosition, 1.0);\
                gl_Position = vec4(pos.xy, 0.0, 1.0);\
            }\
        ";

        colorFShaderSource = "\
            precision mediump float;\
            \
            uniform vec4 uColor;\
            \
            void main(void) {\
                gl_FragColor = uColor;\
            }\
        ";

        var colorVShader = this.gl.createShader(this.gl.VERTEX_SHADER);
        this.gl.shaderSource(colorVShader, colorVShaderSource);
        this.gl.compileShader(colorVShader);
        if(!this.gl.getShaderParameter(colorVShader, this.gl.COMPILE_STATUS)) {
            throw {msg: "vertex shader did not compile correctly"};
        }

        var colorFShader = this.gl.createShader(this.gl.FRAGMENT_SHADER);
        this.gl.shaderSource(colorFShader, colorFShaderSource);
        this.gl.compileShader(colorFShader);
        if(!this.gl.getShaderParameter(colorFShader, this.gl.COMPILE_STATUS)) {
            throw {msg: "fragment shader did not compile correctly"};
        }

        var colorProg = this.gl.createProgram();
        this.gl.attachShader(colorProg, colorVShader);
        this.gl.attachShader(colorProg, colorFShader);
        this.gl.linkProgram(colorProg);
        if(!this.gl.getProgramParameter(colorProg, this.gl.LINK_STATUS)) {
            throw {msg: "shader program could not be linked"};
        }
        this.gl.useProgram(colorProg);

        colorProg.vertexPositionAttribute = this.gl.getAttribLocation(colorProg, "aVertexPosition");
        this.gl.enableVertexAttribArray(colorProg.vertexPositionAttribute);
        colorProg.mvMatrixUniform = this.gl.getUniformLocation(colorProg, "uMVMatrix");
        colorProg.color = this.gl.getUniformLocation(colorProg, "uColor");

        this.clear = function() {
            this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
            this.textCtx.clearRect(0, 0, this.textCtx.canvas.width, this.textCtx.canvas.height);
        }

        this.drawRect = function(rect) {
            this.gl.useProgram(colorProg);
            this.gl.disableVertexAttribArray(1);

            var color = new Float32Array(4);
            color[0] = rect.color.r;
            color[1] = rect.color.g;
            color[2] = rect.color.b;
            color[3] = rect.color.a;

            this.gl.bindBuffer(this.gl.ARRAY_BUFFER, baseRect);
            this.gl.vertexAttribPointer(colorProg.vertexPositionAttribute,
                baseRect.itemSize, this.gl.FLOAT, false, 0, 0);

            var mvmat = new Matrix3x3(rect.transform);
            mvmat.translate(rect.position.x, rect.position.y);
            mvmat.scale(rect.width, rect.height);

            this.gl.uniformMatrix3fv(colorProg.mvMatrixUniform, false, mvmat.elements);
            this.gl.uniform4fv(colorProg.color, color);
            this.gl.drawArrays(this.gl.TRIANGLE_STRIP, 0, baseRect.numItems);
        };

        this.fillText = function(text, x, y) {
            this.textCtx.font = "50px tahoma";
            var metrics = this.textCtx.measureText(text);
            var width = metrics.width;
            var newx = (300/2) - (width/2)
            this.textCtx.fillText(text, newx, y);
        };
    };

    worldMat = new Matrix3x3();
    worldMat.set(2, 0, -1);
    worldMat.set(2, 1, 1);
    worldMat.set(0, 0, 2);
    worldMat.set(1, 1, -2);
    worldMat.scale(1/10, 1/20);

    var boards = {};
    var socket = io();
    var gamedata;
    var entities = {}
    var endGame = false;
    var winner = null;

    var endBackground = new Rect();
    endBackground.transform = worldMat;
    endBackground.position.x = 0;
    endBackground.position.y = 0;
    endBackground.width = 10;
    endBackground.height = 20;
    endBackground.color = new Color(0.0, 0.0, 0.0, 0.4);

    function getCookie(cname) {
        var name = cname + "=";
        var ca = document.cookie.split(';');
        for(var i=0; i<ca.length; i++) {
            var c = ca[i];
            while (c.charAt(0)==' ') c = c.substring(1);
            if (c.indexOf(name) == 0) return c.substring(name.length,c.length);
        }
        return "";
    };

    var username = getCookie('username');
    boards[username] = new RenderWindow("stage");
    var numPlayers = 2;

    function draw() {
        var renderWindow = boards[key];
        for(var key in boards) {
            if(!boards.hasOwnProperty(key)) continue;
            boards[key].clear();
        }

        for(var key in entities) {
            if(!entities.hasOwnProperty(key)) continue;
            var ents = entities[key];
            var renderWindow = boards[key];

            for(var key2 in ents) {
                if(!ents.hasOwnProperty(key2)) continue;
                if(ents[key2].type === "block") {
                    renderWindow.drawRect(ents[key2]);
                }
            }
        }

        if(endGame) {
            for(var key in boards) {
                if(!boards.hasOwnProperty(key)) continue;
                boards[key].drawRect(endBackground);
                if(key === winner) {
                    boards[key].fillText("Win", 0, 300);
                } else {
                    boards[key].fillText("Lose", 0, 300);
                }
            }
        }
        window.requestAnimationFrame(draw);
    };
    window.requestAnimationFrame(draw);

    var createBlock = function(delta, color) {
        var newEnt = new Rect();
        newEnt.type = "block";
        newEnt.transform = worldMat;
        newEnt.position.x = delta.x;
        newEnt.position.y = delta.y;
        newEnt.width = 1;
        newEnt.height = 1;
        newEnt.color = color;
        return newEnt;
    };

    var getColor = function(newColor) {
        var newColorObj = null;
        switch(newColor) {
            case 0:
                newColorObj = new Color(1.0, 0.0, 0.0, 1.0);
                break;
            case 1:
                newColorObj = new Color(0.0, 1.0, 0.0, 1.0);
                break;
            case 2:
                newColorObj = new Color(0.0, 0.0, 1.0, 1.0);
                break;
            case 3:
                newColorObj = new Color(1.0, 1.0, 0.0, 1.0);
                break;
            case 4:
                newColorObj = new Color(1.0, 0.0, 1.0, 1.0);
                break;
            case 5:
                newColorObj = new Color(0.0, 1.0, 1.0, 1.0);
                break;
            case 6:
                newColorObj = new Color(0.5, 1.0, 0.5, 1.0);
        }
        return newColorObj;
    };

    var updateEntities = function(data) {
        var color = null;
        for(var key in data) {
            if(!data.hasOwnProperty(key)) continue;
            var obj = data[key];

            if(entities[obj.player] === undefined) {
                entities[obj.player] = {};
                if(boards[obj.player] === undefined) {
                    boards[obj.player] = new RenderWindow("stage" + numPlayers);
                }
            }
            var board = entities[obj.player];

            if(obj.type === "state") {
                if(board[obj.id] === undefined) {
                    board[obj.id] = {};
                }

                board[obj.id].type = obj.type;
                board[obj.id].nextPiece = obj.nextPiece;
                board[obj.id].level = obj.level;
                board[obj.id].score = obj.score;

                $('#' + boards[obj.player].id + '-score').text(obj.score);
                $('#' + boards[obj.player].id + '-level').text(obj.level);

            } else if(obj.type === "block") {
                if(board[obj.id] === undefined) {
                    if(color === null) {
                        color = getColor(obj.color);
                    }
                    board[obj.id] = createBlock(obj, color);
                } else {
                    if(obj.dead) {
                        delete board[obj.id];
                        continue;
                    }

                    board[obj.id].position.x = obj.x;
                    board[obj.id].position.y = obj.y;
                }
            }
        }
    };

    socket.on('connect', function() {
        console.log("Connected!");
    });

    socket.on('join-response', function(data) {
        var expiryDate = new Date();
        expiryDate.setMinutes(expiryDate.getMinutes() + 30);

        $(document).keydown(function(e) {
            switch(e.keyCode) {
                case 32:
                    socket.emit("space");
                    break;
                case 37:
                    socket.emit("left");
                    break;
                case 38:
                    socket.emit("up");
                    break;
                case 39:
                    socket.emit("right");
                    break;
                case 40:
                    socket.emit("down");
                    break;
            }
        });
    });

    socket.on('update-game', function(data) {
        updateEntities(data);
    });

    socket.on('end', function(data) {
        endGame = true;
        winner = data;
        setTimeout(function() {
            window.location.href = "/matchmaking"
        }, 3000);
        console.log("I have received a message to return to matchmaking.");
    });

    var parseUri = function() {
        var splitter = window.location.href;
        var uriData = {};
        splitter = splitter.split('?')[1];
        var vars = splitter.split(':');
        for(var i = 0; i < vars.length; i++) {
            var pair = vars[i].split('=');
            uriData[pair[0]] = pair[1];
        }
        return uriData;
    };

    var gameData = {};
    var uriData = parseUri();
    console.log(uriData);
    gameData.gameid = uriData.gameid;
    gameData.token = getCookie("token");

    // for now lets just auto join an anonymous game
    socket.emit('join-game', gameData);

})();
