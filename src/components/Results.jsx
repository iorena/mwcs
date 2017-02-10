import React from 'react';

import Employee from './Employee.jsx';

export default class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = { data: props.data };
  }
  render() {
    var employees = Object.values(this.props.data).map((person, index) => {
      return <Employee data={person} key={index}/>;
    });
    return (
      <div className="results">
	<h2>Results</h2>
	{employees}
      </div>
    );
  }
}
