(()=>{
  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  const CFG_KEY='etu1-admin-config-v1';
  const DB_NAME='etu1-admin-media-v1';
  const STORE='media';
  let installed=false;

  function addStyles(){
    if(qs('#etu1FullLessonAdminStyles')) return;
    const s=document.createElement('style');
    s.id='etu1FullLessonAdminStyles';
    s.textContent=`
      .etu1-admin-sheet{width:min(1220px,100%)!important}
      .etu1-admin-full-head{display:flex;align-items:flex-start;justify-content:space-between;gap:14px;margin:2px 0 16px;padding:16px 18px;border:1px solid #323238;border-radius:20px;background:linear-gradient(145deg,#151517,#0d0d0f)}
      .etu1-admin-full-head h3{margin:0;font-size:20px}.etu1-admin-full-head p{margin:6px 0 0;color:#aaa;line-height:1.6;font-size:12px}
      .etu1-admin-full-chip{flex:0 0 auto;border:1px solid #6a4219;background:#24170b;color:#ffc783;border-radius:999px;padding:8px 11px;font-size:11px;font-weight:900}
      .etu1-admin-full-jumps{position:sticky;top:-1px;z-index:12;display:flex;gap:8px;overflow:auto;padding:10px;margin:0 0 14px;border:1px solid #303036;border-radius:16px;background:#0d0d0ff2;backdrop-filter:blur(10px)}
      .etu1-admin-full-jumps button{flex:0 0 auto;border:1px solid #3a3a40;background:#161619;color:#eee;border-radius:999px;min-height:38px;padding:0 13px;font-weight:850}
      .etu1-admin-live-lesson{position:relative;max-width:1040px;margin:0 auto;padding:2px 0 34px}
      .etu1-admin-live-lesson .lesson-shell{max-width:100%!important;margin:0!important}
      .etu1-admin-live-lesson .lesson-section{scroll-margin-top:86px}
      .etu1-admin-image-wrap{position:relative!important}
      .etu1-admin-edit-image{position:absolute;right:10px;top:10px;z-index:8;border:1px solid #ffaf4e;background:#ff8a00;color:#111;border-radius:999px;min-height:36px;padding:0 11px;font-size:11px;font-weight:950;box-shadow:0 8px 24px #0008}
      .etu1-admin-edit-image:active{transform:scale(.98)}
      .etu1-admin-add-slot{display:flex;justify-content:flex-start;align-items:center;gap:8px;margin:7px 0 16px;min-height:34px}
      .etu1-admin-add-slot.in-li{margin:8px 0 4px}
      .etu1-admin-add-image{border:1px dashed #765026;background:#1c140d;color:#ffc27a;border-radius:999px;min-height:34px;padding:0 12px;font-size:11px;font-weight:900;box-shadow:none}
      .etu1-admin-add-image:hover,.etu1-admin-add-image:focus{background:#2a1b0d;border-style:solid;color:#ffd6a4}
      .etu1-admin-add-hint{color:#777;font-size:10px;line-height:1.3}
      .etu1-admin-saving{position:fixed;left:50%;bottom:20px;transform:translateX(-50%);z-index:10020;background:#111;color:#fff;border:1px solid #6a4219;border-radius:999px;padding:10px 15px;font-size:12px;font-weight:900;box-shadow:0 12px 40px #000b}
      .etu1-admin-highlight{outline:3px solid #ff8a00!important;outline-offset:4px;animation:etu1Flash 1.2s ease 2}
      @keyframes etu1Flash{0%,100%{box-shadow:0 0 0 0 #ff8a0000}50%{box-shadow:0 0 0 12px #ff8a0030}}
      @media(max-width:720px){.etu1-admin-full-head{padding:14px;display:block}.etu1-admin-full-chip{display:inline-block;margin-top:10px}.etu1-admin-full-jumps{margin-left:-4px;margin-right:-4px}.etu1-admin-edit-image{right:7px;top:7px;min-height:34px;padding:0 9px}.etu1-admin-live-lesson{padding-bottom:24px}.etu1-admin-add-slot{margin:6px 0 13px}.etu1-admin-add-hint{display:none}.etu1-admin-add-image{min-height:32px;padding:0 10px}}
    `;
    document.head.appendChild(s);
  }

  function short(t,n=72){return String(t||'').replace(/\s+/g,' ').trim().slice(0,n)}
  function uid(){return `img-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,8)}`}
  function loadCfg(){try{return {version:1,overrides:{},inserts:[],...JSON.parse(localStorage.getItem(CFG_KEY)||'{}')}}catch{return {version:1,overrides:{},inserts:[]}}}
  function saveCfg(cfg){localStorage.setItem(CFG_KEY,JSON.stringify(cfg))}
  function openDB(){return new Promise((res,rej)=>{const r=indexedDB.open(DB_NAME,1);r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE)};r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error)})}
  async function dbPut(k,v){const db=await openDB();return new Promise((res,rej)=>{const t=db.transaction(STORE,'readwrite');t.objectStore(STORE).put(v,k);t.oncomplete=()=>res();t.onerror=()=>rej(t.error)})}
  async function optimizeImage(file){try{const bmp=await createImageBitmap(file);const max=1800,scale=Math.min(1,max/Math.max(bmp.width,bmp.height));const c=document.createElement('canvas');c.width=Math.max(1,Math.round(bmp.width*scale));c.height=Math.max(1,Math.round(bmp.height*scale));c.getContext('2d',{alpha:false}).drawImage(bmp,0,0,c.width,c.height);bmp.close?.();return await new Promise(res=>c.toBlob(b=>res(b||file),'image/webp',.9))}catch{return file}}
  function pickFile(){return new Promise(res=>{const i=document.createElement('input');i.type='file';i.accept='image/*';i.style.display='none';document.body.appendChild(i);i.onchange=()=>{const f=i.files?.[0]||null;i.remove();res(f)};i.oncancel=()=>{i.remove();res(null)};i.click()})}
  function toast(text){const old=qs('.etu1-admin-saving');old?.remove();const t=document.createElement('div');t.className='etu1-admin-saving';t.textContent=text;document.body.appendChild(t);setTimeout(()=>t.remove(),2200)}

  function ensureSourceAnchors(source){
    qsa('.lesson-section',source).forEach(sec=>{
      let n=0;
      qsa(':scope > h2,:scope > h3,:scope > h4,:scope > p,:scope > ul > li,:scope > ol > li,:scope > .definition,:scope > .example-box',sec).forEach(el=>{
        if(!el.dataset.adminAnchor) el.dataset.adminAnchor=`${sec.id||'section'}-a-${String(++n).padStart(2,'0')}`;
        else n++;
      });
    });
  }

  function stripDuplicateIds(root){
    qsa('[id]',root).forEach(el=>{el.dataset.adminCopyId=el.id;el.removeAttribute('id')});
    qsa('.etu1-admin-badge',root).forEach(el=>el.remove());
    qsa('a[href^="#"]',root).forEach(a=>{a.removeAttribute('href');a.style.cursor='default'});
  }

  function openImageEditor(index){
    const panel=qs('#etu1AdminPanel');
    const existing=qs('[data-admin-tab="slots"]',panel);
    if(existing) existing.click();
    setTimeout(()=>{
      const cards=qsa('#etu1AdminBody .etu1-slot');
      const card=cards[index];
      if(!card) return;
      card.scrollIntoView({behavior:'smooth',block:'center'});
      card.classList.add('etu1-admin-highlight');
      setTimeout(()=>card.classList.remove('etu1-admin-highlight'),2600);
    },80);
  }

  function decorateImages(copy){
    const imgs=qsa('.lesson-img,.lesson-card-img',copy);
    imgs.forEach((img,i)=>{
      const host=img.closest('.lesson-figure,.lesson-feature,.turn-card')||img.parentElement;
      if(!host||host.querySelector(':scope > .etu1-admin-edit-image')) return;
      host.classList.add('etu1-admin-image-wrap');
      const b=document.createElement('button');
      b.type='button';
      b.className='etu1-admin-edit-image';
      b.textContent=`✏️ Edit IMG ${i+1}`;
      b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();openImageEditor(i)});
      host.appendChild(b);
    });
  }

  async function addImageAt(anchorId,context){
    if(!anchorId){alert('මෙම තැනට stable lesson anchor එකක් හමු වුණේ නැහැ. Reload කරලා නැවත try කරන්න.');return}
    const file=await pickFile();
    if(!file) return;
    toast('⏳ Image එක සකස් කරනවා…');
    const blob=await optimizeImage(file);
    const defaultCaption=short(context,60)||'Unit 01 පාඩම් රූපය';
    const caption=prompt('Image caption එක (අවශ්‍ය නම් වෙනස් කරන්න):',defaultCaption);
    const id=uid();
    await dbPut(`insert:${id}`,blob);
    const cfg=loadCfg();
    if(!Array.isArray(cfg.inserts)) cfg.inserts=[];
    cfg.inserts.push({id,anchorId,position:'after',caption:caption===null?defaultCaption:(caption.trim()||defaultCaption)});
    saveCfg(cfg);
    toast('✅ Image එක මේ තැනට add කළා');
    const reload=qs('#etu1Reload');
    if(reload) reload.click();
    setTimeout(()=>renderFullLesson(id),180);
  }

  function decorateAddPoints(copy){
    const targets=qsa('[data-admin-anchor]',copy);
    targets.forEach(el=>{
      if(el.closest('.etu1-custom-figure,.lesson-figure,.lesson-feature,.turn-card')) return;
      const anchorId=el.dataset.adminAnchor;
      if(!anchorId) return;
      const slot=document.createElement(el.tagName==='LI'?'span':'div');
      slot.className='etu1-admin-add-slot'+(el.tagName==='LI'?' in-li':'');
      const b=document.createElement('button');
      b.type='button';
      b.className='etu1-admin-add-image';
      b.textContent='➕ Image මෙතැන දාන්න';
      const hint=document.createElement('span');
      hint.className='etu1-admin-add-hint';
      hint.textContent='මෙම විස්තරයට පස්සේ image එකක් insert කරන්න';
      b.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();addImageAt(anchorId,el.textContent)});
      slot.append(b,hint);
      if(el.tagName==='LI') el.appendChild(slot); else el.insertAdjacentElement('afterend',slot);
    });
  }

  function makeJumps(copy,wrap){
    const sections=qsa('.lesson-section',copy);
    if(!sections.length) return;
    const nav=document.createElement('div');
    nav.className='etu1-admin-full-jumps';
    sections.forEach((sec,i)=>{
      const kicker=qs('.section-kicker',sec)?.textContent?.trim();
      const h=qs('h2,h3',sec)?.textContent?.trim();
      const label=kicker||h||`Section ${i+1}`;
      const b=document.createElement('button');
      b.type='button';
      b.textContent=label;
      b.onclick=()=>sec.scrollIntoView({behavior:'smooth',block:'start'});
      nav.appendChild(b);
    });
    wrap.insertBefore(nav,copy);
  }

  function renderFullLesson(highlightInsertId){
    const body=qs('#etu1AdminBody');
    const source=qs('#lesson');
    if(!body) return;
    if(!source){
      body.innerHTML='<div class="etu1-empty">සම්පූර්ණ පාඩම load වෙලා නැහැ. Reload කරලා නැවත Admin open කරන්න.</div>';
      return;
    }

    ensureSourceAnchors(source);
    body.innerHTML='';
    const head=document.createElement('div');
    head.className='etu1-admin-full-head';
    head.innerHTML='<div><h3>📖 සම්පූර්ණ පාඩම — Live Admin View</h3><p>1.1 → 1.5 සම්පූර්ණ content එක මෙතැනම පේනවා. Image තියෙන තැන Edit කරන්නත්, image නැති විස්තර/point එකකට <b>➕ Image මෙතැන දාන්න</b> button එකෙන් අලුත් image එකක් insert කරන්නත් පුළුවන්.</p></div><span class="etu1-admin-full-chip">1.1 → 1.5 • INLINE IMAGE ADMIN</span>';
    body.appendChild(head);

    const wrap=document.createElement('div');
    wrap.className='etu1-admin-live-wrap';
    const copy=document.createElement('div');
    copy.className='etu1-admin-live-lesson';

    const sourceShell=qs('.lesson-shell',source);
    copy.innerHTML=(sourceShell||source).outerHTML;
    stripDuplicateIds(copy);
    decorateImages(copy);
    decorateAddPoints(copy);
    wrap.appendChild(copy);
    body.appendChild(wrap);
    makeJumps(copy,wrap);

    if(highlightInsertId){
      setTimeout(()=>{
        const added=qs(`[data-admin-insert="${CSS.escape(highlightInsertId)}"]`,copy);
        if(added){added.scrollIntoView({behavior:'smooth',block:'center'});added.classList.add('etu1-admin-highlight');setTimeout(()=>added.classList.remove('etu1-admin-highlight'),2600)}
      },80);
    }
  }

  function activateFullTab(btn,panel){
    qsa('[data-admin-tab]',panel).forEach(x=>x.classList.toggle('on',x===btn));
    renderFullLesson();
  }

  function install(){
    if(installed) return;
    const panel=qs('#etu1AdminPanel');
    const tabs=qs('.etu1-admin-tabs',panel);
    const fab=qs('#etu1AdminFab');
    if(!panel||!tabs||!fab){setTimeout(install,120);return;}
    installed=true;
    addStyles();

    let btn=qs('[data-admin-tab="full-lesson"]',panel);
    if(!btn){
      btn=document.createElement('button');
      btn.type='button';
      btn.dataset.adminTab='full-lesson';
      btn.textContent='📖 සම්පූර්ණ පාඩම';
      tabs.insertBefore(btn,tabs.firstChild);
    }
    btn.addEventListener('click',e=>{e.preventDefault();activateFullTab(btn,panel)});
    fab.addEventListener('click',()=>setTimeout(()=>activateFullTab(btn,panel),20));

    const observer=new MutationObserver(()=>{
      if(panel.classList.contains('on')&&btn.classList.contains('on')) setTimeout(()=>renderFullLesson(),0);
    });
    observer.observe(panel,{attributes:true,attributeFilter:['class']});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',install,{once:true});
  else install();
})();
