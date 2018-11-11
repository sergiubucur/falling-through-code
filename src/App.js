import React, { Component } from "react";
import "prismjs/themes/prism-tomorrow.css";

import CodePreprocessor from "./services/CodePreprocessor";
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

		const code = CodePreprocessor.preprocessCode(SampleCode);
		const tokens = CodeHighlighter.highlightCode(code);
		const visibleTokens = CodeRenderer.getVisibleTokens(tokens);
		const tilemap = CodeTilemapGenerator.generateTilemap(visibleTokens);

		this.tokens = visibleTokens;
		this.player = new Player(tilemap);
	}

	componentDidMount() {
		this.player.init();

		this.gameLoop();
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
		const container = document.querySelector(".code-container");
		container.scrollTop += 1;
	}

	render() {
		return (
			<div className="app">
				<CodeContainer tokens={this.tokens} />
			</div>
		);
	}
}
