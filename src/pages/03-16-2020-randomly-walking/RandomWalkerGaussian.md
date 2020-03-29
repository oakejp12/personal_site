---
path: '/blog/12/04/2019/randomly-walking-normally'
date: 2019-12-04T17:12:33.962Z
title: 'Randomly Walking, Normally'
---

To celebrate the glorious third day of Advent, after playing hooky the second day (_ssshhh_), I wanted to tackle Nature of Code's assignment on [Gaussian distribution](https://en.m.wikipedia.org/wiki/Normal_distribution):

> A Gaussian random walk is defined as one in which the step size (how far the object moves in a given direction) is generated with a normal distribution. Implement this variation of our random walk.

For context, we're given a _Walker_ with two behaviors: 1) stepping to a new location, and 2) displaying. Displaying is the easy part; our _Walker_ will be a pixel on a screen as shown in Processing below:

```java
void display() {
    applet.stroke(0); // Sets the color used to draw lines and borders around shapes
    applet.point(x, y); // Draws a point, a coordinate in space at the dimension of one pixel
}
```

As for _stepping to a new location_, that's where we're given the freedom to decide how our _Walker_ acts. Our _Walker_ may meander drunkenly from side-to-side, taking short little steps to preserve some balance in its life. Or, our _Walker_ can leap forward, taking large steps like New York's most recent citizen injected with fresh hope of making it big only to crawl back to it's starting point.

Since this assignment concerns more for controlling the size of the step, our _Walker_ may meander to one side. To bastardize Gaussian distribution in our context, our _Walker_ will try to step by a given point (_mean_), but it may deviate from that point by some margin (_standard deviation_). In the algorithm below, I try to control the meandering by normalizing the mean; this should help the _Walker_ not veer off completely once it has chosen a side. For instance, if we increase our mean to 3, our _Walker_ will try, most of the time, walking 3 units in length to a side, quickly veering off the canvas.

```java
void step() {
    double choiceX = random.nextGaussian();
    double choiceY = random.nextGaussian();
    double std = 1.5;
    int mean = 1;
    x += 1 - ((int) (std * choiceX) + mean);
    y += 1 - ((int) (std * choiceY) + mean);
}
```

To let our _Walker_ wander around, forward, back, side-to-side, I tweaked the standard deviation, `std`. High deviations may mean really large steps or really small steps. Smaller deviations will stick towards the supplied mean where the _Walker_ may not move at all due to our controlled _mean_, `mean`.

I've supplied a couple examples below of the _Walker_ doing it's thing:

![Standard Deviation of 1.5](https://github.com/oakejp12/Graphics/blob/master/NatureOfCode/GaussianWalker1.5.PNG?raw=true)

![Standard Deviation of 3](https://github.com/oakejp12/Graphics/blob/master/NatureOfCode/GaussianWalker3.PNG?raw=true)

One thing that becomes evident is that the canvas with a standard deviation of 1.5 seems darker. That's due to the Processing engine redrawing our _Walker_ at smaller steps (_i.e._ smaller steps means pixels are more clustered together)
