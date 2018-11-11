export default class Cooldown {
	constructor(max) {
		this.max = max;

		this.frames = max;
	}

	update() {
		this.frames--;

		if (this.frames === 0) {
			this.frames = this.max;
		}
	}

	isActive() {
		return this.frames === this.max;
	}
}
