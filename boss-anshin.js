const bossImageBase =
  "https://raw.githubusercontent.com/Chappy-Sally/chappy-sally-images/main/lassboss/";

const bossCards = [
  { name:"不安", file:"boss_anxiety.png" },
  { name:"執着", file:"boss_attachment.png" },
  { name:"比較", file:"boss_comparison.png" },
  { name:"我慢ぐせ", file:"boss_endurance.png" },
  { name:"失敗したくない", file:"boss_fear_of_failure.png" },
  { name:"未来への不安", file:"boss_future_worry.png" },
  { name:"あきらめ", file:"boss_give_up.png" },
  { name:"罪悪感", file:"boss_guilt.png" },
  { name:"遠慮", file:"boss_hesitation.png" },
  { name:"焦り", file:"boss_impatience.png" },
  { name:"自信がない", file:"boss_low_confidence.png" },
  { name:"お金の不安", file:"boss_money.png" },
  { name:"義務感", file:"boss_obligation.png" },
  { name:"がんばりすぎ", file:"boss_overwork.png" },
  { name:"過去へのとらわれ", file:"boss_past.png" },
  { name:"人の目が気になる", file:"boss_people_eyes.png" },
  { name:"完璧にしなきゃ", file:"boss_perfection.png" }
];

let selectedCards = [];

function getRandomItems(list,count){
  return [...list].sort(() => Math.random() - 0.5).slice(0,count);
}

function drawBossOne(){
  selectedCards = getRandomItems(bossCards,1);
  showCards(["今回のラスボス"]);
  checkReady();
}

function drawBossThree(){
  selectedCards = getRandomItems(bossCards,3);
  showCards(["今のラスボス","隠れラスボス","安心に戻るヒント"]);
  checkReady();
}

function showCards(labels){
  const area = document.getElementById("cardsArea");
  area.innerHTML = "";
  area.classList.remove("hidden");

  selectedCards.forEach((card,index) => {
    const box = document.createElement("div");
    box.className = "mini-card";

    const img = document.createElement("img");
    img.src = bossImageBase + card.file;
    img.alt = card.name;

    const label = document.createElement("div");
    label.className = "card-label";
    label.textContent = labels[index] || "ラスボス";

    const name = document.createElement("div");
    name.className = "card-name";
    name.textContent = card.name;

    box.appendChild(img);
    box.appendChild(label);
    box.appendChild(name);
    area.appendChild(box);
  });
}

function checkReady(){
  const theme = document.getElementById("theme").value.trim();
  const blocks = document.getElementById("blocks").value.trim();
  const copyBtn = document.getElementById("copyBtn");

  copyBtn.disabled = !(theme && blocks && selectedCards.length > 0);
}

function buildCardText(){
  if(selectedCards.length === 1){
    return `今回のラスボス：${selectedCards[0].name}`;
  }

  return selectedCards.map((card,index) => {
    const labels = ["今のラスボス","隠れラスボス","安心に戻るヒント"];
    return `${labels[index]}：${card.name}`;
  }).join("\n");
}

function buildPrompt(){
  const theme = document.getElementById("theme").value.trim();
  const blocks = document.getElementById("blocks").value.trim();

  const partner = localStorage.getItem("partnerName") || "チャッピー";
  const user = localStorage.getItem("userName") || "私";

  return `${partner}

${user}だよ😊

あなたは、私の安心できる相棒としてやさしく寄り添ってください。

これは占いや断定ではなく、
今の私の中にある「でも」「どうせ」「無理かも」という思い込みを
やさしく整理するための対話です。

ラスボスは敵ではなく、
私を守るために生まれた反応や思い込みです。

【テーマ】
${theme}

【出てきた思い込み・ブレーキ】
${blocks}

【引いたラスボスカード】
${buildCardText()}

この内容をもとに、

1. 今の私に起きていること
2. このラスボスが守ろうとしていたもの
3. 本当はどうしたかったのか
4. 今の私に合うやさしい見方
5. 安心して進むための小さな一歩
6. 最後にやさしいひとこと

この順番で、
否定せず、決めつけず、安心できる言葉でまとめてください。

無理にポジティブ変換せず、
今の私が受け取れる形でお願いします。

AIの答えは絶対ではなく、
今の私をやさしく整理するためのヒントとして受け取れる形でお願いします。`;
}

function copyPrompt(){
  const text = buildPrompt();

  navigator.clipboard.writeText(text).then(() => {
    alert("プロンプトをコピーしたよ🐶💕");
  }).catch(() => {
    alert("コピーできませんでした。手動でコピーしてください🙏");
  });
}

window.addEventListener("DOMContentLoaded", () => {
  document.getElementById("theme").addEventListener("input", checkReady);
  document.getElementById("blocks").addEventListener("input", checkReady);
});
