export class GameLoop {
	constructor(update, render) {
		this.update = update;
		this.render = render;

		this.lastFrameTime = 0;
		this.accumulatedTime = 0;
		this.timeStep = 1000 / 60; // 60 FPS
		this.rafId = null; // Request Animation Frame ID
		this.isRunning = false;
	}

	mainLoop = (timestamp) => {
		if (!this.isRunning) return;

		// Using the timestamp from requestAnimationFrame, we can determine how much time has passed since the last time this function was run.
		let deltaTime = timestamp - this.lastFrameTime;
		this.lastFrameTime = timestamp;

		// Accumulate all the time since the last frame.
		this.accumulatedTime += deltaTime;

		// Once enough time has passed (1 frame based on our this.timeStep), we can update the game state with the passed in update function.
		// Then reset this.accumulatedTime to begin counting time again.
		while (this.accumulatedTime >= this.timeStep) {
			this.update(this.timeStep);
			this.accumulatedTime -= this.timeStep;
		}

		// Render - we let this run as fast as the browser wants to.
		this.render();

		// requestAnimationFrame is a browser function that tells the browser you wish to perform an animation.
		// It requests the browser to call a user-supplied callback function before the next repaint of the screen.
		// The frequency of the calls will generally match the display refresh rate.
		// The function returns a unique request ID that identifies the entry in the callback list, which can be used to cancel the callback request (i.e. when pausing the game).
		// If we used a regular infinite loop, it would go too fast and the browser would use A LOT of memory.
		this.rafId = requestAnimationFrame(this.mainLoop);
	};

	start() {
		if (!this.isRunning) {
			this.isRunning = true;
		}
		this.rafId = requestAnimationFrame(this.mainLoop);
	}

	stop() {
		if (this.rafId) {
			cancelAnimationFrame(this.rafId);
		}
		this.isRunning = false;
	}
}
