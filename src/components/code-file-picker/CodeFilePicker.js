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
			file: "",
			selectedLanguage: "js",
			visible: false
		};

		this.inputRef = React.createRef();
		this.inputFileRef = React.createRef();
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
				file: "",
				selectedLanguage: "js",
				visible: true
			}, () => {
				this.inputRef.current.focus();
				this.inputFileRef.current.value = "";
			});

			return;
		}
	}

	handleGoClick = () => {
		const { url, file, selectedLanguage } = this.state;

		if (url === "" && file === "") {
			this.setState({
				errorText: "No file selected."
			});

			return;
		};

		if (file) {
			window.sessionStorage.ftcLoadFromFile = JSON.stringify({
				file,
				language: selectedLanguage
			});

			window.location.reload();
			return;
		}

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

	handleFileChange = (e) => {
		if (!e.target.files.length) {
			this.setState({
				file: ""
			});

			return;
		}

		var reader = new FileReader();

		reader.onload = () => {
			this.setState({
				file: reader.result
			});
		}

		reader.readAsText(e.target.files[0], "utf-8");
	}

	handleLanguageChange = (e) => {
		this.setState({
			selectedLanguage: e.target.value
		});
	}

	render() {
		const { url, file, selectedLanguage, errorText, visible } = this.state;

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
							URL to source file
						</div>
						<div className="value">
							<input type="text" ref={this.inputRef} value={url} onChange={this.handleUrlChange} disabled={file} />
						</div>
					</div>

					<div className="row">
						<div className="field">
							Or choose local source file
						</div>
						<div className="value">
							<input type="file" ref={this.inputFileRef} onChange={this.handleFileChange} />
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
