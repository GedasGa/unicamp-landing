"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[61],{46387:function(t,r,e){var n=e(74610),o=e(1119),a=e(2265),i=e(61994),l=e(20443),s=e(20801),p=e(16210),u=e(37053),h=e(85657),c=e(56200),f=e(57437);let y=["align","className","component","gutterBottom","noWrap","paragraph","variant","variantMapping"],m=t=>{let{align:r,gutterBottom:e,noWrap:n,paragraph:o,variant:a,classes:i}=t,l={root:["root",a,"inherit"!==t.align&&"align".concat((0,h.Z)(r)),e&&"gutterBottom",n&&"noWrap",o&&"paragraph"]};return(0,s.Z)(l,c.f,i)},g=(0,p.ZP)("span",{name:"MuiTypography",slot:"Root",overridesResolver:(t,r)=>{let{ownerState:e}=t;return[r.root,e.variant&&r[e.variant],"inherit"!==e.align&&r["align".concat((0,h.Z)(e.align))],e.noWrap&&r.noWrap,e.gutterBottom&&r.gutterBottom,e.paragraph&&r.paragraph]}})(t=>{let{theme:r,ownerState:e}=t;return(0,o.Z)({margin:0},"inherit"===e.variant&&{font:"inherit"},"inherit"!==e.variant&&r.typography[e.variant],"inherit"!==e.align&&{textAlign:e.align},e.noWrap&&{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap"},e.gutterBottom&&{marginBottom:"0.35em"},e.paragraph&&{marginBottom:16})}),v={h1:"h1",h2:"h2",h3:"h3",h4:"h4",h5:"h5",h6:"h6",subtitle1:"h6",subtitle2:"h6",body1:"p",body2:"p",inherit:"p"},Z={primary:"primary.main",textPrimary:"text.primary",secondary:"secondary.main",textSecondary:"text.secondary",error:"error.main"},d=t=>Z[t]||t,w=a.forwardRef(function(t,r){let e=(0,u.i)({props:t,name:"MuiTypography"}),a=d(e.color),s=(0,l.Z)((0,o.Z)({},e,{color:a})),{align:p="inherit",className:h,component:c,gutterBottom:Z=!1,noWrap:w=!1,paragraph:b=!1,variant:_="body1",variantMapping:A=v}=s,x=(0,n.Z)(s,y),k=(0,o.Z)({},s,{align:p,color:a,className:h,component:c,gutterBottom:Z,noWrap:w,paragraph:b,variant:_,variantMapping:A}),S=c||(b?"p":A[_]||v[_])||"span",R=m(k);return(0,f.jsx)(g,(0,o.Z)({as:S,ref:r,ownerState:k,className:(0,i.Z)(R.root,h)},x))});r.Z=w},56200:function(t,r,e){e.d(r,{f:function(){return a}});var n=e(94143),o=e(50738);function a(t){return(0,o.ZP)("MuiTypography",t)}let i=(0,n.Z)("MuiTypography",["root","h1","h2","h3","h4","h5","h6","subtitle1","subtitle2","body1","body2","inherit","button","caption","overline","alignLeft","alignRight","alignCenter","alignJustify","noWrap","gutterBottom","paragraph"]);r.Z=i},92193:function(t,r,e){e.d(r,{Z:function(){return v}});var n=e(1119),o=e(74610),a=e(42965),i=e(87354),l=e(1570),s=e(41823);let p=["ownerState"],u=["variants"],h=["name","slot","skipVariantsResolver","skipSx","overridesResolver"];function c(t){return"ownerState"!==t&&"theme"!==t&&"sx"!==t&&"as"!==t}let f=(0,l.Z)(),y=t=>t?t.charAt(0).toLowerCase()+t.slice(1):t;function m(t){let{defaultTheme:r,theme:e,themeId:n}=t;return 0===Object.keys(e).length?r:e[n]||e}function g(t,r){let{ownerState:e}=r,a=(0,o.Z)(r,p),i="function"==typeof t?t((0,n.Z)({ownerState:e},a)):t;if(Array.isArray(i))return i.flatMap(t=>g(t,(0,n.Z)({ownerState:e},a)));if(i&&"object"==typeof i&&Array.isArray(i.variants)){let{variants:t=[]}=i,r=(0,o.Z)(i,u);return t.forEach(t=>{let o=!0;"function"==typeof t.props?o=t.props((0,n.Z)({ownerState:e},a,e)):Object.keys(t.props).forEach(r=>{(null==e?void 0:e[r])!==t.props[r]&&a[r]!==t.props[r]&&(o=!1)}),o&&(Array.isArray(r)||(r=[r]),r.push("function"==typeof t.style?t.style((0,n.Z)({ownerState:e},a,e)):t.style))}),r}return i}var v=function(){let t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},{themeId:r,defaultTheme:e=f,rootShouldForwardProp:l=c,slotShouldForwardProp:p=c}=t,u=t=>(0,s.Z)((0,n.Z)({},t,{theme:m((0,n.Z)({},t,{defaultTheme:e,themeId:r}))}));return u.__mui_systemSx=!0,function(t){var s;let f,v=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};(0,a.internal_processStyles)(t,t=>t.filter(t=>!(null!=t&&t.__mui_systemSx)));let{name:Z,slot:d,skipVariantsResolver:w,skipSx:b,overridesResolver:_=(s=y(d))?(t,r)=>r[s]:null}=v,A=(0,o.Z)(v,h),x=void 0!==w?w:d&&"Root"!==d&&"root"!==d||!1,k=b||!1,S=c;"Root"===d||"root"===d?S=l:d?S=p:"string"==typeof t&&t.charCodeAt(0)>96&&(S=void 0);let R=(0,a.default)(t,(0,n.Z)({shouldForwardProp:S,label:f},A)),B=t=>"function"==typeof t&&t.__emotion_real!==t||(0,i.P)(t)?o=>g(t,(0,n.Z)({},o,{theme:m({theme:o.theme,defaultTheme:e,themeId:r})})):t,C=function(o){for(var a=arguments.length,i=Array(a>1?a-1:0),l=1;l<a;l++)i[l-1]=arguments[l];let s=B(o),p=i?i.map(B):[];Z&&_&&p.push(t=>{let o=m((0,n.Z)({},t,{defaultTheme:e,themeId:r}));if(!o.components||!o.components[Z]||!o.components[Z].styleOverrides)return null;let a=o.components[Z].styleOverrides,i={};return Object.entries(a).forEach(r=>{let[e,a]=r;i[e]=g(a,(0,n.Z)({},t,{theme:o}))}),_(t,i)}),Z&&!x&&p.push(t=>{var o;let a=m((0,n.Z)({},t,{defaultTheme:e,themeId:r}));return g({variants:null==a||null==(o=a.components)||null==(o=o[Z])?void 0:o.variants},(0,n.Z)({},t,{theme:a}))}),k||p.push(u);let h=p.length-i.length;if(Array.isArray(o)&&h>0){let t=Array(h).fill("");(s=[...o,...t]).raw=[...o.raw,...t]}let c=R(s,...p);return t.muiName&&(c.muiName=t.muiName),c};return R.withConfig&&(C.withConfig=R.withConfig),C}}()},20956:function(t,r,e){e.d(r,{Z:function(){return a}});var n=e(93826),o=e(21911);function a(t){let{props:r,name:e,defaultTheme:a,themeId:i}=t,l=(0,o.Z)(a);return i&&(l=l[i]||l),(0,n.Z)({theme:l,name:e,props:r})}}}]);