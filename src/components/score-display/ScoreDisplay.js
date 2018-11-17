import React, { Component } from "react";

import EventBus from "../../services/EventBus";
import "./ScoreDisplay.scss";

export default class ScoreDisplay extends Component {
	state = {
		score: 0,
		highScore: 0
	}

	componentDidMount() {
		this.listener = EventBus.events.addListener(EventBus.channels.Score, this.handleScoreUpdate);
	}

	componentWillUnmount() {
		EventBus.events.removeListener(EventBus.channels.Score, this.listener);
	}

	handleScoreUpdate = (data) => {
		if (data.reset) {
			this.setState({ score: 0 });
			return;
		}

		let changes = {};

		if (data.score > this.state.score) {
			changes.score = data.score;
		}
		if (data.score > this.state.highScore) {
			changes.highScore = data.score;
		}

		if (Object.keys(changes).length > 0) {
			this.setState(changes);
		}
	}

	render() {
		const { score, highScore } = this.state;

		return (
			<div className="score-display">
				<div className="block">
					<div className="label">Score</div>
					<div className="value">{score}</div>
				</div>
				<div className="block">
					<div className="label">High Score</div>
					<div className="value">{highScore}</div>
				</div>
			</div>
		);
	}
}
