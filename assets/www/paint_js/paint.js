
// size the content area
RocknCoder.Dimensions = (function () {
  var get = function () {
    var isFirstPass = false,
        isIPhone = (/iphone/gi).test(navigator.appVersion),
width = $(window).width(),
height = $(window).height() + (isIPhone ?  60 : 0),
hHeight = $('header').outerHeight() || 0,
fHeight = $('footer').outerHeight() || 0;
    return {
      width: width,
      height: height - hHeight - fHeight
    };
  };
  return {
    get: get
  };
}());


reSizeCanvas = function () {
  var dims = RocknCoder.Dimensions.get();
  $canvas.attr({
    width: dims.width - 4,
    height: dims.height - 4
  });
  return dims;
},

 // start tracking the touches, move the pen to the beginning of a line
$canvas.bind('touchstart', function (event) {
  var xy = extractXY(event.originalEvent.touches[0]);
  ctx.moveTo(xy.x, xy.y);
  event.preventDefault();
  return false;
});

// draw a line from the last point to this one
$canvas.bind('touchmove', function (event) {
  var xy = extractXY(event.originalEvent.touches[0]);
  ctx.lineTo(xy.x, xy.y);
  ctx.stroke();
  event.preventDefault();
  return false;
});



