import React, { Component } from "react";

import EventBus from "../../services/EventBus";
import "./InfoDisplay.scss";

export default class InfoDisplay extends Component {
	handleOpenClick = () => {
		EventBus.events.dispatch("code-file-picker-update", { open: true });
	}

	render() {
		return (
			<div className="info-display">
				<i className="fa fa-arrow-circle-left" /><i className="fa fa-arrow-circle-right" /> Move<br />
				<i className="fa fa-arrow-circle-up" /> Jump<br /><br />

				<span className="action" onClick={this.handleOpenClick}>Load code file</span><br /><br />

				<span className="credits">
					-------------<br/>
					Falling Through Code<br />
					Sergiu-Valentin Bucur, 2018
				</span>
			</div>
		);
	}
}
