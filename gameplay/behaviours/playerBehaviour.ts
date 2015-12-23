module playerBehaviour{
    var currentPlayer = null;
    var isMoving = false;
    var canJump = true;
    var haveControls = false;
    var splashSound = new Sounds.Sound("assets/sounds/splash.mp3");
    var jumpSound = new Sounds.Sound("assets/sounds/jump.ogg");
    var joySound = new Sounds.Sound("assets/sounds/joy.ogg");
    var victorySound = new Sounds.Sound("assets/sounds/win.mp3");
    var boo = new Sounds.Sound("assets/sounds/boo.mp3");

    var generationActive = false;
    var gnerationElements = [];


    export function setPlayer(player : any){
        currentPlayer = player;
    }

    export function enableControls(value){
        haveControls = value;
    }

    export function enableMoving(value){
        isMoving = value;
    }


    export function active(){
        Update.on(movePlayer);

        var screenSize = Global.getScreenSize();
        var touchJump = new Input.Touch(32 , screenSize.height / 2-80 + 32, 160,160);
        touchJump.on("press", doJump);
        var touchPunch = new Input.Touch(screenSize.width - 32 - 160, screenSize.height / 2-80 + 32, 160, 160);
        touchPunch.on("press", doPunch);

        var stopRecord = new Input.Key(27);
        stopRecord.on("down", () => {
            console.log("stop");
            if(generationActive){
                console.log(JSON.stringify(gnerationElements));
            }
        });

        world.on("beginContact", (event) => {
            for (var i = _obstacles.length - 1; i >= 0; i--) {
                if((event.bodyA == currentPlayer || event.bodyB == currentPlayer ) && (event.bodyA == _obstacles[i] || event.bodyB == _obstacles[i])) {
                    currentPlayer.takeHealth(1);
                    splashSound.play();

                    currentPlayer.drawables[0].setFreeze(true);

                    enableControls(false);
                    enableMoving(false);
                    currentPlayer.velocity[0] = 0;
                    currentPlayer.velocity[1] = 0;

                    if(currentPlayer.getHealth() <= 0){
                        ScoreInterface.setMax(ScoreBehaviour.getTotalPoints()) ; 
                        ScoreInterface.setScore(ScoreBehaviour.getPoints());
                        ScoreInterface.canDoNextLevel(false);
                        ScoreInterface.create();
                        ScoreInterface.enableControls(true);
                        GameInterface.setVisible(false);

                        boo.play();
                    }
                    else{
                        setTimeout(() => {
                            currentPlayer.drawables[0].setFreeze(false);
                            enableControls(true);
                            enableMoving(true);
                        }, 2000);
                    }
                }
            }
            for (var i = _endFlags.length - 1; i >= 0; i--) {
                if((event.bodyA == currentPlayer || event.bodyB == currentPlayer ) && (event.bodyA == _endFlags[i] || event.bodyB == _endFlags[i])) {
                    var time = 0;
                    enableControls(false);
                    enableMoving(false);

                    currentPlayer.velocity[0] = 0;
                    currentPlayer.velocity[1] = 0;

                    currentPlayer.drawables[0].setFreeze(true);

                    // Start the pingouins party
                    if(ScoreBehaviour.getPoints() != 0){
                        victorySound.play();
                        time = 3000;
                    }

                    // Pingouins party
                    var pingouins = [];
                    var texture = new Render.Texture("assets/pingouin_jump.png");

                    var playerPosition = currentPlayer.getPosition();

                    for (var p = 0; p < ScoreBehaviour.getPoints(); ++p) {
                        var sprite = new Render.Sprite(texture, 0, 0, 64, 64, 64, 64, 10, 0);
                        sprite.setFrameSpeed(12);
                        sprite.setFixed(true);
                        sprite.setDepth(100);
                        var screenPosition = Global.getPositionFromWorld(playerPosition.x, playerPosition.y, Render.getCamera()); 
                        sprite.setPosition(screenPosition.x + Global.getRandom(100, 300), screenPosition.y + Global.getRandom(80, 200));
                        pingouins.push(sprite);

                        mainCanvas.set(sprite);
                    }


                    // Show scoreboard after the party
                    setTimeout(() => {
                        // destroy pingouins
                        for (var i = 0; i < pingouins.length; ++i) {
                            mainCanvas.del(pingouins[i]);
                        }

                        var pourcentage = (ScoreBehaviour.getPoints() * 100) / ScoreBehaviour.getTotalPoints();
                        if(pourcentage < 80){
                            ScoreInterface.canDoNextLevel(false);
                        }
                        
                        ScoreInterface.setMax(ScoreBehaviour.getTotalPoints());
                        ScoreInterface.setScore(ScoreBehaviour.getPoints());
                        ScoreInterface.create();
                        ScoreInterface.enableControls(true);
                        playerBehaviour.enableControls(false);
                        GameInterface.setVisible(false);


                    }, time);

                }
            }


        });

    }

    function doPunch( ){
        if(haveControls){
            if(generationActive){
                var pPosition = currentPlayer.getPosition();
                gnerationElements.push(["ennemy", pPosition.x, 0]);
            }
            for (var i = _ennemies.length - 1; i >= 0; i--) {
                var position = _ennemies[i].getPosition();
                var playerPosition = currentPlayer.getPosition();
                if(Global.getDistanceBetween2Points(position.x, position.y, playerPosition.x, playerPosition.y) <= 300){
                    if(position.x > playerPosition.x){
                        if(_ennemies[i].isCaptured() == false){
                            _ennemies[i].setCaptured(true);

                            var texture = new Render.Texture("assets/ennemy2.png");
                            var sprite = new Render.Drawable(texture, 0, 0, 200,188);
                            sprite.setOffset(0, -60);
                            _ennemies[i].drawables[0] = sprite;

                            joySound.play();

                            ScoreBehaviour.givePoint();
                            GameInterface.updateValue("score_label", ScoreBehaviour.getPoints() + " / " + ScoreBehaviour.getTotalPoints());
                            GameInterface.updateValue("score_label_shadow", ScoreBehaviour.getPoints() + " / " + ScoreBehaviour.getTotalPoints());
                        }
                    } 
                }
            }
        }
    }

    function doJump(){
        if(canJump && haveControls){
            jumpSound.play();
            currentPlayer.velocity[1] = -2000;
            canJump = false;

            if(generationActive){
                var pPosition = currentPlayer.getPosition();
                gnerationElements.push(["hole", pPosition.x, 0]);
            }
            setTimeout(() => {
                canJump = true;

            }, 1000);
        }
    }

    function movePlayer(){
        if((currentPlayer != null) && haveControls){
            if (isMoving){
                currentPlayer.velocity[0] = 600;
            }
        }
    }
    
}