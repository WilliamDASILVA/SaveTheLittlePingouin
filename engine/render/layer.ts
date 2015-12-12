module Render{
    var layers = [];

    /*    --------------------------------------------------- *\
            [class] Layer()
    
            * Crée un layer *
    
    \*    --------------------------------------------------- */
    export class Layer{
        
        canvasElement: any;
        context: any;
        elements: any;
        smooth: boolean;
        affectedByCamera: boolean;

        /*    --------------------------------------------------- *\
                [function] constructor()
        
                * Quand on crée un layer *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(){
            this.elements = [];

            this.canvasElement = document.createElement("canvas");
            this.context = this.canvasElement.getContext("2d");

            this.canvasElement.width = window.innerWidth;
            this.canvasElement.height = window.innerHeight;

            document.body.appendChild(this.canvasElement);

            this.render();

            this.smooth = true;
            this.affectedByCamera = false;

            layers.push(this);
        }

        render(){
            Render.updateRender(this);
            window.requestAnimationFrame(() => {
                this.render();
            });
        }

        /*    --------------------------------------------------- *\
                [function] set()
        
                * Set un element dans le layout *
        
                Return: nil
        \*    --------------------------------------------------- */
        set(element : any){
            this.elements.push(element);
        }

        /*    --------------------------------------------------- *\
                [function] del()
        
                * Delete un element du layout *
        
                Return: nil
        \*    --------------------------------------------------- */
        del(element : any){
            for (var i = this.elements.length - 1; i >= 0; i--) {
                if(this.elements[i] == element){
                    this.elements[i].setVisible(false);
                    delete this.elements[i];
                }
            }
        }

        /*    --------------------------------------------------- *\
                [function] getContext()
        
                * Retourne le context du layer *
        
                Return: context
        \*    --------------------------------------------------- */
        getContext(){
            return this.context;
        }

        /*    --------------------------------------------------- *\
                [function] getCanvas()
        
                * Retourne le canvas du layer *
        
                Return: canvas
        \*    --------------------------------------------------- */
        getCanvas(){
            return this.canvasElement;
        }

        /*    --------------------------------------------------- *\
                [function] getElements()
        
                * Retourne la liste de tous les elementsn *
        
                Return: elements
        \*    --------------------------------------------------- */
        getElements(){
            return this.elements;
        }

        /*    --------------------------------------------------- *\
                [function] setSmooth(value)
        
                * Set toute le canvas en smooth ou pixelated *
        
                Return: nil
        \*    --------------------------------------------------- */
        setSmooth(value : boolean){
            this.smooth = value;
        }

        /*    --------------------------------------------------- *\
                [function] isSmooth()
        
                * Retourne si le canvas est smooth ou pixelated *
        
                Return: true, false
        \*    --------------------------------------------------- */
        isSmooth(){
            return this.smooth;
        }
    }
}