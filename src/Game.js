import React from "react";
import ReactDOM from "react-dom";
import "prismjs/themes/prism-tomorrow.css";

import Constants from "./common/Constants";
import CodePreprocessor from "./services/CodePreprocessor";
import CodeIterator from "./services/CodeIterator";
import CodeHighlighter from "./services/CodeHighlighter";
import CodeRenderer from "./services/CodeRenderer";
import CodeTilemapGenerator from "./services/CodeTilemapGenerator";
import Layout from "./components/layout/Layout";
import SampleCode from "./data/SampleCode";
import Player from "./components/player/Player";
import "./Game.scss";

export default class Game {
	load() {
		return new Promise((resolve, reject) => {
			ReactDOM.render(<Layout/>, document.getElementById("root"));

			resolve();
		});
	}

	start() {
		this.scrollPosition = 0;
		this.scrollSpeed = 2;

		this.dispose();
		this.generateInitialTilemap();

		this.player = new Player(this.tilemap);

		this.drawTokens();
		this.gameLoop();
	}

	dispose() {
		if (this.player) {
			this.player.dispose();
			this.player = null;
		}

		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}
	}

	gameLoop() {
		this.update();

		if (this.restartOnNextFrame) {
			this.restartOnNextFrame = false;
			this.start();
			return;
		}

		this.animationFrameId = requestAnimationFrame(() => this.gameLoop());
	}

	update() {
		this.scroll();
		this.player.update();
	}

	generateInitialTilemap() {
		const codeLines = CodePreprocessor.preprocessCode(SampleCode);
		this.codeIterator = new CodeIterator(codeLines);

		const codeChunk = this.codeIterator.getNextChunk();
		const tokens = CodeHighlighter.highlightCode(codeChunk);

		this.visibleTokens = CodeRenderer.getVisibleTokens(tokens);
		this.tilemap = CodeTilemapGenerator.generateTilemap(this.visibleTokens);
	}

	integrateNextCodeChunk() {
		if (!this.codeIterator.nextChunkExists()) {
			return;
		}

		const codeChunk = this.codeIterator.getNextChunk();
		const tokens = CodeHighlighter.highlightCode(codeChunk);

		const visibleTokens = CodeRenderer.getVisibleTokens(tokens, this.tilemap.length, this.tilemap.length * Constants.MaxLineWidth);
		const tilemap = CodeTilemapGenerator.generateTilemap(visibleTokens, this.tilemap.length);

		this.visibleTokens = this.visibleTokens.filter(item => item.y * Constants.CellHeight >= this.scrollPosition);
		this.visibleTokens.push(...visibleTokens);
		this.tilemap.push(...tilemap);

		this.player.setTilemap(this.tilemap);
		this.drawTokens();
	}

	scroll() {
		const mapEnd = this.tilemap.length * Constants.CellHeight - window.innerHeight;

		if (this.scrollPosition > mapEnd) {
			return;
		}

		if (mapEnd - this.scrollPosition < window.innerHeight) {
			this.integrateNextCodeChunk();
		}

		const playerY = this.player.y * Constants.CellHeight;
		const screenEnd = this.scrollPosition + window.innerHeight;

		if (playerY < this.scrollPosition || playerY >= screenEnd) {
			this.restartOnNextFrame = true;
			return;
		}

		this.setScrollPosition(this.scrollPosition + this.scrollSpeed);
	}

	setScrollPosition(position) {
		this.scrollPosition = position;

		const container = document.querySelector(".code-container");
		container.scrollTop = this.scrollPosition;
	}

	drawTokens() {
		const now = new Date();

		const tokensContainer = document.querySelector(".tokens-container");

		let str = "";
		this.visibleTokens.forEach((item) => {
			str += `
				<div
					class="token ${item.token.type || ''}"
					style="left: ${item.x * Constants.CellWidth}px; top: ${item.y * Constants.CellHeight}px">
					${item.token.char}
				</div>
			`;
		});

		tokensContainer.innerHTML = str;

		console.log(new Date() - now);
	}
}
