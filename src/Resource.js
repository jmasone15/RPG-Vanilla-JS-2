class Resources {
	constructor() {
		// File names (minus extension) of everything we plan to use in the game.
		this.resourcesToLoad = {
			sky: 'sky',
			ground: 'ground',
			hero: 'hero-sheet',
			shadow: 'shadow',
			rod: 'rod',
			exit: 'exit',
			cave: 'cave',
			caveGround: 'cave-ground',
			knight: 'knight-sheet-1',
			textBox: 'text-box',
			fontWhite: 'sprite-font-white'
		};

		// A bucket to keep all of our images.
		this.images = {};

		// Load each image
		Object.keys(this.resourcesToLoad).forEach((key) => {
			// Using the built-in Image class gives us access to memory load functions.
			// Essentially, the onload function runs once the image is actually loaded into the browser memory...
			// After that, we can freely use it within the HTML Canvas after checking the isLoaded flag per image.

			const img = new Image();
			// Vite defaults all root-level downloads to the public directory.
			img.src = `/sprites/${this.resourcesToLoad[key]}.png`;
			this.images[key] = {
				image: img,
				isLoaded: false
			};
			img.onload = () => {
				this.images[key].isLoaded = true;
			};
		});
	}
}

// Export a single instance because it holds all of our images for the project.
export const resources = new Resources();
