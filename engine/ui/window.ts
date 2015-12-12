module UI{
	/*    --------------------------------------------------- *\
            [class] Window()
    
            * Crée une fenetre *
    
    \*    --------------------------------------------------- */
    export class Window extends GUI{

        /*    --------------------------------------------------- *\
                [function] constructor()
        
                * Quand on crée une fenetre *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(x : number, y : number, width : number, height : number){
            super();
            this.guiType = "window";

            this.setPosition(x, y);
            this.setSize(width, height);

            var position = this.getPosition(false);
            this.renderElements[0] = new Render.Draw.Rectangle(position.x, position.y, width, height, "rgba(255,255,255,1)");

            for (var i = 0; i < this.renderElements.length; ++i) {
                interfaceCanvas.set(this.renderElements[i]);
            }
        }
    }
}