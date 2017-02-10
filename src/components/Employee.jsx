import React from 'react';
import {Chart} from 'chart.js';

export default class Employee extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hourCanvasId: props.data.name.split(' ')[0] + 'Hours',
      salaryCanvasId: props.data.name.split(' ')[0] + 'Salary',
      name: props.data.name,
      hours: props.data.hours,
      salary: props.data.salary
    }
  }

  componentDidMount() {
    new Chart(document.getElementById(this.state.hourCanvasId),
    { type: 'pie',
      data: { labels: [ 'Normal', 'Evening', 'Evening+Overtime', 'Daytime overtime' ],
	     datasets: [
      	       {
	         data: [this.state.hours.normal, this.state.hours.evening, this.state.hours.eveningOvertime, this.state.hours.overtime ],
   		 backgroundColor: [ '#b4e9fd', '#047eaf', '#02374b', '#50cbfb' ],
		 hoverBackgroundColor: [ '#69d2fc', '#69d2fc', '#69d2fc', '#69d2fc' ]
      	       }]
	   },
      options: null
    });
    new Chart(document.getElementById(this.state.salaryCanvasId),
    { type: 'pie',
      data: { labels: [ 'Base salary', 'Evening bonus', 'Overtime bonus' ],
	     datasets: [
      	       {
	         data: [ this.state.salary.normal, this.state.salary.evening, this.state.salary.overtime ],
   		 backgroundColor: [ '#b4e9fd', '#50cbfb', '#047eaf' ],
		 hoverBackgroundColor: [ '#69d2fc', '#69d2fc', '#69d2fc' ]
      	       }]
	   },
      options: null
    });
  }

  render() {
    return (
      <div className='employeeContainer'>
	<h2>{this.state.name}</h2>
	<span>Total hours: {this.state.hours.total}</span>
        <canvas id={this.state.hourCanvasId} width="300" height="400"/>
	<span>Total salary: ${this.state.salary.total}</span>
        <canvas id={this.state.salaryCanvasId} width="300" height="400"/>
      </div>
    );
  }
}
