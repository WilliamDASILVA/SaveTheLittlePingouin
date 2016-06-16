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
				destroy();
				enableControls(false);
				if (MapLoading.getNextMap() == "end") {
					MapLoading.destroyMap(() => {
						FinalInterface.create();
						FinalInterface.enableControls(true);
					});
				}
				else{
					MapLoading.destroyMap(() => {
						MapLoading.loadMap(MapLoading.getNextMap());
					});
				}
			}
		});
		var goMenuButton = new Input.Touch(screenSize.width / 2 - 75, (screenSize.height - 80), 150, 50);
		goMenuButton.on("press", () => {
			if (haveControls){
				destroy();
				enableControls(false);
				MapLoading.destroyMap(() => {
			    	MenuInterface.create();
					setTimeout(() => {
						MenuInterface.enableControls(true);
					}, 1000);
				});
			}
		});
	}
	export function create(){
		var screenSize = Global.getScreenSize();

		var pourcentage = (currentScore * 100) / currentMax;

		elements['fade'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['fade'].setFixed(true);
		elements['fade'].setDepth(0);
		elements['fade'].setColor("#000");
		elements['fade'].setOpacity(0.5);

		elements['background'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150, screenSize.height /2 - (screenSize.height - 150) / 2, 300, screenSize.height - 150);
		elements['background'].setColor("#FFF");
		elements['background'].setFixed(true);
		elements['background'].setDepth(1);

		var starActive = new Render.Texture("assets/star_active.png");
		var starDisabled = new Render.Texture("assets/star_disabled.png");

		var firstStar = starDisabled;
		if(pourcentage >= 50){
			firstStar = starActive;
		}
		elements['left_star'] = new Render.Drawable(firstStar, screenSize.width / 2 - 150 - 96 + 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['left_star'].setFixed(true);
		elements['left_star'].setDepth(2);

		var secondStar = starDisabled;
		if (pourcentage >= 80){
			secondStar = starActive;
		}
		elements['middle_star'] = new Render.Drawable(secondStar, screenSize.width / 2 - 64, screenSize.height / 2 - (screenSize.height - 150) / 2 - 64, 128, 128);
		elements['middle_star'].setFixed(true);
		elements['middle_star'].setDepth(3);

		var thirdStar = starDisabled;
		if(pourcentage == 100){
			thirdStar = starActive;
		}
		elements['right_star'] = new Render.Drawable(thirdStar, screenSize.width / 2 + 150 - 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['right_star'].setFixed(true);
		elements['right_star'].setDepth(2);

		elements['button_home'] = new Render.Draw.Rectangle(screenSize.width / 2 - 75, (screenSize.height - 80), 150, 50);
		elements['button_home'].setColor("#DFDFDF");
		elements['button_home'].setFixed(true);
		elements['button_home'].setDepth(2);

		elements['button_home_text'] = new Render.Draw.Text(screenSize.width / 2 - 75, (screenSize.height - 75), "Go to main menu", 150, 10);
		elements['button_home_text'].setFontSize(25);
		elements['button_home_text'].setFont("pixelated");
		elements['button_home_text'].setColor("#000000");
		elements['button_home_text'].setAlign("center");
		elements['button_home_text'].setFixed(true);
		elements['button_home_text'].setDepth(3);

		elements['button_retry'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150 - 75, (screenSize.height - 130) - 25, 150, 50);
		elements['button_retry'].setColor("#DFDFDF");
		elements['button_retry'].setFixed(true);
		elements['button_retry'].setDepth(2);


		elements['button_retry_text'] = new Render.Draw.Text(screenSize.width / 2 - 150 - 75 - 75, (screenSize.height - 130) - 8, "Retry this level", 300, 10);
		elements['button_retry_text'].setFontSize(25);
		elements['button_retry_text'].setFont("pixelated");
		elements['button_retry_text'].setColor("#000000");
		elements['button_retry_text'].setAlign("center");
		elements['button_retry_text'].setFixed(true);
		elements['button_retry_text'].setDepth(3);

		if (haveNextButton){
			elements['button_nextlevel'] = new Render.Draw.Rectangle(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 25, 150, 50);
			elements['button_nextlevel'].setColor("#DFDFDF");
			elements['button_nextlevel'].setFixed(true);
			elements['button_nextlevel'].setDepth(2);

			var nextText = "Next level";
			if (MapLoading.getNextMap() == "end"){
				nextText = "Finish";
			}

			elements['button_nextlevel_text'] = new Render.Draw.Text(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 8, nextText, 150, 10);
			elements['button_nextlevel_text'].setFontSize(25);
			elements['button_nextlevel_text'].setFont("pixelated");
			elements['button_nextlevel_text'].setColor("#000000");
			elements['button_nextlevel_text'].setAlign("center");
			elements['button_nextlevel_text'].setFixed(true);
			elements['button_nextlevel_text'].setDepth(3);
		}

		elements['score_background'] = new Render.Draw.Circle(screenSize.width / 2, screenSize.height / 2 - 48, 48);
		elements['score_background'].setFixed(true);
		elements['score_background'].setColor("#EFEFEF");
		elements['score_background'].setDepth(3);

		elements['score'] = new Render.Draw.Text(screenSize.width / 2 - 150, screenSize.height / 2 + 20, currentScore + " / " + currentMax, 300, 10);
		elements['score'].setFontSize(40);
		elements['score'].setFont("pixelated");
		elements['score'].setColor("#000000");
		elements['score'].setAlign("center");
		elements['score'].setFixed(true);
		elements['score'].setDepth(2);

		elements['score_pingouin'] = new Render.Sprite(new Render.Texture("assets/pingouin_icon_hud.png"), 0,0,96,96, 64,64,10,0);
		elements['score_pingouin'].setPosition(screenSize.width / 2 - 48, screenSize.height / 2 - 90);
		elements['score_pingouin'].setFixed(true);
		elements['score_pingouin'].setDepth(4);

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