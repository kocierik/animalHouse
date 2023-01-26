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
        showLastInvoices()
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

function showLastInvoices(){
    var ord = orders.reverse()
    $("#lastinvoices_place").text("")
    for(var i=0; i<5 && i<ord.length; i++){
        var total = 0
        ord[i].cartItems.forEach(el => {
            total+=el.price
        });
        var date = `${ord[i].executionDate.getDate()}-${ord[i].executionDate.getMonth()+1}-${ord[i].executionDate.getFullYear()}`
        fetch(`/api/v2/users/${ord[i].userId}`,{
            authorization: localStorage.bo_token
        }).then((res)=>res.json()).then((data)=>{
            var pic = '/backoffice/favicon.ico'
            if (data.profilePicture) pic = '/pictures/' + data.profilePicture.filename
            $("#lastinvoices_place").append([{username: data.username, total: total, img: pic, date: date}].map(ItemInvoice))
        })
    }
}

const ItemInvoice = ({ username, total, img, date }) => `
<tr>
    <td class="p-2 py-4 border-b border-solid border-gray-300">
    <div class="pl-4 flex flex-wrap flex-row items-center">
        <div class="mr-4 h-16 w-16 block flex flex-row items-center">
            <img class="rounded-lg" src="${img}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico' alt="${username}\'s picture">
        </div>
        <div class="text-gray-700 w-48">${username}</div>
        <div class="text-gray-700 w-32">${date}</div>
    </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">${total}$
    </td>
</tr>
`