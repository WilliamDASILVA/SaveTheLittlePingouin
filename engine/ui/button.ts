module UI{
	/*    --------------------------------------------------- *\
            [class] Button()
    
            * Crée un button *
    
    \*    --------------------------------------------------- */
    export class Button extends GUI{
        
        value: string;

        /*    --------------------------------------------------- *\
                [function] constructor(x, y, width, height, [optional : parent])
        
                * Quand on crée un button *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(x: number, y: number, width: number, height: number, ...rest: any[]) {
            super();
            this.guiType = "button";

            if (rest[0]) {
                this.setParent(rest[0]);
            }
            this.setPosition(x, y);

            this.setSize(width, height);
            this.value = "";

            var position = this.getPosition(false);
            this.renderElements[0] = new Render.Draw.Rectangle(position.x, position.y, width, height, "rgba(255,255,255,1)");
            this.renderElements[0].setShadow(true);
            this.renderElements[0].setShadowColor("rgba(0,0,0,0.3)");
            this.renderElements[0].setShadowBlur(10);
            this.renderElements[0].setDepth(1);
            this.renderElements[1] = new Render.Draw.Text(position.x, position.y, this.value, width, height);
            this.renderElements[1].setAlign("center");
            this.renderElements[1].setVerticalAlign("middle");
            this.renderElements[1].setFontStyle("bold");
            this.renderElements[1].setDepth(2);

            for (var i = 0; i < this.renderElements.length; ++i) {
                interfaceCanvas.set(this.renderElements[i]);
            }
            
        }

        /*    --------------------------------------------------- *\
                [function] setValue(value)
        
                * Set le texte à l'intérieur du button *
        
                Return: nil
        \*    --------------------------------------------------- */
        setValue(value : string){
            this.value;
            this.renderElements[1].setValue(value);
        }

        /*    --------------------------------------------------- *\
                [function] getValue()
        
                * Retourne la valeur dans le button *
        
                Return: value
        \*    --------------------------------------------------- */
        getValue(){
            return this.value;
        }

        /*    --------------------------------------------------- *\
                [function] setBackgroundColor(color)
        
                * Set la couleur de l'arrière plan *
        
                Return: nil
        \*    --------------------------------------------------- */
        setBackgroundColor(color : string){
            this.renderElements[0].setColor(color);
        }

    }
}