var fieldArray = [];
const uncoveredPath = 'url("img/uncovered.png")';
const bombPath = 'url("img/bomb.png")';
const flaggedPath = 'url("img/flagged.png")';
var bombArray = [];
var bomb;
var counter = 0;
var fieldsLeft;
var fields;
var width;
var height;
var boardWidth;
var bombAmount;
var topLeftCorner;
var topRightCorner;
var bottomLeftCorner;
var bottomRightCorner;
var leftBorderFields = [];
var rightBorderFields = [];
var topBorderFields = [];
var bottomBorderFields = [];
var gameOver;
var addedSpace;

function loadGame(width, height){
    gameOver = false;
    fields = width * height;
    if(width < 6){
        addedSpace = 50;
    }else{
        addedSpace = 100;
    }
    boardWidth = (50 * width) + addedSpace;
    // 50 dla 1-5
    //100 dla 6-10
    $(".board").css("width", boardWidth);
    bombAmount = Math.floor(fields / 4);
    fieldsLeft = fields - bombAmount;
    $("#bombCounter").text("Liczba bomb: " + bombAmount);
    for(var i = 0; i < fields; i++){
        $(".board").append("<div class='field'></div>");
    }
    //Initializing game board array with 0
    for(var i = 0; i < fields; i++){
        fieldArray[i] = counter;
    }
    // Drawing bombs
    while(bombArray.length < bombAmount){
        bomb = Math.floor((Math.random() * fields));
        if(bombArray.indexOf(bomb) === -1){
            bombArray.push(bomb);
            fieldArray[bomb] = "*";
        }
    }
    // fieldArray[4] = "*";
    topLeftCorner = 0;
    topRightCorner = width - 1;
    bottomLeftCorner = fields - width;
    bottomRightCorner = fields - 1;
    //the top and bottom borders are respectively the fields between top and bottom corners
    //calculating left border fields
    var currentLeftBorderField = parseInt(width);
    while(leftBorderFields.length < height - 2){
        leftBorderFields.push(currentLeftBorderField);
        currentLeftBorderField = currentLeftBorderField + parseInt(width);
    }
    //calculating right border fields
    var currentRightBorderField = (width * 2) - 1;
    while(rightBorderFields.length < height - 2){
        rightBorderFields.push(currentRightBorderField);
        currentRightBorderField = currentRightBorderField + parseInt(width);
    }
    //calculating top border fields
    var currentTopBorderField = 1;
    while(topBorderFields.length < width - 2){
        topBorderFields.push(currentTopBorderField);
        currentTopBorderField = currentTopBorderField + 1;
    }
    //calculating bottom border fields
    var currentBottomBorderField = fields - width;
    while(bottomBorderFields.length < width - 2){
        bottomBorderFields.push(currentBottomBorderField);
        currentBottomBorderField = currentBottomBorderField + 1;
    }

    // console.log("Left border: " + leftBorderFields);
    // console.log("Right border: " + rightBorderFields);

    // console.log("Before" + fieldArray);
    
    for(var i = 0; i < fields; i++){
        if(fieldArray[i] === "*"){            
                    //top left corner
                    if(i === topLeftCorner){
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                        if(fieldArray[i+(width+1)] != "*") fieldArray[i+(width+1)]++;
                    }
                    //top right corner
                    else if(i === topRightCorner){
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                        if(fieldArray[i+(width-1)] != "*") fieldArray[i+(width-1)]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                    }
                    //bottom left corner
                    else if(i === bottomLeftCorner){
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-(width-1)] != "*") fieldArray[i-(width-1)]++;
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                    }
                    //bottom right corner
                    else if(i === bottomRightCorner){
                        if(fieldArray[i-(width+1)] != "*") fieldArray[i-(width+1)]++;
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                    }
                    //top border 
                    else if($.inArray(i, topBorderFields) != -1){
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                        if(fieldArray[i+(width-1)] != "*") fieldArray[i+(width-1)]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                        if(fieldArray[i+(width+1)] != "*") fieldArray[i+(width+1)]++;
                    }
                    //bottom border
                    else if($.inArray(i, bottomBorderFields) != -1){
                        if(fieldArray[i-(width+1)] != "*") fieldArray[i-(width+1)]++;
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-(width-1)] != "*") fieldArray[i-(width-1)]++;
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                    }
                    //left border
                    else if($.inArray(i, leftBorderFields) != -1){
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-(width-1)] != "*") fieldArray[i-(width-1)]++;
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                        if(fieldArray[i+(width+1)] != "*") fieldArray[i+(width+1)]++;
                    }
                    //right border
                    else if($.inArray(i, rightBorderFields) != -1){
                        if(fieldArray[i-(width+1)] != "*") fieldArray[i-(width+1)]++;
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                        if(fieldArray[i+(width-1)] != "*") fieldArray[i+(width-1)]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                    }
                    //other fields
                    else{
                        if(fieldArray[i-(width+1)] != "*") fieldArray[i-(width+1)]++;
                        if(fieldArray[i-width] != "*") fieldArray[i-width]++;
                        if(fieldArray[i-(width-1)] != "*") fieldArray[i-(width-1)]++;
                        if(fieldArray[i-1] != "*") fieldArray[i-1]++;
                        if(fieldArray[i+1] != "*") fieldArray[i+1]++;
                        if(fieldArray[i+(width-1)] != "*") fieldArray[i+(width-1)]++;
                        if(fieldArray[i+width] != "*") fieldArray[i+width]++;
                        if(fieldArray[i+(width+1)] != "*") fieldArray[i+(width+1)]++;
                    }
                    //console.log("Iteration no." +  i + ": " + fieldArray);
        }
    }

    console.log("After all: " + fieldArray);

    $('.field').each(function(i) {
        $.data(this, "number", i );
    });
}

function clearEverything(){
    $(".board").empty();
    bombArray = [];
    counter = 0;
    leftBorderFields = [];
    rightBorderFields = [];
    topBorderFields = [];
    bottomBorderFields = [];
    fieldArray = [];
    $("#result").text("");
}

$("#start").click(function(){
    width = parseInt($("#boardWidth").val());
    height = parseInt($("#boardHeight").val());
    loadGame(width, height);
    loadEventHandlers();

});

$("#restart").click(function(){
    clearEverything();
    width = parseInt($("#boardWidth").val());
    height = parseInt($("#boardHeight").val());
    loadGame(width, height);
    loadEventHandlers();
});

function loadEventHandlers(){
    
    $('.field').mousedown(function(event) {
        if(!gameOver){
            switch(event.which){
                case 1:
                var value = $.data(this, "number");
                if(fieldArray[value] == "*"){
                    $('.field').each(function(i) {
                        if(fieldArray[i] == "*"){
                            $(this).css("background-image", bombPath);
                        }
                    });
                    //console.log("Źle!");
                    $("#result").text("BUM!");
                    $(".field").css("border-color", "red");
                    gameOver = true;
                }
                else{
                    $(this).css("background-image", uncoveredPath);
                    $(this).text(fieldArray[value]);
                    console.log(fieldsLeft);
                    if(fieldsLeft === 1){
                        //console.log("Zwycięstwo");
                        $("#result").text("Zwycięstwo!");
                        gameOver = true;
                        $(".field").css("border-color", "green");
                    }else{
                        fieldsLeft--;
                    }
                }
                break;
                case 3:
                $(this).css("background-image", flaggedPath);
                break;
                default:
                alert("Flagi stawia się rolką!");
            }
        }
    });
}
