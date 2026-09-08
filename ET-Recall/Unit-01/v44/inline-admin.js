(()=>{
  const OWNER='adnimeshakalhara04-create';
  const REPO='al_tech_notes';
  const BRANCH='main';
  const ROOT='ET-Recall/Unit-01/v44';
  const MAP_PATH=`${ROOT}/live-images.json`;
  const MEDIA_DIR=`${ROOT}/live-images`;
  const API=`https://api.github.com/repos/${OWNER}/${REPO}`;
  const MAP_RAW=`https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${MAP_PATH}`;
  const TOKEN_KEY='etu1-github-admin-token-session';
  const qs=(s,r=document)=>r.querySelector(s);
  const qsa=(s,r=document)=>[...r.querySelectorAll(s)];
  let adminOn=false;
  let liveMap={version:1,updatedAt:null,images:{}};
  let started=false;

  function css(){
    if(qs('#etu1InlineAdminStyles')) return;
    const s=document.createElement('style');
    s.id='etu1InlineAdminStyles';
    s.textContent=`
      #etu1AdminFab{position:fixed;right:16px;bottom:18px;z-index:9998;border:1px solid #6a4219;background:linear-gradient(145deg,#ff9b22,#ff7b00);color:#111;border-radius:16px;min-height:50px;padding:0 18px;font-weight:950;box-shadow:0 14px 38px #0009;display:flex;align-items:center;gap:8px}
      #etu1AdminFab.on{background:linear-gradient(145deg,#68e28c,#25b95e);border-color:#7ff09c}
      #etu1InlineBar{position:fixed;left:50%;top:max(10px,env(safe-area-inset-top));transform:translateX(-50%);z-index:9997;width:min(760px,calc(100% - 22px));display:none;align-items:center;gap:8px;padding:9px;border:1px solid #3a3a40;border-radius:17px;background:#0e0e10ee;backdrop-filter:blur(12px);box-shadow:0 16px 50px #000a;box-sizing:border-box}
      #etu1InlineBar.on{display:flex}#etu1InlineBar b{font-size:12px;white-space:nowrap}#etu1InlineBar .spacer{flex:1}#etu1InlineBar button{border:1px solid #3b3b42;background:#18181b;color:#fff;border-radius:11px;min-height:38px;padding:0 11px;font-weight:850;font-size:11px}#etu1InlineBar .ok{background:#ff8a00;color:#111;border-color:#ff9f32}
      .etu1-admin-host{position:relative!important}.etu1-image-tools{display:none;position:absolute;left:10px;right:10px;bottom:10px;z-index:40;gap:7px;flex-wrap:wrap;padding:8px;border-radius:15px;background:#0b0b0de8;border:1px solid #55545b;backdrop-filter:blur(8px);box-shadow:0 12px 32px #000a}.etu1-inline-admin-on .etu1-image-tools{display:flex}.etu1-image-tools button{flex:1 1 145px;border:1px solid #44454d;background:#18181b;color:#fff;border-radius:11px;min-height:42px;padding:0 10px;font-weight:900;font-size:11px}.etu1-image-tools .danger{background:#2a1010;color:#ffadad;border-color:#6b2727}.etu1-image-tools .primary{background:#ff8a00;color:#111;border-color:#ff9f32}.etu1-image-tools .restore{background:#16231a;color:#a9f5bf;border-color:#2f6540}
      .etu1-slot-label{display:none;position:absolute;left:10px;top:10px;z-index:39;background:#ff8a00;color:#111;border-radius:999px;padding:5px 8px;font-size:10px;font-weight:950;box-shadow:0 6px 18px #0008}.etu1-inline-admin-on .etu1-slot-label{display:block}
      .etu1-global-hidden{display:none!important}.etu1-inline-admin-on .etu1-global-hidden{display:block!important;min-height:180px!important;background:repeating-linear-gradient(135deg,#171719,#171719 10px,#202024 10px,#202024 20px)!important;border:2px dashed #ff8a00!important;opacity:.88}.etu1-inline-admin-on .lesson-figure[data-global-hidden-figure="1"]{display:block!important;min-height:220px;border:2px dashed #ff8a00;opacity:.9}
      .lesson-figure[data-global-hidden-figure="1"]{display:none}.etu1-saving{pointer-events:none;opacity:.65}
      #etu1Toast{position:fixed;left:50%;bottom:82px;transform:translateX(-50%) translateY(18px);z-index:10020;max-width:min(560px,calc(100% - 28px));background:#121214;color:#fff;border:1px solid #3b3b42;border-radius:14px;padding:11px 14px;box-shadow:0 16px 50px #000b;opacity:0;pointer-events:none;transition:.22s;font-size:12px;font-weight:800;text-align:center}#etu1Toast.on{opacity:1;transform:translateX(-50%) translateY(0)}
      #etu1TokenModal{position:fixed;inset:0;z-index:10050;display:none;place-items:center;background:#000b;padding:18px;box-sizing:border-box;backdrop-filter:blur(10px)}#etu1TokenModal.on{display:grid}.etu1-token-card{width:min(560px,100%);background:linear-gradient(145deg,#18181b,#0d0d0f);border:1px solid #3b3b42;border-radius:24px;padding:20px;box-shadow:0 28px 90px #000}.etu1-token-card h3{margin:0 0 8px}.etu1-token-card p{color:#aaa;font-size:12px;line-height:1.65;margin:0 0 14px}.etu1-token-card input{width:100%;box-sizing:border-box;min-height:48px;border:1px solid #45454d;border-radius:13px;background:#0c0c0e;color:#fff;padding:0 13px;font-size:13px}.etu1-token-actions{display:flex;gap:8px;margin-top:12px}.etu1-token-actions button{flex:1;min-height:44px;border-radius:12px;border:1px solid #414149;background:#171719;color:#fff;font-weight:900}.etu1-token-actions .save{background:#ff8a00;color:#111;border-color:#ff9f32}.etu1-token-note{margin-top:10px;color:#ffca8a;font-size:11px;line-height:1.55}
      @media(max-width:720px){#etu1AdminFab{right:10px;bottom:12px;min-height:46px;padding:0 14px}.etu1-image-tools{left:6px;right:6px;bottom:6px;padding:6px}.etu1-image-tools button{flex:1 1 110px;min-height:40px;font-size:10px}#etu1InlineBar{top:max(7px,env(safe-area-inset-top));padding:7px}#etu1InlineBar b{display:none}}
    `;
    document.head.appendChild(s);
  }

  function toast(msg,ms=2600){
    let t=qs('#etu1Toast');
    if(!t){t=document.createElement('div');t.id='etu1Toast';document.body.appendChild(t)}
    t.textContent=msg;t.classList.add('on');clearTimeout(t._x);t._x=setTimeout(()=>t.classList.remove('on'),ms);
  }

  function utf8ToB64(str){
    const bytes=new TextEncoder().encode(str);let bin='';
    for(let i=0;i<bytes.length;i+=0x8000)bin+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    return btoa(bin);
  }
  function b64ToUtf8(s){
    const bin=atob(String(s||'').replace(/\n/g,''));const bytes=new Uint8Array(bin.length);
    for(let i=0;i<bin.length;i++)bytes[i]=bin.charCodeAt(i);
    return new TextDecoder().decode(bytes);
  }
  async function blobToB64(blob){
    const bytes=new Uint8Array(await blob.arrayBuffer());let bin='';
    for(let i=0;i<bytes.length;i+=0x8000)bin+=String.fromCharCode(...bytes.subarray(i,i+0x8000));
    return btoa(bin);
  }

  async function optimize(file){
    if(!/^image\//.test(file.type||'')) throw Error('Image file එකක් තෝරන්න.');
    try{
      const u=URL.createObjectURL(file);const img=new Image();
      await new Promise((res,rej)=>{img.onload=res;img.onerror=rej;img.src=u});
      const max=1800,scale=Math.min(1,max/Math.max(img.naturalWidth,img.naturalHeight));
      const c=document.createElement('canvas');c.width=Math.max(1,Math.round(img.naturalWidth*scale));c.height=Math.max(1,Math.round(img.naturalHeight*scale));
      c.getContext('2d',{alpha:false}).drawImage(img,0,0,c.width,c.height);URL.revokeObjectURL(u);
      const blob=await new Promise(res=>c.toBlob(res,'image/webp',.88));
      return {blob:blob||file,ext:blob?'webp':((file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg')};
    }catch{return {blob:file,ext:((file.name.split('.').pop()||'jpg').toLowerCase().replace(/[^a-z0-9]/g,'')||'jpg')}}
  }

  async function apiFetch(path,opts={}){
    const token=sessionStorage.getItem(TOKEN_KEY)||'';
    const headers={Accept:'application/vnd.github+json','X-GitHub-Api-Version':'2022-11-28',...(opts.headers||{})};
    if(token)headers.Authorization=`Bearer ${token}`;
    return fetch(`${API}${path}`,{...opts,headers});
  }

  function tokenModal(){
    let m=qs('#etu1TokenModal');if(m)return m;
    m=document.createElement('div');m.id='etu1TokenModal';
    m.innerHTML=`<div class="etu1-token-card"><h3>🔐 GitHub Global Save</h3><p>Images හැම device එකටම පේන්න GitHub repo එකට commit කරන්න fine-grained token එකක් අවශ්‍යයි. Token එක source code එකට save වෙන්නේ නැහැ — මේ browser session එකේ විතරයි.</p><input id="etu1TokenInput" type="password" autocomplete="off" placeholder="github_pat_..."><div class="etu1-token-actions"><button data-cancel>Cancel</button><button class="save" data-save>Connect</button></div><div class="etu1-token-note">Token permissions: repository <b>${REPO}</b> only • Contents: Read and write. Public admin page එකේ token එක කිසිම වෙලාවක hard-code කරන්න එපා.</div></div>`;
    document.body.appendChild(m);return m;
  }

  function ensureToken(){
    const existing=sessionStorage.getItem(TOKEN_KEY);if(existing)return Promise.resolve(existing);
    const m=tokenModal(),input=qs('#etu1TokenInput',m);m.classList.add('on');input.value='';setTimeout(()=>input.focus(),30);
    return new Promise(resolve=>{
      const done=v=>{m.classList.remove('on');qs('[data-save]',m).onclick=null;qs('[data-cancel]',m).onclick=null;resolve(v)};
      qs('[data-cancel]',m).onclick=()=>done(null);
      qs('[data-save]',m).onclick=async()=>{
        const tok=input.value.trim();if(!tok){toast('GitHub token එක දාන්න.');return}
        const b=qs('[data-save]',m);b.disabled=true;b.textContent='Checking…';
        try{
          sessionStorage.setItem(TOKEN_KEY,tok);
          const r=await apiFetch(`/contents/${MAP_PATH}?ref=${encodeURIComponent(BRANCH)}`,{cache:'no-store'});
          if(!r.ok)throw Error(`GitHub access ${r.status}`);
          b.textContent='Connect';b.disabled=false;updateConnectText();toast('✅ GitHub connected');done(tok);
        }catch(e){sessionStorage.removeItem(TOKEN_KEY);b.textContent='Connect';b.disabled=false;toast(`GitHub connect failed: ${e.message}`,4200)}
      };
    });
  }

  async function readRepoMap(){
    const r=await apiFetch(`/contents/${MAP_PATH}?ref=${encodeURIComponent(BRANCH)}`,{cache:'no-store'});
    if(r.status===404)return {sha:null,map:{version:1,updatedAt:null,images:{}}};
    if(!r.ok)throw Error(`Map read failed (${r.status})`);
    const j=await r.json();let map={version:1,updatedAt:null,images:{}};
    try{map={...map,...JSON.parse(b64ToUtf8(j.content)),images:{...(JSON.parse(b64ToUtf8(j.content)).images||{})}}}catch{}
    return {sha:j.sha,map};
  }

  async function writeRepoMap(mutator,message){
    await ensureToken().then(t=>{if(!t)throw Error('GitHub connect cancelled')});
    const {sha,map}=await readRepoMap();mutator(map);map.version=1;map.updatedAt=new Date().toISOString();
    const body={message,content:utf8ToB64(JSON.stringify(map,null,2)),branch:BRANCH};if(sha)body.sha=sha;
    const r=await apiFetch(`/contents/${MAP_PATH}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify(body)});
    if(!r.ok){let x={};try{x=await r.json()}catch{}throw Error(x.message||`Map save failed (${r.status})`)}
    liveMap=map;return map;
  }

  async function uploadBlob(slot,file){
    await ensureToken().then(t=>{if(!t)throw Error('GitHub connect cancelled')});
    const {blob,ext}=await optimize(file);const stamp=Date.now();const path=`${MEDIA_DIR}/${slot}-${stamp}.${ext}`;
    const content=await blobToB64(blob);
    const r=await apiFetch(`/contents/${path}`,{method:'PUT',headers:{'Content-Type':'application/json'},body:JSON.stringify({message:`content(unit-01): upload ${slot} lesson image`,content,branch:BRANCH})});
    if(!r.ok){let x={};try{x=await r.json()}catch{}throw Error(x.message||`Image upload failed (${r.status})`)}
    const raw=`https://raw.githubusercontent.com/${OWNER}/${REPO}/${BRANCH}/${path}`;
    return {path,url:raw,uploadedAt:new Date().toISOString()};
  }

  function visualElements(){return qsa('#lesson .lesson-img,#lesson .lesson-card-img')}
  function slotOf(el,i){const s=el.dataset.globalSlot||`builtin-${String(i+1).padStart(3,'0')}`;el.dataset.globalSlot=s;return s}
  function hostOf(el){return el.closest('.lesson-figure,.lesson-feature,.turn-card')||el.parentElement}

  function rememberOriginal(el){
    if(!el.dataset.globalOriginalBg)el.dataset.globalOriginalBg=el.style.backgroundImage||getComputedStyle(el).backgroundImage;
    if(!el.dataset.globalOriginalDisplay)el.dataset.globalOriginalDisplay=el.style.display||'';
  }

  function applyOne(el,i){
    rememberOriginal(el);const slot=slotOf(el,i),entry=liveMap.images?.[slot];const host=hostOf(el);const fig=el.closest('.lesson-figure');
    el.classList.remove('etu1-global-hidden');if(fig)fig.removeAttribute('data-global-hidden-figure');
    el.style.display=el.dataset.globalOriginalDisplay||'';
    if(!entry){el.style.backgroundImage=el.dataset.globalOriginalBg||'';return}
    if(entry.hidden){
      if(fig)fig.dataset.globalHiddenFigure='1';else el.classList.add('etu1-global-hidden');
      return;
    }
    if(entry.url){
      const sep=entry.url.includes('?')?'&':'?';el.style.backgroundImage=`url("${entry.url}${sep}v=${encodeURIComponent(entry.uploadedAt||liveMap.updatedAt||Date.now())}")`;
      el.style.backgroundSize='contain';el.style.backgroundPosition='center';el.style.backgroundRepeat='no-repeat';el.style.backgroundColor='#fff';
    }else el.style.backgroundImage=el.dataset.globalOriginalBg||'';
  }

  function applyAll(){visualElements().forEach(applyOne)}

  async function loadPublicMap(){
    try{const r=await fetch(`${MAP_RAW}?t=${Date.now()}`,{cache:'no-store'});if(r.ok){const j=await r.json();liveMap={version:1,updatedAt:null,images:{},...j,images:{...(j.images||{})}}}}catch(e){console.warn('live image map',e)}
    applyAll();
  }

  function pickImage(cb){const i=document.createElement('input');i.type='file';i.accept='image/*';i.onchange=()=>{const f=i.files?.[0];if(f)cb(f)};i.click()}

  function clearTools(){qsa('.etu1-image-tools,.etu1-slot-label').forEach(x=>x.remove());qsa('.etu1-admin-host').forEach(x=>x.classList.remove('etu1-admin-host'))}

  function addTools(){
    clearTools();visualElements().forEach((el,i)=>{
      rememberOriginal(el);const slot=slotOf(el,i),host=hostOf(el);if(!host)return;host.classList.add('etu1-admin-host');
      const label=document.createElement('span');label.className='etu1-slot-label';label.textContent=`IMG ${i+1}`;host.appendChild(label);
      const tools=document.createElement('div');tools.className='etu1-image-tools';tools.innerHTML=`<button class="danger" data-remove>🗑️ Image අයින් කරන්න</button><button class="primary" data-upload>📁 අලුත් Image දාන්න</button><button class="restore" data-restore>↩ Original</button>`;host.appendChild(tools);
      qs('[data-remove]',tools).onclick=async()=>{
        if(!confirm(`IMG ${i+1} අයින් කරන්නද? මේ change එක හැම device එකටම apply වෙනවා.`))return;
        setBusy(tools,true);try{await writeRepoMap(m=>{m.images=m.images||{};m.images[slot]={...(m.images[slot]||{}),hidden:true}},`content(unit-01): hide ${slot} lesson image`);applyOne(el,i);toast('✅ Image අයින් කරලා GitHubට save වුණා')}catch(e){toast(`❌ ${e.message}`,4200)}finally{setBusy(tools,false)}
      };
      qs('[data-upload]',tools).onclick=()=>pickImage(async file=>{
        setBusy(tools,true);try{toast('Uploading image to GitHub…',5000);const up=await uploadBlob(slot,file);await writeRepoMap(m=>{m.images=m.images||{};m.images[slot]={hidden:false,url:up.url,path:up.path,uploadedAt:up.uploadedAt}},`content(unit-01): use uploaded image for ${slot}`);applyOne(el,i);toast('✅ අලුත් image එක GitHubට save වුණා • හැම device එකටම live')}catch(e){toast(`❌ ${e.message}`,5000)}finally{setBusy(tools,false)}
      });
      qs('[data-restore]',tools).onclick=async()=>{
        setBusy(tools,true);try{await writeRepoMap(m=>{m.images=m.images||{};delete m.images[slot]},`content(unit-01): restore ${slot} original image`);applyOne(el,i);toast('↩ Original image restore කරලා global-save වුණා')}catch(e){toast(`❌ ${e.message}`,4200)}finally{setBusy(tools,false)}
      };
    })
  }

  function setBusy(el,on){el.classList.toggle('etu1-saving',on);qsa('button',el).forEach(b=>b.disabled=on)}

  function updateConnectText(){const b=qs('#etu1GitHubConnect');if(b)b.textContent=sessionStorage.getItem(TOKEN_KEY)?'✅ GitHub':'🔐 GitHub Connect'}

  function buildChrome(){
    css();let fab=qs('#etu1AdminFab');if(!fab){fab=document.createElement('button');fab.id='etu1AdminFab';fab.innerHTML='⚙️ <span>Admin</span>';document.body.appendChild(fab)}
    let bar=qs('#etu1InlineBar');if(!bar){bar=document.createElement('div');bar.id='etu1InlineBar';bar.innerHTML='<b>🛠️ Complete Lesson Image Edit</b><span class="spacer"></span><button id="etu1GitHubConnect">🔐 GitHub Connect</button><button class="ok" id="etu1Done">✓ Done</button>';document.body.appendChild(bar)}
    qs('#etu1GitHubConnect').onclick=async()=>{if(sessionStorage.getItem(TOKEN_KEY)){if(confirm('මෙම browser session එකේ GitHub token එක disconnect කරන්නද?')){sessionStorage.removeItem(TOKEN_KEY);updateConnectText();toast('GitHub session disconnected')}}else await ensureToken()};
    qs('#etu1Done').onclick=()=>toggleAdmin(false);
    fab.onclick=e=>{e.preventDefault();e.stopPropagation();toggleAdmin(!adminOn)};
    updateConnectText();
  }

  function toggleAdmin(on){
    adminOn=!!on;document.documentElement.classList.toggle('etu1-inline-admin-on',adminOn);qs('#etu1AdminFab')?.classList.toggle('on',adminOn);qs('#etu1InlineBar')?.classList.toggle('on',adminOn);
    if(adminOn){addTools();qs('#etu1AdminFab span').textContent='Editing';toast('Admin edit mode ON • image එකේ buttons use කරන්න')}else{clearTools();qs('#etu1AdminFab span').textContent='Admin';toast('Admin edit mode OFF')}
  }

  function start(){
    if(started)return;const lesson=qs('#lesson');if(!lesson||visualElements().length===0){setTimeout(start,150);return}
    started=true;buildChrome();loadPublicMap();
    const mo=new MutationObserver(()=>{if(adminOn)addTools();applyAll()});mo.observe(lesson,{childList:true,subtree:true});
  }

  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
