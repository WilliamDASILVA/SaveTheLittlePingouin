/*	--------------------------------------------------- *\
		Input
\*	--------------------------------------------------- */
module Input{
	
    var pressedKeys = [];


	/*	--------------------------------------------------- *\
			[class] MouseMove()
	
			* Quand l'utilisateur bouge la souris *
	
	\*	--------------------------------------------------- */
	export class MouseMove extends Events{
		
		/*	--------------------------------------------------- *\
				[function] constructor()
		
				* Quand on crée l'event *
		
				Return: nil
		\*	--------------------------------------------------- */
        constructor(){
			super();

			var cache = this;
            window.addEventListener("mousemove", function(e) {
                cache.emit("move", e.clientX, e.clientY);
           	});

        }

	}

	/*	--------------------------------------------------- *\
			[class] Mouse()
	
			* When the user use the mouse buttons *
	
	\*	--------------------------------------------------- */
	export class Mouse extends Events{
		
		x: number;
		y: number;
		width: number;
		height: number;

		/*	--------------------------------------------------- *\
				[function] constructor(x, y, width, height)
		
				* When we create the event on the mouse *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(x = 0, y = 0, width = window.innerWidth, height = window.innerHeight){
			super();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

			var cache = this;
			document.addEventListener("mouseup", (e) => {
				if(e.clientX >= cache.x && e.clientX <= cache.x + cache.width && e.clientY >= cache.y && e.clientY <= cache.y + cache.height) {
					var button = "";
					switch (e.button) {
						case 0:
							button = "left";
							break;
						case 1:
							button = "middle";
							break;
						case 2:
							button = "right";
							break;
					}
					cache.emit("up", e.clientX, e.clientY, button);
				}
			});

			document.addEventListener("mousedown", (e) => {
				if (e.clientX >= cache.x && e.clientX <= cache.x + cache.width && e.clientY >= cache.y && e.clientY <= cache.y + cache.height) {
					var button = "";
					switch (e.button) {
						case 0:
							button = "left";
							break;
						case 1:
							button = "middle";
							break;
						case 2:
							button = "right";
							break;
					}
					cache.emit("down", e.clientX, e.clientY, button);
				}
			});
		}
	}

	/*	--------------------------------------------------- *\
			[class] Click()
	
			* Quand l'utilisateur clique sur une zone *
	
	\*	--------------------------------------------------- */
	export class Click extends Events{
		
        x: number;
        y: number;
        width: number;
        height: number;

		/*	--------------------------------------------------- *\
				[function] constructor(x, y, width, height)
		
				* Quand on crée l'event click *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(x = 0, y = 0, width = window.innerWidth, height = window.innerHeight){
			super();

            this.x = x;
            this.y = y;
            this.width = width;
            this.height = height;

            var cache = this;
            window.addEventListener("click", function(e){
                if (e.clientX >= cache.x && e.clientX <= cache.x + cache.width && e.clientY >= cache.y && e.clientY <= cache.y + cache.height) {
					cache.emit("click", e.clientX, e.clientY);
                }
                else{
					cache.emit("out", e.clientX, e.clientY);
                }
           	});
		}

		/*	--------------------------------------------------- *\
				[function] setPosition(x, y)
		
				* Set la position de la hitbox *
		
				Return: nil
		\*	--------------------------------------------------- */
		setPosition(x : number, y : number){
			this.x = x;
			this.y = y;
		}

		/*	--------------------------------------------------- *\
				[function] setSize(width, height)
		
				* Set la taille de la hitbox *
		
				Return: nil
		\*	--------------------------------------------------- */
		setSize(width : number, height : number){
			this.width = width;
			this.height = height;
		}

	}



	/*	--------------------------------------------------- *\
			[class] Touch()
	
			* Créer une zone où l'utilisateur peut toucher *
	
	\*	--------------------------------------------------- */
	export class Touch extends Events{

		x : number;
		y : number;
		width : number;
		height : number;
		
		/*	--------------------------------------------------- *\
				[function] constructor(x, y, width, height)
		
				* Quand on crée une zone de toucher *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(x = 0, y = 0, width = window.innerWidth, height = window.innerHeight){
			super();

			this.x = x;
			this.y = y;
			this.width = width;
			this.height = height;

			var cache = this;
			document.body.addEventListener("touchstart", function(e : any){
                for (var i = e.changedTouches.length - 1; i >= 0; i--) {
					if(e.changedTouches[i].clientX >= cache.x && e.changedTouches[i].clientX <= cache.x + cache.width && e.changedTouches[i].clientY >= cache.y && e.changedTouches[i].clientY <= cache.y + cache.height){
						cache.emit("press", e.changedTouches[i].clientX, e.changedTouches[i].clientY, e.touches);
					}
                }
			}, false);

			document.body.addEventListener("touchend", function(e:any){
				for (var i = e.changedTouches.length - 1; i >= 0; i--) {
					if(e.changedTouches[i].clientX >= cache.x && e.changedTouches[i].clientX <= cache.x + cache.width && e.changedTouches[i].clientY >= cache.y && e.changedTouches[i].clientY <= cache.y + cache.height){
						cache.emit("release", e.changedTouches[i].clientX, e.changedTouches[i].clientY, e.touches);
					}
				}
			}, false);

			document.body.addEventListener("touchmove", function(e:any){
				for (var i = e.changedTouches.length - 1; i >= 0; i--) {
					if(e.changedTouches[i].clientX >= cache.x && e.changedTouches[i].clientX <= cache.x + cache.width && e.changedTouches[i].clientY >= cache.y && e.changedTouches[i].clientY <= cache.y + cache.height){
						cache.emit("move", e.changedTouches[i].clientX, e.changedTouches[i].clientY, e.touches);
					}
				}
				e.preventDefault();
			}, false);
		}

	}

	/*	--------------------------------------------------- *\
			[class] Key()
	
			* Crée un event de type Key press *
	
	\*	--------------------------------------------------- */
	export class Key extends Events{
		
        keyPressed: any;

		/*	--------------------------------------------------- *\
				[function] constructor(keyPressed : any)
		
				* Quand on crée l'event *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(...rest : any[]){
			super();

			var cache = this;
			this.keyPressed = null;

			if(rest[0]){
            	this.keyPressed = rest[0];
			}

            window.addEventListener("keydown", (e) => {
            	if(this.keyPressed){
	                if (this.keyPressed == e.key || this.keyPressed == e.keyCode || this.keyPressed == e.charCode) {
	                    pressedKeys.push({ key: e.key, code: e.keyCode, event : this});
	                }
            	}
            	else{
					cache.emit("down", e.key, e.keyCode, e.charCode);
            	}
            });

            window.addEventListener("keyup", (e) => {
            	if(this.keyPressed != null){
					if (this.keyPressed == e.key || this.keyPressed == e.keyCode || this.keyPressed == e.charCode) {
						cache.emit("up", e.key, e.keyCode, e.charCode);

						for (var i = pressedKeys.length - 1; i >= 0; i--) {
							if (pressedKeys[i]) {
								if (pressedKeys[i].key == e.key || pressedKeys[i].code == e.keyCode) {
									delete pressedKeys[i];
								}
							}
						}
					}
            	}
            	else{
					cache.emit("up", e.key, e.keyCode, e.charCode);
            	}
            });
		}

        /*	--------------------------------------------------- *\
        		[function] setKey(key)
        
        		* Set une nouvelle key *
        
        		Return: nil
        \*	--------------------------------------------------- */
        setKey(newKey : any){
			this.keyPressed = newKey;
        }

	}


    updateKeys();
    function updateKeys(){
        requestAnimationFrame(updateKeys);
        for (var i = pressedKeys.length - 1; i >= 0; i--) {
            if(pressedKeys[i]){
                pressedKeys[i].event.emit("down", pressedKeys[i].key, pressedKeys[i].code);
            }
        }
    }


    /*	--------------------------------------------------- *\
    		[class] Scroll()
    
    		* Mouse scroll *
    
    \*	--------------------------------------------------- */
    export class Scroll extends Events{

    	/*	--------------------------------------------------- *\
    			[function] constructor()
    	
    			* Quand on crée un event scroll *
    	
    			Return: nil
    	\*	--------------------------------------------------- */
    	constructor(){
			super();

			var cache = this;
			window.addEventListener("DOMMouseScroll", (e) => {
				if(e){
					if(e['detail'] && e['detail'] > 0){
						cache.emit("down");
					}
					else{
						cache.emit("up");
					}
					
				}
			});
    	}
    }

    // Prevent context menu
    window.addEventListener("contextmenu", (e) => {
        e.preventDefault();
    });
}