var blocks = $('.test-overlay');
var positions = [],
    widths  = [],
    heights = [],
    screen = [];


function findPosition(){
    for(var i = 0; i < blocks.length; i++){
        positions.push($(blocks[i]).position());
        widths.push($(blocks[i]).innerWidth());
        heights.push($(blocks[i]).innerHeight());
    }

    screen.push($(window).width());
    screen.push($(document).height());

}

findPosition();

function addOverlayLeft(positions, widths, heights){
    var startEndElement = [],
        startEndTopElement = [],
        createOverlayLeft = document.createElement('div'),
        createOverlayTop = document.createElement('div'),
        createOverlayBottom = document.createElement('div'),
        createOverlayRight = document.createElement('div');

    for (var i=0; i<positions.length; i++){
        startEndElement.push(positions[i].left);
        startEndElement.push(positions[i].left + widths[i]);
        startEndTopElement.push(positions[i].top);
        startEndTopElement.push(positions[i].top + heights[i]);
        startEndElement.sort(function(a,b){return a-b});
        startEndTopElement.sort(function(a,b){return a-b});
    }
    document.body.appendChild(createOverlayLeft);
    startEndElement.unshift(0);
    startEndTopElement.unshift(0);
    var currentElementLeft = startEndElement[0];
    var currentElementTop = startEndTopElement[0];
    var items;

    for (var j=0; j<startEndElement.length; j++){
        items = getItems(start, end);
        if(items.length){

            console.log(startEndElement[j], startEndElement[j + 1]);
            currentElementLeft = startEndElement[j];
            //console.log(startEndElement[j], currentElementLeft);

        }
    }





    console.log(startEndElement, startEndTopElement);
}

addOverlayLeft(positions, widths, heights);