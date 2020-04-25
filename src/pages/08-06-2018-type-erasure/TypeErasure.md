---
path: '/blog/08/06/2018/type-erasure'
date: 2018-08-06T17:12:33.962Z
title: 'Type Erasure in Java'
tags: ['java']
---

Type erasure in Java is a concept that has always eluded me.
I will read a StackOverflow answer on the topic, and I'll be more lost than Chuck Noland.

I decided to research the issue deeper when I stumbled upon an IDE warning in IntelliJ: _Unchecked assignment: 'java.lang.Class' to 'java.lang.Class\<T\>'_, and this will usually happen when I do something like this, for example:

```java
List<String> userNames = new ArrayList();
```

WELL, DUH! I could have used the diamond operator on `new ArrayList` and invoked Java's _type inference_, like so:

```java
List<String> userNames = new ArrayList<>();
```

But for now, I can't. I explain at the bottom. So deal with it.

The above solution will allow the compiler to infer the type arguments from the surrounding context (i.e. the `List<String>` in this example). The reason the IDE throws out a warning is due to a runtime check cast, so let's examine the problem a little further.

Without using Generics, we're instantiating an empty _ArrayList_ of *Object*s. Therefore, at runtime, there's the possibility that we may query our non-typed ArrayList, and cast the return value to something other than a _String_ object or, as an example, cast an _Integer_ to a _String_. There's no way of finding out that _\<T\> = String_ for the _ArrayList_ object.

This possbility occurs due to _type erasure_.

### So, what exactly is type erasure?

From [Baeldung](https://www.baeldung.com/java-type-erasure), "type erasure can be explained as the process of enforcing type constraints only at compile time and discarding the element type information at runtime."

At compile-time, the compiler has full type information availiable, but the compiler will intentionally drop the information when the byte code is generated. Usually, the Java compiler will replace all type parameters with _Object_, unless the type parameter is bounded. The produced byte code contains only ordinary classes, interfaces, and methods.

Thus, due to type erasure, our list will be compiled into:

```java
List userNames = new ArrayList();
```

Beforehand, the IDE throws the warning, since at runtime, the compiler has dropped the type information, and there's no way of ensuring type safety. The compiler has to enfore type casts to preserve type safety. The compiler will transform our non-Generic list, when added to and queried from, into:

```java
List userNames = new ArrayList();
userNames.add("xxxSuperCoolXboxPlayerxxx");
String mySuperCoolUserName = (String) userNames.get(0);
```

If the _ArrayList_ happens to hold something other than a _String_, a _ClassCastException_ would occur. For example:

```java
List myList = new ArrayList();
myList.add("My list will be the best list!");
myList.add(1);

Object myFavString = (String) myList.get(1);
```

---

You can read more here:

- [Baeldung](https://www.baeldung.com/java-type-erasure)
- [Type Erasure](https://docs.oracle.com/javase/tutorial/java/generics/erasure.html)
- [Avoiding Unchecked Assignment](https://stackoverflow.com/questions/22467645/avoid-unchecked-assignment-in-a-map-with-multiple-value-types/22468599)
- [Java Generics](https://stackoverflow.com/questions/339699/java-generics-type-erasure-when-and-what-happens)

**If I'm still confused, please contact me so I can fix my reasoning!**

---

Disclaimer:

The issue is caused due to a slippery monster dubbed Beanshell. I don't think it's website has been updated since 2005. To take you back, _The Chronicles of Narnia: The Lion, the Witch and the Wardrobe_ was the popular film. In short, Beanshell is a scripting language for Java often used inside XML. Well, the parser has a hard time detecting and translating the diamond operator so Beanshell scripts will usually throw an exception as seen below:

```java
... ParseException: Encountered > at line....
```
