module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Draw()
		
				* Dessiner une forme *
		
		\*	--------------------------------------------------- */
		export class Draw extends Drawable{
			
			color: string;
			strokeSize: number;
			strokeColor: string;
			shape: string;

			shadowEnabled: boolean;
			shadowColor: string;
			shadowBlur: number;
			shadowPosition: any;

			/*	--------------------------------------------------- *\
					[function] constructor()
			
					* Quand on crée un Draw *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(){
				super(null);

				this.type = "draw";
				this.shape = null;
				this.strokeSize = 0;
				this.color = "#000";

				this.shadowEnabled = false;
				this.shadowColor = "#000000";
				this.shadowBlur = 0;
				this.shadowPosition = { x: 0, y: 0 };
			}

			/*	--------------------------------------------------- *\
					[function] setColor(hexdecimal)
			
					* Set la couleur de la forme *
			
					Return: nil
			\*	--------------------------------------------------- */
			setColor(color:string){
				this.color = color;
			}

			/*	--------------------------------------------------- *\
					[function] getColor()
			
					* Get la couleur de la forme *
			
					Return: color
			\*	--------------------------------------------------- */
			getColor(){
				return this.color;
			}

			/*	--------------------------------------------------- *\
					[function] setStrokeSize(size)
			
					* Set la taille de la bordure *
			
					Return: nil
			\*	--------------------------------------------------- */
			setStrokeSize(size: number){
				this.strokeSize = size;
			}

			/*	--------------------------------------------------- *\
					[function] getStrokeSize()
			
					* Retourne la taille de la bordure *
			
					Return: strokeSize
			\*	--------------------------------------------------- */
			getStrokeSize(){
				return this.strokeSize;
			}

			/*	--------------------------------------------------- *\
					[function] setStrokeColor(color)
			
					* Set la couleur de la bordure *
			
					Return: nil
			\*	--------------------------------------------------- */
			setStrokeColor(color:string){
				this.strokeColor = color;
			}

			/*	--------------------------------------------------- *\
					[function] getStrokeColor()
			
					* Retourne la couleur de la bordure *
			
					Return: color
			\*	--------------------------------------------------- */
			getStrokeColor(){
				return this.strokeColor;
			}

			/*	--------------------------------------------------- *\
					[function] getShape()
			
					* Retourne le type de forme *
			
					Return: shape
			\*	--------------------------------------------------- */
			getShape(){
				return this.shape;
			}

			/*	--------------------------------------------------- *\
					[function] setShadow(value)
			
					* Set un shadow ou non *
			
					Return: nil
			\*	--------------------------------------------------- */
			setShadow(value : boolean){
				this.shadowEnabled = value;
			}

			/*	--------------------------------------------------- *\
					[function] isShadowEnabled()
			
					* Retourne si le shadow est activé *
			
					Return: true, false
			\*	--------------------------------------------------- */
			isShadowEnabled(){
				return this.shadowEnabled;
			}

			/*	--------------------------------------------------- *\
					[function] setShadowColor(color)
			
					* Set la couleur de la shadow *
			
					Return: nil
			\*	--------------------------------------------------- */
			setShadowColor(color : string){
				this.shadowColor = color;
			}

			/*	--------------------------------------------------- *\
					[function] getShadowColor()
			
					* Retourne la couleur de la shadow *
			
					Return: color
			\*	--------------------------------------------------- */
			getShadowColor(){
				return this.shadowColor;
			}

			/*	--------------------------------------------------- *\
					[function] setShadowBlur(size)
			
					* Set la taille du blur du shadow *
			
					Return: nil
			\*	--------------------------------------------------- */
			setShadowBlur(size : number){
				this.shadowBlur = size;
			}

			/*	--------------------------------------------------- *\
					[function] getShadowBlur()
			
					* Retourne le blur du shadow *
			
					Return: nil
			\*	--------------------------------------------------- */
			getShadowBlur(){
				return this.shadowBlur;
			}

			/*	--------------------------------------------------- *\
					[function] setShadowPosition(x, y)
			
					* Set la position du shadow *
			
					Return: nil
			\*	--------------------------------------------------- */
			setShadowPosition(x : number, y : number){
				this.shadowPosition = { x: x, y: y };
			}

			/*	--------------------------------------------------- *\
					[function] getShadowPosition()
			
					* Retourne la position du shadow *
			
					Return: position
			\*	--------------------------------------------------- */
			getShadowPosition(){
				return this.shadowPosition;
			}
		}
	}
}