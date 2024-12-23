import { Level } from '../objects/Level';
import { CONSTANTS } from '../helpers/constants';
import { Vector2 } from '../Vector2';
import { Sprite } from '../Sprite';
import { Hero } from '../objects/Hero/Hero';
import { Rod } from '../objects/Rod';
import { Exit } from '../objects/Exit';
import { resources } from '../Resource';
import { gridCells } from '../helpers/Grid';
import { CaveLevelOne } from './CaveLevelOne';
import { events } from '../Events';

const { cWidth, cHeight, defaultHeroPosition } = CONSTANTS;

export class OutdoorLevelOne extends Level {
	constructor(params = {}) {
		super({});
		this.heroStartPosition = params?.heroStartPosition ?? defaultHeroPosition;

		// Background and Foreground Content
		this.background = new Sprite({
			resource: resources.images.sky,
			frameSize: new Vector2(cWidth, cHeight)
		});
		this.ground = new Sprite({
			resource: resources.images.ground,
			frameSize: new Vector2(cWidth, cHeight)
		});

		// Level Sprites
		const hero = new Hero({
			position: this.heroStartPosition
		});
		const rod = new Rod({
			position: new Vector2(gridCells(7), gridCells(6))
		});
		const exit = new Exit({
			position: new Vector2(gridCells(6), gridCells(3))
		});

		// Add to Scene
		this.addChildren([this.ground, rod, exit, hero]);
	}

	ready() {
		console.log('OUTDOOR LEVEL ONE IS READY');
		events.on('HERO_EXITS', this, () => {
			events.emit(
				'CHANGE_LEVEL',
				new CaveLevelOne({
					heroStartPosition: new Vector2(gridCells(3), gridCells(6))
				})
			);
		});
	}

	setWalls() {
		this.walls.add('64,48'); // Tree

		this.walls.add('64,64'); // Squares
		this.walls.add('64,80');
		this.walls.add('80,64');
		this.walls.add('80,80');

		this.walls.add('112,80'); // Water
		this.walls.add('128,80');
		this.walls.add('144,80');
		this.walls.add('160,80');

		console.log('OUTDOOR LEVEL ONE WALLS CREATED...');
	}
}
