---
title: RxJava vs Reactor 뭐가 좋나요
categories: ['java']
tags: ['spring', 'reactor', 'rxjava']
date: 2018-08-12
sidebar: auto
description: RxJava vs Reactor 뭐가 좋나요
---
Spring 으로 서버 개발을 할 때, RxJava와 Reactor 중 어느 것을 쓰는게 좋을지 고민이 되었는데, 몇가지 자료들을 검토해 본 결과 **Reactor** 를 사용해 보기로 결론을 내렸습니다.

_“Spring 으로 서버 개발은 Reactor 로 해보자”_ 결론의 토대가 된 자료들에 대해 정리한 글입니다.

📝 참고한 글

*   [Reactive landscape](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape)
*   [spring_reactor_vs_rxjava](https://www.reddit.com/r/java/comments/6acxe3/spring_reactor_vs_rxjava/)

## 1. [Reactive landscape](https://spring.io/blog/2016/06/07/notes-on-reactive-programming-part-i-the-reactive-landscape) 에 언급된 RxJava, Reactor

### 1.1. [RxJava](https://github.com/ReactiveX/RxJava/wiki) 소개

RxJava 는 JVM을 위한 ReactiveX (Reactive Extensions) 라이브러리입니다.  
넷플릭스는 꽤 오랜기간동안 리액티브 패턴을 사용해오면서 Netflix/RxJava 를 오픈소스로 공개하였고, 현재는 ReactiveX/RxJava 로 불립니다. [Reactive Streams 에 대한 브릿지](https://github.com/ReactiveX/RxJavaReactiveStreams)가 있습니다. RxJava는 David Karnok의 [Reactive 세대 분류 체계](https://akarnokd.blogspot.co.uk/2016/03/operator-fusion-part-1.html)에 따르면 2세대 라이브러리입니다.

### 1.2. [Reactor](https://projectreactor.io/) 소개

Reactor는 Pivotal 의 오픈소스팀 (Spring 만든 팀) 이 만든 Java 프레임워크입니다. 이 프레임워크는 Reactive Stream 상에서 직접 빌드되므로 브릿지가 필요없습니다. Reactor IO 프로젝트는 Netty, Aeron 과 같은 저수준 네트워크 런타임에 대한 래퍼를 제공합니다. Reactor는 David Karnok의 [Reactive 세대 분류 체계](https://akarnokd.blogspot.co.uk/2016/03/operator-fusion-part-1.html)에 따르면 4세대 라이브러리입니다.

## 2. [Spring Reactor vs RxJava](https://www.reddit.com/r/java/comments/6acxe3/spring_reactor_vs_rxjava/)

> ### [David Karnok on Twitter](https://twitter.com/akarnokd/status/774590596740685824?ref_src=twsrc%5Etfw)
> 
> (David Karnok: RxJava PL 이자, Reactor3 엔진 Contributor)  
> Java8 이상을 사용할 수 있으면 Reactor3 을 사용하세요.  
> Java6 에서 벗어나기 힘들거나, checked exception 이 꼭 필요하면 RxJava2 를 사용하세요.

> ### [Pivotal - Reactor Core 3.0 becomes a unified Reactive Foundation on Java 8](https://spring.io/blog/2016/03/11/reactor-core-3-0-becomes-a-unified-reactive-foundation-on-java-8)
> 
> Reactor 2.5 -> 3.0 으로 업그레이드 할 때 Java8 이상을 기본으로 설계되었습니다. Java8 을 기본으로 하면서 얻을 수 있는 혜택은 아래와 같습니다.
> 
> *   `reactor.fn` 에서 functional callback 을 위해 별도로 만들었던 것들을 `java.util.function` 으로 대체함 => 표준 대화형 지침과 경쟁적인 표면 API 제공이 가능해짐 (: 개발자들이 사용하기가 더 낫다)
> *   `Flux` <=> `java.util.stream.Stream` 변환 가능
> *   `Mono` <=> `CompletableFuture` 변환 가능
> *   `Optional`로 `Mono`를 안전하게 생성 가능
> *   `Duration`으로 온전한 기간 지원
> *   특히 [Reactor Addons](https://github.com/reactor/reactor-addons) 사용시 `ConcurrentHashMap`에 대한 JSR 166 backport 제거
> *   Spring framework 5 가 제공하는 프로그래밍 경험에 더 가깝게 다가설 수 있음

> ### [InfoQ - Reactor by Example](https://www.infoq.com/articles/reactor-by-example)
> 
> RxJava2 가 Reactive Streams 표준 이후에 개발되면서 Reactive Streams 인터페이스를 구현하기는 했지만, 별도의 backpressure 지원용 클래스 Flowable 를 만들고 RxJava1 의 `Observable`, `Completeable`, `Single` 의 backpressure 지원 제거와, 해당 클래스는 계속 유지하는 등 Reactive Streams 표준을 준수하지는 않습니다.

— 접기/펼치기  
RxJava2는 [Reactive Streams 표준](http://www.reactive-streams.org/) 이 정의 된 이후에 개발되었기 때문에, Publisher 를 (RxJava2 에서) 새로운 타입인 Flowable 로 직접 구현했습니다.  
그러나 RxJava2 는 RS 타입에 오롯이 집중하지 않고, RxJava1 타입인 `Observable`, `Completeable`, `Single` 을 유지하면서 RxJava Optional 을 도입합니다. 이러한 것들이 의미론적으로는 리액티브 프로그래밍을 제공하기는 하지만, RS 인터페이스를 구현하지 않음으로써 따르는 단점이 있습니다.  
RxJava1 에서 전체적으로 지원하려 했던 backpressure 는 RxJava2에서는 `Flowable` 에 한해서만 지원합니다. (`Completeable`, `Single`, `Maybe` 는 backpressure 가 비현실적이거나 불가능한 사용자 인터페이스 이벤트와 같은 경우를 위해 유지되었습니다. backpressure 를 지원하지 않는 설계로 인해, 풍부한 API 를 제공하고 구독되기 전까지 모든 작업을 연기할 수 있습니다.)  
반면에 Reactor의 Mono, Flux 타입을 살펴보면 Publisher와 Backpressure-ready를 모두 구현합니다. Mono가 Publisher 로서 동작하려면 상대적으로 약간의 오버헤드가 있지만 대부분 Mono 최적화에 의해 상쇄할만한 수준입니다.

## 3. Spring5 - Reactor 맛보기

> [Spring WebFlux](https://docs.spring.io/spring/docs/current/spring-framework-reference/web-reactive.html#webflux)

### 3.1. dependency 추가하기

`org.springframework.boot:spring-boot-starter-webflux`  
[maven central repository :: spring-boot-starter-webflux](https://mvnrepository.com/artifact/org.springframework.boot/spring-boot-starter-webflux/2.0.4.RELEASE)

### 3.2. request routing 등록, request 처리하기

Spring5 부터 request routing 방법이 두가지로 나누어 집니다.

#### 3.2.1. Annotated Controllers

기존에 사용하는 방식(Spring MVC 어노테이션 기반)으로 `@Controller`, `@RestController`, `@RequestMapping`, `@GetMapping` … 을 이용하는 방법입니다.

#### 3.2.2. Functional Endpoints

함수형 프로그래밍 방식의 `HandlerFunction`, `RouterFunction` 을 이용하는 방법입니다.  
request 라우팅과 처리를 위한 람다 기반의 가벼운 함수형 프로그래밍 모델을 지원합니다.

기존 Spring MVC 어노테이션 기반의 방법은 모두 익히 알고 있는 방법이니, 이번 맛보기는 Functional Endpoints 방식으로 살펴보겠습니다.

##### 3.2.2.1 RouterFunction

request 라우팅하는데 사용됩니다. 일반적으로 `RouterFunctions.route(RequestPredicate, HandlerFunction)` 같은 방식으로 라우팅 합니다.

##### 3.2.2.2 HandlerFunction

HTTP 요청/응답을 JDK8 친화적으로 접근 할 수 있고, Reactive Streams 표준에 부합하는 immutable interface (`ServerRequest`, `ServerResponse`) 입니다. request body 는 `Flux`, `Mono` 으로, response body 는 `Publisher (Flux, Mono 포함)` 로 처리합니다.

### 3.3. reactor 사용하는 예제 코드

`RouterFunction`, `HandlerFunction` 을 사용하는 방법은 아래 예제 코드를 참고해주세요.  
[spring.io :: Functional endpoints 예제](https://spring.io/blog/2016/09/22/new-in-spring-5-functional-web-framework) 기반입니다.

    @SpringBootApplication  
    public class DemoReactorApplication {  
        public static void main(String[] args) {  
            SpringApplication.run(DemoReactorApplication.class, args);  
        }

        @Bean  
        public RouterFunction<ServerResponse> routingFunction() {  
            PersonRepository repository = new DummyPersonRepository();  
            PersonHandler handler = new PersonHandler(repository);  

            return route(GET("/person/{id}").and(accept(APPLICATION_JSON)), handler::getPerson)  
        .andRoute(GET("/person").and(accept(APPLICATION_JSON)), handler::listPeople)  
        .andRoute(POST("/person"), handler::createPerson);  
     }}

    public class PersonHandler {  

        private final PersonRepository repository;  

        public PersonHandler(PersonRepository repository) {  
            this.repository = repository;  
        }

        public Mono<ServerResponse> getPerson(ServerRequest request) {  
            int personId = Integer.valueOf(request.pathVariable("id"));  
            Mono<ServerResponse> notFound = ServerResponse.notFound().build();  
            Mono<Person> personMono = this.repository.getPerson(personId);  

            return personMono  
                    .flatMap(person -> ServerResponse.ok().contentType(APPLICATION_JSON).body(fromObject(person)))  
      .switchIfEmpty(notFound);  
       }  

        public Mono<ServerResponse> createPerson(ServerRequest request) {  
            Mono<Person> person = request.bodyToMono(Person.class);  
            return ServerResponse.ok().build(this.repository.savePerson(person));  
        }  

        public Mono<ServerResponse> listPeople(ServerRequest request) {  
            Flux<Person> people = this.repository.allPeople();  
            return ServerResponse.ok().contentType(APPLICATION_JSON).body(people, Person.class);  
       }  
    }