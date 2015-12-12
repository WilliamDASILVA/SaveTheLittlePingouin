/*	--------------------------------------------------- *\
		[class] Events()

		* A event class for elements that doesn't use the p2 event system *

\*	--------------------------------------------------- */
class Events{
	
	events: any;

	/*	--------------------------------------------------- *\
			[function] constructor()
	
			* When we create an event system *
	
			Return: nil
	\*	--------------------------------------------------- */
	constructor(){
		this.events = [];
	}


	/*	--------------------------------------------------- *\
			[function] emit(name)
	
			* Emit an event *
	
			Return: nil
	\*	--------------------------------------------------- */
	emit(eventName : string, ...args : any[]){
		var exists = false;
		for (var i = 0; i < this.events.length; ++i) {
			if(this.events[i].name == eventName){
				exists = true;
			}
		}

		if(!exists){
			this.events.push({
				name : eventName,
				functions : []
			});
		}

		for (var i = 0; i < this.events.length; ++i) {
			if(this.events[i].name == eventName){
				for (var k = 0; k < this.events[i].functions.length; ++k) {
					this.events[i].functions[k].apply(null, args);
				}
			}
		}
	}

	/*	--------------------------------------------------- *\
			[function] on(name, functionToCall)
	
			* When the event is received *
	
			Return: nil
	\*	--------------------------------------------------- */
	on(eventName : string, functionToCall : any){
		var exists = false;
		for (var i = 0; i < this.events.length; ++i) {
			if(this.events[i].name == eventName){
				exists = true;
			}
		}

		if(!exists){
			this.events.push({
				name : eventName,
				functions : []
			});
		}


		for (var i = 0; i < this.events.length; ++i) {
			if(this.events[i].name == eventName){
				this.events[i].functions.push(functionToCall);
			}
		}
	}
}