import{v as m,bK as O,r as _,av as H,w as J,ah as B,bC as U,x as z,bS as V,y as W,bT as X,bU as $,P as E,n as R}from"./index-CBOPitKI.js";var G=Math.PI*2,I=E.CMD,N=["top","right","bottom","left"];function rr(e,n,o,r,v){var f=o.width,s=o.height;switch(e){case"top":r.set(o.x+f/2,o.y-n),v.set(0,-1);break;case"bottom":r.set(o.x+f/2,o.y+s+n),v.set(0,1);break;case"left":r.set(o.x-n,o.y+s/2),v.set(-1,0);break;case"right":r.set(o.x+f+n,o.y+s/2),v.set(1,0);break}}function ar(e,n,o,r,v,f,s,i,u){s-=e,i-=n;var h=Math.sqrt(s*s+i*i);s/=h,i/=h;var a=s*o+e,c=i*o+n;if(Math.abs(r-v)%G<1e-4)return u[0]=a,u[1]=c,h-o;if(f){var M=r;r=R(v),v=R(M)}else r=R(r),v=R(v);r>v&&(v+=G);var t=Math.atan2(i,s);if(t<0&&(t+=G),t>=r&&t<=v||t+G>=r&&t+G<=v)return u[0]=a,u[1]=c,h-o;var x=o*Math.cos(r)+e,b=o*Math.sin(r)+n,p=o*Math.cos(v)+e,S=o*Math.sin(v)+n,k=(x-s)*(x-s)+(b-i)*(b-i),w=(p-s)*(p-s)+(S-i)*(S-i);return k<w?(u[0]=x,u[1]=b,Math.sqrt(k)):(u[0]=p,u[1]=S,Math.sqrt(w))}function q(e,n,o,r,v,f,s,i){var u=v-e,h=f-n,a=o-e,c=r-n,M=Math.sqrt(a*a+c*c);a/=M,c/=M;var t=u*a+h*c,x=t/M;i&&(x=Math.min(Math.max(x,0),1)),x*=M;var b=s[0]=e+x*a,p=s[1]=n+x*c;return Math.sqrt((b-v)*(b-v)+(p-f)*(p-f))}function K(e,n,o,r,v,f,s){o<0&&(e=e+o,o=-o),r<0&&(n=n+r,r=-r);var i=e+o,u=n+r,h=s[0]=Math.min(Math.max(v,e),i),a=s[1]=Math.min(Math.max(f,n),u);return Math.sqrt((h-v)*(h-v)+(a-f)*(a-f))}var T=[];function er(e,n,o){var r=K(n.x,n.y,n.width,n.height,e.x,e.y,T);return o.set(T[0],T[1]),r}function vr(e,n,o){for(var r=0,v=0,f=0,s=0,i,u,h=1/0,a=n.data,c=e.x,M=e.y,t=0;t<a.length;){var x=a[t++];t===1&&(r=a[t],v=a[t+1],f=r,s=v);var b=h;switch(x){case I.M:f=a[t++],s=a[t++],r=f,v=s;break;case I.L:b=q(r,v,a[t],a[t+1],c,M,T,!0),r=a[t++],v=a[t++];break;case I.C:b=$(r,v,a[t++],a[t++],a[t++],a[t++],a[t],a[t+1],c,M,T),r=a[t++],v=a[t++];break;case I.Q:b=X(r,v,a[t++],a[t++],a[t],a[t+1],c,M,T),r=a[t++],v=a[t++];break;case I.A:var p=a[t++],S=a[t++],k=a[t++],w=a[t++],j=a[t++],A=a[t++];t+=1;var Q=!!(1-a[t++]);i=Math.cos(j)*k+p,u=Math.sin(j)*w+S,t<=1&&(f=i,s=u);var Y=(c-p)*w/k+p;b=ar(p,S,w,j,j+A,Q,Y,M,T),r=Math.cos(j+A)*k+p,v=Math.sin(j+A)*w+S;break;case I.R:f=r=a[t++],s=v=a[t++];var Z=a[t++],F=a[t++];b=K(f,s,Z,F,c,M,T);break;case I.Z:b=q(r,v,f,s,c,M,T,!0),r=f,v=s;break}b<h&&(h=b,o.set(T[0],T[1]))}return h}var L=new m,y=new m,l=new m,d=new m,P=new m;function sr(e,n){if(e){var o=e.getTextGuideLine(),r=e.getTextContent();if(r&&o){var v=e.textGuideLineConfig||{},f=[[0,0],[0,0],[0,0]],s=v.candidates||N,i=r.getBoundingRect().clone();i.applyTransform(r.getComputedTransform());var u=1/0,h=v.anchor,a=e.getComputedTransform(),c=a&&V([],a),M=n.get("length2")||0;h&&l.copy(h);for(var t=0;t<s.length;t++){var x=s[t];rr(x,0,i,L,d),m.scaleAndAdd(y,L,d,M),y.transform(c);var b=e.getBoundingRect(),p=h?h.distance(y):e instanceof W?vr(y,e.path,l):er(y,b,l);p<u&&(u=p,y.transform(a),l.transform(a),l.toArray(f[0]),y.toArray(f[1]),L.toArray(f[2]))}or(f,n.get("minTurnAngle")),o.setShape({points:f})}}}var g=[],C=new m;function or(e,n){if(n<=180&&n>0){n=n/180*Math.PI,L.fromArray(e[0]),y.fromArray(e[1]),l.fromArray(e[2]),m.sub(d,L,y),m.sub(P,l,y);var o=d.len(),r=P.len();if(!(o<.001||r<.001)){d.scale(1/o),P.scale(1/r);var v=d.dot(P),f=Math.cos(n);if(f<v){var s=q(y.x,y.y,l.x,l.y,L.x,L.y,g,!1);C.fromArray(g),C.scaleAndAdd(P,s/Math.tan(Math.PI-n));var i=l.x!==y.x?(C.x-y.x)/(l.x-y.x):(C.y-y.y)/(l.y-y.y);if(isNaN(i))return;i<0?m.copy(C,y):i>1&&m.copy(C,l),C.toArray(e[1])}}}}function fr(e,n,o){if(o<=180&&o>0){o=o/180*Math.PI,L.fromArray(e[0]),y.fromArray(e[1]),l.fromArray(e[2]),m.sub(d,y,L),m.sub(P,l,y);var r=d.len(),v=P.len();if(!(r<.001||v<.001)){d.scale(1/r),P.scale(1/v);var f=d.dot(n),s=Math.cos(o);if(f<s){var i=q(y.x,y.y,l.x,l.y,L.x,L.y,g,!1);C.fromArray(g);var u=Math.PI/2,h=Math.acos(P.dot(n)),a=u+h-o;if(a>=u)m.copy(C,l);else{C.scaleAndAdd(P,i/Math.tan(Math.PI/2-a));var c=l.x!==y.x?(C.x-y.x)/(l.x-y.x):(C.y-y.y)/(l.y-y.y);if(isNaN(c))return;c<0?m.copy(C,y):c>1&&m.copy(C,l)}C.toArray(e[1])}}}}function D(e,n,o,r){var v=o==="normal",f=v?e:e.ensureState(o);f.ignore=n;var s=r.get("smooth");s&&s===!0&&(s=.3),f.shape=f.shape||{},s>0&&(f.shape.smooth=s);var i=r.getModel("lineStyle").getLineStyle();v?e.useStyle(i):f.style=i}function tr(e,n){var o=n.smooth,r=n.points;if(r)if(e.moveTo(r[0][0],r[0][1]),o>0&&r.length>=3){var v=U(r[0],r[1]),f=U(r[1],r[2]);if(!v||!f){e.lineTo(r[1][0],r[1][1]),e.lineTo(r[2][0],r[2][1]);return}var s=Math.min(v,f)*o,i=z([],r[1],r[0],s/v),u=z([],r[1],r[2],s/f),h=z([],i,u,.5);e.bezierCurveTo(i[0],i[1],i[0],i[1],h[0],h[1]),e.bezierCurveTo(u[0],u[1],u[0],u[1],r[2][0],r[2][1])}else for(var a=1;a<r.length;a++)e.lineTo(r[a][0],r[a][1])}function ir(e,n,o){var r=e.getTextGuideLine(),v=e.getTextContent();if(!v){r&&e.removeTextGuideLine();return}for(var f=n.normal,s=f.get("show"),i=v.ignore,u=0;u<O.length;u++){var h=O[u],a=n[h],c=h==="normal";if(a){var M=a.get("show"),t=c?i:_(v.states[h]&&v.states[h].ignore,i);if(t||!_(M,s)){var x=c?r:r&&r.states[h];x&&(x.ignore=!0),r&&D(r,!0,h,a);continue}r||(r=new H,e.setTextGuideLine(r),!c&&(i||!s)&&D(r,!0,"normal",n.normal),e.stateProxy&&(r.stateProxy=e.stateProxy)),D(r,!1,h,a)}}if(r){J(r.style,o),r.style.fill=null;var b=f.get("showAbove"),p=e.textGuideLineConfig=e.textGuideLineConfig||{};p.showAbove=b||!1,r.buildPath=tr}}function hr(e,n){n=n||"labelLine";for(var o={normal:e.getModel(n)},r=0;r<B.length;r++){var v=B[r];o[v]=e.getModel([v,n])}return o}export{fr as a,hr as g,or as l,ir as s,sr as u};
