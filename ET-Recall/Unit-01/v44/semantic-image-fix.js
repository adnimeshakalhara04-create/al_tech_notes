(()=>{
  if(!window.ETU1_LESSON_HTML) return;
  const t=document.createElement('template');
  t.innerHTML=window.ETU1_LESSON_HTML;
  const root=t.content;
  const norm=s=>String(s||'').replace(/\s+/g,' ').trim();

  function setLessonImage(caption,index){
    const el=[...root.querySelectorAll('[data-caption]')].find(x=>norm(x.getAttribute('data-caption'))===norm(caption));
    if(el) el.setAttribute('data-lesson-image',String(index));
  }
  function setCardImage(selector,title,attr,index){
    const card=[...root.querySelectorAll(selector)].find(x=>norm(x.querySelector('h3,h4')?.textContent)===norm(title));
    if(card) card.setAttribute(attr,String(index));
  }

  // Source image index -> visually verified Unit 01 meaning:
  // 1 engine, 2 car evolution, 3 metal casting, 4 cement, 5 home industries,
  // 7 workshop, 8 factories, 9 bulb, 10 fire, 11 glass, 13 IC, 14 jerry can,
  // 15 jet engine, 16 lamp evolution, 17 nuclear plant, 18 phone evolution,
  // 19 printing press, 20 radar, 21 electrical conduction, 22 static electricity,
  // 23 steam engine, 24 steam train, 25 technology timeline, 27 water wheel,
  // 28 wheel, 29 wireless communication.

  // 1.1 — evolution + industrial revolution
  setLessonImage('තාක්ෂණවේදයේ විකාශය',25);
  setLessonImage('හුමාල එන්ජිම',23);
  setLessonImage('හුමාල දුම්රිය',24);

  // 1.1 — WWII inventions
  setCardImage('.lesson-feature','ජෙරි බඳුන','data-feature-image',14);
  setCardImage('.lesson-feature','ජෙට් එන්ජිම','data-feature-image',15);
  setCardImage('.lesson-feature','රේඩාර් තාක්ෂණය','data-feature-image',20);
  setCardImage('.lesson-feature','න්‍යෂ්ටික බලය','data-feature-image',17);
  setCardImage('.lesson-feature','වායුවෙන් සිසිල් වන මෝටර් රථ එන්ජිම','data-feature-image',1);

  // 1.1 — turning points
  setCardImage('.turn-card','ගින්දර (Fire)','data-turn-image',10);
  setCardImage('.turn-card','රෝදය (Wheel)','data-turn-image',28);
  setCardImage('.turn-card','ජල රෝදය','data-turn-image',27);
  setCardImage('.turn-card','චීනච්චට්ටි වාත්තු කිරීම (Casting Cast iron)','data-turn-image',3);
  setCardImage('.turn-card','මුද්‍රණ කලාව (Printing)','data-turn-image',19);
  setCardImage('.turn-card','ස්ථිති විද්‍යුතය (Static Electricity)','data-turn-image',22);
  // Electrical Conduction + Transistor are preserved as the user's current global inserts.
  setCardImage('.turn-card','දුරකථනය (Telephone)','data-turn-image',18);
  setCardImage('.turn-card','විදුලි බුබුල (සූත්‍රිකා පහන) (Filament bulb)','data-turn-image',9);
  setCardImage('.turn-card','රැහැන් රහිත සන්නිවේදනය (Wireless Communication)','data-turn-image',29);
  // Existing user override for Electronic valve remains visible; this gives Original a closer electromechanical source instead of an IC.
  setCardImage('.turn-card','ඉලෙක්ට්‍රොනික කපාටය (Electronic valve)','data-turn-image',6);
  setCardImage('.turn-card','සංගෘහිත පරිපථය (Integrated Circuit)','data-turn-image',13);
  setCardImage('.turn-card','සිමෙන්ති (Cement)','data-turn-image',4);
  setCardImage('.turn-card','වීදුරු','data-turn-image',11);

  // 1.2 — product evolution
  setLessonImage('මෝටර් රථ විකාශය',2);
  setLessonImage('දුරකථන විකාශය',18);
  setLessonImage('පහන් විකාශය',16);

  // 1.3 — technology-management environment
  setLessonImage('කර්මාන්ත හා කළමනාකරණ පරිසරය',8);

  // 1.4 — local industry environment
  setLessonImage('ගෘහ කර්මාන්ත',5);
  setLessonImage('කර්මාන්ත ශාලා',8);

  // 1.5 — industry development
  setLessonImage('දේශීය ගෘහ කර්මාන්ත',5);
  setLessonImage('තාක්ෂණික කර්මාන්ත පරිසරය',7);

  window.ETU1_LESSON_HTML=t.innerHTML;
  document.documentElement.dataset.lessonImageMap='semantic-v1';
})();
