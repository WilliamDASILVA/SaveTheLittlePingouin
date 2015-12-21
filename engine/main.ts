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
/// <reference path="../gameplay/obstacle.ts" />
/// <reference path="../gameplay/ennemy.ts" />
/// <reference path="../gameplay/endFlag.ts" />
/// <reference path="../gameplay/mapLoading.ts" />
/// <reference path="../gameplay/background.ts" />
/// <reference path="../gameplay/iceberg.ts" />

/// <reference path="../interface/game.ts" />
/// <reference path="../interface/score.ts" />

/// <reference path="../gameplay/behaviours/playerBehaviour.ts" />
/// <reference path="../gameplay/behaviours/cameraBehaviour.ts" />
/// <reference path="../gameplay/behaviours/scoreBehaviour.ts" />



/*    --------------------------------------------------- *\
        Game
\*    --------------------------------------------------- */
var mainCanvas = new Render.Layer();
mainCanvas.setSmooth(false);
mainCanvas.affectedByCamera = true;
var interfaceCanvas = new Render.Layer();
interfaceCanvas.setSmooth(false);
/*    --------------------------------------------------- *\
        Main file
\*    --------------------------------------------------- */

startApp();


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

    Render.add("assets/spriter/walking.png");
    Render.add("assets/spriter/walking_pingouin.png");
    Render.add("assets/spriter/jump_pingouin.png");
    Render.add("assets/background.jpg");
    Render.add("assets/hole_sprite.png");
    Render.add("assets/ice.png");
    Render.add("assets/iceberg1_sprite.png");
    Render.add("assets/iceberg2_sprite.png");
    Render.add("assets/iceberg3_sprite.png");

    Render.ready(() => {
        world = new p2.World({
            gravity: [0, 7300]
        });
        world.defaultContactMaterial.friction = 0;

        Update.world(world);
        scene = new Scene();
        cam = new Camera(scene);
        cam.setPosition(sX / 2, sY / 2);
        Update.camera(cam);
        Render.setCamera(cam);

        console.log("Starting game...");

        var windSound = new Sounds.Sound("assets/sounds/wind.mp3");
        windSound.setVolume(0.5);
        windSound.on("ready", () => {
            windSound.play();
            windSound.on("end", () => {
                windSound.stop();
                windSound.play();
            });
        });

        //Render.setDebugMode(true);

        new Fonts.FontFace("pixelated", "assets/Pixeltype.ttf");

        /*    --------------------------------------------------- *\
                Create player element
        \*    --------------------------------------------------- */
        var player = new Player(world);
        player.setPosition(0, -100 );
        playerBehaviour.setPlayer(player);
        playerBehaviour.active();
        Render.getCamera().setPosition(0, 0);

        Background.active();
        MapLoading.setPlayer(player);

        var ground = new Ground(world, 10000);
        ground.setPosition(-1000, 0);
        mainCanvas.set(ground);


        GameInterface.create();
        ScoreInterface.create();


        GameInterface.setVisible(false);

        /*    --------------------------------------------------- *\
                Map loading
        \*    --------------------------------------------------- */
        MapLoading.loadMap("learning");
        MapLoading.whenLoaded(() => {

            ground.setSize(500, MapLoading.getMapSize());

            player.drawables[0].setFreeze(false);
            player.setPosition(0, -100);
            console.log("START NOW");

            player.setDepth(1000);
            mainCanvas.del(player);
            mainCanvas.set(player);

            player.resetLocalStats();
            ScoreBehaviour.resetScore();

            playerBehaviour.enableControls(true);
            playerBehaviour.enableMoving(true);

            /*    --------------------------------------------------- *\
                    Camera behaviour
            \*    --------------------------------------------------- */
            cameraBehaviour.setCamera(cam);
            cameraBehaviour.follow(player);
            cameraBehaviour.active();
        });


        /*    --------------------------------------------------- *\
                Debug informations
        \*    --------------------------------------------------- */
        
        /*// total elements
        var totalElements = new Render.Draw.Text(10, 10, "Total elements: null", 200, 50);
        totalElements.setColor("#FFFFFF");
        totalElements.setFixed(true);
        interfaceCanvas.set(totalElements);

        // fps
        var fps = new Render.Draw.Text(10, 30, "FPS: null", 200, 50);
        fps.setColor("#FFFFFF");
        fps.setFixed(true);
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
        updateFPS();*/

    });
    Render.download();
}
