---
title: jsp 라이프 사이클, 그리고 spring boot 와 jsp
description: jsp 라이프 사이클 다시보기, spring boot 와 jsp 조합의 한계
date: 2018-10-13
categories: [java]
tags: [jsp, spring boot]
sidebar: auto
---

# {{ $page.title }}

**Table of Contents**

[[toc]]

## Java Server Pages (JSP) Life Cycle

> 참고 링크: [jsp-basics](https://www.javaskool.com/jsp-basics/)

이미 컴파일 되어 있고, 클래스가 로드되어 있고, jsp 파일이 변경되지 않았다면 1~3 단계의 프로세스는 생략된다.

### 1. 페이지 번역 (Translation)
- 컨테이너가 클라이언트로부터 요청을 받으면 jsp 페이지의 syntax 정확성과 tag 파일들의 유효성을 검증한다.
- 컨테이너는 페이지내에서 사용하는 standard directives, standard actions, 그리고 커스텀 tag 의 action 을 해석한다.
- jsp 소스파일에서 java 서블릿 파일이 생성된다.

### 2. JSP 페이지 컴파일 (Compilation)
java 서블릿 파일이 java servlet class 로 컴파일된다.

### 3. 클래스 로드 (Loading)
java servlet class 가 컨테이너에 로드된다.

::: tip pre-compile 옵션 사용
1~3 단계는 시간이 많이 소요되는데, 서버가 기동될 때 컴파일을 미리 수행하도록 pre-compile 옵션을 활성화하여
최신 소스 배포후 jsp 가 처음 호출되었을 때의 응답 시간을 줄일 수 있다.

개발이 한창 진행 중일 때는 기동 시간이 느려지면 생산성을 떨어뜨릴 수 있으니 상황에 따라 옵션을 사용하자.
:::

### 4. 인스턴스 생성 (Instantiation)
- Servlet class 를 인스턴스화 한다.
- 이번 단계를 Excution phase 로 설명하기도 하는데,
이 단계에서 컨테이너는 요청에 대한 응답으로 이 servlet class 에 대한 하나 이상의 인스턴스를 관리한다.

### 5. 초기화 (Initialization)
- Servlet 인스턴스를 초기화 한다.
- jspInit() 메서드는 인스턴스가 생성 된 직후에 호출된다.
- jsp 생명주기 동안 한 번만 호출된다.

### 6. __jspService() 메서드 호출 (RequestProcessing)
- __jspService() 메서드는 라이프 사이클 동안 이 jsp 에 대한 모든 요청에 대해 호출된다.
- 요청과 응답 객체를 __jspService() 메서드에 전달하며, 이 메서드는 오버라이드 할 수 없다.

### 7. jspDestroy() 메서드 호출 (Destruction)
- jsp 가 파기 될 때 호출된다.
- 이 메서드가 호출되면 서블릿의 목적이 끝났기 때문에 Garbage collection 대상이 된다.
- jsp 생명주기의 끝이다.

<br />

## Spring boot 에서 jsp 를 뷰로 사용하기
<br />

Spring boot 에서 jsp 를 뷰로 사용하려면, 다른 템플릿 엔진을 쓸 때보다 더 해줘야 하는 작업이 있다.

1. jsp, jstl dependency 추가 (디펜던시 추가는 다른 템플릿 엔진도 물론 필요하다)
2. application.yml (or properties) 설정에 jsp 경로, suffix 설정
```yaml
spring:
  view:
    prefix: /WEB-INF/jsp/
    suffix: .jsp
```
  위의 설정을 하고 나면 jsp 를 뷰로 사용할 수 있다.

  다른 템플릿 엔진들은 기본값이 있어서 2번 작업이 없어도 된다.

<br />

## Spring boot + jsp 조합의 한계
<br />

> 참고 : [(Spring boot 공식문서) jsp limitations](https://docs.spring.io/spring-boot/docs/current/reference/html/boot-features-developing-web-applications.html#boot-features-jsp-limitations)

스프링 부트는 jsp 를 공식적으로 지원하지 않는데,
이는 스프링 부트 내장 tomcat 하드코딩 패턴 때문에 webapp 내용을 가져올 수 없기 때문인 것 같다.

::: danger
즉, spring boot jar 실행이 필요하다면 jsp 를 뷰로 사용 할 수 없다.
:::

Pivotal 에서는 war 보다는 jar 를 권장하고 있으며 jar 로는 jsp 를 사용할 수 없으니
결론적으로 Spring boot 에서 jsp 는 사용하지 않는 것이 좋겠다.



