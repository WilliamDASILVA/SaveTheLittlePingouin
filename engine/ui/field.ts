module UI{
    
    var interfaceElement = document.createElement("div");
    interfaceElement.style.zIndex = "100";
    interfaceElement.style.position = "absolute";
    document.body.appendChild(interfaceElement);

	/*    --------------------------------------------------- *\
            [class] Field()
    
            * Crée un input *
    
    \*    --------------------------------------------------- */
    export class Field extends GUI{
        
        value: string;
        visibleValue: string;
        placeholder: string;
        focus: boolean;

        /*    --------------------------------------------------- *\
                [function] constructor()
        
                * Quand on crée un field *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(x :number, y : number, width : number, height : number, ...rest : any[]){
            super();
            this.guiType = "field";
            this.isHTML = true;

            this.htmlElement = document.createElement("input");
            interfaceElement.appendChild(this.htmlElement);


            if (rest[0]) {
                this.setParent(rest[0]);
            }
            this.setPosition(x, y);
            this.setSize(width, height);
            this.setValue("");
            this.setPlaceholder("");

        }

        /*    --------------------------------------------------- *\
                [function] isFocused(boolean)
        
                * Check / set si l'input est focus *
        
                Return: true, false
        \*    --------------------------------------------------- */
        isFocused(bool : any){
            if(bool == true || bool == false){
                this.focus = bool;
            }
            else{
                return this.focus;
            }
        }

        /*    --------------------------------------------------- *\
                [function] setValue(value)
        
                * Set la valeur du input *
        
                Return: nil
        \*    --------------------------------------------------- */
        setValue(value:string){
            this.value = value;
            if(this.isHTML){
                this.htmlElement.value = value;
            }
        }

        /*    --------------------------------------------------- *\
                [function] getValue()
        
                * Retourne la valeur de l'input *
        
                Return: value
        \*    --------------------------------------------------- */
        getValue(){
            if(this.isHTML){
                var htmlValue = this.htmlElement.value;
                if(htmlValue != this.value){
                    this.setValue(htmlValue);
                }
            }

            return this.value;
        }

        /*    --------------------------------------------------- *\
                [function] setPlaceholder(placeholder)
        
                * Set le placeholder sur l'input *
        
                Return: nil
        \*    --------------------------------------------------- */
        setPlaceholder(placeholder : string){
            this.placeholder = placeholder;
            if(this.isHTML){
                this.htmlElement.placeholder = placeholder;
            }
        }


    }
}