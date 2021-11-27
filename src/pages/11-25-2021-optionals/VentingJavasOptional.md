---
path: '/blog/11/26/2021/java-optional-venting'
date: 2021-11-26
title: Venting - Java's Optional
tags: ['optional', 'programming languages', 'java']
---

After reading Matt's [tip for academic blogging](https://matt.might.net/articles/how-to-blog-as-an-academic/), I decided to hop on tip 4, _Vented steam as post_, and focus my concerns around the design of Java's _Optional_ type and the capacity for misuse from junior/inexperienced Java engineers. A quick Google search for _Optional_ misuse will render countless results. What many of these articles miss is an illustration of the common bad practices, so as a visual learner myself, I wanted to show in code what happens when you give a baby a knife. These are all examples I've seen used in production and introduced in merge requests by fairly intelligent CS graduates:

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

Don't force users to wrap everything in an _Optional_! The Java language authors have been quite frank that _Optional_ was intended for use strictly as a return type, to convey that a method may or may not return a value. Instead, perform proper validations against your input, like null-checking. If not, you're forcing users to write bad code like below:

```java
MyClass.moreHelpfulMethod(Optional.of(val0), Optional.of(val1), Optional.of(val2));
```

or worse...

```java
MyClass.moreHelpfulMethod(Optional.ofNullable(val0), Optional.ofNullable(val1), Optional.ofNullable(val2));
```

As the author of said function, using _Optional_ arguments forces you to check against three cases: [null, non-null-without-value, and non-null-with-value](https://rules.sonarsource.com/java/RSPEC-3553), instead of two: null or a valid value.

### 3. Method Chaining

```java
Optional.ofNullable(val).orElse(() -> new Value()).ifPresent(myClassInstance::setValue);
```

Again, stick to the fundamentals:

```java
if (val == null) {
  val = new Value(); // Or throw an exception/error
}
myClassInstance.setValue(val);
```

I'm not going to start posting memory graphs on here, but resources claim that wrapping references in _Optional_ will incur a 4x memory and GC overhead.

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
  var myValue = myOptional.get();
}
```

This one is a little bit trickier, and I always see it in production and in merge requests, but I don't tend to get as tufted. Logically, it makes sense; you're doing the due diligence to check if your value is present, and if so, you retrieve it. Instead, understand your domain, and decide when it is best to [return a default value](https://www.youtube.com/watch?v=29MAL8pJImQ) or throw an exception:

```java
var val = extremelyHelpfulMethod(arg).orElseThrow(() -> new FieldNotFound());
```

### Conclusion

Avoid these bad practices, and if you want a great talk on how to use Java's _Optional_ properly, watch [Stuart Mark's presentation](https://www.youtube.com/watch?v=Ej0sss6cq14).
