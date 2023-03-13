import{r as l,f as R}from"./index.d885ea9e.js";function $(){const e=l.exports.useRef(),t=l.exports.useRef(),n=l.exports.useRef(),u=(s,c)=>(t.current=s,n.current=c,e.current=setTimeout(t.current,c),e.current),r=()=>{e.current&&clearTimeout(e.current)};return{timeout:u,cancel:r,reset:()=>{t.current&&n.current&&(r(),u(t.current,n.current))}}}function Y(){const e=l.exports.useRef(),{timeout:t,reset:n,cancel:u}=$();return{debounce:(o,s)=>{e.current?n():e.current=t(o,s)},cancel:u}}const E=e=>{let t;const n=new Set,u=(i,d)=>{const f=typeof i=="function"?i(t):i;if(!Object.is(f,t)){const S=t;t=(d!=null?d:typeof f!="object")?f:Object.assign({},t,f),n.forEach(x=>x(t,S))}},r=()=>t,c={setState:u,getState:r,subscribe:i=>(n.add(i),()=>n.delete(i)),destroy:()=>n.clear()};return t=e(u,r,c),c},O=e=>e?E(e):E;var D={exports:{}},w={},j={exports:{}},b={};/**
 * @license React
 * use-sync-external-store-shim.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var p=l.exports;function V(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var _=typeof Object.is=="function"?Object.is:V,k=p.useState,I=p.useEffect,T=p.useLayoutEffect,q=p.useDebugValue;function W(e,t){var n=t(),u=k({inst:{value:n,getSnapshot:t}}),r=u[0].inst,o=u[1];return T(function(){r.value=n,r.getSnapshot=t,y(r)&&o({inst:r})},[e,n,t]),I(function(){return y(r)&&o({inst:r}),e(function(){y(r)&&o({inst:r})})},[e]),q(n),n}function y(e){var t=e.getSnapshot;e=e.value;try{var n=t();return!_(e,n)}catch{return!0}}function B(e,t){return t()}var C=typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"?B:W;b.useSyncExternalStore=p.useSyncExternalStore!==void 0?p.useSyncExternalStore:C;(function(e){e.exports=b})(j);/**
 * @license React
 * use-sync-external-store-shim/with-selector.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var m=l.exports,F=j.exports;function L(e,t){return e===t&&(e!==0||1/e===1/t)||e!==e&&t!==t}var M=typeof Object.is=="function"?Object.is:L,U=F.useSyncExternalStore,z=m.useRef,A=m.useEffect,G=m.useMemo,H=m.useDebugValue;w.useSyncExternalStoreWithSelector=function(e,t,n,u,r){var o=z(null);if(o.current===null){var s={hasValue:!1,value:null};o.current=s}else s=o.current;o=G(function(){function i(a){if(!d){if(d=!0,f=a,a=u(a),r!==void 0&&s.hasValue){var v=s.value;if(r(v,a))return S=v}return S=a}if(v=S,M(f,a))return v;var h=u(a);return r!==void 0&&r(v,h)?v:(f=a,S=h)}var d=!1,f,S,x=n===void 0?null:n;return[function(){return i(t())},x===null?void 0:function(){return i(x())}]},[t,n,u,r]);var c=U(e,o[0],o[1]);return A(function(){s.hasValue=!0,s.value=c},[c]),H(c),c};(function(e){e.exports=w})(D);const J=R(D.exports),{useSyncExternalStoreWithSelector:K}=J;function N(e,t=e.getState,n){const u=K(e.subscribe,e.getState,e.getServerState||e.getState,t,n);return l.exports.useDebugValue(u),u}const g=e=>{const t=typeof e=="function"?O(e):e,n=(u,r)=>N(t,u,r);return Object.assign(n,t),n},P=e=>e?g(e):g,Q=P()(e=>({userData:null,setUserData:t=>e(()=>({userData:t}))})),Z=Q;export{Z as a,$ as b,Y as u};
