import React from "react";
import PropTypes from "prop-types";

import CodeToken from "./CodeToken";

const CodeTokenList = ({ tokens }) => (
	<React.Fragment>
		{tokens.map(x => <CodeToken key={x.id} token={x.token} x={x.x} y={x.y} />)}
	</React.Fragment>
);

CodeTokenList.propTypes = {
	tokens: PropTypes.array.isRequired
};

export default CodeTokenList;
