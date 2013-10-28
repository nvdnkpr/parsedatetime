var TIMESPACE_REGEX = /^(?:(in) )?(?:(\d+) ?week(?:s)?)? ?(?:(\d+) ?day(?:s)?)? ?(?:(\d+) ?hour(?:s)?)? ?(?:(\d+) ?min(?:ute)?(?:s)?)? ?(?:(\d+) ?sec(:?ond)?(?:s)?)? ?(ago)?$/i;

var parseTimespan = function(str) {
  var match = str.trim().match(TIMESPACE_REGEX);
  if (match) {
    var result = match.slice(2, 7).map(function(v) {
      return parseInt(v || 0);
    });

//    console.log(match);
//    console.log(result);

    // need in or ago
    if (match[1] !== "in" && match[match.length - 1] !== "ago") {
      return null;
    }

    if (match[match.length - 1] === "ago") {
      result = result.map(function(r) {
        return -r;
      });
    }

    var date = Date.now();
    date += result[0] * 7 * 24 * 60 * 60 * 1000;
    date += result[1] * 24 * 60 * 60 * 1000;
    date += result[2] * 60 * 60 * 1000;
    date += result[3] * 60 * 1000;
    date += result[4] * 1000;
    return new Date(date);
  }

  return null;
};

var LITERAL_REGEX = /^at (?:(\d+)\:)?(?:(\d+)\:)?(?:(\d+)\:)?(\d+)?$/i;

var parseLiteralDate = function(str) {
  var match = str.trim().match(LITERAL_REGEX);
  if (match) {
    var result = match.slice(1, 5).map(function(v) {
      if (v === undefined) {
        return v;
      }

      return parseInt(v || 0);
    }).filter(function(v) {
      return v !== undefined;
    });

//    console.log(match);
//    console.log(result);

    var date = new Date();
    if (result.length === 1) { // assuming hour:00:00
      date.setHours(result[0]);
      date.setMinutes(0);
      date.setSeconds(0);
    } else if (result.length === 2) { // assuming hour:minute:00
      date.setHours(result[0]);
      date.setMinutes(result[1]);
      date.setSeconds(0);
    } else if (result.length === 3) { // assuming hour:minute:second
      date.setHours(result[0]);
      date.setMinutes(result[1]);
      date.setSeconds(result[2]);
    } else { // assuming day:hour:minute:second
      date.setDate(result[0]);
      date.setHours(result[1]);
      date.setMinutes(result[2]);
      date.setSeconds(result[3]);
    }

    return date;
  }

  return null;
};

var parseDateTime = function(str) {
  var d1 = parseTimespan(str);
  if (d1) { return d1; }

  var d2 = parseLiteralDate(str);
  if (d2) { return d2; }

  var d3 = parseLiteralDate("at " + str);
  if (d3) { return d3; }

  var d4 = parseTimespan("in " + str);
  if (d4) { return d4; }

  var d5 = Date.parse(str);
  if (d5 !== NaN) { return new Date(d5); }

  return null;
};

module.exports = parseDateTime;
