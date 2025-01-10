import { GameObject } from '../GameObject';
import { Sprite } from '../Sprite';
import { resources } from '../Resource';
import { Vector2 } from '../Vector2';
import { events } from '../Events';

export class Inventory extends GameObject {
	constructor() {
		super({
			// Nudge down from top of screen a smidge.
			position: new Vector2(0, 1)
		});

		this.drawLayer = 'HUD';
		this.nextId = 0;
		this.items = [
			{
				id: -1,
				image: resources.images.rod
			},
			{
				id: -2,
				image: resources.images.rod
			}
		];

		// Event Listeners
		events.on('ADD_ITEM_TO_INVENTORY', this, (image) => {
			// Add item picked up to inventory.
			this.nextId++;
			this.items.push({
				id: this.nextId,
				image
			});

			// Redraw inventory with updated list.
			this.renderInventory();
		});

		// Draw initial state on bootup.
		this.renderInventory();
	}

	renderInventory() {
		// Remove stale drawings.
		this.destroy(true);

		// Draw fresh from the latest version of the list.
		this.items.forEach((item, index) => {
			const sprite = new Sprite({
				resource: item.image,
				position: new Vector2(index * 12, this.position.y)
			});
			this.addChild(sprite);
		});
	}

	removeFromInventory(id) {
		this.items = this.items.filter((item) => item.id !== id);
		this.renderInventory();
	}
}
