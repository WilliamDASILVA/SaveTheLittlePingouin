class Player extends Elements{
	constructor(world : any){
		super(10, false);

		this.setType("player");
		this.canCollideWith("ground");
		this.setFixedRotation(true);

		var shape = new p2.Box({ width: 50, height: 50 });
		this.addShape(shape);

		var texture = new Render.Draw.Rectangle(0, 0, 50, 50);
		texture.setColor("#00FF00");
		this.assignDrawable(texture);


		if(world){
			world.addBody(this);
		}
	}
}