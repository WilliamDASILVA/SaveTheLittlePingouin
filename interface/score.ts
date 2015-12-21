module ScoreInterface{

	var elements = [];

	export function create(){
		var screenSize = Global.getScreenSize();

		elements['fade'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
		elements['fade'].setFixed(true);
		elements['fade'].setColor("#000");
		elements['fade'].setOpacity(0.5);

		elements['background'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150, screenSize.height /2 - (screenSize.height - 150) / 2, 300, screenSize.height - 150);
		elements['background'].setColor("#FFF");
		elements['background'].setFixed(true);

		var starActive = new Render.Texture("assets/star_active.png");
		var starDisabled = new Render.Texture("assets/star_disabled.png");

		elements['middle_star'] = new Render.Drawable(starActive, screenSize.width / 2 - 64, screenSize.height / 2 - (screenSize.height - 150) / 2 - 64, 128, 128);
		elements['middle_star'].setFixed(true);

		elements['left_star'] = new Render.Drawable(starActive, screenSize.width / 2 - 150 - 96 + 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['left_star'].setFixed(true);

		elements['right_star'] = new Render.Drawable(starActive, screenSize.width / 2 + 150 - 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
		elements['right_star'].setFixed(true);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}

}