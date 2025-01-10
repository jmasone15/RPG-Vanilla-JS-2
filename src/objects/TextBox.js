import { GameObject } from '../GameObject';
import { Sprite } from '../Sprite';
import { resources } from '../Resource';
import { Vector2 } from '../Vector2';
import { CONSTANTS } from '../helpers/constants';

const { MAX_WIDTH, LINE_HEIGHT, PADDING_LEFT, PADDING_TOP } = CONSTANTS.textBox;

// Font-Based TextBox
export class TextBox extends GameObject {
	constructor() {
		super({
			position: new Vector2(32, 112)
		});
		this.content = 'Hi. How are ya? How are ya? How are ya?';
		this.backdrop = new Sprite({
			resource: resources.images.textBox,
			frameSize: new Vector2(256, 64)
		});
	}

	drawImage(ctx, position) {
		let padX = position.x + PADDING_LEFT;
		let padY = position.y + PADDING_TOP;

		// Draw backdrop first.
		this.backdrop.drawImage(ctx, position);

		// Text Properties
		ctx.font = '10px fontRetroGaming';
		ctx.textAlign = 'left';
		ctx.textBaseline = 'top';
		ctx.fillStyle = '#fff';

		let words = this.content.split(' ');
		let line = '';

		// The canvas tag does not have any word-wrapping functionality.
		// So we have to manually do it by looping through the text and adding breakpoints where appropriate.
		for (let i = 0; i < words.length; i++) {
			let testLine = line + words[i] + ' ';
			let { width } = ctx.measureText(testLine);

			// If the test line exceeds the maximum width, and it's not the first word...
			if (width > MAX_WIDTH && i > 0) {
				ctx.fillText(line, padX, padY);
				// Reset the line to start with the current word.
				line = words[i] + ' ';
				// Move our cursor downwards.
				padY += LINE_HEIGHT;
			} else {
				line = testLine;
			}
		}

		ctx.fillText(line, padX, padY);
	}
}
