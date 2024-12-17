import './style.css';
import { GameLoop } from './GameLoop';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { Input, DIRECTIONS } from './Input';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const heroOffset = new Vector2(-8, -21);
const heroPos = new Vector2(16 * 6, 16 * 5);

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
const input = new Input();

const update = () => {
	if (input.direction === DIRECTIONS.DOWN) {
		heroPos.y += 1;
		hero.frame = 0;
	}
	if (input.direction === DIRECTIONS.UP) {
		heroPos.y -= 1;
		hero.frame = 6;
	}
	if (input.direction === DIRECTIONS.LEFT) {
		heroPos.x -= 1;
		hero.frame = 9;
	}
	if (input.direction === DIRECTIONS.RIGHT) {
		heroPos.x += 1;
		hero.frame = 3;
	}
};

const draw = () => {
	skySprite.drawImage(ctx);
	groundSprite.drawImage(ctx);

	const currentHeroPos = new Vector2(
		heroPos.x + heroOffset.x,
		heroPos.y + heroOffset.y + 1
	);

	shadow.drawImage(ctx, currentHeroPos);
	hero.drawImage(ctx, currentHeroPos);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
