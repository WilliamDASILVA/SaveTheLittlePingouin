class Ground extends Elements{
	private size: any;
	constructor(world :any){
		super(0);

		this.setType("ground");
		this.canCollideWith("player");
		this.setSize(500, 500);
		this.setFixedRotation(true);

		var shape = new p2.Box(this.getSize());
		this.addShape(shape);

		var texture = new Render.Draw.Rectangle(0, 0, this.getSize().width, this.getSize().height);
		texture.setColor("#FF0000");
		this.assignDrawable(texture);

		if(world){
			world.addBody(this);
		}

	}

	setSize(width, height){
		this.size = { width: width, height: height };
	}

	getSize(){
		return this.size;
	}
}