const MaxLines = 80;
const MaxLineWidth = 100;

export default class CodePreprocessor {
	static preprocessCode(code) {
		code = code
			.replace(/\t/g, "    ")
			.split("\n")
			.slice(0, MaxLines)
			.map(x => x.slice(0, MaxLineWidth))
			.join("\n");

		let str = "";

		for (let i = 0; i < 20; i++) {
			str += "\n";
		}

		return str + code;
	}
}
