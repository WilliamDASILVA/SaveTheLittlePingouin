module MenuInterface{

	var elements = [];
	var controlsEnabled = true;
	var okSound = new Sounds.Sound("assets/sounds/ok.ogg");


	export function enableControls(value) {
		controlsEnabled = value;
	}

	export function setActive(){
		var screenSize = Global.getScreenSize();
		var startButton = new Input.Touch(screenSize.width - 300 - 40,screenSize.height - (300/1.6) - 40, 300, 300/1.6);
		startButton.on("press", () => {
			if(controlsEnabled){
				destroy();
				LevelInterface.create();
				LevelInterface.enableControls(true);
				enableControls(false);
				okSound.play();
			}
		});
	}

	export function create() {

		var screenSize = Global.getScreenSize();

		elements['background'] = new Render.Drawable(new Render.Texture("assets/background.jpg"), 0,0, screenSize.width, screenSize.height);
		elements['background'].setFixed(true);
		elements['background'].setDepth(0);

		elements['logo_huge'] = new Render.Drawable(new Render.Texture("assets/logo_huge.png"), screenSize.width - 300 - 20,20, 300, 300 / 3.13);
		elements['logo_huge'].setFixed(true);
		elements['logo_huge'].setDepth(1);

		elements['bear'] = new Render.Drawable(new Render.Texture("assets/nounours_sit.png"), 0,0, 0.3*screenSize.width,0.3*screenSize.width);
		elements['bear'].setFixed(true);
		elements['bear'].setPosition(0,100);
		elements['bear'].setDepth(1);


		elements['playButton'] = new Render.Drawable(new Render.Texture("assets/playButton.png"), screenSize.width - 300 - 40,screenSize.height - (300/1.6) - 40, 300, 300/1.6);
		elements['playButton'].setFixed(true);
		elements['playButton'].setDepth(1);

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