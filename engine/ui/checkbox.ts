module UI{
	/*    --------------------------------------------------- *\
            [class] Checkbox()
    
            * Créer un checkbox *
    
    \*    --------------------------------------------------- */
    export class Checkbox extends GUI{

        checked: boolean;
        functionsToCallWhenCheck: any;
        
        /*    --------------------------------------------------- *\
                [function] constructor(x, y, width, height)
        
                * Quand on crée un checkbox *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(x : number, y : number, width : number, height : number, ...rest : any[]){
            super();
            this.guiType = "checkbox";

            if (rest[0]) {
                this.setParent(rest[0]);
            }
            this.setPosition(x, y);
 
            this.setSize(width, height);

            this.checked = false;
            this.functionsToCallWhenCheck = [];

            var position = this.getPosition(false);
            this.renderElements[0] = new Render.Draw.Rectangle(position.x, position.y, width, height, "rgba(0,0,0,0.1)");
            this.renderElements[0].setDepth(10);
            for (var i = 0; i < this.renderElements.length; ++i) {
                interfaceCanvas.set(this.renderElements[i]);
            }

            // Event
            this.click(() => {
                if(this.isChecked()){
                    this.setCheck(false);
                }
                else{
                    this.setCheck(true);

                }

                for (var i = this.functionsToCallWhenCheck.length - 1; i >= 0; i--) {
                    this.functionsToCallWhenCheck[i](this.isChecked());
                }
            });

        }

        /*    --------------------------------------------------- *\
                [function] isChecked()
        
                * Retourne si le checkbox est checké ou non *
        
                Return: true, false
        \*    --------------------------------------------------- */
        isChecked():boolean{
            return this.checked;
        }

        /*    --------------------------------------------------- *\
                [function] setCheck(boolean)
        
                * Set le checkbox a true ou false *
        
                Return: nil
        \*    --------------------------------------------------- */
        setCheck(bool:boolean){
            this.checked = bool;
        }

        /*    --------------------------------------------------- *\
                [function] check()
        
                * Quand l'utilisateur check le checkbox *
        
                Return: nil
        \*    --------------------------------------------------- */
        check(functionToCall:any){
            this.functionsToCallWhenCheck.push(functionToCall);
        }
    }
}