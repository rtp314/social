import{v as I,U as q,R as N,y as V,t as W,u as X,x as $,P,s as S}from"./firestore.0b02de5c.js";import{r as u,d as _,j as m,a as o,b as R,F as O}from"./index.90289996.js";import{m as g,a as w}from"./currentUserData.2def0eac.js";function z(){const s=u.exports.useRef(),e=u.exports.useRef(),t=u.exports.useRef(),h=(f,i)=>(e.current=f,t.current=i,s.current=setTimeout(e.current,i),s.current),c=()=>{s.current&&clearTimeout(s.current)};return{timeout:h,cancel:c,reset:()=>{e.current&&t.current&&(c(),h(e.current,t.current))}}}var G=Object.defineProperty,H=Object.defineProperties,J=Object.getOwnPropertyDescriptors,M=Object.getOwnPropertySymbols,K=Object.prototype.hasOwnProperty,Q=Object.prototype.propertyIsEnumerable,D=(s,e,t)=>e in s?G(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t,Y=(s,e)=>{for(var t in e||(e={}))K.call(e,t)&&D(s,t,e[t]);if(M)for(var t of M(e))Q.call(e,t)&&D(s,t,e[t]);return s},Z=(s,e)=>H(s,J(e));function A(s){const[e,t]=u.exports.useState([[]]),[h,c]=u.exports.useState(!0),l=u.exports.useRef();function f(r){if(r.length===0)return[[]];const a=[[r[0]]];let d=0;return r.forEach((v,p)=>{p!==0&&(v.day===a[d][0].day?a[d].push(v):(d++,a.push([v])))}),a}function i(r){r[0].length!==0&&t(a=>{if(a[0][0]===void 0)return r;if(r[0][0].day===a[a.length-1][0].day){const d=[...a];return d[d.length-1].push(...r[0]),d.push(...r.slice(1)),d}else return[...a,...r]})}return u.exports.useEffect(()=>{s!==l.current&&(t([[]]),l.current=s),c(!0);const r=I(N(_,"chats",s,"messages"),q("date","asc")),a=V(r,d=>{const v=d.docChanges().filter(p=>p.type==="added").map(p=>p.doc.data()).map(p=>Z(Y({},p),{day:p.date.toDate().toDateString(),time:p.date.toDate().toTimeString().slice(0,5)}));i(f(v)),c(!1)},d=>console.log(d));return()=>a()},[s]),[h,e]}function ee({user:s,msg:e}){return m("div",{className:s!==e.uid?"sentMsg msg":"receivedMsg msg",children:[o("span",{className:"timestamp",children:e.time}),e.msg]})}function te({msgGroup:s,user:e}){return m("div",{className:"messagegroup",children:[o("span",{className:"timestamp",children:s[0].day}),s.map(t=>o(ee,{msg:t,user:e}))]})}var se=(s,e,t)=>new Promise((h,c)=>{var l=r=>{try{i(t.next(r))}catch(a){c(a)}},f=r=>{try{i(t.throw(r))}catch(a){c(a)}},i=r=>r.done?h(r.value):Promise.resolve(r.value).then(l,f);i((t=t.apply(s,e)).next())});function re({chatID:s}){const[e,t]=u.exports.useState("");function h(c){return se(this,null,function*(){var l;c.preventDefault();const f=e;t(""),yield W(N(_,"chats",s,"messages"),{date:X.now(),msg:f,uid:(l=R.currentUser)==null?void 0:l.uid})})}return o("div",{className:"chat-writer",children:m("form",{onSubmit:h,children:[o("input",{type:"text",value:e,onChange:c=>t(c.target.value),placeholder:"Type your message here"}),o("button",{className:"button primary",type:"submit",children:"Send"})]})})}function ne({chatID:s,chatName:e,setOpenChatBox:t}){const[h,c]=A(s),[l,f]=u.exports.useState(!0);return u.exports.useEffect(()=>{var i;l===!0&&((i=document.getElementById("chatBottom"))==null||i.scrollIntoView({behavior:"auto"}))},[c,l]),m("div",{className:"chatbox",children:[m("div",{className:"flex-between",onClick:()=>f(i=>!i),children:[o("div",{children:e}),l&&o("div",{className:"close",onClick:()=>t(!1),children:"X"})]}),l&&m(O,{children:[m("div",{className:"chat-messages",children:[h?"Loading messages":c[0].length!==0&&c.map((i,r)=>{var a;return o(te,{user:((a=R.currentUser)==null?void 0:a.uid)||"unknown",msgGroup:i},r)}),o("div",{id:"chatBottom"})]}),o(re,{chatID:s})]})]})}const ae="/images/message-svgrepo-com.svg";var L=(s,e,t)=>new Promise((h,c)=>{var l=r=>{try{i(t.next(r))}catch(a){c(a)}},f=r=>{try{i(t.throw(r))}catch(a){c(a)}},i=r=>r.done?h(r.value):Promise.resolve(r.value).then(l,f);i((t=t.apply(s,e)).next())});function le(){const[s,e]=u.exports.useState(!1),[t,h]=u.exports.useState(!1),{timeout:c}=z(),[l,f]=u.exports.useState([]),[i,r]=u.exports.useState(""),[a,d]=u.exports.useState(""),v=u.exports.useRef(null),p=u.exports.useRef(null);function j(){return L(this,null,function*(){const n=I(N(_,"users",w,"chats")),C=yield $(n);let x=[];C.forEach(y=>{let b=y.data(),U=y.id;x.push({uid:U,chatID:b.chat_id})}),f(x)})}function E(n){return L(this,null,function*(){var C;if(!g)return;(C=v.current)==null||C.close();const x=l.find(y=>y.uid===n);if(x!==void 0)r(x.chatID),d(g.friends[n]),e(!0);else{console.log("creating new chat document");const y=P(N(_,"chats")).id;yield S(P(_,"users",w,"chats",n),{chat_id:y,users:[w,n]}),yield S(P(_,"users",n,"chats",w),{chat_id:y,users:[w,n]}),r(y),f(b=>[...b,{uid:n,chatID:y}]),d(g.friends[n]),e(!0)}})}function k(n){!g||(r(n.chatID),d(g.friends[n.uid]),e(!0))}function B(){v.current&&typeof v.current.showModal=="function"&&v.current.showModal()}function F(){p.current&&(p.current.classList.add("circle-animate"),c(()=>{var n;return(n=p.current)==null?void 0:n.classList.remove("circle-animate")},700))}function T(){t===!1?(F(),h(!0)):h(!1)}return u.exports.useEffect(()=>{r(n=>n)},[g]),u.exports.useEffect(()=>{j()},[]),g===void 0?o("div",{children:"Error"}):m(O,{children:[m("div",{id:"friends-list",children:[m("h3",{className:"align-center",onClick:T,children:[o("img",{id:"message-icon",src:ae,alt:"messages"}),o("div",{className:"circle",ref:p}),m("span",{children:["\xA0",t?"Chats":"Open Chat"]})]}),t&&m(O,{children:[o("div",{className:"highlight secondary",onClick:B,children:"New Chat"}),m("dialog",{className:"modal",ref:v,children:[o("h3",{children:"Friends"}),typeof g.friends=="object"&&Object.keys(g.friends).map((n,C)=>o("div",{className:"highlight",onClick:()=>E(n),children:g.friends[n]},C)),o("button",{value:"cancel",onClick:()=>{var n;return(n=v.current)==null?void 0:n.close()},children:"Cancel"})]}),typeof g.friends=="object"&&l.length>0&&l.map((n,C)=>o("div",{className:"highlight",onClick:()=>k(n),children:g.friends[n.uid]},C))]})]}),s&&o(ne,{chatID:i,chatName:a,setOpenChatBox:e})]})}export{le as default};