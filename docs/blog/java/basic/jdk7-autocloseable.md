---
title: Java 7 - AutoCloseable 살펴보기
date: 2018-10-14
sidebar: auto
categories: [java]
tags: [java7]
---

<!--
<details><summary>summary ! </summary>
blah blah
<details>
-->

# {{ $page.title }}

Java 7 부터 java.lang 패키지에 AutoCloseable 이라는 인터페이스가 등장했다.
> [Oracle docs Java 7 AutoCloseable](https://docs.oracle.com/javase/7/docs/api/java/lang/AutoCloseable.html)

이 인터페이스에는 close 메서드 하나만 선언되어 있다.

## Method Summary
| Modifier and Type | Method | Description |
| :---: | --- | --- |
| void | close() | Closes this resource, relinquishing any underlying resources. |

## Method Detail
`void close() throws Exception`
- try-with-resources 문으로 관리되는 객체일 때 close() 메서드가 자동으로 호출된다.
리소스를 닫고 기본 리소스를 양도한다. 

- close 메서드 구현시 구체적인 exception 을 throw 하고,
close 동작이 전혀 실패할 리가 없을 때는 exception 을 던지지 않도록 구현하는 것을 강력히 권고한다.

- close 메서드에서 InterruptedException 을 던지지 않는 것을 강하게 권고한다.

InterruptedExeption 은 쓰레드의 인터럽트 상태와 상호작용 하므로
InterruptedException 이 억제되었을 때 런타임에서 잘못된 동작이 발생 할 수 있기 때문이다. 

::: tip Note
일반적으로, 예외가 억제되었을 때 문제를 야기시킨다면 그 예외를 던지지 않아야 한다.
:::

- 멱등성을 유지하는 것을 추천한다.

AutoCloseable.close() 메서드는 멱등성을 유지하는 것이 필수적이지는 않다. 
이 말인즉슨 AutoCloseable.close() 메서드를 최초 한 번 호출 이후 다시 호출 했을 때 side effect 가 발생할 수 있다는 것이다.

멱등성을 유지하는게 필수적인 사항은 아니지만 유지할 수 있도록 메서드를 구현하는 것을 추천한다.
  
(반면에 Closeable.close 메서드는 멱등성을 유지하는 것이 필수적이라 몇번을 호출하든 부작용(side effect)이 없다.)

::: tip Note
연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 `멱등성(idempotent)` 이라 한다.
:::

---

:thinking: 앞으로는 [Closeable 말고 AutoCloseable 을 구현해야하나? - 스택오버플로](https://stackoverflow.com/questions/13141302/implements-closeable-or-implements-autocloseable)

:bulb: 나온지 한참 되었지만, [java 7 에서 등장한 특징 다시보기](http://linuxism.tistory.com/934)

