import { DIRECTIONS } from '../../Input';
import { heroAnimations } from './heroAnimations';
import { Vector2 } from '../../Vector2';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { isSpaceFree, gridCells } from '../../helpers/Grid';
import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { resources } from '../../Resource';
import { Animations } from '../../Animations';
import { moveTowards } from '../../helpers/moveTowards';
import { walls } from '../../levels/levelOne';

export class Hero extends GameObject {
	constructor({ position, offset }) {
		super({
			position: position,
			offset: offset
		});
		this.facingDirection = DIRECTIONS.DOWN;
		this.destinationPosition = this.position.duplicate();

		const shadow = new Sprite({
			resource: resources.images.shadow,
			frameSize: new Vector2(32, 32)
		});
		this.body = new Sprite({
			resource: resources.images.hero,
			frameSize: new Vector2(32, 32),
			hFrames: 3,
			vFrames: 8,
			frame: 1,
			position: new Vector2(),
			animations: new Animations({
				walkDown: new FrameIndexPattern(heroAnimations.WALK_DOWN),
				walkUp: new FrameIndexPattern(heroAnimations.WALK_UP),
				walkLeft: new FrameIndexPattern(heroAnimations.WALK_LEFT),
				walkRight: new FrameIndexPattern(heroAnimations.WALK_RIGHT),
				standDown: new FrameIndexPattern(heroAnimations.STAND_DOWN),
				standUp: new FrameIndexPattern(heroAnimations.STAND_UP),
				standLeft: new FrameIndexPattern(heroAnimations.STAND_LEFT),
				standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT)
			})
		});
		this.addChildren([shadow, this.body]);
	}

	// Root is the parent GameObject of the mainScene, we pass it through to get access to the Input class.
	step(delta, root) {
		// Every frame, move the hero 1px closer to their destination.
		const distance = moveTowards(this, this.destinationPosition, 1);
		const hasArrived = distance < 1;

		// Attempt to move again if the hero has reached their destination and user is holding a key.
		if (hasArrived) {
			this.tryMove(root);
		}

		return;
	}

	tryMove = ({ input }) => {
		if (!input.direction) {
			switch (this.facingDirection) {
				case DIRECTIONS.LEFT:
					this.body.animations.play('standLeft');
					break;
				case DIRECTIONS.RIGHT:
					this.body.animations.play('standRight');
					break;
				case DIRECTIONS.UP:
					this.body.animations.play('standUp');
					break;
				default:
					this.body.animations.play('standDown');
					break;
			}

			return;
		}

		const nextPos = this.destinationPosition.duplicate();
		const gridSize = 16;

		if (input.direction === DIRECTIONS.DOWN) {
			nextPos.y += gridSize;
		}
		if (input.direction === DIRECTIONS.UP) {
			nextPos.y -= gridSize;
		}
		if (input.direction === DIRECTIONS.LEFT) {
			nextPos.x -= gridSize;
		}
		if (input.direction === DIRECTIONS.RIGHT) {
			nextPos.x += gridSize;
		}
		this.facingDirection = input.direction ?? this.facingDirection;

		const spaceIsFree = isSpaceFree(walls, nextPos.x, nextPos.y);

		// Update the hero's animation based on direction and if they can move to the next space.
		if (input.direction === DIRECTIONS.DOWN) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Down');
		}
		if (input.direction === DIRECTIONS.UP) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Up');
		}
		if (input.direction === DIRECTIONS.LEFT) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Left');
		}
		if (input.direction === DIRECTIONS.RIGHT) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Right');
		}

		// Validating that the next destination is free.
		if (spaceIsFree) {
			this.destinationPosition = nextPos.duplicate();
		}
	};
}
