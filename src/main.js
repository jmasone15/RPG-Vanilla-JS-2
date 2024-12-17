import './style.css';
import { GameLoop } from './GameLoop';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { Input, DIRECTIONS } from './Input';
import { gridCells, isSpaceFree } from './helpers/Grid';
import { moveTowards } from './helpers/moveTowards';
import { walls } from './levels/levelOne';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const heroOffset = new Vector2(-8, -21);

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
	frame: 1,
	position: new Vector2(gridCells(6), gridCells(5))
});
const shadow = new Sprite({
	resource: resources.images.shadow,
	frameSize: new Vector2(32, 32)
});
const input = new Input();
const heroDestinationPosition = hero.position.duplicate();

const update = () => {
	const distance = moveTowards(hero, heroDestinationPosition, 1);
	const hasArrived = distance < 1;

	// Attempt to move again if the hero has reached their destination and user is holding a key.
	if (hasArrived && input.direction) {
		tryMove();
	}

	console.log(distance);
	return;
};

const tryMove = () => {
	let nextX = heroDestinationPosition.x;
	let nextY = heroDestinationPosition.y;
	const gridSize = 16;

	if (input.direction === DIRECTIONS.DOWN) {
		nextY += gridSize;
		hero.frame = 0;
	}
	if (input.direction === DIRECTIONS.UP) {
		nextY -= gridSize;
		hero.frame = 6;
	}
	if (input.direction === DIRECTIONS.LEFT) {
		nextX -= gridSize;
		hero.frame = 9;
	}
	if (input.direction === DIRECTIONS.RIGHT) {
		nextX += gridSize;
		hero.frame = 3;
	}

	// Validating that the next destination is free.
	if (isSpaceFree(walls, nextX, nextY)) {
		heroDestinationPosition.x = nextX;
		heroDestinationPosition.y = nextY;
	}
};

const draw = () => {
	skySprite.drawImage(ctx);
	groundSprite.drawImage(ctx);

	const currentHeroPos = new Vector2(
		hero.position.x + heroOffset.x,
		hero.position.y + heroOffset.y + 1
	);

	shadow.drawImage(ctx, currentHeroPos);
	hero.drawImage(ctx, currentHeroPos);
};

const gameLoop = new GameLoop(update, draw);
gameLoop.start();
