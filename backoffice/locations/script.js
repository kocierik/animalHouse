fetchLocations()

function fetchLocations() {
  var url = '/api/v2/locations/'
  fetch(url, {
    headers: {
      authorization: localStorage.token
    }
  })
    .then((response) => response.json())
    .then((data) => {
      target = 'locationsList'
      document.getElementById('locationsList').innerHTML = ''

      let coords = []
      data.forEach(function (el) {
        console.log(el)
        var addr = `${el.address.street}, ${el.address.city}, ${el.address.zip}, ${el.address.country}`
        var c = { lon: el.longitude, lat: el.latitude }
        coords.push(c)
        document.getElementById('locationsList').innerHTML += [{ name: el.name, id: el._id, address: addr }].map(Item)
      })
      initMap('map', coords)
    })
}
//item template
const Item = ({ name, id, address }) => `
    <tr p-2 class="py-8 border-b border-solid border-gray-300">
        <td class="p-2 py-4 border-b border-solid border-gray-300">
            <div class="pl-4 flex flex-wrap flex-row items-center">
                <div class="mr-4 h-16 w-64 block flex flex-row items-center">${name}</div>
                <div class="mr-4 h-16 w-flex block flex flex-row items-center">${address}</div>
            </div>
        </td>
        <td class="text-right p-2 pr-4 border-b border-solid border-gray-300 text-gray-700">
            <a href="edit/?id=${id}"><i class="bi bi-pencil"></i></a>
            &nbsp;&nbsp;
            <button onclick='locationRemove("${name}","${id}")'><i class="bi bi-trash"></i></button>
        </td>
    </tr>
`

// MAP-RELATED FUNCTIONS
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
}
