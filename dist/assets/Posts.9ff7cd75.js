import{u as m,v as p,K as h,U as N,R as k,y as f}from"./firestore.0b02de5c.js";import{e as u,j as a,a as e,r as c,F as y,d as x}from"./index.90289996.js";import{m as d}from"./currentUserData.2def0eac.js";function b(s){if(!(s instanceof m)&&!(s instanceof Date))return"incorrect format";let t,n;const l=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],o=new Date;return s instanceof m?t=s.toDate():t=s,o.getTime()-t.getTime()<24*3600*1e3?n=t.toTimeString().slice(0,5):o.getTime()-t.getTime()<7*24*3600*1e3?n=l[t.getDay()]:n=t.toDateString(),n}function v({post:s}){var t;const n=b(s.date),{myID:l}=u();return a("div",{className:"post",children:[a("div",{className:"post-title",children:[e("span",{children:s.uid===l?"Me":d&&((t=d)==null?void 0:t.friends[s.uid])}),e("span",{children:n})]}),a("div",{className:"post-body",children:[s.images&&e("div",{children:s.images.map((o,r)=>e("img",{alt:s.date+r,className:"post-img",src:o},r))}),s.body]})]})}function g(){return c.exports.useEffect(()=>{const s=Array.from(document.getElementsByClassName("skeleton-animate"));return s.forEach(t=>{t.style.width=Math.random()*30+20+"%",t.style.animation=`stretch ${Math.random()*100+500}ms -${Math.random()}s infinite`}),()=>{s.forEach(t=>t.style.animation="none")}},[]),a(y,{children:[a("div",{className:"post",children:[a("div",{className:"post-title",children:[e("span",{className:"skeleton-text"}),e("span",{className:"skeleton-text"})]}),a("div",{className:"post-body",children:[e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{})]})]}),a("div",{className:"post",children:[a("div",{className:"post-title",children:[e("span",{className:"skeleton-text"}),e("span",{className:"skeleton-text"})]}),a("div",{className:"post-body",children:[e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{})]})]}),a("div",{className:"post",children:[a("div",{className:"post-title",children:[e("span",{className:"skeleton-text"}),e("span",{className:"skeleton-text"})]}),a("div",{className:"post-body",children:[e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{}),e("span",{className:"skeleton-text skeleton-animate"}),e("br",{})]})]})]})}function E(){const[s,t]=c.exports.useState([]);return c.exports.useEffect(()=>{const n=p(k(x,"posts"),N("date","desc"),h(10)),l=f(n,o=>{const r=o.docChanges().filter(i=>i.type==="added").map(i=>i.doc.data());t(i=>[...r,...i])});return()=>l()},[]),a("div",{children:[s.length===0&&e(g,{}),s.map((n,l)=>e(v,{post:n},l))]})}export{E as default};