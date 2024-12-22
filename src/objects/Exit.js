import { GameObject } from '../GameObject';
import { resources } from '../Resource';
import { Sprite } from '../Sprite';
import { Vector2 } from '../Vector2';
import { events } from '../Events';

export class Exit extends GameObject {
	constructor({ position, offset }) {
		super({
			position: position,
			offset: offset ?? new Vector2()
		});

		const sprite = new Sprite({
			resource: resources.images.exit
		});

		this.addChild(sprite);
	}

	ready() {
		console.log('EXIT IS READY');

		events.on('HERO_POSITION', this, (heroPos) => {
			// Collision Event
			const { x, y } = this.position;

			if (heroPos.x === x && heroPos.y === y) {
				console.log('HERO ENTERS THE EXIT SPACE');
				events.emit('HERO_EXITS');
			}
		});
	}
}
