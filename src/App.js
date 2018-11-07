import React, { Component } from "react";
import hljs from "highlight.js/lib/highlight";
import highlightJavascript from "highlight.js/lib/languages/javascript";
import "highlight.js/styles/agate.css";

import SampleCode from "./SampleCode";
import "./App.scss";

hljs.registerLanguage("javascript", highlightJavascript);

export default class App extends Component {
	componentDidMount() {
		this.processDom();
	}

	componentDidUpdate() {
		this.processDom();
	}

	preprocessCode(code) {
		let str = "";

		for (let i = 0; i < 33; i++) {
			str += "\n";
		}

		return str + code;
	}

	processDom() {
		this.highlightCode();
		this.autoScroll();
	}

	highlightCode() {
		const block = document.querySelector(".code-container > pre > code");
		hljs.highlightBlock(block);
	}

	autoScroll() {
		const block = document.querySelector(".code-container > pre > code");

		const update = () => {
			block.scrollTop += 1;

			requestAnimationFrame(update);
		};

		update();
	}

	render() {
		const code = this.preprocessCode(SampleCode);

		return (
			<div className="app">
				<div className="code-container">
					<pre><code>{code}</code></pre>
				</div>
			</div>
		);
	}
}
