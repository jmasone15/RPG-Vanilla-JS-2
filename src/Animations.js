export class Animations {
	constructor(patterns) {
		this.patterns = patterns;
		this.activeKey = Object.keys(this.patterns)[0];
	}

	// Called in the sprite step method to set the sprite's frame.
	get frame() {
		return this.patterns[this.activeKey].frame;
	}

	// This method overwrites the current active animation loop with a new one.
	// The activeKey animation will keep running until told otherwise (using this play method).
	play(key, startAtTime = 0) {
		// Already playing this one
		if (this.activeKey === key) {
			return;
		}

		// Switch
		this.activeKey = key;
		this.patterns[this.activeKey].currentTime = startAtTime;
	}

	step(delta) {
		this.patterns[this.activeKey].step(delta);
	}
}
