var users = []
var orders = []
var products = []

async function getUsers(){
  await fetch("/api/v2/users/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    users = await data
  })
}
async function getProducts(){
  await fetch("/api/v2/products/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    products = await data
  })
}
async function getOrders(){
  await fetch("/api/v2/orders/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    orders = await data
  })
}

function invoiceRemove(id) {
  if (confirm('Are you sure you want to remove this invoice?')) {
    fetch('/api/v2/orders/' + id, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.bo_token
      } 
    })
    window.location.reload()
  }
}

function fillDashboard(){
  $("#orderList").text("")
  orders.forEach(o => {
    
      var total = 0
      
      var pic = ""
      var addr = ""
      o.cartItems?.forEach((el)=>{
        total += el.price
      })
      var u = users.find((x) => x._id == o.userId)
      
      var mail = u.email
      var user = u.username

      pic = '/backoffice/favicon.ico'
      if (u.profilePicture) pic = '/pictures/' + u.profilePicture.filename
      if (o.address != undefined) {
        o.address.street != ' ' ? (addr += o.address.street + ', ') : ''
        o.address.city != ' ' ? (addr += o.address.city + ', ') : ''
        o.address.zip != ' ' ? (addr += o.address.zip + ', ') : ''
        o.address.country != ' ' ? (addr += o.address.country) : ''
      }

      $("#orderList").append([{username: user,id: o._id,email: mail,address: addr,picture: pic, amount:total,date:o.executionDate}].map(Order))
  });
}

//item template
const Order = ({ username, id, email, address, date, picture, amount }) => `
<tr>
    <td class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-16 block flex flex-row items-center">
                <img class="rounded-lg" src="${picture}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico'" alt="${username}\'s picture"></div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${username}</div>
            <div class="mr-4 h-16 w-96 block flex flex-row items-center text-gray-700">${address}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${email}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${date}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${amount}$</div>

        </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
        <button onclick='invoiceRemove("${id}")'><i class="bi bi-trash text-red-600"></i></button>
    </td>
</tr>
`

$(document).ready(async function () {
  await getUsers()
  await getProducts()
  await getOrders()
  fillDashboard()
})
