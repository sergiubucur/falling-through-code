import React from "react";
import PropTypes from "prop-types";

import Constants from "../common/Constants";

const CodeToken = ({ token, x, y }) => (
	<div
		className={`token ${token.type || ""}`}
		style={{
			left: `${x * Constants.CellWidth}px`,
			top: `${y * Constants.CellHeight}px`
		}}>
		{token.char}
	</div>
);

CodeToken.propTypes = {
	token: PropTypes.object.isRequired,
	x: PropTypes.number.isRequired,
	y: PropTypes.number.isRequired
};

export default CodeToken;
