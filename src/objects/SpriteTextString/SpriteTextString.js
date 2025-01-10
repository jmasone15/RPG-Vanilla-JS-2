import { GameObject } from '../../GameObject';
import { Sprite } from '../../Sprite';
import { Vector2 } from '../../Vector2';
import { resources } from '../../Resource';
import { getCharacterFrame, getCharacterWidth } from './SpriteFontMap';
import { CONSTANTS } from '../../helpers/constants';
import { events } from '../../Events';

const { ctx, letterConfig } = CONSTANTS;
const {
	PADDING_LEFT,
	PADDING_TOP,
	LINE_WIDTH_MAX,
	LINE_VERTICAL_HEIGHT,
	TEXT_SPEED
} = letterConfig;

export class SpriteTextString extends GameObject {
	constructor(str) {
		super({
			position: new Vector2(32, 112)
		});
		this.content = str ?? 'Oops';
		this.drawLayer = 'HUD';
		this.cursorPos = new Vector2();

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

		// Typewriter
		this.showingIndex = 0;
		this.currentIndex = 0;
		this.finalIndex = this.words.reduce(
			(acc, word) => acc + word.chars.length,
			0
		);
		this.timeUntilNextShow = TEXT_SPEED;

		console.log(this.finalIndex);
	}

	step(delta, root) {
		// Listen for user Input
		if (root.input?.getActionJustPressed('Space')) {
			// Skip Text
			if (this.showingIndex < this.finalIndex) {
				this.showingIndex = this.finalIndex;
				return;
			}

			// Done with the textbox
			events.emit('END_TEXT_BOX');
		}

		// Work on typewriter
		this.timeUntilNextShow -= delta;

		if (this.timeUntilNextShow <= 0) {
			// Increase the amount of charaters that are drawn.
			this.showingIndex += 1;

			// Reset time counter for next character.
			this.timeUntilNextShow = TEXT_SPEED;
		}
	}

	drawImage(ctx, position) {
		// Draw the backdrop.
		this.backdrop.drawImage(ctx, position);

		// Setup
		this.currentIndex = 0;
		this.cursorPos = new Vector2(
			position.x + PADDING_LEFT,
			position.y + PADDING_TOP
		);

		// Run char and word printing logic.
		this.words.forEach((word) => {
			this.printWord(word, position);
		});
	}

	printWord(word, position) {
		// Decide if we can fit the next word on the current line.
		const spaceRemaining = position.x + LINE_WIDTH_MAX - this.cursorPos.x;
		if (spaceRemaining < word.wordWidth) {
			this.cursorPos.y += LINE_VERTICAL_HEIGHT;
			this.cursorPos.x = position.x + PADDING_LEFT;
		}

		// Draw this whole segment of text.
		word.chars.forEach((char) => {
			this.printChar(char);
		});

		// Move the cursor over.
		this.cursorPos.x += 3;
	}

	printChar(char) {
		// Stop here if we should not yet show the following characters.
		if (this.currentIndex > this.showingIndex) {
			return;
		}

		char.sprite.draw(ctx, new Vector2(this.cursorPos.x - 5, this.cursorPos.y));

		// Add width of the character we just printed to cursor position.
		this.cursorPos.x += char.width;

		// Plus 1px between character.
		this.cursorPos.x += 1;

		// Uptick the index we are counting.
		this.currentIndex += 1;
	}
}
