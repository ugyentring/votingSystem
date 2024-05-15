import PropTypes from "prop-types";

const Connected = (props) => {
  return (
    <div className="connected-container">
      <h1 className="connected-header">Metamask Connected</h1>
      <p className="connected-account">Metamask Account: {props.account}</p>
    </div>
  );
};

Connected.propTypes = {
  account: PropTypes.string.isRequired,
};

export default Connected;
