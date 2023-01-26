$(document).ready(function () {})

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

$('#send').click(async function () {
  //SEND USER
  var dataRes = await fetch('/api/v2/users/register', {
    method: 'POST',
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
      password: $('#grid-password').val(),
      street: $('#grid-street').val(),
      city: $('#grid-city').val(),
      zip: $('#grid-zip').val(),
      country: $('#grid-country').val()
    })
  })
  var data = await dataRes.json()
  console.log(data)

  if (data.mex != undefined) {
    swal(data.mex)
  }

  //SEND IMAGE
  let img = $('#grid-image').prop('files')[0]
  if (img && data._id != undefined) {
    var send = new FormData()
    send.append('profile', img)
    dataRes = await fetch('/api/v2/users/' + data._id + '/picture', {
      method: 'PUT',
      headers: {
        'Access-Control-Origin': '*',
        authorization: localStorage.bo_token
      },
      body: send
    })
    data = await dataRes.json()

    console.log(data)
  } else if (data._id != undefined) {
    window.location.href = '../'
  }
})
