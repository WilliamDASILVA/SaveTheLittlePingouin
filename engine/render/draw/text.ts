module Render{
	export module Draw{
		/*	--------------------------------------------------- *\
				[class] Text()
		
				* Ecrire du texte *
		
		\*	--------------------------------------------------- */
		export class Text extends Draw{
			
			value: string;
			font: string;
			fontSize: number;
			fontStyle: string;
			baseLine: string;
			align: string;
			verticalAlign : string;
			isMultiline: boolean;

			/*	--------------------------------------------------- *\
					[function] constructor([optional : position.x, position.y, texte, width, height])
			
					* Quand on ecrit du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			constructor(...parameters:any[]){
				super();
				this.shape = "text";

				this.value = "";
				this.setFont("Arial");
				this.setFontSize(15);
				this.fontStyle = "normal";
				this.setBaseline("top");
				this.setAlign("start");
				this.setVerticalAlign("top");

				this.position.x = parameters[0] || this.position.x;
				this.position.y = parameters[1] || this.position.y;
				if(parameters[3] && parameters[4]){
					this.setSize(parameters[3], parameters[4]);
				}
				this.value = parameters[2] || this.value;

			}

			/*	--------------------------------------------------- *\
					[function] getValue()
			
					* Retourne la valeur du texte *
			
					Return: value
			\*	--------------------------------------------------- */
			getValue(){
				return this.value;
			}

			/*	--------------------------------------------------- *\
					[function] setValue(value)
			
					* Set la valeur du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setValue(value:string){
				this.value = value;
			}

			/*	--------------------------------------------------- *\
					[function] setFont(fontName)
			
					* Set la font du text *
			
					Return: nil
			\*	--------------------------------------------------- */
			setFont(fontName : string){
				this.font = fontName;
			}

			/*	--------------------------------------------------- *\
					[function] getFont()
			
					* Retourne la font du text *
			
					Return: font
			\*	--------------------------------------------------- */
			getFont(){
				return this.font;
			}

			/*	--------------------------------------------------- *\
					[function] setFontSize(size)
			
					* Set la taille du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setFontSize(fontSize : number){
				this.fontSize = fontSize;
			}

			/*	--------------------------------------------------- *\
					[function] getfontSize()
			
					* Retourne la taille du texte *
			
					Return: fontSize
			\*	--------------------------------------------------- */
			getFontSize(){
				return this.fontSize;
			}

			/*	--------------------------------------------------- *\
					[function] setFontStyle(style)
			
					* Set le style du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setFontStyle(style : string){
				this.fontStyle = style;
			}

			/*	--------------------------------------------------- *\
					[function] getFontStyle()
			
					* Retourne le style de la font *
			
					Return: style
			\*	--------------------------------------------------- */
			getFontStyle(){
				return this.fontStyle;
			}

			/*	--------------------------------------------------- *\
					[function] setBaseline(baseline)
			
					* Set la baseline du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setBaseline(baseline : string){
				this.baseLine = baseline;
			}

			/*	--------------------------------------------------- *\
					[function] getBaseline()
			
					* Retourne la baseline du texte *
			
					Return: baseline
			\*	--------------------------------------------------- */
			getBaseline(){
				return this.baseLine;
			}

			/*	--------------------------------------------------- *\
					[function] setAlign(alignment)
			
					* Set l'alignement du texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setAlign(alignment : string){
				this.align = alignment;
			}

			/*	--------------------------------------------------- *\
					[function] getAlign()
			
					* Retourne l'alignement *
			
					Return: align
			\*	--------------------------------------------------- */
			getAlign(){
				return this.align;
			}

			/*	--------------------------------------------------- *\
					[function] setVerticalAlign(alignment)
			
					* Set l'alignement vertical *
			
					Return: nil
			\*	--------------------------------------------------- */
			setVerticalAlign(alignement : string){
				this.verticalAlign = alignement;
			}

			/*	--------------------------------------------------- *\
					[function] getVerticalAlign()
			
					* Retourne l'alignement vertical *
			
					Return: verticalAlign
			\*	--------------------------------------------------- */
			getVerticalAlign(){
				return this.verticalAlign;
			}

			/*	--------------------------------------------------- *\
					[function] setMultiline(boolean)
			
					* Set le multi line sur le texte *
			
					Return: nil
			\*	--------------------------------------------------- */
			setMultiline(value : boolean){
				this.isMultiline = value;
			}
		}
	}
}