window.onload = function() {
    var canvas = document.getElementById("surface");
    var context = canvas.getContext("2d");
    //alert( 'Документ и все ресурсы загружены' );

    context.lineWidth = 2;

    context.strokeStyle = "#C8E6C9";
    context.moveTo(500,0);
    context.lineTo(500,800);
    context.stroke();

    context.beginPath();

    context.strokeStyle = "#C8E6C9";
    context.moveTo(0,400);
    context.lineTo(1000,400);
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

    for (var i=0; i<500; i++){
        x_new = x*x-y*y+alfa;
        y_new = 2*x*y+beta;

        context.beginPath();
        context.fillStyle = '#E91E63';
        context.arc(x_new*500+500, y_new*500+400/2, 2, 0, Math.PI*2, true);
        context.fill();

        console.log("После "+ x_new + " " + y_new);

        context.beginPath();
        context.lineWidth = 1;
        context.strokeStyle = "#64B5F6";
        context.moveTo(x*500+500,y*500+400/2);
        context.lineTo(x_new*500+500,y_new*500+400/2);
        context.stroke();

        x = x_new;
        y = y_new;
    }

};