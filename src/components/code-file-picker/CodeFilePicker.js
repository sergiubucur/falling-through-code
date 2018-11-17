import React, { Component } from "react";

import Languages from "../../common/Languages";
import EventBus from "../../services/EventBus";
import "./CodeFilePicker.scss";

export default class CodeFilePicker extends Component {
	constructor() {
		super();

		this.state = {
			languages: this.getLanguages(),
			errorText: null,
			url: "",
			selectedLanguage: "js",
			visible: false
		};

		this.inputRef = React.createRef();
	}

	componentDidMount() {
		this.listener = EventBus.events.addListener(EventBus.channels.CodeFilePicker, this.handleUpdate);
	}

	componentWillUnmount() {
		EventBus.events.removeListener(EventBus.channels.CodeFilePicker, this.listener);
	}

	getLanguages() {
		return Object.keys(Languages)
			.map(key => {
				return {
					id: Languages[key],
					name: key
				};
			});
	}

	handleUpdate = (data) => {
		if (data.open) {
			this.setState({
				errorText: null,
				url: "",
				selectedLanguage: "js",
				visible: true
			}, () => {
				this.inputRef.current.focus();
			});

			return;
		}
	}

	handleGoClick = () => {
		const { url, selectedLanguage } = this.state;

		if (this.state.url === "") {
			this.setState({
				errorText: "URL field is empty."
			});

			return;
		};

		window.sessionStorage.ftcLoadFromUrl = JSON.stringify({
			url,
			language: selectedLanguage
		});

		window.location.reload();
	}

	handleCloseClick = () => {
		this.setState({
			visible: false
		});
	}

	handleUrlChange = (e) => {
		this.setState({
			url: e.target.value
		});
	}

	handleLanguageChange = (e) => {
		this.setState({
			selectedLanguage: e.target.value
		});
	}

	render() {
		const { url, selectedLanguage, errorText, visible } = this.state;

		if (!visible) {
			return null;
		}

		return (
			<div className="code-file-picker">
				<div className="header">
					<i className="button fa fa-remove" onClick={this.handleCloseClick} />
				</div>

				<div className="form">
					<div className="row">
						<div className="field">
							URL
						</div>
						<div className="value">
							<input type="text" ref={this.inputRef} value={url} onChange={this.handleUrlChange} />
						</div>
					</div>

					<div className="row">
						<div className="field">
							Language
						</div>
						<div className="value">
							<select value={selectedLanguage} onChange={this.handleLanguageChange}>
								{this.state.languages.map(x => <option key={x.id} value={x.id}>{x.name}</option>)}
							</select>
						</div>
					</div>
				</div>

				<div className="footer">
					<div className="inner">
						<div className="errors">
							{errorText}
						</div>

						<button type="button" onClick={this.handleGoClick}>Go!</button>
					</div>
				</div>
			</div>
		);
	}
}
