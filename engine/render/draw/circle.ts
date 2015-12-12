module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Circle()
		
				* Dessiner un cercle *
		
		\*	--------------------------------------------------- */
		export class Circle extends Draw{

			radius: number;

			/*	--------------------------------------------------- *\
					[function] constructor([optional : position.x, position.y, radius])
			
					* Quand on crée un cercle *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(...parameters: any[]){
				super();
				this.shape = "circle";

				this.position.x = parameters[0] || this.position.x;
				this.position.y = parameters[1] || this.position.y;
				this.radius = parameters[2] || this.radius;

				this.setSize(this.getRadius() * 2, this.getRadius() * 2);
				
			}
			
			/*	--------------------------------------------------- *\
					[function] setRadius(radius)
			
					* Set le radius du cercle *
			
					Return: nil
			\*	--------------------------------------------------- */
			setRadius(radius:number){
				this.radius = radius;
			}

			/*	--------------------------------------------------- *\
					[function] getRadius()
			
					* Retourne le radius du cercle *
			
					Return: radius
			\*	--------------------------------------------------- */
			getRadius(){
				return this.radius;
			}
		}
	}
}