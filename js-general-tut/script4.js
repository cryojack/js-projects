function checkCashRegister(price, cash, cid) {
  const lookup = {
    "ONE HUNDRED": 10000,
    "TWENTY": 2000,
    "TEN": 1000,
    "FIVE": 500,
    "ONE": 100,
    "QUARTER": 25,
    "DIME": 10,
    "NICKEL": 5,
    "PENNY": 1,
    }
  
  let changeDrawer = {status: '', change: []}
  let returnSum = Math.round(cash * 100) - Math.round(price * 100)
  let drawerSum = 0

  for(let currency of cid) {
    //const denom = currency[0]
    const value = Math.round(currency[1] * 100)
    drawerSum += value
  }

  if(returnSum > drawerSum) {
    changeDrawer.status = "INSUFFICIENT_FUNDS"
    changeDrawer.change = []
  }

  if(returnSum == drawerSum) {
    changeDrawer.status = "CLOSED"
    changeDrawer.change = []
  }

  if(returnSum < drawerSum) {
    changeDrawer.status = "OPEN"
    //Go through the cid array
    for(let i = cid.length - 1 ; i >= 0 ; i--) {
      const denom = cid[i][0]
      const value = Math.round(cid[i][1] * 100)
      const currency = lookup[denom]
      let amount = value / currency
      let changeToReturn = 0

      while(returnSum > currency && amount > 0) {
        console.log(returnSum,amount,changeToReturn)
        returnSum -= currency
        amount--
        changeToReturn++
      }

      if(changeToReturn > 0) {
        changeDrawer.change.push([denom,changeToReturn / 100])
      }

    }
  }
  //console.log(returnSum,drawerSum)
  console.log(changeDrawer)
  return changeDrawer
}

checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]])