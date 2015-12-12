module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Rectangle()
		
				* Dessiner un rectangle *
		
		\*	--------------------------------------------------- */
		export class Rectangle extends Draw{
			
			/*	--------------------------------------------------- *\
					[function] constructor([optional : position.x, position.y, size.width, size.height, color])
			
					* Quand on crée un rectangle *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(...parameters: any[]){
				super();
				this.shape = "rectangle";

				this.position.x = parameters[0] || this.position.x;
				this.position.y = parameters[1] || this.position.y;

				this.size.width = parameters[2] || this.size.width;
				this.size.height = parameters[3] || this.size.height;
				this.setColor(parameters[4] || "#FFFFFF");
				
			}
		}
	}
}