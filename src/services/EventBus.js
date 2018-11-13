import EventDispatcher from "simple-event-dispatcher";

class EventBus {
	events = new EventDispatcher();
}

export default new EventBus();
