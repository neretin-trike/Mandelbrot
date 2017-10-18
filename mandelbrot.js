var x = 0,
    y = 0,
    alfa = 0.3,
    beta = 0.44083
    figScale = 750,
    hord = false,
    pointSize = 2500,
    canvas = null,
    context = null,
    myTimer = null,

window.onload = function() {
    canvas = document.getElementById("surface");
    context = canvas.getContext("2d");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    var figRatio = canvas.width/canvas.height;

    CanvasClear();
    // StartDrawMandelbrot();
};

function CanvasClear(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    DrawAxis();
}

function DrawAxis(){

    context.shadowBlur = 0;
    context.lineWidth = 2;

    context.beginPath();
    context.strokeStyle = "rgba(200, 230, 201, 0.15)";
    context.moveTo(canvas.width/2,0);
    context.lineTo(canvas.width/2,canvas.height);
    context.stroke();

    context.beginPath();
    context.strokeStyle = "rgba(200, 230, 201, 0.15)";
    context.moveTo(0,canvas.height/1.2);
    context.lineTo(canvas.width,canvas.height/1.2);
    context.stroke();
}

var i=0;
function StartDrawMandelbrot(){
    i = 0;
    myTimer = setInterval(
                function (){
                    DrawMandelbrotSet(x,y,alfa,beta,figScale)
                }
                ,1);
}

function DrawMandelbrotSet(x,y,alfa,beta,figScale){
    alfa = parseFloat(alfaInput.value);
    beta = parseFloat(betaInput.value);
    figScale = parseInt(scaleInput.value);
    pointSize = pointSizeInput.value;
    hord = hordInput.checked;

    x_new = x*x-y*y+alfa;
    y_new = 2*x*y+beta;

    context.shadowColor = 'red';
    context.shadowBlur = 5;
    context.beginPath();
    context.fillStyle = '#E91E63';
    context.arc(x_new*figScale+canvas.width/2,-y_new*figScale+canvas.height/1.2, 2, 0, Math.PI*2, true);
    context.fill();

    // console.log("После "+ x_new + " " + y_new);

    if (hord){
        context.shadowColor = 'blue';
        context.shadowBlur = 1;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle =  "rgba(30, 147, 236, 0.15)";
        context.moveTo(x*figScale+canvas.width/2,-y*figScale+canvas.height/1.2);
        context.lineTo(x_new*figScale+canvas.width/2,-y_new*figScale+canvas.height/1.2);
        context.stroke();
    }


    this.x = x_new;
    this.y = y_new;

    // console.log(i);
    i++;
    if ( i==pointSize){
        clearInterval(myTimer);
    }
}

    // context.beginPath();
    // context.fillStyle = 'blue';
    // context.arc(500, 400, 3, 0, Math.PI*2, true);
    // context.fill();

    // context.beginPath();
    // context.strokeStyle = "yellow";
    // context.moveTo(500,400);
    // context.lineTo(400,300);
    // context.stroke();

    // context.beginPath();
    // context.fillStyle = 'red';
    // context.arc(400, 300, 3, 0, Math.PI*2, true);
    // context.fill();