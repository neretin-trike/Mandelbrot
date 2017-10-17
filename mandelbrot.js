window.onload = function() {
    var canvas = document.getElementById("surface");
    var context = canvas.getContext("2d");

    context.lineWidth = 2;

    var canWidth = canvas.getAttribute('width'),
        canHeight = canvas.getAttribute('height'),
        figRatio = canHeight/canWidth,
        figScale = 950;

    context.strokeStyle = "rgba(200, 230, 201, 0.15)";
    context.moveTo(canWidth/2,0);
    context.lineTo(canWidth/2,canHeight);
    context.stroke();

    context.beginPath();

    context.strokeStyle = "rgba(200, 230, 201, 0.15)";
    context.moveTo(0,canHeight/1.2);
    context.lineTo(canWidth,canHeight/1.2);
    context.stroke();

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

    var x = 0,
        y = 0,
        alfa = 0.3,
        beta = 0.44083;

    for (var i=0; i<580; i++){
        x_new = x*x-y*y+alfa;
        y_new = 2*x*y+beta;

        context.shadowColor = 'red';
        context.shadowBlur = 10;
        context.beginPath();
        context.fillStyle = '#E91E63';
        context.arc(x_new*figScale+canWidth/2,-y_new*figScale+canHeight/1.2, 2, 0, Math.PI*2, true);
        context.fill();


        console.log("После "+ x_new + " " + y_new);

        context.shadowColor = 'blue';
        context.shadowBlur = 1;
        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle =  "rgba(30, 147, 236, 0.15)";
        context.moveTo(x*figScale+canWidth/2,-y*figScale+canHeight/1.2);
        context.lineTo(x_new*figScale+canWidth/2,-y_new*figScale+canHeight/1.2);
        context.stroke();

        x = x_new;
        y = y_new;

        
    }

};