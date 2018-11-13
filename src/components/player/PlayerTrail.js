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
		this.segments = [];
	}

	updatePosition(x, y) {
		if (this.segments.length < TrailLength) {
			this.addSegment();
		}

		const segment = this.segments.pop();

		segment.style.left = `${x}px`;
		segment.style.top = `${y}px`;

		this.segments.unshift(segment);
		this.segments.forEach((x, i) => {
			x.style.opacity = (TrailLength - i) / (TrailLength * 3);
		});
	}

	addSegment() {
		const segment = document.createElement("div");

		segment.className = "player trail";
		segment.style.left = `${this.x}px`;
		segment.style.top = `${this.y}px`;
		segment.style.opacity = 0;

		this.segments.push(segment);

		const container = document.querySelector(".code-container");
		container.appendChild(segment);
	}

	dispose() {
		const container = document.querySelector(".code-container");

		Array.from(container.querySelectorAll(".player.trail")).forEach((x) => {
			container.removeChild(x);
		});
	}
}
