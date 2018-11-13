import React, { Component } from "react";

import "./InfoDisplay.scss";

export default class InfoDisplay extends Component {
	render() {
		return (
			<div className="info-display">
				<i className="fa fa-arrow-circle-left" /><i className="fa fa-arrow-circle-right" /> Move<br />
				<i className="fa fa-arrow-circle-up" /> Jump<br />
			</div>
		);
	}
}
