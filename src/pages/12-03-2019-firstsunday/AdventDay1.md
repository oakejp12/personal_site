---
path: '/blog/12/03/2019/advent-day-1'
date: 2019-12-03T17:12:33.962Z
title: 'First Sunday of Advent'
---

Every year, in anticipation of Christmas, our church would commence the use an Advent calendar to countdown the days until the 25th of December. Apart from it's religious purpose, the Advent calendar would let me, a young boy, know when that special day would arrive. Now, instead of standing in rows of pews, confused, I want to mark those days with a piece of code, a show-and-tell, or a small discussion.

Originally, I wanted to complete and discuss Eric's [Advent of Code](https://adventofcode.com/). Despite always trying to learn something new and challenge myself, I decided to forgo this years competition for two reasons: 1) I was already doing months of puzzles in preparation for interviews and 2) I've been wanting to explore the area of generative art for a long time. I've been a long time lurker of [/r/generative](https://www.reddit.com/r/generative/), [/r/processing](https://www.reddit.com/r/processing/), and [Artnome](https://www.artnome.com/), and I've always wanted to contribute my own piece, no matter how small.

Througout the month I'll be going through Daniel Shiffman's [Nature of Code](https://natureofcode.com) with his [YouTube videos](https://www.youtube.com/watch?v=DfziDXHYoik). I'll try to post a daily update; hopefully, a new generative piece everyday explaining the logic behind the engineering decisions and what I've learned. This is my first _Advent of Code_ so I may not be able to fill everyday, but I'll try to keep honest.

To begin, I wanted to describe my development environment. Instead of using the recommended Processing IDE, I'll be using IntelliJ due to it's code complete features, debugging powers, and that I use it day-to-day for work. I know there's not a lot of resources for how to setup a Java environment for Processing, especially with IntelliJ, so I thought it'd be beneficial, for the first day, to show how I'd be able to work relatively fast.

Using IntelliJ, I created a new Maven project, using Java 11, with the following POM dependencies:

```xml
<dependencies>
    <dependency>
        <groupId>org.processing</groupId>
        <artifactId>core</artifactId>
        <version>3.3.7</version>
    </dependency>
</dependencies>
```

This allows me to call Processing functions, execute internal Processing code and have code-completion for Processing (_super helpful_).

As for the design of my programs, I usually have one drawer, the _main_ class that takes care of the Processing execution and other classes that aid in the design of the generative program.

For the main program, I have to extend `PApplet` like so:

```java
public class Playground extends PApplet {

    // ...other dependencies and methods

    public static void main(String... args) {
        PApplet.main(Playground.class);
    }
}

```

As for my other classes, I have to make sure to practice [dependency injection](https://en.wikipedia.org/wiki/Dependency_injection). I want my other necessary classes to be discoverable from _main_ and inherit Processing's functions:

```java
public class Walker {

    PApplet applet;

    Walker(PApplet applet) {
        this.applet = applet;
        // ... other dependencies
    }

    // ... other methods
}
```

Thus, I would only have to instantiate a _Walker_ object in _Playground_ with the _this_ object like so `...new Walker(this);` All that's left to do is run Playground's _main_ function.

And that's all it really takes to setting up a Processing environment for IntelliJ and Java. In other posts, I'll be displaying the new generative pieces, how those pieces came to life, and what design decisions came in to play for generating the new pieces.
