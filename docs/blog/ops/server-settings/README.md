---
title: 서버 세팅 이야기
description: 서버 세팅 이야기
date: 2018-10-23
sidebar: auto
---
## 웹 서버 설정

웹서버를 반드시 WAS 앞에 두자.
정적인 부분은 웹 서버에서 처리하자.
css, 자바스크립트, html, 이미지 같은 정적인 부분은 아까운 WAS 서버의 스레드를 점유해서 사용할 필요가 없다.

웹 서버도 스레드의 개수를 지정 한다.

예를 들어 아파치 웹 서버.
아파는 Multi-Processiong Module(MPM) 이라는 여러 개의 프로세싱 모듈 기반의 서비스를 제공한다.
아파치의 conf 디렉토리 httpd.conf 파일 중간 부분을 보면
```lombok.config
ThreadsPerChild 250
MaxRequestsPerChild 0
```
와 같이 설정이 있다.

ThreadsPerChild 는 아파치 프로세스 하나당 250 개의 스레드를 지정한다. 서버가 더 많은 사용자 요청을 처리 하기 위해선 이 수치를 늘린다.
MaxRequestPerChild 는 최대 요청 개수를 지정하는 부분이다.
0 이면 제한을 두지 않겠다는 것이고, 10으로 둔다면 10 이상의 처리는 하지 않게 된다. 가급적 기본값은 0 을 사용하는 것을 권장한다.

