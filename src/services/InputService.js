class InputService {
	keyState = {};

	constructor() {
		document.addEventListener("keydown", (e) => {
			this.keyState[e.keyCode] = true;
		}, false);

		document.addEventListener("keyup", (e) => {
			this.keyState[e.keyCode] = false;
		});
	}

	isKeyUp(keyCode) {
		return !this.keyState[keyCode];
	}

	isKeyDown(keyCode) {
		return this.keyState[keyCode];
	}
}

export default new InputService();
