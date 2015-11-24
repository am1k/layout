var blocks = $('.test-overlay'),
    sizesArr,
    heightScreen = $(document).height(),
    widthScreen = $(document).width();

function getSizes(){
    var mainInformation = [],
        item,
        offset,
        innerWidth,
        innerHeight,
        information;

    for(var i = 0; i < blocks.length; i++){
        information = {};
        item = $(blocks[i]);
        offset = $(blocks[i]).offset();
        innerWidth = $(blocks[i]).innerWidth();
        innerHeight = $(blocks[i]).innerHeight();
        information.start = offset.left;
        information.top = offset.top;
        information.end = offset.left + innerWidth;
        information.width = innerWidth;
        information.height = innerHeight;
        information.el = blocks[i];

        mainInformation.push(information)
    }

    mainInformation.sort(function(a, b){
       return a.start > b.start;
    });

    return mainInformation;
}

sizesArr = getSizes();

function getHorizontalRanges(data){
    var res = [];

    data.forEach(function(item){
        res.push(parseFloat(item.start, 10), parseFloat(item.start + item.width, 10));
    });

    if(res.indexOf(0) < 0){
        res.unshift(0);
    }
    if(res.indexOf(widthScreen) < 0){
        res.push(widthScreen);
    }

    return res.sort(function(a, b){
        return a > b ? 1 : -1;
    });
}

function getVerticalRanges(data){
    var res = [];

    data.forEach(function(item){
        res.push(parseFloat(item.top, 10), parseFloat(item.top + item.height, 10));
    });

    if(res.indexOf(0) < 0){
        res.unshift(0);
    }
    if(res.indexOf(heightScreen) < 0){
        res.push(heightScreen);
    }

    return res;
}

var horizontalRanges = getHorizontalRanges(sizesArr);
var items;
var verticalRanges;

for(var i = 0; i < horizontalRanges.length; i++){
    items = getItems(horizontalRanges[i], horizontalRanges[i+1]);
    if(items.length > 0){
        verticalRanges = getVerticalRanges(items);
        for(var j = 0; j < verticalRanges.length;){
            if(verticalRanges[j] > verticalRanges[j+2]) {
                verticalRanges.splice(j+1, 2);
            } else if(verticalRanges[j] > verticalRanges[j+1]){
                verticalRanges.splice(j, 2);
            } else {
                createItem(horizontalRanges[i], horizontalRanges[i+1], verticalRanges[j], verticalRanges[j+1]);
                j+=2;
            }
        }
    } else {
        createItem(horizontalRanges[i], horizontalRanges[i+1]);
    }
}

function getItems(start, end){
    return sizesArr.filter(function(item){
        //console.log(item,end, start);
        return item.end >= end && item.start <= start;
    }).sort(function(a, b){
       return a.top > b.top;
    });
}

function createItem(start,end, top, bottom){
    var createOverlay = $('<div></div>');
    $(createOverlay).addClass('part-overlay');
    $(createOverlay).css({
        'left': start,
        'width': end - start,
        'top': top,
        'height': bottom - top });
    $('body').append(createOverlay);
}

/*sizesArr.forEach(function(item, i){
    var start = i === 0 && item.start > 0 ? 0 : sizesArr[i-1].start,
    end = item.start,
    items = getItems(start, end);
    console.log(start, end);
        if(items.length > 0){
            fillByVertical(items, start, end);
        } else{
            createItem(start,end);
        }
});*/


/*function fillByVertical(items, start, end){
    var arr = [];
    items[0].top !== 0 && (arr[0] = 0);

    items.forEach(function(item){
       arr.push(item.top);
        arr.push(item.top + item.height);
    });

    //console.log(arr);
    arr.indexOf(heightScreen) < 0 && arr.push(heightScreen);
    for(var i = 0; i < arr.length; i += 2){
        //console.log(arr[i], arr[i+1]);
        var createOverlay = $('<div></div>');
        $(createOverlay).addClass('part-overlay');
        (createOverlay).css({'left': start, 'width': end - start, 'top': arr[i], 'height': arr[i+1] - arr[i]});
        $('body').append(createOverlay);
    }
}*/





