(window.webpackJsonp=window.webpackJsonp||[]).push([[23],{354:function(e,t,a){"use strict";a.r(t);var s=a(0),n=Object(s.a)({},(function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"content"},[this._m(0),this._v(" "),t("mermaid",[this._v("\n  graph TB\n    load(생성)\n    some-state1(( ))\n    some-state2(( ))\n    init(초기화)\n    available(사용 가능 - Servicing Requests)\n    unuvailable(사용 불가능)\n    destroy(파기)\n    unload(제거)\n    %% link\n    load --\x3e some-state1\n    some-state1 --success--\x3e init\n    some-state1 --failure--\x3e unload\n    init --\x3e some-state2\n    some-state2 --success--\x3e available\n    some-state2 --failure--\x3eunload\n    available --\x3e unuvailable\n    unuvailable --\x3e available\n    available --destroy request--\x3e destroy\n    destroy --\x3e unload\n")])],1)}),[function(){var e=this.$createElement,t=this._self._c||e;return t("h2",{attrs:{id:"서블릿-라이프-사이클"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#서블릿-라이프-사이클"}},[this._v("#")]),this._v(" 서블릿 라이프 사이클")])}],!1,null,null,null);t.default=n.exports}}]);