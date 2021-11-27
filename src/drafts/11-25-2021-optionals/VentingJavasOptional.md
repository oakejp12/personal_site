---
path: '/blog/11/25/2021/venting-java-optional'
date: 2021-11-25
title: 'Venting about Java's Optional'
tags: ['optional', 'java', 'programming languages']
---

After reading Matt's [tip for academic blogging](https://matt.might.net/articles/how-to-blog-as-an-academic/), I decided to hop on tip 4, _Vented steam as post_, and focus my concerns around the design of Java's Optional type and the capacity for misuse from junior/inexperienced Java engineers. A quick Google search for `Optional` misuse will render countless results. What many of these articles miss is an illustration of the common bad practices, so as a visual learner myself, I wanted to show in code what happens when you give a baby a knife. These are all examples I've seen used in production and introduced in merge requests by fairly intelligent CS graduates:

### 1. Null-checking

```java
if (Optional.ofNullable(arg).isPresent()) {
  // do the thing...
}
```

Somehow, we've made null-checking even worse. Stick to the original, it's safe, people know what you're talking about, and it's shorter code to type:

```java
if (arg != null) {
  // do the thing
}
```

### 2. Arguments

```java
private static String helpfulMethod(Optional<MyClass> arg) {
  // do the thing
}
```

Don't force users to wrap everything in an `Optional`! Perform proper validations against your input, like null-checking, and you should be alright. If not, you're forcing users to write bad code like this, and note, I've seen this code is in production:

```java
MyClass.moreHelpfulMethod(Optional.of(val1), Optional.of(val2), Optional.of(val0));
```

### 3. Method Chaining

```java
Optional.ofNullable(val).orElse(() -> new Value()).ifPresent(MyClass::set);
```

### 4. Returning Null

```java
public Optional<MyClass> extremelyHelpfulMethod(String arg) {
  //...do the thing

  return null;
}
```

Let's hope no one decides to chain to that method.

### 5. If Present. Get.

```java
if (myOptional.isPresent()) {

}
```

This one is a little bit trickier, and I always see it in production and in merge requests, but I don't tend to get as tufted. Logically, it makes sense; you're doing the due diligence to check if your value is present, and if so, you retrieve it.
