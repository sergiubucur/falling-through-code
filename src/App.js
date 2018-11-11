import React, { Component } from "react";
import "prismjs/themes/prism-tomorrow.css";

import CodePreprocessor from "./services/CodePreprocessor";
import CodeHighlighter from "./services/CodeHighlighter";
import CodeContainer from "./components/code-container/CodeContainer";
import SampleCode from "./data/SampleCode";
import "./App.scss";
import CodeRenderer from "./services/CodeRenderer";

export default class App extends Component {
	constructor() {
		super();

		const code = CodePreprocessor.preprocessCode(SampleCode);
		const tokens = CodeHighlighter.highlightCode(code);
		const visibleTokens = CodeRenderer.getVisibleTokens(tokens);

		this.state = {
			tokens: visibleTokens
		};
	}

	componentDidMount() {
		this.autoScroll();
	}

	autoScroll() {
		const container = document.querySelector(".code-container");

		const update = () => {
			container.scrollTop += 1;

			requestAnimationFrame(update);
		};

		update();
	}

	render() {
		const { tokens } = this.state;

		return (
			<div className="app">
				<CodeContainer tokens={tokens} />
			</div>
		);
	}
}
