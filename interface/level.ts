module LevelInterface{
	var elements = [];
	var touchAreas = [];
	var controlsEnabled = true;
	var islands = 0;


	export function enableControls(value){
		controlsEnabled = value;
	}

	export function setActive(){
		var screenSize = Global.getScreenSize();
		var backButton = new Input.Touch(10, 10, 150, 150 / 2.25);
		backButton.on("press", () => {
			if(controlsEnabled){
				console.log("START THE FIRST MAP..");
			}
		});
	}

	export function create(){
		var screenSize = Global.getScreenSize();

		elements['background'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['background'].setColor("#9ecdc9");
		elements['background'].setFixed(true);

		elements['back'] = new Render.Drawable(new Render.Texture("assets/back.png"), 10, 10, 150, 150 / 2.25);
		elements['back'].setFixed(true);

		elements['border'] = new Render.Drawable(new Render.Texture("assets/menu_right.png"), screenSize.width - 200, 0, 200, screenSize.height);
		elements['border'].setFixed(true);

		elements['label'] = new Render.Draw.Text(180, 30, "Select a level:", 500, 10);
		elements['label'].setFontSize(50);
		elements['label'].setFont("pixelated");
		elements['label'].setColor("#FFFFFF");
		elements['label'].setFixed(true);

		createIsland(10, 95, 2, "Learning", false);
		createIsland(200, 95, 0, "My darling...", true);
		createIsland(410, 95, 0, "You're my first love...", true);
		createIsland(10, 250, 0, "Stay with me...", true);
		createIsland(200, 250, 0, "I need you.", true);
		createIsland(410, 250, 0, "I love you.", true);


		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}

	function createIsland(x : number, y : number, stars : number, title : string, locked : boolean){
		islands++;
		elements['background' + islands] = new Render.Drawable(new Render.Texture("assets/menu_item.png"), x, y, 130, 130/1.3);
		elements['background' + islands].setFixed(true);

		elements['title' + islands] = new Render.Draw.Text(x - 35, y + 130 / 1.3 + 10, title, 200, 10);
		elements['title' + islands].setFontSize(18);
		elements['title' + islands].setAlign("center");
		elements['title' + islands].setFixed(true);
		elements['title' + islands].setColor("#FFFFFF");

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
		elements['star2' + islands].setFixed(true);
		elements['star3' + islands].setFixed(true);

		if(locked){

			elements['star1' + islands].setOpacity(0.32);
			elements['star2' + islands].setOpacity(0.32);
			elements['star3' + islands].setOpacity(0.32);
			elements['background' + islands].setOpacity(0.32);
			elements['title' + islands].setOpacity(0.32);
			elements['lock' + islands] = new Render.Drawable(new Render.Texture("assets/lock.png"), x + 65 - 15, y + 20, 30, 40);
			elements['lock' + islands].setFixed(true);
		}
	}

	
	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}


}