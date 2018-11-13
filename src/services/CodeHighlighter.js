import Prism from "prismjs";

export default class CodeHighlighter {
	static highlightCode(code, language) {
		const tokens = Prism.tokenize(code, Prism.languages[language]);
		const processedTokens = [];

		const processToken = (token) => {
			if (typeof token === "string") {
				for (let i = 0; i < token.length; i++) {
					processedTokens.push({
						char: token[i],
						type: undefined
					});
				}

				return;
			}

			if (typeof token.content === "string") {
				for (let i = 0; i < token.content.length; i++) {
					processedTokens.push({
						char: token.content[i],
						type: token.type
					});
				}

				return;
			}

			token.content.forEach(x => processToken(x));
		}

		tokens.forEach(x => processToken(x));

		return processedTokens;
	}
}
