var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');



var speed = 3;
var amount = 200;
var distance = 100;
var minSize= 20;
var randomSizeMultiplier= 10;
var growrate = 10;
var maxgrow = 35;
var opacity = 100;

var mouse = {
    x: undefined,
    y: undefined,
}
window.addEventListener('mousemove', function(event){
    mouse.x = event.x;
    mouse.y = event.y;
});

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    init();
});

var circleArray = [];

function init(){

    circleArray = [];

    for (var i = 0; i < amount; i++) {
        var radius = (Math.random() * randomSizeMultiplier) + minSize;
        var x = Math.random() * (innerWidth - radius *2) +radius;
        var y = Math.random() * (innerHeight - radius *2) +radius;
        var dx = (Math.random() - 0.5) * speed;
        var dy = (Math.random() - 0.5) * speed;
        var color = 'rgba('+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.round(Math.random()*255)+','+Math.random()*opacity+')';
    
        circleArray.push(new Circle(x, y, dx, dy, radius,color));
    }
}

function Circle(x,y,dx,dy,radius,color){
    this.x= x;
    this.y= y;
    this.dx=dx;
    this.dy=dy;
    this.radius=radius;
    this.color=color;

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI*2, false);
        c.strokeStyle = color;
        c.fillStyle = color;
        c.fill();
        c.stroke();
    }

    this.update = function(){
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if(this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        
        this.x = this.x+ this.dx;
        this.y = this.y+ this.dy;

        //interactiv
        if (mouse.x - this.x < distance && mouse.x - this.x > -distance && mouse.y - this.y < distance && mouse.y - this.y > -distance) {
            if(this.radius <= maxgrow){
                this.radius = this.radius + growrate;
            }
        }else if(this.radius >= radius){
            this.radius = this.radius - growrate;
        }else{};
        
        this.draw();
    }
}

init();


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0,innerWidth,innerHeight);

    for(var i = 0; i < circleArray.length; i++){
        circleArray[i].update();
    }
};

animate();








