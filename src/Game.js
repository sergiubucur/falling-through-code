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
import CodeTokenList from "./components/code-token-list/CodeTokenList";
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
		this.dispose();
		this.generateInitialTilemap();

		this.player = new Player(this.tilemap);

		this.drawTokens();
		this.reset();
		this.gameLoop();
	}

	dispose() {
		if (this.player) {
			this.player.dispose();
			this.player = null;
		}

		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
		}
	}

	reset() {
		this.scrollPosition = 0;
		this.scrollSpeed = 1;

		this.player.reset();
	}

	gameLoop() {
		this.update();

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

	scroll() {
		const mapEnd = this.tilemap.length * Constants.CellHeight - window.innerHeight;

		if (this.scrollPosition > mapEnd) {
			return;
		}

		const playerY = this.player.y * Constants.CellHeight;
		const screenEnd = this.scrollPosition + window.innerHeight;

		if (playerY < this.scrollPosition || playerY >= screenEnd) {
			this.reset();
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
		const container = document.querySelector(".tokens-container");

		ReactDOM.unmountComponentAtNode(container);
		ReactDOM.render(<CodeTokenList tokens={this.visibleTokens} />, container);
	}
}
