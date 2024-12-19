import { GameObject } from './GameObject';
import { events } from './Events';
import { CONSTANTS } from './helpers/constants';
import { Vector2 } from './Vector2';

export class Camera extends GameObject {
	constructor() {
		super({});

		events.on('HERO_POSITION', this, (heroPosition) => {
			this.centerPositionOnTarget(heroPosition);
		});
	}

	centerPositionOnTarget(position) {
		// Create a new camera position based on the incoming position
		// This math will determine a camera position that is in the center of the screen while accounting for the size of the hero.

		const { cWidth, cHeight, heroSize } = CONSTANTS;
		const negPersonHalf = (heroSize / 2) * -1;
		const halfWidth = negPersonHalf + cWidth / 2;
		const halfHeight = negPersonHalf + cHeight / 2;

		this.position = new Vector2(
			-position.x + halfWidth,
			-position.y + halfHeight
		);
	}
}
