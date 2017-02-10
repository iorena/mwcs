'use strict';
import {timeToFloat, parseHours, calcSalary} from '../../src/utils/calcUtils.js';

describe('calcUtils', () => {
  describe('hours parser', () => {
    it('should parse total hours correctly', () => {
      var startTime = "8:00";
      var endTime = "15:30";
      var total = 7.5;
      expect(parseHours(startTime, endTime).total).to.equal(total);
    });
    it('should not be confused by day change', () => {
      var startTime = "18:00";
      var endTime = "2:00";
      var total = 8;
      expect(parseHours(startTime, endTime).total).to.equal(total);
    });
    it('should not be confused by minutes', () => {
      var startTime = "10:15";
      var endTime = "16:45";
      var total = 6.5;
      expect(parseHours(startTime, endTime).total).to.equal(total);
    });
    it('should not be confused by night time coding', () => {
      var startTime = "1:00";
      var endTime = "5:00";
      var hours = { total: 4,
		    normal: 0,
		    evening: 4,
		    overtime: 0,
		    eveningOvertime: 0
		  };
      expect(Object.values(parseHours(startTime, endTime))).to.eql(Object.values(hours));
    });
    it('should calculate normal hours correctly', () => {
      var startTime = "8:00";
      var endTime = "2:00";
      var normal = 8;
      expect(parseHours(startTime, endTime).normal).to.equal(normal);
    });
    it('should calculate evening hours correctly', () => {
      var startTime = "12:00";
      var endTime = "19:30";
      var evening = 1.5;
      expect(parseHours(startTime, endTime).evening).to.equal(evening);
    });
    it('should calculate overtime correctly', () => {
      var startTime = "8:00";
      var endTime = "21:00";
      var hours = { total: 13,
		    normal: 8,
		    evening: 0,
		    overtime: 2,
		    eveningOvertime: 3
		  };
      expect(Object.values(parseHours(startTime, endTime))).to.eql(Object.values(hours));
    });
    it('should calculate overlapping evening and overtime correctly', () => {
      var startTime = "11:00";
      var endTime = "22:30";
      var hours = { total: 11.5,
		    normal: 7,
		    evening: 1,
		    overtime: 0,
		    eveningOvertime: 3.5
		  };
      expect(Object.values(parseHours(startTime, endTime))).to.eql(Object.values(hours));
    });
  });
  describe('time to float converter', () => {
    it('should convert string hours to floats correctly', () => {
      var time = "18:45";
      var converted = timeToFloat(time);
      expect(converted).to.equal(18.75);
    });
    it('should convert zeroes correctly', () => {
      var time = "7:00";
      var converted = timeToFloat(time);
      expect(converted).to.equal(7);
    });
  });

  describe('salary calculator', () => {
    it('should calculate total salary correctly', () => {
      var hours = { total: 6,
		    normal: 0,
		    evening: 0,
		    overtimeTier1: 0,
		    overtimeTier2: 0,
		    overtimeTier3: 0
	          };
      var total = 6 * 3.75;

      expect(calcSalary(hours).total).to.equal(total);
    });
    it('should calculate evening compensation correctly', () => {
      var hours = { total: 8,
		    normal: 6,
		    evening: 2,
		    overtime: 0,
		    eveningOvertime: 0,
	          };
      var total = 8 * 3.75 + 2 * 1.15;

      expect(calcSalary(hours).total).to.equal(total);

    });
    it('should calculate overtime salary correctly', () => {
      var hours = { total: 11,
		    normal: 8,
		    evening: 0,
		    overtime: 0,
  	            eveningOvertime: 3
	          };
      var total = 11 * 3.75 + 2 * 3.75 * 0.25 + 1 * 3.75 * 0.5;

      expect(calcSalary(hours).total).to.equal(total);
    });
  });
});
