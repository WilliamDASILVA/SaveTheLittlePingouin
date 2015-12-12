module Render {
	
	var image_prefix = "./";

	/*	--------------------------------------------------- *\
			[class] Texture()
	
			* Create an image element *
	
	\*	--------------------------------------------------- */
	export class Texture {
		src: string;
		data: any;

		/*	--------------------------------------------------- *\
				[function] constructor()
		
				* Quand on crée une texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		constructor(src: string) {
			this.src = image_prefix + src;
			this.data = new Image();
			this.data.src = image_prefix + src;
		}

		/*	--------------------------------------------------- *\
				[function] getData()
		
				* Retourne l'image *
		
				Return: data
		\*	--------------------------------------------------- */
		getData() {
			if (this.data) {
				return this.data;
			}
			else {
				return false;
			}
		}

		/*	--------------------------------------------------- *\
				[function] setSrc(src)
		
				* Set une nouvelle src pour la texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		setSrc(src: string) {
			this.data.src = image_prefix + src;
			this.src = image_prefix + src;
		}

		/*	--------------------------------------------------- *\
				[event] onLoad()
		
				* Quand la texture est chargé *
		
		\*	--------------------------------------------------- */
		onLoad(functionToCall: any) {
            var func = functionToCall;
            var texture = this;
            this.getData().addEventListener("load", function() {
                func(texture);
            });
		}
	}
}