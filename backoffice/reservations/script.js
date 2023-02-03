
var users = []
var reservations = []
var locations = []
var services = []

async function getUsers(){
  await fetch("/api/v2/users/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    users = await data
    console.log(data)
  })
}
async function getReservations(){
  await fetch("/api/v2/reservations/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    reservations = await data
    console.log(data)
  })
}
async function getLocations(){
  await fetch("/api/v2/locations/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    locations = await data
    console.log(data)
  })
}
async function getServices(){
  await fetch("/api/v2/services/",{
    headers:{
      authorization: localStorage.bo_token
    }
  }).then((res) => res.json()).then(async(data)=>{
    services = await data
    console.log(data)
  })
}
function reservationRemove(id) {
  if (confirm('Are you sure you want to remove this reservation?')) {
    fetch('/api/v2/reservations/' + id, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.bo_token
      }
    })
    window.location.reload()
  }
}

async function fillDashboard(){
  $("#orderList").text("")
  reservations.forEach(async r => {
    console.log(r)
    var u = users.find((x) => x._id == r.userId)
    var l = locations.find((x)=>x._id == r.locationId)
    l.name != undefined ? l=`${l.name}, ${l.address.city}` : ""
    var a = ""

    await fetch("/api/v2/animals/"+r.animalId,{
      headers:{
        authorization: localStorage.bo_token
      }
    }).then((res)=>res.json()).then(async (data)=>{
      a = await data
      console.log(data)
    })
    var s = services.find((x)=> x._id == r.serviceId)
    s.title != undefined ? s=s.title : ""

    var pic = ""
    var addr = ""
  
    pic = '/backoffice/favicon.ico'
    if (a.picture) pic = '/pictures/' + a.picture.filename
    if (u.address != undefined) {
      u.address.street != ' ' ? (addr += u.address.street + ', ') : ''
      u.address.city != ' ' ? (addr += u.address.city + ', ') : ''
      u.address.zip != ' ' ? (addr += u.address.zip + ', ') : ''
      u.address.country != ' ' ? (addr += u.address.country) : ''
    }
    a.name != undefined ? a=a.name : ""
    u.username != undefined ? u=u.username : ""
    d = new Date(r.date)
    date = `${d.getDate()}/${d.getMonth()+1}/${d.getFullYear()} ${d.getHours()}:${d.getMinutes()}:${d.getSeconds()}`

    $("#reservationList").append([{username: u,id: r._id, animal: a, location: l, service: s, info:r.information, date:date, picture: pic}].map(Reservation))
  });
}

//item template
const Reservation = ({ username, id, animal, location, service, picture, info, date }) => `
<tr>
    <td class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-16 block flex flex-row items-center">
                <img class="rounded-lg" src="${picture}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico'" alt="${username}\'s picture"></div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${animal}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${username}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${location}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${service}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${date}</div>
            <div class="mr-4 h-16 w-96 block flex flex-row items-center text-gray-700">${info}</div>
        </div>

    </td>
    <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
        <button onclick='reservationRemove("${id}")'><i class="bi bi-trash text-red-600"></i></button>
    </td>
</tr>
`

$(document).ready(async function () {
  await getUsers()
  await getReservations()
  await getLocations()
  await getServices()
  fillDashboard()
})
