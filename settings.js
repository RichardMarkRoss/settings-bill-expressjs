module.exports = function settingBill() {

  var callTheTotal = 0;
  var smsTheTotal = 0;
  var callAmount = 0;
  var smsAmount = 0;
  var warnLevel = 0;
  var critLevel = 0;
  var theTotal = 0;

  let billList = []

  function calculateBill(billItemSet) {

    var newDate = new Date()
    let bill = {
      type: billItemSet,
      date: newDate//moment.fromNow(newDate)
    };

    if (billItemSet === "call") {
      bill.cost = callAmount
      callTheTotal += callAmount;

    } else if (billItemSet === "sms") {
      bill.cost = smsAmount
      smsTheTotal += smsAmount;

    }
    theTotal = callTheTotal + smsTheTotal
    billList.push(bill)

  }

  function updateAmountwarnLvl(value) {
    warnLevel = parseFloat(value);
    return warnLevel;
  }

  function updateAmountcritLvl(value) {
    critLevel = parseFloat(value);
    return critLevel;
  }

  function updateCallValue(value) {
    callAmount = parseFloat(value);
    return callAmount;
  }

  function returnCallTotal() {
    return callTheTotal.toFixed(2);
  }


  function updateSmsValue(value) {
    smsAmount = parseFloat(value);
    return smsAmount;
  }

  function returnSmsTotal() {
    return smsTheTotal.toFixed(2);
  }

  function totalReturn() {
    let diff = theTotal - critLevel;
    theTotal = callTheTotal + smsTheTotal;
    if (theTotal > critLevel) {
      theTotal -= diff;
    }
    return theTotal.toFixed(2);
  }

  function colorChanger() {
    if (theTotal !== 0) {
      if (theTotal >= critLevel) {
        return "danger";
      }
      if (theTotal >= warnLevel) {
        return "warning";
      }
 
      return;
    }
  }

  // function billItemCalculate(value) {
  //   var newDate = new Date()
  //   let bill = {
  //     type: value,
  //     date: newDate//moment.fromNow(newDate)
  //   };

  //   if(costTotal > critLevel){

  //     return
  //   }
  // // if(!totalCalls > 0 && !totalSms > 0){
  //     if (value === "call") {
  //       totalCalls += callValue;
  //       bill.price = callValue.toFixed(2);

  //     } else if (value === "sms") {
  //       totalSms += smsValue;
  //       bill.price = smsValue.toFixed(2);
  //     //}
  //   }
  //   costTotal = totalCalls + totalSms;

  //   billList.push(bill)
  // }

  function filterRecords (type){
    return billList.filter(record => record.type === type)
  }

function returnValues(){

  return{
    callTheTotal,
    smsTheTotal,
    callAmount,
    smsAmount,
    warnLevel,
    critLevel,
    theTotal
  }

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
}