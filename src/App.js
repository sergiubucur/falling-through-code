import React, { Component } from "react";
import "prismjs/themes/prism-tomorrow.css";

import CodePreprocessor from "./services/CodePreprocessor";
import CodeHighlighter from "./services/CodeHighlighter";
import SampleCode from "./SampleCode";
import "./App.scss";

export default class App extends Component {
	componentDidMount() {
		this.initCodeContainer();
		this.autoScroll();
	}

	initCodeContainer() {
		const CellWidth = 10;
		const CellHeight = 24;

		const code = CodePreprocessor.preprocessCode(SampleCode);
		const tokens = CodeHighlighter.highlightCode(code);
		const container = document.querySelector(".code-container");

		let x = 0;
		let y = 0;

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (token.char === "\n") {
				x = 0;
				y++;
				continue;
			}

			const charCode = token.char.charCodeAt(0);
			if (charCode < 33 || charCode > 126) {
				x++;
				continue;
			}

			const div = document.createElement("div");
			div.className = `token ${token.type || ""}`;
			div.style.left = `${x * CellWidth}px`;
			div.style.top = `${y * CellHeight}px`;
			div.innerText = token.char;

			container.appendChild(div);

			x++;
		}
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
		return (
			<div className="app">
				<div className="code-container"></div>
			</div>
		);
	}
}
