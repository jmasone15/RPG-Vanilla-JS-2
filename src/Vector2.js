import { CONSTANTS } from './helpers/constants';

export class Vector2 {
	constructor(x = 0, y = 0) {
		this.x = x;
		this.y = y;
	}

	duplicate() {
		return new Vector2(this.x, this.y);
	}

	matches({ x, y }) {
		return this.x === x && this.y === y;
	}

	toNeighbor(dir) {
		let neighbor = this.duplicate();

		const { directions, heroSize } = CONSTANTS;
		const { LEFT, RIGHT, UP } = directions;

		switch (dir) {
			case LEFT:
				neighbor.x -= heroSize;
				break;
			case RIGHT:
				neighbor.x += heroSize;
				break;
			case UP:
				neighbor.y -= heroSize;
				break;

			default:
				neighbor.y += heroSize;
				break;
		}

		return neighbor;
	}
}
