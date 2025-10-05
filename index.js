// script.js
const board=document.getElementById('board');
const dot=document.getElementById('dot');
const startBtn=document.getElementById('startBtn');
const timeEl=document.getElementById('time');
const scoreEl=document.getElementById('score');
const bestEl=document.getElementById('best');
const durationSelect=document.getElementById('duration');
const sizeSelect=document.getElementById('size');
const resetBestBtn=document.getElementById('resetBest');
let score=0,timeLeft=parseInt(durationSelect.value),timer=null,dotTimer=null,dotAppearInterval=900;
function loadBest(){const b=localStorage.getItem('catch-dot-best')||0;bestEl.textContent=b;}
loadBest();
function placeDot(){const pad=8;const w=board.clientWidth;const h=board.clientHeight;const size=parseInt(sizeSelect.value);dot.style.width=size+'px';dot.style.height=size+'px';const x=Math.floor(Math.random()*(w-size-pad*2)+pad);const y=Math.floor(Math.random()*(h-size-pad*2)+pad);dot.style.left=x+'px';dot.style.top=y+'px';dot.textContent=Math.floor(Math.random()*9)+1;dot.style.display='flex';clearTimeout(dotTimer);const jitter=Math.max(200,dotAppearInterval-Math.min(score*25,500));dotTimer=setTimeout(()=>{dot.style.display='none';placeDot();},jitter);}
function startGame(){score=0;scoreEl.textContent=0;timeLeft=parseInt(durationSelect.value);timeEl.textContent=timeLeft;startBtn.disabled=true;durationSelect.disabled=true;sizeSelect.disabled=true;dotAppearInterval=900;placeDot();timer=setInterval(()=>{timeLeft-=1;timeEl.textContent=timeLeft;if(timeLeft<=0){endGame();}},1000);}
function endGame(){clearInterval(timer);clearTimeout(dotTimer);dot.style.display='none';startBtn.disabled=false;durationSelect.disabled=false;sizeSelect.disabled=false;const best=parseInt(localStorage.getItem('catch-dot-best')||0);if(score>best){localStorage.setItem('catch-dot-best',score);loadBest();alert('Гра закінчена! Новий рекорд: '+score);}else alert('Гра закінчена! Очки: '+score);}
dot.addEventListener('click',()=>{if(timeLeft<=0)return;score+=1+Math.floor(Math.random()*2);scoreEl.textContent=score;dot.style.display='none';dotAppearInterval=Math.max(300,dotAppearInterval-10);dot.animate([{transform:'scale(1)'},{transform:'scale(.8)'},{transform:'scale(1)'}],{duration:120});clearTimeout(dotTimer);dotTimer=setTimeout(placeDot,150);});
startBtn.addEventListener('click',startGame);
resetBestBtn.addEventListener('click',()=>{localStorage.removeItem('catch-dot-best');loadBest();});
