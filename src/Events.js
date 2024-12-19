// This system works as an anonymous event system. Any object that needs to emit/listen to an event, does not need to know the other emitters/listeners.

// Any object within the game can call the emit method, doing so will ensure that any objects that have "subscribed" to the event (by name)...
// will have the callback they passed in run at that time. Allowing for these events to only run when called and the callbacks to only run when needed.

// Objects can also unsubscribe from said events, i.e. if an item is picked it is no longer listening.

class Events {
	callbacks = [];
	nextId = 0;

	// Emit Events
	emit(eventName, value) {
		this.callbacks.forEach((stored) => {
			if (stored.eventName === eventName) {
				stored.callback(value);
			}
		});
	}

	// Subscribe to something happening.
	on(eventName, caller, callback) {
		this.nextId += 1;
		this.callbacks.push({
			id: this.nextId,
			eventName,
			caller,
			callback
		});
		return this.nextId;
	}

	// Remove the subscription.
	off(id) {
		this.callbacks = this.callbacks.filter((stored) => stored.id !== id);
	}

	unsubscribe(caller) {
		this.callbacks = this.callbacks.filter(
			(stored) => stored.caller !== caller
		);
	}
}

// The entire game will share one "events" instance.
export const events = new Events();
