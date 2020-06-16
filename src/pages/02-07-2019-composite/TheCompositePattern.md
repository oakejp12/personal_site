---
path: '/blog/02/07/2019/composite-pattern'
date: 2019-02-07T17:12:33.962Z
title: 'Composing the Composite Pattern'
tags: ['design patterns']
---


This is Part 2 of a series concerning Design Patterns.

In case you missed the previous articles in this series, you can find them over here:
- Part 1: [Acting in Proxy](https://johanoakes.com/blog/10/16/2018/proxy)

---

I first encountered the Composite pattern when learning about new design patterns in Coursera's [Design Patterns](https://www.coursera.org/learn/design-patterns/home/welcome) course, often confusing the pattern with the Decorator pattern. The Decorator pattern and the Composite pattern share common characteristics, and it is often hard not to confuse the two from each other with little background on what both patterns aim to achieve. It doesn't help that the two patterns complement each other in that using the Composite pattern leads to also using the Decorator pattern. Needless to say, I didn't pay much attention to both patterns bar from taking notes and praying that some of it sticks around when I'm developing.

However, I fell into a rabbit-hole the other day, and started exploring the issue of data locality and how memory accesses affect CPU performance and processing. Of the many openeds tabs choking the resources on my struggling laptop, the blog that stuck around was Bob Nystrom's [Data Locality](http://gameprogrammingpatterns.com/data-locality.html). Without veering off into another tangent, in short, Nystrom reviewed the issue of cache access by scrutinizing the grouping of related _components_ contiguously. These components included the _PhyscisComponent_, the _RenderComponent_, and the _AIComponent_; all seemingly having different intentions to contributing to the encompassing environment.

In an effort to both understand data locality and more design patterns, I've laid a brief overview of the Composite pattern below:

_Why would we use the Composite design pattern?_

I always like to address the _why_ first. If you've read this far along, I'm impressed. You've come this far without a clear explanation of intent. If you haven't inferred the purpose of the Composite design pattern, or ventured into the rabbit-hole of Nystrom's clearer explanations, the Composite design pattern serves to address a couple issues outlined below:

1. How do we treat individual types of objects uniformly without checking types?
2. How do we use individual types of objects to build a hierarchical structure?

Ideally, we'd want to define an _interface_ so that _Composite_ and _Leaf_ classes could be treated in the same manner without worrying or checking with which object type we were modifying. Clients wouldn't need to differentiate the difference between a _Composite_ object and a _Leaf_ object. Additionally, an interface would allow us to extend a _Composite_ node with other _Composite_ nodes and _Leaf_ nodes from which all nodes would conform to a set of shared behaviors. This recursive extension would lend to hierarchical structures. For example, a _Neighborhood_ could represent the root _Composite_ object, a _House_ composite object could branch off from the _Neighborhood_ node and a _Room_ could act as a _Leaf_ node.

As evident, the components in Nystrom's game had different responsibilities, but they were grouped together as to function as a single unit and so the environment could interact with the components in a uniform manner. This structure provided key benefits such as simplifying the client and abstracting the interaction with different components and provided the ability to add new kinds of components to the environment.

Nystrom's structure provides a brief description of the intent of the Composite design pattern, and in a similar manner, I'll show how the Composite pattern fulfills the goals outlined below:

1. Interact with the classes for these objects in a uniform manner
2. Compose nested structures of objects

Composing nested structures of objects can be thought as composing tree structures in an effort to simulate a hierarchy of the objects from which the structure is built. For a small review (for the steadfast computer science nerd not driving themselves crazy from studying data structures), tree structures are built from the composition of _nodes_and \_leaves_, where the nodes will lead to other nodes and leaves, and leaves cannot be extended. Identifying _Composite_ as the nodes in the tree structure, an example nested structure is shown below:

![Composite Tree Structure](https://github.com/oakejp12/Graphics/blob/master/Composite/TreeStructureExample.png?raw=true)

A real world example is shown below in order to transform the _Composite_ tree structure to a more real world use case and to show case the polymorphic structure:

![Composite Real World Structure](https://github.com/oakejp12/Graphics/blob/master/Composite/CompositeRealWorldStructure.png?raw=true)

Once the goals and the intended structure of the Composite design pattern is well understood, the development follows. As made evident in the real world use case, shown above, in order to build components on top of each other, a root interface must be built to define the recursive structure and hierarchy of _Composite_ nodes and to specify the common set of behaviors among nodes.

Thus, to clearly outline those steps for development:

1. Design the interface that defines the overall type.
2. Implement the composite classes
3. Implement the leaf classes.
4. Rinse and repeat steps 2 and 3 as necessary.

---

You can learn more here:

- [The Composite Pattern](http://www.buyya.com/254/Patterns/Composite-2pp.pdf)
- [Design Pattern Course Notes](https://www.coursera.org/learn/design-patterns/supplement/oVl9k/design-patterns-course-notes)
- [Data Locality - Bob Nystrom](http://gameprogrammingpatterns.com/data-locality.html)
