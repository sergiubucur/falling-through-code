import Constants from "../common/Constants";

export default class CodePreprocessor {
	static preprocessCode(code) {
		code = code
			.replace(/\t/g, "    ")
			.split("\n")
			.slice(0, Constants.MaxLines)
			.map(x => x.slice(0, Constants.MaxLineWidth))
			.join("\n");

		let str = "";

		for (let i = 0; i < 20; i++) {
			str += "\n";
		}

		return str + code;
	}
}
