var x = 0,
    y = 0,
    canvas = null,
    context = null,
    myTimer = null,
    yAxisPos = 1.35,
    menuDisplay = true,
    draws = false;

var alfa = 0.3,
    beta = 0.44083
    figScale = 700,
    pointSize = 2500,
    hord = false,
    mainColors = false;

var mainColor = ["Aqua","Black","Blue","Fuchsia ", 
                "Gray","Green","Lime","Maroon",
                "Navy","Olive","Purple","Red",
                "Silver","Teal","White","Yellow"]; 

window.onkeydown = handle;
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

window.onload = function() {
    canvas = document.getElementById("surface");
    context = canvas.getContext("2d");

    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;

    CanvasClear();
};

window.onresize = function() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    CanvasClear();
}

// The parametric function X(t).
function X(t, A, B, C)
{
    return (A - B) * Math.cos(t) + C * Math.cos((A - B) / B * t);
}

// The parametric function Y(t).
function Y(t, A, B, C)
{
    return (A - B) * Math.sin(t) - C * Math.sin((A - B) / B * t);
}

function GCD(a,b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {var temp = a; a = b; b = temp;}
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}

var pointsX = [],
    pointsY = [];

function btnDraw_Click()
{
    A = parseFloat(alfaInput.value);
    B = parseFloat(betaInput.value);
    C = scaleInput.value;
    iter = pointSizeInput.value;

    pointsX.length = 0;
    pointsY.length = 0;

    wid = canvas.width;
    hgt = canvas.height;

    cx = wid / 2;
    cy = hgt / 2;
    t = 0;
    dt = Math.PI / iter;

    max_t = 2 * Math.PI * B / GCD(A,B);
    x1 = cx + X(t, A, B, C);
    y1 = cy + Y(t, A, B, C);

    pointsX.push(x1);
    pointsY.push(y1);

    while (t <= max_t)
    {
        t += dt;
        x1 = cx + X(t, A, B, C);
        y1 = cy + Y(t, A, B, C);

        pointsX.push(x1);
        pointsY.push(y1);
    }

    StartDrawSpirograph();
}

var i=0;
function StartDrawSpirograph (){
    if (draws==false){
        i = 0;


        myTimer = setInterval(
                    function (){DrawSpirograph()},1);

        draws = true;
        goDraw.disabled = draws;
    }
}

function DrawSpirograph(){
    x_new = pointsX[i];
    y_new = pointsY[i];

    console.log(x_new+ " "+y_new);

    context.beginPath();
    context.shadowColor = 'red';
    context.shadowBlur = 5;
    context.fillStyle = '#E91E63';
    context.arc(x_new,y_new, 2, 0, Math.PI*2, true);
    context.fill();

    context.beginPath();
    context.lineWidth = 1;
    context.strokeStyle = "rgba(91, 192, 190, 0.15)";
    context.moveTo(pointsX[i],pointsY[i]);
    context.lineTo(pointsX[i+1],pointsY[i+1]);
    context.stroke();

    i++;
    if (i==pointsX.length){
        clearInterval(myTimer);
    }
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

function StopDrawMandelbrot(){
    draws = false;
    goDraw.disabled = draws;
    clearInterval(myTimer);
}

var i=0;
function StartDrawMandelbrot(){
    if (draws==false){
        i = 0;
        myTimer = setInterval(
                    function (){
                        DrawMandelbrotSet(x,y,alfa,beta,figScale)
                    }
                    ,1);

        draws = true;
        goDraw.disabled = draws;
    }
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
        context.fillStyle = mainColor[i%16];
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

    i++;
    if ((i==pointSize)&&(pointSize!=-1)){
        clearInterval(myTimer);
    }
}








// function randomInteger(min, max) {
//     return (Math.random() * (min - max) + max).toFixed(2)
// }

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