import { Level } from '../objects/Level';
import { Sprite } from '../Sprite';
import { resources } from '../Resource';
import { Vector2 } from '../Vector2';
import { CONSTANTS } from '../helpers/constants';
import { Hero } from '../objects/Hero/Hero';
import { Rod } from '../objects/Rod';
import { Exit } from '../objects/Exit';
import { gridCells } from '../helpers/Grid';
import { events } from '../Events';
import { OutdoorLevelOne } from './OutdoorLevelOne';

const { cWidth, cHeight } = CONSTANTS;

export class CaveLevelOne extends Level {
	constructor() {
		super({});

		// Background and Foreground Content
		this.background = new Sprite({
			resource: resources.images.cave,
			frameSize: new Vector2(cWidth, cHeight)
		});
		this.ground = new Sprite({
			resource: resources.images.caveGround,
			frameSize: new Vector2(cWidth, cHeight)
		});

		// Level Sprites
		const hero = new Hero({
			position: new Vector2(gridCells(6), gridCells(5))
		});
		const rod = new Rod({
			position: new Vector2(gridCells(7), gridCells(7))
		});
		const exit = new Exit({
			position: new Vector2(gridCells(3), gridCells(5))
		});

		// Add to Scene
		this.addChildren([this.ground, rod, exit, hero]);
	}

	ready() {
		console.log('CAVE LEVEL ONE IS READY');
		events.on('HERO_EXITS', this, () => {
			events.emit('CHANGE_LEVEL', new OutdoorLevelOne());
		});
	}

	setWalls() {
		// ... TODO
	}
}
