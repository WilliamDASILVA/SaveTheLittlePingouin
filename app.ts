/// <reference path="engine.d.ts" />

/// <reference path="gameplay/ground.ts" />
/// <reference path="gameplay/player.ts" />
/// <reference path="gameplay/obstacle.ts" />
/// <reference path="gameplay/ennemy.ts" />
/// <reference path="gameplay/endFlag.ts" />
/// <reference path="gameplay/mapLoading.ts" />
/// <reference path="gameplay/background.ts" />
/// <reference path="gameplay/iceberg.ts" />

/// <reference path="interface/game.ts" />
/// <reference path="interface/score.ts" />
/// <reference path="interface/starting.ts" />
/// <reference path="interface/menu.ts" />
/// <reference path="interface/level.ts" />

/// <reference path="gameplay/behaviours/playerBehaviour.ts" />
/// <reference path="gameplay/behaviours/cameraBehaviour.ts" />
/// <reference path="gameplay/behaviours/scoreBehaviour.ts" />
/// <reference path="gameplay/behaviours/snowBehaviour.ts" />



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
var ratio = sX / sY;

var world: any;
var scene: any;
var cam: any;


/*    --------------------------------------------------- *\
        [function] startTheApp()

        * Démarre l'application quand on est prêt. *

        Return: nil
\*    --------------------------------------------------- */
function startApp() {

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

        var mainSound = new Sounds.Sound("assets/sounds/howareyou.mp3");
        mainSound.setVolume(0.1);
        mainSound.on("ready", () => {
            mainSound.play();
            mainSound.on("end", () => {
                mainSound.stop();
                mainSound.play();
            });
        });

        //Render.setDebugMode(true);

        new Fonts.FontFace("pixelated", "assets/Pixeltype.ttf");

        /*    --------------------------------------------------- *\
                Create player element
        \*    --------------------------------------------------- */
        var player = new Player(world);
        player.setPosition(0, -100);
        player.drawables[0].setFreeze(true);
        playerBehaviour.setPlayer(player);
        playerBehaviour.active();
        Render.getCamera().setPosition(0, 0);

        Background.active();
        MapLoading.setPlayer(player);

        var ground = new Ground(world, 500000000);
        ground.setPosition(-1000, 0);
        mainCanvas.set(ground);




        GameInterface.create();
        GameInterface.setVisible(false);
        ScoreInterface.setActive();

        snowBehaviour.create();
        snowBehaviour.setActive();

        LevelInterface.setActive();
        MenuInterface.setActive();
        MenuInterface.enableControls(true);
        MenuInterface.create();

        /*    --------------------------------------------------- *\
                Map loading
        \*    --------------------------------------------------- */
        //MapLoading.loadMap("learning");
        MapLoading.whenLoaded(() => {
            player.drawables[0].setFreeze(true);
            ground.setSize(500, MapLoading.getMapSize());

            player.setPosition(0, -100);
            console.log("START NOW");

            player.setDepth(1000);
            mainCanvas.del(player);
            mainCanvas.set(player);

            player.resetLocalStats();
            ScoreBehaviour.resetScore();

            StartingInterface.updateTitle(MapLoading.getMapName());
            StartingInterface.create();

            setTimeout(() => {
                StartingInterface.destroy();
                GameInterface.setVisible(true);

                setTimeout(() => {
                    player.drawables[0].setFreeze(false);
                    playerBehaviour.enableControls(true);
                    playerBehaviour.enableMoving(true);
                }, 500);
            }, 3000);

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
