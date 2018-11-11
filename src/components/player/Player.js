import Constants from "../../common/Constants";
import MathHelper from "../../common/MathHelper";
import InputService from "../../services/InputService";
import PlayerKeys from "./PlayerKeys";
import "./Player.scss";

const JumpLimit = 5;

export default class Player {
	x = 0;
	y = 0;
	jumpCount = 0;

	constructor(tilemap) {
		this.tilemap = tilemap;

		this.minX = 0;
		this.minY = 0;
		this.maxX = tilemap[0].length - 1;
		this.maxY = tilemap.length - 1;

		this.init();
	}

	init() {
		this.domElement = document.createElement("div");
		this.domElement.className = "player";
		this.updatePosition();

		const container = document.querySelector(".code-container");
		container.appendChild(this.domElement);
	}

	reset() {
		this.x = 0;
		this.y = 0;
		this.jumpCount = JumpLimit;

		this.updatePosition();
	}

	update() {
		let newPos = { x: this.x, y: this.y };

		this.updateX(newPos);
		this.updateY(newPos);

		this.x = newPos.x;
		this.y = newPos.y;

		this.updatePosition();
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
		this.domElement.style.left = `${this.x * Constants.CellWidth}px`;
		this.domElement.style.top = `${this.y * Constants.CellHeight}px`;
	}

	collides(newPos) {
		return this.tilemap[newPos.y][newPos.x];
	}
}
