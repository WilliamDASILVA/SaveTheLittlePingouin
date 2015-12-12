module UI{
	/*    --------------------------------------------------- *\
            [class] GUI()
    
            * Crée une GUI *
    
    \*    --------------------------------------------------- */
    export class GUI extends Render.Draw.Draw{

        childrens: any;
        parent: any;
        renderElements: any;
        events: any;
        functionsToCall: any;
        functionsToCallWhenOut: any;
        relativePosition: any;
        absolutePosition: any;
        guiType: string;
        isHTML: boolean;
        htmlElement: any;

        /*    --------------------------------------------------- *\
                [function] constructor()
        
                * Quand on crée un GUI *
        
                Return: nil
        \*    --------------------------------------------------- */
        constructor(){
            super();

            this.isHTML = false;
            this.htmlElement = null;
            this.renderElements = [];
            this.parent = null;
            this.childrens = [];
            this.events = {};
            this.functionsToCall = {};
            this.functionsToCallWhenOut = {};
            this.guiType = null;

            // Gestion de l'absolute & relative position
            this.relativePosition = { x: 0, y: 0 };
            this.absolutePosition = { x: 0, y: 0 };

            var position = this.getPosition(false);
            var size = this.getSize();


            // Events
            // Click
            this.functionsToCall.click = [];
            this.functionsToCallWhenOut.click = [];
            var cache = this;
            this.events.click = new Input.Click(position.x, position.y, size.width, size.height);
            this.events.click.on("click", () => {
                for (var i = 0; i < this.functionsToCall.click.length; ++i) {
                    this.functionsToCall.click[i]();
                }
            });

            this.events.click.on("out", () => {
                for (var z = 0; z < this.functionsToCallWhenOut.click.length; ++z) {
                    this.functionsToCallWhenOut.click[z]();
                }
            });
            
            // Hover
            this.functionsToCall.hover = [];
            this.events.hover = new Input.MouseMove();
            this.events.hover.on("move", (posX, posY) => {
                var position = cache.getPosition(false);
                var size = cache.getSize();
                if(posX >= position.x && posY >= position.y && posX <= position.x + size.width && posY <= position.y + size.height){
                    for (var k = 0; k < this.functionsToCall.hover.length; ++k) {
                        this.functionsToCall.hover[k]();
                    }
                }
            });

            // leave
            this.functionsToCall.leave = [];
            this.events.leave = new Input.MouseMove();
            this.events.leave.on("move", (posX, posY) => {
                var position = cache.getPosition(false);
                var size = cache.getSize();
                if(!(posX >= position.x && posY >= position.y && posX <= position.x + size.width && posY <= position.y + size.height)){
                    for (var k = 0; k < this.functionsToCall.leave.length; ++k) {
                        this.functionsToCall.leave[k]();
                    }
                }
            });
        }

        /*    --------------------------------------------------- *\
                [function] setParent(parentElement)
        
                * Set un parent à l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setParent(parentElement: any){
            this.parent = parentElement;
            this.parent.setChildren(this);
        }

        /*    --------------------------------------------------- *\
                [function] getParent()
        
                * Retourne l'element parent *
        
                Return: parent
        \*    --------------------------------------------------- */
        getParent(){
            return this.parent;
        }

        /*    --------------------------------------------------- *\
                [function] setPosition(x, y)
        
                * Set la position de l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setPosition(x: number, y: number){

            if(!this.isHTML){

                // Check si l'element a un parent
                if(this.getParent()){
                    // Il a un parent, on suppose que la position set est relative au parent
                    var parent = this.getParent();
                    var parentPosition = parent.getPosition(false);

                    this.relativePosition = { x: x, y: y };
                    this.absolutePosition = { x: parentPosition.x + x, y: parentPosition.y + y };
                }
                else{
                    // L'element n'a pas de parent, on suppose donc que sa position est relative à l'écran.
                    // Ce qui veut dire qu'il a la même relative/absolute position.
                    this.relativePosition = { x: x, y: y };
                    this.absolutePosition = { x: x, y: y };
                }

                /*if(parameters[0] == true){
                    this.relativePosition = { x: x, y: y };
                }
                else if(parameters[0] == false){
                    this.absolutePosition = { x: x, y: y };
                }*/
                

                for (var i in this.events) {
                    var position = this.getPosition(false);
                    this.events[i].x = position.x;
                    this.events[i].y = position.y;
                }

                // move render elements
                /*if(this.renderElements){
                    for (var k = 0; k < this.renderElements.length; ++k) {
                        //var newPosition = this.getPosition();
                        this.renderElements[k].setPosition(x, y);
                    }
                }*/

                // childrens
                /*if(this.childrens){
                    for (var z = this.childrens.length - 1; z >= 0; z--) {
                        var childPosition = this.childrens[z].getPosition();
                        this.childrens[z].setPosition(x + childPosition.x, y + childPosition.y, false);
                    }
                }*/
            }
            else{
                this.htmlElement.style.position = "absolute";
                this.htmlElement.style.top = y +"px";
                this.htmlElement.style.left = x +"px";
                           
            }
        }

        /*    --------------------------------------------------- *\
                [function] getPosition(relative(true) /  absolute (false))
        
                * Retourne la position absolute ou relative *
        
                Return: position
        \*    --------------------------------------------------- */
        getPosition(...type : boolean[]){
            if(type[0] == true){
                return this.relativePosition;
            }
            else if(type[0] == false){
                return this.absolutePosition;
            }
        }

        /*    --------------------------------------------------- *\
                [function] setSize(width, height)
        
                * Set la taille de l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setSize(width : number, height : number){
            this.size = {width : width, height : height};

            for (var i in this.events) {
                this.events[i].width = width;
                this.events[i].height = height;
            }

            if(this.isHTML){
                this.htmlElement.style.width = width+"px";
                this.htmlElement.style.height = height+"px";
            }
        }

          /*    --------------------------------------------------- *\
                [function] setChildren(child)
        
                * Set un enfant a l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setChildren(child:any){
            this.childrens.push(child);
        }

        /*    --------------------------------------------------- *\
                [function] getChildrens()
        
                * Retourne la liste des enfants *
        
                Return: childrens
        \*    --------------------------------------------------- */
        getChildrens(){
            return this.childrens;
        }

        /*    --------------------------------------------------- *\
                [function] getElements()
        
                * Retourne tous les elements qui constituent cet UI *
        
                Return: elements
        \*    --------------------------------------------------- */
        getElements(){
            return this.renderElements;
        }

        /*    --------------------------------------------------- *\
                [function] isVisibile()
        
                * Check si l'element est visible ou pas *
        
                Return: nil
        \*    --------------------------------------------------- */
        isVisible(){
            var isVisible = false;

            for (var i = this.renderElements.length - 1; i >= 0; i--) {
                if(isVisible != this.renderElements.visible){
                    return !isVisible;
                }
            }
            return isVisible;
        }

        /*    --------------------------------------------------- *\
                [function] setDepth(depth)
        
                * Set la profondeur de l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setDepth(depth : number){
            for (var i = 0; i < this.getElements().length; i++) {
                this.getElements()[i].setDepth(depth + i);
            };
        }

        /*    --------------------------------------------------- *\
                [function] setOpacity(opacity)
        
                * Set l'opacité de l'element *
        
                Return: nil
        \*    --------------------------------------------------- */
        setOpacity(opacity : number){
            for (var i = 0; i < this.getElements().length; i++) {
                this.getElements()[i].setOpacity(opacity);
            };

            // set also for the parents
            var childrens = this.getChildrens();
            for (var i = 0; i < childrens.length; i++) {                
                childrens[i].setOpacity(opacity);
            }

            if(this.isHTML){
                this.htmlElement.style.opacity = opacity;
            }
        }

        /*    --------------------------------------------------- *\
                [function] setVisible(value)
        
                * Set l'element et ses enfants visible ou non *
        
                Return: nil
        \*    --------------------------------------------------- */
        setVisible(value : boolean){
            this.visible = value;
            for (var i = 0; i < this.getElements().length; i++) {
                this.getElements()[i].setVisible(value);
            }

            // set also for the parents
            var childrens = this.getChildrens();
            for (var i = 0; i < childrens.length; i++) {                
                childrens[i].setVisible(value);
            }

            if(this.isHTML){
                if(value){
                    this.htmlElement.style.display = "block";
                }
                else{
                    this.htmlElement.style.display = "none";
                    
                }
            }
        }

        /*    --------------------------------------------------- *\
                [function] click()
        
                * Quand l'utilisateur clique sur la zone *
        
                Return: nil
        \*    --------------------------------------------------- */
        click(functionToCall : any){
            this.functionsToCall.click.push(functionToCall);
        }

        /*    --------------------------------------------------- *\
                [function] out()
        
                * Quand l'utilisateur clique n'importe ou sauf dans la zone *
        
                Return: nil
        \*    --------------------------------------------------- */
        out(functionToCall : any){
            this.functionsToCallWhenOut.click.push(functionToCall);
        }

        /*    --------------------------------------------------- *\
                [function] hover()
        
                * Quand l'utilisateur passe la souris sur la zone *
        
                Return: nil
        \*    --------------------------------------------------- */
        hover(functionToCall : any){
            this.functionsToCall.hover.push(functionToCall);
        }

        /*    --------------------------------------------------- *\
                [function] leave()
        
                * Quand l'utilisateur passe la souris autre que sur la zone *
        
                Return: nil
        \*    --------------------------------------------------- */
        leave(functionToCall : any){
            this.functionsToCall.leave.push(functionToCall);
        }

    }
}