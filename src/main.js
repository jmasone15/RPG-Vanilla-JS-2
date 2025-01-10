import './style.css';
import { GameLoop } from './GameLoop';
import { CONSTANTS } from './helpers/constants';
import { Main } from './objects/Main';
import { CaveLevelOne } from './levels/CaveLevelOne';

// Grabbing the canvas and context to draw to.
const { ctx, cWidth, cHeight } = CONSTANTS;

// Establish the root scene.
const mainScene = new Main({});
mainScene.setLevel(new CaveLevelOne());

// Establish update and draw loops for root scene.
const update = (delta) => {
	mainScene.stepEntry(delta, mainScene);
	mainScene.input?.update();
};

const draw = () => {
	// Clear out anything stale.
	ctx.clearRect(0, 0, cWidth, cHeight);

	// We want the game backround to always be static, so draw it outside the relative camera position.
	mainScene.drawBackground();

	// Save the current state (for camera offset).
	ctx.save();

	// Offset by camera position
	if (mainScene.camera) {
		const { x, y } = mainScene.camera.position;
		ctx.translate(x, y);
	}

	// Draw objects in the offset scene.
	mainScene.drawObjects();

	// Restore to original state
	ctx.restore();

	// Draw anything above the game world.
	mainScene.drawForeground();
};

// Start the game!
const gameLoop = new GameLoop(update, draw);
gameLoop.start();
