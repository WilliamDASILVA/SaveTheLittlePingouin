module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Line()
		
				* Dessiner une ligne *
		
		\*	--------------------------------------------------- */
		export class Line extends Draw{

			target: any;
			
			/*	--------------------------------------------------- *\
					[function] constructor([optional : position.x, position.y, target.x, target.y])
			
					* Quand on crée une ligne *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(...parameters : any[]){
				super();

				this.target = { x: null, y: null };
				this.shape = "line";

				this.position.x = parameters[0] || this.position.x;
				this.position.y = parameters[1] || this.position.y;
				this.target.x = parameters[2] || this.target.x;
				this.target.y = parameters[3] || this.target.y;
			}

			/*	--------------------------------------------------- *\
					[function] setTarget(x, y)
			
					* Set la fin de la ligne *
			
					Return: nil
			\*	--------------------------------------------------- */
			setTarget(x : number, y : number){
				this.target = { x: x, y: y };
			}

			/*	--------------------------------------------------- *\
					[function] getTarget()
			
					* Retourne la position de la fin de la ligne *
			
					Return: target
			\*	--------------------------------------------------- */
			getTarget(){
				return this.target;
			}

		}
	}
}