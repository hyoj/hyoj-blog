---
title: Lombok
categories: ['java']
tags: ['java', 'lombok']
date: 2018-04-10
sidebar: auto
---

# {{ $page.title }}

<BlogPostMeta/>

**Table of Contents**

[[toc]]
<br />

## Lombok 이란?
<br />

Lombok 은 에디터(IntelliJ, Eclipse...)와 빌드 도구(Maven, Gradle..) 에 추가하여 사용하는 라이브러리이다.
이 라이브러리를 사용하면 getter, setter 등 자바 코드를 짤 때 항상 반복적으로 생성하는 소스 작성을 줄일 수 있다.
<br /><br />

## Lombok 준비하기
<br />

- Lombok 라이브러리를 프로젝트에 추가한다.
- IDE 에 Lombok 플러그인을 추가한다.
  1. `Settings` > `Plugins` > `Browse Repositories` : Lombok Plugin 설치
  
    ![IDEA lombok 설치하기](https://lh3.googleusercontent.com/ficasd4hTZKnJlSt6xgrEUpL-7bxj_9JXwBwzKY8UE6tr7IfqL299JG8oRZ8Gzpz43v_94NXCfil)
<br />

  2. `Settings` > `Build, Execution, Deployment` > `Compiler` > `Annotation Processors`
   `Enable annotation processing` 활성화
   
   ![Annotation Processors 활성화 시키기](https://lh3.googleusercontent.com/5tZLHEAXE4vz3znSJY0kK55_mFM2guTd5OaL6i--TEb2y87MGehMJSVwxaYtsXeuGasIkICTPSG-)

<br />

## Lombok Annotations 맛보기
<br />

### @Getter, @Setter
- getter / setter 메서드 생성
- 생성되는 메서드명 - `getFieldName` / `setFieldName`
- `@Getter` 적용된 필드의 타입이 `boolean`일 경우, 메서드명은 `isFieldName`
- Class 에 `@Getter`/`@Setter`를 적용하면 `static`을 제외한 모든 필드에 적용시킨 것과 동일
- `AccessLevel` 을 명시하지 않으면 `public`
  - `AccessLevel`: `PUBLIC` `PROTECTED` `PACKAGE` `PRIVATE` / `NONE` 
  - 특정 필드만 적용에서 제외시킬때 `NONE` 
```java
/* With Lombok */

@Getter @Setter
public class UserProfile {
    @Setter(AccessLevel.PROTECTED) private int userSeq;
    private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;

    public int getUserSeq() {
        return this.userSeq;
    }

    public String getUserName() {
        return this.userName;
    }

    public String getEmail() {
        return this.email;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    protected void setUserSeq(int userSeq) {
        this.userSeq = userSeq;
    }
}
```
<br />

### @NoArgsConstructor, @RequiredArgsConstructor,  @AllArgsConstructor

#### `@NoArgsConstructor`
 - 파라미터가 없는 생성자를 만든다.
 - 초기 값이 필요한 `final` 필드가 있을 경우, 컴파일 에러
     -  `@NoArgsConstructor(force=true)` 를 하면, 컴파일 에러를 내지 않고 `0` / `false` / `null` 로 초기화

``` java
/* With Lombok */

@NoArgsConstructor(force=true)
public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;

    public UserProfile() {
        this.userSeq = 0;
        this.userName = null;
    }
}
```

<br />

#### `@RequiredArgsConstructor`
- 아래 해당하는 필드에 대한 파라미터를 갖는 생성자를 만든다.
  - 초기화가 필요한 `final` 필드
  -  `@NonNull`이 지정된 필드

```java
/* With Lombok */

@RequiredArgsConstructor
public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;

    @java.beans.ConstructorProperties({"userSeq", "userName"})
    public UserProfile(int userSeq, String userName) {
        this.userSeq = userSeq;
        this.userName = userName;
    }
}
```

<br />

#### `@AllArgsConstructor`
- 모든 필드를 파라미터로 갖는 생성자

```java
/* With Lombok */

@AllArgsConstructor
public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private final int userSeq;
    @NonNull private String userName;
    private String email;

    @java.beans.ConstructorProperties({"userSeq", "userName", "email"})
    public UserProfile(int userSeq, String userName, String email) {
        this.userSeq = userSeq;
        this.userName = userName;
        this.email = email;
    }
}
```

<br />

#### `staticName`

- e.g. `@RequiredArgsConstructor(staticName="of")`는 of라는 이름의 static 팩토리 메서드 생성

```java
/* With Lombok */

@RequiredArgsConstructor(staticName = "of")
public class TypeProfile<T> {
    private T type;
}
```

```java
/* Vanila Java */

public class TypeProfile<T> {
    @NonNull  private T type;

    @java.beans.ConstructorProperties({"type"})
    private TypeProfile(T type) {
        this.type = type;
    }

    public static <T> TypeProfile<T> of(T type) {
        return new TypeProfile<T>(type);
    }
}
```

```java
TypeProfile tHello = TypeProfile.of("HELLO");
TypeProfile tFalse = TypeProfile.of(false);
TypeProfile t1 = TypeProfile.of(1);
```

<br />

### @ToString

`toString()` 메서드 구현

* 기본 대상은 non-static 필드 모두
  * ClassName(FieldName1=값1, FieldName2=값2...)
  * `includeFieldNames = false` 프린트 시 FieldName 제외 :: ClassName(값, 값...)
* `exclude="FieldName"` or  `exclude={"FieldName1", "FieldName2"}` - 원하지 않는 필드를 제외

```java
/* With Lombok */

@ToString
public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;

    public String toString() {
        return "UserProfile(userSeq=" + this.userSeq + ", userName=" + this.userName
                            + ", email=" + this.email + ")";
    }
}
```
<br />

### @EqualsAndHashCode

`hashCode`와 `equals`를 생성한다.

- `@EqualsAndHashCode(of={"FieldName1", "FieldName2"})` 필요한 필드를 명시하거나,
- `@EqualsAndHashCode(exclude={"FieldName1", "FieldName2"})` 제외할 필드를 명시
- 수퍼클래스가 있다면, `callSuper=true` 명시 필요

```java
/* With Lombok */

@EqualsAndHashCode(of={"userSeq", "userName"})
public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;

    public boolean equals(Object o) {
        if (o == this) return true;
        if (!(o instanceof UserProfile)) return false;
        final UserProfile other = (UserProfile) o;
        if (!other.canEqual((Object) this)) return false;
        if (this.userSeq != other.userSeq) return false;
        final Object this$userName = this.userName;
        final Object other$userName = other.userName;
        if (this$userName==null? other$userName != null: !this$userName.equals(other$userName)) 
            return false;
        return true;
    }

    public int hashCode() {
        final int PRIME = 59;
        int result = 1;
        result = result * PRIME + this.userSeq;
        final Object $userName = this.userName;
        result = result * PRIME + ($userName == null ? 43 : $userName.hashCode());
        return result;
    }

    protected boolean canEqual(Object other) {
        return other instanceof UserProfile;
    }
}
```

<br />

### @Data

여러 Annotation을 한 번에!
- `@ToString`
- `@EqualsAndHashCode` 
- `@RequiredArgsConstructor` 
- 모든 필드에 `@Getter`
- final 이 아닌 필드에 `@Setter`

<br />

### @Cleanup
현재 변수의 스코프가 종료되기 전에 리소스가 clean up 되도록 보장해준다.

```java
/* With Lombok */

public class CleanupExample {
  public static void main(String[] args) throws IOException {
    @Cleanup InputStream in = new FileInputStream(args[0]);
    @Cleanup OutputStream out = new FileOutputStream(args[1]);
    byte[] b = new byte[10000];
    while (true) {
      int r = in.read(b);
      if (r == -1) break;
      out.write(b, 0, r);
    }
  }
}
```

```java
/* Vanila Java */

public class CleanupExample {
  public static void main(String[] args) throws IOException {
    InputStream in = new FileInputStream(args[0]);
    try {
      OutputStream out = new FileOutputStream(args[1]);
      try {
        byte[] b = new byte[10000];
        while (true) {
          int r = in.read(b);
          if (r == -1) break;
          out.write(b, 0, r);
        }
      } finally {
        if (out != null) {
          out.close();
        }
      }
    } finally {
      if (in != null) {
        in.close();
      }
    }
  }
}
```

<br />

### @Builder, @Builder.Default, @Singular

`@Builder` 빌더 패턴을 적용한 객체 생성 메서드를 만든다.
`@Builder.Default` 객체 생성시 field 기본값 설정
`@Singular` @Builder가 적용된 클래스의 필드가 Collection 타입 일 때, 해당 필드의 값을 추가하는 메서드 생성

```java
/* 빌더 호출 */
UserProfile user00 = UserProfile.builder().userSeq(0)
                                          .userName("John Doe")
                                          .email("user00@lombok.com")
                                          .value("one")
                                          .value("two").build();
// UserProfile(userSeq=0, userName=John Doe, email=user00@lombok.com, age=20, values=[One, Two])
```

```java
/* With Lombok */

@Builder
public class UserProfile {
    private final int userSeq;
    private String userName;
    private String email;
    @Builder.Default private int age = 20;
    @Singular private List<String> values;
}
```

```java
/* Vanila Java */

public class UserProfile {
    private final int userSeq;
    private String userName;
    private String email;
    @Builder.Default private int age = 20;
    private List<String> values;

    @java.beans.ConstructorProperties({"userSeq", "userName", "email", "age", "values"})
    UserProfile(int userSeq, String userName, String email, int age, List<String> values) {
        this.userSeq = userSeq;
        this.userName = userName;
        this.email = email;
        this.age = age;
        this.values = values;
    }

    public static UserProfileBuilder builder() {
        return new UserProfileBuilder();
    }

    public static class UserProfileBuilder {
        private int userSeq;
        private String userName;
        private String email;
        private int age;
        private ArrayList<String> values;

        UserProfileBuilder() {
        }

        public UserProfileBuilder userSeq(int userSeq) {
            this.userSeq = userSeq;
            return this;
        }

        public UserProfileBuilder userName(String userName) {
            this.userName = userName;
            return this;
        }

        public UserProfileBuilder email(String email) {
            this.email = email;
            return this;
        }

        public UserProfileBuilder age(int age) {
            this.age = age;
            return this;
        }

        public UserProfileBuilder value(String value) {
            if (this.values == null) this.values = new ArrayList<String>();
            this.values.add(value);
            return this;
        }

        public UserProfileBuilder values(Collection<? extends String> values) {
            if (this.values == null) this.values = new ArrayList<String>();
            this.values.addAll(values);
            return this;
        }

        public UserProfileBuilder clearValues() {
            if (this.values != null)
                this.values.clear();

            return this;
        }

        public UserProfile build() {
            List<String> values;
            switch (this.values == null ? 0 : this.values.size()) {
                case 0:
                    values = java.util.Collections.emptyList();
                    break;
                case 1:
                    values = java.util.Collections.singletonList(this.values.get(0));
                    break;
                default:
                    values = java.util.Collections.unmodifiableList(new ArrayList<String>(this.values));
            }

            return new UserProfile(userSeq, userName, email, age, values);
        }

        public String toString() {
            return "UserProfile.UserProfileBuilder(userSeq=" + this.userSeq + ", userName=" + this.userName + ", email=" + this.email + ", age=" + this.age + ", values=" + this.values + ")";
        }
    }
}
```

<br />

### @Log / @Slf4j ...

해당 Class 명으로 로거 객체를 생성한다.
<br /><br />

## Lombok Annotations 주의사항
<br />

### @NoArgsConstructor
- `force=true`는 필드에 `@NonNull` 같은 제약조건을 무시하므로 주의

<br />

### @AllArgsConstructor, @RequiredArgsConstructor
- 해당 어노테이션 사용은 지양하고, 필요한 Field로 Constructor 를 직접 만들자
  - 같은 타입을 필드 선언 순서를 나중에 바꿀 경우 문제가 발생 소지가 있기 때문


```java
@AllArgsConstructor
public class UserProfile {
    private int userSeq;
    private String userName;
    private String email;
    private String job;
}
```

```java
UserProfile u = new UserProfile(1, "John", "lombok@study.com", "developer");
```

- Field 갯수가 많아서 Constructor 를 한땀 한땀 만드는게 고통이라면, `@Builder` 를 사용해보자

<br />

### @EqualsAndHashCode
- 항상 `@EqualsAndHashCode(of={“필드명”})` 형태로 동등성 비교에 필요한 필드를 명시하자

<br />

### @Data
- `@RequiredArgsConstructor` `@EqualsAndHashCode` 를 조합한 애너테이션이기 때문에 각 애너테이션의 주의사항이 포함된다.
- `@AllArgsConstructor` 를 같이 적용시키면 `@RequiredArgsConstructor` 는 적용되지 않는다.

<br />

### @Builder
- private 생성자를 구현하여 `@Builder` 를 지정하자
  `@Builder` 를 Class에 적용시키면 생성자의 접근 레벨이 default이기 때문에, 동일 패키지 내에서 해당 생성자를 호출할 수 있는 문제가 있다.

```java
/* With Lombok */

public class UserProfile {
    private final int userSeq;
    private String userName;
    private String email;

    @Builder
    private UserProfile(int userSeq, String userName, String email) {
        this.userSeq = userSeq;
        this.userName = userName;
        this.email = email;
    }
}
```

```java
/* Vanila Java */

public class UserProfile {
    private final int userSeq;
    private String userName;
    private String email;

    private UserProfile(int userSeq, String userName, String email) {
        this.userSeq = userSeq;
        this.userName = userName;
        this.email = email;
    }

    public static UserProfileBuilder builder() {
        return new UserProfileBuilder();
    }

    public static class UserProfileBuilder {
        private int userSeq;
        /* ...생략... */
    }
}
```

<br /><br />

## lombok.config 로 사용하지 않을 Annotation 관리하기
<br />

```Ini![enter image description here](https://picasaweb.google.com/103296205152576488259/6542804378523851377#6542804381178978386)
# lombok.config
lombok.allArgsConstructor.flagUsage=error
# experimental 전체 금지
lombok.experimental.flagUsage=error
```
<br /><br />

## Reference

> ### Lombok
> [Lombok javadoc](https://projectlombok.org/api/index.html?lombok/package-summary.html)
> [Lombok features](https://projectlombok.org/features/all)
> [Lombok 사용상 주의점](http://kwonnam.pe.kr/wiki/java/lombok/pitfall) :star:

> ### Builder Pattern
> [builder pattern](https://springframework.guru/gang-of-four-design-patterns/builder-pattern/) :star:

> ### Java Immutable
> [Oracle Java docs > immutable ](https://docs.oracle.com/javase/tutorial/essential/concurrency/immutable.html) :star:
> [Oracle Java docs > access control](https://docs.oracle.com/javase/tutorial/java/javaOO/accesscontrol.html)