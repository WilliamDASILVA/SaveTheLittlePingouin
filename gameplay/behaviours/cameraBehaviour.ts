module Controls{

	/*	--------------------------------------------------- *\
			[class] CameraBehaviour()
	
			* Behaviour of the camera *
	
	\*	--------------------------------------------------- */
	export class CameraBehaviour{
		
		private startPoint: any;
		private endPoint: any;
		private camera : Camera;
		private cameraZoomRatio: number;
		private rotationFixedToPlanet: boolean;
		private planetElement: any;
		private camRotationEnabled: boolean;
		private camZoomEnabled: boolean;
		private camMouvementEnabled: boolean;

		/*	--------------------------------------------------- *\
				[function] constructor()
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(camera : Camera){

			this.startPoint = { x: 0, y: 0};
			this.endPoint = { x: 0, y: 0};
			this.camera = camera;
			this.cameraZoomRatio = 0.05;
			this.rotationFixedToPlanet = false;
			this.planetElement = null;
			this.camRotationEnabled = false;
			this.camZoomEnabled = false;
			this.camMouvementEnabled = true;

			// Mouvement			
			this.mouvement();
			// Zoom / Dezoom
			this.zoom();
			// Rotation
			this.rotation();
		}

		/*	--------------------------------------------------- *\
				[function] setPlanet(planetElement)
		
				* Set the planet element to the camera behaviour *
		
				Return: nil
		\*	--------------------------------------------------- */
		setPlanet(planetElement : any){
			this.planetElement = planetElement;
		}

		/*	--------------------------------------------------- *\
				[function] setCameraMouvementEnabled(value)
		
				* Enable or disable the camera mouvement *
		
				Return: nil
		\*	--------------------------------------------------- */
		setCameraMouvementEnabled(value: boolean){
			this.camMouvementEnabled = value;
		}

		/*	--------------------------------------------------- *\
				[function] setRotationFixedToPlanet(boolean)
		
				* Set if the rotation should be fixed to the center of the planet *
		
				Return: nil
		\*	--------------------------------------------------- */
		setRotationFixedToPlanet(value : boolean){
			this.rotationFixedToPlanet = value;
		}

		/*	--------------------------------------------------- *\
				Mouvement
		\*	--------------------------------------------------- */
		private mouvement(){
			var mouvementTouch = new Input.Touch();
			var mouvementMouse = new Input.Mouse();
			var mousePressing = false;
			mouvementMouse.on("down", (pX, pY, button) => {
				if(button == "left"){
					mousePressing = true;
					this.press(pX, pY);
				}
			});
			mouvementMouse.on("up", (pX, pY, button) => {
				if(button == "left"){
					mousePressing = false;
				}
			});

			var mouvementMouseMove = new Input.MouseMove();
			mouvementMouseMove.on("move", (pX, pY) => {
				if(mousePressing){
					this.move(pX, pY);
				}
			});

			mouvementTouch.on("press", (pX, pY) => {
				this.press(pX, pY);
			});
			mouvementTouch.on("move", (pX, pY) => {
				this.move(pX, pY);
			});
		}

		private press(pX : number, pY : number){
			this.startPoint.x = pX;
			this.startPoint.y = pY;
		}

		private move(pX : number, pY : number){
			if(this.camMouvementEnabled){
				this.endPoint.x = pX;
				this.endPoint.y = pY;

				var diff = { x: (this.endPoint.x - this.startPoint.x), y: (this.endPoint.y - this.startPoint.y)};
				var camPosition = this.camera.getPosition();
				this.startPoint.x = this.endPoint.x;
				this.startPoint.y = this.endPoint.y;
				this.camera.setPosition(camPosition.x - diff.x, camPosition.y - diff.y);
			}
		}

		/*	--------------------------------------------------- *\
				Zoom
		\*	--------------------------------------------------- */
		private zoom(){
			if(this.camZoomEnabled){
				var scrollMouse = new Input.Scroll();
				scrollMouse.on("up", () => {
					var camDepth = this.camera.getDepth();
					var camDepthPos = this.camera.getDepthPosition();

					var pos = Global.getPositionFromScreen(window.innerWidth / 2, window.innerHeight / 2, this.camera);

					if(camDepth <= 2){
						this.camera.setDepth(camDepth + this.cameraZoomRatio);
						this.camera.setDepthPosition(camDepthPos.x - pos.x * this.cameraZoomRatio, camDepthPos.y - pos.y * this.cameraZoomRatio);
					}
				});

				scrollMouse.on("down", () => {
					var camDepth = this.camera.getDepth();
					var camDepthPos = this.camera.getDepthPosition();

					var pos = Global.getPositionFromScreen(window.innerWidth / 2, window.innerHeight / 2, this.camera);

					if(camDepth > 0.5){
						this.camera.setDepth(camDepth - this.cameraZoomRatio);
						this.camera.setDepthPosition(camDepthPos.x + pos.x * this.cameraZoomRatio, camDepthPos.y + pos.y * this.cameraZoomRatio);
					}
				});
			}
		}

		/*	--------------------------------------------------- *\
				Rotation
		\*	--------------------------------------------------- */
		private rotation(){
			if(this.camRotationEnabled){
				
				var hasBeenPressed = false;
				var lastAngle = 0;
				var initialAngle = 0;
				var endAngle = 0;

				var wheelPress = new Input.Mouse();
				wheelPress.on("down", (x, y, button) => {
					if (button == "middle") {
						hasBeenPressed = true;
					}
				});

				wheelPress.on("up", (x, y, button) => {
					if (button == "middle") {
						hasBeenPressed = false;
					}
				});

				var wheelMove = new Input.MouseMove();
				wheelMove.on("move", (x, y) => {
					if(hasBeenPressed){
						var rot = this.camera.getRotation();
						var middlePoint = { x: 0, y: 0 };

						if(this.rotationFixedToPlanet){
							if(this.planetElement){
								var planetPosition = this.planetElement.getPosition();
								middlePoint = Global.getPositionFromWorld(planetPosition.x, planetPosition.y, this.camera);
							}
						}
						else{
							middlePoint.x = window.innerWidth / 2;
							middlePoint.y = window.innerHeight / 2;
						}

						this.camera.setRotationPoint(middlePoint.x, middlePoint.y);
					
						var angle = Global.findRotation(middlePoint.x, middlePoint.y, x, y);
						initialAngle = angle;
						var diff = endAngle - initialAngle;
						endAngle = initialAngle;

						this.camera.setRotation((rot * 180) / Math.PI - diff);
					}
				});
			}
		}

		/*	--------------------------------------------------- *\
				[function] moveTo(x, y, time)
		
				* Move the camera to a specific position smoothly *
		
				Return: nil
		\*	--------------------------------------------------- */
		moveTo(x : number, y : number, time : number){
			var camPosition = this.camera.getPosition();
			var cPosition = camPosition;
			var tween = createjs.Tween.get(cPosition, {}).to({ x: x, y: y }, time).call(() => {
				
			}).addEventListener("change", () => {
				this.camera.setPosition(cPosition.x, cPosition.y);
			}, false);
		}

		/*	--------------------------------------------------- *\
				[function] lockTo(element)
		
				* Lock the camera *
		
				Return: true, false
		\*	--------------------------------------------------- */
		lockTo(element : Elements){
			this.camera.lockTo(element);
		}
	}
}