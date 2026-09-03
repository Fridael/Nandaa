/* =========================================================
   NANDA EDITION — STORY CONTENT
   Edit only these arrays if you want to personalize further.
   ========================================================= */

const DAYS = [
  {day:"DAY 01", text:"Hari ketika aku mulai sadar kalau aku suka ngobrol sama kamu."},
  {day:"DAY 07", text:"Kita ngobrol sampai lupa waktu. Entah kenapa waktu memang sering kalah kalau sama kamu."},
  {day:"DAY 19", text:"Kamu bilang sesuatu yang sebenarnya biasa saja. Tapi aku masih ingat."},
  {day:"DAY 31", text:"Hari yang kelihatannya biasa. Tapi ada kamu di dalamnya."},
  {day:"DAY 48", text:"Kamu sibuk. Aku pura-pura sibuk juga. Padahal ya... tetap kepikiran."},
  {day:"DAY 72", text:"Kita main, ngobrol, ketawa. Hari terasa lebih pendek."}
];

const LITTLE_WORDS = [
  {label:"yali yali aku", message:"Panggilan yang entah bagaimana bisa terdengar seperti rumah kecil."},
  {label:"kesayangan aku", message:"Kalimat sederhana yang selalu terasa lebih lembut kalau ditujukan ke kamu."},
  {label:"sudah makan?", message:"Pertanyaan kecil yang sering menyamar sebagai bentuk perhatian."},
  {label:"goodnight", message:"Satu hari selesai. Besoknya masih ingin mendengar kabar kamu."},
  {label:"aku di sini", message:"Karena ternyata hadir tidak selalu membutuhkan satu ruangan yang sama."},
  {label:"jangan overthinking", message:"Lucunya, kalimat ini pernah menyelamatkan kepalaku dari terlalu banyak pikiran."},
  {label:"miss you", message:"Tiga kata yang nggak pernah benar-benar butuh penjelasan."}
];

const ORDINARY_DAYS = [
  ["MALAM", "Telepon sebentar yang akhirnya jadi lama."],
  ["FILM", "Dua tempat berbeda. Satu film. Dan rasanya tetap seperti ditemani."],
  ["GAME", "Kalah, menang, saling goda, lalu main lagi."],
  ["DIAM", "Kadang nggak banyak yang dibicarakan. Tapi tetap nyaman."],
  ["RANDOM", "Obrolan yang awalnya nggak penting, tiba-tiba sudah tengah malam."],
  ["BESOK", "Selalu ada alasan kecil untuk bilang, nanti kita lanjut lagi."]
];

const FLOATING_WORDS = [
  "yali yali aku","kesayangan aku","good morning","telfon","film",
  "main game","HAHAHAHA","sudah makan?","sleep","take care",
  "aku di sini","miss you","jangan overthinking","nanti lanjut lagi"
];

const GARDEN_SURPRISES = [
  "Bunga ini cuma ingin bilang: aku ingat.",
  "Yang ini tidak punya makna besar. Aku cuma ingin kamu menyentuhnya.",
  "Satu bunga untuk malam-malam kita.",
  "Kalau bunga ini bisa bicara, mungkin dia akan bilang: yali yali aku.",
  "Nggak semua hal harus dijelaskan. Beberapa cukup dirasakan.",
  "Yang ini buat semua tawa random yang pernah bikin malam jadi panjang."
];

const $ = (s,p=document)=>p.querySelector(s);
const $$ = (s,p=document)=>[...p.querySelectorAll(s)];
const toast=$("#toast");
let toastTimer;
function showToast(message){
  toast.textContent=message; toast.classList.add("show");
  clearTimeout(toastTimer); toastTimer=setTimeout(()=>toast.classList.remove("show"),3200);
}
function scrollNext(button){
  button.closest(".scene")?.nextElementSibling?.scrollIntoView({behavior:"smooth",block:"start"});
}
$$(".scene-next").forEach(b=>b.addEventListener("click",()=>scrollNext(b)));

/* INTRO */
const intro=$("#introText");
["Nanda...","pernah nggak kamu berpikir...","bagaimana sesuatu bisa terasa dekat...","meskipun nggak pernah kita sentuh?"].forEach(line=>{
  const span=document.createElement("span"); span.textContent=line; intro.appendChild(span);
});
setTimeout(()=>$("#beginBtn").classList.remove("hidden"),5000);
$("#beginBtn").addEventListener("click",()=>{
  $(".intro-light").animate(
    [{transform:"scale(1)"},{transform:"translateY(38vh) scale(.25)",opacity:.2}],
    {duration:1500,easing:"cubic-bezier(.22,.61,.36,1)",fill:"forwards"}
  );
  document.querySelector('[data-scene="seed"]').scrollIntoView({behavior:"smooth"});
  setTimeout(()=>$("#seedPlant").classList.add("grown"),900);
});

/* DAYS */
DAYS.forEach((item,index)=>{
  const card=document.createElement("button"); card.className="day-card"; card.type="button";
  card.innerHTML=`<div class="day-number">${item.day}</div><div class="day-text">${item.text}</div>`;
  card.addEventListener("click",()=>{
    card.classList.add("active");
    const flower=document.createElement("span"); flower.className="day-flower";
    flower.style.left=`${8+index*15}%`; flower.style.transform=`scale(${.8+(index%3)*.15})`;
    $("#daysGarden").appendChild(flower); showToast("Satu hari lagi tumbuh menjadi bunga.");
  });
  $("#daysGrid").appendChild(card);
});

/* LITTLE WORDS */
LITTLE_WORDS.forEach((item,index)=>{
  const flower=document.createElement("button"); flower.type="button"; flower.className="word-flower";
  const angle=(index/LITTLE_WORDS.length)*Math.PI*2;
  flower.style.left=`calc(${50+Math.cos(angle)*34}% - 26px)`;
  flower.style.top=`calc(${48+Math.sin(angle)*33}% - 26px)`;
  flower.innerHTML=`<span>${item.label}</span>`;
  flower.addEventListener("click",()=>{$("#wordReveal").textContent=item.message;showToast(item.label)});
  $("#wordsGarden").appendChild(flower);
});

/* NIGHT CARDS gentle reveal */
$$(".night-cards article").forEach((card,i)=>{
  card.addEventListener("click",()=>showToast(card.querySelector("strong").textContent));
});

/* STUBBORN PLANT */
const stubborn=$("#stubbornPlant"), stubbornText=$("#stubbornText"), stubbornNext=$('[data-scene="stubborn"] .scene-next');
let stubbornClicks=0;
function pokeStubborn(){
  stubbornClicks++; stubborn.classList.remove("shake"); void stubborn.offsetWidth; stubborn.classList.add("shake");
  const lines=["Katanya dia nggak mau tumbuh.","Okay, okay. Aku mencoba.","Jangan dilihatin terus.","Ya sudah. Kamu menang."];
  stubbornText.textContent=lines[Math.min(stubbornClicks,lines.length-1)];
  if(stubbornClicks>=2) stubborn.classList.add("grow");
  if(stubbornClicks>=3) stubbornNext.classList.remove("hidden");
}
stubborn.addEventListener("click",pokeStubborn);
stubborn.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();pokeStubborn()}});

/* ORDINARY DAYS */
ORDINARY_DAYS.forEach(([day,copy])=>{
  const card=document.createElement("article"); card.className="calendar-card";
  card.innerHTML=`<div class="calendar-day">${day}</div><div class="calendar-copy">${copy}</div>`;
  $("#calendar").appendChild(card);
});

/* FLOATING WORDS */
FLOATING_WORDS.forEach((word,i)=>{
  const el=document.createElement("span"); el.className=`float-word ${i%3===0?"bright":""}`;
  el.textContent=word; el.style.left=`${6+((i*31)%87)}%`;
  el.style.setProperty("--duration",`${13+(i%5)*2}s`);
  el.style.setProperty("--drift",`${(i%2?-1:1)*(12+i*3)}px`);
  el.style.animationDelay=`${-(i*1.7)}s`;
  $("#floatingWords").appendChild(el);
});

/* COMPLETE GARDEN */
const completeGarden=$("#completeGarden"), ground=document.createElement("div");
ground.className="garden-ground"; completeGarden.appendChild(ground);
for(let i=0;i<5;i++){
  const flower=document.createElement("button");
  flower.type="button";
  flower.className="garden-flower";

  // Exactly 5 flowers, fixed in a neat row below the story content.
  // No random positioning, so they never cover the text.
  const positions = [10, 30, 50, 70, 90];
  flower.style.left = `${positions[i]}%`;
  flower.style.top = "auto";
  flower.style.bottom = "9%";
  flower.style.animationDelay = `${i * -0.5}s`;

  flower.setAttribute("aria-label","Bunga untuk Nanda");
  flower.addEventListener("click",()=>{
    showToast(GARDEN_SURPRISES[Math.floor(Math.random()*GARDEN_SURPRISES.length)]);
    flower.animate(
      [{transform:"scale(1)"},{transform:"scale(1.8)"},{transform:"scale(1)"}],
      {duration:800,easing:"ease-out"}
    );
  });
  completeGarden.appendChild(flower);
}

/* YOUTUBE MUSIC — Rizky Febian: Hingga Tua Bersama */
(function(){
  const tag=document.createElement('script'); tag.src='https://www.youtube.com/iframe_api'; document.head.appendChild(tag);
  window.onYouTubeIframeAPIReady=function(){
    window.nandaYT=new YT.Player('ytPlayer',{videoId:'b5ZQob-mDGM',playerVars:{autoplay:1,controls:0,loop:1,playlist:'b5ZQob-mDGM',playsinline:1,rel:0,modestbranding:1},events:{onReady:function(e){e.target.mute(); e.target.playVideo();}}});
  };
  document.addEventListener('pointerdown',function(){ if(window.nandaYT){ try{window.nandaYT.unMute();window.nandaYT.playVideo();}catch(e){} }},{once:true});
})();

/* CANVAS ATMOSPHERE */
const canvas=$("#atmosphere"),ctx=canvas.getContext("2d",{alpha:true});
let particles=[], reducedMotion=matchMedia("(prefers-reduced-motion: reduce)").matches, visible=true;
function resizeCanvas(){
  const dpr=Math.min(devicePixelRatio||1,1.5);
  canvas.width=Math.floor(innerWidth*dpr); canvas.height=Math.floor(innerHeight*dpr);
  canvas.style.width=innerWidth+"px"; canvas.style.height=innerHeight+"px";
  ctx.setTransform(dpr,0,0,dpr,0,0);
}
function seedParticles(){
  const count=reducedMotion?18:(innerWidth<600?32:55);
  particles=Array.from({length:count},()=>({x:Math.random()*innerWidth,y:Math.random()*innerHeight,r:Math.random()*1.5+.3,a:Math.random()*.45+.08,speed:Math.random()*.18+.04,phase:Math.random()*Math.PI*2}));
}
resizeCanvas(); seedParticles();
addEventListener("resize",()=>{resizeCanvas();seedParticles()},{passive:true});
function drawParticles(time=0){
  if(!visible)return; ctx.clearRect(0,0,innerWidth,innerHeight);
  for(const p of particles){
    p.y-=p.speed;if(p.y<-5)p.y=innerHeight+5;
    const alpha=p.a*(.65+Math.sin(time*.001+p.phase)*.35);
    ctx.beginPath();ctx.arc(p.x+Math.sin(time*.00025+p.phase)*4,p.y,p.r,0,Math.PI*2);
    ctx.fillStyle=`rgba(242,235,221,${alpha})`;ctx.fill();
  }
  if(!reducedMotion)requestAnimationFrame(drawParticles);
}
requestAnimationFrame(drawParticles);
document.addEventListener("visibilitychange",()=>{visible=!document.hidden;if(visible&&!reducedMotion)requestAnimationFrame(drawParticles)});

/* TOUCH RIPPLE */
document.addEventListener("pointerdown",e=>{
  if(reducedMotion)return;
  const ripple=document.createElement("span");
  ripple.style.cssText=`position:fixed;z-index:8;pointer-events:none;width:8px;height:8px;border-radius:50%;left:${e.clientX}px;top:${e.clientY}px;background:rgba(242,235,221,.4);box-shadow:0 0 30px 12px rgba(200,169,107,.08)`;
  document.body.appendChild(ripple);
  ripple.animate([{transform:"translate(-50%,-50%) scale(.5)",opacity:.6},{transform:"translate(-50%,-50%) scale(8)",opacity:0}],{duration:900,easing:"cubic-bezier(.22,.61,.36,1)"}).finished.finally(()=>ripple.remove());
});

/* OPTIONAL QUIET SOUND — only after user taps */
let audioContext=null,oscillator=null,gain=null,soundOn=false;
function startSound(){
  audioContext ||= new(window.AudioContext||window.webkitAudioContext)();
  oscillator=audioContext.createOscillator();gain=audioContext.createGain();
  oscillator.type="sine";oscillator.frequency.value=174;gain.gain.value=.0001;
  oscillator.connect(gain).connect(audioContext.destination);oscillator.start();
  gain.gain.exponentialRampToValueAtTime(.012,audioContext.currentTime+2);
  soundOn=true;$("#soundToggle").textContent="Sound on";$("#soundToggle").setAttribute("aria-label","Matikan suara");
}
function stopSound(){
  if(!audioContext||!gain)return;
  gain.gain.exponentialRampToValueAtTime(.0001,audioContext.currentTime+.5);
  setTimeout(()=>{try{oscillator?.stop()}catch{}},600);
  soundOn=false;$("#soundToggle").textContent="Sound off";$("#soundToggle").setAttribute("aria-label","Nyalakan suara");
}
$("#soundToggle").addEventListener("click",()=>soundOn?stopSound():startSound());
