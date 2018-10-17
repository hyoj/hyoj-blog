---
title: JDBC 의 Connection, Statement, ResultSet close 잘 하기
subtitle: 그리고 try-with-resources 사용방법
description: [JDBC 의 Connection, Statement, ResultSet close 잘하기, try-with-resources 활용]
categories: [java]
tags: [jdbc, java twr]
date: 2018-10-14
sidebar: auto
---

# {{ $page.title }}

요즘은 프레임워크 기반으로 프로젝트를 구성해서 JDBC API 를 직접 쓰는 경우는 잘 없다.
그래도 레거시 시스템이나 직접 JDBC API 를 사용할 일이 있을 때를 대비하여 Connection, Statement, ResultSet 을 잘 닫는 방법을 정리한 글이다.

더불어 리소스 close 처리 개선을 위해 Java 7, 9 에서 등장한 try-with-resources 사용 방법을 알아보자.
(Java 7 에서 `try-with-resources` 가 처음 등장했고, Java 9 에서 보다 향상되었다.)

<br />

**Table of Contents**

[[toc]]
<br />

## Connection, PreparedStatement, ResultSet 닫는 가장 이상적인 방식

<br />

:bulb: 참고자료: [JDBC에서 Connection, Statement,ResultSet의 close](http://egloos.zum.com/benelog/v/1898928)

```java
public class Class1 {
    public method1() throws Exception {
            
      Connection conn = null;
      PreparedStatement ps = null;
      ResultSet rs = null;
      
      try {
          // ...
          conn = ...;
          ps = ...;
          rs = ...;
          
          // ...
      } catch (Exception e) {
          // ...
      } finally {
          if (rs != null) try { rs.close(); } catch(Exception e) {}
          if (ps != null) try { ps.close(); } catch(Exception e) {}
          if (conn != null) try { conn.close(); } catch(Exception e) {}
      }
    
    }
}
```

보통 DBManager 라는 이름의 클래스를 만들어서 사용한다. 
DBManager 클래스는 JNDI 를 lookup 하여 DataSource 를 통해 Connection 객체를 얻는 역할 등을 한다.

<br />

## Java 7 부터는 try-with-resources 를 사용하자

<br />

Java 7 에서 `AutoCloseable` 인터페이스와 `try-with-resources` 가 등장했다.

:point_right: [Java 7 부터 등장한 AutoCloseable 인터페이스 살펴보기](/blog/java/basic/java7-autocloseable.html)

`try-with-resources` 를 사용하여 JDBC API 사용하는 코드를 개선해보자.
try 블록의 소괄호 `()` 안에서 close() 메서드 호출이 필요한 (`AutoCloseable` 를 구현한) 객체를 할당해 주면 된다.

try catch 절이 종료되면 객체의 close() 메서드가 자동으로 호출된다.

```java{3-5}
public class Class1 {
    public method1() throws Exception {
      try (Connection conn = DriverManager.getConnection("...");
            Statement stat = conn.createStatement();
            ResultSet rs = stat.executeQuery("SELECT 1 from dual")) {
          
          // ...
      } catch (Exception e) {
          // ...
      } 
    }
}
```

<br />

## Java 9 이상에서 향상된 try-with-resources 사용방법

<br />

:bulb: [
Java 9 Try-With-Resources Enhancement](https://www.logicbig.com/tutorials/core-java-tutorial/java-9-changes/try-with-resource.html)

Java 7 에서 `try-with-resources` 를 사용할 때 close() 메서드 자동 호출을 위해
꼭 try 블록의 소괄호 안에서 자원 할당을 해야만 했다.

하지만 Java 9 부터는 `try-with-resources` 를 좀 더 유연하게 사용할 수 있게 되어서
try 블록의 밖에서 선언된 객체를 참조할 수 있다.

```java{3-5,7}
public class Class1 {
    public method1() throws Exception {
      Connection conn = DriverManager.getConnection("...");
      Statement stat = conn.createStatement();
      ResultSet rs = stat.executeQuery("SELECT 1 from dual")

      try (conn; stat; rs) {
          // ...
      } catch (Exception e) {
          // ...
      } 
    }
}
```


<!-- 이것도 좋은 링크 https://www.javaspecialists.eu/archive/Issue259.html , https://dzone.com/articles/java-9-tutorial-part-4-try-the-try-with-resources -->