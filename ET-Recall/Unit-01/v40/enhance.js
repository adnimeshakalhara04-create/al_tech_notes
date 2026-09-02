(()=>{
  const C=window.CARDS||[];
  const DRIVE=[
    'https://drive.google.com/thumbnail?id=16otOI6UVIdvHJHU6FVsz17gHlejOqwEb&sz=w1600',
    'https://drive.google.com/thumbnail?id=1LqdGeHK7gd6vBYVzS2LkaAjlcg3qsRKn&sz=w1600',
    'https://drive.google.com/thumbnail?id=1GnrCQsUgK3ujJMU9SpYqJFGXG6waxi4H&sz=w1600',
    'https://drive.google.com/thumbnail?id=1i_qNHZI7KYxvePzDTzelYhp7BMX3_z3O&sz=w1600',
    'https://drive.google.com/thumbnail?id=1icyN6W87zeX7Rwoa-8YFjnTEciFhpqps&sz=w1600',
    'https://drive.google.com/thumbnail?id=1WGd_rbRhHJPJFCLY_ptPJ6d2139BecfH&sz=w1600',
    'https://drive.google.com/thumbnail?id=1fcYXdoWHJXqONG0S6Ta5eogE0QwuJgrX&sz=w1600',
    'https://drive.google.com/thumbnail?id=10YnTbBAeGXXZLGRoxJeeyKYmkzFY00ky&sz=w1600',
    'https://drive.google.com/thumbnail?id=1ffcQ0Axcieig086zczFudHD_MfOj2eZb&sz=w1600',
    'https://drive.google.com/thumbnail?id=1uyDZzI-bvZh4_foLio0N26YorxBu9OGA&sz=w1600',
    'https://drive.google.com/thumbnail?id=1G08MV4CpT0oN79EJIloXvnVeYZEPc-ic&sz=w1600',
    'https://drive.google.com/thumbnail?id=1NKTIztxyPfNwJ9dP3uBRn73dqH-tpHCZ&sz=w1600',
    'https://drive.google.com/thumbnail?id=1Ge3Pt0LjxBlBbyX0I1BIgMLD9touk0Kv&sz=w1600',
    'https://drive.google.com/thumbnail?id=1C0onQ8VuaDKQsDsjjW22uaE-SPnUquyD&sz=w1600',
    'https://drive.google.com/thumbnail?id=1JjDAm9VX72hd5LzPKMaxu_rOC6HcPemL&sz=w1600',
    'https://drive.google.com/thumbnail?id=16hUCEf9drvIzvVSxhtNKQ1w6YpJ0b1qw&sz=w1600',
    'https://drive.google.com/thumbnail?id=1rNRt6obyxXrowX674tI6gE0uHY9h8ver&sz=w1600',
    'https://drive.google.com/thumbnail?id=13HZopkjW24sw48jG0CT4o4NZcnjRoohS&sz=w1600',
    'https://drive.google.com/thumbnail?id=1dVkocb4TOb5U-ZtqrAxpXstyq-IIYUmy&sz=w1600',
    'https://drive.google.com/thumbnail?id=12Fnj4OUZtkhK04rLGag2n5lRhiDmTV0b&sz=w1600',
    'https://drive.google.com/thumbnail?id=1I8LzRjSVehHaBy1Acuubx9NGq3t1qpes&sz=w1600',
    'https://drive.google.com/thumbnail?id=19tuNwZePJysu49EG3XIdaLxU5UPcAHIn&sz=w1600',
    'https://drive.google.com/thumbnail?id=1pQE_VHo8YexZMP6STOkZ7BTpkAAqoxHp&sz=w1600',
    'https://drive.google.com/thumbnail?id=143seBWhz05QPtXMLDPlJegMrANvcR754&sz=w1600',
    'https://drive.google.com/thumbnail?id=14NLKUvGOWvdqbYSD-8QhojNWeNMGFamu&sz=w1600',
    'https://drive.google.com/thumbnail?id=1cS1qSjUrJ75CUHMCAvXsAibsn6xiFbk-&sz=w1600',
    'https://drive.google.com/thumbnail?id=18k7nyWhILaWRCgC1BaXhrt3_qtgGqNpO&sz=w1600',
    'https://drive.google.com/thumbnail?id=1qzyP_GU8hBvocHQma_H2HjFwyzqDMnEL&sz=w1600',
    'https://drive.google.com/thumbnail?id=1ZBIAkceT4eVs_z78eLzrIewMnXOggPz2&sz=w1600',
    'https://drive.google.com/thumbnail?id=18VVXmIiHr5_-QSV2dEyvPcBIpfEElB21&sz=w1600'
  ];
  const atlasPos=i=>`${(i%5)*25}% ${Math.floor(i/5)*20}%`;
  const isImage=c=>c&&Number.isInteger(Number(c.imageIndex))&&Number(c.imageIndex)>=0&&Number(c.imageIndex)<30;
  C.forEach(c=>{
    if(!isImage(c))return;
    c.v40Index=Number(c.imageIndex);
    c.v40Fallback=c.image||'';
    c.v40FallbackPos=atlasPos(c.v40Index);
    c.image=DRIVE[c.v40Index];
    delete c.imageIndex;
  });
  document.title='ET Unit 01';
  const h1=document.querySelector('#practice h1');if(h1)h1.textContent='ET Unit 01';
  const sub=document.querySelector('#practice .sub');if(sub)sub.textContent='A/L Engineering Technology • Unit 01 • Q001–Q300';
  const css=document.createElement('style');css.textContent=`
    .qimg,.thumb{background-color:#fff!important;background-repeat:no-repeat!important;image-rendering:auto!important;filter:none!important;-webkit-filter:none!important;cursor:default!important}
    .qimg{border-radius:16px!important;max-height:none!important}
    .thumb{border-radius:14px!important}
    .v40bar{display:flex;gap:7px;flex-wrap:wrap;margin-top:10px}.v40bar .btn{flex:1;min-width:150px}.v40hint{font-size:11px;color:#aaa;margin-top:7px}
  `;document.head.appendChild(css);
  const byAlt=new Map();C.forEach(c=>{if(c.v40Index!==undefined&&c.imageAlt&&!byAlt.has(c.imageAlt))byAlt.set(c.imageAlt,c)});
  function cardFor(el){return byAlt.get(el.getAttribute('aria-label')||'')||null;}
  function apply(el){
    const c=cardFor(el);if(!c)return;
    const fallback=c.v40Fallback?`,url("${c.v40Fallback}")`:'';
    el.style.backgroundImage=`url("${c.image}")${fallback}`;
    el.style.backgroundSize=c.v40Fallback?'contain,500% 600%':'contain';
    el.style.backgroundPosition=c.v40Fallback?`center,${c.v40FallbackPos}`:'center';
    el.style.backgroundRepeat='no-repeat';
    el.style.backgroundColor='#fff';
    el.dataset.v40='drive-original';
  }
  function scan(root=document){root.querySelectorAll?.('.qimg,.thumb').forEach(apply);}
  scan();
  const mo=new MutationObserver(ms=>{for(const m of ms){m.addedNodes.forEach(n=>{if(n.nodeType===1){if(n.matches?.('.qimg,.thumb'))apply(n);scan(n);}});if(m.type==='attributes'&&m.target.matches?.('.qimg,.thumb')){const el=m.target;if(el.dataset.v40Lock)return;el.dataset.v40Lock='1';queueMicrotask(()=>{delete el.dataset.v40Lock;apply(el);});}}});
  mo.observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['aria-label']});
  document.addEventListener('click',e=>{if(e.target.closest?.('.qimg,.thumb')){e.preventDefault();e.stopPropagation();}},true);
  const hero=document.querySelector('#practice .hero');
  if(hero&&!document.getElementById('v40bar')){
    const bar=document.createElement('div');bar.id='v40bar';bar.className='v40bar';bar.innerHTML='<button id="installAppV40" class="btn o">📲 Install ET Unit 01</button><button id="fullScreenV40" class="btn">⛶ Full Screen</button>';
    const hint=document.createElement('div');hint.id='v40hint';hint.className='v40hint';hint.textContent='Practice • සියලු ප්‍රශ්න • Memory tabs තුනේම අදාල original image එක question එකත් එක්කම clear ලෙස පෙන්වයි.';
    const status=document.getElementById('status');(status||hero.firstChild).after(bar,hint);
  }
  let deferred=null;const ib=document.getElementById('installAppV40'),hint=document.getElementById('v40hint');
  if(ib){if(matchMedia('(display-mode: standalone)').matches||navigator.standalone){ib.textContent='✅ ET Unit 01 Installed';ib.disabled=true}addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;ib.disabled=false});addEventListener('appinstalled',()=>{deferred=null;ib.textContent='✅ ET Unit 01 Installed';ib.disabled=true});ib.onclick=async()=>{if(deferred){deferred.prompt();await deferred.userChoice;deferred=null}else if(hint)hint.textContent='Chrome ⋮ → Install app / Add to Home screen තෝරන්න.'}}
  const fs=document.getElementById('fullScreenV40');if(fs){fs.onclick=async()=>{try{if(!document.fullscreenElement)await document.documentElement.requestFullscreen();else await document.exitFullscreen()}catch{}};document.addEventListener('fullscreenchange',()=>{fs.textContent=document.fullscreenElement?'⤢ Exit Full Screen':'⛶ Full Screen'})}
  document.documentElement.dataset.build='v40-original-inline-images';
})();
