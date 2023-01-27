//      https://gionkunz.github.io/chartist-js/getting-started.html
// Create a new line chart object where as first parameter we pass in a selector
// that is resolving to our chart container element. The Second parameter
// is the actual data object. As a third parameter we pass in our custom options.
var dates = []
var salesByDates = []
getSales()


function getLastNDates(n){
  var dates = []
  for (let i = n-1; i >= 0; i--) {
    var d = new Date()
    d.setDate(d.getDate()-i)
    dates.push(d)
  }
  return dates
}

function getSalesByDates(dates,sales){
  var ret = []
  dates.forEach(d => {
    var s = sales.filter(e=>(e.executionDate.getFullYear()==d.getFullYear() && e.executionDate.getMonth()==d.getMonth() && e.executionDate.getDate()==d.getDate()))
    if(s == undefined) ret.push([])
    else ret.push(s)
  });
  return ret
}

async function getSales(){
  var url = "/api/v2/orders/";
  await fetch(url, {
      headers: {
          'authorization': localStorage.bo_token
      }
  }).then((response) => response.json()).then(async (data) => {
      document.getElementById("sales_place").innerHTML = data.length
      orders = await data
      orders.forEach(el => {
        el.executionDate = new Date(el.executionDate)   //converting executionDate from "ddd MM DD YYYY" to Date
      });
      dates = getLastNDates(7)
      salesByDates = getSalesByDates(dates,orders)
      drawSalesByDatesGraph(dates, salesByDates)
      drawIncomeByDatesGraph(dates, salesByDates)
  });
}

function drawSalesByDatesGraph(dates, salesByDates){
  var d = []
  dates.forEach(el => {
    d.push(el.getDate()+"/"+(el.getMonth()+1))
  });
  var c = []
  salesByDates.forEach(el => {
    c.push(el.length)
  })
  new Chartist.Line(
    '#chart1',
    {
      // A labels array that can contain any sort of values
      labels: d,
      // Our series array that contains series objects or in this case series data arrays
      series: [c]
    },
    {
      showArea: true,
      showLine: true,
      showPoint: true,
      lineSmooth: true,
      low: 0,
      onlyInteger: true
    }
  )
}

function drawIncomeByDatesGraph(dates, salesByDates){
  var d = []
  dates.forEach(el => {
    d.push(el.getDate()+"/"+(el.getMonth()+1))
  });
  var c = []
  console.log(salesByDates)
  salesByDates.forEach(i => {
    var total = 0

    i.forEach(el => {
      el.cartItems?.forEach(item => {
        total+=item.price
      });
    });
    
    c.push(total)
  })
  new Chartist.Line(
    '#chart2',
    {
      labels: d,
      series: [c]
    },
    {
      showArea: true,
      showLine: true,
      showPoint: true,
      lineSmooth: true,
      low: 0
    }
  )
}