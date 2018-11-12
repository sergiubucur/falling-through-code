import Constants from "../common/Constants";

export default class CodeIterator {
	constructor(codeLines) {
		this.codeLines = codeLines;

		this.reset();
		this.onResize();
	}

	reset() {
		this.lineIndex = 0;
	}

	nextChunkExists() {
		if (this.lineIndex === 0) {
			return true;
		}

		return this.lineIndex < this.codeLines.length;
	}

	getNextChunk() {
		let currentChunkSize = this.chunkSize;

		if (this.lineIndex === 0) {
			currentChunkSize *= 2;
		}

		let chunk = this.codeLines
			.slice(this.lineIndex, this.lineIndex + currentChunkSize)
			.join("\n");

		if (this.lineIndex === 0) {
			chunk = this.prefixWithEmptyLines(chunk, Constants.PrefixEmptyLinesCount);
		}

		this.lineIndex += currentChunkSize;

		return chunk;
	}

	onResize() {
		this.chunkSize = Math.ceil(window.innerHeight / Constants.CellHeight);
	}

	prefixWithEmptyLines(str, lineCount) {
		let prefix = "";

		for (let i = 0; i < lineCount; i++) {
			prefix += "\n";
		}

		return prefix + str;
	}
}
