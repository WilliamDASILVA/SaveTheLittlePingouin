/// <reference path="p2.d.ts" />
/// <reference path="tween.d.ts" />

/// <reference path="global.ts" />
/// <reference path="events.ts" />
/// <reference path="elements.ts" />
/// <reference path="scene.ts" />
/// <reference path="camera.ts" />
/// <reference path="input.ts" />
/// <reference path="update.ts" />

/// <reference path="render.ts" />
/// <reference path="render/layer.ts" />
/// <reference path="render/texture.ts" />
/// <reference path="render/drawable.ts" />
/// <reference path="render/sprite.ts" />
/// <reference path="render/draw/draw.ts" />
/// <reference path="render/draw/rectangle.ts" />
/// <reference path="render/draw/circle.ts" />
/// <reference path="render/draw/polygon.ts" />
/// <reference path="render/draw/line.ts" />
/// <reference path="render/draw/text.ts" />
/// <reference path="render/draw/point.ts" />

/// <reference path="grid.ts" />
/// <reference path="interface.ts" />
/// <reference path="ui/gui.ts" />
/// <reference path="ui/window.ts" />
/// <reference path="ui/label.ts" />
/// <reference path="ui/button.ts" />
/// <reference path="ui/field.ts" />
/// <reference path="ui/checkbox.ts" />

/// <reference path="sounds.ts" />
/// <reference path="fonts.ts" />

/// <reference path="../gameplay/ground.ts" />
/// <reference path="../gameplay/player.ts" />

/// <reference path="../gameplay/behaviours/playerBehaviour.ts" />


/*    --------------------------------------------------- *\
        Game
\*    --------------------------------------------------- */
var mainCanvas = new Render.Layer();
mainCanvas.affectedByCamera = true;
var interfaceCanvas = new Render.Layer();
/*    --------------------------------------------------- *\
        Main file
\*    --------------------------------------------------- */
if(Global.isAndroid()){
    document.addEventListener("deviceready", startApp);
}
else{
    startApp();
}

/*    --------------------------------------------------- *\
        Global vars
\*    --------------------------------------------------- */
var sX = window.innerWidth,
    sY = window.innerHeight;
var ratio = sX/sY;

var world: any;
var scene: any;
var cam: any;


/*    --------------------------------------------------- *\
        [function] startTheApp()

        * Démarre l'application quand on est prêt. *

        Return: nil
\*    --------------------------------------------------- */
function startApp(){
    Render.ready(() => {
        world = new p2.World({
            gravity: [0, 10]
        });

        Update.world(world);
        scene = new Scene();
        cam = new Camera(scene);
        cam.setPosition(sX / 2, sY / 2);
        Update.camera(cam);
        Render.setCamera(cam);

        console.log("Starting game...");
        Render.getCamera().setPosition(0, 0);

        var myGround = new Ground(world);
        myGround.setPosition(-250, 0);

        var player = new Player(world);
        player.setPosition(0, -100 );

        mainCanvas.set(myGround);
        mainCanvas.set(player);

        playerBehaviour.setPlayer(player);
        playerBehaviour.active();

        Render.setDebugMode(true);



        /*    --------------------------------------------------- *\
                Debug informations
        \*    --------------------------------------------------- */
        
        // total elements
        var totalElements = new Render.Draw.Text(10, 10, "Total elements: null", 200, 50);
        totalElements.setColor("#FFFFFF");
        interfaceCanvas.set(totalElements);

        // fps
        var fps = new Render.Draw.Text(10, 30, "FPS: null", 200, 50);
        fps.setColor("#FFFFFF");
        interfaceCanvas.set(fps);
        var previousTime = 0;
        var currentTime = 0;
        var delta = 0;
        var lastFPS = 0;
        function updateFPS(){
            currentTime = Date.now();
            delta = currentTime - previousTime;
            previousTime = currentTime;
            lastFPS = Math.round(1000 / delta);
            totalElements.setValue("Total elements: " + _elements.length);
            requestAnimationFrame(updateFPS);
        }

        setInterval(() => {
            fps.setValue("FPS: " + lastFPS);
        }, 250);
        updateFPS();

    });
    Render.download();
}
