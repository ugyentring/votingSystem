import PropTypes from "prop-types";

const Connected = (props) => {
  return (
    <div className="connected-container">
      <h1 className="connected-header">Metamask Connected</h1>
      <p className="connected-account">Metamask Account: {props.account}</p>
      <p>Remaining Time:{props.remainingTime} </p>

      <div>
        <input
          type="number"
          placeholder="Enter the index of candidate"
          value={props.number}
          onChange={props.handleNumberChange}
        />
        <button className="login-button" onClick={props.voteFunction}>
          Vote
        </button>
      </div>

      <table id="myTable" className="candidates-table">
        <thead>
          <tr>
            <th>Index</th>
            <th>Candidate Name</th>
            <th>Vote Count</th>
          </tr>
        </thead>
        <tbody>
          {props.candidates.map((candidate, index) => {
            <tr key={index}>
              <td>{candidate.index}</td>
              <td>{candidate.name}</td>
              <td>{candidate.voteCount}</td>
            </tr>;
          })}
        </tbody>
      </table>
    </div>
  );
};

Connected.propTypes = {
  account: PropTypes.string,
  remainingTime: PropTypes.number,
  number: PropTypes.number,
  handleNumberChange: PropTypes.func,
  voteFunction: PropTypes.func,
  candidates: PropTypes.arrayOf(
    PropTypes.shape({
      index: PropTypes.number,
      name: PropTypes.string,
      voteCount: PropTypes.number,
    })
  ),
};

export default Connected;
