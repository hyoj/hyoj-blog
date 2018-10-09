---
title: IntelliJ 추천 플러그인
description: intellij 추천 플러그인, idea 플러그인 추천
categories: [tips]
tags: [intellij plugins]
date: 2018-08-26
---

# IntelliJ 추천 플러그인 ☺️

그 좋은 IJ 에 플러그인까지 곁들이면 금상첨화 !

IntelliJ 를 시작했다면, 아래 플러그인들을 사용해보세요.

[[toc]]

<br />

## CodeGlance

[CodeGlance](https://plugins.jetbrains.com/plugin/7275-codeglance) `editor`

Sublime 처럼 코드 미니맵을 에디터 창에 표시해줍니다.

![codeglance](https://plugins.jetbrains.com/files/7275/screenshot_16821.png)

<br />

## Key Promoter X

[Key Promoter](https://plugins.jetbrains.com/plugin/9792-key-promoter-x) `apps, notofication and interaction applications`
  
마우스로 버튼을 눌렀을 때, 해당하는 키보드 단축키를 알려줍니다.

마우스 없이 키보드로 더 빠르게 전환하는 방법을 쉽게 배울 수 있습니다.

<br />

## Grep Console

[Grep Console](https://plugins.jetbrains.com/plugin/7125-grep-console) `misc`

콘솔 창 텍스트 컬러 지정, 필터 등을 할 수 있습니다.  

로그 레벨 별 색 지정을 해두면 한눈에 보기 좋습니다.  

![grep example](https://plugins.jetbrains.com/files/7125/screenshot_16117.png)

<br />

## Lombok

[Lombok](https://plugins.jetbrains.com/plugin/6317-lombok-plugin) `tools integration`

Java 에 항상 쓰게되는 보일러플레이트 코드(getter, setter, toString … )들을 작성하지 않아도 되도록 도와줍니다.

@Getter, @Setter 적용 방법 예

```java{1,3}
    @Getter @Setter  
    public class UserProfile  {
    	@Setter(AccessLevel.PROTECTED) private int userSeq;
    	private String userName;
    	private String email;
    }
```

<br />

## Rainbow Brackets

[Rainbow Brackets](https://plugins.jetbrains.com/plugin/10080-rainbow-brackets) `ui`

각종 괄호 (괄호, 중괄호 …) 의 짝에 맞게끔 무지개색으로 표시해줍니다.
  
![](https://plugins.jetbrains.com/files/10080/screenshot_17373.png)
  
![](https://plugins.jetbrains.com/files/10080/screenshot_17374.png)

<br />

## Advanced Java Folding

[Advanced Java Folding](https://plugins.jetbrains.com/plugin/9320-advanced-java-folding) `formatting`

Kotilin, Groovy, Scala 같은 모던 JVM 언어들 처럼 Java 코드를 간결하고 표현력있는 방식으로 표시해줍니다.
 
실제 코드를 바꾸는 것이 아니라 단순히 보이는 방식만 바뀌는 것이니 코드가 바뀌는 것을 걱정하지 않아도 됩니다.
 
접고 펼치는 방식으로 적용/적용해제 할수 있습니다.