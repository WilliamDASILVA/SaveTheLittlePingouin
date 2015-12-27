module FinalInterface{

	var elements = [];
	var haveControls = false;

	export function enableControls(value){
		haveControls = value;
	}

	export function setActive(){
		var screenSize = Global.getScreenSize();
		var backButton = new Input.Touch((screenSize.width / 2) - 125, screenSize.height - 250 / 3.5 - 20, 250, 250 / 3.5);
		backButton.on("press", () => {
			if(haveControls){
				destroy();
				enableControls(false);
				MenuInterface.create();
				setTimeout(() => {
					MenuInterface.enableControls(true);
				}, 1000);
			}
		});
	}

	export function create(){
		var screenSize = Global.getScreenSize();

		elements['background1'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['background1'].setFixed(true);
		elements['background1'].setColor("#6ca3a6");

		elements['background2'] = new Render.Draw.Rectangle(100, 0, screenSize.width-200, screenSize.height);
		elements['background2'].setFixed(true);
		elements['background2'].setColor("#8ab6b8");

		elements['title'] = new Render.Drawable(new Render.Texture("assets/final_win.png"), (screenSize.width / 2) - 150, 20, 300, 300 / 5.17);
		elements['title'].setFixed(true);

		elements['heart'] = new Render.Drawable(new Render.Texture("assets/final_hearth.png"), (screenSize.width / 2) - 125, 100, 250, 250 / 1.33);
		elements['heart'].setFixed(true);

		elements['banner'] = new Render.Drawable(new Render.Texture("assets/final_banner.png"), (screenSize.width / 2) - 200, 150, 400, 400 / 3.3);
		elements['banner'].setFixed(true);

		elements['button'] = new Render.Drawable(new Render.Texture("assets/final_back.png"), (screenSize.width / 2) - 125, screenSize.height - 250 / 3.5 - 20, 250, 250 / 3.5);
		elements['button'].setFixed(true);

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