const gameBoard=document.getElementById("gameBoard");
const context=gameBoard.getContext('2d');
const scoretext=document.getElementById("scoreval");
let score=0
const WIDTH=gameBoard.width;
const HEIGHT=gameBoard.height;
const unit=25;
let foodX;
let foodY;
let xVel=25;
let yVel=0;
let snake=[{x:unit*3,y:0},
           {x:unit*2,y:0},
           {x:unit,y:0},
           {x:0,y:0}
 ];
let active=true;
let started=false;
window.addEventListener("keydown",keypress);
startGame();
function keypress(event){
    if(!started){
        started=true;
        nextTick();

    }
    active=true;
    const left=37;
    const up=38;
    const right=39;
    const down=40;
    switch(true){
        case(event.keyCode==left && xVel!=unit):xVel=-unit;
                                  yVel=0;
                                  break;
        case(event.keyCode==up && yVel!=unit):xVel=0;
                                  yVel=-unit;
                                  break;
        case(event.keyCode==right && xVel!=-unit):xVel=unit;
                                  yVel=0;
                                  break;
        case(event.keyCode==down && yVel!=-unit):xVel=0;
                                  yVel=unit;
                                  break;
    }
}
function startGame(){
    context.fillStyle = 'blue';
    context.fillRect(0,0,WIDTH,HEIGHT);
    createFood();
    displayFood();
    drawSnake();
    
}
function clearBoard(){
    context.fillStyle = 'blue';
    context.fillRect(0,0,WIDTH,HEIGHT);
}
function createFood(){
    foodX=Math.floor(Math.random()*WIDTH/unit)*unit;
    foodY=Math.floor(Math.random()*HEIGHT/unit)*unit;

}
function displayFood(){
    context.fillStyle="red";
    context.fillRect(foodX,foodY,unit,unit);
}
function drawSnake(){
    context.fillStyle="rgb(29, 220, 29)";
    context.strokestyle="black";
    snake.forEach((snakepart)=>{
        context.fillRect(snakepart.x,snakepart.y,unit,unit);
        context.strokeRect(snakepart.x,snakepart.y,unit,unit);

    })
}
function moveSnake(){
    const head={x:snake[0].x+xVel,y:snake[0].y+yVel};
    snake.unshift(head);
    if(snake[0].x==foodX && snake[0].y==foodY){
        createFood();
        score+=5;
        scoretext.innerText=score;
    }
    else{
    snake.pop();
    }
}
function nextTick(){
    if(active){
    setTimeout(()=>{
        clearBoard();
        displayFood();
        moveSnake();
        drawSnake();
        checkGameOver();
        nextTick();
    },200);
    }
    else{
        clearBoard();
        context.font="bold 50px serif"  ;
        context.fillStyle="rgb(29, 220, 29)";
        context.textAlign="center";
        context.fillText("GAME OVER!!",WIDTH/2,HEIGHT/2);

    }
}
function checkGameOver(){
    switch(true){
        case(snake[0].x<0):active=false;
                           break;
        case(snake[0].x>=WIDTH):active=false;
                           break
        case(snake[0].y<0):active=false;
                           break;  
        case(snake[0].y>=HEIGHT):active=false;
                           break;
    }
}