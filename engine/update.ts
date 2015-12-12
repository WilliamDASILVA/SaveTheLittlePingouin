/*	--------------------------------------------------- *\
		Update
\*	--------------------------------------------------- */
module Update{

	var worldToUpdate = null;
	var cameraToUpdate = null;
	var functionsToCallWhenUpdate = [];

	/*	--------------------------------------------------- *\
			[function] world(worldToUpdate)
	
			* Démarre l'updating du world *
	
			Return: nil
	\*	--------------------------------------------------- */
	export function world(world : any){
		worldToUpdate = world;
		requestAnimationFrame(step);
	}

	/*	--------------------------------------------------- *\
			[function] camera(cameraToUpdate)
	
			* Update the camera position *
	
			Return: nil
	\*	--------------------------------------------------- */
	export function camera(camera : Camera){
		cameraToUpdate = camera;
	}

	/*	--------------------------------------------------- *\
			[function] step()
	
			* Step the world *
	
			Return: nil
	\*	--------------------------------------------------- */
	var timeStep = 1 / 60, maxSubSteps = 10, lastTime;
	function step(t){
        requestAnimationFrame(step);
        // update elements
        for (var i = _elements.length - 1; i >= 0; i--) {
            var pos = _elements[i].getPosition();
            _elements[i].setPosition(pos.x, pos.y);
            _elements[i].setRotation(_elements[i].getRotation());
        }

        // camera mouvement
        if(cameraToUpdate && cameraToUpdate.isLock()){
			var lockOnPosition = cameraToUpdate.getLockElement().getPosition();
			cameraToUpdate.setPosition(lockOnPosition.x, lockOnPosition.y);
        }

        // call update functions
        for (var i = functionsToCallWhenUpdate.length - 1; i >= 0; i--) {
			functionsToCallWhenUpdate[i]();
        }
        
        var dt = t !== undefined && lastTime !== undefined ? t / 1000 - lastTime : 0;
        worldToUpdate.step(timeStep, dt, maxSubSteps);
        lastTime = t / 1000;
	}

	/*	--------------------------------------------------- *\
			[function] on(functionToCall)
	
			* Quand le world est mis à jour *
	
			Return: nil
	\*	--------------------------------------------------- */
	export function on(functionToCall : any){
		functionsToCallWhenUpdate.push(functionToCall);
	}
}