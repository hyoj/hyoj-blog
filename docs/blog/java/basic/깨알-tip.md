from. 자바 성능 튜닝 가이드

p251
힙 덤프는 현재 JVM의 힙 메모리에서 점유하고 있는 객체에 대한 정보를 파일로 생성해 놓은 것이다.
OutOfMemoryError 가 발생했을 때 자동으로 힙 덤프를 저장하도력 하려면, "-XX:+HeamDumpOnOutOfMemoryError" 옵션을 추가하면 된다.
힙 덤프가 발생하는 경로 지정은 "-XX:HeapDumpPath=/app/tomcat/dump" 와 같이 저장하는 경로를 추가하면 된다.
- 자세한 힙 덤프 설명은 `자바 개발자와 시스템 운영자를 위한 트러블슈팅 이야기 (한빛미디어, 2011)`를 참고

p258
avro, protocol buffer, thrift 가 어떤 형식으로 데이터를 Serialize 하는지 정리된 외국 블로그
http://martin.kleppmann.com/2012/12/05/schema-evolution-in-avro-protocol-buffers-thrift.html

XML 과 JSON 을 데이터 기준으로 하면, 메모리 와 CPU 사용량 손실을 반드시 염두에 두기 바란다.

