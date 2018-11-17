import React from "react";
import ReactDOM from "react-dom";
import "prismjs/themes/prism-tomorrow.css";

import Constants from "./common/Constants";
import EventBus from "./services/EventBus";
import CodePreprocessor from "./services/CodePreprocessor";
import CodeHighlighter from "./services/CodeHighlighter";
import CodeRenderer from "./services/CodeRenderer";
import CodeTilemap from "./services/CodeTilemap";
import Layout from "./components/layout/Layout";
import Player from "./components/player/Player";
import "./Game.scss";

export default class Game {
	init(code, language) {
		this.code = code;
		this.language = language;

		ReactDOM.render(<Layout/>, document.getElementById("root"));
	}

	start() {
		this.dispose();
		this.initialize();
		this.gameLoop();
	}

	dispose() {
		EventBus.events.dispatch(EventBus.channels.Score, { reset: true });

		if (this.player) {
			this.player.dispose();
			this.player = null;
		}

		if (this.animationFrameId) {
			cancelAnimationFrame(this.animationFrameId);
			this.animationFrameId = null;
		}

		this.scrollPosition = 0;
		this.scrollSpeed = 2;
		this.lineIndex = 0;
		this.codeLines = null;
		this.tilemap = null;

		document.querySelector(".tokens-container").innerHTML = "";
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

		EventBus.events.dispatch(EventBus.channels.Score, { score: this.player.y });
	}

	initialize() {
		this.codeLines = CodePreprocessor.preprocessCode(this.code);
		this.tilemap = new CodeTilemap();

		const initialLineCount = Math.ceil(window.innerHeight / Constants.CellHeight) + 1;

		for (let i = 0; i < initialLineCount; i++) {
			if (i >= this.codeLines.length) {
				break;
			}

			this.lineIndex = i;

			const tokens = CodeHighlighter.highlightCode(this.codeLines[this.lineIndex], this.language);
			const visibleTokens = CodeRenderer.getVisibleTokens(tokens, this.lineIndex, this.lineIndex * Constants.MaxLineWidth);

			this.tilemap.addLine(visibleTokens);
			this.drawTokenLine(visibleTokens, this.lineIndex);
		}

		this.player = new Player(this.tilemap);
	}

	integrateNextCodeLine() {
		if (this.lineIndex + 1 >= this.codeLines.length) {
			return;
		}

		this.lineIndex++;

		const tokens = CodeHighlighter.highlightCode(this.codeLines[this.lineIndex], this.language);
		const visibleTokens = CodeRenderer.getVisibleTokens(tokens, this.lineIndex, this.lineIndex * Constants.MaxLineWidth);

		this.tilemap.addLine(visibleTokens);
		this.player.updateTilemap();

		this.removeTopLineIfHidden();
		this.drawTokenLine(visibleTokens, this.lineIndex);
	}

	scroll() {
		const mapEnd = this.tilemap.lines.length * Constants.CellHeight - window.innerHeight;

		if (this.scrollPosition >= mapEnd) {
			return;
		}

		if (mapEnd - this.scrollPosition < window.innerHeight) {
			this.integrateNextCodeLine();
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

	removeTopLineIfHidden() {
		const topLine = document.querySelector(".token-line");
		const lineIndex = parseInt(topLine.getAttribute("data-line-index"), 10);

		if (this.scrollPosition > (lineIndex + 1) * Constants.CellHeight) {
			const tokensContainer = document.querySelector(".tokens-container");
			tokensContainer.removeChild(topLine);
		}
	}

	drawTokenLine(visibleTokens, lineIndex) {
		let str = "";

		visibleTokens.forEach((item) => {
			str += `
				<div
					class="token ${item.token.type || ''}"
					style="left: ${item.x * Constants.CellWidth}px; top: ${item.y * Constants.CellHeight}px">
					${item.token.char}
				</div>
			`;
		});

		if (str.length === 0) {
			str += `
				<div class="token" style="left: 0; top: ${lineIndex * Constants.CellHeight}px">
					&nbsp;
				</div>
			`;
		}

		const tokenLine = document.createElement("div");
		tokenLine.className = "token-line";
		tokenLine.innerHTML = str;
		tokenLine.setAttribute("data-line-index", lineIndex);

		const tokensContainer = document.querySelector(".tokens-container");
		tokensContainer.appendChild(tokenLine);

		this.addDebugValues();
	}

	addDebugValues() {
		window.debugValue("lines per screen", Math.ceil(window.innerHeight / Constants.CellHeight));
		window.debugValue("token lines", document.querySelectorAll(".token-line").length);
		window.debugValue("tokens", document.querySelectorAll(".token").length);
	}
}
