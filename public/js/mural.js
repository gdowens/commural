var $ = require('jquery');

var PIXI = require('pixi');

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(1660, 1024);

// create display object container
var displayContainer = new PIXI.DisplayObjectContainer();

var getMural = function() {
	$.get( "/mural", function( data ) {
			renderStage(data.mural, stage, renderer);
	});
}

var renderStage = function(mural) {
	var stanza = mural.stanza; 

  var formattedText = "";
	for (var i = 0; i < stanza.length; i++) {
  	formattedText += " " + stanza[i] + " ";
	}

	// create a new Sprite using the texture
	var style = {};
	style.fill = 'white';
	var text = new PIXI.Text(formattedText, style);

	// center the sprites anchor point
	text.anchor.x = 0;
	text.anchor.y = 0;

	// move the sprite t the center of the screen
	text.position.x = 200;
	text.position.y = 150;

	displayContainer.addChild(text);

}

var blurMore = function() {
	if (displayContainer.filters == null) {
		displayContainer.filters = [new PIXI.PixelateFilter()];
		return;
	}
	var xValue = displayContainer.filters[0].size.x;
	var yValue = displayContainer.filters[0].size.y;
	displayContainer.filters[0].size.x = xValue + 1;
	displayContainer.filters[0].size.y = yValue + 1;
}

var blurLess = function() {
	if (displayContainer.filters == null) {
		return;
	}
	var value = displayContainer.filters[0].size.x;
	if (value == 10) {
		displayContainer.filters = null;
		return;
	}
		var xValue = displayContainer.filters[0].size.x;
	var yValue = displayContainer.filters[0].size.y;
	displayContainer.filters[0].size.x = xValue - 1;
	displayContainer.filters[0].size.y = yValue - 1;
}

$(document).keydown(function(e) {
	var code = e.keyCode ? e.keyCode : e.which;

	if (code == 65) {
		blurMore();
	} else if (code == 83) {
		blurLess();
	}
});

$(function() {

	// add the renderer view element to the DOM
	document.body.appendChild(renderer.view);

	requestAnimationFrame(animate);

	// create a texture from an image path
	//var texture = PIXI.Texture.fromImage("images/nyan-cat.png");	
  
  stage.addChild(displayContainer);

  getMural(); 

  function animate() {
  	requestAnimationFrame( animate );

  	renderer.render(stage);
  } 

});