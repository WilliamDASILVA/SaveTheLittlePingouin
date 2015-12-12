module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Point()
		
				* Dessine un point *
		
		\*	--------------------------------------------------- */
		export class Point extends Draw{
			
			/*	--------------------------------------------------- *\
					[function] constructor()
			
					* Quand on dessine un point *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(x : number, y : number){
				super();

				this.setPosition(x, y);
				this.setColor("#000000");
				this.shape = "point";
				this.setStrokeSize(1);
			}
		}
	}
}