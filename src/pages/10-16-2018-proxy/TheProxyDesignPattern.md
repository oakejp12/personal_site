---
path: '/blog/10/16/2018/proxy'
date: 2018-10-16T17:12:33.962Z
title: 'Acting in Proxy'
---

This is [Part 1]() of a series concerning Design Patterns.

For the past month, I've been researching design patterns, and I promised myself that I would do more than scribbling down notes only to later shuffle them under my desk for 2022 me to find them...in disappointment. In the meantime, I've been trying to think of every clever way to present a more senior topic. Should I try to find examples of these design patterns throughout Github and present them through expertly written code? Probably so, but for the respect of time, I've saved that idea for later so I can flush out my first dissection of design patterns. For now, I'll present my findings in a clearer format so that I may represent the ideas scribbled down in my notes and link them to actual code.

The _Proxy design pattern_ is a very aptly named _structural_ design pattern since the pattern allows for the creation of an object to act as an _authoritative_ source or as a representation of another, perhaps more critical, object. Proxying is clearly evident outside of computing, for instance, in voting, I may delegate someone to act as my proxy so that I may vote in absence. This proxy voter performs the same tasks as I would, but they act in representation of myself so that I don't have to show up and turn in the vote myself. In networking, [proxy servers](https://en.wikipedia.org/wiki/Proxy_server) act as intermediaries for requests from clients seeking resources from other servers. In day to day developing, responsible software engineers have, without a doubt, mocked objects for unit testing. These mocked objects act in proxy to separate resource intensive operations (API requests, database changes, etc.) from the unit tests. Likewise, the proxy design pattern allows a class to represent a real subject class by acting as a wrapper around the real subject class in order to lighten the load, provide security, etc.

But.....why? Why create another class when the original subject class performs the same exact functionality? There could be a multitude of reasons, but we'll focus on some common scenarios - being able to protect critical, sensitive information, act in place of a resource-intensive object, or represent an object that may exist remotely from a client's request.

For protection of sensitive information, a proxy class could provide authentication and/or authorization to help secure access to the information. For resource-intensive applications, the proxy can act as a lightweight representation of the real subject class and only delegate the resource-intensive requests to the real subject class when necessary. For remotely-existing objects, a proxy class can be more easily instantiated to the local machine to avoid heavy, external requests.

As mentioned before, a proxy class wraps the real subject class meaning that there must exist a reference to an instance of the real subject class hidden in the proxy class, as shown below:

```java
public class DatabaseProxy {
    // The real subject class: a private connection to a database instance
    private JDBConnection jdbc;

    /* Other member variables and methods... */
}
```

The reference must be hidden, available only to the proxy class, to prevent direct interaction from the client. The proxy class will act as the lightweight representation, performing the same tasks as the original object, but may use the hidden real subject class reference in order to delegate substantial requests to the original object. Thus, a client trying to access the real subject class would only interact with the proxy class. At first impression, this is made evident through the UML diagram below:

![Proxy Pattern Iteration 1](https://github.com/oakejp12/Graphics/blob/master/Proxy/ProxyPattern1.png?raw=true)

However, when discussing design patterns, it's a great idea to adhere to respectable habits such as [_programming to interfaces_](https://softwareengineering.stackexchange.com/questions/232359/understanding-programming-to-an-interface). Since the proxy design pattern ensures that the proxy class wrap the real subject class and act as a representation of the real subject class, then the proxy class must offer the same behavior as the the real subject class, but act as a lightweight substitution. When trying to classify common behaviors exhibited by non-related classes, _interfaces_ allow for polymorphism. Thus, we'll create an interface or implement the already created interface if we're proxying an existing subject class.

```java
public class DatabaseProxy implements IConnection  {
    // The real subject class: a private connection to a database instance
    private JDBConnection jdbc;

    /* Other member variables and methods... */
}
```

Since both `JDBConnection` and `DatabaseProxy` implement the `Connection` interface, the client can interact with the proxy class with the assurance that the proxy object will perform the same behavior as the real subject.

An updated and more generalized UML diagram of the proxy design pattern is given below, now incorporating interfaces:

![Proxy Pattern Iteration 2](https://github.com/oakejp12/Graphics/blob/master/Proxy/ProxyPattern2.png?raw=true)

So when designing in accordance to the proxy design pattern, we want to follow three basic steps:

1. Design the interface
2. Implement the real subject class
3. Implement the proxy class
