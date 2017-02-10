/* Order of columns in csv */

const PERSON_NAME = 0;
const PERSON_ID = 1;
const DATE = 2;
const START = 3;
const END = 4;

/* Salary related numbers */
const SALARY_BASE = 3.75;
const SALARY_EVENING = 1.15;
const TIER1_MULTIPLIER = 0.25;
const TIER2_MULTIPLIER = 0.5;
const TIER3_MULTIPLIER = 1;

export function parsePeople(data) {
  var names = [];
  /* Start from 1 instead of 0 because first row is header */
  for (var i = 1; i < data.length; i++)
  {
    var name = data[i][PERSON_NAME];
    if (names.indexOf(name) == -1)
    {
      names[data[i][PERSON_ID]] = name;
    }
  }
  return names;
}

export function parseHours(startTime, endTime) {
  var hours = { total: 0,
		normal: 0,
		evening: 0,
		overtime: 0,
		eveningOvertime: 0
	      };
  var start = timeToFloat(startTime);
  var end = timeToFloat(endTime);

  /* if start and/or end is next day, add 24 hours */
  if (start < 6 && end < 12) {
    end += 24;
    start += 24;
  } else if (end < start) {
    end += 24;
  }

  var total = end - start;
  hours.total = total;

  /* Normal hours always <= 8 */
  var normal = Math.min(18 - start, 8);
  if (normal > total) normal = total;
  if (normal > 0) hours.normal = normal;

  /* Before overtime starts, all non-normal time must be evening time */
  if (hours.normal < 8) {
    hours.evening = Math.min(hours.total - hours.normal, 8 - hours.normal);
  }

  /* Overtime before 18 is daytime overtime, the rest of it is evening overtime*/
  if (total > 8) {
    var totalOvertime = total - 8;
    var daytimeOvertime = Math.min(18 - start - 8, totalOvertime);
    if (daytimeOvertime > 0) hours.overtime = daytimeOvertime;
    hours.eveningOvertime = totalOvertime - hours.overtime;
  }
  return hours;
}

export function calcSalary(hours) {
  var salary = { total: 0,
		 normal: hours.total * SALARY_BASE,
		 evening: 0,
		 overtime: 0
	       };
  /* evening overtime is just overtime for salary purposes */
  var overtime = hours.overtime + hours.eveningOvertime;

  if (overtime > 0) {
    if (overtime > 4) {
      salary.overtime += (overtime - 4) * SALARY_BASE * TIER3_MULTIPLIER;
    }
    if (overtime > 2) {
      salary.overtime += Math.min(overtime - 2, 2) * SALARY_BASE * TIER2_MULTIPLIER;
    }
    if (overtime > 0) {
      salary.overtime += Math.min(overtime, 2) * SALARY_BASE * TIER1_MULTIPLIER;
    }
  }
  if (hours.evening > 0) {
    salary.evening += hours.evening * SALARY_EVENING;
  }

  salary.total = salary.normal + salary.evening + salary.overtime;

  /* Round everything to 2 decimals */
  salary.total = Math.round(salary.total * 100) / 100;
  salary.normal = Math.round(salary.normal * 100) / 100;
  salary.evening = Math.round(salary.evening * 100) / 100;
  salary.overtime = Math.round(salary.overtime * 100) / 100;

  return salary;
}

/*Parse float in order to do math on hours */

export function timeToFloat(timeString) {
  var parts = timeString.split(':');
  var timeFloat = parseInt(parts[0]) + (parseInt(parts[1]) / 60)
  return timeFloat;
}
