// This class handles the execution of any given animation configuration.

export class FrameIndexPattern {
	constructor(animationConfig) {
		this.currentTime = 0;
		this.frames = animationConfig.frames ?? [];
		this.duration = animationConfig.duration ?? 500;
	}

	// Based on the overall time passed (currentTime), display the correct frame from the animation configuration.
	get frame() {
		for (let i = this.frames.length - 1; i >= 0; i--) {
			if (this.currentTime >= this.frames[i].time) {
				return this.frames[i].frame;
			}
		}
		throw 'Time is before the first keyframe.';
	}

	// Utilizng the GameLoop delta, and an internal state variable for time...
	// Every frame, this method runs and determines if the animation has run it's course based on the duration.
	// If animation has run it's course, reset it to start at the beginning again.
	step(delta) {
		this.currentTime += delta;
		if (this.currentTime >= this.duration) {
			this.currentTime = 0;
		}
	}
}
