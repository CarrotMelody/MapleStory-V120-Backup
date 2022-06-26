/**
 * 猜數字遊戲
 * 2022/06/26
 */
var status = 0;
var randomNumber = Array(); // 隨機產生的數字
var number = []; // 猜測的數字
var record; // db 中的紀錄文字
var correct = 0; // 答對數
var NumberPosition = Array();

// 時間處理
var objDate = new Date();
var year = objDate.getFullYear();
var day = objDate.getDate();
var month = objDate.getMonth() + 1;

// 獎池
var itemData = Array(
  1102275,
  1042187,
  1042174,
  1042149,
  1072437,
  1072448,
  1022005,
  1022006,
  1022007,
  1022009,
  1112414,
  1022097,
  1702256,
  1702257,
  1702258,
  1702259,
  1702260,
  1102040,
  1102041,
  1102042,
  1102043,
  1482073,
  1492073,
  1122075
);

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 1) {
      status++
    } else {
      cm.dispose();
    }

    if (status == -1) {
      cm.dispose();
    } else if (status == 0) {
      record = year + "-" + month + "-" + day + "數字猜猜猜";
      if (cm.getBossLog2(record) >= 5) {
        cm.sendOk("對不起，數字猜猜猜活動一天只能進行五次，明天再來吧。");
        cm.dispose();
      } else {
        cm.sendSimple("萬眾期待的 HOTTIME 時間又到了！親愛的冒險家，請問你要做什麼呢？ \r\n#b#L0##r我要玩數字猜猜猜活動！\r\n#L1##b介紹一下此活動。");
      }
    } else if (status == 1) {
      // 我要玩數字猜猜猜活動！
      if (selection == 0) {
        cm.sendNextS("系統將隨機產生#r 10 #d個數字，請您做好準備記錄下這 10 個數字。#e \r\n#r -- 點擊下一步開始產生。 \r\n #r-- 如果結果對話，參加活動所需的物品不歸還。", 3);
      } else if (selection == 1) { // 介紹一下此活動。
        status = -1;
        cm.sendNext("#e數字猜猜猜活動遊戲規則：#n#d\r\n\r\n1）系統會隨機給出#r 10 #d個數字，並且公示。 \r\n2）系統會將這些數字順序打亂且隱藏。 \r\n3）玩家會被隨機提問第#r N #d個數字是什麼，如果回答正確即可得到獎勵！ \r\n4）玩家一共有#r 3 #d次回答的機會。" + 
          "\r\n5）獎池中有隨機#r 5 #d個道具 \r\n - 回答正確#r 1 #d次，隨機從裡面得到#r 1 #d個道具。 \r\n - 回答正確#r 2 #d次，隨機從裡面得到#r 3 #d個道具。 \r\n - 回答正確#r 3 #d次，獎池內#r所有道具#d都帶走！ #n\r\n\r\n" 
          + "#r#e參加活動的時候切記您的所有背包空格都有 5 格以上的空間。#d#n");
      }
    } else if (status == 2) {
      var temp;
      var i = 0;
      while (i < 10) {
        temp = Math.floor(Math.random() * 40);
        if (checkid(temp)) {
          randomNumber.push(temp); // 隨機產生 0 ~ 39 的數字
          i++;
        }
      }
      var text = "這10個隨機數字依次為：\r\n #r- 請拿起您的筆記下這隨機的數字！\r\n\r\n#d";
      for (var i = 0; i < randomNumber.length; i++) {
        text += "第" + (i + 1) + "個數字為：" + randomNumber[i] + "\r\n";
      }
      cm.sendNextS(text, 3);
    } else if (status == 3) {
      cm.sendNextS("正在打亂這10個數字，請點擊下一步……", 3)
    } else if (status == 4) {
      // 隨機打亂數字
      randomNumber.sort(function () {
        return 0.5 - Math.random();
      }) 
      var temp = Math.floor(Math.random() * 10) + 1;
      var i = 0;
      while (i < 3) {
        temp = Math.floor(Math.random() * 10) + 1;
        if (checkNumberPosition(temp)) {
          NumberPosition.push(temp); // 隨機 1 ~ 10
          i++;
        }
      }
      cm.sendGetNumber("現在請您輸入第" + NumberPosition[0] + "個數字：\r\n #r-- 如果結果對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
    } else if (status == 5) {
      number.push(selection); // 記錄玩家第一次輸入
      cm.sendGetNumber("現在請您輸入第" + NumberPosition[1] + "個數字：\r\n #r-- 如果結果對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
    } else if (status == 6) {
      number.push(selection);
      cm.sendGetNumber("現在請您輸入第" + NumberPosition[2] + "個數字：\r\n #r-- 如果結果對話，參加活動所需的物品不歸還。\r\n", 0, 0, 999);
    } else if (status == 7) {
      number.push(selection);
      var msg = "你所輸入的數字為：\r\n\r\n";
      for (var i = 0; i < NumberPosition.length; i++) {
        msg += "第#r " + NumberPosition[i] + " #k個數字 -- #r" + number[i] + "\r\n#k";
      }
      cm.sendNextS(msg, 3);
    } else if (status == 8) {
      var text = "現在我來公佈結果：\r\n經過打亂後的10個數字為：\r\n\r\n#b";

      for (var i = 0; i < randomNumber.length; i++) {
        if (i == (NumberPosition[0] - 1)) {
          text += "第 " + (i + 1) + " 個數字為： - " + randomNumber[i] + " #r(您的答案為：" + number[0] + ")#b\r\n";
        } else if (i == (NumberPosition[1] - 1)) {
          text += "第 " + (i + 1) + " 個數字為： - " + randomNumber[i] + " #r(您的答案為：" + number[1] + ")#b\r\n";
        } else if (i == (NumberPosition[2] - 1)) {
          text += "第 " + (i + 1) + " 個數字為： - " + randomNumber[i] + " #r(您的答案為：" + number[2] + ")#b\r\n";
        } else {
          text += "第 " + (i + 1) + " 個數字為： - " + randomNumber[i] + "\r\n";
        }
      }

      cm.sendNextS(text, 3);
    } else if (status == 9) {
      // 判斷是否答對部分
      for (var j = 0; j < NumberPosition.length; j++) {
        if (randomNumber[NumberPosition[j] - 1] == number[j]) {
          correct += 1;
        }
      }

      var text = "系統判斷您一共答對了#r " + correct + " #k次。\r\n\r\n現在獎池裡面有下列的道具(隨機5個)：\r\n\r\n#b";

      itemData.sort(function () { return Math.random() > 0.5 ? -1 : 1; });

      // 隨機打亂獎池
      for (var i = 0; i < 5; i++) { // 拿前 5 個
        text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
      }

      cm.sendNextS(text + "#d\r\n\r\n - 回答正確#r 1 #d次，隨機從裡面得到#r 1 #d個道具。 \r\n - 回答正確#r 2 #d次，隨機從裡面得到#r 3 #d個道具。 \r\n - 回答正確#r 3 #d次，獎池內#r所有道具#d都帶走！", 3);
    } else if (status == 10) {
      // 紀錄至 db
      cm.setBossLog2(record);
      // 沒回答正確
      if (correct == 0) {
        cm.sendOk("對不起，你沒有回答正確。 \r\n領取物品的必要條件是必須至少回答一個正確。");
        cm.dispose();
      } else if (correct == 3) { // 全部回答正確
        var text = "恭喜你！回答3個全部正確！你將獲取獎池內的所有物品！\r\n\r\n#b";

        for (var i = 0; i < 5; i++) { // 拿前5个
          text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
        }

        cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
      } else if (correct == 1) { // 正確 1 個
        cm.gainItem(itemData[0], 1);
        cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
        cm.dispose();
      } else if (correct == 2) { // 正確 2 個
        var text = "恭喜你！回答正確" + correct + "次，按照規則，你將獲取獎池內的：\r\n\r\n#b";
        for (var i = 0; i < 3; i++) {
          text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
        }
        status = 11;
        cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
      } else {
        cm.sendOk("錯誤！請和管理員聯繫。\r\n錯誤代碼：" + correct);
      }

      cm.setBossLog2("數字猜猜猜");
    } else if (status == 11) { // 全部正確
      for (var i = 0; i < 5; i++) { // 拿前 5 个
        cm.gainItem(itemData[i], 1);
      }
      cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
      cm.dispose();
    } else if (status == 12) { // 答對 2 題
      for (var i = 0; i < 3; i++) { // 拿 3 個
        cm.gainItem(itemData[i], 1);
      }
      cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
      cm.dispose();
    }
  }
}

// 檢查是否重複
function checkid(number) {
  var i = 0;
  while (randomNumber.length >= i) {
    if (randomNumber[i] == number) {
      return false;
    }
    i++;
  }
  return true;
}

// 檢查是否重複
function checkNumberPosition(number) {
  var i = 0;
  while (NumberPosition.length >= i) {
    if (NumberPosition[i] == number) {
      return false;
    }
    i++;
  }
  return true;
}
