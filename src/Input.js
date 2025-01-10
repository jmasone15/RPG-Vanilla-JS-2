import { CONSTANTS } from './helpers/constants';

export class Input {
	constructor() {
		this.heldDirections = [];
		this.keys = {};
		this.lastKeys = {};

		const { keyCodes, directions } = CONSTANTS;
		const { keyUp, keyDown, keyLeft, keyRight } = keyCodes;
		const { UP, DOWN, LEFT, RIGHT } = directions;

		// You could take the approach of "if this key is pressed increase hero position by that number"
		// But it has some strange side effects when pressing multiple keys at once.
		// This method of keeping a running list of all currently pressed keys, will make the game feel a little smoother.

		document.addEventListener('keydown', (e) => {
			this.keys[e.code] = true;

			if (keyUp.includes(e.code)) {
				this.onArrowPressed(UP);
			}
			if (keyDown.includes(e.code)) {
				this.onArrowPressed(DOWN);
			}
			if (keyLeft.includes(e.code)) {
				this.onArrowPressed(LEFT);
			}
			if (keyRight.includes(e.code)) {
				this.onArrowPressed(RIGHT);
			}
		});

		document.addEventListener('keyup', (e) => {
			this.keys[e.code] = false;

			if (keyUp.includes(e.code)) {
				this.onArrowReleased(UP);
			}
			if (keyDown.includes(e.code)) {
				this.onArrowReleased(DOWN);
			}
			if (keyLeft.includes(e.code)) {
				this.onArrowReleased(LEFT);
			}
			if (keyRight.includes(e.code)) {
				this.onArrowReleased(RIGHT);
			}
		});
	}

	// Grab the most recently pressed direction in the array. (Note, could be undefined)
	get direction() {
		return this.heldDirections[0];
	}

	update() {
		// Diff the keys on previous frame to know when new ones are pressed.
		this.lastKeys = { ...this.keys };
	}

	getActionJustPressed(keyCode) {
		let justPressed = false;
		if (this.keys[keyCode] && !this.lastKeys[keyCode]) {
			justPressed = true;
		}

		return justPressed;
	}

	// If the direction isn't currently in the array, add it to the front.
	onArrowPressed(direction) {
		// Add this arrow to the queue if it's new
		if (this.heldDirections.indexOf(direction) === -1) {
			this.heldDirections.unshift(direction);
		}
	}
	onArrowReleased(direction) {
		const index = this.heldDirections.indexOf(direction);
		if (index === -1) {
			return;
		}

		// Remove this direction from the list.
		this.heldDirections.splice(index, 1);
	}
}
