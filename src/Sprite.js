import { Vector2 } from './Vector2';

export class Sprite {
	constructor({
		resource, // Image we want to draw.
		frameSize, // Size of the crop of the image.
		hFrames, // How the sprite sheet is arranged horizontally.
		vFrames, // How the sprite sheet is arranged vertically.
		frame, // Which frame of the sprite we want to show.
		scale, // How large to draw this image.
		position, // Where to draw the image (top left corner).
		offset, // How much to nudge the sprite from this.position.
		animations
	}) {
		// Set input values
		this.resource = resource;
		this.frameSize = frameSize ?? new Vector2();
		this.hFrames = hFrames ?? 1;
		this.vFrames = vFrames ?? 1;
		this.frame = frame ?? 0;
		this.frameMap = new Map();
		this.scale = scale ?? 1;
		this.position = position ?? new Vector2();
		this.offset = offset ?? new Vector2();
		this.animations = animations ?? null;

		this.buildFrameMap();
	}

	// For a sprite sheet, we want to keep a record of each frame location.
	// We do so by looping over the amount of vertical and horizontal frames and then calculating it's position within the spritesheet.
	// Finally, we save those calculated positions to a JavaScript Map object to keep track of them and retrieve them later.
	buildFrameMap() {
		let frameCount = 0;

		for (let v = 0; v < this.vFrames; v++) {
			for (let h = 0; h < this.hFrames; h++) {
				this.frameMap.set(
					frameCount,
					// Multiply the row and column location by the size of each individual frame.
					new Vector2(this.frameSize.x * h, this.frameSize.y * v)
				);
				frameCount++;
			}
		}
	}

	drawImage(ctx, position) {
		if (!this.resource.isLoaded) {
			return;
		}

		// Using our JavaScript Map object set in the buildFrameMap method, we want to find the current frame we need to draw (this.frame).
		// Frames are found in the map using a unique number identifier, which we set in the buildFrameMap method.
		let frameCoordX = 0;
		let frameCoordY = 0;
		let x = 0;
		let y = 0;
		const frameSizeX = this.frameSize.x;
		const frameSizeY = this.frameSize.y;

		const frame = this.frameMap.get(this.frame);
		if (frame) {
			frameCoordX = frame.x;
			frameCoordY = frame.y;
		}
		if (position) {
			x = position.x;
			y = position.y;
		}

		// Run the native Canvas Context draw method with the passed in Sprite properties.
		ctx.drawImage(
			this.resource.image,
			frameCoordX, // X location of the desired frame within the spritesheet.
			frameCoordY, // Y location of the desired frame within the spritesheet.
			frameSizeX, // The amount of horizontal pixels to crop from the spritesheet (starting at frameCoordX).
			frameSizeY, // The amount of vertical pixels to crop from the spritesheet (starting at frameCoordY).
			x, // X location of where to draw image on canvas.
			y, // Y location of where to draw image on canvas.
			frameSizeX * this.scale, // How large to horizontally scale the image.
			frameSizeY * this.scale // How large to vertically scale the image.
		);
	}
}
