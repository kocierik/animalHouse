function ArrToCsv(arr) {
  return arr.join(', ')
}
function CsvToArr(csv) {
  return csv.replace(/\s/g, '').split(',')
}

function getAnimalCodes() {
  fetch('/api/v2/animals/codes')
    .then((response) => response.json())
    .then((el) => {
      el.forEach((e) => {
        $('#targets-list').append(`
                <span class="m-2">
                    <input type="checkbox" class="grid-targets" value="${e.code}"> ${e.value} 
                </span>
            `)
      })
    })
}
function getSelectedTargets() {
  arr = document.getElementsByClassName('grid-targets')
  var ret = new Array()
  for (let i = 0; i < arr.length; i++) {
    const a = arr[i]
    if (a.checked) ret.push(a.value)
  }
  return ret
}

$(document).ready(function () {
  getAnimalCodes()
})

$('#send').click(async function () {
  let img = $('#grid-image').prop('files')[0]
  if (img) {
    //create product
    const r1 = await fetch('/api/v2/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        authorization: localStorage.bo_token,
        'Access-Control-Origin': '*'
      },
      body: JSON.stringify({
        name: $('#grid-prod-name').val(),
        price: $('#grid-price').val(),
        categoryId: $('#grid-category').val(),
        description: $('#grid-description').val(),
        animalTargets: getSelectedTargets(),
        colors: CsvToArr($('#grid-colors').val()),
        sizes: CsvToArr($('#grid-sizes').val()),
        types: [],
        details: $('#grid-details').val()
      })
    })
    if(r1.ok){
      const data = await r1.json()

      //upload image
      var send = new FormData()
      send.append('product', img)
      const r2 = await fetch('/api/v2/products/' + data._id + '/pictures', {
        method: 'PUT',
        headers: {
          authorization: localStorage.bo_token,
          'Access-Control-Origin': '*'
        },
        body: send
      })
      if (!r2.ok) {
        await swal("Error",`Error uploading product image: ${(await r2.json()).mex}`,"error")
        return
      }
    }
    else {
      await swal("Error",`Error sending product details: ${(await r1.json()).mex}`,"error")
      return
    }
    await swal("Success!","Product created successfully","success")
    
  }else{
    swal("Error",`Please, upload a picture`,"error")
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
    
  }
}
