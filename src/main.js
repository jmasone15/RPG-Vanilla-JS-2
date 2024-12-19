import './style.css';
import { GameLoop } from './GameLoop';
import { resources } from './Resource';
import { Sprite } from './Sprite';
import { Vector2 } from './Vector2';
import { Input } from './Input';
import { gridCells } from './helpers/Grid';
import { GameObject } from './GameObject';
import { Hero } from './objects/Hero/Hero';
import { events } from './Events';

// Grabbing the canvas and context to draw to.
const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

// Establish the root scene.
const mainScene = new GameObject({});

// Create sprites for scene.
const skySprite = new Sprite({
	resource: resources.images.sky,
	frameSize: new Vector2(320, 180)
});
const groundSprite = new Sprite({
	resource: resources.images.ground,
	frameSize: new Vector2(320, 180)
});
const hero = new Hero({
	position: new Vector2(gridCells(6), gridCells(5)),
	offset: new Vector2(-8, -20)
});

// Add content to the scene
mainScene.addChildren([skySprite, groundSprite, hero]);
mainScene.input = new Input();

events.on('HERO_POSITION', mainScene, (heroPosition) => {
	console.log('HERO MOVED!', heroPosition);
});

// Establish update and draw loops for root scene.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
};
const draw = () => {
	mainScene.draw(ctx, new Vector2());
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
