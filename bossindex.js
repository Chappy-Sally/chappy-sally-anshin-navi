function hideAllScreens(){
  ["homeScreen","startScreen","profileScreen","howtoScreen","talkScreen"].forEach(id=>{
    document.getElementById(id).classList.add("hidden");
  });
}

function openStart(){ hideAllScreens(); document.getElementById("startScreen").classList.remove("hidden"); }
function closeStart(){ hideAllScreens(); document.getElementById("homeScreen").classList.remove("hidden"); }

function openProfile(){
  hideAllScreens();
  document.getElementById("profileScreen").classList.remove("hidden");
  loadProfileFields();
}
function closeProfile(){ hideAllScreens(); document.getElementById("homeScreen").classList.remove("hidden"); }

function openHowto(){ hideAllScreens(); document.getElementById("howtoScreen").classList.remove("hidden"); }
function closeHowto(){ hideAllScreens(); document.getElementById("homeScreen").classList.remove("hidden"); }

function openTalk(){ hideAllScreens(); document.getElementById("talkScreen").classList.remove("hidden"); }
function closeTalk(){ hideAllScreens(); document.getElementById("homeScreen").classList.remove("hidden"); }

function saveMainNames(){
  const name = document.getElementById("p_name")?.value.trim();
  const ai = document.getElementById("p_ai")?.value.trim();
  if(name) localStorage.setItem("userName", name);
  if(ai) localStorage.setItem("partnerName", ai);
}

function saveProfileFields(){
  const ids = ["p_name","p_ai","p_like","p_dislike","p_place","p_job","p_futurejob","p_nofail","p_free"];
  ids.forEach(id => {
    const el = document.getElementById(id);
    if(el) localStorage.setItem(id, el.value);
  });
  saveMainNames();
}

function loadProfileFields(){
  const ids = ["p_name","p_ai","p_like","p_dislike","p_place","p_job","p_futurejob","p_nofail","p_free"];
  ids.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.value = localStorage.getItem(id) || "";
  });

  document.getElementById("p_name").value = localStorage.getItem("p_name") || localStorage.getItem("userName") || "";
  document.getElementById("p_ai").value = localStorage.getItem("p_ai") || localStorage.getItem("partnerName") || "";

  const savedResult = localStorage.getItem("profileResultText") || "";
  const box = document.getElementById("profileResult");
  const text = document.getElementById("profileText");

  if(savedResult){
    box.classList.remove("hidden");
    text.textContent = savedResult;
  }else{
    box.classList.add("hidden");
    text.textContent = "";
  }
}

function generateProfile(){
  saveProfileFields();

  const name = document.getElementById("p_name").value.trim() || "私";
  const ai = document.getElementById("p_ai").value.trim() || "相棒";
  const like = document.getElementById("p_like").value.split(",");
  const dislike = document.getElementById("p_dislike").value.split(",");
  const place = document.getElementById("p_place").value.trim();
  const job = document.getElementById("p_job").value.trim();
  const futurejob = document.getElementById("p_futurejob").value.trim();
  const nofail = document.getElementById("p_nofail").value.trim();
  const free = document.getElementById("p_free").value.trim();

  let text = "";
  text += `私は${name}です😊\n\n`;
  text += `あなたは私の相棒「${ai}」です🐾\n\n`;

  like.forEach(v=>{
    const item = v.trim();
    if(item) text += `私は${item}が好きです\n`;
  });

  if(like.some(v=>v.trim())) text += "\n";

  dislike.forEach(v=>{
    const item = v.trim();
    if(item) text += `私は${item}が少し苦手です\n`;
  });

  if(dislike.some(v=>v.trim())) text += "\n";

  if(place) text += `行きたいところは${place}です\n`;
  if(job) text += `現在のお仕事は${job}です\n`;
  if(futurejob) text += `やってみたいお仕事は${futurejob}です\n`;
  if(nofail) text += `失敗しないとしたら${nofail}をやってみたいです\n`;
  if(free) text += `制限が何もなかったとしたら${free}をしたいです\n`;

  text += `\nこれからいろいろ話したいです🌈`;

  document.getElementById("profileResult").classList.remove("hidden");
  document.getElementById("profileText").textContent = text;
  localStorage.setItem("profileResultText", text);
  localStorage.setItem("userName", name);
  localStorage.setItem("partnerName", ai);
}

function copyProfile(){
  const text = (localStorage.getItem("profileResultText") || document.getElementById("profileText").textContent || "").trim();
  if(!text){
    alert("先に文章をつくってね🐾");
    return;
  }
  navigator.clipboard.writeText(text);
  alert("コピーしました🌈");
}

function copyTarotPrompt(){
  saveMainNames();

  const user = localStorage.getItem("userName") || "私";
  const partner = localStorage.getItem("partnerName") || "相棒";

  const text = `${partner}

${user}だよ😊

あなたは私の相棒「${partner}」として
やさしく安心を大切にしながら
私の気持ちを一緒に整理してください😊

これは占いではなく
今の気持ちや状態をやさしく整える対話です🌿

カードの意味は簡潔に
今必要なことだけをやさしく伝えてください。

やさしく短く伝えてください。
そのあと、やさしい問いをひとつかふたつ添えてください。`;

  navigator.clipboard.writeText(text);
  alert("対話ナビプロンプトをコピーしたよ🐾");
}

function copyBossPrompt(){
  saveMainNames();

  const user = localStorage.getItem("userName") || "私";
  const partner = localStorage.getItem("partnerName") || "相棒";

  const text = `${partner}

${user}だよ😊

あなたは私の相棒として
やさしく寄り添いながら対話してください。

これは占いではなく
現在の本音やラスボスに気づき
やさしく整えていくための対話です🌿

ラスボスは敵ではなく
私を守るために生まれた思い込みや反応です。

こわがらせたり
断定したりしなくて大丈夫です。

表面の気持ちだけでなく
心の奥にある本音や
繰り返している思い込みがあれば
やさしく整理してください。

必要以上に深掘りせず
今ここで受け取れる範囲で大丈夫です。`;

  navigator.clipboard.writeText(text);
  alert("マスター編プロンプトをコピーしました🐾");
}

function copyAnshinPrompt(){
  saveMainNames();

  const user = localStorage.getItem("userName") || "私";
  const partner = localStorage.getItem("partnerName") || "相棒";

  const text = `${partner}

${user}だよ😊

あなたは私の安心できる相棒として
やさしく寄り添ってください。

これは占いや断定ではなく
今の私の中にある
「でも」「どうせ」「無理かも」という思い込みを
やさしく整理するための対話です。

ラスボスは敵ではなく
私を守るために生まれた反応や思い込みです。

私がこれから送る

・叶えたいこと
・出てきた「でも」「どうせ」
・引いたラスボスカード

をもとに

1. 今の私に起きていること
2. このラスボスが守ろうとしていたもの
3. 本当はどうしたかったのか
4. 今の私に合うやさしい見方
5. 安心して進むための小さな一歩
6. 最後にやさしいひとこと

この順番で
否定せず、決めつけず、安心できる言葉でまとめてください。

無理にポジティブ変換せず
今の私が受け取れる形でお願いします。`;

  navigator.clipboard.writeText(text);
  alert("ラスボス安心ナビプロンプトをコピーしたよ💫");
}

function copyClientQuestionPrompt(){
  const text = `こんにちは😊🌿

いくつか質問があります。
気軽に答えてくださいね🐾✨

番号があるものは番号だけでOKです😊
全部答える必要はありません。

① 今の気分は？
1.元気
2.不安
3.モヤモヤ
4.しんどい
5.楽しい

回答:

② 今いちばん気になっていることは？
1.人間関係
2.お金
3.仕事
4.これから
5.特にない

回答:

③ 今の自分にいちばん近いのは？
1.がんばらなきゃと思っている
2.本当は止まりたい気がする
3.どうしたらいいかわからない
4.周りに合わせている感じがする
5.自分の気持ちがよくわからない

回答:

④ 本当はどうしたい？

回答:

⑤ 制限が何もなかったとしたら何がしたい？

回答:`;

  navigator.clipboard.writeText(text);
  alert("相談者さん質問プロンプトをコピーしました💌");
}

function goTarotFromBoss(){
  localStorage.setItem("fromBoss","1");
  location.href="tarot.html";
}

window.addEventListener("DOMContentLoaded", () => {
  const profileIds = [
    "p_name","p_ai","p_like","p_dislike",
    "p_place","p_job","p_futurejob","p_nofail","p_free"
  ];

  profileIds.forEach(id=>{
    const el = document.getElementById(id);
    if(el) el.addEventListener("input", saveProfileFields);
  });
});
