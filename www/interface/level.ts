module LevelInterface{
	var elements = [];
	var touchAreas = [];
	var controlsEnabled = false;
	var islands = 0;
	var errorSound = new Sounds.Sound("assets/sounds/error.ogg");
	var okSound = new Sounds.Sound("assets/sounds/ok.ogg");

	export function enableControls(value) {
		controlsEnabled = value;
	}

	export function setActive(){
		var screenSize = Global.getScreenSize();
		var backButton = new Input.Touch(10, 10, 150, 150 / 2.25);
		backButton.on("press", () => {
			if(controlsEnabled){
				destroy();
				MenuInterface.create();
				MenuInterface.enableControls(true);
				enableControls(false);
				okSound.play();	
			}
		});

		touchAreas['learning'] = { x: 10, y: 95, calling : "learning", can : SaveData.getData("learning").can};
		touchAreas['darling'] = { x: 200, y: 95, calling: "level1", can: SaveData.getData("level1").can};
		touchAreas['firstlove'] = { x: 410, y: 95, calling: "level2", can: SaveData.getData("level2").can};
		touchAreas['staywithme'] = { x: 10, y: 250, calling: "level3", can: SaveData.getData("level3").can};
		touchAreas['needyou'] = { x: 200, y: 250, calling: "level4", can: SaveData.getData("level4").can};
		touchAreas['loveyou'] = { x: 410, y: 250, calling: "level5", can: SaveData.getData("level5").can};

		var touchArea = new Input.Touch(0, 0, screenSize.width, screenSize.height);
		touchArea.on("press", (x, y) => {
			if(controlsEnabled){
				for (var area in touchAreas) {
					if(x >= touchAreas[area].x && y >= touchAreas[area].y && x <= touchAreas[area].x + 130 && y <= touchAreas[area].y + 130){
						if(touchAreas[area].can){
							MapLoading.loadMap(touchAreas[area].calling);
							destroy();
							enableControls(false);
							okSound.play();
						}
						else{
							errorSound.play();
						}
					}
				}
			}
		});
	}

	export function create(){
		touchAreas['learning'] = { x: 10, y: 95, calling : "learning", can : SaveData.getData("learning").can};
		touchAreas['darling'] = { x: 200, y: 95, calling: "level1", can: SaveData.getData("level1").can};
		touchAreas['firstlove'] = { x: 410, y: 95, calling: "level2", can: SaveData.getData("level2").can};
		touchAreas['staywithme'] = { x: 10, y: 250, calling: "level3", can: SaveData.getData("level3").can};
		touchAreas['needyou'] = { x: 200, y: 250, calling: "level4", can: SaveData.getData("level4").can};
		touchAreas['loveyou'] = { x: 410, y: 250, calling: "level5", can: SaveData.getData("level5").can};

		islands = 0;
		var screenSize = Global.getScreenSize();

		elements['background'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['background'].setColor("#9ecdc9");
		elements['background'].setFixed(true);
		elements['background'].setDepth(0);

		elements['back'] = new Render.Drawable(new Render.Texture("assets/back.png"), 10, 10, 150, 150 / 2.25);
		elements['back'].setFixed(true);
		elements['back'].setDepth(1);

		elements['border'] = new Render.Drawable(new Render.Texture("assets/menu_right.png"), screenSize.width - 200, 0, 200, screenSize.height);
		elements['border'].setFixed(true);
		elements['border'].setDepth(1);

		elements['label'] = new Render.Draw.Text(180, 30, "Select a level:", 500, 10);
		elements['label'].setFontSize(50);
		elements['label'].setFont("pixelated");
		elements['label'].setColor("#FFFFFF");
		elements['label'].setFixed(true);
		elements['label'].setDepth(1);

		createIsland(10, 95, SaveData.getData("learning").stars, "Learning", (!SaveData.getData("learning").can));
		createIsland(200, 95, SaveData.getData("level1").stars, "Level 1", (!SaveData.getData("level1").can));
		createIsland(410, 95, SaveData.getData("level2").stars, "Level 2", (!SaveData.getData("level2").can));
		createIsland(10, 250, SaveData.getData("level3").stars, "Level 3", (!SaveData.getData("level3").can));
		createIsland(200, 250, SaveData.getData("level4").stars, "Level 4", (!SaveData.getData("level4").can));
		createIsland(410, 250, SaveData.getData("level5").stars, "Level 5", (!SaveData.getData("level5").can));


		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}

	function createIsland(x: number, y: number, stars: number, title: string, locked: boolean){
		islands++;
		elements['background' + islands] = new Render.Drawable(new Render.Texture("assets/menu_item.png"), x, y, 130, 130/1.3);
		elements['background' + islands].setFixed(true);
		elements['background' + islands].setDepth(2);

		elements['title' + islands] = new Render.Draw.Text(x - 35, y + 130 / 1.3 + 10, title, 200, 10);
		elements['title' + islands].setFontSize(18);
		elements['title' + islands].setAlign("center");
		elements['title' + islands].setFixed(true);
		elements['title' + islands].setColor("#FFFFFF");
		elements['title' + islands].setDepth(3);

		if(stars >= 1){
			elements['star1' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x, y, 40, 40);
		}
		else{
			elements['star1' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x, y, 40,40);

		}
		if(stars >= 2){
			elements['star2' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x + 45, y, 40,40);
		}
		else{
			elements['star2' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x + 45, y, 40,40);
		}
		if(stars == 3){
			elements['star3' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x+90, y, 40,40);

		}
		else{
			elements['star3' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x+90, y, 40,40);
		}

		elements['star1' + islands].setFixed(true);
		elements['star1' + islands].setDepth(4);
		elements['star2' + islands].setFixed(true);
		elements['star2' + islands].setDepth(4);
		elements['star3' + islands].setFixed(true);
		elements['star3' + islands].setDepth(4);

		elements['lock' + islands] = new Render.Drawable(new Render.Texture("assets/lock.png"), x + 65 - 15, y + 20, 30, 40);
		elements['lock' + islands].setFixed(true);
		elements['lock' + islands].setDepth(5);

		if(locked){
			elements['star1' + islands].setOpacity(0.32);
			elements['star2' + islands].setOpacity(0.32);
			elements['star3' + islands].setOpacity(0.32);
			elements['background' + islands].setOpacity(0.32);
			elements['title' + islands].setOpacity(0.32);
			elements['lock' + islands].setVisible(true);
		}
		else{
			elements['lock' + islands].setVisible(false);
		}
	}

	
	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}


}