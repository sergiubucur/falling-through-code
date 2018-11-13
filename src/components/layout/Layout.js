import React, { Component } from "react";

import ScoreDisplay from "../score-display/ScoreDisplay";
import InfoDisplay from "../info-display/InfoDisplay";
import "./Layout.scss";

export default class Layout extends Component {
	render() {
		return (
			<div className="game-container">
				<div className="code-container">
					<div className="tokens-container">
					</div>
				</div>

				<ScoreDisplay />
				<InfoDisplay />
			</div>
		);
	}
}
