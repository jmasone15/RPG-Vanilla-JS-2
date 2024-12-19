import './style.css';
import { GameLoop } from './GameLoop';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { Input } from './Input';
import { gridCells } from './helpers/Grid';
import { GameObject } from './GameObject';
import { Hero } from './objects/Hero/Hero';
import { Camera } from './Camera';
import { CONSTANTS } from './helpers/constants';

// Grabbing the canvas and context to draw to.
const { canvas, cWidth, cHeight } = CONSTANTS;
const ctx = canvas.getContext('2d');

// Establish the root scene.
const mainScene = new GameObject({});

// Create sprites for scene.
const skySprite = new Sprite({
	resource: resources.images.sky,
	frameSize: new Vector2(cWidth, cHeight)
});
const groundSprite = new Sprite({
	resource: resources.images.ground,
	frameSize: new Vector2(cWidth, cHeight)
});
const hero = new Hero({
	position: new Vector2(gridCells(6), gridCells(5)),
	offset: new Vector2(-8, -20)
});

const camera = new Camera();

// Add content to the scene
mainScene.addChildren([groundSprite, hero]);
mainScene.input = new Input();

// Establish update and draw loops for root scene.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
	// Clear out anything stale.
	ctx.clearRect(0, 0, cWidth, cHeight);

	// We want the sky backround to always be static, so draw it outside the relative camera position.
	skySprite.drawImage(ctx, new Vector2());

	// Save the current state (for camera offset).
	ctx.save();

	// Offset by camera position
	ctx.translate(camera.position.x, camera.position.y);

	// Draw objects in the offset scene.
	mainScene.draw(ctx, new Vector2());

	// Restore to original state
	ctx.restore();
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
