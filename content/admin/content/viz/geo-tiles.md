
Linkurious supports displaying nodes with geographic coordinates (latitude and longitude) on a map.

Users are able to switch a visualization to *geo mode* when geographic coordinates 
are available on at least one nodes of the visualization.
The map tiles layer used in geo mode can be customized by users.

By default, Linkurious comes pre-configured with several geographical tile layers.
Administrators change the available geographical tile layers by editing the `leaflet` section in the configuration file ({{config}}).
The `leaflet` key is an array of geographical tile layer configurations.
Each entry has the following attributes:

- `name` (*required*, string): Name of the geo tiles layer.
- `urlTemplate` (*required*, url): Tile URL template with `{x}`, `{y}` and `{z}` parameters (`{s}` is optional).
- `minZoom` (*required*, number): The minimum zoom level supported by the layer.
- `maxZoom` (*required*, number): The maximum zoom level supported by the layer.
- `thumbnail` (*required*, url): URL of a 128x60 image to be used as a thumbnail for the layers (for user-added layers, the URL is relative to the `linkurious/data/customFiles` folder).
- `attribution` (*required*, string): The layer copyright attribution in HTML format.
- `subdomains` (string): Letters to use in the `{s}` tile URL template (required if `urlTemplate` contains `{s}` ).
- `overlay` (boolean): Whether this layer is a base layer (`false`) or a transparent layer that can be used as an overlay (`true`).
- `id` (string): Unique tiles layers identifier (MapBox only).
- `accessToken` (string): Tiles layer access-token (MapBox only).

Geographical tile layers and overlay layers can be found at https://leaflet-extras.github.io/leaflet-providers/preview/.

Example configuration:
```json
"leaflet": [
  {
    "overlay": true,
    "name": "Stamen Toner Lines",
    "thumbnail": "",
    "urlTemplate": "http://stamen-tiles-{s}.a.ssl.fastly.net/toner-lines/{z}/{x}/{y}.png",
    "attribution": "Map tiles by <a href="http://stamen.com">Stamen Design</a>, <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a> &mdash; Map data &copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>",
    "subdomains": "abcd",
    "id": null,
    "accessToken": null,
    "minZoom": 2,
    "maxZoom": 20
  },
  {
    "name": "MapBox Streets",
    "thumbnail": "/assets/img/MapBox_Streets.png",
    "urlTemplate": "https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}",
    "attribution": "Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a>, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy <a href="http://mapbox.com">Mapbox</a>",
    "subdomains": null,
    "id": "mapbox.streets",
    "accessToken": "pk.eyJ1Ijoic2hleW1hbm4iLCJhIjoiY2lqNGZmanhpMDAxaHc4bTNhZGFrcHZleiJ9.VliJNQs7QBK5e5ZmYl9RTw",
    "minZoom": 2,
    "maxZoom": 20
  }
]
```
