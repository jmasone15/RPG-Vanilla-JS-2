import { Vector2 } from './Vector2';
import { events } from './Events';

// This class works as any generic object within the game. All other objects within the game should be extended from this.
// It has it's own step method, draw method, and a parent child relationship functionality.

// Any class that extends from this GameObject must have a step method and optionally a drawImage method. Those two methods are left blank here to be controlled by the extended classes.
// The stepEntry method recursively calls all of the children's step method first before calling the parent, allowing all children of the parent to update their internal state before the parent updates.
// The draw method works in a similar way, alternatively we draw the parent's content first before drawing the children's content recursively. This way it builds the scene from the ground up.

export class GameObject {
	constructor({ position, offset }) {
		this.position = position ?? new Vector2();
		this.offset = offset ?? new Vector2();
		this.children = [];
		this.isReady = false;
	}

	// Update runs children first and then parent.
	// Draw runs parent first and the children.

	// First entry point of the loop.
	stepEntry(delta, root) {
		// Call updates on all children first.
		this.children.forEach((child) => child.stepEntry(delta, root));

		// Call ready on the first frame.
		if (!this.isReady) {
			this.isReady = true;
			this.ready();
		}

		// Call any implemented step code for this GameObject.
		this.step(delta, root);
	}

	// Called before the first `step`.
	ready() {
		// ...
	}

	// Called once every frame.
	step(_delta) {
		// ...
	}

	// Draw Entry
	draw(ctx, { x, y }) {
		const drawPos = new Vector2(
			x + this.position.x + this.offset.x,
			y + this.position.y + this.offset.y
		);

		// Do the actual rendering for Images.
		this.drawImage(ctx, drawPos);

		// Pass on to children.
		this.children.forEach((child) => child.draw(ctx, drawPos));
	}

	drawImage(_ctx, _position) {
		//...
	}

	addChild(gameObject) {
		gameObject.parent = this;
		this.children.push(gameObject);
	}

	addChildren(gameObjectArr) {
		for (let i = 0; i < gameObjectArr.length; i++) {
			this.addChild(gameObjectArr[i]);
		}
	}

	removeChild(gameObject) {
		events.unsubscribe(gameObject);
		this.children = this.children.filter((child) => {
			return gameObject !== child;
		});
	}

	destroy(keepParent = false) {
		this.children.forEach((child) => {
			child.destroy();
		});

		if (!keepParent) {
			this.parent.removeChild(this);
		}
	}
}
