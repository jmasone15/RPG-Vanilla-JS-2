// This file holds all of the animation configurations for the Hero.
// The two functions are just there to reduce the amount of hardcoded directional animations.

const makeWalkingFrames = (rootFrame) => {
	return {
		duration: 400,
		frames: [
			{
				time: 0,
				frame: rootFrame + 1
			},
			{
				time: 100,
				frame: rootFrame
			},
			{
				time: 200,
				frame: rootFrame + 1
			},
			{
				time: 300,
				frame: rootFrame + 2
			}
		]
	};
};
const makeStandingFrames = (rootFrame) => {
	return {
		duration: 400,
		frames: [
			{
				time: 0,
				frame: rootFrame
			}
		]
	};
};

export const heroAnimations = {
	WALK_DOWN: makeWalkingFrames(0),
	WALK_RIGHT: makeWalkingFrames(3),
	WALK_UP: makeWalkingFrames(6),
	WALK_LEFT: makeWalkingFrames(9),
	STAND_DOWN: makeStandingFrames(1),
	STAND_RIGHT: makeStandingFrames(4),
	STAND_UP: makeStandingFrames(7),
	STAND_LEFT: makeStandingFrames(10),
	PICK_UP_DOWN: {
		duration: 400,
		frames: [
			{
				time: 0,
				frame: 12
			}
		]
	}
};
