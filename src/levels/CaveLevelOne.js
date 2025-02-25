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
import { Knight } from '../objects/Knight/Knight';
import { TALKED_TO_A, TALKED_TO_B } from '../StoryFlags';

const { cWidth, cHeight, defaultHeroPosition } = CONSTANTS;

export class CaveLevelOne extends Level {
	constructor(params = {}) {
		super({});
		this.heroStartPosition = params?.heroStartPosition ?? defaultHeroPosition;

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
			position: this.heroStartPosition
		});
		const rod = new Rod({
			position: new Vector2(gridCells(7), gridCells(7))
		});
		const exit = new Exit({
			position: new Vector2(gridCells(3), gridCells(5))
		});
		const knight = new Knight({
			position: new Vector2(gridCells(5), gridCells(5)),
			content: [
				{
					string: "I just can't stand that guy.",
					requires: [TALKED_TO_B],
					bypass: [TALKED_TO_A],
					addsFlag: TALKED_TO_A
				},
				{
					string: 'He is just the worst!',
					requires: [TALKED_TO_A]
				},
				{
					string: 'Grumble grumble. Another day at work.'
				}
			],
			portraitFrame: 1
		});
		const knight2 = new Knight({
			position: new Vector2(gridCells(10), gridCells(5)),
			content: [
				{
					string: 'What a wonderful day at work in the cave!',
					addsFlag: TALKED_TO_B
				}
			],
			portraitFrame: 1
		});

		// Add to Scene
		this.addChildren([this.ground, rod, exit, hero, knight, knight2]);
	}

	ready() {
		console.log('CAVE LEVEL ONE IS READY');
		events.on('HERO_EXITS', this, () => {
			events.emit(
				'CHANGE_LEVEL',
				new OutdoorLevelOne({
					heroStartPosition: new Vector2(gridCells(15), gridCells(4))
				})
			);
		});
	}

	setWalls() {
		// ... TODO
	}
}
