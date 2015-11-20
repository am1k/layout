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

sizesArr.forEach(function(item, i){
    var start = i === 0 && item.start> 0 ? 0 : sizesArr[i-1].start,
        end = item.start,
        items = getItems(start, end);
    console.log();
    if(items.length > 0){
        fillByVertical(items, start, end);
    } else{
        createItem(start,end);
    }
});

function getItems(start, end){
    return sizesArr.filter(function(item){
        return item.end >= end && item.start <= start;
    }).sort(function(a, b){
       return a.top > b.top;
    });
}

function fillByVertical(items, start, end){
    var arr = [];

    items[0].top !== 0 && (arr[0] = 0);

    //console.log(items);
    items.forEach(function(item){
       arr.push(item.top);
        arr.push(item.top + item.height);
    });
    arr.indexOf(heightScreen) < 0 && arr.push(heightScreen);
    for(var i = 0; i < arr.length; i += 2){
        //console.log(arr[i], arr[i+1]);
        var createOverlay = $('<div></div>');
        $(createOverlay).addClass('part-overlay');
        (createOverlay).css({'left': start, 'width': end - start, 'top': arr[i], 'height': arr[i+1] - arr[i]});
        $('body').append(createOverlay);
    }
}

function createItem(start,end){
    console.log(start, end);
    var createOverlay = $('<div></div>');
    $(createOverlay).addClass('part-overlay');
    $(createOverlay).css({'left': start, 'width': end - start, 'height': heightScreen});
    $('body').append(createOverlay);
}



