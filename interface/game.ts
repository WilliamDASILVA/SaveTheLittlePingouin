module GameInterface{

	var elements = [];

	export function setVisible(value){
		for (var element in elements) {
			elements[element].setVisible(value);
		}
	}

	export function destroy(){
		for (var element in elements) {
			interfaceCanvas.del(elements[element]);
		}
	}

	export function create(){

		var screenSize = Global.getScreenSize();

		elements['jump_button'] = new Render.Drawable(new Render.Texture("assets/jump_button.png"), 0,0,160,160);
		elements['jump_button'].setPosition(32, screenSize.height/2-80 + 32);
		elements['jump_button'].setFixed(true);
		elements['jump_button'].setOpacity(0.25);

		elements['save_button'] = new Render.Drawable(new Render.Texture("assets/save_button.png"), 0,0,160,160);
		elements['save_button'].setPosition(screenSize.width - 32 - 160, screenSize.height/2-80+ 32);
		elements['save_button'].setFixed(true);
		elements['save_button'].setOpacity(0.25);

		elements['score_pingouin'] = new Render.Sprite(new Render.Texture("assets/pingouin_icon_hud.png"), 0,0,64,64, 64,64,10,0);
		elements['score_pingouin'].setPosition(screenSize.width - 192, 10);
		elements['score_pingouin'].setFixed(true);

		elements['health_bar'] = new Render.Drawable(new Render.Texture("assets/health_bar.png"), 0,0,48,64);
		elements['health_bar'].setPosition(20, 10);
		elements['health_bar'].setFixed(true);
		elements['health_bar'].setCrop(0, 0, 48, 64);


		elements['score_label_shadow'] = new Render.Draw.Text(screenSize.width - 128, 35, "10/20", 200, 10);
		elements['score_label_shadow'].setFontSize(45);
		elements['score_label_shadow'].setFont("pixelated");
		elements['score_label_shadow'].setColor("#000000");
		elements['score_label_shadow'].setOpacity(0.2);
		elements['score_label_shadow'].setFixed(true);
		
		elements['score_label'] = new Render.Draw.Text(screenSize.width - 128, 32, "10/20", 200, 10);
		elements['score_label'].setFontSize(45);
		elements['score_label'].setFont("pixelated");
		elements['score_label'].setColor("#FFFFFF");
		elements['score_label'].setFixed(true);

		for (var element in elements) {
			interfaceCanvas.set(elements[element]);
		}
	}

	export function updateValue(label : string, value : any){
		if(label != "health"){
			elements[label].setValue(value);
		}
		else{
			var numberOfHearts = value;
			elements['health_bar'].setSize(48 * numberOfHearts, 64);			
			elements['health_bar'].setCrop(0, 0, 48 * numberOfHearts, 64);			
		}

	}

}