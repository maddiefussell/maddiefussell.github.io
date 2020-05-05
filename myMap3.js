/* global L */
var map = L.map('myMapID').setView([29.957444, -90.062935], 8)
var floatLayer = L.layerGroup().addTo(map)
var grayBaseMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}').addTo(map)
var url = 'https://opendata.arcgis.com/datasets/b67df6ad71d14811acb2a185bcb1d819_0.geojson' // mardi gras routes 2019
var streetsBaseMap = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}').addTo(map)
var baseMap = {
  'Streets': streetsBaseMap,
  'Gray canvas': grayBaseMap
}
jQuery.getJSON(url, function (data) {
  L.geoJSON(data).addTo(map)
  var styleFunction = function (feature) {
    var floatSize = feature.properties.NumFloats
    var route = feature.properties.ROUTE
    var colorString = 'green' // let the initial color be a darker green

    if (floatSize > 30) { colorString = 'purple' }
    return {
      opacity: 1,
      color: colorString,
      weight: 3,
      fillOpacity: 0.5

    }
  }

  var geoJSON = {
    style: styleFunction,
    onEachFeature: onEachFeatureFunction
  }
  L.geoJSON(data, geoJSON).addTo(map)
})
var onEachFeatureFunction = function (feature, layer) {
  var route = feature.properties.ROUTE
  var paradeName = feature.properties.MG_ROUTE
  var floatSize = feature.properties.NumFloats
  layer.bindPopup('Parade: ' + paradeName + ' Float Size: ' + floatSize)

  floatLayer.addLayer(layer)
}
var layersObject = {
  'Mardi Gras Float Sizes': floatLayer
}
L.control.layers(baseMap, layers).addTo(map)
