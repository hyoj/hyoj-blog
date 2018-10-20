---
title: 테스트 주도 개발 경험 공유 내용 정리
date: 2018-10-20
sidebar: auto
categories: [java]
tags: [TDD, test]
description: TDD 잘하는 방법, TDD 잘하기
---

# {{ $page.title }}

테스트 주도 개발(TDD, Test Driven Development)을 알고는 있지만 실천하는데 어려움을 겪고 있었다. <br />
어려움을 해소하기 위해 두리번 거리던 중 발견한 2015년 YouTube 동영상 [스프링캠프 2015: [B-4]: 테스트 주도 개발 경험 공유](https://www.youtube.com/watch?v=fPRzc_U_aoU)
을 흥미롭게 시청하고 나서 나중에 다시 상기하기 위해 그 내용을 정리한다. <br />

**Table of Contents**

[[toc]]
<br />

## 테스트 주도 개발을 하지 않는 이유
- 반복적인 테스트 코드 타이핑을 계속 해야 하는게 귀찮다.
- 무엇을 테스트 해야하는지 모른다.
- 읽기 어려운 테스트 코드
- 만들기 어렵고, 귀찮고, 의미없는 Fixture 가 존재한다.
- 점점 많아지는 Mock, 과 그 처리
- 처음엔 이 클래스는 어떻게 만들꺼고, 이거랑 저거랑 어떤 관계이고 하는 설계가 나온다.
하지만 기능 추가, 비즈니스 요소 추가 등을 하면서 설계랑 달라지는 부분이 생기고, 테스트 코드도 점점..멀리..

<br />

## 테스트 주도 개발을 잘 하는 방법
TDD 에 국한된 것이 아니고, 개발을 잘 하는 방법이기도 하다.
 
### IDE 단축키를 잘 외우자

#### Coding
- Code Assist
- Code Block UP/DOWN
- Line Copy
- Line Delete
- Search, File and Class
- Call hierarchy
- View Implements
- Go Implement
- Go Line

#### Refactoring
- Inline
- Extract Method
- Rename
- Move
- Parameter Signature Change
- Pull Up
- Magic Number 상수 만들기

### Code Assist 또는 Code Templates
Code Templates 란 테스트라는 이름으로 코드 블락을 미리 만들어 놓는 것이다.
코드 템플릿을 이용해서 테스트 코드를 빠르게 작성하자. 

### Library 를 잘 이용하자 
- Lombok
- fest-assert
- apache commons lang
- Lambdaj
- Google Guava
- hamcrest
- mockito
- Java 8 stream API

### 예외, 경계 그리고 정상
무엇을 테스트 해야 할 지 잘 모를 때 테스트 코드 작성을 하면 보통 정상적인 경우에 대한 테스트를 먼저 시작한다.
하지만 그 보다는 예외상황이나 경계값 테스트를 먼저하는 것이 좋다.

### 설계 보다 테스트: 역지사지
정상적인 테스트 코드를 작성할 때는 설계를 고려하는 것이 아니라, 사용자가 직관적으로 사용 가능한지를 기준으로 접근하자.

### Fixture 잘 만들기
테스트 코드 작성을 할 때 어디까지가 Fixture 고, 어디까지가 행위인지 한 눈에 들어오는 것이 좋다.
객체의 필드가 많으면 하나를 만들어 내는 코드만 해도 길다. 이런 부분을 줄이는 방법이 필요하다.

Fixture 잘 만드는 방법에 대해서 알아보자.
#### @Before 어노테이션 사용하기 
객체 생성 코드를 @Before 어노테이션이 붙은 setup 메서드에 작성한다.
테스트 코드와 Fixture 를 분리하는 효과가 있다.

#### 구조적 계층 드러내기
Fixture 를 더 짧은 라인으로 구현하는 것이 
인라인 방식으로 코드를 작성하면 객체간의 계층을 파악하는데 좋다.
또한 약간의 들여쓰기도 계층을 드러내는데 좋다.

Guava 의 new Array 도 계층 구조를 시각적으로 드러내는데 도움이 된다.

#### Magic Number 제거하기
의도를 드러내기 위해 상수를 정의해서 사용한다.

#### Builder 사용하기
DSL 같은 느낌으로 객체를 생성할 수 있으며, Fixture 구조 파악이 쉬워진다.

Builder 는 가독성 뿐만 아니라 `but` 을 활용 할 수 있는 것도 좋다.

`but` 은 미리 Fixture 를 만들어 놓고, 그 와 비슷한 객체가 필요할 때 `but` 메서드로 오버라이드를 하는 것이다.

`but` 메서드 만드는 방법은 단순하다.
Builder 패턴으로 구현시 `withXXX` 메서드를 보면 함수 체이닝을 위해 `return this` 를 한다.
`but` 메서드는 이 함수 체이닝을 이용해서 현재 this 에 있는 프로퍼티 내용들을 Get 하여 새로운 객체를 생성하는 것이다.
 
### Mock Dependency 줄이기
 
#### Mock 의 Simple Fixture Return
의존하고 있는 Mock 을 처리할 때 또 다시 Mock 을 리턴 하는 Fixture 가 있을 때가 있다.
이런 식으로 제어하지 못할 객체와는 의존성을 없애야 한다.
직접적으로 제어하지 못할 객체를 테스트 코드에서 직접 다루지 말고, 
그것을 래핑해서 다룰 수 있는 별도의 클래스를 만들고, 이 클래스를 가지고 테스트 코드를 짠다.
 
#### 시간 제어하기
제어할 수 없는 시간 값으로 돌아가는 메서드에 대한 테스트 코트 작성을 할 때는 `Clock` 이용 하면 된다.
(시스템 타임을 가져오는 Clock 말고, 제어할 수 있는 Clock 이 있다.)
 
시간 외에 외부에서 가져와야하는 자원에 대해서도 제어 할 수 있는 방법이 있을 것이다.
 
---
> 테스트 코드를 작성해서 얻게 되는 가장 큰 수확은 테스트 자체가 아니다. 작성 과정에서 얻는 깨닮음 이다. - Effective Unit Test