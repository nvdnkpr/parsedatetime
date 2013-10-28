var assert = require("assert");
var parseDateTime = require("../");

describe("relative times", function() {
  it("should return the correct date when adding times", function() {
    assert.equal(1000, parseDateTime("in 1 second") - Date.now());
    assert.equal(2 * 1000, parseDateTime("in 2 seconds") - Date.now());
    assert.equal(60 * 1000, parseDateTime("in 1 minute") - Date.now());
    assert.equal(10 * 60 * 1000, parseDateTime("in 10 minutes") - Date.now());
    assert.equal(11 * 60 * 1000, parseDateTime("in 10 minutes 60 seconds") - Date.now());
    assert.equal(60 * 60 * 1000, parseDateTime("in 1 hour") - Date.now());
    assert.equal(90 * 60 * 1000, parseDateTime("in 1 hour 30 minutes") - Date.now());
    assert.equal(24 * 60 * 60 * 1000, parseDateTime("in 1 day") - Date.now());
    assert.equal(3 * 24 * 60 * 60 * 1000, parseDateTime("in 1 day 48 hours") - Date.now());
    assert.equal(7 * 24 * 60 * 60 * 1000, parseDateTime("in 1 week") - Date.now());
  });

  it("should return the correct date when subtracting times", function() {
    assert.equal(1000, Date.now() - parseDateTime("1 second ago"));
    assert.equal(2 * 1000, Date.now() - parseDateTime("2 seconds ago"));
    assert.equal(60 * 1000, Date.now() - parseDateTime("1 minute ago"));
    assert.equal(10 * 60 * 1000, Date.now() - parseDateTime("10 minutes ago"));
    assert.equal(11 * 60 * 1000, Date.now() - parseDateTime("10 minutes 60 seconds ago"));
    assert.equal(60 * 60 * 1000, Date.now() - parseDateTime("1 hour ago"));
    assert.equal(90 * 60 * 1000, Date.now() - parseDateTime("1 hour 30 minutes ago"));
    assert.equal(24 * 60 * 60 * 1000, Date.now() - parseDateTime("1 day ago"));
    assert.equal(3 * 24 * 60 * 60 * 1000, Date.now() - parseDateTime("1 day 48 hours ago"));
    assert.equal(7 * 24 * 60 * 60 * 1000, Date.now() - parseDateTime("1 week ago"));
  });
});

describe("absolute times", function() {
  it("should accept dates", function() {
    assert.equal(10, parseDateTime("at 10").getHours());
    assert.equal(0, parseDateTime("at 10").getSeconds());
    assert.equal(0, parseDateTime("at 10").getSeconds());
    assert.equal(18, parseDateTime("at 18:30").getHours());
    assert.equal(30, parseDateTime("at 18:30").getMinutes());
    assert.equal(0, parseDateTime("at 18:30").getSeconds());
    assert.equal(16, parseDateTime("at 16:50:22").getHours());
    assert.equal(50, parseDateTime("at 16:50:22").getMinutes());
    assert.equal(22, parseDateTime("at 16:50:22").getSeconds());
    assert.equal(22, parseDateTime("at 22:13:40:59").getDate());
    assert.equal(13, parseDateTime("at 22:13:40:59").getHours());
    assert.equal(40, parseDateTime("at 22:13:40:59").getMinutes());
    assert.equal(59, parseDateTime("at 22:13:40:59").getSeconds());
  });
});

describe("ambigous times", function() {
  it("should cope with ambigous times", function() {
    assert.equal(11 * 60 * 1000, parseDateTime("10 minutes 60 seconds") - Date.now());
    assert.equal(10, parseDateTime("10:00").getHours());
    assert.equal(20, parseDateTime("10:20").getMinutes());
    assert.equal(0, parseDateTime("10:20").getSeconds());
    assert.equal(7 * 24 * 60 * 60 * 1000, parseDateTime("1 week") - Date.now());
  });
});

describe("invalid times", function() {
  it("should refuse invalid times", function() {
    assert.ok(parseDateTime("yeah, this is a date"));
    assert.ok(parseDateTime("10 o'clock"));
    assert.ok(parseDateTime("10 past 5"));
    assert.ok(parseDateTime("10 minutes 5"));
  });
});
