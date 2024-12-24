import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';

export class Knight extends GameObject {
	constructor({ position, offset }) {
		super({
			position: position,
			offset: offset ?? new Vector2(-8, -20)
		});

		// Opt into being solid
		this.isSolid = true;

		// Knight Sprites
		const shadow = new Sprite({
			resource: resources.images.shadow,
			frameSize: new Vector2(32, 32),
			position: new Vector2()
		});
		const body = new Sprite({
			resource: resources.images.knight,
			frameSize: new Vector2(32, 32),
			hFrames: 2,
			vFrames: 1,
			position: new Vector2()
		});

		this.addChildren([shadow, body]);
	}
}
