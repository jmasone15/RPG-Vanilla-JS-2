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

		setTimeout(() => {
			const textbox = new SpriteTextString(
				'Hello! This is the content! Hello! This is the content! Hello! This is the content! Hello!'
			);
			this.addChild(textbox);
		}, 300);

		events.on('CHANGE_LEVEL', this, (newLevelInstance) => {
			this.setLevel(newLevelInstance);
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
