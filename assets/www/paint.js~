//	var canvas=document.getElementById('canvas_paint');
//        $(canvas).width($(window).width()-55);console.log("window"+$(window).width());
//        $(canvas).height($(window).height());


var c=document.getElementById("canvas_paint");
var ctx=c.getContext("2d");
ctx.strokeStyle="#FF99FF";
//ctx.strokeStyle=$('#stroke_color_picker').spectrum("get").toHexString();
//ctx.fillStyle=$('#fill_color_picker').spectrum("get").toHexString();
//console.log($('#stroke_color_picker').spectrum("get").toHexString(),$('#stroke_color_picker').spectrum("get").alpha)
var canvas_draw=0;

$(document).on('pageinit','#Paint', function(){

        //draw_Pencil();
});

function draw(toDo)
{
	$('#canvas_paint').bind('vmousedown', function(e) {
                   if(toDo=='pencil')
                   {
                        e.preventDefault();
			canvas_draw = 1;
                        mmouseX = e.pageX-$(c).position().left;
                        mmouseY = e.pageY-$(c).position().top;
			ctx.beginPath();
			ctx.moveTo(mmouseX,mmouseY);
                        console.log(ctx.strokeStyle);
		        console.log("%d %d",mmouseX,mmouseY);
                   }
	});


	$('#canvas_paint').bind('vmousemove', function(e) {
                   
                   if(toDo=='pencil')
                   {
                        e.preventDefault();
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
                   }
	});


	$('#canvas_paint').bind('vmouseup', function(e) {
                   if(toDo=='pencil')
                   {
                        e.preventDefault();
		        canvas_draw = 0;
                   }
	});


}
/*

//Function to swipe the items on the toolbar

    var step = 1;
    var current = 0;
    var maximum = $(".categories ul li").size();
    var visible = 2;
    var speed = 500;
    var liSize = 120;
    var height = 60;    
    var ulSize = liSize * maximum;
    var divSize = liSize * visible; 

	    $('.categories').css("width", "auto").css("height", height+"px").css("visibility", "visible").css("overflow", "hidden").css("position", "relative");
	    $(".categories ul li").css("list-style","none").css("display","inline");
	    $(".categories ul").css("width", ulSize+"px").css("left", -(current * liSize)).css("position", "absolute").css("white-space","nowrap").css("margin","0px").css("padding","5px");

    $(".categories").swipeleft(function(event){
        if(current + step < 0 || current + step > maximum - visible) {return; }
        else {
            current = current + step;
            $('.categories ul').animate({left: -(liSize * current)}, speed, null);
        }
        return false;
    });

    $(".categories").swiperight(function(){
        if(current - step < 0 || current - step > maximum - visible) {return; }
        else {
            current = current - step;
            $('.categories ul').animate({left: -(liSize * current)}, speed, null);
        }
        return false;
    });         
*/
