var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
ctx.fillStyle="#FF0000";
ctx.fillRect(0,0,150,75);

ctx.beginPath();
ctx.arc(200,50,10,0,2*Math.PI);
ctx.stroke();

ctx.font="20px Arial";
ctx.fillText("Hello World",220,20);

// Create gradient
var grd=ctx.createLinearGradient(0,0,1,0);
grd.addColorStop(0,"red");
grd.addColorStop(1,"white");

// Fill with gradient
ctx.fillStyle=grd;
ctx.fillRect(5,100,100,180);

