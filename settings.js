let Moment = require('moment');

module.exports = function () {
    var callTheTotal = 0;
    var smsTheTotal = 0;
    var callAmount = 0;
    var smsAmount = 0;
    var warnLevel = 0;
    var critLevel = 0;
    var theTotal = 0;

    let billList = [];

    function calculateBill (billItemSet) {
        var newDates = Moment(new Date()).fromNow();
        let bill = {
            'type': billItemSet,
            'date': newDates
        };

        if (billItemSet === 'call') {
            callTheTotal += callAmount;
            bill.cost = callAmount;
        } else if (billItemSet === 'sms') {
            smsTheTotal += smsAmount;
            bill.cost = smsAmount;
        }
        theTotal = callTheTotal + smsTheTotal;
        billList.push(bill);
    }

    function updateAmountwarnLvl (value) {
        warnLevel = parseFloat(value);
        return warnLevel;
    }

    function updateAmountcritLvl (value) {
        critLevel = parseFloat(value);
        return critLevel;
    }

    function updateCallValue (value) {
        callAmount = parseFloat(value);
        return callAmount.toFixed(2);
    }

    function returnCallTotal () {
        return callTheTotal.toFixed(2);
    }

    function updateSmsValue (value) {
        smsAmount = parseFloat(value);
        return smsAmount.toFixed(2);
    }

    function returnSmsTotal () {
        return smsTheTotal.toFixed(2);
    }
    function colorChanger () {
        if (theTotal !== 0) {
            if (theTotal >= critLevel) {
                return 'danger';
            }
            if (theTotal >= warnLevel) {
                return 'warning';
            }
        }
    }
    function totalReturn () {
        let diff = theTotal - critLevel;
        theTotal = callTheTotal + smsTheTotal;
        if (theTotal > critLevel) {
            theTotal -= diff;
        }
        return theTotal.toFixed(2);
    }

    function filterRecords (type) {
        return billList.filter(record => record.type === type);
    }

    function returnValues () {
        return {
            callTheTotal: returnCallTotal,
            smsTheTotal: returnSmsTotal,
            callAmount,
            smsAmount,
            warnLevel,
            critLevel,
            theTotal
        };
    }

    return {
        calculate: calculateBill,
        callTotal: returnCallTotal,
        smsTotal: returnSmsTotal,
        total: totalReturn,
        updateCall: updateCallValue,
        updateSms: updateSmsValue,
        warning: updateAmountwarnLvl,
        critical: updateAmountcritLvl,
        color: colorChanger,
        returnValues,
        billList,
        filterRecords
    };
};
