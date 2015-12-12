module Render{
	/*	--------------------------------------------------- *\
			[class] Sprite()
	
			* Crée une texture de type Sprite *
	
	\*	--------------------------------------------------- */
	export class Sprite extends Drawable{

		frameSize : any;
		frameAmount : number;
		currentFrame : number;
		currentInterval : any;
        frameLine: number;
        fps: number;
        freezed: boolean;
        loop: boolean;
        loopFinished: boolean;

		/*	--------------------------------------------------- *\
				[function] constructor(texture [optional : posX, posY, width, height, frameSizeX, frameSizeY, frameAmount, frameLine])
		
				* Quand on crée un sprite *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(texture:any, ...parameters : any[]){
			super(texture);
			this.sprite = true;
			this.currentFrame = 0;
			this.fps = 10;
            this.frameLine = parameters[7] || 0;
            this.position = { x: parameters[0], y: parameters[1] } || this.position;
            this.size = { width: parameters[2], height: parameters[3] } || this.size;
            this.frameSize = { width: parameters[4], height: parameters[5] };
            this.frameAmount = parameters[6] || 0;
            this.loop = false;
            this.loopFinished = false;


			var cache = this;
			this.currentInterval = setInterval(function(){
				var currentFrame = cache.getCurrentFrame();

				if(cache.loop){
					if (cache.loopFinished == false) {
						cache.setCurrentFrame(currentFrame += 1);
						if (currentFrame == cache.getFrameAmount() -1) {
							cache.loopFinished = true;
						}
					}
					else {
						// Animation not running cuz loop finished.
					}
				}
				else{
					cache.setCurrentFrame(currentFrame += 1);
				}

			}, 1000 / this.fps);
		}

		/*	--------------------------------------------------- *\
				[function] setFrameSize(width, height)
		
				* Set la taille d'une frame *
		
				Return: nil
		\*	--------------------------------------------------- */
		setFrameSize(width:number, height:number){
			this.frameSize = {width : width, height : height};
		}

		/*	--------------------------------------------------- *\
				[function] getFrameSize()
		
				* Retourne la taille d'une frame *
		
				Return: frameSize
		\*	--------------------------------------------------- */
		getFrameSize(){
			return this.frameSize;
		}

		/*	--------------------------------------------------- *\
				[function] setFrameAmount(frameAmount)
		
				* Set le nombre de frames dans la sprite *
		
				Return: nil
		\*	--------------------------------------------------- */
		setFrameAmount(frameAmount:number){
			this.frameAmount = frameAmount;
		}

		/*	--------------------------------------------------- *\
				[function] getFrameAmount()
		
				* Retourne le nombre de frames dans la sprite *
		
				Return: frameAmount
		\*	--------------------------------------------------- */
		getFrameAmount(){
			return this.frameAmount;
		}

		/*	--------------------------------------------------- *\
				[function] setCurrentFrame(frame)
		
				* Set la frame actuelle *
		
				Return: nil
		\*	--------------------------------------------------- */
		setCurrentFrame(frame:number){
			if(frame >= this.frameAmount){
				this.currentFrame = 0;	
			}
			else{
				this.currentFrame = frame;
			}
		}

		/*	--------------------------------------------------- *\
				[function] getCurrentFrame()
		
				* Retourne la frame actuelle *
		
				Return: frame
		\*	--------------------------------------------------- */
		getCurrentFrame():number{
			return this.currentFrame;
		}

		/*	--------------------------------------------------- *\
				[function] setFrameLine(line)
		
				* Set la ligne de la frame *
		
				Return: nil
		\*	--------------------------------------------------- */
		setFrameLine(line:number){
            this.frameLine = line;
		}

		/*	--------------------------------------------------- *\
				[function] getFrameLine()
		
				* Retourne la ligne de la frame *
		
				Return: line
		\*	--------------------------------------------------- */
		getFrameLine(){
            return this.frameLine;
		}

		/*	--------------------------------------------------- *\
				[function] setFrameSpeed(fps)
		
				* Set le nombre de frame par secondes *
		
				Return: nil
		\*	--------------------------------------------------- */
		setFrameSpeed(fps:number){
            this.fps = fps;

			var cache = this;
            clearInterval(this.currentInterval);
			this.currentInterval = setInterval(function(){
				var currentFrame = cache.getCurrentFrame();

				if(cache.loop){
					if (cache.loopFinished == false) {
						cache.setCurrentFrame(currentFrame += 1);
						if (currentFrame == cache.getFrameAmount() - 1) {
							cache.loopFinished = true;
						}
					}
					else {
						// Animation not running cuz loop finished.
					}
				}
				else{
					cache.setCurrentFrame(currentFrame += 1);
				}

			}, 1000/this.fps);
		}

		/*	--------------------------------------------------- *\
				[function] getFrameSpeed()
		
				* Retourne le nombre de frames par secondes *
		
				Return: fps
		\*	--------------------------------------------------- */
		getFrameSpeed(){
            return this.fps;
		}

        /*    --------------------------------------------------- *\
                [function] setFreeze()
        
                * Freeze la sprite sur une frame *
        
                Return: nil
        \*    --------------------------------------------------- */
        setFreeze(value : boolean){
            this.freezed = value;
            if(value){
                clearInterval(this.currentInterval);
            }
            else{
                this.setFrameSpeed(this.fps);
            }
        }

        /*	--------------------------------------------------- *\
        		[function] setUniqueLoop(boolean)
        
        		* Check/set une unique loop *
        
        		Return: true, false
        \*	--------------------------------------------------- */
        setUniqueLoop(loop:any){
			this.loop = loop;
        }

        /*	--------------------------------------------------- *\
        		[function] playUniqueLoop()
        
        		* Joue l'animation unique *
        
        		Return: nil
        \*	--------------------------------------------------- */
        playUniqueLoop(){
        	if(this.loop){
				this.loopFinished = false;
				this.setCurrentFrame(0);
        	}
        }

	}
}