/*	--------------------------------------------------- *\
		Render
\*	--------------------------------------------------- */
module Render{

	var renderCamera = null;
    var image_prefix = "./";
    var elementsToDownload = [];
    var fToCallWhenDownloadReady = [];
    var debugMode = {
    	active : false,
    	type : "aabb"
    };
    var actualWorld = null;

	/*	--------------------------------------------------- *\
			[function] setCamera()
	
			* Add une camera au Render *
	
			Return: nil
	\*	--------------------------------------------------- */
	export function setCamera(cam:any){
		renderCamera = cam;
	}

	/*	--------------------------------------------------- *\
			[function] getCamera()
	
			* Retourne l'element camera *
	
			Return: camera
	\*	--------------------------------------------------- */
	export function getCamera(){
		return renderCamera;
	}

    /*    --------------------------------------------------- *\
            [function] add()
    
            * Add un element a download *
    
            Return: nil
    \*    --------------------------------------------------- */
    export function add(elementToDownload:any){
        var elementToDL = {
            element: elementToDownload,
            downloaded: false
        };

        elementsToDownload.push(elementToDL);
    }

    /*	--------------------------------------------------- *\
    		[function] setDebugMode(boolean)
    
    		* Set le mode debug *
    
    		Return: nil
    \*	--------------------------------------------------- */
    export function setDebugMode(value : boolean, type = "aabb"){
		debugMode.active = value;
		debugMode.type = type;
    }

    /*	--------------------------------------------------- *\
    		[function] getWorld()
    
    		* Retourne le world *
    
    		Return: world
    \*	--------------------------------------------------- */
    export function getWorld(){
		return actualWorld;
    }

    /*	--------------------------------------------------- *\
    		[function] setWorld(world)
    
    		* Set le world *
    
    		Return: nil
    \*	--------------------------------------------------- */
    export function setWorld(world : any){
		actualWorld = world;
    }

    /*    --------------------------------------------------- *\
            [function] download()
    
            * Preload toute les images avant de commencer le jeu *
    
            Return: nil
    \*    --------------------------------------------------- */
    export function download(){
        var filesDownloaded = 0;
        if(elementsToDownload.length == 0){
			for (var i = fToCallWhenDownloadReady.length - 1; i >= 0; i--) {
                fToCallWhenDownloadReady[i]();
            }
        }
        for (var i = elementsToDownload.length - 1; i >= 0; i--) {
            var obj = new Image();
            obj.src = image_prefix + elementsToDownload[i].element;

            var elementName = elementsToDownload[i].element;
            obj.addEventListener("load", function() {
                for (var i = elementsToDownload.length - 1; i >= 0; i--) {
                    if(elementsToDownload[i].element == elementName){
                        elementsToDownload[i].downloaded = true;

                        // Vérifie si tous les download ne sont pas deja fini
                        for (var k = elementsToDownload.length - 1; k >= 0; k--) {
                            if(elementsToDownload[k].downloaded == true){
                                filesDownloaded += 1;
                            }
                        }

                    }
                }
                
		        // Tous les downlaod ont été effectués.
		        if(filesDownloaded == elementsToDownload.length){
		            for (var i = fToCallWhenDownloadReady.length - 1; i >= 0; i--) {
		                fToCallWhenDownloadReady[i]();
		            }
		        }
            });
        }

    }


    /*    --------------------------------------------------- *\
            [function] ready()
    
            * Fires quand toute les ressources sont téléchargés *
    
            Return: nil
    \*    --------------------------------------------------- */
    export function ready(functionToCall:any){
        fToCallWhenDownloadReady.push(functionToCall);
    }

	/*	--------------------------------------------------- *\
			Render loop
	\*	--------------------------------------------------- */
    var elementToDraw: any;

    /*	--------------------------------------------------- *\
    		[function] updateRender()
    
    		* Fonction appellé pour dispatcher le rendu *
    
    		Return: nil
    \*	--------------------------------------------------- */
    export function updateRender(layer){
        
		var canvas = layer.getCanvas();
		var context = layer.getContext();
		var elements = layer.getElements();

        if(context && canvas){
    		context.clearRect(0,0, canvas.width, canvas.height);
			context.save();

			var camera = getCamera();

			// Smooth
			if(!layer.isSmooth()){
				context.mozImageSmoothingEnabled = false;
				context.imageSmoothingEnabled = false;
			}

    		// Sort elements by depth
    		elements.sort(function(a, b){
				a.depth = a.depth || 0;
				b.depth = b.depth || 0;

				if (a.depth < b.depth) {
					return -1;
				}
				else if (a.depth > b.depth) {
					return 1;
				}
				else{
					return 0;
    			}
    		});

    		// Camera management
    		if(layer.affectedByCamera){
    			if(camera){
    				// Translate to the scale position
					context.translate(camera.getDepthPosition().x, camera.getDepthPosition().y);
    				// Scale the canvas
					context.scale(camera.getDepth(), camera.getDepth());

					// Rotate
					context.translate(window.innerWidth/2, window.innerHeight/2);
					context.rotate((camera.getRotation() * Math.PI) / 180);
					context.translate(-window.innerWidth/2, -window.innerHeight/2);

					// Rotate the canvas
					if(camera.getRotation() != 0){
						var rotationPoint = camera.getRotationPoint();
						context.translate(rotationPoint.x, rotationPoint.y);
						context.rotate(camera.getRotation());
						context.translate(-rotationPoint.x, -rotationPoint.y);
					}

    			}
    		}


    		// Draw every elements			
    		if(elements){
    			for(var i = 0; i < elements.length; i++){
    				if(elements[i]){
    					
	    				// Check if it's a normal drawable or a grid
	                    elementToDraw = elements[i];

	                    if(elementToDraw.getType() != "drawable"){
	                    	switch (elementToDraw.getType()) {
	                    		case "grid":
	                    			var grid = elementToDraw;
		                            var tiles = grid.getTiles();
									for (var k = tiles.length - 1; k >= 0; k--) {

										//var pos = elementToDraw.getPosition();
										var posInGrid = tiles[k].getPositionIntoGrid();
										var pos = { x: posInGrid.x * grid.getTileSize(), y: posInGrid.y * grid.getTileSize() };

										elementToDraw = tiles[k].getAssignedDrawable();
										var size = elementToDraw.getSize();
										

										// Gestion de la camera
										var renderPos = { x: pos.x, y: pos.y };
										if (camera) {
											var cPos = camera.getPosition();
											var cameraDepth = camera.getDepth();

											// isFixed
											if (!elementToDraw.isFixed()) {
												renderPos.x = pos.x + ((canvas.width / 2) - cPos.x) / cameraDepth;
												renderPos.y = pos.y + ((canvas.height / 2) - cPos.y) / cameraDepth;
											}
										}

										drawElement(context, elementToDraw, renderPos, size);
									}

	                    			break;
								case "draw":
									var position = elementToDraw.getPosition();
									if(!position){
										position = elementToDraw.absolutePosition;
									}
									var size = elementToDraw.getSize();
									var temp = { x: position.x, y: position.y };

									// camera
									if(camera){
										var cameraPosition = camera.getPosition();
										// is drawable fixed
										if(!elementToDraw.isFixed()){
											temp.x = position.x + ((canvas.width / 2) - cameraPosition.x);
											temp.y = position.y + ((canvas.height / 2) - cameraPosition.y);
										}
									}

									drawElement(context, elementToDraw, temp, size);
									break;
	                    		
	                    		default:
	                    			// Draw each drawable of an element
		                            var assignedDrawables = elementToDraw.getAssignedDrawables();
		                            for (var k = 0; k < assignedDrawables.length; ++k) {
		                            	if(assignedDrawables[k]){
											var position = assignedDrawables[k].getPosition();
											var size = assignedDrawables[k].getSize();

											if(Render.getCamera()){
												var cameraPosition = Render.getCamera().getPosition();
												var cameraDepth = Render.getCamera().getDepth();


												// is drawable fixed
												if(!assignedDrawables[k].isFixed()){
													position.x = position.x + ((canvas.width / 2) - cameraPosition.x) / cameraDepth;
													position.y = position.y + ((canvas.height / 2) - cameraPosition.y) / cameraDepth;
												}
											}
											drawElement(context, assignedDrawables[k], position, size);
		                            	}
		                            }
	                    			break;
	                    	}

	                    }
	                    else{
	                    	// Draw a normal drawable
							var elementPosition = elementToDraw.getPosition();
	    					var size = elementToDraw.getSize();

	    					// Gestion de la camera
	    					if(renderCamera){
	    						var cPos = renderCamera.getPosition();
								var cameraDepth = renderCamera.getDepth();

	    						// isFixed
	    						if(!elementToDraw.isFixed()){
	    							elementPosition.x = elementPosition.x + ((canvas.width /2 ) - cPos.x) / cameraDepth;
	    							elementPosition.y = elementPosition.y + ((canvas.height /2 ) - cPos.y) / cameraDepth;
	    						}
	    					}


	                    	drawElement(context, elementToDraw, elementPosition, size);
	                    			
	                    }
    				}
    			}
    		}


    		// Draw debug for every elements
    		if(debugMode.active){
    			for (var k = _elements.length - 1; k >= 0; k--) {
					context.lineWidth = 2;
					context.beginPath();
					context.strokeStyle = "#00FF00";
					var ePos = _elements[k].getPosition();
					if(debugMode.type == "vertices"){
						if(_elements[k].shapes[0] && _elements[k].shapes[0].vertices){
							var vertices = _elements[k].shapes[0].vertices;
							var firstVert = true;
							for (var i = 0; i < vertices.length; ++i) {
								if(firstVert){
									context.moveTo(ePos.x + vertices[i][0] + _elements[k].shapes[0].width/2, ePos.y + vertices[i][1] + _elements[k].shapes[0].height/2);
									firstVert = false;
								}
								else{
									context.lineTo(ePos.x + vertices[i][0] + _elements[k].shapes[0].width/2, ePos.y + vertices[i][1] + _elements[k].shapes[0].height/2);
								}
							}
						}
					}
					else{
						if(_elements[k].aabb && _elements[k].aabb.lowerBound[0] != 0){
							var aabb = _elements[k].aabb;
							var lower = Global.getPositionFromWorld(aabb.lowerBound[0], aabb.lowerBound[1], renderCamera);
							var upper = Global.getPositionFromWorld(aabb.upperBound[0], aabb.upperBound[1], renderCamera);

							context.moveTo(lower.x, lower.y);
							context.lineTo(upper.x, lower.y);
							context.lineTo(upper.x, upper.y);
							context.lineTo(lower.x, upper.y);
						}
					}
					context.closePath();
					context.stroke();
    			}
    		}

			context.restore();
        }
	}
    
	function drawElement(context, elementToDraw, position, size){

		position.x = Math.floor(position.x);
		position.y = Math.floor(position.y);
		
		size.width = size.width || 1;
		size.height = size.height || 1;

		// Check if the element is out of the screen
		var camera = Render.getCamera();
		var cameraDepth = camera.getDepth();
		var depthPosition = camera.getDepthPosition();
		var tempPosition = {x : depthPosition.x, y : depthPosition.y};

		var cam = getCamera();
		var of = { x: 0, y: 0 };
		if(cam){
			var depthPosition = cam.getDepthPosition();
			of.x = depthPosition.x;
			of.y = depthPosition.y;
		}

		if (position.x > -size.width - of.x  && position.x <= sX + size.width + of.x && position.y > -size.height - of.y && position.y <= sY + size.height + of.y) {
			if(elementToDraw.isVisible(null)){
				context.save();
				// opacity
				context.globalAlpha = elementToDraw.getOpacity();

				// smooth
				if(!elementToDraw.isSmooth()){
					context.mozImageSmoothingEnabled = false;
					context.imageSmoothingEnabled = false;
				}

				// flipped
				if (elementToDraw.isFlipped(null)) {
					context.scale(-1, 1);

	                position.x = -position.x - size.width;
				}
                var rotationPoint = elementToDraw.getRotationPoint();
                if (elementToDraw.fixedToCenter) {
                    rotationPoint.x = position.x + (size.width / 2);
                    rotationPoint.y = position.y + (size.height / 2);
                }

                // debug mode for drawable
				if(debugMode.active){
					context.lineWidth = 2;
					context.strokeStyle = "#FF0000";
					context.beginPath();
					context.moveTo(position.x, position.y);
					context.lineTo(position.x, position.y + size.height);
					context.lineTo(position.x + size.width, position.y + size.height);
					context.lineTo(position.x + size.width, position.y);
					context.closePath();
					context.stroke();
				}
               
				if (elementToDraw.getRotation() != 0) {
					context.translate(rotationPoint.x, rotationPoint.y);
					context.rotate(elementToDraw.getRotation() * (Math.PI / 180));
					context.translate(-rotationPoint.x, -rotationPoint.y);
				}

				if(elementToDraw.getType() == "draw"){
					context.fillStyle = elementToDraw.getColor();

					// stroke
					if (elementToDraw.getStrokeSize() != 0) {
						context.lineWidth = elementToDraw.getStrokeSize();
						context.strokeStyle = elementToDraw.getStrokeColor();
					}

					// shadow
					if(elementToDraw.isShadowEnabled()){
						context.shadowColor = elementToDraw.getShadowColor();
						context.shadowBlur = elementToDraw.getShadowBlur();
						context.shadowOffsetX = elementToDraw.getShadowPosition().x;
						context.shadowOffsetY = elementToDraw.getShadowPosition().y;
					}

					switch (elementToDraw.getShape()) {
						case "rectangle":
							context.beginPath();
							context.rect(Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)), Math.ceil(size.width), Math.ceil(size.height));
							
							context.closePath();
							break;
						case "circle":
							context.beginPath();
							context.arc(Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)), elementToDraw.getRadius(), 0, 2 * Math.PI, false);
							context.closePath();
							break;
						case "polygon":
							context.beginPath();
							for (var i = 0; i < elementToDraw.getVertices().length; ++i) {
								var vertice = elementToDraw.getVertices()[i];								
								if(i == 0){
									context.moveTo(vertice.x + position.x, vertice.y + position.y);
								}
								else{
									context.lineTo(vertice.x + position.x, vertice.y + position.y);
								}
							}
							context.closePath();
							break;
						case "line":
							context.beginPath();
							context.moveTo(Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)));
							context.lineTo(elementToDraw.getTarget().x, elementToDraw.getTarget().y);
							context.closePath();
							break;
						case "text":
							context.font = elementToDraw.getFontStyle() + " " + elementToDraw.getFontSize() + "px " + elementToDraw.getFont();
							context.textBaseline = elementToDraw.getBaseline();
							if(elementToDraw.getStrokeSize() != 0){
								context.strokeText(elementToDraw.getValue(), Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)));
							}

							var myText = new String(elementToDraw.getValue());

							var length = elementToDraw.getValue().length;
							var lineHeight = elementToDraw.getFontSize();
							var lineWidth = length * lineHeight;

							var size = elementToDraw.getSize();
							var numberLines = Math.ceil(lineWidth / size.width);
							var numberOfCharacterInOneLine = Math.floor(size.width / lineHeight)*1.8;
							var lines = [];
							if(lineWidth > size.width){
								numberLines = numberLines -1;
							}

							for (var i = 0; i < numberLines; i++) {
								lines[i] = [];
							};

							var currentLetter = 0;
							var currentLine = 0;
							for (var letter = 0; letter < myText.length; letter++) {								
								if(currentLetter < numberOfCharacterInOneLine){
									lines[currentLine].push(myText[letter]);
									currentLetter++;
								}
								else{
									currentLetter = 0;									
									currentLine++;
									if(!lines[currentLine]){
										lines[currentLine] = [];
									}
									lines[currentLine].push(myText[letter]);
								}
							};

							var align = elementToDraw.getAlign();
							var verticalAlign = elementToDraw.getVerticalAlign();
							context.textAlign = align;

							var linesHeight = lineHeight * lines.length;
							var offsetPosition = {x : 0, y : 0};

							for (var i = 0; i < lines.length; i++) {
								var myString = "";
								for (var k = 0; k < lines[i].length; k++) {
									myString = myString + lines[i][k];
								};

								if(verticalAlign == "middle"){
									offsetPosition.y = offsetPosition.y + lineHeight;									
								}														

								if(align == "center"){
									offsetPosition.x = (size.width /2);
								}

								context.fillText(myString, Math.ceil(rotationPoint.x - (size.width / 2)) + offsetPosition.x, (Math.ceil(rotationPoint.y - (size.height / 2)) + (i * lineHeight) - (lineHeight/4)) + offsetPosition.y);
							};

							break;
						case "point":
							context.beginPath();
							context.moveTo(Math.ceil(rotationPoint.x - (size.width / 2)) - 5, Math.ceil(rotationPoint.y - (size.height / 2)));
							context.lineTo(Math.ceil(rotationPoint.x - (size.width / 2)) + 5, Math.ceil(rotationPoint.y - (size.height / 2)));
							context.moveTo(Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)) - 5);
							context.lineTo(Math.ceil(rotationPoint.x - (size.width / 2)), Math.ceil(rotationPoint.y - (size.height / 2)) + 5);
							context.closePath();
							break;
					}
					context.fill();
					if (elementToDraw.getStrokeSize() != 0) {
						context.stroke();
					}
				}
				else{
					var futurPosition = null;
					if (elementToDraw.getRotation() != 0) {
						futurPosition = {x : rotationPoint.x - (size.width / 2), y : rotationPoint.y - (size.height / 2)};
					}
					else{
						futurPosition = position;
					}

					if (elementToDraw.getData() != false) {
						if (elementToDraw.isSprite()) {
							var currentFrame = elementToDraw.getCurrentFrame();
							var frameSize = elementToDraw.getFrameSize();
	                    	var frameLine = elementToDraw.getFrameLine();
							context.drawImage(elementToDraw.getData(), Math.ceil(frameSize.width * currentFrame), Math.ceil(frameSize.height * frameLine), Math.ceil(frameSize.width), Math.ceil(frameSize.height), Math.ceil(futurPosition.x), Math.ceil(futurPosition.y), Math.ceil(size.width), Math.ceil(size.height));
						}
						else {
							context.drawImage(elementToDraw.getData(), Math.ceil(futurPosition.x), Math.ceil(futurPosition.y), Math.ceil(size.width), Math.ceil(size.height));
						}
					}

				}
				context.restore();
			}
		}
		else {
			return;
		}
	}


}