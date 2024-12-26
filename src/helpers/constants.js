import { Vector2 } from '../Vector2';
import { gridCells } from './Grid';

const canvas = document.getElementById('game-canvas');

export const CONSTANTS = {
	canvas,
	ctx: canvas.getContext('2d'),
	cWidth: canvas.width,
	cHeight: canvas.height,
	heroSize: 16,
	defaultHeroPosition: new Vector2(gridCells(6), gridCells(5)),
	keyCodes: {
		keyUp: ['ArrowUp', 'KeyW'],
		keyDown: ['ArrowDown', 'KeyS'],
		keyLeft: ['ArrowLeft', 'KeyA'],
		keyRight: ['ArrowRight', 'KeyD']
	},
	directions: {
		LEFT: 'LEFT',
		RIGHT: 'RIGHT',
		UP: 'UP',
		DOWN: 'DOWN'
	},
	textBox: {
		MAX_WIDTH: 250,
		LINE_HEIGHT: 20,
		PADDING_LEFT: 10,
		PADDING_TOP: 12
	}
};
