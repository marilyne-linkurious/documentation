
Nodes must contain geographic coordinates as properties.
Latitude and longitude data must be expressed in decimal degrees
(e.g. "38.8897,-77.0089") as available in many geographic information
systems (GIS).

The Administrator should configure which property is the
**latitude property**, and which property is the **longitude property**
of the nodes of the data-source.
Without configuration, {{lke}} will try to use properties called
"latitude" or "lat", and "longitude", "long" or "lng".

When geographic coordinates exist in a node of the visualization, we can
switch to the [**geo mode**](/geo-mode).
