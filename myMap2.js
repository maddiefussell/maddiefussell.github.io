/* global L */
var Map = L.map('myMapID').setView([29.957444, -90.062935], 8)

L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(Map)
var marker = L.marker([29.5, -90.08]).addTo(Map)
var polygon = L.polygon([
  [29.95743, -90.06292],
  [29.957444, -90.08320],
  [29.957844, -90.07320],
  [29.95229, -90.0628]
]).addTo(Map)
marker.bindPopup('oh my, what an interesting area we have here')
polygon.bindPopup('Nawlins')
