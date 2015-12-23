module MenuInterface{

	var elements = [];
	var controlsEnabled = true;


	export function enableControls(value){
		controlsEnabled = value;
	}

	export function setActive(){
		var screenSize = Global.getScreenSize();
		var buttonTouch = new Input.Touch(screenSize.width - 300 - 40, screenSize.height - (300 / 1.6) - 40, 300, 300 / 1.6);
		buttonTouch.on("press", () => {
			if(controlsEnabled){
				console.log("START THE FIRST MAP..");
			}
		});
	}

	export function create() {

		var screenSize = Global.getScreenSize();

		elements['background'] = new Render.Drawable(new Render.Texture("assets/background.jpg"), 0,0, screenSize.width, screenSize.height);
		elements['background'].setFixed(true);

		elements['bear'] = new Render.Drawable(new Render.Texture("assets/nounours_sit.png"), 0,0, 350,350);
		elements['bear'].setFixed(true);
		elements['bear'].setPosition(0,100);


		elements['playButton'] = new Render.Drawable(new Render.Texture("assets/playButton.png"), screenSize.width - 300 - 40,screenSize.height - (300/1.6) - 40, 300, 300/1.6);
		elements['playButton'].setFixed(true);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}


	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}

}