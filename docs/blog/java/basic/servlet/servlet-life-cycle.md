---
title: 서블릿 라이프 사이클
descirption: jsp 라이프 사이클과
date: 2018-10-13
sidebar: auto
---

## 서블릿 라이프 사이클

<mermaid>
  graph TB
    load(생성)
    some-state1(( ))
    some-state2(( ))
    init(초기화)
    available(사용 가능 - Servicing Requests)
    unuvailable(사용 불가능)
    destroy(파기)
    unload(제거)
    %% link
    load --> some-state1
    some-state1 --success--> init
    some-state1 --failure--> unload
    init --> some-state2
    some-state2 --success--> available
    some-state2 --failure-->unload
    available --> unuvailable
    unuvailable --> available
    available --destroy request--> destroy
    destroy --> unload
</mermaid>
