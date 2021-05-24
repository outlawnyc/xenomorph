"use strict";

var Scene = {
    canvas : undefined,
    canvasContext : undefined,
	sprite: undefined
};


Scene.start = function () {
	// Get the canvas and it's context.
    Scene.canvas = document.getElementById("myCanvas");
    Scene.canvasContext = Scene.canvas.getContext("2d");
	
	// Setup the xenomorph to be displayed.
    Scene.sprite = xenomorph;
	
	// Attach the image to be used for the sprite.
	Scene.sprite.img = new Image();
    Scene.sprite.img.src = Scene.sprite.src;
	
	// Wait till the xenomorph image is loaded before starting the animation.
	Scene.sprite.img.onload = function() {		
		Scene.sprite.offset=-Scene.sprite.frames[Scene.sprite.frame].frame.w;
    	Scene.mainLoop();
	}
};

// Once the basic HTML document is loaded and its parsing has taken place, start the scene.
document.addEventListener( 'DOMContentLoaded', Scene.start);

Scene.clearCanvas = function () {
    Scene.canvasContext.fillStyle = "white";
    Scene.canvasContext.fillRect(0, 0, Scene.canvas.width, Scene.canvas.height);
};

Scene.mainLoop = function() {

    Scene.clearCanvas();
    Scene.update();
    Scene.background();
    Scene.draw();
    // Animate at 24 frames a second.
    window.setTimeout(Scene.mainLoop, 1000 / 10);
	
	if(Scene.sprite.offset <= 24)
	Scene.speak();


	if(Scene.sprite.offset >= 800)
	Scene.speak2();


	
};

Scene.update = function () {
	// Set the canvas width to be that of the display Window. Which helps if you resize the window.
  	Scene.canvas.width = window.innerWidth;
	
	// Set the location of the next frame. 
  	Scene.sprite.offset+=24;
	if(Scene.sprite.offset>Scene.canvas.width)
 		Scene.sprite.offset=-Scene.sprite.frames[Scene.sprite.frame].frame.w;
};

Scene.draw = function () {
	Scene.canvasContext.drawImage(Scene.sprite.img,Scene.sprite.frames[Scene.sprite.frame].frame.x,Scene.sprite.frames[Scene.sprite.frame].frame.y,Scene.sprite.frames[Scene.sprite.frame].frame.w,Scene.sprite.frames[Scene.sprite.frame].frame.h,Scene.sprite.offset,0,Scene.sprite.frames[Scene.sprite.frame].frame.w,Scene.sprite.frames[Scene.sprite.frame].frame.h);
	
	// Advance to the next frame.
	Scene.sprite.frame++;

	// At the end of the sprite sheet, start at the first frame.
	if(Scene.sprite.frame==Scene.sprite.frames.length)
		Scene.sprite.frame=0;
};

Scene.speak = function() {
 var speech = document.getElementById("ohshit");


  Scene.canvasContext.drawImage(speech, 300, 10, 100, 75);
  

		

}

Scene.speak2 = function() {
 var speech2 = document.getElementById("earthsucks");


  Scene.canvasContext.drawImage(speech2, 850, 60, 100, 75);		

}


	var background = new Image();
background.src = "background.jpg";

// Make sure the image is loaded first otherwise nothing will draw.
Scene.background = function(){
    Scene.canvasContext.drawImage(background,0,0, Scene.canvas.width, Scene.canvas.height);   
}

