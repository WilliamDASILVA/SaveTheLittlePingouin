module ScoreInterface{

	var elements = [];
	var haveControls = false;
	var currentPourcentage = 0;

	var currentScore = 0;
	var currentMax = 0;

	var haveNextButton = true;

	export function enableControls(value){
		haveControls = value;
	}

	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}

	export function canDoNextLevel(value){
		haveNextButton = value;
	}

	export function setActive() {
		var screenSize = Global.getScreenSize();
		var retryButton = new Input.Touch(screenSize.width / 2 - 150 - 75, (screenSize.height - 130) - 25, 150, 50);
		retryButton.on("press", () => {
			if(haveControls){
				console.log("RETRY");
				destroy();
				enableControls(false);
				MapLoading.destroyMap(() => {
					MapLoading.loadMap(MapLoading.getCurrentMap());
				});
			}
		});
		var nextButton = new Input.Touch(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 25, 150, 50);
		nextButton.on("press", () => {
			if (haveControls && haveNextButton){
				console.log("NEXT");
				destroy();
				enableControls(false);
				MapLoading.destroyMap(() => {
					MapLoading.loadMap(MapLoading.getNextMap());
				});
			}
		});
	}

	export function create(){
		var screenSize = Global.getScreenSize();

		var pourcentage = (currentScore * 100) / currentMax;

		elements['fade'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['fade'].setFixed(true);
		elements['fade'].setColor("#000");
		elements['fade'].setOpacity(0.5);

		elements['background'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150, screenSize.height /2 - (screenSize.height - 150) / 2, 300, screenSize.height - 150);
		elements['background'].setColor("#FFF");
		elements['background'].setFixed(true);

		var starActive = new Render.Texture("assets/star_active.png");
		var starDisabled = new Render.Texture("assets/star_disabled.png");

		var firstStar = starDisabled;
		if(pourcentage >= 50){
			firstStar = starActive;
		}
		elements['left_star'] = new Render.Drawable(firstStar, screenSize.width / 2 - 150 - 96 + 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['left_star'].setFixed(true);

		var secondStar = starDisabled;
		if (pourcentage >= 80){
			secondStar = starActive;
		}
		elements['middle_star'] = new Render.Drawable(secondStar, screenSize.width / 2 - 64, screenSize.height / 2 - (screenSize.height - 150) / 2 - 64, 128, 128);
		elements['middle_star'].setFixed(true);
		elements['middle_star'].setDepth(5);

		var thirdStar = starDisabled;
		if(pourcentage == 100){
			thirdStar = starActive;
		}
		elements['right_star'] = new Render.Drawable(thirdStar, screenSize.width / 2 + 150 - 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['right_star'].setFixed(true);



		elements['button_retry'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150 - 75, (screenSize.height - 130) - 25, 150, 50);
		elements['button_retry'].setColor("#DFDFDF");
		elements['button_retry'].setFixed(true);

		elements['button_retry_text'] = new Render.Draw.Text(screenSize.width / 2 - 150 - 75 - 75, (screenSize.height - 130) - 8, "Retry this level", 300, 10);
		elements['button_retry_text'].setFontSize(25);
		elements['button_retry_text'].setFont("pixelated");
		elements['button_retry_text'].setColor("#000000");
		elements['button_retry_text'].setAlign("center");
		elements['button_retry_text'].setFixed(true);

		if (haveNextButton){
			elements['button_nextlevel'] = new Render.Draw.Rectangle(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 25, 150, 50);
			elements['button_nextlevel'].setColor("#DFDFDF");
			elements['button_nextlevel'].setFixed(true);

			var nextText = "Next level";
			if (MapLoading.getNextMap() == "end"){
				nextText = "Main menu";
			}

			elements['button_nextlevel_text'] = new Render.Draw.Text(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 8, nextText, 150, 10);
			elements['button_nextlevel_text'].setFontSize(25);
			elements['button_nextlevel_text'].setFont("pixelated");
			elements['button_nextlevel_text'].setColor("#000000");
			elements['button_nextlevel_text'].setAlign("center");
			elements['button_nextlevel_text'].setFixed(true);
		}

		elements['score_background'] = new Render.Draw.Circle(screenSize.width / 2, screenSize.height / 2 - 48, 48);
		elements['score_background'].setFixed(true);
		elements['score_background'].setColor("#EFEFEF");
		elements['score_background'].setDepth(4);

		elements['score'] = new Render.Draw.Text(screenSize.width / 2 - 150, screenSize.height / 2 + 20, currentScore + " / " + currentMax, 300, 10);
		elements['score'].setFontSize(40);
		elements['score'].setFont("pixelated");
		elements['score'].setColor("#000000");
		elements['score'].setAlign("center");
		elements['score'].setFixed(true);

		elements['score_pingouin'] = new Render.Sprite(new Render.Texture("assets/pingouin_icon_hud.png"), 0,0,96,96, 64,64,10,0);
		elements['score_pingouin'].setPosition(screenSize.width / 2 - 48, screenSize.height / 2 - 90);
		elements['score_pingouin'].setFixed(true);
		elements['score_pingouin'].setDepth(6);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}


	export function setScore(value){
		currentScore = value;
	}

	export function setMax(value){
		currentMax = value;

	}

}