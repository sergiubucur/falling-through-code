import Prism from "prismjs"; // eslint-disable-line

// javascript, html and css are loaded by default
import "prismjs/components/prism-sql";
import "prismjs/components/prism-java";
import "prismjs/components/prism-bash";
import "prismjs/components/prism-python";
import "prismjs/components/prism-csharp";
import "prismjs/components/prism-php";
import "prismjs/components/prism-c";
import "prismjs/components/prism-cpp";
import "prismjs/components/prism-typescript";
import "prismjs/components/prism-ruby";
import "prismjs/components/prism-swift";
import "prismjs/components/prism-nasm";

const Languages = {
	"JavaScript": "js",
	"HTML": "markup",
	"CSS": "css",
	"SQL": "sql",
	"Java": "java",
	"Bash/Shell": "bash",
	"Python": "python",
	"C#": "csharp",
	"PHP": "php",
	"C++": "cpp",
	"C": "c",
	"TypeScript": "typescript",
	"Ruby": "ruby",
	"Swift": "swift",
	"Assembly": "nasm"
};

export default Languages;
