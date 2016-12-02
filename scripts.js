/**
 * Created by TheSpine on 02/12/16.
 */
var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sideLength = window.innerHeight < window.innerWidth ? window.innerHeight - 10 : window.innerWidth - 10;
var branches = [];
var angle = 45;

canvas.width = sideLength;
canvas.height = sideLength;
console.log(sideLength)

class Branch {
    constructor(startX, startY, endX, endY) {
        this.sX = startX;
        this.sY = startY;
        this.eX = endX;
        this.eY = endY;
        this.hasBranchedOut = false;

        this.draw = function() {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(this.sX, this.sY);
            ctx.lineTo(this.eX, this.eY);
            ctx.stroke();
        };

        this.branchOut = function(angle) {
            this.hasBranchedOut = true;

            var rad = (Math.PI/180) * angle;
            var cosAngle = Math.cos(rad);
            var sinAngle = Math.sin(rad);
            var x = this.eX - this.sX;
            var y = this.eY - this.sY;
            var newEX = this.eX + (x * cosAngle - y * sinAngle) * 2/3;
            var newEY = this.eY + (x * sinAngle + y * cosAngle) * 2/3;

            return new Branch(this.eX, this.eY, newEX, newEY);
        }
    }
}

branches.push(new Branch(sideLength/2, sideLength, sideLength / 2, sideLength * 3/4));

/*
branches.push(new Branch(sideLength/2, 0, sideLength/2, 200));
branches.push(new Branch(sideLength, sideLength/2, sideLength - 200, sideLength/2));
branches.push(new Branch(0, sideLength/2, 200, sideLength/2))
*/

function drawCanvas() {
   setTimeout(function() {
       raf = window.requestAnimationFrame(drawCanvas);
       ctx.fillStyle = '#696969';
       ctx.fillRect(0, 0, canvas.width, canvas.height);

       for (var i = 0; i < branches.length; i++) {
           branches[i].draw();
       }

   }, 300)
}

document.onclick = function() {
    for (var i = branches.length - 1; i >= 0; i--) {
        var b = branches[i];
        if (!b.hasBranchedOut) {
            branches.push(b.branchOut(angle));
            branches.push(b.branchOut(-angle));
        }
    }
};

drawCanvas();