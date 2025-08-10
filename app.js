
let promptSets = [];
let promptBank = [];
let audioElements = [];
let counter = 0;

function shuffle(a){ let i=a.length; while(i){ const j=Math.floor(Math.random()*i--); [a[i],a[j]]=[a[j],a[i]]; } return a; }

async function loadContent(){
  const res = await fetch('./content.json', {cache:'no-store'});
  const data = await res.json();
  promptSets = data.prompt_sets || [];
  buildPromptBank();
}

function buildPromptBank(){
  promptBank = [];
  for (const set of promptSets){
    if (!set || !set.length) continue;
    const copy = [...set]; shuffle(copy);
    promptBank.push(copy[0]);
  }
  shuffle(promptBank);
  audioElements = promptBank.map(p=>{
    const a = new Audio(p.audio);
    a.onended = ()=>{ document.getElementById('butt2').style.display='block'; };
    return a;
  });
  document.getElementById('overlay').style.display='none';
  document.getElementById('pCount').style.display='none';
  document.getElementById('pto').textContent = promptBank.length;
}

function introPage(){
  document.getElementById('butt').style.display='none';
  document.getElementById('promptHolder').innerHTML = `<h2 style="font-size:2rem">English 3 Speaking Milestone 3</h2><div style="font-size:1.25rem;margin-top:6vh">Please say your name and badge number.<br/>Tap OK to proceed.</div>`;
  document.getElementById('butt1').style.display='block';
  try { new Audio('assets/audio/E3_SM3_Intro.mp3').play(); } catch(e){}
}
function landingPage(){
  document.getElementById('butt1').style.display='none';
  document.getElementById('promptHolder').innerHTML = `<h2 style="font-size:2rem">English 3 Speaking Milestone 3</h2><div style="font-size:1.25rem;margin-top:6vh;line-height:1.6">You will see and hear 12 random prompts from modules 17 to 28 of this course.<br/>After you hear each prompt, you should respond.<br/>If you see a picture with your prompt, you can tap the picture to make it bigger.<br/>After you respond, tap the “Next” button to move to the next prompt.<br/>When you are ready, tap the “Start” button to begin.</div>`;
  document.getElementById('butt2').style.display='block';
  try { new Audio('assets/audio/E3_4_SM3_Inst.mp3').play(); } catch(e){}
}
function startActivity(){
  document.getElementById('butt2').style.display='none';
  document.getElementById('pageHead').style.display='block';
  document.getElementById('image_holder').style.display='none';
  counter++;
  if (counter>promptBank.length){
    document.getElementById('promptHolder').textContent = "You have finished.";
    document.getElementById('pCount').style.display='none';
    document.getElementById('butt2').style.display='none';
    document.getElementById('butt3').style.display='block';
    try { new Audio('assets/audio/E3_E4_End.mp3').play(); } catch(e){}
  } else {
    document.getElementById('pCount').style.display='block';
    const item = promptBank[counter-1];
    document.getElementById('promptHolder').textContent = item.text;
    const a = audioElements[counter-1];
    try { a.currentTime = 0; a.play(); } catch(e){}
    document.getElementById('pno').textContent = (counter) + " / ";
    if (item.image){
      document.getElementById('image_holder').style.display='block';
      document.getElementById('promptPic').src = item.image;
    }
  }
}
function enlarge(){
  const tgtImg = document.getElementById('promptPic');
  document.getElementById('image_holder').classList.add('zoom');
  tgtImg.style.maxWidth = "80vw"; tgtImg.style.maxHeight ="75vh";
  document.getElementById('cap').style.backgroundColor = "white";
  document.getElementById('cap').style.fontSize = "1.25rem";
  document.getElementById('cap').innerText = document.getElementById('promptHolder').innerText;
  document.getElementById('closeX').style.display = "block";
}
function closeImg(){
  document.getElementById('cap').textContent = "Tap to enlarge";
  document.getElementById('cap').style.fontSize = "1rem";
  document.getElementById('image_holder').classList.remove('zoom');
  document.getElementById('promptPic').style.maxWidth = "250px";
  document.getElementById('closeX').style.display = "none";
}
function startOver(){
  counter = 0;
  document.getElementById('butt3').style.display='none';
  document.getElementById('butt').style.display='block';
  document.getElementById('promptHolder').textContent = "Tap Continue to start again.";
}

window.addEventListener('load', loadContent);
