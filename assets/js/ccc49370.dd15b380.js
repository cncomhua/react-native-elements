"use strict";(self.webpackChunkrne_website=self.webpackChunkrne_website||[]).push([[46103],{65203:(e,n,t)=>{t.r(n),t.d(n,{default:()=>h});var a=t(67294),r=t(86010),l=t(10833),o=t(35281),i=t(9460),c=t(39058),s=t(30390),m=t(87462),u=t(95999),d=t(32244);function v(e){var n=e.nextItem,t=e.prevItem;return a.createElement("nav",{className:"pagination-nav docusaurus-mt-lg","aria-label":(0,u.I)({id:"theme.blog.post.paginator.navAriaLabel",message:"Blog post page navigation",description:"The ARIA label for the blog posts pagination"})},t&&a.createElement(d.Z,(0,m.Z)({},t,{subLabel:a.createElement(u.Z,{id:"theme.blog.post.paginator.newerPost",description:"The blog post button label to navigate to the newer/previous post"},"Newer Post")})),n&&a.createElement(d.Z,(0,m.Z)({},n,{subLabel:a.createElement(u.Z,{id:"theme.blog.post.paginator.olderPost",description:"The blog post button label to navigate to the older/next post"},"Older Post"),isNext:!0})))}function f(){var e,n=(0,i.C)(),t=n.assets,r=n.metadata,o=r.title,c=r.description,s=r.date,m=r.tags,u=r.authors,d=r.frontMatter,v=d.keywords,f=null!=(e=t.image)?e:d.image;return a.createElement(l.d,{title:o,description:c,keywords:v,image:f},a.createElement("meta",{property:"og:type",content:"article"}),a.createElement("meta",{property:"article:published_time",content:s}),u.some((function(e){return e.url}))&&a.createElement("meta",{property:"article:author",content:u.map((function(e){return e.url})).filter(Boolean).join(",")}),m.length>0&&a.createElement("meta",{property:"article:tag",content:m.map((function(e){return e.label})).join(",")}))}var g=t(39407);function p(e){var n=e.sidebar,t=e.children,r=(0,i.C)(),l=r.metadata,o=r.toc,m=l.nextItem,u=l.prevItem,d=l.frontMatter,f=d.hide_table_of_contents,p=d.toc_min_heading_level,h=d.toc_max_heading_level;return a.createElement(c.Z,{sidebar:n,toc:!f&&o.length>0?a.createElement(g.Z,{toc:o,minHeadingLevel:p,maxHeadingLevel:h}):void 0},a.createElement(s.Z,null,t),(m||u)&&a.createElement(v,{nextItem:m,prevItem:u}))}function h(e){var n=e.content;return a.createElement(i.n,{content:e.content,isBlogPostPage:!0},a.createElement(l.FG,{className:(0,r.Z)(o.k.wrapper.blogPages,o.k.page.blogPostPage)},a.createElement(f,null),a.createElement(p,{sidebar:e.sidebar},a.createElement(n,null))))}},39407:(e,n,t)=>{t.d(n,{Z:()=>m});var a=t(87462),r=t(63366),l=t(67294),o=t(86010),i=t(93743);const c="tableOfContents_bqdL";var s=["className"];function m(e){var n=e.className,t=(0,r.Z)(e,s);return l.createElement("div",{className:(0,o.Z)(c,"thin-scrollbar",n)},l.createElement(i.Z,(0,a.Z)({},t,{linkClassName:"table-of-contents__link toc-highlight",linkActiveClassName:"table-of-contents__link--active"})))}},93743:(e,n,t)=>{t.d(n,{Z:()=>h});var a=t(87462),r=t(63366),l=t(67294),o=t(86668),i=["parentIndex"];function c(e){var n=e.map((function(e){return Object.assign({},e,{parentIndex:-1,children:[]})})),t=Array(7).fill(-1);n.forEach((function(e,n){var a=t.slice(2,e.level);e.parentIndex=Math.max.apply(Math,a),t[e.level]=n}));var a=[];return n.forEach((function(e){var t=e.parentIndex,l=(0,r.Z)(e,i);t>=0?n[t].children.push(l):a.push(l)})),a}function s(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return n.flatMap((function(e){var n=s({toc:e.children,minHeadingLevel:t,maxHeadingLevel:a});return function(e){return e.level>=t&&e.level<=a}(e)?[Object.assign({},e,{children:n})]:n}))}function m(e){var n=e.getBoundingClientRect();return n.top===n.bottom?m(e.parentNode):n}function u(e,n){var t,a,r=n.anchorTopOffset,l=e.find((function(e){return m(e).top>=r}));return l?function(e){return e.top>0&&e.bottom<window.innerHeight/2}(m(l))?l:null!=(a=e[e.indexOf(l)-1])?a:null:null!=(t=e[e.length-1])?t:null}function d(){var e=(0,l.useRef)(0),n=(0,o.L)().navbar.hideOnScroll;return(0,l.useEffect)((function(){e.current=n?0:document.querySelector(".navbar").clientHeight}),[n]),e}function v(e){var n=(0,l.useRef)(void 0),t=d();(0,l.useEffect)((function(){if(!e)return function(){};var a=e.linkClassName,r=e.linkActiveClassName,l=e.minHeadingLevel,o=e.maxHeadingLevel;function i(){var e=function(e){return Array.from(document.getElementsByClassName(e))}(a),i=function(e){for(var n=e.minHeadingLevel,t=e.maxHeadingLevel,a=[],r=n;r<=t;r+=1)a.push("h"+r+".anchor");return Array.from(document.querySelectorAll(a.join()))}({minHeadingLevel:l,maxHeadingLevel:o}),c=u(i,{anchorTopOffset:t.current}),s=e.find((function(e){return c&&c.id===function(e){return decodeURIComponent(e.href.substring(e.href.indexOf("#")+1))}(e)}));e.forEach((function(e){!function(e,t){t?(n.current&&n.current!==e&&n.current.classList.remove(r),e.classList.add(r),n.current=e):e.classList.remove(r)}(e,e===s)}))}return document.addEventListener("scroll",i),document.addEventListener("resize",i),i(),function(){document.removeEventListener("scroll",i),document.removeEventListener("resize",i)}}),[e,t])}function f(e){var n=e.toc,t=e.className,a=e.linkClassName,r=e.isChild;return n.length?l.createElement("ul",{className:r?void 0:t},n.map((function(e){return l.createElement("li",{key:e.id},l.createElement("a",{href:"#"+e.id,className:null!=a?a:void 0,dangerouslySetInnerHTML:{__html:e.value}}),l.createElement(f,{isChild:!0,toc:e.children,className:t,linkClassName:a}))}))):null}const g=l.memo(f);var p=["toc","className","linkClassName","linkActiveClassName","minHeadingLevel","maxHeadingLevel"];function h(e){var n=e.toc,t=e.className,i=void 0===t?"table-of-contents table-of-contents__left-border":t,m=e.linkClassName,u=void 0===m?"table-of-contents__link":m,d=e.linkActiveClassName,f=void 0===d?void 0:d,h=e.minHeadingLevel,b=e.maxHeadingLevel,E=(0,r.Z)(e,p),L=(0,o.L)(),C=null!=h?h:L.tableOfContents.minHeadingLevel,N=null!=b?b:L.tableOfContents.maxHeadingLevel,_=function(e){var n=e.toc,t=e.minHeadingLevel,a=e.maxHeadingLevel;return(0,l.useMemo)((function(){return s({toc:c(n),minHeadingLevel:t,maxHeadingLevel:a})}),[n,t,a])}({toc:n,minHeadingLevel:C,maxHeadingLevel:N});return v((0,l.useMemo)((function(){if(u&&f)return{linkClassName:u,linkActiveClassName:f,minHeadingLevel:C,maxHeadingLevel:N}}),[u,f,C,N])),l.createElement(g,(0,a.Z)({toc:_,className:i,linkClassName:u},E))}},22365:(e,n,t)=>{t.d(n,{Z:()=>N});var a=t(87462),r=t(63366),l=t(67294),o=t(10407),i=t(86010),c=(t(95999),t(52263)),s=t(91262),m=t(66412);const u="playgroundContainer_TGbA",d="playgroundEditor_PvJ1",v="playgroundPreview_bb8I",f="toggleIcon_OnrQ",g="showCode_O0Od";var p=t(72389),h=t(5434),b=["children","transformCode"];function E(){return l.createElement("div",null,"Loading...")}function L(){var e=(0,p.Z)();return l.createElement(o.uz,{key:String(e),className:d})}function C(e){var n=e.show_code,t=(e.openInSnack,l.useState(n)),a=t[0],r=t[1],c=function(){r((function(e){return!e}))};return l.createElement(l.Fragment,null,l.createElement("div",{className:v},l.createElement(s.Z,{fallback:l.createElement(E,null)},(function(){return l.createElement(l.Fragment,null,l.createElement(o.i5,null),l.createElement(o.IF,null),l.createElement("div",{className:(0,i.Z)(f),onClick:c},l.createElement(h.xoN,null),l.createElement("span",{className:g},a?"Hide":"Show"," Code")))}))),a&&l.createElement(L,null))}function N(e){var n=e.children,t=e.transformCode,i=(0,r.Z)(e,b),s=((0,c.Z)().siteConfig.themeConfig.liveCodeBlock.playgroundPosition,(0,m.p)());return l.createElement("div",{className:u},l.createElement(o.nu,(0,a.Z)({code:n.replace(/\n$/,""),transformCode:t||function(e){return e},theme:s},i),l.createElement(C,{show_code:i.show_code})))}},56922:(e,n,t)=>{t.d(n,{Z:()=>c});var a=t(67294),r=t(32408),l=t(13925),o=t(77321),i=t(83279);const c=Object.assign({React:a,LinearGradient:i.Z},r,l,o,a)}}]);