(function(){
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // custom cursor
  var cur=document.getElementById('cursor'),cx=0,cy=0,tx=0,ty=0,running=false;
  if(window.matchMedia('(hover:hover)').matches){
    document.addEventListener('mousemove',function(e){
      tx=e.clientX;ty=e.clientY;
      if(!running){running=true;requestAnimationFrame(loop);}
    });
    function loop(){
      cx+=(tx-cx)*0.2; cy+=(ty-cy)*0.2;
      cur.style.transform='translate('+cx+'px,'+cy+'px) translate(-50%,-50%)';
      if(Math.abs(tx-cx)>0.4||Math.abs(ty-cy)>0.4){requestAnimationFrame(loop);}else{running=false;}
    }
    document.querySelectorAll('a,button').forEach(function(el){
      el.addEventListener('mouseenter',function(){cur.classList.add('big');});
      el.addEventListener('mouseleave',function(){cur.classList.remove('big');});
    });
  }

  // hide nav on scroll down
  var nav=document.getElementById('nav'),last=0;
  window.addEventListener('scroll',function(){
    var y=window.scrollY;
    nav.classList.toggle('hidden', y>last && y>220);
    last=y;
  },{passive:true});

  // skills accordion
  document.querySelectorAll('.srv-row').forEach(function(btn){
    btn.addEventListener('click',function(){
      var panel=btn.nextElementSibling;
      var open=btn.getAttribute('aria-expanded')==='true';
      document.querySelectorAll('.srv-row').forEach(function(b){
        b.setAttribute('aria-expanded','false');
        b.nextElementSibling.style.maxHeight=null;
      });
      if(!open){
        btn.setAttribute('aria-expanded','true');
        panel.style.maxHeight=panel.scrollHeight+'px';
      }
    });
  });

  // "PROJECTS" wall drifts on scroll
  var wb=document.getElementById('worksBg');
  if(wb && !reduce){
    var ticking=false;
    window.addEventListener('scroll',function(){
      if(ticking)return; ticking=true;
      requestAnimationFrame(function(){
        var r=wb.getBoundingClientRect();
        var p=(window.innerHeight-r.top)/(window.innerHeight+r.height);
        wb.style.transform='translateX('+(-p*240)+'px)';
        ticking=false;
      });
    },{passive:true});
  }

  // fade-in on scroll
  var io=new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ e.target.classList.add('in'); io.unobserve(e.target);} });
  },{threshold:.12,rootMargin:'0px 0px -6% 0px'});
  document.querySelectorAll('.reveal').forEach(function(el,i){
    el.style.transitionDelay=(i%4)*60+'ms';
    io.observe(el);
  });
})();
