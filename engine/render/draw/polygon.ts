module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Polygon()
		
				* Crée un polygone *
		
		\*	--------------------------------------------------- */
		export class Polygon extends Draw{
			
			vertices: any;

			/*	--------------------------------------------------- *\
					[function] constructor(vertices)
			
					* Quand on crée un polygone *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(vertices : any){
				super();
				this.shape = "polygon";
				this.vertices = vertices;

				// find width / height
				var xVertices = [];
				var yVertices = [];
				for (var i = 0; i < this.vertices.length; ++i) {
					xVertices.push(this.vertices[i].x);
					yVertices.push(this.vertices[i].y);
				}

				var xmin = Math.min.apply(null, xVertices);
				var xmax = Math.max.apply(null, xVertices);
				var ymin = Math.min.apply(null, yVertices);
				var ymax = Math.max.apply(null, yVertices);
				
				this.setSize(xmax - xmin, ymax - ymin);
			}

			/*	--------------------------------------------------- *\
					[function] getVertices()
			
					* Retourne toute les vertices *
			
					Return: vertices
			\*	--------------------------------------------------- */
			getVertices(){
				return this.vertices;
			}

			/*	--------------------------------------------------- *\
					[function] setVerticePosition(vertice, x, y)
			
					* Set the position of a specific vertice *
			
					Return: nil
			\*	--------------------------------------------------- */
			setVerticePosition(vertice : number, x : number, y : number){
				if(this.vertices[vertice]){
					this.vertices[vertice].x = x;
					this.vertices[vertice].y = y;
				}
			}
		}
	}
}