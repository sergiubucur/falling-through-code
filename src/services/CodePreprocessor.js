import Constants from "../common/Constants";

export default class CodePreprocessor {
	static preprocessCode(code) {
		const codeLines = code
			.replace(/\t/g, "    ")
			.split("\n")
			.map(x => x.slice(0, Constants.MaxLineWidth));

		for (let i = 0; i < Constants.PrefixEmptyLinesCount; i++) {
			codeLines.unshift("");
		}

		return codeLines;
	}
}
