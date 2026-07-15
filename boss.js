const tarotImageBase =
  "https://raw.githubusercontent.com/Chappy-Sally/chappy-sally-images/main/tarot/";

const bossImageBase =
  "https://raw.githubusercontent.com/Chappy-Sally/chappy-sally-images/main/lassboss/";

const tarotFiles = [
  "00_The_Fool.png",
  "01_The_Magician.png",
  "02_The_High_Priestess.png",
  "03_The_Empress.png",
  "04_The_Emperor.png",
  "05_The_Hierophant.png",
  "06_The_Lovers.png",
  "07_The_Chariot.png",
  "08_Strength.png",
  "09_The_Hermit.png",
  "10_Wheel_of_Fortune.png",
  "11_Justice.png",
  "12_The_Hanged_Man.png",
  "13_Death.png",
  "14_Temperance.png",
  "15_The_Devil.png",
  "16_The_Tower.png",
  "17_The_Star.png",
  "18_The_Moon.png",
  "19_The_Sun.png",
  "20_Judgement.png",
  "21_The_World.png",
  "22_Compass.png"
];

const bossFiles = [
  "boss_people_eyes.png",
  "boss_perfection.png",
  "boss_fear_of_failure.png",
  "boss_low_confidence.png",
  "boss_comparison.png",
  "boss_impatience.png",
  "boss_anxiety.png",
  "boss_attachment.png",
  "boss_past.png",
  "boss_future_worry.png",
  "boss_money.png",
  "boss_overwork.png",
  "boss_guilt.png",
  "boss_give_up.png",
  "boss_endurance.png",
  "boss_obligation.png",
  "boss_hesitation.png"
];

const bossNameMap = {
  boss_people_eyes: "人の目が気になる",
  boss_perfection: "完璧にしなきゃ",
  boss_fear_of_failure: "失敗したくない",
  boss_low_confidence: "自信がない",
  boss_comparison: "比較してしまう",
  boss_impatience: "焦り",
  boss_anxiety: "不安",
  boss_attachment: "執着",
  boss_past: "過去へのとらわれ",
  boss_future_worry: "未来への不安",
  boss_money: "お金の不安",
  boss_overwork: "がんばりすぎ",
  boss_guilt: "罪悪感",
  boss_give_up: "あきらめ",
  boss_endurance: "我慢ぐせ",
  boss_obligation: "義務感",
  boss_hesitation: "遠慮"
};

let kamiTimer = null;

function getRandomItem(list) {
  return list[Math.floor(Math.random() * list.length)];
}

function getRandomItems(list, count) {
  return [...list]
    .sort(() => Math.random() - 0.5)
    .slice(0, count);
}

function getSelfName() {
  return localStorage.getItem("userName") || "";
}

function getPartnerName() {
  return localStorage.getItem("partnerName") || "";
}

function getClientName() {
  const el = document.getElementById("clientName");
  return el ? el.value.trim() : "";
}

function getQuestion() {
  const el = document.getElementById("question");
  return el ? el.value.trim() : "";
}

function saveSessionInputs() {
  localStorage.setItem("clientName", getClientName());
  localStorage.setItem("question", getQuestion());
}

function restoreSessionInputs() {
  const clientEl = document.getElementById("clientName");
  const questionEl = document.getElementById("question");

  if (clientEl) {
    clientEl.value = localStorage.getItem("clientName") || "";
  }

  if (questionEl) {
    questionEl.value = localStorage.getItem("question") || "";
  }
}

function clearCards() {
  const cards = document.getElementById("cards");
  const summary = document.getElementById("summary-area");

  if (cards) {
    cards.innerHTML = "";
  }

  if (summary) {
    summary.innerHTML = "";
  }
}

function clearKamiTimer() {
  if (kamiTimer) {
    clearTimeout(kamiTimer);
    kamiTimer = null;
  }
}

function hideAllScreens() {
  ["tarot-screen", "boss-screen", "kami-screen"].forEach(id => {
    const el = document.getElementById(id);

    if (el) {
      el.classList.add("hidden");
    }
  });
}

function showTarotScreen() {
  clearKamiTimer();
  hideAllScreens();

  const tarotScreen = document.getElementById("tarot-screen");

  if (tarotScreen) {
    tarotScreen.classList.remove("hidden");
  }

  clearCards();
  restoreSessionInputs();
}

function showBossScreen() {
  clearKamiTimer();
  hideAllScreens();

  const bossScreen = document.getElementById("boss-screen");

  if (bossScreen) {
    bossScreen.classList.remove("hidden");
  }

  clearCards();
  restoreSessionInputs();
}

function showKamiScreen() {
  clearKamiTimer();
  hideAllScreens();
  clearCards();

  const kamiScreen = document.getElementById("kami-screen");

  if (kamiScreen) {
    kamiScreen.classList.remove("hidden");
  }

  kamiTimer = setTimeout(() => {
    showTarotScreen();
  }, 10000);
}

function skipToTarot() {
  clearKamiTimer();
  showTarotScreen();
}

function backToStart() {
  location.href = "bossindex.html";
}

function bossToJapanese(fileName) {
  const key = fileName.replace(".png", "");
  return bossNameMap[key] || key;
}

function formatTarotCard(card) {
  const name = card.name.replace(".png", "");
  const position = card.reversed ? "逆位置" : "正位置";

  return `${name}（${position}）`;
}

function copyToClipboard(text) {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      alert("コピーしたよ✨");
    })
    .catch(() => {
      alert("コピーできませんでした。手動でコピーしてください🙏");
    });
}

function buildTarotAiText(cards) {
  const partner = getPartnerName();
  const selfName = getSelfName();
  const client = getClientName();
  const question = getQuestion();

  let text = "";

  if (partner) {
    text += `${partner}\n`;
  }

  if (selfName) {
    text += `${selfName}だよ😊\n\n`;
  }

  if (client) {
    text += `${client}さんの\n`;
  }

  if (question) {
    text += `質問は${question}です。\n\n`;
  }

  text += "カードを引いたよ！\n\n";

  cards.forEach(card => {
    text += `${formatTarotCard(card)}\n`;
  });

  text += "\nだったよ！";

  return text;
}

function buildTarotAfterAiText(cards) {
  const partner = getPartnerName();
  const selfName = getSelfName();
  const client = getClientName();
  const question = getQuestion();

  let text = "";

  if (partner) {
    text += `${partner}\n`;
  }

  if (selfName) {
    text += `${selfName}だよ😊\n\n`;
  }

  if (client) {
    text += `${client}さんの\n`;
  }

  if (question) {
    text += `質問は${question}です。\n\n`;
  }

  text += "気づきを受け取ったあとの、\n";
  text += "今の私がやさしく進むためのヒントを\n\n";
  text += "短くやさしく教えてください😊\n";
  text += "そのあと、やさしい問いを1〜2個ください。\n\n";
  text += "カードは\n\n";

  cards.forEach(card => {
    text += `${formatTarotCard(card)}\n`;
  });

  text += "\nだったよ！";

  return text;
}

function buildBossAiText(cards) {
  const partner = getPartnerName();
  const selfName = getSelfName();
  const client = getClientName();
  const question = getQuestion();

  let text = "";

  if (partner) {
    text += `${partner}\n`;
  }

  if (selfName) {
    text += `${selfName}だよ😊\n\n`;
  }

  if (client) {
    text += `${client}さんの\n`;
  }

  if (question) {
    text += `質問は${question}です。\n\n`;
  }

  text += "ラスボスは\n";
  text += "問題ではなく、\n\n";

  text += "私を守るために生まれた\n";
  text += "思い込みやクセに\n";
  text += "気づくためのヒントです😊🌿\n\n";

  text += "否定や断定ではなく、\n\n";

  text += "今の私が\n";
  text += "やさしく安心しながら\n";
  text += "気づける形で教えてね❣\n\n";

  text += "また、\n";
  text += "無理にポジティブ変換するのではなく、\n\n";

  text += "「本当はどうしたかったのか」\n";
  text += "「何を守ろうとしていたのか」\n\n";

  text += "をやさしく整理してください😊\n\n";

  text += "ラスボスは\n";
  text += "悪者ではなく、\n";
  text += "自分を守ろうとしていた反応として扱ってください🌈\n\n";

  text += "最後は\n\n";

  text += "「守ってくれてたんだね」\n";
  text += "「ありがとう😊」\n\n";

  text += "という安心感で\n";
  text += "やさしく終わるようにしてください💕\n\n";

  text += "ラスボスカードは\n\n";

  cards.forEach(card => {
    text += `${card.label}：${bossToJapanese(card.name)}\n`;
  });

  text += "\nだったよ！";

  return text;
}

function createTarotCard(
  forcedCard = null,
  forcedReversed = null
) {
  const card = forcedCard || getRandomItem(tarotFiles);

  const box = document.createElement("div");
  box.className = "card-box";

  const img = document.createElement("img");

  // 画像専用リポジトリから表示
  img.src = tarotImageBase + card;
  img.alt = card;

  const reversed =
    forcedReversed !== null
      ? forcedReversed
      : Math.random() < 0.5;

  if (reversed) {
    img.classList.add("reversed");
  }

  box.appendChild(img);

  return {
    element: box,
    name: card,
    reversed
  };
}

function createBossCard(
  labelText,
  forcedBoss = null
) {
  const boss = forcedBoss || getRandomItem(bossFiles);

  const box = document.createElement("div");
  box.className = "card-box";

  const img = document.createElement("img");

  // 画像専用リポジトリから表示
  img.src = bossImageBase + boss;
  img.alt = boss;

  const label = document.createElement("div");
  label.className = "label";
  label.textContent =
    `${labelText}\n${bossToJapanese(boss)}`;

  box.appendChild(img);
  box.appendChild(label);

  return {
    element: box,
    name: boss,
    label: labelText
  };
}

function showTarotSummaryBox(
  aiNowText,
  aiAfterText,
  titleText
) {
  const area = document.getElementById("summary-area");

  if (!area) {
    return;
  }

  area.innerHTML = "";

  const box = document.createElement("div");
  box.className = "summary-box";

  const title = document.createElement("div");
  title.className = "summary-title";
  title.textContent = titleText;

  const buttons = document.createElement("div");
  buttons.className = "summary-buttons";

  const aiBtn1 = document.createElement("button");
  aiBtn1.className = "mini-btn mini-ai";
  aiBtn1.textContent = "１度目診断コピー🤖";
  aiBtn1.onclick = () => copyToClipboard(aiNowText);

  const aiBtn2 = document.createElement("button");
  aiBtn2.className = "mini-btn mini-ai";
  aiBtn2.textContent = "気づいたあと診断コピー🌈";
  aiBtn2.onclick = () => copyToClipboard(aiAfterText);

  const aiBtn3 = document.createElement("button");
  aiBtn3.className = "mini-btn mini-ai";
  aiBtn3.textContent = "相談者さんまとめプロンプト🌈";
  aiBtn3.onclick = () => copyClientSummaryPrompt();

  buttons.appendChild(aiBtn1);
  buttons.appendChild(aiBtn2);
  buttons.appendChild(aiBtn3);

  box.appendChild(title);
  box.appendChild(buttons);
  area.appendChild(box);
}

function showBossSummaryBox(aiText) {
  const area = document.getElementById("summary-area");

  if (!area) {
    return;
  }

  area.innerHTML = "";

  const box = document.createElement("div");
  box.className = "summary-box";

  const title = document.createElement("div");
  title.className = "summary-title";
  title.textContent = "🌈 ラスボスまとめ";

  const buttons = document.createElement("div");
  buttons.className = "summary-buttons";

  const aiBtn = document.createElement("button");
  aiBtn.className = "mini-btn mini-ai";
  aiBtn.textContent = "診断コピー🤖";
  aiBtn.onclick = () => copyToClipboard(aiText);

  const anshinBtn = document.createElement("button");
  anshinBtn.className = "mini-btn mini-ai";
  anshinBtn.textContent = "安心ナビへ💫";
  anshinBtn.onclick = () => {
    location.href = "boss-anshin.html";
  };

  buttons.appendChild(aiBtn);
  buttons.appendChild(anshinBtn);

  box.appendChild(title);
  box.appendChild(buttons);
  area.appendChild(box);
}

function showReturnToTarotBox() {
  const area = document.getElementById("summary-area");

  if (!area) {
    return;
  }

  const box = document.createElement("div");
  box.className = "return-box";

  const message = document.createElement("div");
  message.className = "return-message";
  message.textContent =
    "ラスボスは\n" +
    "あなたを守るために現れた\n" +
    "守神様\n\n" +
    "気づいたあなたはもう大丈夫🌈\n\n" +
    "いまのあなたで\n" +
    "もう一度カードを引いてみよう🐾";

  const btn = document.createElement("button");
  btn.className = "return-btn";
  btn.textContent = "もう一度タロットを引く🔮";
  btn.onclick = () => showKamiScreen();

  box.appendChild(message);
  box.appendChild(btn);
  area.appendChild(box);
}

function drawTarotOne() {
  clearCards();

  const cardObj = createTarotCard();

  const cardsArea = document.getElementById("cards");

  if (!cardsArea) {
    return;
  }

  cardsArea.appendChild(cardObj.element);

  const cards = [
    {
      name: cardObj.name,
      reversed: cardObj.reversed
    }
  ];

  showTarotSummaryBox(
    buildTarotAiText(cards),
    buildTarotAfterAiText(cards),
    "✨ 1枚まとめ"
  );
}

function drawTarotThree() {
  clearCards();

  const cardsArea = document.getElementById("cards");

  if (!cardsArea) {
    return;
  }

  const selectedCards =
    getRandomItems(tarotFiles, 3);

  const card1 = createTarotCard(
    selectedCards[0],
    Math.random() < 0.5
  );

  const card2 = createTarotCard(
    selectedCards[1],
    Math.random() < 0.5
  );

  const card3 = createTarotCard(
    selectedCards[2],
    Math.random() < 0.5
  );

  cardsArea.appendChild(card1.element);
  cardsArea.appendChild(card2.element);
  cardsArea.appendChild(card3.element);

  const cards = [
    {
      name: card1.name,
      reversed: card1.reversed
    },
    {
      name: card2.name,
      reversed: card2.reversed
    },
    {
      name: card3.name,
      reversed: card3.reversed
    }
  ];

  showTarotSummaryBox(
    buildTarotAiText(cards),
    buildTarotAfterAiText(cards),
    "✨ 3枚まとめ"
  );
}

function drawBossOne() {
  clearCards();

  const cardsArea = document.getElementById("cards");

  if (!cardsArea) {
    return;
  }

  const cardObj =
    createBossCard("今のラスボス");

  cardsArea.appendChild(cardObj.element);

  const cards = [
    {
      label: "今のラスボス",
      name: cardObj.name
    }
  ];

  showBossSummaryBox(
    buildBossAiText(cards)
  );

  showReturnToTarotBox();
}

function drawBossThree() {
  clearCards();

  const cardsArea = document.getElementById("cards");

  if (!cardsArea) {
    return;
  }

  const selectedBosses =
    getRandomItems(bossFiles, 3);

  const card1 = createBossCard(
    "今のラスボス",
    selectedBosses[0]
  );

  const card2 = createBossCard(
    "隠れラスボス",
    selectedBosses[1]
  );

  const card3 = createBossCard(
    "心のボス戦",
    selectedBosses[2]
  );

  cardsArea.appendChild(card1.element);
  cardsArea.appendChild(card2.element);
  cardsArea.appendChild(card3.element);

  const cards = [
    {
      label: "今のラスボス",
      name: card1.name
    },
    {
      label: "隠れラスボス",
      name: card2.name
    },
    {
      label: "心のボス戦",
      name: card3.name
    }
  ];

  showBossSummaryBox(
    buildBossAiText(cards)
  );

  showReturnToTarotBox();
}

function copyClientSummaryPrompt() {
  const text = `以下はタロットとラスボスの解読です。

まずはカードの流れを日本語で簡単にまとめてください。

・1回目のカード
・ラスボスカード
・気づいたあと引いたカード

そのあと、
それぞれの内容をふまえて
相談者さんにわかりやすく伝えられるように
全体の流れをやさしく一つにまとめてください😊

・むずかしくしない
・やさしく安心できる言葉
・長くなりすぎない
・否定や断定はしない
・問いかけは不要
・そのまま送れるやさしい文章にする

以下の流れでまとめてください🌿

今の状態
テーマ（ラスボス）
やさしい気づき
小さな一歩
やさしいひとこと`;

  copyToClipboard(text);
}

window.addEventListener("load", () => {
  localStorage.removeItem("clientName");
  localStorage.removeItem("question");

  const questionEl =
    document.getElementById("question");

  const clientEl =
    document.getElementById("clientName");

  if (questionEl) {
    questionEl.value = "";
  }

  if (clientEl) {
    clientEl.value = "";
  }

  showTarotScreen();
});
