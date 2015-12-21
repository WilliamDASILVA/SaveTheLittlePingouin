module MapLoading{
	var functionToCallWhenLoaded = null;
	var mapElements = [];
	var nextMap = "";
	var playerElement = null;
	var mapSize = null;

	export function getMapSize(){
		return mapSize;
	}

	export function setPlayer(player : any){
		playerElement = player;
	}

	export function destroyMap(functionWhenDone : any){
		for (var i = mapElements.length - 1; i >= 0; i--) {
			mainCanvas.del(mapElements[i]);
			mapElements[i].destroy();
		}

		mapElements = [];

		functionWhenDone();
		mainCanvas.del(playerElement);
	}

	export function getNextMap(){
		return nextMap;
	}

	export function loadMap(name : string){
		var xhr = new Global.XHR("maps/" + name + ".json");
		xhr.ready((response) => {
			if(response.readyState == 4){
				var mapData = JSON.parse(response.response);
				if(mapData){
					console.log("Generating map:" + mapData.name);
					generateMap(mapData);
				}
				else{
					alert("Couldn't load map... Data error.");
				}
			}
		});
	}

	function generateMap(mapData:any){
		var data = mapData.elements;

		mapSize = mapData.size;

		// elements
		var maxPoints = 0;
		for (var i = data.length - 1; i >= 0; i--) {
			var element = null;
			switch (data[i][0]) {
				case "iceberg":
					element = new Obstacle(world, "iceberg");
					break;
				case "hole":
					element = new Obstacle(world, "hole");
					break;
				case "ennemy":
					maxPoints++;
					element = new Ennemy(world);
					break;
				case "end":
					element = new EndFlag(world);
					nextMap = data[i][3];
			}

			if (element != null){
				element.setPosition(data[i][1], data[i][2]-50);

				mainCanvas.set(element);
				mapElements.push(element);
			}
		}

		ScoreBehaviour.setMaxPoints(maxPoints);
		GameInterface.updateValue("score_label", "0 / " + maxPoints);
		GameInterface.updateValue("score_label_shadow", "0 / " + maxPoints);

		functionToCallWhenLoaded();
	}

	export function whenLoaded(functionToCall:any){
		functionToCallWhenLoaded = functionToCall;
	}
}