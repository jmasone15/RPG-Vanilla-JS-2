import { Vector2 } from '../Vector2';
import { Sprite } from '../Sprite';
import { resources } from '../Resource';
import { GameObject } from '../GameObject';
import { events } from '../Events';

export class Rod extends GameObject {
	constructor({ position, offset }) {
		super({
			position: position,
			offset: offset ?? new Vector2(0, -5)
		});

		const sprite = new Sprite({
			resource: resources.images.rod
		});
		this.addChild(sprite);

		events.on('HERO_POSITION', this, (heroPos) => {
			// Collision Event
			const { x, y } = this.position;

			if (heroPos.x === x && heroPos.y === y) {
				this.onCollideWithHero();
			}
		});
	}

	onCollideWithHero() {
		// Remove this instance from the scene.
		this.destroy();

		// Alert other things that we picked up a rod.
		events.emit('HERO_PICKS_UP_ITEM', {
			image: resources.images.rod,
			position: this.position
		});
	}
}
