import PropTypes from "prop-types";

const Login = (props) => {
  return (
    <div className="login-container">
      <h1 className="welcome-message">
        Welcome to the decentralized voting app
      </h1>
      <button className="login-button" onClick={props.connectWallet}>
        Connect Metamask
      </button>
    </div>
  );
};

Login.propTypes = {
  connectWallet: PropTypes.func.isRequired,
};

export default Login;
