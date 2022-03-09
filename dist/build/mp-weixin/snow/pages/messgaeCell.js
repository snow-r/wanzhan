(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["snow/pages/messgaeCell"],{2562:function(t,n,e){"use strict";var i;e.d(n,"b",(function(){return a})),e.d(n,"c",(function(){return s})),e.d(n,"a",(function(){return i}));var a=function(){var t=this,n=t.$createElement;t._self._c},s=[]},"672d":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var i={name:"messageCell",props:{type:String,content:String,value:Object},data:function(){return{titles:["店铺上新","消息通知","互动消息","订单消息"],back:["../../static/images/msg_b_0.png","../../static/images/msg_b_1.png","../../static/images/msg_b_2.png","../../static/images/msg_b_2.png"],src:""}},computed:{imgSrc:function(){return"../../static/images/msg_"+this.type+".png"},title:function(){return this.titles[this.type]}},mounted:function(){this.src=this.back[this.type]}};n.default=i},b9ba:function(t,n,e){"use strict";var i=e("ddf2"),a=e.n(i);a.a},ddf2:function(t,n,e){},e416:function(t,n,e){"use strict";e.r(n);var i=e("672d"),a=e.n(i);for(var s in i)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return i[t]}))}(s);n["default"]=a.a},fc6d:function(t,n,e){"use strict";e.r(n);var i=e("2562"),a=e("e416");for(var s in a)["default"].indexOf(s)<0&&function(t){e.d(n,t,(function(){return a[t]}))}(s);e("b9ba");var c,u=e("f0c5"),r=Object(u["a"])(a["default"],i["b"],i["c"],!1,null,"5be82fbd",null,!1,i["a"],c);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'snow/pages/messgaeCell-create-component',
    {
        'snow/pages/messgaeCell-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("fc6d"))
        })
    },
    [['snow/pages/messgaeCell-create-component']]
]);
