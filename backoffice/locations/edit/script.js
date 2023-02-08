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

initMap('map', [])
lat = ''
lon = ''
getLocationDetails()

function getLocationDetails() {
  //GET REQUEST
  fetch('/api/v2/locations/' + getUrlParameter('id'), {
    headers: {
      authorization: localStorage.bo_token
    }
  })
    .then((response) => response.json())
    .then((el) => {
      $('#grid-name').val(el.name),
        $('#grid-street').val(el.address.street),
        $('#grid-city').val(el.address.city),
        $('#grid-zip').val(el.address.zip),
        $('#grid-country').val(el.address.country)
      var coords = []
      lat = el.latitude
      lon = el.longitude
      coords.push({ lon: lon, lat: lat })
      addMarkers(map, coords)
    })
}

$('#send').click(async function () {
  //PATCH REQUEST
  if (lat == '' || lon == '') {
    swal('Error','Please, click on the map to set location coordinates','error')
    return
  }
  if (
    $('#grid-name').val() == '' ||
    $('#grid-street').val() == '' ||
    $('#grid-city').val() == '' ||
    $('#grid-zip').val() == '' ||
    $('#grid-country').val() == ''
  ) {
    swal('Error','Please, fill all the required fields','error')
    return
  }
  //SEND USER
  var dataRes = await fetch('/api/v2/locations/' + getUrlParameter('id'), {
    method: 'PATCH',
    headers: {
      authorization: localStorage.bo_token,
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*'
    },
    body: JSON.stringify({
      name: $('#grid-name').val(),
      longitude: lon,
      latitude: lat,
      street: $('#grid-street').val(),
      city: $('#grid-city').val(),
      zip: $('#grid-zip').val(),
      country: $('#grid-country').val()
    })
  })
  var data = await dataRes.json()
  

  if (data.mex != undefined) {
    swal(data.mex)
  }else{
    swal("Success!","Location edited","success")
  }
})

// MAP RELATED FUNCTIONS
function initMap(target, coords) {
  map = new OpenLayers.Map(target)
  map.addLayer(new OpenLayers.Layer.OSM())

  var center = new OpenLayers.LonLat(11.3426163, 44.494887).transform(
    new OpenLayers.Projection('EPSG:4326'),
    map.getProjectionObject()
  )

  var zoom = 8

  map.setCenter(center, zoom)

  addMarkers(map, coords)
}
function addMarkers(map, coords) {
  var markers = new OpenLayers.Layer.Markers('Markers')
  var icon = new OpenLayers.Icon(
    'https://icons.iconarchive.com/icons/paomedia/small-n-flat/32/map-marker-icon.png',
    new OpenLayers.Size(25, 25),
    new OpenLayers.Pixel(-(25 / 2), -25)
  )

  map.addLayer(markers)
  var locations = new Array()
  coords.forEach((c) => {
    locations.push(
      new OpenLayers.LonLat(c.lon, c.lat).transform(new OpenLayers.Projection('EPSG:4326'), map.getProjectionObject())
    )
  })

  locations.forEach((loc) => {
    markers.addMarker(new OpenLayers.Marker(loc, icon.clone()))
  })

  map.events.register('click', map, function (e) {
    var lonlat = map
      .getLonLatFromViewPortPx(e.xy)
      .transform(new OpenLayers.Projection('EPSG:900913'), new OpenLayers.Projection('EPSG:4326'))
    lon = lonlat.lon
    lat = lonlat.lat
    var loc = new OpenLayers.LonLat(lon, lat).transform(
      new OpenLayers.Projection('EPSG:4326'),
      map.getProjectionObject()
    )
    markers.clearMarkers()
    markers.addMarker(new OpenLayers.Marker(loc, icon.clone()))
    
  })
}
