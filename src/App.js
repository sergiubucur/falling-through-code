import React, { Component } from "react";

import "./App.scss";

export default class App extends Component {
	state = {
		text: "Falling Through Code"
	}

	render() {
		return (
			<div className="app">
				<h1>{this.state.text}</h1>
			</div>
		);
	}
}
