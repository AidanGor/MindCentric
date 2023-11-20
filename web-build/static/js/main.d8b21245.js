(()=>{"use strict";var t={4025:(t,e,n)=>{n.r(e),n.d(e,{default:()=>B});var r=n(5004),o=n(2201),i=n(4246),a=n(1346),c=n(6792),l=n(1054),u=n(9385),d=n(2629),s=c.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",padding:16},title:{fontSize:28,fontWeight:"bold",marginBottom:16},subTitle:{fontSize:16,fontWeight:"bold",textAlign:"center",marginBottom:24},inputContainer:{flexDirection:"row",marginBottom:16},input:{flex:1,borderWidth:1,borderColor:"#ccc",marginRight:8,paddingHorizontal:8},list:{width:"100%"},listItem:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:1,borderColor:"#ccc",padding:8,marginBottom:8},editableText:{flex:1,borderWidth:1,borderColor:"#ccc",paddingHorizontal:8}});const f=function(t){t.navigation;return(0,d.jsxs)(u.default,{style:s.container,children:[(0,d.jsx)(l.default,{style:s.title,children:"MindCentric"}),(0,d.jsx)(l.default,{style:s.subTitle,children:"Your Aid to Prosperous Mental Health & Education"}),(0,d.jsx)(l.default,{style:s.title,children:"Welcome Back, User!"})]})};var b=n(4942),p=n(2982),m=n(885),g=n(3693),x=n(6591),j=n(3645),h=n(5288),y=n(3624);function v(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function O(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?v(Object(n),!0).forEach((function(e){(0,b.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):v(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var w=c.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center",padding:16},input:{borderWidth:1,borderColor:"#ccc",marginBottom:8,paddingHorizontal:8,width:"80%"},listItem:{flexDirection:"row",justifyContent:"space-between",alignItems:"center",borderWidth:1,borderColor:"#ccc",padding:8,marginBottom:8},editableText:{flex:1,borderWidth:1,borderColor:"#ccc",paddingHorizontal:8},buttonContainer:{flexDirection:"row"}});const P=function(t){var e=t.navigation,n=(0,r.useState)(""),o=(0,m.default)(n,2),i=o[0],a=o[1],c=(0,r.useState)([]),s=(0,m.default)(c,2),f=s[0],b=s[1],v=function(t){e.navigate("TodoList",{list:t,updateList:function(e){return P(t.id,e)}})},P=function(t,e){b((function(n){return n.map((function(n){return n.id===t?e:n}))}))};return(0,d.jsxs)(u.default,{style:w.container,children:[(0,d.jsx)(x.default,{style:w.input,placeholder:"Enter list name",value:i,onChangeText:function(t){return a(t)}}),(0,d.jsx)(g.default,{title:"Add List",onPress:function(){if(""!==i.trim()){var t={id:Date.now().toString(),name:i,tasks:[]};b([].concat((0,p.default)(f),[t])),a(""),v(t)}}}),(0,d.jsx)(j.default,{data:f,keyExtractor:function(t){return t.id},renderItem:function(t){var e=t.item;return(0,d.jsxs)(u.default,{style:w.listItem,children:[(0,d.jsx)(h.default,{onPress:function(){return v(e)},children:(0,d.jsx)(l.default,{style:w.editableText,children:e.name})}),(0,d.jsxs)(u.default,{style:w.buttonContainer,children:[(0,d.jsx)(g.default,{title:"Remove",onPress:function(){return t=e.id,void b(f.filter((function(e){return e.id!==t})));var t}}),(0,d.jsx)(g.default,{title:"Edit",onPress:function(){y.default.prompt("Enter new name:",e.name,(function(t){null!==t&&t!==e.name&&function(t,e){b((function(n){return n.map((function(n){return n.id===t?O(O({},n),{},{name:e}):n}))}))}(e.id,t)}))}})]})]})}})]})};function C(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function k(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?C(Object(n),!0).forEach((function(e){(0,b.default)(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):C(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var S=c.default.create({container:{flex:1,backgroundColor:"#fff",alignItems:"center",justifyContent:"center",padding:16},taskTitle:{fontSize:20,fontWeight:"bold",marginBottom:8},input:{borderWidth:1,borderColor:"#ccc",marginBottom:8,paddingHorizontal:8,width:"80%"},taskItem:{flexDirection:"row",alignItems:"center",borderWidth:1,borderColor:"#ccc",padding:8,textAlign:"center",minWidth:"80%"},editableText:{flex:1,borderWidth:1,borderColor:"#ccc",textAlign:"center"},buttonContainer:{flexDirection:"row"}});const T=function(t){var e=t.route.params,n=e.list,o=e.updateList,i=(0,r.useState)(""),a=(0,m.default)(i,2),c=a[0],s=a[1],f=(0,r.useState)(n.tasks||[]),b=(0,m.default)(f,2),h=b[0],v=b[1],O=(0,r.useCallback)((function(t){o(t)}),[o]);(0,r.useEffect)((function(){O(k(k({},n),{},{tasks:h}))}),[n,h,O]);return(0,d.jsxs)(u.default,{style:S.container,children:[(0,d.jsx)(l.default,{style:S.taskTitle,children:n.name}),(0,d.jsx)(x.default,{style:S.input,placeholder:"Enter task",value:c,onChangeText:function(t){return s(t)}}),(0,d.jsx)(g.default,{title:"Add Task",onPress:function(){if(""!==c.trim()){var t={id:Date.now().toString(),text:c};v([].concat((0,p.default)(h),[t])),s(""),o(k(k({},n),{},{tasks:[].concat((0,p.default)(h),[t])}))}}}),(0,d.jsx)(j.default,{data:h,keyExtractor:function(t){return t.id},renderItem:function(t){var e=t.item;return(0,d.jsxs)(u.default,{style:S.taskItem,children:[(0,d.jsx)(l.default,{style:S.editableText,numberOfLines:null,children:e.text}),(0,d.jsxs)(u.default,{style:S.buttonContainer,children:[(0,d.jsx)(g.default,{title:"Remove",onPress:function(){return t=e.id,v(h.filter((function(e){return e.id!==t}))),void o(k(k({},n),{},{tasks:h.filter((function(e){return e.id!==t}))}));var t}}),(0,d.jsx)(g.default,{title:"Edit",onPress:function(){y.default.prompt("Enter new name:",e.text,(function(t){null!==t&&t!==e.text&&function(t,e){v((function(n){return n.map((function(n){return n.id===t?k(k({},n),{},{text:e}):n}))})),o(k(k({},n),{},{tasks:h.map((function(n){return n.id===t?k(k({},n),{},{text:e}):n}))}))}(e.id,t)}))}})]})]})}})]})};var D=(0,i.default)(),E=(0,a.default)(),W=function(){return(0,d.jsxs)(E.Navigator,{children:[(0,d.jsx)(E.Screen,{name:"ListsScreen",component:P}),(0,d.jsx)(E.Screen,{name:"TodoList",component:T})]})};const I=function(){return(0,d.jsxs)(D.Navigator,{children:[(0,d.jsx)(D.Screen,{name:"Home",component:f}),(0,d.jsx)(D.Screen,{name:"Lists",component:W})]})};const B=function(){return(0,d.jsx)(o.default,{children:(0,d.jsx)(I,{})})}}},e={};function n(r){var o=e[r];if(void 0!==o)return o.exports;var i=e[r]={exports:{}};return t[r].call(i.exports,i,i.exports,n),i.exports}n.m=t,(()=>{var t=[];n.O=(e,r,o,i)=>{if(!r){var a=1/0;for(d=0;d<t.length;d++){for(var[r,o,i]=t[d],c=!0,l=0;l<r.length;l++)(!1&i||a>=i)&&Object.keys(n.O).every((t=>n.O[t](r[l])))?r.splice(l--,1):(c=!1,i<a&&(a=i));if(c){t.splice(d--,1);var u=o();void 0!==u&&(e=u)}}return e}i=i||0;for(var d=t.length;d>0&&t[d-1][2]>i;d--)t[d]=t[d-1];t[d]=[r,o,i]}})(),n.n=t=>{var e=t&&t.__esModule?()=>t.default:()=>t;return n.d(e,{a:e}),e},n.d=(t,e)=>{for(var r in e)n.o(e,r)&&!n.o(t,r)&&Object.defineProperty(t,r,{enumerable:!0,get:e[r]})},n.g=function(){if("object"===typeof globalThis)return globalThis;try{return this||new Function("return this")()}catch(t){if("object"===typeof window)return window}}(),n.o=(t,e)=>Object.prototype.hasOwnProperty.call(t,e),n.r=t=>{"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},(()=>{var t={179:0};n.O.j=e=>0===t[e];var e=(e,r)=>{var o,i,[a,c,l]=r,u=0;if(a.some((e=>0!==t[e]))){for(o in c)n.o(c,o)&&(n.m[o]=c[o]);if(l)var d=l(n)}for(e&&e(r);u<a.length;u++)i=a[u],n.o(t,i)&&t[i]&&t[i][0](),t[i]=0;return n.O(d)},r=self.webpackChunkweb=self.webpackChunkweb||[];r.forEach(e.bind(null,0)),r.push=e.bind(null,r.push.bind(r))})();var r=n.O(void 0,[436],(()=>n(6271)));r=n.O(r)})();
//# sourceMappingURL=main.d8b21245.js.map