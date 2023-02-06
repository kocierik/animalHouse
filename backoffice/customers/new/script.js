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
  var r1 = await fetch('/api/v2/users/register', {
    method: 'POST',
    headers: {
      authorization: localStorage.bo_token,
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*'
    },
    body: JSON.stringify({
      firstName: $('#grid-firstName').val(),
      lastName: $('#grid-lastName').val(),
      username: $('#grid-username').val().replace("@",""),
      description: $('#grid-description').val(),
      email: $('#grid-email').val(),
      password: $('#grid-password').val(),
      street: $('#grid-street').val(),
      city: $('#grid-city').val(),
      zip: $('#grid-zip').val(),
      country: $('#grid-country').val()
    })
  })
  if(r1.ok){
    var data = await r1.json()
    //SEND IMAGE
    let img = $('#grid-image').prop('files')[0]
    if (img && data._id != undefined) {
      var send = new FormData()
      send.append('profile', img)
      var r2 = await fetch('/api/v2/users/' + data._id + '/picture', {
        method: 'PUT',
        headers: {
          'Access-Control-Origin': '*',
          authorization: localStorage.bo_token
        },
        body: send
      })
      if (!r2.ok) {
        await swal("Error",`Error uploading customer image: ${(await r2.json()).mex}`,"error")
        return
      }
    }
    await swal("Success!","Customer created successfully","success")
    return
  }else{
    await swal("Error",`Error sending customer details: ${(await r1.json()).mex}`,"error")
    return
  }

  
})
