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
describe('test the store the warning and critical values', function () {
    it('should test the critical levels', function () {
        assert.equal(10, settings.critical(10));
    });
    it('should test the warning levels', function () {
        assert.equal(10, settings.warning(10));
    });
});
describe('should return the total on the amount of calls and sms', function () {
    it('should calculate two call', function () {
        settings.updateCall(3);
        settings.updateSms(0);
        settings.calculate('call');
        settings.calculate('call');
        assert.equal('10.00', settings.total());
    });
    it('should calculate two sms', function () {
        settings.updateCall(0);
        settings.updateSms(3);
        settings.calculate('sms');
        settings.calculate('sms');
        assert.equal('10.00', settings.total());
    });
    it('should calculate one sms and one call', function () {
        settings.updateCall(3);
        settings.updateSms(3);
        settings.calculate('call');
        settings.calculate('sms');
        assert.equal('10.00', settings.total());
    });
});
