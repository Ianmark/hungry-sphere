var x, y, ptx, pty, coinx, coiny, score, life, dir, t, ptSpeed, storedHighScore, highScore;

//initial variables with their values
initVariables = () => {
	return x = 10,
	y = 150,
	ptx = 550,
	pty = Math.random() * (300-20) + 10,
	coinx = Math.random() * (295-5) + 5,
	coiny = Math.random() * (295-5) + 5,
	score = 0,
	life = 3,
	dir = 0,
	ptSpeed = 150;
}

//refreshes game when user loses
refresh = () => {
//customizable function from alertFunc.js
//alertFunc("main alert text","button colour","alert box colour","alert main text colour", "function to be executed on button click")
	alertFunc("Game Over","#ffffff","#000000","#ffffff",initVariables)
}

mainFunction = () => {
	
	let canvas = document.getElementById("canvas");
	let context = canvas.getContext("2d");
	let right = document.getElementById("right");
	let left = document.getElementById("left");
	let up = document.getElementById("up");
	let down = document.getElementById("down");
	var psize = 10;
	storedHighScore = localStorage.getItem("storedHighScore");
	highScore = JSON.parse(storedHighScore);
	console.log(highScore)
	if (highScore == null){
		highScore = 0;
	}
	//localStorage.clear(storedHighScore)
	initVariables();
	
	function draw(){
	context.clearRect(0,0,300,300);
	let speed = 150;
	ptSpeed = 150;
	var timePassed = (Date.now() - t)/1000;
	t = Date.now();
	
	
	//draw coin
	context.beginPath();
	context.arc(coinx, coiny, 5, 0, 2 * Math.PI);
	context.fillStyle = "#0000ff";
	context.fill();
	
	//Player Coin collision dectector
	if (coinx-5 <= x+10 && x-10 <= coinx+5 && coiny-5 <= y+10 && y-10 <= coiny+5){
		score += 1;
		coinx = Math.random() * (295-5) + 5;
		coiny = Math.random() * (295-5) + 5;
		if ( score >= highScore){
			highScore = score;
			localStorage.setItem("storedHighScore", JSON.stringify(highScore))
		};
		// Add 1 life when player gets 10 points
		if (score % 10 == 0){
			life += 1;
		}
	}
	
	//draw player
	context.beginPath();
	context.arc(x, y, psize, 0,2 * Math.PI);
	context.fillStyle = "#000000";
	context.fill();
	//stops player movement when life finishes
	if (life <= 0){
		speed = 0;
	}
	
	//button control
	right.ontouchstart = e =>{
		dir = 1;
	}
	right.ontouchend = e =>{
		dir = 0;
	}
	
	left.ontouchstart = e =>{
		dir = 2;
	}
	left.ontouchend = e => {
		dir = 0;
	}
	
	up.ontouchstart = e =>{
		dir = 3;
	}
	up.ontouchend = e =>{
		dir = 0;
	}
	
	down.ontouchstart = e => {
		dir = 4;
	}
	down.ontouchend = e => {
		dir = 0;
	}
	
	if (dir == 1){
		if (x <= 300-12){
			if ( isNaN(timePassed)){
				x += speed;
			}
			else{
				x += speed * timePassed;
			}
		}
	}
	
	else if (dir == 2){
		if (x >= 12){
			if ( isNaN(timePassed)){
				x -= speed;
			}
			else{
				x -= speed * timePassed;
			}
		}
	}
	
	if (dir == 3){
		if (y >= 12){
			if ( isNaN(timePassed)){
				y -= speed;
			}
			else{
				y -= speed * timePassed;
			}
		}
	}
	
	else if (dir == 4){
		if (y <= 300-12){
			if ( isNaN(timePassed)){
				y += speed;
			}
			else{
				y += speed * timePassed;
			}
		}
	}
	
	//draw projectile
	context.beginPath();
	context.rect(ptx, pty, 10, 5);
	context.fillStyle = "#ff0000";
	context.fill();
	//stop projectile when life finishes
	if (life <= 0){
		ptSpeed = 0;
	}
	//moves projectile
	if ( isNaN(timePassed)){
		ptx -= ptSpeed;
	}
	else{
		ptx -= ptSpeed * timePassed;
	}
	//Player Projectile collision detector
	if (ptx <= x+10 && x-10 <= ptx+10 && pty <= y+10 && y-10 <= pty+5){
		life -= 1;
		ptx = 310;
		pty = Math.random() * (300-20) + 10;
		//vibrate phone when collision occurs
		navigator.vibrate(100);
		//restart game when player loses
		if (life <= 0){
			setTimeout(refresh(),1500)
		}
	}
	else if ( ptx <= 0){
		ptx = 310;
		pty = Math.random() * (300-20) + 10;
	}
	
	//display score and life
	document.getElementById("display2").innerHTML = "Current Score: " + score + "<br/>" + "Life: " + life;
	
	//display high score only
	document.getElementById("display1").innerHTML = "High Score: " + highScore ;
	
	window.requestAnimationFrame(draw)
	}
	
	draw()
	
}

window.onload = setTimeout(mainFunction(), 1500);