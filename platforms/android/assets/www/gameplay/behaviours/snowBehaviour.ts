module snowBehaviour{
	
	var elements = [];

	export function setActive(){
		var screenSize = Global.getScreenSize();

		var k = 0;
		setInterval(() => {
			k++;

			var z = 0;
			for (var element in elements) {
				z++;
				var position = elements[element].getPosition();
				if(position.y > screenSize.height){
					position.y = -400;
					position.x = 200 * z;
				}

				elements[element].setPosition(position.x + (Math.cos(k) * 5), position.y + 5);
			}

		}, 80);
	}

	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}

	export function create(){
		var snowTexture = new Render.Texture("assets/snow.png");

		elements['snow1'] = new Render.Drawable(snowTexture, 0, 0, 400, 400);
		elements['snow1'].setFixed(true);

		elements['snow2'] = new Render.Drawable(snowTexture, 400, -400, 400, 400);
		elements['snow2'].setFixed(true);

		elements['snow3'] = new Render.Drawable(snowTexture, 200, -300, 400, 400);
		elements['snow3'].setFixed(true);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}		
	}
}