# Parse Date Time

A way of parsing human readable dates and timespans in Javascript.

## Usage

	var parseDateTime = require("parsedatetime");

	var date = parseDateTime("in 10 minutes");
	if (date) {
		console.log("Got it:", date);
	} else {
		console.log("That's not a date!");
	}

## Inputs and Responses

	in 20 minutes

20 minutes later than the current date.

	at 10:00

10:00:00 at the current day.

	at 20

20:00:00 at the current day.

	at 01:09:00:00

09:00:00 on the 1st of the current month.

	in 1 hour 10 seconds

1 hour and 10 seconds later than the current date.

## Mistakes

The parser aims to be pretty strict while also accepting "odd" inputs. Sometimes
it will 
