var userClickedPattern = [];
var gamePattern = [];
var buttonColors = ["red","blue","green","yellow"]; 
var level = 0;
var started = false;

$(".btn").on("click",function(){
  var  userChosenColor = $(this).attr('id');
  userClickedPattern.push(userChosenColor);
  playSound(userChosenColor);
  animatePress(userChosenColor);

  checkAnswer(userClickedPattern.length-1);
});

$(document).keydown(function(){
    if(!started){
        $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
    
});
//    makeSound(buttonId);
//});
//
//function makeSound(key){
//    switch(key){
//        case "green":
//            var audio = new Audio('./sounds/green.mp3');
//            audio.play();
//            break;
//        case "red":
//            var audio = new Audio('./sounds/red.mp3');
//            audio.play();
//            break;
//        case "yellow":
//            var audio = new Audio('./sounds/yellow.mp3');
//            audio.play();
//            break;
//        case "blue":
//            var audio = new Audio('./sounds/blue.mp3');
//            audio.play();
//            break;
//        default:
//            console.log(key);
//    }
//}
function startOver(){
    level = 0;
    gamePattern = [];
    started = false;
}
function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userClickedPattern[currentLevel]){
        console.log("success");

        if(userClickedPattern.length === gamePattern.length){

            setTimeout(function(){
                nextSequence();
            },1000);
        }
    } else{
        console.log("wrong");
        playSound("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over")
        },200);
        $("#level-title").text("Game Over, Press any Key to Restart");

        startOver();
    }
}
function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    setTimeout(function(){
        $("#"+currentColor).removeClass("pressed");
    }, 100);
}
function playSound(name){
    var audio = new Audio("./sounds/"+name+".mp3");
    audio.play();
}
function nextSequence(){
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level "+level);
    var randomNumber = Math.floor(Math.random()*4);
    var randomChosenColor = buttonColors[randomNumber];
    gamePattern.push(randomChosenColor);
    $("#"+randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);
    
    
}