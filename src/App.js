import React, { Component } from "react";
import "prismjs/themes/prism-tomorrow.css";

import Constants from "./common/Constants";
import CodePreprocessor from "./services/CodePreprocessor";
import CodeIterator from "./services/CodeIterator";
import CodeHighlighter from "./services/CodeHighlighter";
import CodeRenderer from "./services/CodeRenderer";
import CodeTilemapGenerator from "./services/CodeTilemapGenerator";
import CodeContainer from "./components/code-container/CodeContainer";
import SampleCode from "./data/SampleCode";
import Player from "./components/player/Player";
import "./App.scss";

export default class App extends Component {
	constructor() {
		super();

		const codeLines = CodePreprocessor.preprocessCode(SampleCode);
		this.codeIterator = new CodeIterator(codeLines);

		const codeChunk = this.codeIterator.getNextChunk();
		const tokens = CodeHighlighter.highlightCode(codeChunk);

		this.visibleTokens = CodeRenderer.getVisibleTokens(tokens);
		this.tilemap = CodeTilemapGenerator.generateTilemap(this.visibleTokens);
	}

	componentDidMount() {
		this.player = new Player(this.tilemap);
		this.reset();

		this.gameLoop();
	}

	reset() {
		this.scrollPosition = 0;
		this.scrollSpeed = 1;

		this.player.reset();
	}

	gameLoop() {
		this.update();

		requestAnimationFrame(() => this.gameLoop());
	}

	update() {
		this.scroll();
		this.player.update();
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

	render() {
		return (
			<div className="app">
				<CodeContainer tokens={this.visibleTokens} />
			</div>
		);
	}
}
