"use strict";(self.webpackChunkarticle_react=self.webpackChunkarticle_react||[]).push([[150],{795:function(e,t,n){n.r(t),n.d(t,{default:function(){return J}});var r=n(4848),a=n(6540),i=n(7767),o=n(7443),s=n(2389),l=n(6137),c=n(8749),u=n(4018),d=n(3361),f=n(3888).q.injectEndpoints({endpoints:function(e){return{getArticleRecommendationsList:e.query({query:function(e){return{url:"/articles",params:{_limit:e,_expand:"user"}}}})}}}).useGetArticleRecommendationsListQuery,h=(0,a.memo)((function(e){var t=e.className,n=(0,s.Bd)().t,a=f(3),i=a.isLoading,o=a.data,h=a.error;return i?(0,r.jsxs)(c.T,{gap:"8",maxWidth:!0,align:"center",children:[(0,r.jsx)(u.E,{width:230,height:40,border:"20px"}),(0,r.jsxs)(c.z,{gap:"16",children:[(0,r.jsx)(u.E,{width:240,height:320,border:"20px"}),(0,r.jsx)(u.E,{width:240,height:320,border:"20px"}),(0,r.jsx)(u.E,{width:240,height:320,border:"20px"})]})]}):h||!o?null:(0,r.jsxs)(c.T,{className:t,gap:"8",maxWidth:!0,align:"center",children:[(0,r.jsx)(d.E,{size:"l",title:n("Рекомендации")}),(0,r.jsx)(l.R2,{articles:o,target:"_blank"})]})})),p=function(){return p=Object.assign||function(e){for(var t,n=1,r=arguments.length;n<r;n++)for(var a in t=arguments[n])Object.prototype.hasOwnProperty.call(t,a)&&(e[a]=t[a]);return e},p.apply(this,arguments)},m=(0,a.lazy)((function(){return n.e(839).then(n.bind(n,4839))})),x=function(e){return(0,r.jsx)(a.Suspense,{fallback:(0,r.jsx)(r.Fragment,{}),children:(0,r.jsx)(m,p({},e))})},v=n(3405),g=n(3286),b=n(1468),j=n(1893),y=n(3422),w=n(5279),E=n(3513),k=n(4211),L=n(9570),S=n(1300),z=(0,a.memo)((function(e){var t=e.className,n=e.author,a=e.views,i=e.onEdit,o=(0,s.Bd)().t,l=(0,b.d4)(j.ed);return(0,r.jsxs)(c.T,{className:t,gap:"32",align:"center",children:[(0,r.jsx)(L.E,{to:(0,S.nL)(n.id),children:(0,r.jsxs)(c.z,{gap:"8",children:[(0,r.jsx)(y.e,{src:n.avatar,size:32}),(0,r.jsx)(d.E,{text:n.username,bold:!0}),(0,r.jsx)(k.I,{Svg:E.A}),(0,r.jsx)(d.E,{text:String(a)})]})}),(null==l?void 0:l.id)===n.id&&(0,r.jsx)(w.$,{onClick:i,children:o("Редактировать")})]})})),C=n(114),N=(0,a.memo)((function(){var e=(0,i.Zp)(),t=(0,b.d4)(l.xT),n=(0,a.useCallback)((function(){t&&e((0,S._3)(t.id))}),[t,e]);return t?(0,r.jsx)(C.Z,{padding:"24",border:"round",children:(0,r.jsx)(z,{onEdit:n,author:t.user,views:t.views})}):null})),T=(0,a.lazy)((function(){return n.e(2).then(n.bind(n,4002))})),D=(0,a.memo)((function(e){var t=e.className,n=e.comment;return e.isLoading?(0,r.jsxs)(C.Z,{padding:"24",max:!0,border:"partial",columnGap:"8",children:[(0,r.jsxs)(c.z,{gap:"8",children:[(0,r.jsx)(u.E,{width:30,height:30,border:"50%"}),(0,r.jsx)(u.E,{width:150,height:16,border:"12px"})]}),(0,r.jsx)(u.E,{border:"12px",height:30})]}):n?(0,r.jsxs)(C.Z,{className:t,padding:"24",border:"partial",max:!0,columnGap:"8",children:[(0,r.jsx)(L.E,{to:(0,S.nL)(n.user.id),children:(0,r.jsxs)(c.z,{gap:"8",children:[(null==n?void 0:n.user.avatar)?(0,r.jsx)(y.e,{size:30,src:n.user.avatar}):null,(0,r.jsx)(d.E,{text:null==n?void 0:n.user.username,bold:!0})]})}),(0,r.jsx)(d.E,{text:null==n?void 0:n.text})]}):null})),A=(0,a.memo)((function(e){var t=e.className,n=e.comments,a=e.isLoading,i=(0,s.Bd)("article-details").t;return a?(0,r.jsx)(c.T,{gap:"16",maxWidth:!0,className:t,children:[1,2,3,4].map((function(e){return(0,r.jsx)(D,{isLoading:!0},e)}))}):(0,r.jsx)(c.T,{gap:"16",maxWidth:!0,className:t,children:(null==n?void 0:n.length)?n.map((function(e){return(0,r.jsx)(D,{isLoading:a,comment:e},e.id)})):(0,r.jsx)(d.E,{text:i("Комментарии отсутствуют")})})})),I=n(9630),P=n(5307),W=(0,P.zD)("articleDetails/fetchCommentsByArticleId",(function(e,t){return n=void 0,r=void 0,i=function(){var n,r,a,i;return function(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(o){switch(o.label){case 0:n=t.extra,r=t.rejectWithValue,e||r("error"),o.label=1;case 1:return o.trys.push([1,3,,4]),[4,n.api.get("/comments",{params:{articleId:e,_expand:"user"}})];case 2:if(!(a=o.sent()).data)throw new Error;return[2,a.data];case 3:return i=o.sent(),console.log(i),[2,r("error")];case 4:return[2]}}))},new((a=void 0)||(a=Promise))((function(e,t){function o(e){try{l(i.next(e))}catch(e){t(e)}}function s(e){try{l(i.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(o,s)}l((i=i.apply(n,r||[])).next())}));var n,r,a,i})),_=(0,P.zD)("articleDetails/addCommentForArticle",(function(e,t){return n=void 0,r=void 0,i=function(){var n,r,a,i,o,s,c,u;return function(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(d){switch(d.label){case 0:n=t.dispatch,r=t.extra,a=t.rejectWithValue,i=t.getState,o=(0,j.ed)(i()),s=(0,l.xT)(i()),o&&e&&s||a("no data"),d.label=1;case 1:return d.trys.push([1,3,,4]),[4,r.api.post("/comments",{articleId:null==s?void 0:s.id,userId:null==o?void 0:o.id,text:e})];case 2:if(!(c=d.sent()).data)throw new Error;return n(W(null==s?void 0:s.id)),[2,c.data];case 3:return u=d.sent(),console.log(u),[2,a("error")];case 4:return[2]}}))},new((a=void 0)||(a=Promise))((function(e,t){function o(e){try{l(i.next(e))}catch(e){t(e)}}function s(e){try{l(i.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(o,s)}l((i=i.apply(n,r||[])).next())}));var n,r,a,i})),R=n(5508),Z=(0,P.pU)({selectId:function(e){return e.id}}),G={selectAll:(0,R.Mz)([function(e){var t;return null===(t=e.articleDetailsPage)||void 0===t?void 0:t.comments}],(function(e){return e?e.ids.map((function(t){return e.entities[t]})):[]}))},B=(0,P.Z0)({name:"articleDetailsCommentsSlice",initialState:Z.getInitialState({isLoading:!1,error:void 0,ids:[],entities:{}}),reducers:{},extraReducers:function(e){e.addCase(W.pending,(function(e){e.error=void 0,e.isLoading=!0})).addCase(W.fulfilled,(function(e,t){e.isLoading=!1,Z.setAll(e,t.payload)})).addCase(W.rejected,(function(e,t){e.isLoading=!1,e.error=t.payload}))}}).reducer,q=function(e){var t;return null===(t=e.articleDetailsPage)||void 0===t?void 0:t.comments.isLoading},F=(0,a.memo)((function(e){var t=e.className,n=e.id,i=(0,s.Bd)().t,o=(0,I.j)(),l=(0,b.d4)(G.selectAll),u=(0,b.d4)(q);(0,a.useEffect)((function(){o(W(n))}),[]);var f=(0,a.useCallback)((function(e){o(_(e))}),[o]);return(0,r.jsxs)(c.T,{className:t,gap:"16",maxWidth:!0,children:[(0,r.jsx)(d.E,{size:"l",title:i("Комментарии")}),(0,r.jsx)(a.Suspense,{fallback:(0,r.jsx)(r.Fragment,{}),children:(0,r.jsx)(T,{onSendComment:f})}),(0,r.jsx)(A,{isLoading:u,comments:l})]})})),O=n(4644),U=(0,P.zD)("articleDetailsPage/fetchArticleRecommendations",(function(e,t){return n=void 0,r=void 0,i=function(){var e,n,r,a;return function(e,t){var n,r,a,i,o={label:0,sent:function(){if(1&a[0])throw a[1];return a[1]},trys:[],ops:[]};return i={next:s(0),throw:s(1),return:s(2)},"function"==typeof Symbol&&(i[Symbol.iterator]=function(){return this}),i;function s(s){return function(l){return function(s){if(n)throw new TypeError("Generator is already executing.");for(;i&&(i=0,s[0]&&(o=0)),o;)try{if(n=1,r&&(a=2&s[0]?r.return:s[0]?r.throw||((a=r.return)&&a.call(r),0):r.next)&&!(a=a.call(r,s[1])).done)return a;switch(r=0,a&&(s=[2&s[0],a.value]),s[0]){case 0:case 1:a=s;break;case 4:return o.label++,{value:s[1],done:!1};case 5:o.label++,r=s[1],s=[0];continue;case 7:s=o.ops.pop(),o.trys.pop();continue;default:if(!((a=(a=o.trys).length>0&&a[a.length-1])||6!==s[0]&&2!==s[0])){o=0;continue}if(3===s[0]&&(!a||s[1]>a[0]&&s[1]<a[3])){o.label=s[1];break}if(6===s[0]&&o.label<a[1]){o.label=a[1],a=s;break}if(a&&o.label<a[2]){o.label=a[2],o.ops.push(s);break}a[2]&&o.ops.pop(),o.trys.pop();continue}s=t.call(e,o)}catch(e){s=[6,e],r=0}finally{n=a=0}if(5&s[0])throw s[1];return{value:s[0]?s[1]:void 0,done:!0}}([s,l])}}}(this,(function(i){switch(i.label){case 0:e=t.extra,n=t.rejectWithValue,i.label=1;case 1:return i.trys.push([1,3,,4]),[4,e.api.get("/articles",{params:{_limit:4}})];case 2:if(!(r=i.sent()).data)throw new Error;return[2,r.data];case 3:return a=i.sent(),console.log(a),[2,n("error")];case 4:return[2]}}))},new((a=void 0)||(a=Promise))((function(e,t){function o(e){try{l(i.next(e))}catch(e){t(e)}}function s(e){try{l(i.throw(e))}catch(e){t(e)}}function l(t){var n;t.done?e(t.value):(n=t.value,n instanceof a?n:new a((function(e){e(n)}))).then(o,s)}l((i=i.apply(n,r||[])).next())}));var n,r,a,i})),V=(0,P.pU)({selectId:function(e){return e.id}}),H=((0,R.Mz)([function(e){var t;return null===(t=e.articleDetailsPage)||void 0===t?void 0:t.recommendations}],(function(e){return e?e.ids.map((function(t){return e.entities[t]})):[]})),(0,P.Z0)({name:"articleDetailsPageRecommendationsSlice",initialState:V.getInitialState({isLoading:!1,error:void 0,ids:[],entities:{}}),reducers:{},extraReducers:function(e){e.addCase(U.pending,(function(e){e.error=void 0,e.isLoading=!0})).addCase(U.fulfilled,(function(e,t){e.isLoading=!1,V.setAll(e,t.payload)})).addCase(U.rejected,(function(e,t){e.isLoading=!1,e.error=t.payload}))}}).reducer),M=(0,O.HY)({recommendations:H,comments:B}),Y=(0,a.memo)((function(e){var t=e.className,n=(0,i.g)().id;return(0,r.jsx)(C.Z,{border:"partial",className:t,padding:"24",children:(0,r.jsx)(l.LT,{id:n})})})),Q={articleDetailsPage:M},$=function(e){var t=e.className,n=(0,i.g)().id;return n?(0,r.jsx)(g.H,{reducers:Q,removeAfterUnmount:!0,children:(0,r.jsx)(v.s,{content:(0,r.jsx)(o.Y,{className:t,children:(0,r.jsxs)(c.T,{gap:"24",children:[(0,r.jsx)(Y,{}),(0,r.jsx)(x,{articleId:n}),(0,r.jsx)(h,{}),(0,r.jsx)(F,{id:n})]})}),right:(0,r.jsx)(N,{})})}):null},J=(0,a.memo)($)}}]);