import{y as h,G as b,A as D,z as k,B as N,D as y,H as w,I as _,J as C}from"./firestore.464e6c78.js";import{r,a as t,e as M,j as l,p as f,F as S}from"./index.644dba97.js";import{u as A,a as E}from"./userData.a8495361.js";function P({callback:e,noMorePosts:s}){const n=r.exports.useRef(null),{debounce:i,cancel:a}=A();return r.exports.useEffect(()=>{const o=u=>{u.forEach(c=>{c.isIntersecting?i(e,600):a()})},m=new IntersectionObserver(o,{threshold:[0,1]});return m.observe(n.current),()=>m.disconnect()},[e]),t("div",{ref:n,children:s?"No more posts!":"Loading more posts"})}function T(e){if(!(e instanceof h)&&!(e instanceof Date))return"incorrect format";let s,n;const i=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],a=new Date;return e instanceof h?s=e.toDate():s=e,a.getTime()-s.getTime()<24*3600*1e3?n=s.toTimeString().slice(0,5):a.getTime()-s.getTime()<7*24*3600*1e3?n=i[s.getDay()]:n=s.toDateString(),n}const q="/social/assets/dots.96c43f22.svg",L="_delete_menu_okqca_1",F="_show_delete_okqca_23",p={delete_menu:L,delete:"_delete_okqca_1",show_delete:F};function x(e,s){function n(o){e&&!e.contains(o.target)&&(a(),s())}function i(){e&&window.addEventListener("click",n)}function a(){window.removeEventListener("click",n)}return r.exports.useEffect(()=>a,[]),{unsubscribe:a,activateClickAwayListener:i}}function I({post:e}){const s=E(a=>a.userData),n=T(e.date),{myID:i}=M();return l("div",{className:"post",children:[l("div",{className:"post-title",children:[t("span",{children:e.uid===i?"Me":s&&s.friends[e.uid]}),l("div",{children:[n,t(R,{id:e.id})]})]}),l("div",{className:"post-body",children:[e.images&&t("div",{children:e.images.map((a,o)=>t("img",{alt:e.date.toString()+o.toString(),className:"post-img",src:a},o))}),e.body]})]})}function R({id:e}){const[s,n]=r.exports.useState(!1),i=r.exports.useRef(null),{activateClickAwayListener:a}=x(i.current,()=>n(!1));function o(){n(!0),requestAnimationFrame(a)}return l("span",{className:p.delete_menu,ref:i,children:[t("img",{src:q,alt:"edit post",onClick:o}),s&&t(j,{id:e})]})}function j({id:e}){const[s,n]=r.exports.useState(!1),i=r.exports.useRef(null),{activateClickAwayListener:a}=x(i.current,()=>n(!1));function o(){n(!0),requestAnimationFrame(a)}function m(){b(D(f,e))}return l("div",{className:p.delete,children:[t("span",{onClick:o,children:"Delete"}),t("div",{ref:i,onClick:m,className:s?p.show_delete:"",children:"Confirm Delete"})]})}function O(){return r.exports.useEffect(()=>{const e=Array.from(document.getElementsByClassName("skeleton-animate"));return e.forEach(s=>{s.style.width=Math.random()*30+20+"%",s.style.animation=`stretch ${Math.random()*100+500}ms -${Math.random()}s infinite`}),()=>{e.forEach(s=>s.style.animation="none")}},[]),l(S,{children:[l("div",{className:"post",children:[l("div",{className:"post-title",children:[t("span",{className:"skeleton-text"}),t("span",{className:"skeleton-text"})]}),l("div",{className:"post-body",children:[t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{})]})]}),l("div",{className:"post",children:[l("div",{className:"post-title",children:[t("span",{className:"skeleton-text"}),t("span",{className:"skeleton-text"})]}),l("div",{className:"post-body",children:[t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{})]})]}),l("div",{className:"post",children:[l("div",{className:"post-title",children:[t("span",{className:"skeleton-text"}),t("span",{className:"skeleton-text"})]}),l("div",{className:"post-body",children:[t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{}),t("span",{className:"skeleton-text skeleton-animate"}),t("br",{})]})]})]})}const v=5;function z(){const[e,s]=r.exports.useState([]),[n,i]=r.exports.useState(!1);r.exports.useEffect(()=>{const o=k(f,y("date","desc"),N(v));return w(o,u=>{e.length===0?s(u.docs.map(c=>({...c.data(),id:c.id}))):u.docChanges().forEach(c=>{c.type==="added"?s(d=>[{...c.doc.data(),id:c.doc.id},...d]):c.type==="removed"&&s(d=>d.filter(g=>g.id!==c.doc.id))})})},[]);const a=r.exports.useCallback(async()=>{console.log("loading");const o=e[e.length-1].date,m=k(f,y("date","desc"),_(o),N(v)),c=(await C(m)).docs.map(d=>({...d.data(),id:d.id}));c.length>0?s(d=>[...d,...c]):i(!0)},[e.length]);return l("div",{children:[e.length===0&&t(O,{}),e.map(o=>t(I,{post:o},o.id)),e.length>0&&t(P,{callback:a,noMorePosts:n},e.length)]})}export{z as default};
