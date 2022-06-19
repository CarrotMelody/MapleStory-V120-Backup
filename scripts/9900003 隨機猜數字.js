/*
 完成时间：2013年8月22日 12:26:36
 脚本功能：[HOTTIME]数字猜猜猜！
 */

var a = 0;
var randomNumber = Array();
var n1;
var n2;
var n3;
var itemData = Array(
  1102275, //狮心战斗披风
  1042187, // - 粉红绒绒衫
  1042174, // - 野营服
  1042149, // - 灰条纹休闲衫
  1072437, // - PB拖拖
  1072448 // - 大象拖
);
var pass = true;
var correct = 0;
var NumberPosition = Array();

function start() {
  a = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 1) a++;
    else cm.dispose();
    if (a == -1) {
      cm.dispose();
    } else if (a == 0) {
      if (cm.getBossLog2("數字猜猜猜") >= 5) {
        cm.sendOk("對不起，數字猜猜猜活動一天只能進行五次。");
        cm.dispose();
      } else {
        cm.sendSimple(
          "萬眾期待的HOTTIME時間又到了！親愛的冒險家，請問你要做什麼呢？ \r\n#b#L0# 我要玩數字猜猜猜活動！ \r\n#L1# 介紹一下此活動。"
        );
      }
    } else if (a == 1) {
      if (selection == 0) {
        //我要玩数字猜猜猜活动！
        if (pass) {
          cm.sendNextS(
            "系統將隨機產生10個數字，請您做好準備記錄下這10個數字。 \r\n#r -- 點擊下一步開始產生。 \r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。",
            3
          );
        } else {
          cm.sendOk("請讓你的所有背包欄空出5個格子。");
          cm.dispose();
        }
      } else if (selection == 1) {
        //介绍一下此活动。
        a = -1;
        cm.sendNext(
          "#e數字猜猜猜活動遊戲規則：#n#d\r\n\r\n1）系統會隨機給出10個數字，並且公示。 \r\n2）這10個數字將被打亂，且隱藏。 \r\n3）玩家會被隨機提問第N個數字是什麼\r\n如果回答正確即可得到獎勵！ \r\n4）玩家一共有3次提問的機會。 #e\r\n\r\n5）獎池中有隨機5個道具 \r\n - 回答正確1次，隨機從裡面得到1個道具。 \r\n - 回答正確2次，隨機從裡面得到3個道具。 \r\n - 回答正確3次，獎池內所有道具都帶走！ #n\r\n\r\n 參加活動的時候切記您的所有背包空格都有5格以上的空間。"
        );
      } //selection
    } else if (a == 2) {
      var temp;
      var i = 0;
      while (i < 10) {
        temp = Math.floor(Math.random() * 40);
        if (checkid(temp)) {
          randomNumber.push(temp); //随机0~39
          i++;
        }
      }
      var text =
        "這10個隨機數字依次為：\r\n #r- 請拿起您的筆記下這隨機的數字！\r\n\r\n#d";
      for (var i = 0; i < randomNumber.length; i++) {
        text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + "\r\n";
      }
      cm.sendNextS(text, 3);
    } else if (a == 3) {
      cm.sendNextS("正在打亂這10個數字，請點擊下一步……。", 3);
    } else if (a == 4) {
      randomNumber.sort(function () {
        return 0.5 - Math.random();
      }); //随机打乱
      var temp = Math.floor(Math.random() * 10) + 1;
      var i = 0;
      while (i < 3) {
        temp = Math.floor(Math.random() * 10) + 1;
        //cm.sendY(temp)
        if (checkNumberPosition(temp)) {
          NumberPosition.push(temp); //随机1~10
          i++;
        }
      } //随机位数的数字猜
      cm.sendGetNumber(
        "現在請您輸入第" +
          NumberPosition[0] +
          "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n",
        0,
        0,
        999
      );
    } else if (a == 5) {
      n1 = selection; //记录玩家第一次输入
      cm.sendGetNumber(
        "現在請您輸入第" +
          NumberPosition[1] +
          "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n",
        0,
        0,
        999
      );
    } else if (a == 6) {
      n2 = selection;
      cm.sendGetNumber(
        "現在請您輸入第" +
          NumberPosition[2] +
          "個數字：\r\n #r-- 如果切斷對話，參加活動所需的物品不歸還。\r\n",
        0,
        0,
        999
      );
    } else if (a == 7) {
      n3 = selection;
      cm.sendNextS(
        "你所輸入的數字為：\r\n\r\n 第" +
          NumberPosition[0] +
          "個數字 -- " +
          n1 +
          "\r\n 第" +
          NumberPosition[1] +
          "個數字 -- " +
          n2 +
          "\r\n 第" +
          NumberPosition[2] +
          "個數字 -- " +
          n3 +
          ".",
        3
      );
    } else if (a == 8) {
      var text = "現在我來公佈結果：\r\n 經過打亂後的10個數字為：\r\n\r\n#b";
      for (var i = 0; i < randomNumber.length; i++) {
        if (i == NumberPosition[0] - 1) {
          text +=
            "第" +
            (i + 1) +
            "個數字為： - " +
            randomNumber[i] +
            " #r( 您的答案為：" +
            n1 +
            ")#b\r\n";
        } else if (i == NumberPosition[1] - 1) {
          text +=
            "第" +
            (i + 1) +
            "個數字為： - " +
            randomNumber[i] +
            " #r( 您的答案為：" +
            n2 +
            ")#b\r\n";
        } else if (i == NumberPosition[2] - 1) {
          text +=
            "第" +
            (i + 1) +
            "個數字為： - " +
            randomNumber[i] +
            " #r( 您的答案為：" +
            n3 +
            ")#b\r\n";
        } else {
          text += "第" + (i + 1) + "個數字為： - " + randomNumber[i] + "\r\n";
        }
      }
      cm.sendNextS(text, 3);
    } else if (a == 9) {
      //判断是否答对部分
      if (randomNumber[NumberPosition[0] - 1] == n1) {
        correct += 1;
      }
      if (randomNumber[NumberPosition[1] - 1] == n2) {
        correct += 1;
      }
      if (randomNumber[NumberPosition[2] - 1] == n3) {
        correct += 1;
      }
      var text =
        "系統判斷您一共答對了" +
        correct +
        "次。\r\n\r\n現在獎池裡面有下列的道具(隨機5個)：\r\n\r\n#b";

      itemData.sort(function () {
        return Math.random() > 0.5 ? -1 : 1;
      });
      //随机打乱道具池
      for (var i = 0; i < 5; i++) {
        //拿前5个
        text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
      } //text +
      cm.sendNextS(
        text +
          "#d\r\n\r\n - 回答正確1次，隨機從裡面得到1個道具。 \r\n - 回答正確2次，隨機從裡面得到3個道具。 \r\n - 回答正確3次，獎池內所有道具都帶走！",
        3
      );
    } else if (a == 10) {
      if (correct == 0) {
        //没回答正确
        cm.sendOk(
          "對不起，你沒有回答正確。 \r\n領取物品的必要條件是必須至少回答一個正確。"
        );
        cm.dispose();
      } else if (correct == 3) {
        //全部回答正确
        var text =
          "恭喜你！回答3個全部正確！你將獲取獎池內的所有物品！\r\n\r\n#b";
        for (var i = 0; i < 5; i++) {
          //拿前5个
          text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
        }
        cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
      } else if (correct == 1) {
        //正确1个
        cm.gainItem(itemData[0], 1);
        cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
        cm.dispose();
      } else if (correct == 2) {
        //2个正确
        var text =
          "恭喜你！回答正確" +
          correct +
          "次，按照規則，你將獲取獎池內的：\r\n\r\n#b";
        for (var i = 0; i < 3; i++) {
          text += "#i" + itemData[i] + "#   #z" + itemData[i] + "#\r\n\r\n";
        }
        a = 11;
        cm.sendNextS(text + "#d\r\n\r\n請妥善保管哦！", 3);
      } else {
        cm.sendOk("錯誤！請和管理員聯繫。\r\n錯誤代碼：" + correct);
      }
      cm.setBossLog2("數字猜猜猜");
    } else if (a == 11) {
      //全部正确
      for (var i = 0; i < 5; i++) {
        //拿前5个
        cm.gainItem(itemData[i], 1);
      }
      cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
      cm.dispose();
    } else if (a == 12) {
      //2题
      for (var i = 0; i < 3; i++) {
        cm.gainItem(itemData[i], 1);
      }
      cm.sendOk("贈送成功！喜歡獎池裡面的道具嗎？");
      cm.dispose();
    } //a
  } //mode
} //f

function checkid(number) {
  //检查是否重复
  var i = 0;
  while (randomNumber.length >= i) {
    if (randomNumber[i] == number) {
      return false;
    }
    i++;
  }
  return true;
}

function checkNumberPosition(number) {
  //检查是否重复
  var i = 0;
  while (NumberPosition.length >= i) {
    if (NumberPosition[i] == number) {
      return false;
    }
    i++;
  }
  return true;
}
