import Game from "./Game";

const game = new Game();

game.load().then(() => {
	game.start();
});
