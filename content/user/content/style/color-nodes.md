
If all your nodes or edges have the same color, it is difficult to 
distinguish differences between them without looking at their individual 
properties. 
A great way to circumvent that issue is to choose to color the nodes 
according to a certain property.

For example, our nodes may have a `country` property that we would like 
to highlight, thus {{lke}} enables us to color the nodes 
according to a particular property, here `country`.

This way, a French and a German start-up will have different colors. 
It will be easier to distinguish them visually.

In the picture below, we see that the start-up Twitter is connected to 
many investors. 
At first glance we have no idea where those investors are coming from.

![](SinColor.png)

First of all, let's open the design panel on the right corner of the 
screen and hit the `Design` tab. We can see all node properties. 
We click on the `color` button along the property `country` to color 
nodes by this property.

![](Colors.png)

We see:

* The different values associated with the `country` property (CAN, GBR, 
  JPN, RUS, USA);
* The number of occurrences of each value there is (there are 20 nodes 
  with the value `USA`);
* Which color is associated to which value (`USA` is green)

Notice that the nodes that do not have a `country` property remain in
grey.

To color the nodes according to another property, we first unset colors 
by clicking on the same `color` button:

![](Unset.png)

Then, we can click on the `color` button of another property.
