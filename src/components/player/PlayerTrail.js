const TrailLength = 30;

export default class PlayerTrail {
	x = 0;
	y = 0;

	constructor(x, y) {
		this.x = x;
		this.y = y;

		this.init();
	}

	init() {
		const container = document.querySelector(".code-container");

		this.segments = [];

		for (let i = 1; i < TrailLength; i++) {
			const segment = document.createElement("div");
			segment.className = "player trail";
			segment.style.left = `${this.x}px`;
			segment.style.top = `${this.y}px`;
			segment.style.opacity = 0;

			this.segments.push(segment);
			container.appendChild(segment);
		}
	}

	updatePosition(x, y) {
		const segment = this.segments.pop();

		segment.style.left = `${x}px`;
		segment.style.top = `${y}px`;

		this.segments.unshift(segment);
		this.segments.forEach((x, i) => {
			x.style.opacity = (TrailLength - i) / (TrailLength * 3);
		});
	}
}
