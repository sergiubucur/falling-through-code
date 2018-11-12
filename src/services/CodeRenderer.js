export default class CodeRenderer {
	static getVisibleTokens(tokens, startY = 0, idOffset = 0) {
		const tokenList = [];

		let x = 0;
		let y = startY;

		for (let i = 0; i < tokens.length; i++) {
			const token = tokens[i];

			if (token.char === "\n") {
				x = 0;
				y++;
				continue;
			}

			const charCode = token.char.charCodeAt(0);
			if (charCode < 33 || charCode > 126) {
				x++;
				continue;
			}

			tokenList.push({
				id: idOffset + i,
				token,
				x,
				y
			});

			x++;
		}

		return tokenList;
	}
}
