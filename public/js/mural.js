var $ = require('jquery');

var PIXI = require('pixi');

// create an new instance of a pixi stage
var stage = new PIXI.Stage(0x000000);

// create a renderer instance
var renderer = PIXI.autoDetectRenderer(1660, 1024);

// create display object container
var displayContainers = [];

var getMural = function() {
	$.get( "/mural", function( data ) {
			renderStage(data.mural, stage, renderer);
	});
}

var renderStage = function(mural) {
	var stanza = mural.stanza; 
  var xPosition = 200;
  var yPosition = 150;
  var leftAlign = xPosition;
	for (var i = 0; i < stanza.length; i++) {
		// create a new Sprite using the texture
		if (stanza[i] === "\n") {
			yPosition += 30 + (30 * Math.random());
			xPosition = leftAlign;
			continue;
		}

		if (stanza[i] === "\t") {
			xPosition += 40;
			continue;
		}

		var style = {};
		style.fill = 'white';
		var text = new PIXI.Text(stanza[i], style);		
  	text.position.x = xPosition;
		text.position.y = yPosition;
		text.anchor.x = 0;
		text.anchor.y = 0;	
		var displayContainer = new PIXI.DisplayObjectContainer();
		displayContainer.addChild(text);

		displayContainers.push({"dispObj" : displayContainer});		
		xPosition += text._width + (100 * Math.random());		
	}

	for (var ithWord in displayContainers) {
   var wordObject = displayContainers[ithWord];
   stage.addChild(wordObject.dispObj);
		
	}	
}

var blurMore = function() {
	var rando = Math.round(81 * Math.random());
	var displayContainer = displayContainers[rando].dispObj;
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
	var rando = Math.round(81 * Math.random());
	var displayContainer = displayContainers[rando].dispObj;
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

  getMural(); 

  function animate() {
  	requestAnimationFrame( animate );

  	renderer.render(stage);
  } 

});