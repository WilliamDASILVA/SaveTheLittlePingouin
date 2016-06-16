module ScoreBehaviour{

	var maxPoints = 0;
	var currentPoints = 0;

	export function setMaxPoints(value){
		maxPoints = value;
	}

	export function givePoint(){
		currentPoints++;
	}

	export function getPoints(){
		return currentPoints;
	}

	export function getTotalPoints(){
		return maxPoints;
	}

	export function resetScore(){
		currentPoints = 0;
	}


}