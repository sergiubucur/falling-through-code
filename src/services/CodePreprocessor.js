import Constants from "../common/Constants";

export default class CodePreprocessor {
	static preprocessCode(code) {
		return code
			.replace(/\t/g, "    ")
			.split("\n")
			.map(x => x.slice(0, Constants.MaxLineWidth));
	}
}
