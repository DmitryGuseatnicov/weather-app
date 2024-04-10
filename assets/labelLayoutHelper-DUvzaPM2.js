import{e4 as z,B as H}from"./index-CBOPitKI.js";function B(e){return e==null?0:e.length||1}function $(e){return e}var J=function(){function e(t,u,a,o,n,r){this._old=t,this._new=u,this._oldKeyGetter=a||$,this._newKeyGetter=o||$,this.context=n,this._diffModeMultiple=r==="multiple"}return e.prototype.add=function(t){return this._add=t,this},e.prototype.update=function(t){return this._update=t,this},e.prototype.updateManyToOne=function(t){return this._updateManyToOne=t,this},e.prototype.updateOneToMany=function(t){return this._updateOneToMany=t,this},e.prototype.updateManyToMany=function(t){return this._updateManyToMany=t,this},e.prototype.remove=function(t){return this._remove=t,this},e.prototype.execute=function(){this[this._diffModeMultiple?"_executeMultiple":"_executeOneToOne"]()},e.prototype._executeOneToOne=function(){var t=this._old,u=this._new,a={},o=new Array(t.length),n=new Array(u.length);this._initIndexMap(t,null,o,"_oldKeyGetter"),this._initIndexMap(u,a,n,"_newKeyGetter");for(var r=0;r<t.length;r++){var h=o[r],i=a[h],f=B(i);if(f>1){var c=i.shift();i.length===1&&(a[h]=i[0]),this._update&&this._update(c,r)}else f===1?(a[h]=null,this._update&&this._update(i,r)):this._remove&&this._remove(r)}this._performRestAdd(n,a)},e.prototype._executeMultiple=function(){var t=this._old,u=this._new,a={},o={},n=[],r=[];this._initIndexMap(t,a,n,"_oldKeyGetter"),this._initIndexMap(u,o,r,"_newKeyGetter");for(var h=0;h<n.length;h++){var i=n[h],f=a[i],c=o[i],p=B(f),O=B(c);if(p>1&&O===1)this._updateManyToOne&&this._updateManyToOne(c,f),o[i]=null;else if(p===1&&O>1)this._updateOneToMany&&this._updateOneToMany(c,f),o[i]=null;else if(p===1&&O===1)this._update&&this._update(c,f),o[i]=null;else if(p>1&&O>1)this._updateManyToMany&&this._updateManyToMany(c,f),o[i]=null;else if(p>1)for(var d=0;d<p;d++)this._remove&&this._remove(f[d]);else this._remove&&this._remove(f)}this._performRestAdd(r,o)},e.prototype._performRestAdd=function(t,u){for(var a=0;a<t.length;a++){var o=t[a],n=u[o],r=B(n);if(r>1)for(var h=0;h<r;h++)this._add&&this._add(n[h]);else r===1&&this._add&&this._add(n);u[o]=null}},e.prototype._initIndexMap=function(t,u,a,o){for(var n=this._diffModeMultiple,r=0;r<t.length;r++){var h="_ec_"+this[o](t[r],r);if(n||(a[r]=h),!!u){var i=u[h],f=B(i);f===0?(u[h]=r,n&&a.push(h)):f===1?u[h]=[i,r]:i.push(r)}}},e}();const U=J;function Z(e){for(var t=[],u=0;u<e.length;u++){var a=e[u];if(!a.defaultAttr.ignore){var o=a.label,n=o.getComputedTransform(),r=o.getBoundingRect(),h=!n||n[1]<1e-5&&n[2]<1e-5,i=o.style.margin||0,f=r.clone();f.applyTransform(n),f.x-=i/2,f.y-=i/2,f.width+=i,f.height+=i;var c=h?new z(r,n):null;t.push({label:o,labelLine:a.labelLine,rect:f,localRect:r,obb:c,priority:a.priority,defaultAttr:a.defaultAttr,layoutOption:a.computedLayoutOption,axisAligned:h,transform:n})}}return t}function b(e,t,u,a,o,n){var r=e.length;if(r<2)return;e.sort(function(s,A){return s.rect[t]-A.rect[t]});for(var h=0,i,f=!1,c=0,p=0;p<r;p++){var O=e[p],d=O.rect;i=d[t]-h,i<0&&(d[t]-=i,O.label[t]-=i,f=!0);var g=Math.max(-i,0);c+=g,h=d[t]+d[u]}c>0&&n&&q(-c/r,0,r);var G=e[0],l=e[r-1],M,T;P(),M<0&&E(-M,.8),T<0&&E(T,.8),P(),S(M,T,1),S(T,M,-1),P(),M<0&&W(-M),T<0&&W(T);function P(){M=G.rect[t]-a,T=o-l.rect[t]-l.rect[u]}function S(s,A,y){if(s<0){var _=Math.min(A,-s);if(_>0){q(_*y,0,r);var v=_+s;v<0&&E(-v*y,1)}else E(-s*y,1)}}function q(s,A,y){s!==0&&(f=!0);for(var _=A;_<y;_++){var v=e[_],K=v.rect;K[t]+=s,v.label[t]+=s}}function E(s,A){for(var y=[],_=0,v=1;v<r;v++){var K=e[v-1].rect,X=Math.max(e[v].rect[t]-K[t]-K[u],0);y.push(X),_+=X}if(_){var Y=Math.min(Math.abs(s)/_,A);if(s>0)for(var v=0;v<r-1;v++){var R=y[v]*Y;q(R,0,v+1)}else for(var v=r-1;v>0;v--){var R=y[v-1]*Y;q(-R,v,r)}}}function W(s){var A=s<0?-1:1;s=Math.abs(s);for(var y=Math.ceil(s/(r-1)),_=0;_<r-1;_++)if(A>0?q(y,0,_+1):q(-y,r-_-1,r),s-=y,s<=0)return}return f}function w(e,t,u,a){return b(e,"x","width",t,u,a)}function F(e,t,u,a){return b(e,"y","height",t,u,a)}function N(e){var t=[];e.sort(function(G,l){return l.priority-G.priority});var u=new H(0,0,0,0);function a(G){if(!G.ignore){var l=G.ensureState("emphasis");l.ignore==null&&(l.ignore=!1)}G.ignore=!0}for(var o=0;o<e.length;o++){var n=e[o],r=n.axisAligned,h=n.localRect,i=n.transform,f=n.label,c=n.labelLine;u.copy(n.rect),u.width-=.1,u.height-=.1,u.x+=.05,u.y+=.05;for(var p=n.obb,O=!1,d=0;d<t.length;d++){var g=t[d];if(u.intersect(g.rect)){if(r&&g.axisAligned){O=!0;break}if(g.obb||(g.obb=new z(g.localRect,g.transform)),p||(p=new z(h,i)),p.intersect(g.obb)){O=!0;break}}}O?(a(f),c&&a(c)):(f.attr("ignore",n.defaultAttr.ignore),c&&c.attr("ignore",n.defaultAttr.labelGuideIgnore),t.push(n))}}export{U as D,F as a,N as h,Z as p,w as s};
