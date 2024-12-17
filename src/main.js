import { GameLoop } from './GameLoop';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import './style.css';
import { Vector2 } from './Vector2';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const skySprite = new Sprite({
	resource: resources.images.sky,
	frameSize: new Vector2(320, 180)
});
const groundSprite = new Sprite({
	resource: resources.images.ground,
	frameSize: new Vector2(320, 180)
});
const hero = new Sprite({
	resource: resources.images.hero,
	frameSize: new Vector2(32, 32),
	hFrames: 3,
	vFrames: 8,
	frame: 1
});
const shadow = new Sprite({
	resource: resources.images.shadow,
	frameSize: new Vector2(32, 32)
});

const update = () => {
	// Update entities in the game
};

const draw = () => {
	skySprite.drawImage(ctx);
	groundSprite.drawImage(ctx);

	// Center the Hero in the cell.
	const heroOffset = new Vector2(-8, -21);
	const heroPos = new Vector2(16 * 6, 16 * 5);
	heroPos.x += heroOffset.x;
	heroPos.y += heroOffset.y + 1;

	shadow.drawImage(ctx, heroPos);
	hero.drawImage(ctx, heroPos);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
