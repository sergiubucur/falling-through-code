import React, { Component } from "react";

import EventBus from "../../services/EventBus";
import "./DebugDisplay.scss";

export default class DebugDisplay extends Component {
	state = {
		visible: false,
		values: {}
	}

	componentDidMount() {
		this.listener = EventBus.events.addListener(EventBus.channels.DebugDisplay, this.handleUpdate);

		window.debugValue = (key, value) => {
			EventBus.events.dispatch(EventBus.channels.DebugDisplay, { setValue: { [key]: value } });
		};
	}

	componentWillUnmount() {
		EventBus.events.removeListener(EventBus.channels.DebugDisplay, this.listener);
	}

	handleUpdate = (data) => {
		if (data.toggleVisibility) {
			this.setState({
				visible: !this.state.visible
			});

			return;
		}

		if (data.setValue) {
			this.setState({
				values: Object.assign({}, this.state.values, data.setValue)
			});

			return;
		}
	}

	render() {
		const { visible, values } = this.state;

		if (!visible) {
			return null;
		}

		return (
			<div className="debug-display">
				<div>
					{Object.keys(values).map(key => (
						<div key={key}>{`${key}: ${values[key]}`}</div>
					))}
				</div>
			</div>
		);
	}
}
