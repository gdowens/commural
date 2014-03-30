var $ = require('jquery');

var PIXI = require('pixi');

$(function() {

	// create an new instance of a pixi stage
	var stage = new PIXI.Stage(0x66FF99);

	// create a renderer instance
	var renderer = PIXI.autoDetectRenderer(400, 300);

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimationFrame(animate);

	// create a texture from an image path
	var texture = PIXI.Texture.fromImage("images/nyan-cat.png");

	// create a new Sprite using the texture
	var bunny = new PIXI.Sprite(texture);

	// center the sprites anchor point
	bunny.anchor.x = 0.5;
	bunny.anchor.y = 0.5;

	// move the sprite t the center of the screen
	bunny.position.x = 200;
	bunny.position.y = 150;

	stage.addChild(bunny);

	function animate() {

	    requestAnimationFrame( animate );

	    // just for fun, let's rotate mr rabbit a little
	    bunny.rotation += 0.1;

	    // render the stage
	    renderer.render(stage);
	}

});