module Render{
	/*	--------------------------------------------------- *\
			[class] Drawable()
	
			* Crée un element drawable a un emplacement donnée *
	
	\*	--------------------------------------------------- */
	export class Drawable{
		texture : any;
        position: any;
		size : any;
		depth : number;
		rotation : number;
		sprite : boolean;
		opacity : number;
		fixed : boolean;
        type: string;
        flipped: boolean;
        fixedToCenter: boolean;
        rotationPoint: any;
        visible: boolean;
        layout: any;
        smooth: boolean;
        offset: any;
        haveCrop: boolean;
        crop: any;

		/*	--------------------------------------------------- *\
				[function] constructor(texture, x, y, width, height)
		
				* Quand une texture est crée *
		
				Return: true, false
		\*	--------------------------------------------------- */
		constructor(texture:any, ...parameters  : any[]){
			this.texture = texture;
			if(texture == null){
				this.setSize(0, 0);
			}
			else{
				this.setSize(texture.getData().width, texture.getData().height);
			}

            this.setPosition(0, 0);
			if(parameters[0] != null && parameters[1] != null){
				this.setPosition(parameters[0], parameters[1]);
			}

			if(parameters[2] != null && parameters[3] != null){
				this.setSize(parameters[2], parameters[3]);
			}


			this.depth = 0;
			this.rotation = 0;
            this.opacity = 1;
            this.type = "drawable";
            this.flipped = false;
            this.fixedToCenter = true;
            this.rotationPoint = { x: 0, y: 0 };
            this.visible = true;
            this.smooth = true;
            this.offset = { x: 0, y: 0 };
            this.haveCrop = false;
            this.crop = { x: 0, y: 0, width: this.size.width, height: this.size.height };
		}

		/*	--------------------------------------------------- *\
				[function] isCropped()
		
				* Check if the element is cropped *
		
				Return: true, false
		\*	--------------------------------------------------- */
		isCropped(){
			return this.haveCrop;
		}

		/*	--------------------------------------------------- *\
				[function] setCrop(x,y, width, height)
		
				* Set the crop area *
		
				Return: nil
		\*	--------------------------------------------------- */
		setCrop(x : number, y : number, width : number, height : number){
			this.haveCrop = true;
			this.crop = { x: x, y: y, width: width, height: height };
		}

		/*	--------------------------------------------------- *\
				[function] getCrop()
		
				* Return the crop area *
		
				Return: crop
		\*	--------------------------------------------------- */
		getCrop(){
			return this.crop;
		}

		/*	--------------------------------------------------- *\
				[function] getOffset()
		
				* Return the offset *
		
				Return: x, y
		\*	--------------------------------------------------- */
		getOffset(){
			return this.offset;
		}

		/*	--------------------------------------------------- *\
				[function] setOffset(x, y)
		
				* Set the offset *
		
				Return: true, false
		\*	--------------------------------------------------- */
		setOffset(x, y){
			this.offset = { x: x, y: y };
		}

		/*	--------------------------------------------------- *\
				[function] setPosition(x, y)
		
				* Set la position de la texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		setPosition(x:number, y : number){
			this.position = {x : x, y : y};
		}

		/*	--------------------------------------------------- *\
				[function] getPosition()
		
				* Retourne la position de la texture *
		
				Return: position
		\*	--------------------------------------------------- */
		getPosition(){
			return this.position;
		}

		/*	--------------------------------------------------- *\
				[function] getSize()
		
				* Retourne la taille de la texture *
		
				Return: size
		\*	--------------------------------------------------- */
		getSize(){
			return this.size;
		}

		/*	--------------------------------------------------- *\
				[function] setSize(width, height)
		
				* Set la taille de la texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		setSize(width:number, height:number){
			this.size = {width : width, height : height};
		}

		/*	--------------------------------------------------- *\
				[function] getData()
		
				* Retourne la texture en elle même *
		
				Return: image
		\*	--------------------------------------------------- */
		getData(){
			if(this.texture === null){
				return false;
			}
			else{
				return this.texture.getData();
			}
		}

		/*	--------------------------------------------------- *\
				[function] getDepth()
		
				* Retourne la profondeur de champ *
		
				Return: depth
		\*	--------------------------------------------------- */
		getDepth(){
			return this.depth;
		}

		/*	--------------------------------------------------- *\
				[function] setDepth(depth)
		
				* Set la profondeur de champ *
		
				Return: nil
		\*	--------------------------------------------------- */
		setDepth(depth:number){
			this.depth = depth;
		}

		/*	--------------------------------------------------- *\
				[function] setRotation(angle)
		
				* Set la rotation de la texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		setRotation(angle:number){
			this.rotation = angle;
		}

		/*	--------------------------------------------------- *\
				[function] getRotation()
		
				* Retourne la rotation *
		
				Return: rotation
		\*	--------------------------------------------------- */
		getRotation(){
			return this.rotation;
		}

		/*	--------------------------------------------------- *\
				[function] getOpacity()
		
				* Retourne l'opacity *
		
				Return: opacity
		\*	--------------------------------------------------- */
		getOpacity(){
			return this.opacity;
		}

		/*	--------------------------------------------------- *\
				[function] setOpacity(opacity)
		
				* Set l'opacité de la texture *
		
				Return: nil
		\*	--------------------------------------------------- */
		setOpacity(opacity:number){
			this.opacity = opacity;
		}

		/*	--------------------------------------------------- *\
				[function] isSprite()
		
				* Retourne si la texture est partielle ou complète *
		
				Return: true, false
		\*	--------------------------------------------------- */
		isSprite(sprite:boolean){
			if(sprite == true || sprite == false){
				this.sprite = sprite;
			}
			else{
				return this.sprite;
			}
		}

		/*	--------------------------------------------------- *\
				[function] setFixed()
		
				* Set la texture fixé à l'écran *
		
				Return: nil
		\*	--------------------------------------------------- */
		setFixed(isFixed:boolean){
			this.fixed = isFixed;
		}

		/*	--------------------------------------------------- *\
				[function] isFixed()
		
				* Check si la texture est fixé a l'écran *
		
				Return: true, false
		\*	--------------------------------------------------- */
		isFixed(){
			return this.fixed;
		}

		 /*    --------------------------------------------------- *\
	            [function] setType(type)
	    
	            * Set le type de l'element *
	    
	            Return: nil
	    \*    --------------------------------------------------- */
	    setType(type:string){
	        this.type = type;
	    }

	    /*    --------------------------------------------------- *\
	            [function] getType()
	    
	            * Retourne le type de l'element *
	    
	            Return: type
	    \*    --------------------------------------------------- */
	    getType(){
	        return this.type;
	    }

	    /*	--------------------------------------------------- *\
        		[function] isFlipped(boolean)
        
        		* Check/set si l'element est verticalement inversé *
        
        		Return: true, false
        \*	--------------------------------------------------- */
        isFlipped(value:boolean){
        	if(value == true || value == false){
                this.flipped = value;
        	}
        	else{
                return this.flipped;
        	}
        }

        /*    --------------------------------------------------- *\
                [function] setRotationPoint(x, y)
        
                * Set le point de rotation du drawable *
        
                Return: nil
        \*    --------------------------------------------------- */
        setRotationPoint(x : number, y : number){
            this.fixedToCenter = false;
            this.rotationPoint = { x: x, y: y };
        }

        /*    --------------------------------------------------- *\
                [function] getRotationPoint()
        
                * Retourne le point de rotation du drawable *
        
                Return: rotationPoint
        \*    --------------------------------------------------- */
        getRotationPoint(){
            return this.rotationPoint;
        }

        /*	--------------------------------------------------- *\
        		[function] isVisible()
        
        		* Check si le drawable est visible *
        
        		Return: true, false
        \*	--------------------------------------------------- */
        isVisible(){
			return this.visible;
        }

        /*	--------------------------------------------------- *\
        		[function] setVisibl(value)
        
        		* Set ou non le drawable en visible *
        
        		Return: nil
        \*	--------------------------------------------------- */
        setVisible(value : boolean){
			this.visible = value;
        }

        /*	--------------------------------------------------- *\
        		[function] setLayout(layout)
        
        		* Set le layout du drawable *
        
        		Return: nil
        \*	--------------------------------------------------- */
        setLayout(layout : any){
			this.layout = layout;
        }

        /*	--------------------------------------------------- *\
        		[function] setSmooth(boolean)
        
        		* Set si le drawable est smooth ou pixelated *
        
        		Return: nil
        \*	--------------------------------------------------- */
        setSmooth(value : boolean){
			this.smooth = value;
        }

        /*	--------------------------------------------------- *\
        		[function] isSmooth()
        
        		* Retourne si le drawable est smooth ou pas *
        
        		Return: true, false
        \*	--------------------------------------------------- */
        isSmooth(){
			return this.smooth;
        }

	}
}