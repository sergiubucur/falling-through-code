import "react-app-polyfill/ie11";
import SampleCode from "./data/SampleCode";

import Languages from "./common/Languages";
import Game from "./Game";

if (window.sessionStorage.ftcLoadFromUrl) {
	const data = JSON.parse(window.sessionStorage.ftcLoadFromUrl);

	getCode(data.url, (code) => {
		initGame(code, data.language);
	});
} else {
	initGame();
}

function initGame(code = SampleCode, language = Languages.JavaScript) {
	const game = new Game();

	game.init(code, language);
	game.start();
}

function getCode(url, callback) {
	const xhr = new XMLHttpRequest();
	xhr.open("GET", url, true);

	xhr.onload = () => callback(xhr.responseText);
	xhr.onerror = () => handleError();

	xhr.send();
}

function handleError() {
	const div = document.createElement("div");

	div.className = "error";
	div.innerText = "Cannot load code file from URL.\n\nRefresh to go back to sample code file.";

	document.body.appendChild(div);

	window.sessionStorage.removeItem("ftcLoadFromUrl");
}
