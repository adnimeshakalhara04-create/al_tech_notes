(()=>{
  const C=window.CARDS||[];
  const byId=Object.fromEntries(C.map(c=>[c.id,c]));
  const ATLAS='data:image/webp;base64,'+(window.ATLAS_B64||'');
  const POS={"aircraft-evolution.webp":0,"car-engine.webp":1,"car-evolution.webp":2,"cast-iron.webp":3,"cement.webp":4,"cottage-industries.webp":5,"electronic-valve.webp":6,"factory-collage-a.webp":7,"factory-collage-b.webp":8,"filament-bulb.webp":9,"fire.webp":10,"glass.webp":11,"industrial-valve.webp":12,"integrated-circuit.webp":13,"jerry-can.webp":14,"jet-engine.webp":15,"lamp-evolution.webp":16,"nuclear-power.webp":17,"phone-evolution.webp":18,"printing-press.webp":19,"radar-dish.webp":20,"static-electricity.webp":21,"static-rubbing.webp":22,"steam-engine.webp":23,"steam-locomotive.webp":24,"technology-timeline.webp":25,"tv-evolution.webp":26,"water-wheel.webp":27,"wheel.webp":28,"wireless-network.webp":29};
  const img=(ids,file,alt)=>ids.forEach(id=>{if(byId[id]){byId[id].image=ATLAS;byId[id].imageIndex=POS[file];byId[id].imageAlt=alt;}});

  img(['q024','q102','q267'],'water-wheel.webp','ජල රෝදය (Water wheel)');
  img(['q026','q104','q105','q269','q270'],'printing-press.webp','පැරණි මුද්‍රණ යන්ත්‍රයක්');
  img(['q023','q266'],'wheel.webp','පැරණි ලී රෝදයක්');
  img(['q032','q107'],'wireless-network.webp','රැහැන් රහිත සන්නිවේදන ජාලයක්');
  img(['q018','q095','q098','q259'],'radar-dish.webp','රේඩාර්/පරාවර්තක ඇන්ටෙනා පද්ධතියක්');
  img(['q028','q114','q115'],'static-electricity.webp','විදුලි ස්පාර්ක්/ස්ථිති විද්‍යුතය');
  img(['q036','q112'],'cement.webp','සිමෙන්ති කුඩු');
  img(['q031','q108'],'filament-bulb.webp','සූත්‍රිකා විදුලි බුබුලක්');
  img(['q147'],'aircraft-evolution.webp','ගුවන් යානා තාක්ෂණයේ විකාශය');
  img(['q016','q093','q257','q258'],'jerry-can.webp','ජෙරි බඳුන (Jerry can)');
  img(['q084','q145'],'car-engine.webp','මෝටර් රථ එන්ජිමක්');
  img(['q017','q094','q260'],'jet-engine.webp','ජෙට් එන්ජිමක්');
  img(['q067','q069'],'factory-collage-a.webp','කර්මාන්තශාලා නිෂ්පාදන ක්‍රියාකාරකම්');
  img(['q033','q109'],'electronic-valve.webp','ඉලෙක්ට්‍රොනික කපාට තාක්ෂණයට සම්බන්ධ උපකරණයක්');
  img(['q145'],'car-evolution.webp','මෝටර් රථයේ විකාශය');
  img(['q066','q209'],'cottage-industries.webp','ගෘහ කර්මාන්ත — ගඩොල්, බතික්, වළං');
  img(['q022','q101','q265'],'fire.webp','ගින්දර භාවිතය');
  img(['q071','q234'],'industrial-valve.webp','කාර්මික ස්වයංක්‍රීය කපාට උපකරණයක්');
  img(['q003','q244'],'technology-timeline.webp','මානව තාක්ෂණවේදයේ විකාශන කාලරේඛාව');
  img(['q038','q143','q281'],'lamp-evolution.webp','පහන් තාක්ෂණයේ විකාශය');
  img(['q028','q115'],'static-rubbing.webp','ද්‍රව්‍යයක් පිරිමැදීමෙන් ස්ථිති විද්‍යුතය පෙන්වන රූපයක්');
  img(['q019','q096','q261'],'nuclear-power.webp','න්‍යෂ්ටික බලශක්ති මධ්‍යස්ථානයක්');
  img(['q146'],'phone-evolution.webp','ජංගම දුරකථනයේ විකාශය');
  img(['q037','q113'],'glass.webp','වීදුරු බඳුනක්');
  img(['q068','q217'],'factory-collage-b.webp','නවීන කර්මාන්තශාලා ක්‍රියාකාරකම්');
  img(['q025','q103','q268','q285'],'cast-iron.webp','ලෝහ වාත්තු ක්‍රියාවලිය');
  img(['q014','q091','q249','q255'],'steam-locomotive.webp','හුමාල දුම්රියක්');
  img(['q035','q111','q276'],'integrated-circuit.webp','සංගෘහිත පරිපථයක් (IC)');
  img(['q012','q013','q246','q249'],'steam-engine.webp','පැරණි හුමාල එන්ජිමක්');
  img(['q144'],'tv-evolution.webp','රූපවාහිනියේ විකාශය');

  const p={
    q291:{s:'1.1',q:'රූපයේ දැක්වෙන උපකරණය හඳුනාගෙන එහි මුල් භාවිතයක් සඳහන් කරන්න.',a:'මෙය ජල රෝදය (Water wheel) යි. මුල් භාවිතයක් ලෙස ධාන්‍ය පොතු හැරීම හා කෙටීම සඳහන් කළ හැක.',m:'රූපය = Water wheel 👉 ධාන්‍ය වැඩ; පසුව ජල බමර/ටර්බයින.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['water-wheel.webp'],imageAlt:'ජල රෝදය'},
    q292:{s:'1.1',q:'රූපයේ දැක්වෙන තාක්ෂණය කුමක්ද? එය දැනුම ව්‍යාප්ත කිරීමට කළ වැදගත් දායකත්වය කුමක්ද?',a:'මෙය මුද්‍රණ තාක්ෂණයයි. මුද්‍රණය වේගවත් හා පහසු වීමෙන් පොතපත නිර්මාණය කර දැනුම පුළුල් ලෙස බෙදාහැරීමට හැකි විය.',m:'Printing press 👉 පොත් වැඩිවුණා → දැනුම වේගයෙන් පැතිරුණා.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['printing-press.webp'],imageAlt:'පැරණි මුද්‍රණ යන්ත්‍රයක්'},
    q293:{s:'1.1',q:'රූපයේ දැක්වෙන නිර්මාණය බිහිවීමට මූලික වූ නිරීක්ෂණය කුමක්ද?',a:'සිලින්ඩරාකාර වස්තු ඇදගෙන යාමට වඩා පෙරළාගෙන යාම පහසු බව නිරීක්ෂණය කිරීම රෝදය නිර්මාණයට මූලික විය.',m:'පෙරළන එක ඇදනවට වඩා ලේසි → රෝදය.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['wheel.webp'],imageAlt:'පැරණි ලී රෝදයක්'},
    q294:{s:'1.1',q:'රූපයේ දිස්වන විදුලි ස්පාර්ක් එක සම්බන්ධ වන සංකල්පය කුමක්ද? ස්ථිති විද්‍යුතය ඇතිවිය හැකි ආකාරයක් සඳහන් කරන්න.',a:'එය ස්ථිති විද්‍යුතය සමඟ සම්බන්ධ වේ. ඇතැම් ද්‍රව්‍ය පිරිමැදීමේදී ඒවා අතර ඉලෙක්ට්‍රෝන හුවමාරුවීමෙන් විදුලි ආරෝපණ ඇතිවිය හැක.',m:'Spark + rubbing 👉 static electricity; electron හුවමාරුව.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['static-electricity.webp'],imageAlt:'විදුලි ස්පාර්ක්'},
    q295:{s:'1.1',q:'රූපයේ පෙන්වන ඉදිකිරීම් ද්‍රව්‍යය කුමක්ද? “Portland cement” නාමය හා 1824 patent එක සම්බන්ධ වන්නේ කා සමඟද?',a:'රූපයේ ද්‍රව්‍යය සිමෙන්ති ය. Portland cement නාමය හා 1824 patent එක Joseph Aspdin සමඟ සම්බන්ධ වේ.',m:'Cement + 1824 👉 Joseph Aspdin.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['cement.webp'],imageAlt:'සිමෙන්ති කුඩු'},
    q296:{s:'1.1',q:'රූපයේ දැක්වෙන ආලෝක උපකරණය හඳුනාගෙන එහි තාක්ෂණික වැදගත්කමක් සඳහන් කරන්න.',a:'මෙය සූත්‍රිකා (filament) විදුලි පහනකි. විදුත් ශක්තිය ආලෝක ශක්තිය බවට පරිවර්තනය කර රාත්‍රී කාලයේ වැඩ සහ ජීවන කටයුතු පුළුල් කිරීමට එය දායක විය.',m:'Filament bulb 👉 විදුලිය → ආලෝකය → රාත්‍රී වැඩ පහසු.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['filament-bulb.webp'],imageAlt:'සූත්‍රිකා විදුලි බුබුල'},
    q297:{s:'1.1',q:'රූපයේ පෙන්වන තාක්ෂණික විකාශය කුමක්ද?',a:'මෙය ගුවන් යානය හා ගුවන් ගමන් තාක්ෂණයේ විකාශයයි — මුල් propeller ගුවන් යානා සිට passenger jet හා space shuttle වැනි උසස් තාක්ෂණ දක්වා.',m:'Propeller aircraft → jet → space shuttle.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['aircraft-evolution.webp'],imageAlt:'ගුවන් යානා විකාශය'},
    q298:{s:'1.1',q:'රූපයේ දැක්වෙන ජෙරි බඳුනේ භාවිතය සහ හැඬල තුන තිබීමේ වාසිය සඳහන් කරන්න.',a:'ජෙරි බඳුන වැඩි ඉන්ධන ප්‍රමාණයක් ගෙනයාමට භාවිත කරයි. හැඬල තුන නිසා එක් අයෙකුට හෝ දෙදෙනෙකුට පහසුවෙන් රැගෙන යා හැක.',m:'Jerry can 👉 ඉන්ධන ගෙනියන්න; handles 3 = 1 හෝ 2 දෙනාට පහසු.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['jerry-can.webp'],imageAlt:'ජෙරි බඳුන'},
    q299:{s:'1.4',q:'රූපයේ පෙන්වන නිෂ්පාදන පරිසරය ගෘහ කර්මාන්තයකට වඩා කර්මාන්ත ශාලාවකට අයත් බව හඳුනාගැනීමට උපකාරී වන තාක්ෂණික ලක්ෂණය කුමක්ද?',a:'උසස් ශිල්පීය ක්‍රම හා නවීන තාක්ෂණික යන්ත්‍ර සූත්‍ර භාවිත කිරීම කර්මාන්ත ශාලාවක ප්‍රධාන තාක්ෂණික ලක්ෂණයකි.',m:'Factory 👉 modern machines + advanced techniques.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['factory-collage-b.webp'],imageAlt:'කර්මාන්තශාලා නිෂ්පාදන ක්‍රියාකාරකම්'},
    q300:{s:'1.1',q:'රූපයේ පෙන්වන තාක්ෂණික විකාශය කුමක්ද? එහි අවසාන අදියර ලෙස පෙන්වන උපාංග වර්ගය කුමක්ද?',a:'මෙය ජංගම දුරකථනයේ විකාශයයි. මුල් විශාල mobile phones හා keypad/flip phones හරහා smartphone දක්වා විකාශය පෙන්වයි.',m:'Mobile phone evolution 👉 brick phone → keypad/flip → smartphone.',kind:'🖼️ Drive Image Q',source:'Google Drive • Unit 01 images',image:ATLAS,imageIndex:POS['phone-evolution.webp'],imageAlt:'ජංගම දුරකථනයේ විකාශය'}
  };
  Object.entries(p).forEach(([id,v])=>{if(byId[id])Object.assign(byId[id],v)});

  const corrections={
    q258:{a:'තහඩුව මත සකස් කළ තදකිරීම් මගින් හැඩය නොවෙනස්ව තබා ගැනීම සහ හැඬල තුනක් තිබීම ප්‍රධාන සැලසුම් ලක්ෂණ වේ.'},
    q262:{q:'කාන්තාර ප්‍රදේශවල ජල හිඟය සහ ශීත ප්‍රදේශවල ජලය හිම වීම යන ගැටලු නිසා වාහන සඳහා දියුණු කළ තාක්ෂණය කුමක්ද?'},
    q284:{m:'Technology life cycle 👉 බිහිවෙයි → දියුණු වෙයි → peak එකට යයි → අලුත් තාක්ෂණයක් එයි.'},
    q288:{q:'“අරමුණු ඉටුකර ගැනීම සඳහා කාර්යයන් නිශ්චිත රාමුවකට ගොනු කිරීම” කුමන කළමනාකරණ ශ්‍රිතයට අයත්ද?'}
  };
  Object.entries(corrections).forEach(([id,v])=>{if(byId[id])Object.assign(byId[id],v)});
  try{window.ATLAS_B64=''}catch{}
})();
