initMap('map',[]);
lat = ""
lon = ""


$('#send').click(async function () {
  if(lat == "" || lon == ""){
    alert("Please, click on the map to set location coordinates")
    return
  }
  if($('#grid-name').val()=="" || $('#grid-street').val()=="" || $('#grid-city').val()==""||$('#grid-zip').val()==""||$('#grid-country').val()==""){
    alert("Please, fill all the required fields")
    return
  }
  //SEND USER
  var dataRes = await fetch('/api/v2/locations/', {
    method: 'POST',
    headers: {
      authorization: localStorage.bo_token,
      'Content-Type': 'application/json',
      'Access-Control-Origin': '*'
    },
    body: JSON.stringify({
      name: $('#grid-name').val(),
      longitude: lon,
      latitude: lat,
      address:{
        street: $('#grid-street').val(),
        city: $('#grid-city').val(),
        zip: $('#grid-zip').val(),
        country: $('#grid-country').val()
      }
    })
  })
  var data = await dataRes.json()
  console.log(data)

  if (data.mex != undefined) {
    alert(data.mex)
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

  map.events.register("click", map, function(e) {
    var lonlat = map.getLonLatFromViewPortPx(e.xy).transform(new OpenLayers.Projection("EPSG:900913"), new OpenLayers.Projection("EPSG:4326"));
    lon = lonlat.lon;
    lat = lonlat.lat;
    var loc = new OpenLayers.LonLat(lon, lat).transform(new OpenLayers.Projection('EPSG:4326'), map.getProjectionObject())
    markers.clearMarkers()
    markers.addMarker(new OpenLayers.Marker(loc, icon.clone()))
    console.log("Latitude: " + lat + " Longitude: " + lon);
  });
}