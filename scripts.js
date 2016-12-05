var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');
var sideLength = window.innerHeight < window.innerWidth ? window.innerHeight - 20 : window.innerWidth - 20;
var branches = [];
var angle = 45;
var generations = 1;

canvas.width = sideLength;
canvas.height = sideLength;

class Branch {
    constructor(startX, startY, endX, endY) {
        this.startX = startX;
        this.startY = startY;
        this.endX = endX;
        this.endY = endY;
        this.hasBranchedOut = false;

        this.draw = function() {
            ctx.strokeStyle = 'white';
            ctx.beginPath();
            ctx.moveTo(this.startX, this.startY);
            ctx.lineTo(this.endX, this.endY);
            ctx.stroke();
        };

        this.branchOut = function(angle) {
            this.hasBranchedOut = true;

            var rad = (Math.PI/180) * angle;
            var cosAngle = Math.cos(rad);
            var sinAngle = Math.sin(rad);
            var x = this.endX - this.startX;
            var y = this.endY - this.startY;
            var newEndX = this.endX + (x * cosAngle - y * sinAngle) * 2/3;
            var newEndY = this.endY + (x * sinAngle + y * cosAngle) * 2/3;

            return new Branch(this.endX, this.endY, newEndX, newEndY);
        }
    }
}

function drawCanvas() {
   setTimeout(function() {
       raf = window.requestAnimationFrame(drawCanvas);
       ctx.fillStyle = '#696969';
       ctx.fillRect(0, 0, canvas.width, canvas.height);

       ctx.strokeStyle = 'white';
       ctx.font = '40px helvetica';
       var genString = generations >= 20 ? "Don't do this to yourself" : generations;
       ctx.strokeText('Generations: ' + genString, 5, 40);

       for (var i = 0; i < branches.length; i++) {
           branches[i].draw();
       }

   }, 300)
}

function formInput() {
    branches = [];
    branches.push(new Branch(sideLength/2, sideLength, sideLength / 2, sideLength * 3/4));
    generations = 1;
    angle = document.getElementById('input').value;
    if (isNaN(angle)) {
        angle = 45;
    }
}

document.onkeydown = function(e) {
    if (e.keyCode !== 32 || generations >= 20) {
        return;
    }
    generations += 1;
    for (var i = branches.length - 1; i >= 0; i--) {
        var b = branches[i];
        if (!b.hasBranchedOut) {
            branches.push(b.branchOut(angle));
            branches.push(b.branchOut(-angle));
        }
    }
};

branches.push(new Branch(sideLength/2, sideLength, sideLength / 2, sideLength * 3/4));
drawCanvas();