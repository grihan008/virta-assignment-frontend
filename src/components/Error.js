import React from "react";
import PropTypes from "prop-types";

import "../styles.css";

function Error(props) {
  return (
    <div className="error">
      <p>{props.text}</p>
      {props.action && (
        <button onClick={props.action}>{props.actionText}</button>
      )}
    </div>
  );
}

Error.defaultProps = {
  text: "Oops! Somthing went wrong!",
  actionText: "OK!"
};

Error.propTypes = {
  text: PropTypes.string,
  action: PropTypes.func,
  actionText: PropTypes.string
};

export default Error;
