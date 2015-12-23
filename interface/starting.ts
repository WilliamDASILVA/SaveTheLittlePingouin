module StartingInterface{

	var elements = [];
	var lastTitle = "";

	export function updateTitle(value){
		lastTitle = value;
	}

	export function create(){
		var screenSize = Global.getScreenSize();
		
		elements['background'] = new Render.Drawable(new Render.Texture("assets/shadow.png"), 0, 0, 720, 155);
		elements['background'].setFixed(true);
		elements['background'].setPosition(0, screenSize.height - 100);
		elements['background'].setSize(screenSize.width, 155);

		elements['label'] = new Render.Draw.Text(20, screenSize.height - 100 + 20, "Map name:", 750, 10);
		elements['label'].setFontSize(25);
		elements['label'].setFont("pixelated");
		elements['label'].setColor("#FFFFFF");
		elements['label'].setFixed(true);

		elements['title'] = new Render.Draw.Text(20, screenSize.height - 100 + 45, lastTitle, 750, 10);
		elements['title'].setFontSize(40);
		elements['title'].setFont("pixelated");
		elements['title'].setColor("#FFFFFF");
		elements['title'].setFixed(true);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}

	}


	export function  destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}
}