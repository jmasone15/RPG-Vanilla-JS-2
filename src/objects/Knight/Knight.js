import { GameObject } from '../../GameObject';
import { resources } from '../../Resource';
import { Sprite } from '../../Sprite';
import { storyFlags } from '../../StoryFlags';
import { Vector2 } from '../../Vector2';

export class Knight extends GameObject {
	constructor({ position, offset, content, portraitFrame }) {
		super({
			position: position,
			offset: offset ?? new Vector2(-8, -20)
		});

		// Say and Show something when talking.
		this.content = content;
		this.portraitFrame = portraitFrame;

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

	getContent() {
		const match = storyFlags.getRelevantScenario(this.content);

		if (!match) {
			console.warn('No matches found in this list!', this.content);
			return null;
		}

		return {
			string: match.string,
			portraitFrame: this.portraitFrame ?? 1,
			addsFlag: match.addsFlag ?? null
		};
	}
}
