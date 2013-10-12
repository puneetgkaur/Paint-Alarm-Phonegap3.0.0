
var c=document.getElementById("canvas_paint");
var ctx=c.getContext("2d");
var canvas_draw=0;
	$('#canvas_paint').on('touchstart', function(e) {
			canvas_draw = 1;
                        mmouseX = e.pageX-$(c).position().left;
                        mmouseY = e.pageY-$(c).position().top;
			ctx.beginPath();
			ctx.moveTo(mmouseX,mmouseY);
                        console.log(ctx.strokeStyle);
		        console.log("%d %d",mmouseX,mmouseY);
	});


	$('#canvas_paint').on('touchmove', function(e) {
			if(canvas_draw){
                            mmouseX = e.pageX-$(c).position().left;
                            mmouseY = e.pageY-$(c).position().top;
			    ctx.lineTo(mmouseX,mmouseY);
                            console.log(ctx.strokeStyle);
console.log("mmouse : %d %d",mmouseX,mmouseY);
console.log("epageX, epageY : %d %d",e.pageX,e.pageY);
console.log("canvase position - %d %d",$(c).position().left,$(c).position().top);
			    ctx.stroke();
			}
	});


	$('#canvas_paint').on('touchend', function(e) {
		        canvas_draw = 0;
	});
	$('#canvas_paint').on('mousedown', function(e) {
			canvas_draw = 1;
                        mmouseX = e.pageX-$(c).position().left;
                        mmouseY = e.pageY-$(c).position().top;
			ctx.beginPath();
			ctx.moveTo(mmouseX,mmouseY);
                        console.log(ctx.strokeStyle);
		        console.log("%d %d",mmouseX,mmouseY);
	});


	$('#canvas_paint').on('mousemove', function(e) {
			if(canvas_draw){
                            mmouseX = e.pageX-$(c).position().left;
                            mmouseY = e.pageY-$(c).position().top;
			    ctx.lineTo(mmouseX,mmouseY);
                            console.log(ctx.strokeStyle);
console.log("mmouse : %d %d",mmouseX,mmouseY);
console.log("epageX, epageY : %d %d",e.pageX,e.pageY);
console.log("canvase position - %d %d",$(c).position().left,$(c).position().top);
			    ctx.stroke();
			}
	});


	$('#canvas_paint').on('mouseup', function(e) {
		        canvas_draw = 0;
	}); 
