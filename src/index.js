import "react-app-polyfill/ie11";

import Game from "./Game";

const game = new Game();

game.load().then(() => {
	game.start();
});
