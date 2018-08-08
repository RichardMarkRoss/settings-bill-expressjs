module.exports = function settingBill(){

    var callTheTotal = 0;
    var smsTheTotal = 0;
    var callAmount = 0;
    var smsAmount = 0;
    var warnLevel = 0;
    var critLevel = 0;
  
    function calculateBill(billItemSet){
  
      if (billItemSet === "call"){
          callTheTotal += callAmount;
       }else if (billItemSet === "sms"){
           smsTheTotal += smsAmount;
    }
  }
  function updateAmountwarnLvl(value){
    warnLevel = parseFloat(value);
    return warnLevel;
  }
  function updateAmountcritLvl(value){
    critLevel = parseFloat(value);
    return critLevel;
  }
  
  function updateCallValue(value){
    callAmount = parseFloat(value);
    return callAmount;
      }
  
  function returnCallTotal(){
      return callTheTotal.toFixed(2);
      }
  
  
  function updateSmsValue(value){
          smsAmount = parseFloat(value);
          return smsAmount;
      }
  function returnSmsTotal(){
    return smsTheTotal.toFixed(2);
  }
  
  function totalReturn(){
  var theTotal = callTheTotal + smsTheTotal;
  if (theTotal >= warnLevel){
      totalSetting.classList.add("warning");
    }
  if (theTotal >= critLevel){
      totalSetting.classList.add("danger");
      buttonAdd.disabled = true;
    };
    return theTotal.toFixed(2);
  }
  return{
    calculate: calculateBill,
    callTotal: returnCallTotal,
    smsTotal: returnSmsTotal,
    total: totalReturn,
    updateCall: updateCallValue,
    updateSms: updateSmsValue,
    warning: updateAmountwarnLvl,
    critical: updateAmountcritLvl
  };
  }