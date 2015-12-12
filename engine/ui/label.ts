module UI{
	/*    --------------------------------------------------- *\
            [class] Label()
    
            * Crée un label *
    
    \*    --------------------------------------------------- */
    export class Label extends GUI{
        
        value: string;

        /*    --------------------------------------------------- *\
                [function] constructor()
        
                * Quand on crée un label *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(x : number, y : number, width : number, height : number, text :string, ...rest : any[]){
            super();
            this.guiType = "label";

            if (rest[0]) {
                this.setParent(rest[0]);
            }

            this.setSize(width, height);
            this.setPosition(x, y);
            this.value = text;

            var position = this.getPosition(false);
            this.renderElements[0] = new Render.Draw.Text(position.x, position.y, this.value, width, height);
            this.renderElements[0].setDepth(10);
            this.renderElements[0].setMultiline(true);
            for (var i = 0; i < this.renderElements.length; ++i) {
                interfaceCanvas.set(this.renderElements[i]);
            }
        }

        /*    --------------------------------------------------- *\
                [function] setValue(value)
        
                * Set la valeur du label *
        
                Return: nil
        \*    --------------------------------------------------- */
        setValue(value:string){
            this.value = value;
            this.renderElements[0].setValue(this.value);
        }

        /*    --------------------------------------------------- *\
                [function] getValue()
        
                * Retourne la valeur du label *
        
                Return: value
        \*    --------------------------------------------------- */
        getValue():string{
            return this.value;
        }

        /*    --------------------------------------------------- *\
                [function] setFontSize(size)
        
                * Set la taille de la font *
        
                Return: nil
        \*    --------------------------------------------------- */
        setFontSize(size : number){
            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                this.renderElements[i].setFontSize(size);
            }
        }

        /*    --------------------------------------------------- *\
                [function] setFontStyle(style)
        
                * Set le style de la font *
        
                Return: nil
        \*    --------------------------------------------------- */
        setFontStyle(style : string){
            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                this.renderElements[i].setFontStyle(style);
            }
        }

        /*    --------------------------------------------------- *\
                [function] setFont(fontName)
        
                * Set la font du text *
        
                Return: nil
        \*    --------------------------------------------------- */
        setFont(fontName : string){
            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                this.renderElements[i].setFont(fontName);
            }
        }

        /*    --------------------------------------------------- *\
                [function] setBaseline(baseline)
        
                * Set la baseline du texte *
        
                Return: nil
        \*    --------------------------------------------------- */
        setBaseline(baseline : string){
            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                this.renderElements[i].setBaseline(baseline);
            }
        }

        /*    --------------------------------------------------- *\
                [function] setAlign(alignment)
        
                * Set l'alignement du texte *
        
                Return: nil
        \*    --------------------------------------------------- */
        setAlign(alignment : string){
            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                this.renderElements[i].setAlign(alignment);
            }
        }

    }
}