module Background{

	var backgroundElement = null;

	export function active(){
		var screenSize = Global.getScreenSize();
		var texture = new Render.Texture("assets/background.jpg");

		backgroundElement = new Render.Drawable(texture, 0, 0, screenSize.width, screenSize.height);
		backgroundElement.setFixed(true);
		backgroundElement.setDepth(-1000);


		mainCanvas.set(backgroundElement);
	}


}