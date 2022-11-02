function initMap(target, coords) {
    map = new OpenLayers.Map(target);
    map.addLayer(new OpenLayers.Layer.OSM());

    var center = new OpenLayers.LonLat(11.3426163, 44.494887)
        .transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()
        );

    var zoom = 8;

    map.setCenter(center, zoom);

    addMarkers(map, coords);


}
function addMarkers(map, coords) {
    var markers = new OpenLayers.Layer.Markers("Markers");
    map.addLayer(markers);
    var locations = new Array()
    coords.forEach(c => {
        locations.push(new OpenLayers.LonLat(c.lon, c.lat).transform(
            new OpenLayers.Projection("EPSG:4326"),
            map.getProjectionObject()))
    });

    locations.forEach(loc => {
        markers.addMarker(new OpenLayers.Marker(loc));
    });

}