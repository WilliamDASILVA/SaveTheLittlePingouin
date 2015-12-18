module playerBehaviour{
	var currentPlayer = null;
	var isMoving = false;
	var canJump = true;
	var haveControls = false;

	export function setPlayer(player : any){
		currentPlayer = player;
	}

	export function enableControls(value){
		haveControls = value;
	}

	export function enableMoving(value){
		isMoving = value;
	}

	export function active(){
		Update.on(movePlayer);

		var screenSize = Global.getScreenSize();
		var touchJump = new Input.Touch(0,0, screenSize.width/2);
		touchJump.on("press", doJump);
		var touchPunch = new Input.Touch(screenSize.width/2,0 ,  screenSize.width/2);
		touchPunch.on("press", doPunch);

		world.on("beginContact", (event) => {
			for (var i = _obstacles.length - 1; i >= 0; i--) {
				if((event.bodyA == currentPlayer || event.bodyB == currentPlayer ) && (event.bodyA == _obstacles[i] || event.bodyB == _obstacles[i])) {
					currentPlayer.takeHealth(10);
				}
			}
			/*for (var i = _ennemies.length - 1; i >= 0; i--) {
				if((event.bodyA == currentPlayer || event.bodyB == currentPlayer ) && (event.bodyA == _ennemies[i] || event.bodyB == _ennemies[i])) {
					currentPlayer.takeHealth(10);
				}
			}*/
			for (var i = _endFlags.length - 1; i >= 0; i--) {
				if((event.bodyA == currentPlayer || event.bodyB == currentPlayer ) && (event.bodyA == _endFlags[i] || event.bodyB == _endFlags[i])) {
					enableControls(false);
					enableMoving(false);

					currentPlayer.velocity[0] = 0;
					currentPlayer.velocity[1] = 0;

					currentPlayer.drawables[0].setFreeze(true);

					console.log(currentPlayer.getHealth());
					console.log("POINTS:", ScoreBehaviour.getPoints()+"/"+ScoreBehaviour.getTotalPoints());

					setTimeout(() => {
						MapLoading.destroyMap(() => {
							console.log("NEXT MAP:", MapLoading.getNextMap());
							MapLoading.loadMap("dead");
						});

					}, 3000);
				}
			}


		});

	}

	function doPunch( ){
		if(haveControls){
			for (var i = _ennemies.length - 1; i >= 0; i--) {
				var position = _ennemies[i].getPosition();
				var playerPosition = currentPlayer.getPosition();
				if(Global.getDistanceBetween2Points(position.x, position.y, playerPosition.x, playerPosition.y) <= 300){
					if(position.x > playerPosition.x){
						var texture = new Render.Texture("assets/ennemy2.png");
						var sprite = new Render.Drawable(texture, 0, 0, 200,188);
						sprite.setOffset(0, -150);
						_ennemies[i].drawables[0] = sprite;

						ScoreBehaviour.givePoint();
					} 
				}
			}
		}
	}

	function doJump(){
		if(canJump && haveControls){
			currentPlayer.velocity[1] = -2000;
			canJump = false;
			setTimeout(() => {
				canJump = true;
			}, 1000);
		}
	}

	function movePlayer(){
		if((currentPlayer != null) && haveControls){
			if (isMoving){
				currentPlayer.velocity[0] = 600;
			}
		}
	}
	
}