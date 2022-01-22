---
path: '/blog/12/21/2021/coordinating-gc-in-distributed-systems'
date: 2021-12-21
title: 'Coordinating Garbage Collection In Distributed Systems'
tags:
  ['garbage collection', 'java', 'programming languages', 'distributed systems']
---

- More in-depth: [Taurus: A Holistic Language Runtime System for
  Coordinating Distributed Managed-Language Applications](https://timharris.uk/papers/2016-asplos.pdf)
- TODO: Read https://blog.the-pans.com/notes-on-the-foundationdb-paper/ to see how they disected the FoundationDB paper

- Introduction
  - Introduce the main problems with GC and the need for low-latency code in Java and financial exchanges
  - Introduce the _Holisitc Runtime System_, aiming to solve GC-pauses on distributed systems
  - Avoid writing non-idiomatic Java code to achieve low-latency:
    - (e.g., large byte arrays to store data structures),
    - Writing critical parts of Java applications in C (with explicit memory management)
    - Treating old-generation GC as a failure mode and restarting the application

_Notes_

- Problem: GC-induced pauses can have a significant impact on workloads
  - e.g. "Stop-the-world" pauses
  - Data center applications written in high-level languages are typically deployed by running each process within its own, independent language runtime system - consequence of this approach is that each runtime system makes decisions independently, including over when to perform GC.
    - In practice, this means that GC pauses occur on different nodes at different times based on when memory fills up and needs to be collected. Depending on the collector and workload, these pauses can range from milliseconds to multiple seconds
  - In latency-critical applications, GC pauses can cause requests to take unacceptably long times, exacerbated in applications that are composed in hundreds of services
  - GC also poses a problem for applications that distribute live data across nodes, since pauses can make a node’s data unavailable.
- Solution: _Holistic Runtime System_: a distributed language runtime that collectively manages runtime services across multiple nodes
  - Effective in reducing the impact of GC pauses on a batch workload and improving GC-related tail-latencies in an interactive setting
  - Idea: coordinate GC pauses between different nodes, such that they occur at times that are convenient for the application
- Case Studies
  - Apache Spark: distributed computation framework for batch workloads, performing large-scale long-running computations on distributed data sets
  - Apache Cassandra: distributed key-value store
    - An _interactive workload_ where performance is measured by the latency of each query
    - Queries can be slowed down by _stragglers_ - requests that take longer than the 99th percentile
    - Many stragglers stem from:
      - a GC pause in the coordinator responsible for a request
      - GC pauses in nodes holding accessed replicas, making it impossible for the coordintor to assemble a quorum
- Strategies

  - Specific (i.e. address specific concerns)
    - Instead of nodes collecting independently once their memory fills up, we want all nodes to perform GC at the same time – this way, none of the nodes waste time waiting for another node to finish collecting
      - Addresses independent collection - if a single node is stuck in GC during such an operation, no other node can make progress, and therefore all nodes stall for a significant amount of time.
    - Stragglers due to stalled coordinators can be avoided by anticipating GCs (max 80% of the young generation) and redirecting requests to nodes that are not about to incur a GC pause.
    - Extend steering to periodic tasks
    - Ensure that only one node within each quorum is collecting at a time (for interactive workloads)
  - General

    - Holistic Runtime System

      - A language runtime system in which resource management policies span multiple nodes
      - Independent runtime decisions are replaced with a distributed system that allows the per-node runtimes to make globally coordinated consensus decisions
      - Developer should be able to choose from a set of prepared, configurable strategies, similar to how garbage collectors are configured today
      - _GC Policy_
      - _Communication_
        - Allow the _Holisitc GC_ framework to communicate with the application-level framework
          - Expose information about which nodes are about two perform GC, and handle maintance tasks such as anti-entropy
          - Apps can communicate how long it expects to be idle, so the Holisitc Runtime can make decisions to run an incremental GC pass
      - _Reconfiguration_
        - The system must be able to reconfigure itself to respond to application changes and needs (i.e. different application phases require different GS algorithms)
      - Implementation
        - Augment each per-node runtime with a management process that is logically part of the runtime system and connects to Hotspot VM through its management interface
        - The per-node runtimes automatically connect to each other and implement a consensus protocol that executes the GC Policy
        - For a user, all that needs to be implemented is a policy function that takes the states of all nodes and produces a plan

    - My Thoughts

      - How does this system fair with failure, replication, and common problems in distributed computing? (e.g. what if the leader/follower goes down? Can the implementation be extended to leaderless systems?)

---

# An overview of [Trash Day: Coordinating Garbage Collection in Distributed Systems](https://www.usenix.org/system/files/conference/hotos15/hotos15-paper-maas.pdf)

> In this paper, we show that distributed applications suffer from each node's language runtime system making GC-related decisions independently...We then propose solving this problem using a _Holistic Runtime System_, a distributed language runtime that collectively manages runtime services across multiple nodes.

One of the biggest arguments against Java in latency-sensitive environments is the language's need for garbage collection (GC). Especially in finance, there's a lot of contention with maximizing the developer experience, speeding up product development, and reducing potential bugs (..and exploits) by removing the need for manual memory management against minimizing the latency introduced by GC pauses. In fact, Cinnober, a Nasdaq-acquired provider for financial technology, remarked:

> Attracting high frequency traders is important for many markets, so the trading platform's ability to offer low and predictable latency is fundamental. As a result, latency...is a focus area for constant improvement in Cinnober's trading systems.

On top of JVM tuning, teams will roll out their own custom systems, or default to [3rd party solutions](https://www.azul.com/products/zing), to mitigate stop-the-world pauses (i.e. arbitrarily freezing the application to perform garbage collection). In [Trash Day: Coordinating Garbage Collection in Distributed Systems](https://www.usenix.org/system/files/conference/hotos15/hotos15-paper-maas.pdf), the authors present the _Holisitc Runtime System_, a configurable language runtime to coordinate decisions among multiple nodes in an effort to minimize application pauses and improve latency.

## GC in Distributed Applications: Case Studies

The authors present two case studies, Apache Spark and Apache Cassandra, to demonstrate the effect of independent runtime decisions on batch workloads and interactive workloads, respectively. In general, following the microservices architectural style, applications are typically broken into a suite of services based on their business function, each running its own process within its own independent language runtime system. These distributed systems are designed to meet scalability, reliability, and latency requirements, but since these services are independently deployable, "each runtime system makes decisions independently, including over when to perform GC."

Particularly, [Apache Spark](https://spark.apache.org/) suffers from synchronization between nodes in the presence of GC pauses:

> If even a single node is stuck in GC during such an operation, no other node can make progress, and therefore all nodes stall for a significant amount of time. Worse, once the stalled node finishes its GC, execution will continue and may quickly trigger a GC pause on a different node.

The strategy to solve the potential of these "cluster-wide barriers" is to have "all nodes perform GC at the same time - this way, none of the nodes waste time waiting for another node to finish collecting."

[Apache Cassandra](https://cassandra.apache.org/_/index.html), among other interactive applications, suffers from the latency of individual queries. If each node is operating independently when making a request (e.g. a simple HTTP GET call to retrieve market orders), the slowest service can be responsible for lagging latency metrics if the application architecture is composed of nodes deciding when to do GC as appropriate.

## Holistic GC: An Implementation

The authors provide several singular strategies to address GC in a distributed workload (e.g. staggering GCs across nodes), but this paper focuses on providing a general-purpose solution where "resource management policies span multiple nodes." The goal of

## My Thoughts

As distributed computing starts to be the norm for many businesses, creating an interface to manage independent nodes is paramount...
