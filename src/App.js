import React, { Component } from "react";
import Prism from "prismjs";
import "prismjs/themes/prism-tomorrow.css";

import SampleCode from "./SampleCode";
import "./App.scss";

export default class App extends Component {
	componentDidMount() {
		this.highlightCode();

		this.initCodeContainer();
		this.autoScroll();
	}

	preprocessCode(code) {
		const MaxLines = 80;
		const MaxLineWidth = 100;

		code = code
			.replace(/\t/g, "    ")
			.split("\n")
			.slice(0, MaxLines)
			.map(x => x.slice(0, MaxLineWidth))
			.join("\n");

		let str = "";

		for (let i = 0; i < 20; i++) {
			str += "\n";
		}

		return str + code;
	}

	highlightCode() {
		const code = this.preprocessCode(SampleCode);

		const tokens = Prism.tokenize(code, Prism.languages.js);
		const colors = [];
		let str = "";

		const processToken = (token) => {
			if (typeof token === "string") {
				str += token;

				for (let i = 0; i < token.length; i++) {
					colors.push(undefined);
				}

				return;
			}

			if (typeof token.content === "string") {
				str += token.content;

				for (let i = 0; i < token.content.length; i++) {
					colors.push(token.type);
				}

				return;
			}

			token.content.forEach(x => processToken(x));
		}

		tokens.forEach(x => processToken(x));

		return {
			str,
			colors
		};
	}

	initCodeContainer() {
		const CellWidth = 10;
		const CellHeight = 24;

		const { str, colors } = this.highlightCode();
		const container = document.querySelector(".code-container");

		let x = 0;
		let y = 0;

		for (let i = 0; i < str.length; i++) {
			const char = str[i];

			if (char === "\n") {
				x = 0;
				y++;
			}

			const charCode = str.charCodeAt(i);
			if (charCode < 33 || charCode > 126) {
				x++;
				continue;
			}

			const div = document.createElement("div");

			if (i < colors.length && colors[i]) {
				div.className = `token ${colors[i]}`;
			} else {
				div.className = "token";
			}

			div.style.left = `${x * CellWidth}px`;
			div.style.top = `${y * CellHeight}px`;
			div.title = div.className;
			div.innerText = char;

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
