module playerBehaviour{
	var currentPlayer = null;
	var isMoving = false;

	export function setPlayer(player : any){
		currentPlayer = player;
	}

	export function active(){
		Update.on(movePlayer);
		isMoving = true;
	}

	function movePlayer(){
		if(currentPlayer != null){
			if (isMoving){
				currentPlayer.velocity[0] = 0;
			}
		}
	}
	
}