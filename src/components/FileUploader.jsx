import React from 'react';
import ReactDOM from 'react-dom';
import Results from './Results.jsx';
import {parseFile} from '../utils/parseUtils.js';

export default class FileUploader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fileName: '',
      error: ''
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleUpload = this.handleUpload.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit() {
    parseFile(this.state.file).then((results) => {
      const resultsElement = <Results data={results}/>;
      ReactDOM.render(resultsElement, document.getElementById('results'));
    });
  }

  handleClick() {
    document.getElementById('uploadHidden').click();
  }

  handleUpload() {
    var files = document.getElementById('uploadHidden').files;
    if (files.length == 0) return;
    var file = files[0];
    var parts = file.name.split('.');
    if (parts[parts.length - 1] == 'csv') {
      this.setState({fileName: file.name});
      this.setState({error: ''});
      this.setState({file: file});
    } else {
      this.setState({error: '\u26A0 Please upload a csv file'});
      this.setState({fileName: ''});
    }
  }

  render() {
    return (
      <div className="fileupload">
	<h2>$  $  $</h2>
	<span>Choose csv file to calculate wages from</span>
	<form id="form">
	  <div>
	  <input type="file" name="uploadHidden" id="uploadHidden" className="uploadHidden" onChange={this.handleUpload}/>
	  </div>
	  <div>
	  <input className="button" type="button" name="upload" value="SELECT FILE" onClick={this.handleClick}/>
	  </div>
	  <div>
	  <span className="error">{this.state.error}</span>
	  <span>  {this.state.fileName}</span>
	  </div>
	  <div>
	  <input className="button" type="button" value="CALCULATE" id="submit" onClick={this.handleSubmit}/>
	  </div>
	</form>
      </div>
    );
  }
}
