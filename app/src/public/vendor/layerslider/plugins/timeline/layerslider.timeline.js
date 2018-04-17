/*
	* LayerSlider Plugin: Timeline
	*
	* (c) 2011-2017 George Krupa, John Gera & Kreatura Media
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
    '!E(a){1Q.2z.2c.7=E(b,c,d,e){L f=9;f.2H={3e:"3m 2a S 2q",2t:"1.0.3",2M:"6.1.0",2Y:"2Z",30:"36. 12. 3c."},f.1I={18:"28",17:!0,1q:!0,1O:!1},f.1U=E(){9.1z(),9.1y(),9.1D()},f.1z=E(){9.F=a.2N(!0,{},9.1I,e)},f.1y=E(){L b=a(\'[O-7-S="\'+c.1a("1t")+\'"]\');9.26=!b.1d,9.$N=b.1d?b:a("<5>").D({3f:c.D("3h-J")}).3y(c),9.$Z=a("<5>").l("4-7-2h").A(9.$N),9.$1i=a("<5>").l("4-7-8-1g").A(9.$N),9.$1p=a("<5>").l("4-8-1n-1m").A(9.$Z),9.$1c=a("<5>").l("4-2S-1m").A(9.$Z),9.$N.l("4-2T-7 "+(9.F.1q?"4-2U-8-1g":"")),9.$Z.15(a(\'<5 O-1T-S="\'+d+\'"></5>\')),9.F.17&&(9.$1u=a("<5>").l("4-31-32")),9.$34=a(\'<5 C="4-7-1Z"><p C="4-P-Q">1Z</p><p C="4-P-Q-1s">1s</p><p C="4-P-Q-W">W</p><p C="4-P-Q-V">V</p><p C="4-P-Q-3z">Y W</p><p C="4-P-Q-29">Y V</p><p C="4-P-Q-13">13 / 2b</p><p C="4-P-Q-U">U</p></5>\').A(9.$N)},f.z=E(a,b){2k b=b?b*=10:R,1R.z(a*b)/b},f.1D=E(){c.T("2G",E(a,b){f.F.17&&f.$Z.1v(".4-1T-2K").15(f.$1u)}).T("2L",E(c,d){f.G=d.G,f.1P=d.1w.1N()<d.G?1:f.G/d.1w.1N();L i,j,k,m,n,o,q,r,e=d.35.3E(":37( .4-38 )"),g=e.1d,h=f.G/I;f.$1p.1e(),f.$1c.1e(),f.$1i.1e();S(L s=0;s<1R.3k(f.G)+1&&(i=s*(I/f.G),i=i>I?I:i,r=i>=3l?" 4-7-1A-3p":"",a(\'<5 C="4-7-1A\'+r+\'"><5 C="4-7-3x">\'+s+"s</5></5>").D({H:i+"%"}).A(f.$1c),!(i>=I));s++);S(L t=1;t<10*f.G&&(i=t*(I/(10*f.G)),i=i>I?I:i,t%10!==0&&a(\'<5 C="4-7-27"></5>\').D({H:i+"%"}).A(f.$1c),!(i>=I));t++);S(L u=0;u<g;u++){L v,x,w="";1x(j=e.2d(u),k=j.O(b.2e.1U.2f),m=a("<5>").l("4-8-1n").O("2g",j).1j(f.$1p),n=a("<5>").l("4-8-1n-2i").A(m),f.F.1q&&(o=a("<5>").O("4",{$8:j,2j:k,$11:k.2l.$11}).l("4-8-1g").1j(f.$1i).T("2m."+f.F.18,E(){a(9).O("4").$11.1a("1t","4-1m-2n")}).T("2o."+f.F.18,E(){a(9).O("4").$11.2p("1t")}),j.1h("2r")&&o.15(a(\'<5><a 2s="\'+j.1a("1f")+\'" 2u="2v"></a></5>\').D({2w:"2x("+j.1a("1f")+")"})),x=j.1B().1C().1d&&j.1B().1C().1h("2A, 2B, 2C")?"2D 2E":j[0].2F,f.F.1O&&(w+="<K><B>2I & 2J</B><B>"+j[0].1E+(x?" | "+x:"")+"</B></K>",w+="<K><B>1F 1G</B><B>"+k.1H.1G.19(/:/g,": ").19(/;/g,"; ")+"</B></K>",w+="<K><B>1F O-4</B><B>"+k.1H.2O.19(/:/g,": ").19(/;/g,"; ")+"</B></K>",j[0].1f&&(w+="<K><B>2P 2Q</B><B>"+j[0].1f+"</B></K>"),v=\'<5 C="4-8-2R"><1J><1K><K><1L 2V="2">2W 2X</1L></K></1K><1M>\'+w+"</1M></1J></5>"),o.15("<16>"+(v?v:"")+j[0].1E+"<p>"+x+"</p></16> ")),k.1h.U&&b.1o.1l.1k!==k.F.33||(a("<5>").A(n).l("4-8-M 4-8-1S-W").D({H:f.z(k.7.14)/h+"%",J:f.z(k.7.1r-k.7.14)/h+"%"}),k.7.14>0&&a("<5>").A(n).l("4-8-M 4-8-1s-W").D({H:0,J:f.z(k.7.14)/h+"%"})),a("<5>").A(n).l("4-8-M 4-8-Y-W").D({H:f.z(k.7.1V)/h+"%",J:f.z(k.7.39-k.7.1V)/h+"%"}),q=k.13.3a===-1?f.G:k.7.3b,a("<5>").A(n).l("4-8-M 4-8-13").D({H:f.z(k.7.1W)/h+"%",J:f.z(q-k.7.1W)/h+"%"}),a("<5>").A(n).l("4-8-M 4-8-Y-V").D({H:f.z(R*k.7.1X)/R/h+"%",J:f.z(R*(k.7.3d-k.7.1X))/R/h+"%"}),b.1o.1l.1k===k.F.1Y&&a("<5>").A(n).l("4-8-M 4-8-1S-V").D({H:f.z(k.7.1b)/h+"%",J:f.z(k.7.3g-k.7.1b)/h+"%"}),k.1h.U)1x(b.1o.1l.1k===k.F.1Y){L y="3i"===k.V.3j?"U":"20";a("<5>").A(n).l("4-8-M 4-8-"+y).D({H:0,J:"I%"===k.7.21?k.7.21:f.z(k.7.1b)/h+"%"})}22 a("<5>").A(n).l("4-8-M 4-8-U").D({H:f.z(k.7.3n)/h+"%",J:"I%"});22 a("<5>").A(n).l("4-8-M 4-8-20").D({H:f.z(k.7.1r)/h+"%",J:f.z(k.7.1b-k.7.1r)/h+"%"})}0===g&&a(\'<5 C="4-8-1g 3o-23"><16>3q 23 3r</16></5>\').1j(f.$1i)}).T("3s",E(a,b){L c;f.F.17&&(c=3t(f.G/f.1P*b.3u()*R)/R,c!==c&&(c=0),f.$1u.Y(c.3v(3)))}).T("3w",E(){f.24.25()})},f.24={25:E(){a(1Q).X("3A").X(c).X(c.1v("*")).X(f.$N).X(f.$N.1v("*")).3B("."+f.F.18),9.26?f.$N.3C():f.$N.1e()}}}}(3D,2y 0);',
    62,
    227,
    '||||ls|div||timeline|layer|this||||||||||||addClass||||span||||||||||round|appendTo|td|class|css|function|settings|slideTimelineDuration|left|100|width|tr|var|tween|timelineElement|data|tl|leg|1e3|for|on|static|out|in|add|text|strechedElement||outerWrapper||loop|transitioninstart|append|h1|showCurrentTime|eventNamespace|replace|attr|transitionoutstart|timingsWrapper|length|empty|src|info|is|infoElement|prependTo|index|next|wrapper|tweens|slides|layerTweensWrapper|showLayersInfo|transitioninend|delay|id|currentTimeElement|find|slideTimeline|if|createMarkup|applySettings|seconds|children|first|createEvents|tagName|Original|styles|original|pluginDefaults|table|thead|th|tbody|duration|showLayersProperties|slideTimelineDurationRatio|window|Math|transition|slidebar|init|textinstart|loopstart|textoutstart|slideOut|legend|showuntil|staticto|else|layers|api|destroy|removeElement|dsecond|LSTL|textout|Plugin|middle|plugins|eq|defaults|dataKey|lsTweensOfLayer|streched|inner|layerData|return|elements|mouseenter|highlighted|mouseleave|removeAttr|LayerSlider|img|href|version|target|_blank|backgroundImage|url|void|_layerSlider|iframe|video|audio|MEDIA|LAYER|innerText|sliderDidLoad|pluginData|Type|Content|slider|slideTimelineDidCreate|requiredLSVersion|extend|dataLS|Image|URL|properties|timings|slide|show|colspan|Layer|Properties|authorName|Kreatura|releaseDate|current|time|slideIn|legendWrapper|layersOnSlideTimeline|2016|not|bg|textinend|count|loopend|07|textoutend|name|maxWidth|transitionoutend|max|slidechangeonly|startAt|floor|99|Timeline|staticfrom|no|last|No|found|slideTimelineDidUpdate|parseInt|progress|toFixed|sliderDidDestroy|sec|insertAfter|textin|body|off|remove|jQuery|filter'.split(
      '|'
    ),
    0,
    {}
  )
);