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
    '!F(a){1m.1r.2x.7=F(b,c,d,e){H f=3,g=1m.1r.1J?1m.1r.1J:1m;f.2v={2u:"2q 2p 2o 2k N 2e",2d:"1.0",2c:"6.1.0",2b:"2a",1Z:"1W. 12. 1T."},f.1o={2l:"2m",Y:.25,1t:4},f.1L=F(){f.1K()},f.1K=F(){b.A.V.7={1q:F(){b.E.1v=D.2z(b.E.P/b.E.S),3.w=b.E.1v>f.1o.1t?f.1o.1t:b.E.1v,3.w=D.14(D.1i()*3.w)+1,3.1C()},1O:F(a){N(H b=3.1y;3.1y==b;)b=3.w>1?0===a?["17","z","17","13"][D.14(4*D.1i())]:a==3.w-1?["B","z","B","13"][D.14(4*D.1i())]:["z","13"][D.14(2*D.1i())]:["B","z","17","13"][D.14(4*D.1i())];1I 3.1y=b,b},1C:F(){N(H a=b.E.P%2===0?b.E.P:b.E.P+1,c=a/3.w%2===0?a/3.w:a/3.w-a/3.w%2,d=b.E.S%2===0?b.E.S:b.E.S+1,e=0,f=0;f<3.w;f++){H g=3.w-D.2A(D.14(3.w/2)-f)-D.14(3.w/2),h=3.1O(f),i=c;a/3.w%2!==0&&f%2===0&&(a-c*3.w)/2<3.w&&(i+=2),f===3.w-1&&e+i!==a&&(i=a-e),f===3.w-1&&a!==b.E.P&&(e-=1);H j=b.A.V.7.1H("8-7-"+h,i,d,e,0).Z({1s:h});j.T({21:g}),3.1E(j,e,h,f),e+=i}b.A.V.1q()},1H:F(c,d,e,f,g){H h=a("<11>").U("8-7-1g "+c).T({P:d,S:e,B:f,z:g}).X(b.A.V.$1M);1I h},1E:F(c,d,e,f){b.A.V.$1M.2C(b.E.$2B);H g;10(e){u"B":u"17":g={P:c.P()/2};L;u"z":u"13":g={S:c.S()/2}}H h=a("<11>").T(g).U("8-7-1h 8-7-18").X(c),i=a("<11>").T(g).U("8-7-1h 8-7-18").X(h),j=a("<11>").T(g).U("8-7-1h 8-7-O").X(i),k=a("<11>").T(g).U("8-7-1h 8-7-O").X(j);c.16(".8-7-1h").2y(F(){H e=a(3).2w("8-7-O")?"O":"15",f=a("<11>").U("8-7-1e-1d").X(a(3));2t(b.1P[e].Z.$1k){H h,i,g=a(3).R();10(c.Z("1s")){u"B":10(e){u"15":N(h=a(3).C().B;!g.W(".8-7-1g");)h+=g.C().B,g=g.R();L;u"O":N(h=0;!g.W(".8-7-18");)h+=g.C().B,g=g.R()}h=-d-h;L;u"17":10(e){u"15":N(h=-a(3).C().B;!g.W(".8-7-1g");)h-=g.C().B,g=g.R();L;u"O":N(h=a(3).C().B;!g.W(".8-7-18");)h-=g.C().B,g=g.R()}h=-d+h;L;u"z":10(e){u"15":N(i=-a(3).C().z;!g.W(".8-7-1g");)i-=g.C().z,g=g.R();L;u"O":N(i=0;!g.W(".8-7-18");)i-=g.C().z,g=g.R()}h=-d;L;u"13":10(e){u"15":N(i=-a(3).C().z;!g.W(".8-7-1g");)i-=g.C().z,g=g.R();L;u"O":N(i=a(3).C().z;!g.W(".8-7-18");)i-=g.C().z,g=g.R()}h=-d}H j=b.o.1Q&&"2i"===b.2h.2g.1s?"M":"2f",k="15"===e?b.A.29:b.A.20,l=k.Z.$1k.Z(b.1R.1L.2j),m=l.1S[j],n=!!k.Z.$1k&&b.1U.1V(k.Z.$1k),o=a("<1f>").X(f).1X("1Y",n).T({P:l.9.P,S:l.9.S,"-1A-1l":l.9.1l,1l:l.9.1l,22:h,23:i,24:"26 27 28"});10(e){u"15":o.T({"-1N-1c":"19("+l.9.x+"J) 1a("+l.9.y+"J)"+l.9.1z+l.9.1x,"-1A-1c":"19("+l.9.x+"J) 1a("+l.9.y+"J)"+l.9.1z+l.9.1x,1c:"19("+l.9.x+"J) 1a("+l.9.y+"J)"+l.9.1z+l.9.1x});L;u"O":o.T({"-1N-1c":"19("+l.9.x+"J) 1a("+l.9.y+"J) 1w("+m.1B+"1u) 1b("+m.1b+")","-1A-1c":"19("+l.9.x+"J) 1a("+l.9.y+"J) 1w("+m.1B+"1u) 1b("+m.1b+")",1c:"19("+l.9.x+"J) 1a("+l.9.y+"J) 1w("+m.1B+"1u) 1b("+m.1b+")"})}a("<11>").U("8-1G").X(f)}}),3.1F(c,e,h,i,j,k,f)},1F:F(a,c,d,e,h,i,j){H l=(a.16(".8-1G").U("8-2n"),d.16("> .8-7-1e-1d > 1f")),m=e.16("> .8-7-1e-1d > 1f"),n=h.16("> .8-7-1e-1d > 1f"),o=i.16("> .8-7-1e-1d > 1f"),p=2,q=p/2,r=g.2r.2s,s=f.1o.Y,t=1.5*s;10(c){u"B":b.A.1j.M(d[0],p,{v:r,I:K},0).M(e[0],p,{v:r,I:-1p},0).Q(h[0],p,{I:1n},{v:r,I:K},0).Q(i[0],p,{I:K},{v:r,I:0},q);L;u"17":b.A.1j.M(d[0],p,{v:r,I:-K},0).M(e[0],p,{v:r,I:1p},0).Q(h[0],p,{I:-1n},{v:r,I:-K},0).Q(i[0],p,{I:-K},{v:r,I:0},q);L;u"z":b.A.1j.M(d[0],p,{v:r,G:-K},0).M(e[0],p,{v:r,G:1p},0).Q(h[0],p,{G:-1n},{v:r,G:-K},0).Q(i[0],p,{G:-K},{v:r,G:0},q);L;u"13":b.A.1j.M(d[0],p,{v:r,G:K},0).M(e[0],p,{v:r,G:-1p},0).Q(h[0],p,{G:1n},{v:r,G:K},0).Q(i[0],p,{G:K},{v:r,G:0},q)}b.A.1j.M(l[0],p,{v:r,Y:t},0).M(m[0],p,{v:r,Y:s},0).Q(n[0],p,{Y:t},{v:r,Y:1},0).Q(o[0],p,{Y:t},{v:r,Y:1},q)}},b.A.V.1D.2D=F(){b.1P.O.Z.2E&&b.2F.2G?b.A.V.7.1q():b.A.V.2H.1D.2I()}}}}(2J,2K 0);',
    62,
    171,
    '|||this||||origami|ls|responsive|||||||||||||||||||||case|ease|blocksNum|||top|transitions|left|position|Math|slider|function|rotationX|var|rotationY|px|90|break|to|for|next|width|fromTo|parent|height|css|addClass|slide|is|appendTo|opacity|data|switch|div||bottom|floor|current|find|right|cur|translateX|translateY|scale|transform|holder|image|img|block|tile|random|_slideTransition|background|filter|window|130|pluginDefaults|180|start|_layerSlider|direction|maxTiles|deg|ceilRatio|rotate|kbScale|lastDir|kbRotation|webkit|rotation|addBlocks|select|appendTiles|setTransition|light|createBlock|return|GSAP|extendLayerSlider|init|wrapper|ms|getDirection|slides|playByScroll|defaults|kenBurns|07|functions|getURL|2016|attr|src|releaseDate|nextSlide|zIndex|marginLeft|marginTop|outline||1px|solid|transparent|curSlide|Kreatura|authorName|requiredLSVersion|version|LayerSlider|from|scroll|device|up|dataKey|Plugin|eventNamespace|OR|black|Transition|Slide|Origami|Cubic|easeInOut|if|name|pluginData|hasClass|plugins|each|ceil|abs|innerWrapper|prependTo|slideTransitionType|transitionorigami|browser|supports3D|normal|transitionType|jQuery|void'.split(
      '|'
    ),
    0,
    {}
  )
);