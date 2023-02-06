var orders = []
var products = []
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
    await fetch("/api/v2/products/").then((res)=>res.json()).then(async (data)=>{
        products = await data
    })
    var url = "/api/v2/orders/";
    await fetch(url, {
        headers: {
            'authorization': localStorage.bo_token
        }
    }).then((response) => response.json()).then(async (data) => {
        document.getElementById("sales_place").innerHTML = data.length
        orders = await data
        showRevenue()
        showLastInvoices()
        showSalesByProduct(products,orders)
    });
}

function showSalesByProduct(products,sales){
    var ret = []
    console.log("products")
    console.log(products)
    console.log("sales")
    console.log(sales)
    products.forEach((p)=>{
        p.revenue = 0
        
    })
    sales.forEach((s)=>{
        s.cartItems.forEach((item)=>{
            index = products.findIndex(el=>(el._id == item.productId))
            products[index].revenue += item.price
        })
    })  
    var prods = products.sort(function(a, b) {
    return b.revenue - a.revenue;
    })
    console.log(prods) 
    var n=5
    for(var i=0; i<n && i<prods.length; i++){
        if(prods[i].revenue == 0){
            n++
        }
        else{
            $("#profitableproducts_place").append([{name: prods[i].name, total: prods[i].revenue, img: "/pictures/"+prods[i].image?.filename}].map(ItemRevenue))
        }
    }  
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

async function showLastInvoices(){
    var ord = orders.reverse()
    $("#lastinvoices_place").text("")
    for(var i=0; i<5 && i<ord.length; i++){
        var total = 0
        ord[i].cartItems?.forEach(el => {
            total+=el.price
        });
        var pic = '/backoffice/favicon.ico'
        var username = ''
        var date = `${ord[i].executionDate.getDate()}/${ord[i].executionDate.getMonth()+1}/${ord[i].executionDate.getFullYear()}`
        await fetch(`/api/v2/users/${ord[i].userId}`,{
            authorization: localStorage.bo_token
        }).then((res)=>res.json()).then((data)=>{
            if (data.profilePicture) pic = '/pictures/' + data.profilePicture.filename
            username = data.username
        })
        $("#lastinvoices_place").append([{username: username, total: total, img: pic, date: date}].map(ItemInvoice))

    }
}

const ItemInvoice = ({ username, total, img, date }) => `
<tr>
    <td class="p-2 py-4 border-b border-solid border-gray-300">
    <div class="pl-4 flex flex-wrap flex-row items-center">
        <div class="mr-4 h-16 w-16 block flex flex-row items-center">
            <img class="rounded-lg" src="${img}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico'" alt="${username}\'s picture">
        </div>
        <div class="text-gray-700 w-48">${username}</div>
        <div class="text-gray-700 w-32">${date}</div>
    </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">${total}$
    </td>
</tr>
`
const ItemRevenue = ({ name, total, img }) => `
<tr>
    <td class="p-2 py-4 border-b border-solid border-gray-300">
    <div class="pl-4 flex flex-wrap flex-row items-center">
        <div class="mr-4 h-16 w-16 block flex flex-row items-center">
            <img class="rounded-lg" src="${img}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico' alt="${name}\'s picture">
        </div>
        <div class="text-gray-700 w-48">${name}</div>
    </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">${total}$
    </td>
</tr>
`