import Constants from "../../common/Constants";
import MathHelper from "../../common/MathHelper";
import InputService from "../../services/InputService";
import PlayerKeys from "./PlayerKeys";
import PlayerTrail from "./PlayerTrail";
import EventBus from "../../services/EventBus";
import "./Player.scss";


const JumpLimit = 5;

export default class Player {
	x = 13;
	y = 0;
	jumpCount = JumpLimit;
	pressed = false;

	constructor(tilemap) {
		this.tilemap = tilemap;

		this.updateTilemap();
		this.init();
	}

	init() {
		this.trail = new PlayerTrail(this.x, this.y);

		this.domElement = document.createElement("div");
		this.domElement.className = "player";

		this.updatePosition();

		const container = document.querySelector(".code-container");
		container.appendChild(this.domElement);
	}

	dispose() {
		const container = document.querySelector(".code-container");
		container.removeChild(this.domElement);

		this.trail.dispose();
		this.trail = null;
	}

	updateTilemap() {
		this.minX = 0;
		this.minY = 0;
		this.maxX = Constants.MaxLineWidth - 1;
		this.maxY = this.tilemap.lines.length - 1;
	}

	update() {
		this.updateDebugDisplay();

		let newPos = { x: this.x, y: this.y };

		this.updateX(newPos);
		this.updateY(newPos);

		this.x = newPos.x;
		this.y = newPos.y;

		this.updatePosition();
	}

	updateDebugDisplay() {
		if (InputService.isKeyDown(PlayerKeys.DebugMode) && !this.pressed) {
			EventBus.events.dispatch(EventBus.channels.DebugDisplay, { toggleVisibility: true });
			this.pressed = true;
		}

		this.pressed = InputService.isKeyDown(PlayerKeys.DebugMode);
	}

	updateX(newPos) {
		if (InputService.isKeyDown(PlayerKeys.Left)) {
			newPos.x--;
		}
		if (InputService.isKeyDown(PlayerKeys.Right)) {
			newPos.x++;
		}

		newPos.x = MathHelper.clamp(newPos.x, this.minX, this.maxX);

		if (this.collides(newPos)) {
			newPos.x = this.x;
		}
	}

	updateY(newPos) {
		if (InputService.isKeyDown(PlayerKeys.Up) && this.jumpCount < JumpLimit) {
			newPos.y -= 2;
			this.jumpCount++;
		}

		newPos.y++;
		let dy = newPos.y - this.y;

		newPos.y = MathHelper.clamp(newPos.y, this.minY, this.maxY);

		if (this.collides(newPos)) {
			newPos.y = this.y;

			if (dy < 0) {
				this.jumpCount = JumpLimit;
			} else {
				this.jumpCount = 0;
			}
		}
	}

	updatePosition() {
		const x = this.x * Constants.CellWidth;
		const y = this.y * Constants.CellHeight;

		this.domElement.style.left = `${x}px`;
		this.domElement.style.top = `${y}px`;

		this.trail.updatePosition(x, y);
	}

	collides(newPos) {
		return this.tilemap.lines[newPos.y][newPos.x];
	}
}
