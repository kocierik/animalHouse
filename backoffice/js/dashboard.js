var orders = []
main()

async function main(){
    getSales()
    showCustomersNumber()
    showLocationsNumber()
}


function showCustomersNumber(){
    var url = "/api/v2/users/";
    fetch(url, {
        headers: {
            'authorization': localStorage.bo_token
        }
    }).then((response) => response.json()).then((data) => {
        document.getElementById("customers_place").innerHTML = data.length
    });
}

function showLocationsNumber(){
    var url = "/api/v2/locations/";
    fetch(url, {
        headers: {
            'authorization': localStorage.bo_token
        }
    }).then((response) => response.json()).then((data) => {
        document.getElementById("locations_place").innerHTML = data.length
    });
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
        showRevenue()
    });
}

async function showRevenue(){
    var total = 0
    console.log(orders)
    orders.forEach(el => {
        el.executionDate = new Date(el.executionDate)   //converting executionDate from "ddd MM DD YYYY" to Date
        el.cartItems.forEach(i => {
            total+=i.price
        });
    });
    console.log(orders)
    document.getElementById("revenue_place").innerHTML = `${total}$`
}