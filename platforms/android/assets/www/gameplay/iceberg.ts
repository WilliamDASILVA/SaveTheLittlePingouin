class Iceberg extends Elements{
	icebergType: string;

	constructor(world : any){
		super(0);
		this.icebergType = "iceberg" + Global.getRandom(1,3) + "_sprite.png";
		this.setType("iceberg");

		

		if(world){
			world.addBody(this);
		}
	}
}