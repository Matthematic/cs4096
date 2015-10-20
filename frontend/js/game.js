(function() {
    var Matrix3x3 = function() {
        var constructor = function(param){
            this.elements = new Float32Array(9);
            var i = 0;
            if(typeof param != 'undefined') {
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

    var canvas = $('#stage').get(0);
    var gl = canvas.getContext("webgl", {antialias : false, depth: false});
    if(typeof gl == 'undefined') {
        gl = canvas.getContext("experimental-webgl");
        if(typeof gl == 'undefined') {
            console.log("Your browser does not support the playing of this game");
        }
    }

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    var rectVerts = [
        0.0, 0.0,
        1.0, 0.0,
        0.0, 1.0,
        1.0, 1.0,
    ];

    var baseRect = gl.createBuffer()
    gl.bindBuffer(gl.ARRAY_BUFFER, baseRect)
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(rectVerts), gl.STATIC_DRAW)
    baseRect.itemSize = 2
    baseRect.numItems = 4

    colorVShaderSource = "\
        attribute vec2 aVertexPosition;\
        \
        uniform mat3 uMVMatrix;\
        uniform mat3 uPMatrix;\
        \
        void main(void) {\
            vec3 pos = uMVMatrix * vec3(aVertexPosition, 1.0);\
            pos = uPMatrix * pos;\
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

    var colorVShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(colorVShader, colorVShaderSource);
    gl.compileShader(colorVShader);
    if(!gl.getShaderParameter(colorVShader, gl.COMPILE_STATUS)) {
        throw {msg: "vertex shader did not compile correctly"};
    }

    var colorFShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(colorFShader, colorFShaderSource);
    gl.compileShader(colorFShader);
    if(!gl.getShaderParameter(colorFShader, gl.COMPILE_STATUS)) {
        throw {msg: "fragment shader did not compile correctly"};
    }

    var colorProg = gl.createProgram();
    gl.attachShader(colorProg, colorVShader);
    gl.attachShader(colorProg, colorFShader);
    gl.linkProgram(colorProg);
    if(!gl.getProgramParameter(colorProg, gl.LINK_STATUS)) {
        throw {msg: "shader program could not be linked"};
    }
    gl.useProgram(colorProg);

    colorProg.vertexPositionAttribute = gl.getAttribLocation(colorProg, "aVertexPosition");
    gl.enableVertexAttribArray(colorProg.vertexPositionAttribute);
    colorProg.pMatrixUniform = gl.getUniformLocation(colorProg, "uPMatrix");
    colorProg.mvMatrixUniform = gl.getUniformLocation(colorProg, "uMVMatrix");
    colorProg.color = gl.getUniformLocation(colorProg, "uColor");

    var drawRect = function(rect) {
        gl.useProgram(colorProg);
        gl.disableVertexAttribArray(1);

        var mvmat = new Matrix3x3();

        var color = new Float32Array(4);
        color[0] = rect.fillColor.r;
        color[1] = rect.fillColor.g;
        color[2] = rect.fillColor.b;
        color[3] = rect.fillColor.a;

        mvmat.translate(rect.position.x, rect.position.y);
        mvmat.scale(rect.width, rect.height);

        gl.bindBuffer(gl.ARRAY_BUFFER, baseRect);
        gl.vertexAttribPointer(colorProg.vertexPositionAttribute,
            baseRect.itemSize, gl.FLOAT, false, 0, 0);

        if(rect.transform != null) {
            gl.uniformMatrix3fv(colorProg.pMatrixUniform, false, rect.transform.elements);
        } else {
            gl.uniformMatrix3fv(colorProg.pMatrixUniform, false, Projection.elements);
        }

        gl.uniformMatrix3fv(colorProg.mvMatrixUniform, false, mvmat.elements);
        gl.uniform4fv(colorProg.color, color);
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, baseRect.numItems);
    };

    var socket = io();
    var gamedata;

    socket.on('connect', function() {
        console.log("Connected!");
    });

    socket.on('join-response', function(data) {
        gamedata = data;
        console.log(gamedata.gameid);
        console.log(gamedata.width);
        console.log(gamedata.height);

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
    })

    // for now lets just auto join an anonymous game
    socket.emit('join-game');

})();