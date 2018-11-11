import React, { Component } from "react";
import PropTypes from "prop-types";

import CodeToken from "../code-token/CodeToken";
import "./CodeContainer.scss";

export default class CodeContainer extends Component {
	static propTypes = {
		tokens: PropTypes.array.isRequired
	}

	getTokenList() {
		const { tokens } = this.props;
		const tokenList = [];

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

			tokenList.push(<CodeToken key={i} token={token} x={x} y={y} />);
			x++;
		}

		return tokenList;
	}

	render() {
		return (
			<div className="code-container">
				{this.getTokenList()}
			</div>
		);
	}
}
