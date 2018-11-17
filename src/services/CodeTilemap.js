import Constants from "../common/Constants";

export default class CodeTilemap {
	lines = [];

	addLine(visibleTokens) {
		const line = [];

		for (let i = 0; i < Constants.MaxLineWidth; i++) {
			line.push(0);
		}

		visibleTokens.forEach((token) => {
			line[token.x] = 1;
		});

		this.lines.push(line);
	}
}
