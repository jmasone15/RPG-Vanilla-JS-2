import { Camera } from '../Camera';
import { GameObject } from '../GameObject';
import { Input } from '../Input';
import { Inventory } from './Inventory';
import { CONSTANTS } from '../helpers/constants';
import { Vector2 } from '../Vector2';
import { events } from '../Events';

const { ctx } = CONSTANTS;

export class Main extends GameObject {
	constructor() {
		super({});
		this.level = null;
		this.input = new Input();
		this.camera = new Camera();
		this.inventory = new Inventory();
	}

	ready() {
		console.log('MAIN GAME IS READY');
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

	drawForeground() {
		const { x, y } = this.inventory.position;
		this.inventory.draw(ctx, new Vector2(x, y));
	}
}
