import { Camera } from '../Camera';
import { GameObject } from '../GameObject';
import { Input } from '../Input';
import { Inventory } from './Inventory';
import { CONSTANTS } from '../helpers/constants';
import { Vector2 } from '../Vector2';
import { events } from '../Events';
import { SpriteTextString } from './SpriteTextString/SpriteTextString';

const { ctx } = CONSTANTS;

export class Main extends GameObject {
	constructor() {
		super({});
		this.level = null;
		this.input = new Input();
		this.camera = new Camera();
	}

	ready() {
		console.log('MAIN GAME IS READY');

		const inventory = new Inventory();
		this.addChild(inventory);

		// Events
		events.on('CHANGE_LEVEL', this, (newLevelInstance) => {
			this.setLevel(newLevelInstance);
		});
		events.on('HERO_REQUESTS_ACTION', this, () => {
			const textbox = new SpriteTextString('Howdy, friend!');
			this.addChild(textbox);
			events.emit('START_TEXT_BOX');

			// Unsubscribe from this text box after it's destroyed.
			const endingSub = events.on('END_TEXT_BOX', this, () => {
				textbox.destroy();
				events.off(endingSub);
			});
		});
	}

	setLevel(newLevelInstance) {
		if (this.level) {
			this.level.destroy();
		}

		this.level = newLevelInstance;
		this.level.setWalls();
		this.addChild(this.level);
	}

	drawBackground() {
		this.level?.background.drawImage(ctx, new Vector2());
	}

	drawObjects() {
		this.children.forEach((child) => {
			if (child.drawLayer !== 'HUD') {
				child.draw(ctx, new Vector2());
			}
		});
	}

	drawForeground() {
		this.children.forEach((child) => {
			if (child.drawLayer === 'HUD') {
				child.draw(ctx, new Vector2());
			}
		});
	}
}
