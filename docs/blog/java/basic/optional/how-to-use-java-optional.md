---
title: Optional 사용하기
description: Optional 사용하기
date: 2019-06-30
sidebar: auto
---
## 1. Optional.ofNullable() / Optional.empty() / Optional.of()
Optional 객체 생성 메서드는 `Optional.ofNullable`, `Optional.empty`, `Optional.of` 3가지가 정적 팩토리 메서드가 있습니다.

어떤 입력으로 Optional 객체 생성이 필요할 때, 입력 값이 null 이 될 수 있을 경우를 고려한다면
이 3가지 중 어떤 메서드를 통해 Optional 생성을 해야할까요?

당연히 메서드 명에서 알 수 있듯이 `Optional.ofNullable` 을 사용하는 것이 맞을텐데요,
만약 의도치 않게 다른 메서드를 통해 Optional 객체를 생성하고 바로 메서드 체이닝을 사용하게 된다면 어떻게 되는지 알아보겠습니다.  
 
```java
String outputOfNullable = Optional.ofNullable(null)
    .map(s -> "foo")
    .orElse("bar");  // Result: "bar"

String outputOfEmpty = Optional.empty()
    .map(s -> "foo")
    .orElse("bar");  // Result: "bar"

String outputOfInput = Optional.of(null)
    .map(s -> "foo")
    .orElse("bar");  // RuntimeException
```

ofNullable() 메서드는 입력값이 null 일때는 empty() 메서드를 통해 생성한 Optional 을 반환하기 때문에
outputOfNullable 과 outputOfEmpty 의 결과 값("bar") 은 같습니다.
즉, 코드에서 표현한 메서드 체이닝이 생각대로 처리됩니다.

하지만 of() 메서드의 경우는 컴파일 에러는 나지 않지만 of() 메서드 실행 시 NPE 이 발생하면서 메서드 체이닝이 실행되지 않습니다.
이렇게 Optional 생성을 잘못 사용할 경우 기대한 결과 대신 RuntimeException 이 발생할 수 있으므로 주의하여 사용해야 합니다.

## 2. orElse(), orElseGet()
Optional 의 내부 객체 값이 비어있을 때 `orElse()` 또는 `orElseGet()` 를 사용하는데요,
이 두 메서드는 동작 방식에 차이가 있습니다. 

```java
Optional<Date> foo = Optional.empty();

Date bar1 = foo.orElse(new Date());
Date bar2 = foo.orElseGet(Date::new);
```
orElse() 메서드는 인스턴스 객체를 인자로 받기 때문에 foo 가 비어있는지 여부와 상관없이 항상 인스턴스 객체 생성이 필요합니다.

orElseGet() 메서드는 메서드 레퍼런스를 인자로 받고 있으며 foo 가 실제로 비어있을 때만 인스턴스 객체를 생성합니다.

즉, **Lazy 하게 사용하려면 orElseGet() 을 사용하는게 좋습니다.**