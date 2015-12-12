/*	--------------------------------------------------- *\
		[class] Camera()

		* Crée une camera *

		Return: camera
\*	--------------------------------------------------- */
class Camera extends Scene{

	private position : any;
	private parentScene : any;
	private depth: number;
	private depthPosition: any;
	private angle: number;
	private rotationPoint: any;
	private isCameraLock: boolean;
	private cameraLockOn: Elements;

	/*	--------------------------------------------------- *\
			[function] constructor()
	
			* Quand une camera est crée *
	
			Return: nil
	\*	--------------------------------------------------- */
	constructor(scene:any){
		super();
		this.parentScene = scene;
        this.position = { x: 0, y: 0 };
		this.depth = 1;
		this.depthPosition = { x: 0, y: 0 };

		this.rotationPoint = { x: 0, y: 0 };
		this.angle = 0;

		this.isCameraLock = false;
		this.cameraLockOn = null;
	}

	/*	--------------------------------------------------- *\
			[function] setPosition()
	
			* Set la position de la camera *
	
			Return: nil
	\*	--------------------------------------------------- */
	setPosition(x : number, y : number){
		var sceneOrigin = this.parentScene.getOrigin();
		this.position = {x : sceneOrigin.x + x, y : sceneOrigin.y + y};
	}


	/*	--------------------------------------------------- *\
			[function] getPosition()
	
			* Get la position de la camera *
	
			Return: position
	\*	--------------------------------------------------- */
	getPosition(){
		return this.position;
	}

	/*	--------------------------------------------------- *\
			[function] getDepth()
	
			* Return the depth of the camera *
	
			Return: depth
	\*	--------------------------------------------------- */
	getDepth(){
		return this.depth;
	}

	/*	--------------------------------------------------- *\
			[function] setDepth(depth)
	
			* Set the depth of the camera *
	
			Return: nil
	\*	--------------------------------------------------- */
	setDepth(depth : number){
		this.depth = depth;
	}

	/*	--------------------------------------------------- *\
			[function] setDepthPosition(x, y)
	
			* Set the position of the depth change *
	
			Return: nil
	\*	--------------------------------------------------- */
	setDepthPosition(x : number, y : number){
		this.depthPosition = { x: x, y: y};
	}

	/*	--------------------------------------------------- *\
			[function] getDepthPosition()
	
			* Return the position of the depth *
	
			Return: depthPosition
	\*	--------------------------------------------------- */
	getDepthPosition(){
		return this.depthPosition;
	}

	/*	--------------------------------------------------- *\
			[function] setRotationPoint(x, y)
	
			* Set the point of rotation *
	
			Return: nil
	\*	--------------------------------------------------- */
	setRotationPoint(x : number, y : number){
		this.rotationPoint = { x: x, y: y };
	}

	/*	--------------------------------------------------- *\
			[function] getRotationPoint()
	
			* Return the point of rotation *
	
			Return: nil
	\*	--------------------------------------------------- */
	getRotationPoint(){
		return this.rotationPoint;
	}

	/*	--------------------------------------------------- *\
			[function] setRotation(angle in degres)
	
			* Set the rotation of the camera *
	
			Return: nil
	\*	--------------------------------------------------- */
	setRotation(angle : number){
		this.angle = (angle * Math.PI)/180;
	}

	/*	--------------------------------------------------- *\
			[function] getRotation()
	
			* Return the angle of the camera *
	
			Return: angle in radian
	\*	--------------------------------------------------- */
	getRotation(){
		return this.angle;
	}

	/*	--------------------------------------------------- *\
			[function] getOrigin()
	
			* Retourne la position d'origine de la camera *
	
			Return: position
	\*	--------------------------------------------------- */
	getOrigin(){
        return { x: this.position.x - (sX / 2), y: this.position.y - (sY / 2) };
	}

	/*	--------------------------------------------------- *\
			[function] lockTo(element)
	
			* Lock the camera position to a specific element *
	
			Return: nil
	\*	--------------------------------------------------- */
	lockTo(element : Elements){
		this.isCameraLock = true;
		this.cameraLockOn = element;
	}

	/*	--------------------------------------------------- *\
			[function] unlock()
	
			* Unlock the camera position *
	
			Return: nil
	\*	--------------------------------------------------- */
	unlock(){
		this.isCameraLock = false;
		this.cameraLockOn = null;
	}

	/*	--------------------------------------------------- *\
			[function] getLockElement()
	
			* Return the camera's lock element *
	
			Return: Elements
	\*	--------------------------------------------------- */
	getLockElement(){
		return this.cameraLockOn;
	}

	/*	--------------------------------------------------- *\
			[function] isLock()
	
			* Check if the camera is lock or not *
	
			Return: true, false
	\*	--------------------------------------------------- */
	isLock(){
		return this.isCameraLock;
	}

}