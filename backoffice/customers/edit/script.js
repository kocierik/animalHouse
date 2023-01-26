var games = []
//https://stackoverflow.com/questions/19491336/how-to-get-url-parameter-using-jquery-or-plain-javascript
var getUrlParameter = function getUrlParameter(sParam) {
  var sPageURL = window.location.search.substring(1),
    sURLVariables = sPageURL.split('&'),
    sParameterName,
    i

  for (i = 0; i < sURLVariables.length; i++) {
    sParameterName = sURLVariables[i].split('=')

    if (sParameterName[0] === sParam) {
      return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1])
    }
  }
  return false
}

$(document).ready(function () {
  var id = getUrlParameter('id')
  if (id) {
    retrieveUser(id)
    retrieveScores(id)
  } else {
    window.location.href = '../'
  }
})

function showImage() {
  var file = $('#grid-image').prop('files')[0]
  var reader = new FileReader()
  reader.readAsDataURL(file)
  reader.onload = function () {
    $('#imgplaceholder').attr('src', String(reader.result))
  }
  reader.onerror = function (error) {
    console.log('Error: ', error)
  }
}

function resetPassword() {
  var newPwd = Math.random().toString(36).slice(2, 12)

  fetch('/api/v2/users/' + getUrlParameter('id'), {
    method: 'PATCH',
    headers: {
      authorization: localStorage.bo_token,
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*'
    },
    body: JSON.stringify({
      password: newPwd
    })
  })
  swal(getUrlParameter('id') + "'s new password is: " + newPwd)
}

//fills games' scores
function retrieveScores(id){
  fetch("/api/v2/community/games/").then((res)=>res.json()).then(async (el)=>{
    games = await el
  })



  fetch('/api/v2/users/' + id + '/scores/', {
    method: 'GET',
    headers: {
      authorization: localStorage.bo_token
    }
  })
  .then((response) => response.json())
  .then((el) => {
    console.log(el)
    if(el == undefined || el.length == 0 || el.mex != undefined) {
      $('#games-place-list').append(`
      <div class="p-2 py-8 border-b border-solid border-gray-300">
          <div class="pl-4 flex flex-wrap flex-row items-center">
              <div class="mr-4 h-16 w-96 block flex flex-row items-center text-gray-700">This user hasn't played any games, yet</div>
          </div>
      </div>`)
      return
    }
    el.forEach(g => {
      gameName = games.find(a => a._id == g.gameId).name
      $('#games-place-list').append([{ gameName: gameName, score: g.value }].map(GameItem))
    });
  })
}

//fills user data
async function retrieveUser(id) {
  var url = '/api/v2/users/' + id
  fetch(url, {
    headers: {
      authorization: localStorage.bo_token
    }
  })
    .then((response) => response.json())
    .then((el) => {
      console.log(el)
      $('#grid-firstName').val(el.firstName)
      $('#grid-lastName').val(el.lastName)
      $('#grid-category').val(el.categoryId)
      $('#grid-description').val(el.description)
      $('#grid-email').val(el.email)
      $('#grid-username').val(el.username)
      $('#animals-place-username').html(el.username)
      $('#games-place-username').html(el.username)
      if (el.address) {
        $('#grid-street').val(el.address.street)
        $('#grid-city').val(el.address.city)
        $('#grid-zip').val(el.address.zip)
        $('#grid-country').val(el.address.country)
      }
      if (el.animals.length == 0) $('#animals-place-section').hide()
      el.animals.forEach((a) => {
        $('#animals-place-list').append(
          [
            {
              picture: a.picture ? '/pictures/' + a.picture.filename : '/backoffice/favicon.ico',
              name: a.name,
              age: a.age,
              uid: el._id,
              aid: a._id,
              type: a.type
            }
          ].map(AnimalItem)
        )
      })
      let img = el.profilePicture
      $('#imgplaceholder').attr('src', img ? '/pictures/' + img.filename : '/backoffice/favicon.ico')
    })
}

$('#send').click(function () {
  //EDIT USER
  fetch('/api/v2/users/' + getUrlParameter('id'), {
    method: 'PATCH',
    headers: {
      authorization: localStorage.bo_token,
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*'
    },
    body: JSON.stringify({
      firstName: $('#grid-firstName').val(),
      lastName: $('#grid-lastName').val(),
      username: $('#grid-username').val(),
      description: $('#grid-description').val(),
      email: $('#grid-email').val(),
      street: $('#grid-street').val(),
      city: $('#grid-city').val(),
      zip: $('#grid-zip').val(),
      country: $('#grid-country').val()
    })
  })
  //EDIT IMAGE
  let img = $('#grid-image').prop('files')[0]
  if (img) {
    var send = new FormData()
    send.append('profile', img)
    fetch('/api/v2/users/' + getUrlParameter('id') + '/picture', {
      method: 'PUT',
      headers: {
        'Access-Control-Origin': '*',
        authorization: localStorage.bo_token
      },
      body: send
    })
  }
})

///users/:uid/animals/:aid
function animalRemove(name, uid, aid) {
  if (confirm('Are you sure you want to remove ' + name + ' | ' + aid + '?')) {
    fetch('/api/v2/users/' + uid + '/animals/' + aid, {
      method: 'DELETE',
      headers: {
        authorization: localStorage.bo_token
      }
    })
    window.location.href = window.location.href
  }
}

//GameItem template
const GameItem = ({ gameName, score }) => `
<div>
    <div class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${gameName}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">with ${score} points</div>
        </div>
    </div>
</div>
`

//Animalitem template
const AnimalItem = ({ name, age, picture, aid, uid, type }) => `
<div>
    <div class="p-2 py-8 border-b border-solid border-gray-300">
        <div class="pl-4 flex flex-wrap flex-row items-center">
            <div class="mr-4 h-16 w-8 block flex flex-row items-center text-gray-700">            
                <button type="button" onclick='animalRemove("${name}","${uid}","${aid}")'><i class="bi bi-trash"></i></button>
            </div>
            <div class="mr-4 h-16 w-16 block flex flex-row items-center">
                <img class="rounded-lg" src="${picture}" onerror="this.onerror=null; this.src='/backoffice/favicon.ico' alt="${name}\'s picture"></div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${name}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${age} years old</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${type}</div>
            <div class="mr-4 h-16 w-48 block flex flex-row items-center text-gray-700">${aid}</div>
        </div>
    </div>
</div>
`
