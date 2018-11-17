import React, { Component } from "react";

import ScoreDisplay from "../score-display/ScoreDisplay";
import DebugDisplay from "../debug-display/DebugDisplay";
import InfoDisplay from "../info-display/InfoDisplay";
import CodeFilePicker from "../code-file-picker/CodeFilePicker";
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
				<DebugDisplay />
				<InfoDisplay />
				<CodeFilePicker />
			</div>
		);
	}
}
