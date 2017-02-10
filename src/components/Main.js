require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/Results.css');

import React from 'react';
import FileUploader from './FileUploader.jsx';
import Results from './Results.jsx';

class AppComponent extends React.Component {
  render() {
    return (
      <div className="top">
	<div className="title">
	  <h1>Monthly Wage Calculation System</h1>
	</div>
        <FileUploader/>
	<div id="results"/>
      </div>
    );
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
