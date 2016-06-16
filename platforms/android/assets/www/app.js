var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Ground = (function (_super) {
    __extends(Ground, _super);
    function Ground(world, size) {
        _super.call(this, 0);
        this.setType("ground");
        this.canCollideWith("player");
        this.setSize(size + 1000, 500);
        this.setFixedRotation(true);
        var shape = new p2.Box(this.getSize());
        this.addShape(shape);
        var texture = new Render.Draw.Rectangle(0, 0, this.getSize().width, this.getSize().height);
        texture.setColor("#F4F4F4");
        this.assignDrawable(texture);
        if (world) {
            world.addBody(this);
        }
        this.setDepth(1);
    }
    Ground.prototype.setSize = function (width, height) {
        this.size = { width: width, height: height };
    };
    Ground.prototype.getSize = function () {
        return this.size;
    };
    return Ground;
}(Elements));
var Player = (function (_super) {
    __extends(Player, _super);
    function Player(world) {
        _super.call(this, 100, false);
        this.setType("player");
        this.canCollideWith("ground", "ennemy", "endFlag");
        this.setFixedRotation(true);
        this.size = { width: 120, height: 92 };
        this.health = 5;
        var texture = new Render.Texture("assets/spriter/walking_pingouin.png");
        var sprite = new Render.Sprite(texture, 0, 0, this.size.width, this.size.height, 78, 59, 20, 0);
        sprite.setFrameSpeed(60);
        sprite.setOffset(0, 80);
        this.assignDrawable(sprite);
        var shape = new p2.Box(this.size);
        this.addShape(shape);
        this.setDepth(1000);
        if (world) {
            world.addBody(this);
        }
    }
    Player.prototype.takeHealth = function (value) {
        if (this.health - value <= 0) {
            this.health = 0;
            GameInterface.updateValue("health", 0.01);
        }
        else {
            this.health = this.health - value;
            GameInterface.updateValue("health", this.health);
        }
    };
    Player.prototype.addHealth = function (value) {
        this.health = this.health + value;
    };
    Player.prototype.getHealth = function () {
        return this.health;
    };
    Player.prototype.resetLocalStats = function () {
        this.health = 5;
        GameInterface.updateValue("health", this.health);
    };
    return Player;
}(Elements));
var _obstacles = [];
var Obstacle = (function (_super) {
    __extends(Obstacle, _super);
    function Obstacle(world, obstacleType) {
        _super.call(this, 0, false);
        this.setType("ground");
        this.canCollideWith("player");
        this.setFixedRotation(true);
        this.damping = 0;
        var shape = new p2.Box({ width: 50, height: 50 });
        this.addShape(shape);
        this.shapes[0].sensor = true;
        var drawable;
        var texture;
        texture = new Render.Texture("assets/hole_sprite.png");
        drawable = new Render.Sprite(texture, 0, 0, 150, 150, 64, 64, 5, 0);
        drawable.setFrameSpeed(5);
        drawable.setOffset(-42, 50);
        this.setDepth(9);
        this.assignDrawable(drawable);
        if (world) {
            world.addBody(this);
        }
        _obstacles.push(this);
    }
    Obstacle.prototype.destroy = function () {
        for (var i = _elements.length - 1; i >= 0; i--) {
            if (_elements[i] == this) {
                _elements.splice(i, 1);
            }
        }
        for (var i = _obstacles.length - 1; i >= 0; i--) {
            if (_obstacles[i] == this) {
                _obstacles.splice(i, 1);
            }
        }
        delete this;
    };
    return Obstacle;
}(Elements));
var _ennemies = [];
var Ennemy = (function (_super) {
    __extends(Ennemy, _super);
    function Ennemy(world) {
        _super.call(this, 0);
        this.setType("ennemy");
        this.canCollideWith("player");
        this.setFixedRotation(true);
        this.damping = 0;
        var shape = new p2.Box({ width: 200, height: 188 });
        this.addShape(shape);
        this.shapes[0].sensor = true;
        this.hasBeenCaptured = false;
        var texture = new Render.Texture("assets/spriter/ennemy.png");
        var sprite = new Render.Sprite(texture, 0, 0, 200, 188, 83, 78, 20, 0);
        sprite.setFrameSpeed(60);
        sprite.setOffset(0, -60);
        this.assignDrawable(sprite);
        if (world) {
            world.addBody(this);
        }
        this.setDepth(2);
        _ennemies.push(this);
    }
    Ennemy.prototype.isCaptured = function () {
        return this.hasBeenCaptured;
    };
    Ennemy.prototype.setCaptured = function (value) {
        this.hasBeenCaptured = value;
    };
    Ennemy.prototype.destroy = function () {
        for (var i = _elements.length - 1; i >= 0; i--) {
            if (_elements[i] == this) {
                _elements.splice(i, 1);
            }
        }
        for (var i = _ennemies.length - 1; i >= 0; i--) {
            if (_ennemies[i] == this) {
                _ennemies.splice(i, 1);
            }
        }
        delete this;
    };
    return Ennemy;
}(Elements));
var _endFlags = [];
var EndFlag = (function (_super) {
    __extends(EndFlag, _super);
    function EndFlag(world) {
        _super.call(this, 0);
        this.setType("endFlag");
        this.canCollideWith("player");
        var texture = new Render.Texture("assets/end.png");
        var sprite = new Render.Sprite(texture, 0, 0, 180, 180, 64, 64, 4, 0);
        sprite.setFrameSpeed(12);
        sprite.setOffset(0, -50);
        this.assignDrawable(sprite);
        var shape = new p2.Box({ width: 180, height: 180 });
        this.addShape(shape);
        this.shapes[0].sensor = true;
        this.setDepth(4);
        if (world) {
            world.addBody(this);
        }
        _endFlags.push(this);
    }
    EndFlag.prototype.destroy = function () {
        for (var i = _elements.length - 1; i >= 0; i--) {
            if (_elements[i] == this) {
                _elements.splice(i, 1);
            }
        }
        for (var i = _endFlags.length - 1; i >= 0; i--) {
            if (_endFlags[i] == this) {
                _endFlags.splice(i, 1);
            }
        }
        delete this;
    };
    return EndFlag;
}(Elements));
var MapLoading;
(function (MapLoading) {
    var functionToCallWhenLoaded = null;
    var mapElements = [];
    var nextMap = "";
    var playerElement = null;
    var mapSize = null;
    var currentMap = "";
    var mapName = "";
    function getMapSize() {
        return mapSize;
    }
    MapLoading.getMapSize = getMapSize;
    function setPlayer(player) {
        playerElement = player;
    }
    MapLoading.setPlayer = setPlayer;
    function destroyMap(functionWhenDone) {
        for (var i = mapElements.length - 1; i >= 0; i--) {
            mainCanvas.del(mapElements[i]);
            mapElements[i].destroy();
        }
        mapElements = [];
        functionWhenDone();
        mainCanvas.del(playerElement);
    }
    MapLoading.destroyMap = destroyMap;
    function getNextMap() {
        return nextMap;
    }
    MapLoading.getNextMap = getNextMap;
    function getCurrentMap() {
        return currentMap;
    }
    MapLoading.getCurrentMap = getCurrentMap;
    function loadMap(name) {
        var xhr = new Global.XHR("maps/" + name + ".json");
        currentMap = name;
        xhr.ready(function (response) {
            if (response.readyState == 4) {
                var mapData = JSON.parse(response.response);
                if (mapData) {
                    console.log("Generating map:" + mapData.name);
                    generateMap(mapData);
                }
                else {
                    currentMap = "";
                    alert("Couldn't load map... Data error.");
                }
            }
        });
    }
    MapLoading.loadMap = loadMap;
    function getMapName() {
        return mapName;
    }
    MapLoading.getMapName = getMapName;
    function generateMap(mapData) {
        var data = mapData.elements;
        mapSize = mapData.size;
        mapName = mapData.name;
        // elements
        var maxPoints = 0;
        for (var i = data.length - 1; i >= 0; i--) {
            var element = null;
            switch (data[i][0]) {
                case "iceberg":
                    element = new Obstacle(world, "iceberg");
                    break;
                case "hole":
                    element = new Obstacle(world, "hole");
                    break;
                case "ennemy":
                    maxPoints++;
                    element = new Ennemy(world);
                    break;
                case "end":
                    element = new EndFlag(world);
                    nextMap = data[i][3];
            }
            if (element != null) {
                element.setPosition(data[i][1], data[i][2] - 50);
                mainCanvas.set(element);
                mapElements.push(element);
            }
        }
        ScoreBehaviour.setMaxPoints(maxPoints);
        GameInterface.updateValue("score_label", "0 / " + maxPoints);
        GameInterface.updateValue("score_label_shadow", "0 / " + maxPoints);
        functionToCallWhenLoaded();
    }
    function whenLoaded(functionToCall) {
        functionToCallWhenLoaded = functionToCall;
    }
    MapLoading.whenLoaded = whenLoaded;
})(MapLoading || (MapLoading = {}));
var Background;
(function (Background) {
    var backgroundElement = null;
    function active() {
        var screenSize = Global.getScreenSize();
        var texture = new Render.Texture("assets/background.jpg");
        backgroundElement = new Render.Drawable(texture, 0, 0, screenSize.width, screenSize.height);
        backgroundElement.setFixed(true);
        backgroundElement.setDepth(-1000);
        mainCanvas.set(backgroundElement);
    }
    Background.active = active;
})(Background || (Background = {}));
var Iceberg = (function (_super) {
    __extends(Iceberg, _super);
    function Iceberg(world) {
        _super.call(this, 0);
        this.icebergType = "iceberg" + Global.getRandom(1, 3) + "_sprite.png";
        this.setType("iceberg");
        if (world) {
            world.addBody(this);
        }
    }
    return Iceberg;
}(Elements));
var SaveData;
(function (SaveData) {
    var currentData = [];
    function resetData() {
        localStorage.clear();
    }
    SaveData.resetData = resetData;
    function loadData() {
        currentData['learning'] = JSON.parse(localStorage.getItem("learning"));
        if (currentData['learning'] == null) {
            localStorage.setItem("learning", JSON.stringify({
                "can": true,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['learning'] = JSON.parse(localStorage.getItem("learning"));
        currentData['level1'] = JSON.parse(localStorage.getItem("level1"));
        if (currentData['level1'] == null) {
            localStorage.setItem("level1", JSON.stringify({
                "can": false,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['level1'] = JSON.parse(localStorage.getItem("level1"));
        currentData['level2'] = JSON.parse(localStorage.getItem("level2"));
        if (currentData['level2'] == null) {
            localStorage.setItem("level2", JSON.stringify({
                "can": false,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['level2'] = JSON.parse(localStorage.getItem("level2"));
        currentData['level3'] = JSON.parse(localStorage.getItem("level3"));
        if (currentData['level3'] == null) {
            localStorage.setItem("level3", JSON.stringify({
                "can": false,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['level3'] = JSON.parse(localStorage.getItem("level3"));
        currentData['level4'] = JSON.parse(localStorage.getItem("level4"));
        if (currentData['level4'] == null) {
            localStorage.setItem("level4", JSON.stringify({
                "can": false,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['level4'] = JSON.parse(localStorage.getItem("level4"));
        currentData['level5'] = JSON.parse(localStorage.getItem("level5"));
        if (currentData['level5'] == null) {
            localStorage.setItem("level5", JSON.stringify({
                "can": false,
                "done": false,
                "stars": 0,
                "pingouins": 0
            }));
        }
        currentData['level5'] = JSON.parse(localStorage.getItem("level5"));
    }
    SaveData.loadData = loadData;
    function setData(name, valueToChange, value) {
        currentData[name][valueToChange] = value;
    }
    SaveData.setData = setData;
    function getData(name) {
        return currentData[name];
    }
    SaveData.getData = getData;
    function saveData() {
        for (var level in currentData) {
            localStorage.setItem(level, JSON.stringify(currentData[level]));
        }
        console.log("Data saved");
    }
    SaveData.saveData = saveData;
})(SaveData || (SaveData = {}));
var GameInterface;
(function (GameInterface) {
    var elements = [];
    function setVisible(value) {
        for (var element in elements) {
            elements[element].setVisible(value);
        }
    }
    GameInterface.setVisible = setVisible;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    GameInterface.destroy = destroy;
    function create() {
        var screenSize = Global.getScreenSize();
        elements['jump_button'] = new Render.Drawable(new Render.Texture("assets/jump_button.png"), 0, 0, 160, 160);
        elements['jump_button'].setPosition(32, screenSize.height / 2 - 80 + 32);
        elements['jump_button'].setFixed(true);
        elements['jump_button'].setOpacity(0.25);
        elements['save_button'] = new Render.Drawable(new Render.Texture("assets/save_button.png"), 0, 0, 160, 160);
        elements['save_button'].setPosition(screenSize.width - 32 - 160, screenSize.height / 2 - 80 + 32);
        elements['save_button'].setFixed(true);
        elements['save_button'].setOpacity(0.25);
        elements['score_pingouin'] = new Render.Sprite(new Render.Texture("assets/pingouin_icon_hud.png"), 0, 0, 64, 64, 64, 64, 10, 0);
        elements['score_pingouin'].setPosition(screenSize.width - 192, 10);
        elements['score_pingouin'].setFixed(true);
        elements['health_bar'] = new Render.Drawable(new Render.Texture("assets/health_bar.png"), 0, 0, 48, 64);
        elements['health_bar'].setPosition(20, 10);
        elements['health_bar'].setFixed(true);
        elements['health_bar'].setCrop(0, 0, 48, 64);
        elements['score_label_shadow'] = new Render.Draw.Text(screenSize.width - 128, 35, "10/20", 200, 10);
        elements['score_label_shadow'].setFontSize(45);
        elements['score_label_shadow'].setFont("pixelated");
        elements['score_label_shadow'].setColor("#000000");
        elements['score_label_shadow'].setOpacity(0.2);
        elements['score_label_shadow'].setFixed(true);
        elements['score_label'] = new Render.Draw.Text(screenSize.width - 128, 32, "10/20", 200, 10);
        elements['score_label'].setFontSize(45);
        elements['score_label'].setFont("pixelated");
        elements['score_label'].setColor("#FFFFFF");
        elements['score_label'].setFixed(true);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    GameInterface.create = create;
    function updateValue(label, value) {
        if (label != "health") {
            elements[label].setValue(value);
        }
        else {
            var numberOfHearts = value;
            elements['health_bar'].setSize(48 * numberOfHearts, 64);
            elements['health_bar'].setCrop(0, 0, 48 * numberOfHearts, 64);
        }
    }
    GameInterface.updateValue = updateValue;
})(GameInterface || (GameInterface = {}));
var ScoreInterface;
(function (ScoreInterface) {
    var elements = [];
    var haveControls = false;
    var currentPourcentage = 0;
    var currentScore = 0;
    var currentMax = 0;
    var haveNextButton = true;
    function enableControls(value) {
        haveControls = value;
    }
    ScoreInterface.enableControls = enableControls;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    ScoreInterface.destroy = destroy;
    function canDoNextLevel(value) {
        haveNextButton = value;
    }
    ScoreInterface.canDoNextLevel = canDoNextLevel;
    function setActive() {
        var screenSize = Global.getScreenSize();
        var retryButton = new Input.Touch(screenSize.width / 2 - 150 - 75, (screenSize.height - 130) - 25, 150, 50);
        retryButton.on("press", function () {
            if (haveControls) {
                destroy();
                enableControls(false);
                MapLoading.destroyMap(function () {
                    MapLoading.loadMap(MapLoading.getCurrentMap());
                });
            }
        });
        var nextButton = new Input.Touch(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 25, 150, 50);
        nextButton.on("press", function () {
            if (haveControls && haveNextButton) {
                destroy();
                enableControls(false);
                if (MapLoading.getNextMap() == "end") {
                    MapLoading.destroyMap(function () {
                        FinalInterface.create();
                        FinalInterface.enableControls(true);
                    });
                }
                else {
                    MapLoading.destroyMap(function () {
                        MapLoading.loadMap(MapLoading.getNextMap());
                    });
                }
            }
        });
        var goMenuButton = new Input.Touch(screenSize.width / 2 - 75, (screenSize.height - 80), 150, 50);
        goMenuButton.on("press", function () {
            if (haveControls) {
                destroy();
                enableControls(false);
                MapLoading.destroyMap(function () {
                    MenuInterface.create();
                    setTimeout(function () {
                        MenuInterface.enableControls(true);
                    }, 1000);
                });
            }
        });
    }
    ScoreInterface.setActive = setActive;
    function create() {
        var screenSize = Global.getScreenSize();
        var pourcentage = (currentScore * 100) / currentMax;
        elements['fade'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
        elements['fade'].setFixed(true);
        elements['fade'].setDepth(0);
        elements['fade'].setColor("#000");
        elements['fade'].setOpacity(0.5);
        elements['background'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150, screenSize.height / 2 - (screenSize.height - 150) / 2, 300, screenSize.height - 150);
        elements['background'].setColor("#FFF");
        elements['background'].setFixed(true);
        elements['background'].setDepth(1);
        var starActive = new Render.Texture("assets/star_active.png");
        var starDisabled = new Render.Texture("assets/star_disabled.png");
        var firstStar = starDisabled;
        if (pourcentage >= 50) {
            firstStar = starActive;
        }
        elements['left_star'] = new Render.Drawable(firstStar, screenSize.width / 2 - 150 - 96 + 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
        elements['left_star'].setFixed(true);
        elements['left_star'].setDepth(2);
        var secondStar = starDisabled;
        if (pourcentage >= 80) {
            secondStar = starActive;
        }
        elements['middle_star'] = new Render.Drawable(secondStar, screenSize.width / 2 - 64, screenSize.height / 2 - (screenSize.height - 150) / 2 - 64, 128, 128);
        elements['middle_star'].setFixed(true);
        elements['middle_star'].setDepth(3);
        var thirdStar = starDisabled;
        if (pourcentage == 100) {
            thirdStar = starActive;
        }
        elements['right_star'] = new Render.Drawable(thirdStar, screenSize.width / 2 + 150 - 48, screenSize.height / 2 - (screenSize.height - 150) / 2 - 48, 96, 96);
        elements['right_star'].setFixed(true);
        elements['right_star'].setDepth(2);
        elements['button_home'] = new Render.Draw.Rectangle(screenSize.width / 2 - 75, (screenSize.height - 80), 150, 50);
        elements['button_home'].setColor("#DFDFDF");
        elements['button_home'].setFixed(true);
        elements['button_home'].setDepth(2);
        elements['button_home_text'] = new Render.Draw.Text(screenSize.width / 2 - 75, (screenSize.height - 75), "Go to main menu", 150, 10);
        elements['button_home_text'].setFontSize(25);
        elements['button_home_text'].setFont("pixelated");
        elements['button_home_text'].setColor("#000000");
        elements['button_home_text'].setAlign("center");
        elements['button_home_text'].setFixed(true);
        elements['button_home_text'].setDepth(3);
        elements['button_retry'] = new Render.Draw.Rectangle(screenSize.width / 2 - 150 - 75, (screenSize.height - 130) - 25, 150, 50);
        elements['button_retry'].setColor("#DFDFDF");
        elements['button_retry'].setFixed(true);
        elements['button_retry'].setDepth(2);
        elements['button_retry_text'] = new Render.Draw.Text(screenSize.width / 2 - 150 - 75 - 75, (screenSize.height - 130) - 8, "Retry this level", 300, 10);
        elements['button_retry_text'].setFontSize(25);
        elements['button_retry_text'].setFont("pixelated");
        elements['button_retry_text'].setColor("#000000");
        elements['button_retry_text'].setAlign("center");
        elements['button_retry_text'].setFixed(true);
        elements['button_retry_text'].setDepth(3);
        if (haveNextButton) {
            elements['button_nextlevel'] = new Render.Draw.Rectangle(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 25, 150, 50);
            elements['button_nextlevel'].setColor("#DFDFDF");
            elements['button_nextlevel'].setFixed(true);
            elements['button_nextlevel'].setDepth(2);
            var nextText = "Next level";
            if (MapLoading.getNextMap() == "end") {
                nextText = "Finish";
            }
            elements['button_nextlevel_text'] = new Render.Draw.Text(screenSize.width / 2 + 150 - 75, (screenSize.height - 130) - 8, nextText, 150, 10);
            elements['button_nextlevel_text'].setFontSize(25);
            elements['button_nextlevel_text'].setFont("pixelated");
            elements['button_nextlevel_text'].setColor("#000000");
            elements['button_nextlevel_text'].setAlign("center");
            elements['button_nextlevel_text'].setFixed(true);
            elements['button_nextlevel_text'].setDepth(3);
        }
        elements['score_background'] = new Render.Draw.Circle(screenSize.width / 2, screenSize.height / 2 - 48, 48);
        elements['score_background'].setFixed(true);
        elements['score_background'].setColor("#EFEFEF");
        elements['score_background'].setDepth(3);
        elements['score'] = new Render.Draw.Text(screenSize.width / 2 - 150, screenSize.height / 2 + 20, currentScore + " / " + currentMax, 300, 10);
        elements['score'].setFontSize(40);
        elements['score'].setFont("pixelated");
        elements['score'].setColor("#000000");
        elements['score'].setAlign("center");
        elements['score'].setFixed(true);
        elements['score'].setDepth(2);
        elements['score_pingouin'] = new Render.Sprite(new Render.Texture("assets/pingouin_icon_hud.png"), 0, 0, 96, 96, 64, 64, 10, 0);
        elements['score_pingouin'].setPosition(screenSize.width / 2 - 48, screenSize.height / 2 - 90);
        elements['score_pingouin'].setFixed(true);
        elements['score_pingouin'].setDepth(4);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    ScoreInterface.create = create;
    function setScore(value) {
        currentScore = value;
    }
    ScoreInterface.setScore = setScore;
    function setMax(value) {
        currentMax = value;
    }
    ScoreInterface.setMax = setMax;
})(ScoreInterface || (ScoreInterface = {}));
var StartingInterface;
(function (StartingInterface) {
    var elements = [];
    var lastTitle = "";
    function updateTitle(value) {
        lastTitle = value;
    }
    StartingInterface.updateTitle = updateTitle;
    function create() {
        var screenSize = Global.getScreenSize();
        elements['background'] = new Render.Drawable(new Render.Texture("assets/shadow.png"), 0, 0, 720, 155);
        elements['background'].setFixed(true);
        elements['background'].setDepth(0);
        elements['background'].setPosition(0, screenSize.height - 100);
        elements['background'].setSize(screenSize.width, 155);
        elements['label'] = new Render.Draw.Text(20, screenSize.height - 100 + 20, "Map name:", 750, 10);
        elements['label'].setFontSize(25);
        elements['label'].setFont("pixelated");
        elements['label'].setColor("#FFFFFF");
        elements['label'].setFixed(true);
        elements['label'].setDepth(1);
        elements['title'] = new Render.Draw.Text(20, screenSize.height - 100 + 45, lastTitle, 750, 10);
        elements['title'].setFontSize(40);
        elements['title'].setFont("pixelated");
        elements['title'].setColor("#FFFFFF");
        elements['title'].setFixed(true);
        elements['title'].setDepth(1);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    StartingInterface.create = create;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    StartingInterface.destroy = destroy;
})(StartingInterface || (StartingInterface = {}));
var MenuInterface;
(function (MenuInterface) {
    var elements = [];
    var controlsEnabled = true;
    var okSound = new Sounds.Sound("assets/sounds/ok.ogg");
    function enableControls(value) {
        controlsEnabled = value;
    }
    MenuInterface.enableControls = enableControls;
    function setActive() {
        var screenSize = Global.getScreenSize();
        var startButton = new Input.Touch(screenSize.width - 300 - 40, screenSize.height - (300 / 1.6) - 40, 300, 300 / 1.6);
        startButton.on("press", function () {
            if (controlsEnabled) {
                destroy();
                LevelInterface.create();
                LevelInterface.enableControls(true);
                enableControls(false);
                okSound.play();
            }
        });
    }
    MenuInterface.setActive = setActive;
    function create() {
        var screenSize = Global.getScreenSize();
        elements['background'] = new Render.Drawable(new Render.Texture("assets/background.jpg"), 0, 0, screenSize.width, screenSize.height);
        elements['background'].setFixed(true);
        elements['background'].setDepth(0);
        elements['logo_huge'] = new Render.Drawable(new Render.Texture("assets/logo_huge.png"), screenSize.width - 300 - 20, 20, 300, 300 / 3.13);
        elements['logo_huge'].setFixed(true);
        elements['logo_huge'].setDepth(1);
        elements['bear'] = new Render.Drawable(new Render.Texture("assets/nounours_sit.png"), 0, 0, 0.3 * screenSize.width, 0.3 * screenSize.width);
        elements['bear'].setFixed(true);
        elements['bear'].setPosition(0, 100);
        elements['bear'].setDepth(1);
        elements['playButton'] = new Render.Drawable(new Render.Texture("assets/playButton.png"), screenSize.width - 300 - 40, screenSize.height - (300 / 1.6) - 40, 300, 300 / 1.6);
        elements['playButton'].setFixed(true);
        elements['playButton'].setDepth(1);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    MenuInterface.create = create;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    MenuInterface.destroy = destroy;
})(MenuInterface || (MenuInterface = {}));
var LevelInterface;
(function (LevelInterface) {
    var elements = [];
    var touchAreas = [];
    var controlsEnabled = false;
    var islands = 0;
    var errorSound = new Sounds.Sound("assets/sounds/error.ogg");
    var okSound = new Sounds.Sound("assets/sounds/ok.ogg");
    function enableControls(value) {
        controlsEnabled = value;
    }
    LevelInterface.enableControls = enableControls;
    function setActive() {
        var screenSize = Global.getScreenSize();
        var backButton = new Input.Touch(10, 10, 150, 150 / 2.25);
        backButton.on("press", function () {
            if (controlsEnabled) {
                destroy();
                MenuInterface.create();
                MenuInterface.enableControls(true);
                enableControls(false);
                okSound.play();
            }
        });
        touchAreas['learning'] = { x: 10, y: 95, calling: "learning", can: SaveData.getData("learning").can };
        touchAreas['darling'] = { x: 200, y: 95, calling: "level1", can: SaveData.getData("level1").can };
        touchAreas['firstlove'] = { x: 410, y: 95, calling: "level2", can: SaveData.getData("level2").can };
        touchAreas['staywithme'] = { x: 10, y: 250, calling: "level3", can: SaveData.getData("level3").can };
        touchAreas['needyou'] = { x: 200, y: 250, calling: "level4", can: SaveData.getData("level4").can };
        touchAreas['loveyou'] = { x: 410, y: 250, calling: "level5", can: SaveData.getData("level5").can };
        var touchArea = new Input.Touch(0, 0, screenSize.width, screenSize.height);
        touchArea.on("press", function (x, y) {
            if (controlsEnabled) {
                for (var area in touchAreas) {
                    if (x >= touchAreas[area].x && y >= touchAreas[area].y && x <= touchAreas[area].x + 130 && y <= touchAreas[area].y + 130) {
                        if (touchAreas[area].can) {
                            MapLoading.loadMap(touchAreas[area].calling);
                            destroy();
                            enableControls(false);
                            okSound.play();
                        }
                        else {
                            errorSound.play();
                        }
                    }
                }
            }
        });
    }
    LevelInterface.setActive = setActive;
    function create() {
        touchAreas['learning'] = { x: 10, y: 95, calling: "learning", can: SaveData.getData("learning").can };
        touchAreas['darling'] = { x: 200, y: 95, calling: "level1", can: SaveData.getData("level1").can };
        touchAreas['firstlove'] = { x: 410, y: 95, calling: "level2", can: SaveData.getData("level2").can };
        touchAreas['staywithme'] = { x: 10, y: 250, calling: "level3", can: SaveData.getData("level3").can };
        touchAreas['needyou'] = { x: 200, y: 250, calling: "level4", can: SaveData.getData("level4").can };
        touchAreas['loveyou'] = { x: 410, y: 250, calling: "level5", can: SaveData.getData("level5").can };
        islands = 0;
        var screenSize = Global.getScreenSize();
        elements['background'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
        elements['background'].setColor("#9ecdc9");
        elements['background'].setFixed(true);
        elements['background'].setDepth(0);
        elements['back'] = new Render.Drawable(new Render.Texture("assets/back.png"), 10, 10, 150, 150 / 2.25);
        elements['back'].setFixed(true);
        elements['back'].setDepth(1);
        elements['border'] = new Render.Drawable(new Render.Texture("assets/menu_right.png"), screenSize.width - 200, 0, 200, screenSize.height);
        elements['border'].setFixed(true);
        elements['border'].setDepth(1);
        elements['label'] = new Render.Draw.Text(180, 30, "Select a level:", 500, 10);
        elements['label'].setFontSize(50);
        elements['label'].setFont("pixelated");
        elements['label'].setColor("#FFFFFF");
        elements['label'].setFixed(true);
        elements['label'].setDepth(1);
        createIsland(10, 95, SaveData.getData("learning").stars, "Learning", (!SaveData.getData("learning").can));
        createIsland(200, 95, SaveData.getData("level1").stars, "Level 1", (!SaveData.getData("level1").can));
        createIsland(410, 95, SaveData.getData("level2").stars, "Level 2", (!SaveData.getData("level2").can));
        createIsland(10, 250, SaveData.getData("level3").stars, "Level 3", (!SaveData.getData("level3").can));
        createIsland(200, 250, SaveData.getData("level4").stars, "Level 4", (!SaveData.getData("level4").can));
        createIsland(410, 250, SaveData.getData("level5").stars, "Level 5", (!SaveData.getData("level5").can));
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    LevelInterface.create = create;
    function createIsland(x, y, stars, title, locked) {
        islands++;
        elements['background' + islands] = new Render.Drawable(new Render.Texture("assets/menu_item.png"), x, y, 130, 130 / 1.3);
        elements['background' + islands].setFixed(true);
        elements['background' + islands].setDepth(2);
        elements['title' + islands] = new Render.Draw.Text(x - 35, y + 130 / 1.3 + 10, title, 200, 10);
        elements['title' + islands].setFontSize(18);
        elements['title' + islands].setAlign("center");
        elements['title' + islands].setFixed(true);
        elements['title' + islands].setColor("#FFFFFF");
        elements['title' + islands].setDepth(3);
        if (stars >= 1) {
            elements['star1' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x, y, 40, 40);
        }
        else {
            elements['star1' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x, y, 40, 40);
        }
        if (stars >= 2) {
            elements['star2' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x + 45, y, 40, 40);
        }
        else {
            elements['star2' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x + 45, y, 40, 40);
        }
        if (stars == 3) {
            elements['star3' + islands] = new Render.Drawable(new Render.Texture("assets/star_active.png"), x + 90, y, 40, 40);
        }
        else {
            elements['star3' + islands] = new Render.Drawable(new Render.Texture("assets/star_disabled.png"), x + 90, y, 40, 40);
        }
        elements['star1' + islands].setFixed(true);
        elements['star1' + islands].setDepth(4);
        elements['star2' + islands].setFixed(true);
        elements['star2' + islands].setDepth(4);
        elements['star3' + islands].setFixed(true);
        elements['star3' + islands].setDepth(4);
        elements['lock' + islands] = new Render.Drawable(new Render.Texture("assets/lock.png"), x + 65 - 15, y + 20, 30, 40);
        elements['lock' + islands].setFixed(true);
        elements['lock' + islands].setDepth(5);
        if (locked) {
            elements['star1' + islands].setOpacity(0.32);
            elements['star2' + islands].setOpacity(0.32);
            elements['star3' + islands].setOpacity(0.32);
            elements['background' + islands].setOpacity(0.32);
            elements['title' + islands].setOpacity(0.32);
            elements['lock' + islands].setVisible(true);
        }
        else {
            elements['lock' + islands].setVisible(false);
        }
    }
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    LevelInterface.destroy = destroy;
})(LevelInterface || (LevelInterface = {}));
var FinalInterface;
(function (FinalInterface) {
    var elements = [];
    var haveControls = false;
    function enableControls(value) {
        haveControls = value;
    }
    FinalInterface.enableControls = enableControls;
    function setActive() {
        var screenSize = Global.getScreenSize();
        var backButton = new Input.Touch((screenSize.width / 2) - 125, screenSize.height - 250 / 3.5 - 20, 250, 250 / 3.5);
        backButton.on("press", function () {
            if (haveControls) {
                destroy();
                enableControls(false);
                MenuInterface.create();
                setTimeout(function () {
                    MenuInterface.enableControls(true);
                }, 1000);
            }
        });
    }
    FinalInterface.setActive = setActive;
    function create() {
        var screenSize = Global.getScreenSize();
        elements['background1'] = new Render.Draw.Rectangle(0, 0, screenSize.width, screenSize.height);
        elements['background1'].setFixed(true);
        elements['background1'].setColor("#6ca3a6");
        elements['background1'].setDepth(0);
        elements['background2'] = new Render.Draw.Rectangle(100, 0, screenSize.width - 200, screenSize.height);
        elements['background2'].setFixed(true);
        elements['background2'].setColor("#8ab6b8");
        elements['background2'].setDepth(1);
        elements['title'] = new Render.Drawable(new Render.Texture("assets/final_win.png"), (screenSize.width / 2) - 150, 20, 300, 300 / 5.17);
        elements['title'].setFixed(true);
        elements['title'].setDepth(2);
        elements['heart'] = new Render.Drawable(new Render.Texture("assets/final_hearth.png"), (screenSize.width / 2) - 125, 100, 250, 250 / 1.33);
        elements['heart'].setFixed(true);
        elements['heart'].setDepth(2);
        elements['banner'] = new Render.Drawable(new Render.Texture("assets/final_banner.png"), (screenSize.width / 2) - 200, 150, 400, 400 / 3.3);
        elements['banner'].setFixed(true);
        elements['banner'].setDepth(3);
        elements['button'] = new Render.Drawable(new Render.Texture("assets/final_back.png"), (screenSize.width / 2) - 125, screenSize.height - 250 / 3.5 - 20, 250, 250 / 3.5);
        elements['button'].setFixed(true);
        elements['button'].setDepth(4);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    FinalInterface.create = create;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    FinalInterface.destroy = destroy;
})(FinalInterface || (FinalInterface = {}));
var playerBehaviour;
(function (playerBehaviour) {
    var currentPlayer = null;
    var isMoving = false;
    var canJump = true;
    var haveControls = false;
    var splashSound = null;
    var jumpSound = null;
    var joySound = null;
    var victorySound = null;
    var boo = null;
    var generationActive = false;
    var gnerationElements = [];
    function setPlayer(player) {
        currentPlayer = player;
    }
    playerBehaviour.setPlayer = setPlayer;
    function enableControls(value) {
        haveControls = value;
    }
    playerBehaviour.enableControls = enableControls;
    function enableMoving(value) {
        isMoving = value;
    }
    playerBehaviour.enableMoving = enableMoving;
    function active() {
        Update.on(movePlayer);
        splashSound = new Sounds.Sound("assets/sounds/splash.mp3");
        jumpSound = new Sounds.Sound("assets/sounds/jump.ogg");
        joySound = new Sounds.Sound("assets/sounds/joy.ogg");
        victorySound = new Sounds.Sound("assets/sounds/win.mp3");
        boo = new Sounds.Sound("assets/sounds/boo.mp3");
        var screenSize = Global.getScreenSize();
        var touchJump = new Input.Touch(32, screenSize.height / 2 - 80 + 32, 160, 160);
        touchJump.on("press", doJump);
        var touchPunch = new Input.Touch(screenSize.width - 32 - 160, screenSize.height / 2 - 80 + 32, 160, 160);
        touchPunch.on("press", doPunch);
        var stopRecord = new Input.Key(27);
        stopRecord.on("down", function () {
            console.log("stop");
            if (generationActive) {
                console.log(JSON.stringify(gnerationElements));
            }
        });
        world.on("beginContact", function (event) {
            for (var i = _obstacles.length - 1; i >= 0; i--) {
                if ((event.bodyA == currentPlayer || event.bodyB == currentPlayer) && (event.bodyA == _obstacles[i] || event.bodyB == _obstacles[i])) {
                    currentPlayer.takeHealth(1);
                    splashSound.play();
                    currentPlayer.drawables[0].setFreeze(true);
                    enableControls(false);
                    enableMoving(false);
                    currentPlayer.velocity[0] = 0;
                    currentPlayer.velocity[1] = 0;
                    if (currentPlayer.getHealth() <= 0) {
                        ScoreInterface.setMax(ScoreBehaviour.getTotalPoints());
                        ScoreInterface.setScore(ScoreBehaviour.getPoints());
                        ScoreInterface.canDoNextLevel(false);
                        ScoreInterface.create();
                        ScoreInterface.enableControls(true);
                        GameInterface.setVisible(false);
                        boo.play();
                    }
                    else {
                        setTimeout(function () {
                            currentPlayer.drawables[0].setFreeze(false);
                            enableControls(true);
                            enableMoving(true);
                        }, 2000);
                    }
                }
            }
            for (var i = _endFlags.length - 1; i >= 0; i--) {
                if ((event.bodyA == currentPlayer || event.bodyB == currentPlayer) && (event.bodyA == _endFlags[i] || event.bodyB == _endFlags[i])) {
                    var time = 0;
                    enableControls(false);
                    enableMoving(false);
                    currentPlayer.velocity[0] = 0;
                    currentPlayer.velocity[1] = 0;
                    currentPlayer.drawables[0].setFreeze(true);
                    // Start the pingouins party
                    if (ScoreBehaviour.getPoints() != 0) {
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
                    setTimeout(function () {
                        // destroy pingouins
                        for (var i = 0; i < pingouins.length; ++i) {
                            mainCanvas.del(pingouins[i]);
                        }
                        var pourcentage = (ScoreBehaviour.getPoints() * 100) / ScoreBehaviour.getTotalPoints();
                        if (pourcentage < 80) {
                            ScoreInterface.canDoNextLevel(false);
                        }
                        else {
                            if (MapLoading.getNextMap() != "end") {
                                ScoreInterface.canDoNextLevel(true);
                                SaveData.setData(MapLoading.getNextMap(), "can", true);
                            }
                        }
                        // Save stats
                        SaveData.setData(MapLoading.getCurrentMap(), "can", true);
                        SaveData.setData(MapLoading.getCurrentMap(), "done", true);
                        var stars = 0;
                        if (pourcentage >= 50) {
                            stars = 1;
                        }
                        if (pourcentage >= 80) {
                            stars = 2;
                        }
                        if (pourcentage == 100) {
                            stars = 3;
                        }
                        var currentStars = SaveData.getData(MapLoading.getCurrentMap()).stars;
                        if (stars > currentStars) {
                            SaveData.setData(MapLoading.getCurrentMap(), "stars", stars);
                        }
                        SaveData.saveData();
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
    playerBehaviour.active = active;
    function doPunch() {
        if (haveControls) {
            if (generationActive) {
                var pPosition = currentPlayer.getPosition();
                gnerationElements.push(["ennemy", pPosition.x, 0]);
            }
            for (var i = _ennemies.length - 1; i >= 0; i--) {
                var position = _ennemies[i].getPosition();
                var playerPosition = currentPlayer.getPosition();
                if (Global.getDistanceBetween2Points(position.x, position.y, playerPosition.x, playerPosition.y) <= 300) {
                    if (position.x > playerPosition.x) {
                        if (_ennemies[i].isCaptured() == false) {
                            _ennemies[i].setCaptured(true);
                            var texture = new Render.Texture("assets/ennemy2.png");
                            var sprite = new Render.Drawable(texture, 0, 0, 200, 188);
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
    function doJump() {
        if (canJump && haveControls) {
            jumpSound.play();
            currentPlayer.velocity[1] = -2000;
            canJump = false;
            if (generationActive) {
                var pPosition = currentPlayer.getPosition();
                gnerationElements.push(["hole", pPosition.x, 0]);
            }
            setTimeout(function () {
                canJump = true;
            }, 1000);
        }
    }
    function movePlayer() {
        if ((currentPlayer != null) && haveControls) {
            if (isMoving) {
                currentPlayer.velocity[0] = 600;
            }
        }
    }
})(playerBehaviour || (playerBehaviour = {}));
var cameraBehaviour;
(function (cameraBehaviour) {
    var currentCamera = null;
    var followTarget = null;
    var isActive = false;
    function setCamera(camera) {
        currentCamera = camera;
    }
    cameraBehaviour.setCamera = setCamera;
    function follow(element) {
        followTarget = element;
    }
    cameraBehaviour.follow = follow;
    function active() {
        Update.on(update);
        isActive = true;
    }
    cameraBehaviour.active = active;
    function update() {
        if ((currentCamera != null) && (followTarget != null) && (isActive)) {
            var screenSize = Global.getScreenSize();
            var position = followTarget.getPosition();
            currentCamera.setPosition(position.x + screenSize.width / 2 - 100, 0);
        }
    }
})(cameraBehaviour || (cameraBehaviour = {}));
var ScoreBehaviour;
(function (ScoreBehaviour) {
    var maxPoints = 0;
    var currentPoints = 0;
    function setMaxPoints(value) {
        maxPoints = value;
    }
    ScoreBehaviour.setMaxPoints = setMaxPoints;
    function givePoint() {
        currentPoints++;
    }
    ScoreBehaviour.givePoint = givePoint;
    function getPoints() {
        return currentPoints;
    }
    ScoreBehaviour.getPoints = getPoints;
    function getTotalPoints() {
        return maxPoints;
    }
    ScoreBehaviour.getTotalPoints = getTotalPoints;
    function resetScore() {
        currentPoints = 0;
    }
    ScoreBehaviour.resetScore = resetScore;
})(ScoreBehaviour || (ScoreBehaviour = {}));
var snowBehaviour;
(function (snowBehaviour) {
    var elements = [];
    function setActive() {
        var screenSize = Global.getScreenSize();
        var k = 0;
        setInterval(function () {
            k++;
            var z = 0;
            for (var element in elements) {
                z++;
                var position = elements[element].getPosition();
                if (position.y > screenSize.height) {
                    position.y = -400;
                    position.x = 200 * z;
                }
                elements[element].setPosition(position.x + (Math.cos(k) * 5), position.y + 5);
            }
        }, 80);
    }
    snowBehaviour.setActive = setActive;
    function destroy() {
        for (var element in elements) {
            interfaceCanvas.del(elements[element]);
        }
    }
    snowBehaviour.destroy = destroy;
    function create() {
        var snowTexture = new Render.Texture("assets/snow.png");
        elements['snow1'] = new Render.Drawable(snowTexture, 0, 0, 400, 400);
        elements['snow1'].setFixed(true);
        elements['snow2'] = new Render.Drawable(snowTexture, 400, -400, 400, 400);
        elements['snow2'].setFixed(true);
        elements['snow3'] = new Render.Drawable(snowTexture, 200, -300, 400, 400);
        elements['snow3'].setFixed(true);
        for (var element in elements) {
            interfaceCanvas.set(elements[element]);
        }
    }
    snowBehaviour.create = create;
})(snowBehaviour || (snowBehaviour = {}));
/// <reference path="../../dickbutt/engine.d.ts" />
/// <reference path="gameplay/ground.ts" />
/// <reference path="gameplay/player.ts" />
/// <reference path="gameplay/obstacle.ts" />
/// <reference path="gameplay/ennemy.ts" />
/// <reference path="gameplay/endFlag.ts" />
/// <reference path="gameplay/mapLoading.ts" />
/// <reference path="gameplay/background.ts" />
/// <reference path="gameplay/iceberg.ts" />
/// <reference path="gameplay/saveData.ts" />
/// <reference path="interface/game.ts" />
/// <reference path="interface/score.ts" />
/// <reference path="interface/starting.ts" />
/// <reference path="interface/menu.ts" />
/// <reference path="interface/level.ts" />
/// <reference path="interface/final.ts" />
/// <reference path="gameplay/behaviours/playerBehaviour.ts" />
/// <reference path="gameplay/behaviours/cameraBehaviour.ts" />
/// <reference path="gameplay/behaviours/scoreBehaviour.ts" />
/// <reference path="gameplay/behaviours/snowBehaviour.ts" />
/*    --------------------------------------------------- *\
        Game
\*    --------------------------------------------------- */
var mainCanvas = null;
var interfaceCanvas = null;
/*    --------------------------------------------------- *\
        Main file
\*    --------------------------------------------------- */
// Waiting for the loading of the DOM
window.addEventListener("load", function () {
    if (Global.isAndroid()) {
        document.addEventListener("deviceready", startApp);
        console.log("Running on Android...");
    }
    else {
        startApp();
    }
});
/*    --------------------------------------------------- *\
        Global vars
\*    --------------------------------------------------- */
var sX = null, sY = null;
var ratio = null;
var world;
var scene;
var cam;
/*    --------------------------------------------------- *\
        [function] startTheApp()

        * Démarre l'application quand on est prêt. *

        Return: nil
\*    --------------------------------------------------- */
function startApp() {
    sX = window.innerWidth;
    sY = window.innerHeight;
    ratio = sX / sY;
    mainCanvas = new Render.Layer();
    mainCanvas.setSmooth(false);
    mainCanvas.affectedByCamera = true;
    interfaceCanvas = new Render.Layer();
    interfaceCanvas.setSmooth(false);
    Render.add("assets/spriter/walking.png");
    Render.add("assets/spriter/walking_pingouin.png");
    Render.add("assets/spriter/jump_pingouin.png");
    Render.add("assets/background.jpg");
    Render.add("assets/hole_sprite.png");
    Render.add("assets/ice.png");
    Render.add("assets/iceberg1_sprite.png");
    Render.add("assets/iceberg2_sprite.png");
    Render.add("assets/iceberg3_sprite.png");
    Render.ready(function () {
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
        windSound.on("ready", function () {
            console.log("ok", windSound);
            windSound.play();
        });
        windSound.on("end", function () {
            windSound.stop();
            windSound.play();
        });
        var mainSound = new Sounds.Sound("assets/sounds/howareyou.mp3");
        mainSound.setVolume(0.1);
        mainSound.on("ready", function () {
            mainSound.play();
        });
        mainSound.on("end", function () {
            mainSound.stop();
            mainSound.play();
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
        /*    --------------------------------------------------- *\
                Getting data
        \*    --------------------------------------------------- */
        SaveData.loadData();
        GameInterface.create();
        GameInterface.setVisible(false);
        ScoreInterface.setActive();
        snowBehaviour.create();
        snowBehaviour.setActive();
        LevelInterface.setActive();
        MenuInterface.setActive();
        MenuInterface.enableControls(true);
        MenuInterface.create();
        FinalInterface.setActive();
        /*    --------------------------------------------------- *\
                Map loading
        \*    --------------------------------------------------- */
        //MapLoading.loadMap("learning");
        MapLoading.whenLoaded(function () {
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
            setTimeout(function () {
                StartingInterface.destroy();
                GameInterface.setVisible(true);
                setTimeout(function () {
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
