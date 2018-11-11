import Constants from "../../common/Constants";
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
	}

	init() {
		this.domElement = document.createElement("div");
		this.domElement.className = "player";
		this.updatePosition();

		const container = document.querySelector(".code-container");
		container.appendChild(this.domElement);
	}

	update() {
		let newX = this.x;
		let newY = this.y;

		if (InputService.isKeyDown(PlayerKeys.Left)) {
			newX--;
		}
		if (InputService.isKeyDown(PlayerKeys.Right)) {
			newX++;
		}

		if (newX < this.minX) {
			newX = this.minX;
		}
		if (newX > this.maxX) {
			newX = this.maxX;
		}
		if (this.tilemap[newY][newX]) {
			newX = this.x;
		}

		if (InputService.isKeyDown(PlayerKeys.Up) && this.jumpCount < JumpLimit) {
			newY -= 2;
			this.jumpCount++;
		}

		newY++;
		let dy = newY - this.y;
		if (newY < this.minY) {
			newY = this.minY;
		}
		if (newY > this.maxY) {
			newY = this.maxY;
		}
		if (this.tilemap[newY][newX]) {
			newY = this.y;

			if (dy < 0) {
				this.jumpCount = JumpLimit;
			} else {
				this.jumpCount = 0;
			}
		}

		this.x = newX;
		this.y = newY;

		this.updatePosition();
	}

	updatePosition() {
		this.domElement.style.left = `${this.x * Constants.CellWidth}px`;
		this.domElement.style.top = `${this.y * Constants.CellHeight}px`;
	}
}
