import Constants from "../common/Constants";

export default class CodeTilemapGenerator {
	static generateTilemap(visibleTokens, startY = 0) {
		const sizeY = visibleTokens.reduce((max, token) => {
			const y = token.y - startY;

			return y > max ? y : max;
		}, 0) + 1;

		const map = this.getEmptyTilemap(Constants.MaxLineWidth, sizeY);

		visibleTokens.forEach(token => {
			map[token.y - startY][token.x] = 1;
		});

		return map;
	}

	static getEmptyTilemap(sizeX, sizeY) {
		const map = [];

		for (let i = 0; i < sizeY; i++) {
			let line = [];

			for (let j = 0; j < sizeX; j++) {
				line.push(0);
			}

			map.push(line);
		}

		return map;
	}
}
