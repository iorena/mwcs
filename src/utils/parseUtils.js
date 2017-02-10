var parse = require('csv-parse');
import {parsePeople, parseHours, calcSalary} from './calcUtils.js';

/* Order of columns in csv */
const PERSON_NAME = 0;
const PERSON_ID = 1;
const DATE = 2;
const START = 3;
const END = 4;

/* Parses uploaded csv into array */

export function parseFile(file) {
  var parsed = [];
  const parser = parse({delimiter: ','});
  parser.on('readable', () => {
    var data;
    while(data = parser.read()) {
      parsed.push(data);
    }
  });
  var results = new Promise((resolve) => {
    const reader = new FileReader();
    reader.onload = () => {
      var text = reader.result;
      parser.write(text);
    };
    reader.onloadend = () => {
      parser.end();
      resolve(calculate(parsed));
    }
    reader.readAsText(file);
  });
  return results;
}

export function calculate(csvData) {
  var people = parsePeople(csvData);
  var dataObject = parseRows(csvData, people);
  return dataObject;
}

/* Parses csv array into object sorted by person with calculated hours and salary */ 
function parseRows(data, people) {
  var parsedObject = {};
  var emptyObject = { total: 0,
		      normal: 0,
		      evening: 0,
		      overtime: 0,
		      eveningOvertime: 0
	            };
  /* First find people, so we know the size of our object */
  for (var i = 1; i < people.length; i++) {
    parsedObject[i] = { id: i,
			name: people[i],
		        hours: emptyObject,
		        salary: emptyObject
		      };
  }
  /* Parse each row and add data to correct person's object */
  for (var row  = 1; row < data.length; row++) {
    var hours = parseHours(data[row][START], data[row][END]);
    var salary = calcSalary(hours);
    var id = data[row][PERSON_ID];
    parsedObject[id].hours = appendObj(parsedObject[id].hours, hours);
    parsedObject[id].salary = appendObj(parsedObject[id].salary, salary);
  }

  return parsedObject;
}

/* The sum of two objects: combines the values of corresponging keys. */ 
function appendObj(obj1, obj2) {
  var obj = { total: 0,
	      normal: 0,
	      evening: 0,
       	      overtime: 0,
	      eveningOvertime: 0
	    };
  /* Rounding to two decimals */ 
  obj.total = Math.round((obj1.total + obj2.total) * 100) / 100;
  obj.normal = Math.round((obj1.normal + obj2.normal) * 100) / 100;
  obj.evening = Math.round((obj1.evening + obj2.evening) * 100) / 100;
  obj.overtime = Math.round((obj1.overtime + obj2.overtime) * 100) / 100;
  obj.eveningOvertime = Math.round((obj1.eveningOvertime + obj2.eveningOvertime) * 100) / 100;

  return obj;
}
