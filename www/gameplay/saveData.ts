module SaveData{

	var currentData = [];

	export function resetData(){
		localStorage.clear();
	}

	export function loadData(){
		currentData['learning'] = JSON.parse(localStorage.getItem("learning"));
		if(currentData['learning'] == null){
			localStorage.setItem("learning", JSON.stringify({
				"can" : true,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['learning'] = JSON.parse(localStorage.getItem("learning"));
		currentData['level1'] = JSON.parse(localStorage.getItem("level1"));
		if(currentData['level1'] == null){
			localStorage.setItem("level1", JSON.stringify({
				"can" : false,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['level1'] = JSON.parse(localStorage.getItem("level1"));
		currentData['level2'] = JSON.parse(localStorage.getItem("level2"));
		if(currentData['level2'] == null){
			localStorage.setItem("level2", JSON.stringify({
				"can" : false,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['level2'] = JSON.parse(localStorage.getItem("level2"));
		currentData['level3'] = JSON.parse(localStorage.getItem("level3"));
		if(currentData['level3'] == null){
			localStorage.setItem("level3", JSON.stringify({
				"can" : false,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['level3'] = JSON.parse(localStorage.getItem("level3"));
		currentData['level4'] = JSON.parse(localStorage.getItem("level4"));
		if(currentData['level4'] == null){
			localStorage.setItem("level4", JSON.stringify({
				"can" : false,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['level4'] = JSON.parse(localStorage.getItem("level4"));
		currentData['level5'] = JSON.parse(localStorage.getItem("level5"));
		if(currentData['level5'] == null){
			localStorage.setItem("level5", JSON.stringify({
				"can" : false,
				"done" : false,
				"stars" : 0,
				"pingouins" : 0
			}));
		}
		currentData['level5'] = JSON.parse(localStorage.getItem("level5"));
	}

	export function setData(name, valueToChange, value){
		currentData[name][valueToChange] = value;
	}

	export function getData(name){
		return currentData[name];
	}

	export function saveData(){
		for (var level in currentData) {
			localStorage.setItem(level, JSON.stringify(currentData[level]));
		}
		console.log("Data saved");
	}

}