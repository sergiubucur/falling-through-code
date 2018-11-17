import EventDispatcher from "simple-event-dispatcher";

class EventBus {
	events = new EventDispatcher();

	channels = {
		DebugDisplay: 1,
		CodeFilePicker: 2,
		Score: 3
	}
}

export default new EventBus();
