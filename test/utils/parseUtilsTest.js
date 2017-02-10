'use strict';
import {calculate} from '../../src/utils/parseUtils.js';

/* Test array, 10 random rows taken from csv and calculated by hand. A bit ugly, but since karma runs
in browser filereading isn't simple either. */

var testArray = [ [ 'Person Name', 'Person ID', 'Date', 'Start', 'End' ],
['Scott Scala', '2', '17.3.2014', '8:30', '16:30' ],
['Larry Lolcode', '3', '17.3.2014', '8:30', '15:30' ],
['Janet Java', '1', '18.3.2014', '9:30', '16:30' ],
['Scott Scala', '2', '18.3.2014', '8:30', '16:30' ],
['Larry Lolcode', '3', '18.3.2014', '9:00', '15:45' ],
['Janet Java', '1', '19.3.2014', '9:30', '16:30' ],
['Scott Scala', '2', '19.3.2014', '12:00', '14:00' ],
['Larry Lolcode', '3', '19.3.2014', '8:30', '15:45' ],
['Janet Java', '1', '20.3.2014', '2:00', '6:00' ],
['Janet Java', '1', '20.3.2014', '10:00', '19:00' ],
['Scott Scala', '2', '20.3.2014', '12:00', '14:00' ] ];

describe('parseUtils', () => {
  describe('csv parser', () => {
    it('should parse and calculate hours correctly', () => {
      var obj = calculate(testArray);

      expect(obj[1].hours.total).to.equal(27);
      expect(obj[1].hours.normal).to.equal(22);
      expect(obj[1].hours.evening).to.equal(4);
      expect(obj[1].hours.overtime).to.equal(0);
      expect(obj[1].hours.eveningOvertime).to.equal(1);

      expect(obj[2].hours.total).to.equal(20);
      expect(obj[2].hours.normal).to.equal(20);
      expect(obj[2].hours.evening).to.equal(0);
      expect(obj[2].hours.overtime).to.equal(0);
      expect(obj[2].hours.eveningOvertime).to.equal(0);

      expect(obj[3].hours.total).to.equal(21);
      expect(obj[3].hours.total).to.equal(21);
      expect(obj[3].hours.evening).to.equal(0);
      expect(obj[3].hours.overtime).to.equal(0);
      expect(obj[3].hours.eveningOvertime).to.equal(0);
    });  
    it('should parse and calculate salaries correctly', () => {
      var obj = calculate(testArray);

      expect(obj[1].salary.total).to.equal(106.79);
      expect(obj[1].salary.normal).to.equal(101.25);
      expect(obj[1].salary.evening).to.equal(4.6);
      expect(obj[1].salary.overtime).to.equal(0.94);

      expect(obj[2].salary.total).to.equal(75);
      expect(obj[2].salary.normal).to.equal(75);
      expect(obj[2].salary.evening).to.equal(0);
      expect(obj[2].salary.overtime).to.equal(0);

      expect(obj[3].salary.total).to.equal(78.75);
      expect(obj[3].salary.normal).to.equal(78.75);
      expect(obj[3].salary.evening).to.equal(0);
      expect(obj[3].salary.overtime).to.equal(0);
    });  
  });
});
