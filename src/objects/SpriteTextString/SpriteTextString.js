import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { resources } from '../../Resource';
import { getCharacterFrame, getCharacterWidth } from './SpriteFontMap';
import { CONSTANTS } from '../../helpers/constants';

export class SpriteTextString extends GameObject {
	constructor(str) {
		super({
			position: new Vector2(32, 112)
		});
		this.content = str ?? 'Oops';

		// Create an array of words (to help with line wrapping)
		this.words = this.content.split(' ').map((word) => {
			// We need to know how wide this word is.
			let wordWidth = 0;

			// Break each word into single characters.
			const chars = word.split('').map((char) => {
				// Measure each one and append to the wordWidth
				const charWidth = getCharacterWidth(char);
				wordWidth += charWidth;

				// Create a Sprite for each character in the word.
				return {
					width: charWidth,
					sprite: new Sprite({
						resource: resources.images.fontWhite,
						hFrames: 13,
						vFrames: 6,
						frame: getCharacterFrame(char)
					})
				};
			});

			// Return a length and a list of charcters per word.
			return {
				wordWidth,
				chars
			};
		});
		this.backdrop = new Sprite({
			resource: resources.images.textBox,
			frameSize: new Vector2(256, 64)
		});
	}

	drawImage(ctx, position) {
		// Draw the backdrop.
		this.backdrop.drawImage(ctx, position);

		// Configuration Options.
		const { PADDING_LEFT, PADDING_TOP, LINE_WIDTH_MAX, LINE_VERTICAL_HEIGHT } =
			CONSTANTS.letterConfig;

		// Initial position of cursor.
		let cursorPos = new Vector2(
			position.x + PADDING_LEFT,
			position.y + PADDING_TOP
		);
		let { x, y } = cursorPos;

		this.words.forEach((word) => {
			// Decide if we can fit the next word on the current line.
			const spaceRemaining = position.x + LINE_WIDTH_MAX - x;
			if (spaceRemaining < word.wordWidth) {
				y += LINE_VERTICAL_HEIGHT;
				x = position.x + PADDING_LEFT;
			}

			// Draw this whole segment of text.
			word.chars.forEach((char) => {
				char.sprite.draw(CONSTANTS.ctx, new Vector2(x - 5, y));

				// Add width of the character we just printed to cursor position.
				x += char.width;

				// Plus 1px between character.
				x += 1;
			});

			// Move the cursor over.
			x += 3;
		});
	}
}
