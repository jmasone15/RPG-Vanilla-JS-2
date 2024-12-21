import { CONSTANTS } from '../../helpers/constants';
import { heroAnimations } from './heroAnimations';
import { Vector2 } from '../../Vector2';
import { FrameIndexPattern } from '../../FrameIndexPattern';
import { isSpaceFree } from '../../helpers/Grid';
import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { resources } from '../../Resource';
import { Animations } from '../../Animations';
import { moveTowards } from '../../helpers/moveTowards';
import { walls } from '../../levels/levelOne';
import { events } from '../../Events';

const { directions } = CONSTANTS;
const { UP, DOWN, LEFT, RIGHT } = directions;

export class Hero extends GameObject {
	constructor({ position, offset }) {
		super({
			position: position,
			offset: offset ?? new Vector2(-8, -20)
		});

		// Internal State
		this.facingDirection = DOWN;
		this.destinationPosition = this.position.duplicate();
		this.lastPosition = { x: 1000, y: 1000 };
		this.itemPickupTime = 0;
		this.itemPickupShell = null;
		this.itemPickupImage = null;

		// Children
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
				standRight: new FrameIndexPattern(heroAnimations.STAND_RIGHT),
				pickUpDown: new FrameIndexPattern(heroAnimations.PICK_UP_DOWN)
			})
		});
		this.addChildren([shadow, this.body]);
	}

	ready() {
		// Event Listeners
		events.on('HERO_PICKS_UP_ITEM', this, (data) => {
			this.onPickUpItem(data);
		});
	}

	// Root is the parent GameObject of the mainScene, we pass it through to get access to the Input class.
	step(delta, root) {
		// Lock movement if in item pickup animation.
		if (this.itemPickupTime > 0) {
			this.workOnItemPickup(delta);
			return;
		}

		// Every frame, move the hero 1px closer to their destination.
		const distance = moveTowards(this, this.destinationPosition, 1);
		const hasArrived = distance < 1;

		// Attempt to move again if the hero has reached their destination and user is holding a key.
		if (hasArrived) {
			this.tryMove(root);
		}

		this.tryEmitPosition();

		return;
	}

	tryEmitPosition() {
		const { x, y } = this.lastPosition;
		if (x === this.position.x && y === this.position.y) {
			return;
		}

		this.lastPosition = this.position.duplicate();
		events.emit('HERO_POSITION', this.position);
	}

	tryMove = ({ input }) => {
		if (!input.direction) {
			switch (this.facingDirection) {
				case LEFT:
					this.body.animations.play('standLeft');
					break;
				case RIGHT:
					this.body.animations.play('standRight');
					break;
				case UP:
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

		if (input.direction === DOWN) {
			nextPos.y += gridSize;
		}
		if (input.direction === UP) {
			nextPos.y -= gridSize;
		}
		if (input.direction === LEFT) {
			nextPos.x -= gridSize;
		}
		if (input.direction === RIGHT) {
			nextPos.x += gridSize;
		}
		this.facingDirection = input.direction ?? this.facingDirection;

		const spaceIsFree = isSpaceFree(walls, nextPos.x, nextPos.y);

		// Update the hero's animation based on direction and if they can move to the next space.
		if (input.direction === DOWN) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Down');
		}
		if (input.direction === UP) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Up');
		}
		if (input.direction === LEFT) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Left');
		}
		if (input.direction === RIGHT) {
			this.body.movingOrStandingAnimation(spaceIsFree, 'Right');
		}

		// Validating that the next destination is free.
		if (spaceIsFree) {
			this.destinationPosition = nextPos.duplicate();
		}
	};

	workOnItemPickup(delta) {
		this.itemPickupTime -= delta;
		this.body.animations.play('pickUpDown');

		// Once animation is finished, remove the newly created GameObject above the hero's head.
		if (this.itemPickupTime <= 0) {
			this.itemPickupShell.destroy();
			events.emit('ADD_ITEM_TO_INVENTORY', this.itemPickupImage);
		}
	}

	onPickUpItem({ image, position }) {
		// Make sure we pause right on the item.
		this.destinationPosition = position.duplicate();

		// Start the pickup animation
		this.itemPickupTime = 1000;

		// Create a new game object of the item that was picked up.
		this.itemPickupImage = image;
		this.itemPickupShell = new GameObject({
			// Translate the position of the picked up item to be just above the hero's head.
			offset: new Vector2(8, 2)
		});
		this.itemPickupShell.addChild(new Sprite({ resource: image }));
		this.addChild(this.itemPickupShell);
	}
}
