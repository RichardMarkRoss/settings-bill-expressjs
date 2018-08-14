let assert = require('assert');
let tester = require('../settings');

const settings = tester();

describe('test to store the amounts that are passed in', function () {
    it('should test the sms amount when passed in', function () {
        assert.equal(12, settings.updateSms(12));
    });

    it('should test the call amount when passed in', function () {
        assert.equal(12, settings.updateCall(12));
    });
});

describe('test the if the string values hold the amount', function () {
    it('call should hold the amount of 12', function () {
        settings.calculate('call');
        settings.updateCall(12);
        assert.equal(12, settings.callTotal());
    });
    it('sms should hold the amount of 12', function () {
        settings.calculate('sms');
        settings.updateSms(12);
        assert.equal(12, settings.smsTotal());
    });
});
