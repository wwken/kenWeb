/*
	* LayerSlider Plugin: Origami Slide Transition
	*
	* (c) 2017 Kreatura Media
	*
	* LayerSlider web:		https://layerslider.kreaturamedia.com/
	* licenses:				http://codecanyon.net/licenses/standard
*/

eval(
  (function(p, a, c, k, e, r) {
    e = function(c) {
      return (
        (c < a ? '' : e(parseInt(c / a))) +
        ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36))
      );
    };
    if (!''.replace(/^/, String)) {
      while (c--) r[e(c)] = k[c] || e(c);
      k = [
        function(e) {
          return r[e];
        },
      ];
      e = function() {
        return '\\w+';
      };
      c = 1;
    }
    while (c--)
      if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    return p;
  })(
    '!F(t){2v.2t.2r.7=F(i,s,o,a){I e=3;e.2q={2p:"2h 2d 2c 2b J 2a",29:"1.2",28:"6.6.1",1T:"1Q",1O:"2D. 10. 17."},e.1h={W:.25,1v:4},e.1H=F(){e.1D()},e.1D=F(){i.q.R.7={1o:F(){i.A.1u=u.2f(i.A.K/i.A.O),3.k=i.A.1u>e.1h.1v?e.1h.1v:i.A.1u,3.k=u.S(u.15()*3.k)+1,3.1J()},1C:F(t){J(I i=3.1x;3.1x==i;)i=3.k>1?0===t?["1a","v","1a","Z"][u.S(4*u.15())]:t==3.k-1?["w","v","w","Z"][u.S(4*u.15())]:["v","Z"][u.S(2*u.15())]:["w","v","1a","Z"][u.S(4*u.15())];1A 3.1x=i,i},1J:F(){J(I t=i.A.K%2==0?i.A.K:i.A.K+1,s=t/3.k%2==0?t/3.k:t/3.k-t/3.k%2,o=i.A.O%2==0?i.A.O:i.A.O+1,a=0,e=0;e<3.k;e++){I r=3.k-u.1V(u.S(3.k/2)-e)-u.S(3.k/2),n=3.1C(e),l=s;t/3.k%2!=0&&e%2==0&&(t-s*3.k)/2<3.k&&(l+=2),e===3.k-1&&a+l!==t&&(l=t-a),e===3.k-1&&t!==i.A.K&&(a-=1);I c=i.q.R.7.1K("8-7-"+n,l,o,a,0).M({1m:n});c.Q({1X:r}),3.1E(c,a,n,e),a+=l}i.q.R.1o()},1K:F(s,o,a,e,r){1A t("<Y>").V("8-7-1e "+s).Q({K:o,O:a,w:e,v:r}).U(i.q.R.$1I)},1E:F(s,o,a,e){i.q.R.$1I.1Y(i.A.$27);I r;T(a){9"w":9"1a":r={K:s.K()/2};D;9"v":9"Z":r={O:s.O()/2}}I n=t("<Y>").Q(r).V("8-7-1b 8-7-18").U(s),l=t("<Y>").Q(r).V("8-7-1b 8-7-18").U(n),c=t("<Y>").Q(r).V("8-7-1b 8-7-L").U(l),d=t("<Y>").Q(r).V("8-7-1b 8-7-L").U(c);s.12(".8-7-1b").2w(F(){I a=t(3).1U("8-7-L")?"L":"11",e=t("<Y>").V("8-7-1c-1d").U(t(3));1Z(i.1B[a].M.$1k){I r,n,l=t(3).P();T(s.M("1m")){9"w":T(a){9"11":J(r=t(3).z().w;!l.X(".8-7-1e");)r+=l.z().w,l=l.P();D;9"L":J(r=0;!l.X(".8-7-18");)r+=l.z().w,l=l.P()}r=-o-r;D;9"1a":T(a){9"11":J(r=-t(3).z().w;!l.X(".8-7-1e");)r-=l.z().w,l=l.P();D;9"L":J(r=t(3).z().w;!l.X(".8-7-18");)r-=l.z().w,l=l.P()}r=-o+r;D;9"v":T(a){9"11":J(n=-t(3).z().v;!l.X(".8-7-1e");)n-=l.z().v,l=l.P();D;9"L":J(n=0;!l.X(".8-7-18");)n-=l.z().v,l=l.P()}r=-o;D;9"Z":T(a){9"11":J(n=-t(3).z().v;!l.X(".8-7-1e");)n-=l.z().v,l=l.P();D;9"L":J(n=t(3).z().v;!l.X(".8-7-18");)n-=l.z().v,l=l.P()}r=-o}I c=i.o.2g&&"2i"===i.2j.2o.1m?"H":"2s",d="11"===a?i.q.2u:i.q.1w,p=d.M.$1k.M(i.2E.1H.1N),h=p.1P[c],m=!!d.M.$1k&&i.1R.1S(d.M.$1k),f=t("<1f>").U(e).2F("1W",m).Q({K:p.b.K,O:p.b.O,"-1n-1j":p.b.1j,1j:p.b.1j,20:r,21:n,22:"23 24 26"});T(a){9"11":f.Q({"-1z-16":"13("+p.b.x+"G) 14("+p.b.y+"G)"+p.b.1p+p.b.1q,"-1n-16":"13("+p.b.x+"G) 14("+p.b.y+"G)"+p.b.1p+p.b.1q,16:"13("+p.b.x+"G) 14("+p.b.y+"G)"+p.b.1p+p.b.1q});D;9"L":f.Q({"-1z-16":"13("+p.b.x+"G) 14("+p.b.y+"G) 1r("+h.1s+"1t) 19("+h.19+")","-1n-16":"13("+p.b.x+"G) 14("+p.b.y+"G) 1r("+h.1s+"1t) 19("+h.19+")",16:"13("+p.b.x+"G) 14("+p.b.y+"G) 1r("+h.1s+"1t) 19("+h.19+")"})}t("<Y>").V("8-1F").U(e)}}),3.1G(s,a,n,l,c,d,e)},1G:F(t,s,o,a,r,n,l){t.12(".8-1F").V("8-2k");I c=o.12("> .8-7-1c-1d > 1f"),d=a.12("> .8-7-1c-1d > 1f"),p=r.12("> .8-7-1c-1d > 1f"),h=n.12("> .8-7-1c-1d > 1f"),m=i.2l.2m.2n,f=e.1h.W,g=1.5*f;T(s){9"w":i.q.1g.H(o[0],2,{j:m,E:B},0).H(a[0],2,{j:m,E:-1l},0).N(r[0],2,{E:1i},{j:m,E:B},0).N(n[0],2,{E:B},{j:m,E:0},1);D;9"1a":i.q.1g.H(o[0],2,{j:m,E:-B},0).H(a[0],2,{j:m,E:1l},0).N(r[0],2,{E:-1i},{j:m,E:-B},0).N(n[0],2,{E:-B},{j:m,E:0},1);D;9"v":i.q.1g.H(o[0],2,{j:m,C:-B},0).H(a[0],2,{j:m,C:1l},0).N(r[0],2,{C:-1i},{j:m,C:-B},0).N(n[0],2,{C:-B},{j:m,C:0},1);D;9"Z":i.q.1g.H(o[0],2,{j:m,C:B},0).H(a[0],2,{j:m,C:-1l},0).N(r[0],2,{C:1i},{j:m,C:B},0).N(n[0],2,{C:B},{j:m,C:0},1)}i.q.1g.H(c[0],2,{j:m,W:g},0).H(d[0],2,{j:m,W:f},0).N(p[0],2,{W:g},{j:m,W:1},0).N(h[0],2,{W:g},{j:m,W:1},1)}},i.q.R.1y.2x=F(){i.1B.L.M.2y&&i.2z.2A?(i.q.1w.M.2B||i.q.1w.M.2C)&&u.S(2*u.15())+1===1?i.q.R.1L.1y.1M():i.q.R.7.1o():i.q.R.1L.1y.1M()}}}}(2e);',
    62,
    166,
    '|||this||||origami|ls|case||responsive||||||||ease|blocksNum||||||transitions||||Math|top|left|||position|slider|90|rotationX|break|rotationY|function|px|to|var|for|width|next|data|fromTo|height|parent|css|slide|floor|switch|appendTo|addClass|opacity|is|div|bottom||current|find|translateX|translateY|random|transform||cur|scale|right|tile|image|holder|block|img|_slideTransition|pluginDefaults|130|filter|background|180|direction|webkit|start|kbRotation|kbScale|rotate|rotation|deg|ceilRatio|maxTiles|nextSlide|lastDir|select|ms|return|slides|getDirection|extendLayerSlider|appendTiles|light|setTransition|init|wrapper|addBlocks|createBlock|normal|transitionType|dataKey|releaseDate|kenBurns|Kreatura|functions|getURL|authorName|hasClass|abs|src|zIndex|prependTo|if|marginLeft|marginTop|outline|1px|solid||transparent|layersWrapper|requiredLSVersion|version|LayerSlider|Plugin|Transition|Slide|jQuery|ceil|playByScroll|Origami|up|device|black|gsap|Cubic|easeInOut|scroll|name|pluginData|plugins|from|_layerSlider|curSlide|window|each|slideTransitionType|transitionorigami|browser|supports3D|transition3d|transition2d|2017|defaults|attr'.split(
      '|'
    ),
    0,
    {}
  )
);
