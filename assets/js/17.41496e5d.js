(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{348:function(t,e,s){"use strict";s.r(e);var r=s(0),a=Object(r.a)({},(function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("div",{staticClass:"content"},[s("h1",{attrs:{id:"page-title"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#page-title"}},[t._v("#")]),t._v(" "+t._s(t.$page.title))]),t._v(" "),s("p",[t._v("Java 7 부터 java.lang 패키지에 AutoCloseable 이라는 인터페이스가 등장했다.")]),t._v(" "),s("blockquote",[s("p",[s("a",{attrs:{href:"https://docs.oracle.com/javase/7/docs/api/java/lang/AutoCloseable.html",target:"_blank",rel:"noopener noreferrer"}},[t._v("Oracle docs Java 7 AutoCloseable"),s("OutboundLink")],1)])]),t._v(" "),s("p",[t._v("이 인터페이스에는 close 메서드 하나만 선언되어 있다.")]),t._v(" "),t._m(0),t._v(" "),t._m(1),t._v(" "),t._m(2),t._v(" "),t._m(3),t._v(" "),t._m(4),t._v(" "),s("p",[t._v("InterruptedExeption 은 쓰레드의 인터럽트 상태와 상호작용 하므로\nInterruptedException 이 억제되었을 때 런타임에서 잘못된 동작이 발생 할 수 있기 때문이다.")]),t._v(" "),t._m(5),t._v(" "),t._m(6),t._v(" "),s("p",[t._v("AutoCloseable.close() 메서드는 멱등성을 유지하는 것이 필수적이지는 않다.\n이 말인즉슨 AutoCloseable.close() 메서드를 최초 한 번 호출 이후 다시 호출 했을 때 side effect 가 발생할 수 있다는 것이다.")]),t._v(" "),s("p",[t._v("멱등성을 유지하는게 필수적인 사항은 아니지만 유지할 수 있도록 메서드를 구현하는 것을 추천한다.")]),t._v(" "),s("p",[t._v("(반면에 Closeable.close 메서드는 멱등성을 유지하는 것이 필수적이라 몇번을 호출하든 부작용(side effect)이 없다.)")]),t._v(" "),t._m(7),t._v(" "),s("hr"),t._v(" "),s("p",[t._v("🤔 앞으로는 "),s("a",{attrs:{href:"https://stackoverflow.com/questions/13141302/implements-closeable-or-implements-autocloseable",target:"_blank",rel:"noopener noreferrer"}},[t._v("Closeable 말고 AutoCloseable 을 구현해야하나? - 스택오버플로"),s("OutboundLink")],1)]),t._v(" "),s("p",[t._v("💡 나온지 한참 되었지만, "),s("a",{attrs:{href:"http://linuxism.tistory.com/934",target:"_blank",rel:"noopener noreferrer"}},[t._v("java 7 에서 등장한 특징 다시보기"),s("OutboundLink")],1)])])}),[function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"method-summary"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#method-summary"}},[this._v("#")]),this._v(" Method Summary")])},function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("table",[s("thead",[s("tr",[s("th",{staticStyle:{"text-align":"center"}},[t._v("Modifier and Type")]),t._v(" "),s("th",[t._v("Method")]),t._v(" "),s("th",[t._v("Description")])])]),t._v(" "),s("tbody",[s("tr",[s("td",{staticStyle:{"text-align":"center"}},[t._v("void")]),t._v(" "),s("td",[t._v("close()")]),t._v(" "),s("td",[t._v("Closes this resource, relinquishing any underlying resources.")])])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("h2",{attrs:{id:"method-detail"}},[e("a",{staticClass:"header-anchor",attrs:{href:"#method-detail"}},[this._v("#")]),this._v(" Method Detail")])},function(){var t=this.$createElement,e=this._self._c||t;return e("p",[e("code",[this._v("void close() throws Exception")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[e("p",[this._v("try-with-resources 문으로 관리되는 객체일 때 close() 메서드가 자동으로 호출된다.\n리소스를 닫고 기본 리소스를 양도한다.")])]),this._v(" "),e("li",[e("p",[this._v("close 메서드 구현시 구체적인 exception 을 throw 하고,\nclose 동작이 전혀 실패할 리가 없을 때는 exception 을 던지지 않도록 구현하는 것을 강력히 권고한다.")])]),this._v(" "),e("li",[e("p",[this._v("close 메서드에서 InterruptedException 을 던지지 않는 것을 강하게 권고한다.")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("Note")]),this._v(" "),e("p",[this._v("일반적으로, 예외가 억제되었을 때 문제를 야기시킨다면 그 예외를 던지지 않아야 한다.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("ul",[e("li",[this._v("멱등성을 유지하는 것을 추천한다.")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"tip custom-block"},[e("p",{staticClass:"custom-block-title"},[this._v("Note")]),this._v(" "),e("p",[this._v("연산을 여러 번 적용하더라도 결과가 달라지지 않는 성질을 "),e("code",[this._v("멱등성(idempotent)")]),this._v(" 이라 한다.")])])}],!1,null,null,null);e.default=a.exports}}]);