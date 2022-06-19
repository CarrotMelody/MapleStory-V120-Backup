/**
 *
 * @author Sharky
 * @info BlackJack NPC
 */
importPackage(java.lang);
var debug = false; // set to true for debugging checks to appear in your .bat files
var status = 0,
  bet,
  selected;
var whichFunction = { HowToPlay: false, PlayGame: false, SpendChips: false };
var playingAction = { Hit: false, Stay: false };
var CardsInDeck = [[], []],
  CardsInPlayerHand = [[], []],
  CardsInDealerHand = [[], []];
var prizes = [[4001008], [10]]; // Item 4001008 (Pass) costs 10 Chips
// var prizes = [[enter, item, ids, here, like, so], [enter, amount, of, chips, needed, for, corresponding, item, here, like, so]];

function start() {
  cm.sendSimple(
    "你好！我是#rBlackJack莊家#k.#b \r\n\t#L0#我該怎麼玩BlackJack？#l \r\n\t#L1#我想玩Black Jack！#l \r\n\t#L2#我想用我的Black Jack 籌碼換取獎品！#l"
  );
}

function action(m, t, s) {
  if (m == -1 || (m != 1 && whichFunction["PlayGame"])) {
    cm.dispose();
    return;
  } else {
    if (m == 1) {
      status++;
    } else {
      status--;
    }
    if (
      !whichFunction["HowToPlay"] &&
      !whichFunction["PlayGame"] &&
      !whichFunction["SpendChips"]
    ) {
      whichFunction[
        s == 0 ? "HowToPlay" : s == 1 ? "PlayGame" : "SpendChips"
      ] = true;
    }
    if (whichFunction["HowToPlay"]) {
      HowToPlay();
    } else if (whichFunction["PlayGame"]) {
      PlayGame(s);
    } else if (whichFunction["SpendChips"]) {
      SpendChips(s);
    }
  }
}

function HowToPlay() {
  if (status == 1) {
    if (debug) {
      System.out.println("HowToPlay() is progressing...");
    }
    cm.sendNext(
      "好吧，我看到我們這裡有一個菜鳥！不用擔心，我會很樂意教您如何玩 #rBlackJack#k!"
    );
  } else if (status == 2) {
    cm.sendNextPrev(
      "系統會給您 #b籌碼#k玩遊戲。這些#b籌碼#k 是給您用來下注的！在發給您任何牌之前，您必須先下注。如果您贏得一輪，您的籌碼將增加一倍，如果您只抽兩張牌就達到#bBlack Jack#k（21點），您的籌碼將被返還2.5倍！"
    );
  } else if (status == 3) {
    cm.sendNextPrev(
      "在遊戲開始時，您將獲得2張卡。計算這些卡並加總值。 #b遊戲的目標是當您將手中的所有卡牌加在一起時獲得21點（或接近21點）。#k. 完成此操作後，您可以選擇#bHit#k (用來抽出另一張牌), 或 #bStay#k. 如果您選擇#bhit#k, 請記住，超過21點將導致您#r爆掉#k, 或將游戲輸給發牌人。如果您認為自己已經接近21，並且希望#bstay#k, 您將和發牌者將比較大小，最接近21者勝！"
    );
  } else if (status == 4) {
    cm.sendPrev("請記住，如果輸了，您給發牌者的所有#b籌碼#k都會輸掉！祝好運！");
  } else if (status == 5) {
    cm.dispose();
  }
}

function PlayGame(s) {
  if (status == 1) {
    if (debug) {
      System.out.println("PlayGame() is progressing...");
    }
    if (cm.getPlayer().getBlackJackChips() == 0) {
      cm.getPlayer().gainBlackJackChips(5);
    }
    cm.sendGetNumber(
      "您目前有 #b" +
        cm.getPlayer().getBlackJackChips() +
        " BlackJack 籌碼#k. 多少 #b籌碼#k 你想在本輪投注？",
      1,
      1,
      cm.getPlayer().getBlackJackChips()
    );
  } else if (status == 2) {
    if (s > 0 && s <= cm.getPlayer().getBlackJackChips()) {
      // packet edits
      bet = s;
      if (debug) {
        System.out.println("Deck Initializing...");
      }
      InitializeGame();
      var totP = GetTotalCardValue("Player"),
        totD = GetTotalCardValue("Dealer");
      if (
        totD == 21 &&
        CardsInDealerHand[0].length == 2 &&
        totP == 21 &&
        CardsInPlayerHand[0].length == 2
      ) {
        Finish("Tie");
      } else if (totP == 21 && CardsInPlayerHand[0].length == 2) {
        Finish("Player21");
      } else if (totD == 21 && CardsInDealerHand[0].length == 2) {
        Finish("Dealer21");
      } else {
        DisplayHandWithProgression();
      }
    }
  } else if (status > 2) {
    playingAction[s == 0 ? "Hit" : "Stay"] = true;
    var totP, totD;
    if (playingAction["Stay"]) {
      if (debug) {
        System.out.println("玩家選擇 Stay.");
      }
      if (totD < 16) {
        CompleteDealer();
        if (debug) {
          System.out.println(
            "當玩家選擇Stay時，發牌者低於16，發牌者成功完成。"
          );
        }
      }
      (totP = GetTotalCardValue("Player")),
        (totD = GetTotalCardValue("Dealer"));
      if (totP > 21 && totD > 21) {
        Finish("DoubleBust");
      } else if (totP > 21) {
        Finish("PlayerBust");
      } else if (totD > 21) {
        Finish("DealerBust");
      } else if (totP == totD) {
        Finish("Tie");
      } else if (totP == 21 && CardsInPlayerHand[0].length == 2) {
        Finish("Player21");
      } else if (totD == 21 && CardsInDealerHand[0].length == 2) {
        Finish("Dealer21");
      } else if (totP > totD) {
        Finish("Win");
      } else if (totP < totD) {
        Finish("Lose");
      }
    } else if (playingAction["Hit"]) {
      AddCardToHand();
      (totP = GetTotalCardValue("Player")),
        (totD = GetTotalCardValue("Dealer"));
      if (
        totD == 21 &&
        CardsInDealerHand[0].length == 2 &&
        totP == 21 &&
        CardsInPlayerHand[0].length == 2
      ) {
        Finish("Tie");
      } else if (totP == 21 && CardsInPlayerHand[0].length == 2) {
        Finish("Player21");
      } else if (totD == 21 && CardsInDealerHand[0].length == 2) {
        Finish("Dealer21");
      } else if (totP > 21) {
        Finish("PlayerBust");
      } else if (totD > 21) {
        Finish("DealerBust");
      } else {
        DisplayHandWithProgression();
      }
    }
  }
}

function InitializeGame() {
  var cardNames = [
    "One",
    "Two",
    "Three",
    "Four",
    "Five",
    "Six",
    "Seven",
    "Eight",
    "Nine",
    "Ten",
    "Jack",
    "Queen",
    "King",
    "Ace",
  ];
  var cardSuits = ["Hearts", "Spades", "Diamonds", "Clubs"];
  for (var i = 0, a = 0; a < cardNames.length; i++) {
    if (i == 4) {
      a++;
      i = 0;
    }
    CardsInDeck[0].push(cardNames[a]);
    CardsInDeck[1].push(cardSuits[i]);
  }
  CardsInDeck[0].splice(-1);
  CardsInDeck[1].splice(-1);
  if (debug) {
    for (var i = 0; i < CardsInDeck[0].length; i++) {
      System.out.println(
        CardsInDeck[0][i] + " of " + CardsInDeck[1][i] + " pushed."
      );
    }
  }
  AddCardToHand();
  AddCardToHand();
}

function AddCardToHand() {
  var random;
  random = Math.floor(Math.random() * CardsInDeck[0].length);
  CardsInPlayerHand[0].push(CardsInDeck[0][random]);
  CardsInPlayerHand[1].push(CardsInDeck[1][random]);
  if (debug) {
    System.out.println(
      "Card Added to Player Hand: " +
        CardsInDeck[0][random] +
        " of " +
        CardsInDeck[1][random]
    );
  }
  for (var i = 0; i < CardsInDeck[0].length; i++) {
    if (
      CardsInPlayerHand[0][CardsInPlayerHand[0].length - 1] ==
        CardsInDeck[0][i] &&
      CardsInPlayerHand[1][CardsInPlayerHand[1].length - 1] == CardsInDeck[1][i]
    ) {
      if (debug) {
        System.out.println(
          "Card Spliced from Deck: " +
            CardsInDeck[0][i] +
            " of " +
            CardsInDeck[1][i]
        );
      }
      CardsInDeck[0].splice(i, 1);
      CardsInDeck[1].splice(i, 1);
      break;
    }
  }
  if (GetTotalCardValue("Dealer") < 16) {
    random = Math.floor(Math.random() * CardsInDeck[0].length);
    CardsInDealerHand[0].push(CardsInDeck[0][random]);
    CardsInDealerHand[1].push(CardsInDeck[1][random]);
    if (debug) {
      System.out.println(
        "Card Added to Dealer Hand: " +
          CardsInDeck[0][random] +
          " of " +
          CardsInDeck[1][random]
      );
    }
    for (var i = 0; i < CardsInDeck[0].length; i++) {
      if (
        CardsInDealerHand[0][CardsInDealerHand[0].length - 1] ==
          CardsInDeck[0][i] &&
        CardsInDealerHand[1][CardsInDealerHand[1].length - 1] ==
          CardsInDeck[1][i]
      ) {
        if (debug) {
          System.out.println(
            "Card Spliced from Deck: " +
              CardsInDeck[0][i] +
              " of " +
              CardsInDeck[1][i]
          );
        }
        CardsInDeck[0].splice(i, 1);
        CardsInDeck[1].splice(i, 1);
        break;
      }
    }
  }
}

function CompleteDealer() {
  while (GetTotalCardValue("Dealer") < 16) {
    var random = Math.floor(Math.random() * CardsInDeck[0].length);
    CardsInDealerHand[0].push(CardsInDeck[0][random]);
    CardsInDealerHand[1].push(CardsInDeck[1][random]);
    if (debug) {
      System.out.println(
        "Card Added to Dealer Hand: " +
          CardsInDeck[0][random] +
          " of " +
          CardsInDeck[1][random]
      );
    }
    for (var i = 0; i < CardsInDeck[0].length; i++) {
      if (
        CardsInDealerHand[0][CardsInDealerHand[0].length - 1] ==
          CardsInDeck[0][i] &&
        CardsInDealerHand[1][CardsInDealerHand.length - 1] == CardsInDeck[1][i]
      ) {
        if (debug) {
          System.out.println(
            "Card Spliced from Deck: " +
              CardsInDeck[0][i] +
              " of " +
              CardsInDeck[1][i]
          );
        }
        CardsInDeck[0].splice(i, 1);
        CardsInDeck[1].splice(i, 1);
        break;
      }
    }
  }
}

function GetValueByName(name) {
  var nums = [
    [
      "One",
      "Two",
      "Three",
      "Four",
      "Five",
      "Six",
      "Seven",
      "Eight",
      "Nine",
      "Ten",
      "Jack",
      "Queen",
      "King",
      "Ace",
    ],
    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 10, 10, 10, 11],
  ];
  for (var i = 0; i < nums[0].length; i++) {
    if (name == nums[0][i]) {
      return nums[1][i];
    }
  }
}

function DisplayHandWithProgression() {
  var text = "#d#n你手中的牌:#k#e";
  if (CardsInPlayerHand[0].length > 1) {
    text +=
      "\r\n#e第一張牌:#n #d" +
      CardsInPlayerHand[0][0] +
      "#k of " +
      (CardsInPlayerHand[1][0].equals("Hearts") ||
      CardsInPlayerHand[1][0].equals("Diamonds")
        ? "#r" + CardsInPlayerHand[1][0] + "#k"
        : CardsInPlayerHand[1][0]) +
      "\r\n#e第二張牌:#n #d" +
      CardsInPlayerHand[0][1] +
      "#k of " +
      (CardsInPlayerHand[1][1].equals("Hearts") ||
      CardsInPlayerHand[1][1].equals("Diamonds")
        ? "#r" + CardsInPlayerHand[1][1] + "#k"
        : CardsInPlayerHand[1][1]);
  }
  if (CardsInPlayerHand[0].length > 2) {
    text +=
      "\r\n#e第三張牌:#n #d" +
      CardsInPlayerHand[0][2] +
      "#k of " +
      (CardsInPlayerHand[1][2].equals("Hearts") ||
      CardsInPlayerHand[1][2].equals("Diamonds")
        ? "#r" + CardsInPlayerHand[1][2] + "#k"
        : CardsInPlayerHand[1][2]);
  }
  if (CardsInPlayerHand[0].length > 3) {
    text +=
      "\r\n#e第四張牌:#n #d" +
      CardsInPlayerHand[0][3] +
      "#k of " +
      (CardsInPlayerHand[1][3].equals("Hearts") ||
      CardsInPlayerHand[1][3].equals("Diamonds")
        ? "#r" + CardsInPlayerHand[1][3] + "#k"
        : CardsInPlayerHand[1][3]);
  }
  if (CardsInPlayerHand[0].length > 4) {
    text +=
      "\r\n#e第五張牌:#n #d" +
      CardsInPlayerHand[0][4] +
      "#k of " +
      (CardsInPlayerHand[1][4].equals("Hearts") ||
      CardsInPlayerHand[1][4].equals("Diamonds")
        ? "#r" + CardsInPlayerHand[1][4] + "#k"
        : CardsInPlayerHand[1][4]);
  }
  text += "\r\n\r\n#e總額: #b" + GetTotalCardValue("Player");
  if (CardsInPlayerHand[0].length > 4) {
    text += "\r\n看來您必須#bstay#k看看結果如何。#b \r\n\t#L1#Stay#l";
  } else {
    text += "\r\n你想選擇什麼？#b \r\n\t#L0#Hit#l \r\n\t#L1#Stay#l";
  }
  cm.sendSimple(text);
}

function GetTotalCardValue(name) {
  var sum = 0;
  if (name.equals("Player")) {
    for (var i = 0; i < CardsInPlayerHand[0].length; i++) {
      sum += GetValueByName(CardsInPlayerHand[0][i]);
    }
  } else if (name.equals("Dealer")) {
    for (var i = 0; i < CardsInDealerHand[0].length; i++) {
      sum += GetValueByName(CardsInDealerHand[0][i]);
    }
  }
  return sum;
}

function Finish(action) {
  if (action.equals("DoubleBust")) {
    cm.sendOk(
      "看起來我們倆都#r爆#k了! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        " \r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n我想沒人勝利."
    );
  } else if (action.equals("PlayerBust")) {
    cm.sendOk(
      "哈哈，你看起來 #r爆#k了! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        " \r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n抱歉，但是我好像要把你的 #b籌碼#k拿走!"
    );
    cm.getPlayer().gainBlackJackChips(-bet);
  } else if (action.equals("DealerBust")) {
    cm.sendOk(
      "我不能相信! 我 #r爆#k了! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        " \r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n看來您已經贏得了一些#b籌碼#k!"
    );
    cm.getPlayer().gainBlackJackChips(bet);
  } else if (action.equals("Tie")) {
    cm.sendOk(
      "We tied! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        "\r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n看來我們倆都沒贏..."
    );
  } else if (action.equals("Player21")) {
    cm.sendOk(
      "Wow! 你有 #rBlackJack#k! 這代表你用兩張牌得到 #r21 #k! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        " \r\n你贏得了 #b2.5x 的籌碼#k"
    );
    cm.getPlayer().gainBlackJackChips(
      bet + (bet % 2 != 0 ? (bet + 1) / 2 : bet / 2)
    );
  } else if (action.equals("Dealer21")) {
    cm.sendOk(
      "#rBLACKJACK!#k 哈哈，看來我以兩張牌贏了#r21#k! \r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n抱歉，看來我必須帶走您的#b籌碼#k! 下次好運！"
    );
    cm.getPlayer().gainBlackJackChips(-bet);
  } else if (action.equals("Win")) {
    cm.sendOk(
      "我不敢相信，你贏了! \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        "\r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n看來您贏了一些 #b籌碼#k!"
    );
    cm.getPlayer().gainBlackJackChips(bet);
  } else if (action.equals("Lose")) {
    cm.sendOk(
      "哈哈，看起來你輸了！ \r\n#b你手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Player") +
        "\r\n#r我手中的牌:#k \r\n\t" +
        DisplayCardsInHand("Dealer") +
        " \r\n抱歉，看來我必須帶走您的#b籌碼#k! 下次好運！"
    );
    cm.getPlayer().gainBlackJackChips(-bet);
  }
  if (debug) {
    System.out.println("Finish() carried out with a " + action);
  }
  cm.dispose();
}

function DisplayCardsInHand(name) {
  var cards = "";
  if (name.equals("Player")) {
    for (var i = 0; i < CardsInPlayerHand[0].length; i++) {
      cards +=
        "#d" +
        CardsInPlayerHand[0][i] +
        "#k of " +
        (CardsInPlayerHand[1][i].equals("Hearts") ||
        CardsInPlayerHand[1][i].equals("Diamonds")
          ? "#r" + CardsInPlayerHand[1][i] + "#k"
          : CardsInPlayerHand[1][i]) +
        (i != CardsInPlayerHand[0].length - 1 ? ", " : ".");
    }
  } else if (name.equals("Dealer")) {
    for (var i = 0; i < CardsInDealerHand[0].length; i++) {
      cards +=
        "#d" +
        CardsInDealerHand[0][i] +
        "#k of " +
        (CardsInDealerHand[1][i].equals("Hearts") ||
        CardsInDealerHand[1][i].equals("Diamonds")
          ? "#r" + CardsInDealerHand[1][i] + "#k"
          : CardsInDealerHand[1][i]) +
        (i != CardsInDealerHand[0].length - 1 ? ", " : ".");
    }
  }
  return cards;
}

function SpendChips(s) {
  if (status == 1) {
    if (debug) {
      System.out.println("SpendChips() progressing...");
    }
    var text =
      "你目前有 #b" +
      cm.getPlayer().getBlackJackChips() +
      " Black Jack 籌碼#k. 你想要換取什麼?";
    for (
      var i = 0;
      i < prizes[0].length;
      text +=
        "\r\n#L" +
        i +
        "##i" +
        prizes[0][i] +
        "##b ~ #t" +
        prizes[0][i] +
        "##k for #r" +
        prizes[1][i] +
        " Black Jack 籌碼#k#l",
        i++
    );
    cm.sendSimple(text);
  } else if (status == 2) {
    selected = s;
    cm.sendYesNo(
      "您確定要購買 #i" +
        prizes[0][s] +
        "##b ~ #t" +
        prizes[0][s] +
        "##k 以 #r" +
        prizes[1][s] +
        " Black Jack 籌碼#k?"
    );
  } else if (status == 3) {
    if (cm.getPlayer().getBlackJackChips() >= prizes[1][selected]) {
      cm.gainItem(prizes[0][selected]);
      cm.getPlayer().gainBlackJackChips(-prizes[1][selected]);
      cm.sendOk("感謝參與！享受您的獎品，然後再來！");
      cm.dispose();
    } else {
      cm.sendOk(
        "你還需要 #r" +
          (prizes[1][selected] - cm.getPlayer().getBlackJackChips()) +
          "  Black Jack 籌碼#k 才能兌換這個獎品!"
      );
      cm.dispose();
    }
    cm.dispose();
  }
}
