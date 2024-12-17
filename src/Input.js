export const DIRECTIONS = {
	LEFT: 'LEFT',
	RIGHT: 'RIGHT',
	UP: 'UP',
	DOWN: 'DOWN'
};

export class Input {
	constructor() {
		this.keyCodes = {
			up: ['ArrowUp', 'KeyW'],
			down: ['ArrowDown', 'KeyS'],
			left: ['ArrowLeft', 'KeyA'],
			right: ['ArrowRight', 'KeyD']
		};

		this.heldDirections = [];

		// You could take the approach of "if this key is pressed increase hero position by that number"
		// But it has some strange side effects when pressing multiple keys at once.
		// This method of keeping a running list of all currently pressed keys, will make the game feel a little smoother.

		document.addEventListener('keydown', (e) => {
			if (this.keyCodes.up.includes(e.code)) {
				this.onArrowPressed(DIRECTIONS.UP);
			}
			if (this.keyCodes.down.includes(e.code)) {
				this.onArrowPressed(DIRECTIONS.DOWN);
			}
			if (this.keyCodes.left.includes(e.code)) {
				this.onArrowPressed(DIRECTIONS.LEFT);
			}
			if (this.keyCodes.right.includes(e.code)) {
				this.onArrowPressed(DIRECTIONS.RIGHT);
			}
		});

		document.addEventListener('keyup', (e) => {
			if (this.keyCodes.up.includes(e.code)) {
				this.onArrowReleased(DIRECTIONS.UP);
			}
			if (this.keyCodes.down.includes(e.code)) {
				this.onArrowReleased(DIRECTIONS.DOWN);
			}
			if (this.keyCodes.left.includes(e.code)) {
				this.onArrowReleased(DIRECTIONS.LEFT);
			}
			if (this.keyCodes.right.includes(e.code)) {
				this.onArrowReleased(DIRECTIONS.RIGHT);
			}
		});
	}

	// Grab the most recently pressed direction in the array. (Note, could be undefined)
	get direction() {
		return this.heldDirections[0];
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
