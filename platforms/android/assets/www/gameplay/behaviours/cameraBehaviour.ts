module cameraBehaviour{

	var currentCamera = null;
	var followTarget = null;
	var isActive = false;

	export function setCamera(camera:any){
		currentCamera = camera;
	}

	export function follow(element:any){
		followTarget = element;
	}

	export function active(){
		Update.on(update);
		isActive = true;
	}

	function update(){
		if((currentCamera != null) && (followTarget != null) && (isActive)){
			var screenSize = Global.getScreenSize();
			var position = followTarget.getPosition();
			currentCamera.setPosition(position.x + screenSize.width / 2 - 100, 0);
		}
	}
}