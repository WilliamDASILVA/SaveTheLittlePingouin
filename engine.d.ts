/// <reference path="p2.d.ts" />
/// <reference path="tween.d.ts" />
declare module Global {
    function getScreenSize(): {
        width: number;
        height: number;
    };
    function getDistanceBetween2Points(aX: number, aY: number, bX: number, bY: number): number;
    function getPositionFromScreen(screenX: any, screenY: any, cam: any): {
        x: any;
        y: any;
    };
    function getPositionFromWorld(worldX: any, worldY: any, cam: any): {
        x: number;
        y: number;
    };
    function findRotation(x1: any, y1: any, x2: any, y2: any): number;
    function getRandom(min: number, max: number): number;
    function getTrunc(x: number): number;
    function isAndroid(): boolean;
    class XHR {
        request: any;
        functionsToCallWhenReady: any;
        functionsToCallWhenLoaded: any;
        constructor(target: string, ...parameters: any[]);
        ready(functionToCall: any): void;
        load(functionToCall: any): void;
    }
}
declare class Events {
    events: any;
    constructor();
    emit(eventName: string, ...args: any[]): void;
    on(eventName: string, functionToCall: any): void;
}
declare var _elements: any[];
declare var collisionGroups: any[];
declare var collisionNumber: number;
declare class Elements extends p2.Body {
    haveCollision: boolean;
    backupShape: any;
    drawables: any;
    eType: string;
    datas: any[];
    static: boolean;
    shapeAngle: number;
    depth: number;
    canCollide: string[];
    colGroup: number;
    isSensor: boolean;
    constructor(mass?: number, isStatic?: boolean);
    getDepth(): number;
    setDepth(depth: number): void;
    addShape(shape: any, offset?: any, angle?: any): void;
    setPosition(x: number, y: number): void;
    setRotation(angle: number): void;
    getRotation(): number;
    getPosition(): {
        x: number;
        y: number;
    };
    assignDrawable(drawable: any): void;
    getAssignedDrawables(): any;
    setType(eType: string): void;
    private addCollisionGroup();
    getType(): string;
    setCollisionId(id: number): void;
    getCollisionId(): number;
    setData(dataName: string, dataValue: any): void;
    getData(dataName: string): any;
    setMass(mass: number): void;
    getMass(): number;
    setFixedRotation(value: boolean): void;
    getFixedRotation(): boolean;
    canCollideWith(...parameters: string[]): void;
    updateCollisions(): void;
    destroy(): void;
}
declare class Scene {
    origin: any;
    constructor();
    getOrigin(): any;
}
declare class Camera extends Scene {
    private position;
    private parentScene;
    private depth;
    private depthPosition;
    private angle;
    private rotationPoint;
    private isCameraLock;
    private cameraLockOn;
    constructor(scene: any);
    setPosition(x: number, y: number): void;
    getPosition(): any;
    getDepth(): number;
    setDepth(depth: number): void;
    setDepthPosition(x: number, y: number): void;
    getDepthPosition(): any;
    setRotationPoint(x: number, y: number): void;
    getRotationPoint(): any;
    setRotation(angle: number): void;
    getRotation(): number;
    getOrigin(): {
        x: number;
        y: number;
    };
    lockTo(element: Elements): void;
    unlock(): void;
    getLockElement(): Elements;
    isLock(): boolean;
}
declare module Input {
    class MouseMove extends Events {
        constructor();
    }
    class Mouse extends Events {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        setPosition(x: number, y: number): void;
        setSize(width: number, height: number): void;
    }
    class Click extends Events {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        setPosition(x: number, y: number): void;
        setSize(width: number, height: number): void;
    }
    class Touch extends Events {
        x: number;
        y: number;
        width: number;
        height: number;
        constructor(x?: number, y?: number, width?: number, height?: number);
        setPosition(x: number, y: number): void;
        setSize(width: number, height: number): void;
    }
    class Key extends Events {
        keyPressed: any;
        constructor(...rest: any[]);
        setKey(newKey: any): void;
    }
    class Scroll extends Events {
        constructor();
    }
}
declare module Update {
    function world(world: any): void;
    function camera(camera: Camera): void;
    function on(functionToCall: any): void;
}
declare module Render {
    function setCamera(cam: any): void;
    function getCamera(): any;
    function add(elementToDownload: any): void;
    function setDebugMode(value: boolean, type?: string): void;
    function getWorld(): any;
    function setWorld(world: any): void;
    function download(): void;
    function ready(functionToCall: any): void;
    function updateRender(layer: any): void;
}
declare module Render {
    class Layer {
        canvasElement: any;
        context: any;
        elements: any;
        smooth: boolean;
        affectedByCamera: boolean;
        constructor();
        render(): void;
        set(element: any): void;
        del(element: any): void;
        getContext(): any;
        getCanvas(): any;
        getElements(): any;
        setSmooth(value: boolean): void;
        isSmooth(): boolean;
    }
}
declare module Render {
    class Texture {
        src: string;
        data: any;
        constructor(src: string);
        getData(): any;
        setSrc(src: string): void;
        onLoad(functionToCall: any): void;
    }
}
declare module Render {
    class Drawable {
        texture: any;
        position: any;
        size: any;
        depth: number;
        rotation: number;
        sprite: boolean;
        opacity: number;
        fixed: boolean;
        type: string;
        flipped: boolean;
        fixedToCenter: boolean;
        rotationPoint: any;
        visible: boolean;
        layout: any;
        smooth: boolean;
        offset: any;
        haveCrop: boolean;
        crop: any;
        constructor(texture: any, ...parameters: any[]);
        isCropped(): boolean;
        setCrop(x: number, y: number, width: number, height: number): void;
        getCrop(): any;
        getOffset(): any;
        setOffset(x: any, y: any): void;
        setPosition(x: number, y: number): void;
        getPosition(): any;
        getSize(): any;
        setSize(width: number, height: number): void;
        getData(): any;
        getDepth(): number;
        setDepth(depth: number): void;
        setRotation(angle: number): void;
        getRotation(): number;
        getOpacity(): number;
        setOpacity(opacity: number): void;
        isSprite(sprite: boolean): boolean;
        setFixed(isFixed: boolean): void;
        isFixed(): boolean;
        setType(type: string): void;
        getType(): string;
        isFlipped(value: boolean): boolean;
        setRotationPoint(x: number, y: number): void;
        getRotationPoint(): any;
        isVisible(): boolean;
        setVisible(value: boolean): void;
        setLayout(layout: any): void;
        setSmooth(value: boolean): void;
        isSmooth(): boolean;
    }
}
declare module Render {
    class Sprite extends Drawable {
        frameSize: any;
        frameAmount: number;
        currentFrame: number;
        currentInterval: any;
        frameLine: number;
        fps: number;
        freezed: boolean;
        loop: boolean;
        loopFinished: boolean;
        constructor(texture: any, ...parameters: any[]);
        setFrameSize(width: number, height: number): void;
        getFrameSize(): any;
        setFrameAmount(frameAmount: number): void;
        getFrameAmount(): number;
        setCurrentFrame(frame: number): void;
        getCurrentFrame(): number;
        setFrameLine(line: number): void;
        getFrameLine(): number;
        setFrameSpeed(fps: number): void;
        getFrameSpeed(): number;
        setFreeze(value: boolean): void;
        setUniqueLoop(loop: any): void;
        playUniqueLoop(): void;
    }
}
declare module Render {
    module Draw {
        class Draw extends Drawable {
            color: string;
            strokeSize: number;
            strokeColor: string;
            shape: string;
            shadowEnabled: boolean;
            shadowColor: string;
            shadowBlur: number;
            shadowPosition: any;
            constructor();
            setColor(color: string): void;
            getColor(): string;
            setStrokeSize(size: number): void;
            getStrokeSize(): number;
            setStrokeColor(color: string): void;
            getStrokeColor(): string;
            getShape(): string;
            setShadow(value: boolean): void;
            isShadowEnabled(): boolean;
            setShadowColor(color: string): void;
            getShadowColor(): string;
            setShadowBlur(size: number): void;
            getShadowBlur(): number;
            setShadowPosition(x: number, y: number): void;
            getShadowPosition(): any;
        }
    }
}
declare module Render {
    module Draw {
        class Rectangle extends Draw {
            constructor(...parameters: any[]);
        }
    }
}
declare module Render {
    module Draw {
        class Circle extends Draw {
            radius: number;
            constructor(...parameters: any[]);
            setRadius(radius: number): void;
            getRadius(): number;
        }
    }
}
declare module Render {
    module Draw {
        class Polygon extends Draw {
            vertices: any;
            constructor(vertices: any);
            getVertices(): any;
            setVerticePosition(vertice: number, x: number, y: number): void;
        }
    }
}
declare module Render {
    module Draw {
        class Line extends Draw {
            target: any;
            constructor(...parameters: any[]);
            setTarget(x: number, y: number): void;
            getTarget(): any;
        }
    }
}
declare module Render {
    module Draw {
        class Text extends Draw {
            value: string;
            font: string;
            fontSize: number;
            fontStyle: string;
            baseLine: string;
            align: string;
            verticalAlign: string;
            isMultiline: boolean;
            constructor(...parameters: any[]);
            getValue(): string;
            setValue(value: string): void;
            setFont(fontName: string): void;
            getFont(): string;
            setFontSize(fontSize: number): void;
            getFontSize(): number;
            setFontStyle(style: string): void;
            getFontStyle(): string;
            setBaseline(baseline: string): void;
            getBaseline(): string;
            setAlign(alignment: string): void;
            getAlign(): string;
            setVerticalAlign(alignement: string): void;
            getVerticalAlign(): string;
            setMultiline(value: boolean): void;
        }
    }
}
declare module Render {
    module Draw {
        class Point extends Draw {
            constructor(x: number, y: number);
        }
    }
}
declare module Grid {
    class Grid {
        position: any;
        size: any;
        parentScene: any;
        tileSize: number;
        table: any;
        tiles: any;
        type: string;
        constructor(width: number, height: number, tileSize: number, scene: any);
        setSize(width: number, height: number): void;
        getSize(): any;
        setTileSize(tileSize: number): void;
        getTileSize(): number;
        getTiles(): any;
        addTile(tile: any): void;
        setType(type: string): void;
        getType(): string;
        getTileFromPosition(posX: number, posY: number, relativeToTheGrid: boolean): any;
        getPosition(): any;
        setPosition(x: number, y: number): void;
    }
    class Tile extends Elements {
        parentGrid: any;
        gridPos: any;
        constructor(parentGrid: any, x: number, y: number);
        getParentGrid(): any;
        getPositionIntoGrid(): any;
    }
}
declare module UI {
    function isInputEnabled(): boolean;
    function getUsedCanvas(): any;
}
declare module UI {
    class GUI extends Render.Draw.Draw {
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
        constructor();
        setParent(parentElement: any): void;
        getParent(): any;
        setPosition(x: number, y: number): void;
        getPosition(...type: boolean[]): any;
        setSize(width: number, height: number): void;
        setChildren(child: any): void;
        getChildrens(): any;
        getElements(): any;
        isVisible(): boolean;
        setDepth(depth: number): void;
        setOpacity(opacity: number): void;
        setVisible(value: boolean): void;
        click(functionToCall: any): void;
        out(functionToCall: any): void;
        hover(functionToCall: any): void;
        leave(functionToCall: any): void;
    }
}
declare module UI {
    class Window extends GUI {
        constructor(x: number, y: number, width: number, height: number);
    }
}
declare module UI {
    class Label extends GUI {
        value: string;
        constructor(x: number, y: number, width: number, height: number, text: string, ...rest: any[]);
        setValue(value: string): void;
        getValue(): string;
        setFontSize(size: number): void;
        setFontStyle(style: string): void;
        setFont(fontName: string): void;
        setBaseline(baseline: string): void;
        setAlign(alignment: string): void;
    }
}
declare module UI {
    class Button extends GUI {
        value: string;
        constructor(x: number, y: number, width: number, height: number, ...rest: any[]);
        setValue(value: string): void;
        getValue(): string;
        setBackgroundColor(color: string): void;
    }
}
declare module UI {
    class Field extends GUI {
        value: string;
        visibleValue: string;
        placeholder: string;
        focus: boolean;
        constructor(x: number, y: number, width: number, height: number, ...rest: any[]);
        isFocused(bool: any): boolean;
        setValue(value: string): void;
        getValue(): string;
        setPlaceholder(placeholder: string): void;
    }
}
declare module UI {
    class Checkbox extends GUI {
        checked: boolean;
        functionsToCallWhenCheck: any;
        constructor(x: number, y: number, width: number, height: number, ...rest: any[]);
        isChecked(): boolean;
        setCheck(bool: boolean): void;
        check(functionToCall: any): void;
    }
}
declare module Sounds {
    function setEnabled(value: boolean): void;
    class Sound extends Events {
        element: any;
        path: string;
        duration: number;
        currentTime: number;
        volume: number;
        muted: boolean;
        muteTemp: number;
        request: any;
        source: any;
        isReady: boolean;
        playing: boolean;
        constructor(path: string);
        getPath(): string;
        setPath(path: string): void;
        getDuration(): number;
        getVolume(): number;
        setVolume(volume: number): void;
        setCurrentTime(time: number): void;
        getCurrentTime(): number;
        isMute(): boolean;
        play(): void;
        pause(): void;
        stop(): void;
        mute(): void;
        isPlaying(): boolean;
        unmute(): void;
    }
}
declare module Fonts {
    class FontFace {
        name: string;
        path: string;
        styleElement: any;
        constructor(name: string, path: string);
        updateCSS(): void;
        setName(name: string): void;
        setPath(path: string): void;
        getName(): string;
        getPath(): string;
    }
}
