image.style.display="block";
var c = document.getElementById("canvas");
var drawArea = document.getElementById("drawArea");
var ctx = c.getContext("2d");


image.onload = function(e) {
    ctx.canvas.width = image.width;
    ctx.canvas.height = image.height;
    drawArea.style.width = image.width;
    drawArea.style.height = image.height;
    c.width = image.width;
    c.height = image.height;
    ctx.drawImage(image, 0, 0);
    console.log(labels);
    for (i = 0; i < labels.length; i++){
        drawLabels(labels[i].id, labels[i].xMin, labels[i].xMax, labels[i].yMin, labels[i].yMax);
    }
};




initDraw(document.getElementById('drawArea'));



function initDraw(drawArea) {
    function setMousePosition(e) {
        var ev = e || window.event; //Moz || IE
        if (ev.pageX) { //Moz
            mouse.x = ev.pageX + window.pageXOffset;
            mouse.y = ev.pageY + window.pageYOffset;
        } else if (ev.clientX) { //IE
            mouse.x = ev.clientX + document.body.scrollLeft;
            mouse.y = ev.clientY + document.body.scrollTop;
        }
    };

    var mouse = {
        x: 0,
        y: 0,
        startX: 0,
        startY: 0
    };
    var element = null;

    canvas.onmousemove = function (e) {
        setMousePosition(e);
        if (element !== null) {
            element.style.width = Math.abs(mouse.x - mouse.startX) + 'px';
            element.style.height = Math.abs(mouse.y - mouse.startY) + 'px';
            element.style.left = (mouse.x - mouse.startX < 0) ? mouse.x + 'px' : mouse.startX + 'px';
            element.style.top = (mouse.y - mouse.startY < 0) ? mouse.y + 'px' : mouse.startY + 'px';
        }
    }

    canvas.onclick = function (e) {
        if (element !== null) {
            addLabel(element);
            element = null;
            drawArea.style.cursor = "default";
            console.log("finsihed.");
            
        } else {
            console.log("begun.");
            mouse.startX = mouse.x;
            mouse.startY = mouse.y;
            element = document.createElement('div');
            element.className = 'rectangle'
            element.style.left = mouse.x + 'px';
            element.style.top = mouse.y + 'px';
            drawArea.appendChild(element)
            drawArea.style.cursor = "crosshair";
        }
    }
}

var drawLabels = function(id, xMin, xMax, yMin, yMax) {
    ctx.strokeStyle = "red";
    ctx.fillStyle = "red";
    ctx.rect(xMin, yMin, xMax - xMin, yMax - yMin);
    ctx.lineWidth="5";
    ctx.stroke();
    ctx.font = "10px Arial";
    ctx.fillText("id: " + id, xMin,yMin);
};

var addLabel = function(element){
    var xMin = parseInt(element.style.left) * (image.width / c.scrollWidth) - $('#drawArea').offset().left * (image.width / c.scrollWidth);
    var yMin = parseInt(element.style.top) * (image.height / c.scrollHeight) - $('#drawArea').offset().top * (image.height / c.scrollHeight);
    var xMax = xMin + parseInt(element.style.width) * (image.width / c.scrollWidth);
    var yMax = yMin + parseInt(element.style.height) * (image.height / c.scrollHeight);
    window.location.replace("/add/" + (labels.length + 1) +
            "?xMin=" + xMin +
            "&xMax=" + xMax +
            "&yMin=" + yMin +
            "&yMax=" + yMax);
}