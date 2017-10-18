var x = 0,
    y = 0,
    alfa = 0.3,
    beta = 0.44083
    figScale = 700,
    pointSize = 2500,
    hord = false,
    mainColors = false,
    canvas = null,
    context = null,
    myTimer = null,
    yAxisPos = 1.35;

var mainColor = ["Aqua","Black","Blue","Fuchsia ", 
                "Gray","Green","Lime","Maroon",
                "Navy","Olive","Purple","Red",
                "Silver","Teal","White","Yellow"]; 

window.onkeydown = handle;
var menuDisplay = true;
function handle(e) {
  if (e.keyCode == 192){
    menuDisplay= !menuDisplay;

    if (menuDisplay){
        menu.style.display = "none"; 
    }
    else{
        menu.style.display = "block"; 
    }
  }
}

// function randomInteger(min, max) {
//     return (Math.random() * (min - max) + max).toFixed(2)
// }

window.onload = function() {
    canvas = document.getElementById("surface");
    context = canvas.getContext("2d");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    var figRatio = canvas.width/canvas.height;

    CanvasClear();
    // StartDrawMandelbrot();

    // for (var i = 0; i<250; i++){
    //     context.beginPath();
    //     console.log(randomInteger(0.05,0.5));
    //     context.fillStyle = 'rgba(255,255,255,'+randomInteger(0.05,0.75)+')';
    //     context.arc(canvas.width-randomInteger(0,canvas.width),canvas.height-randomInteger(0,canvas.height), randomInteger(1.0,1.5), 0, Math.PI*2, true);
    //     context.fill(); 
    // }
};

window.onresize = function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    CanvasClear();
}


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
    context.moveTo(0,canvas.height/yAxisPos);
    context.lineTo(canvas.width,canvas.height/yAxisPos);
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
    figScale = scaleInput.value;
    pointSize = pointSizeInput.value;
    hord = hordInput.checked;
    mainColors = colorInput.checked;

    x_new = x*x-y*y+alfa;
    y_new = 2*x*y+beta;


    context.beginPath();
    if(mainColors){
        context.shadowBlur = 0;
        context.fillStyle = mainColor[i%15];
    }
    else{
        context.shadowColor = 'red';
        context.shadowBlur = 5;
        context.fillStyle = '#E91E63';
    }
    context.arc(x_new*figScale+canvas.width/2,-y_new*figScale+canvas.height/yAxisPos, 2, 0, Math.PI*2, true);
    context.fill();

    // console.log("После "+ x_new + " " + y_new);

    if (hord){
        context.shadowColor = 'blue';
        context.shadowBlur = 1;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle =  "rgba(91, 192, 190, 0.15)";
        context.moveTo(x*figScale+canvas.width/2,-y*figScale+canvas.height/yAxisPos);
        context.lineTo(x_new*figScale+canvas.width/2,-y_new*figScale+canvas.height/yAxisPos);
        context.stroke();
    }

    this.x = x_new;
    this.y = y_new;

    // console.log(i);
    i++;
    if ((i==pointSize)&&(pointSize!=-1)){
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