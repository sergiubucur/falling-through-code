import React, { Component } from "react";
import PropTypes from "prop-types";

import CodeToken from "../code-token/CodeToken";
import "./CodeContainer.scss";

export default class CodeContainer extends Component {
	static propTypes = {
		tokens: PropTypes.array.isRequired
	}

	render() {
		const { tokens } = this.props;

		return (
			<div className="code-container">
				{tokens.map(x => <CodeToken key={x.id} token={x.token} x={x.x} y={x.y} />)}
			</div>
		);
	}
}
