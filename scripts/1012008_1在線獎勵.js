var status = -1;
var text;
var sel;
var time;
var aaa = "#fUI/UIWindow.img/QuestAlarm/BtQ/normal/0#";
var ca = java.util.Calendar.getInstance();
// 時分秒
var hour = ca.get(java.util.Calendar.HOUR_OF_DAY);
var minute = ca.get(java.util.Calendar.MINUTE);
var second = ca.get(java.util.Calendar.SECOND);
// 年月日
var objDate = new Date();
var day = objDate.getDay();
var Month = objDate.getMonth();
var MonthS = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
var tzc = objDate.getDate();
var Year = objDate.getFullYear();

// 在線幾分鐘能領獎
var condition = new Array(10, 30, 60, 120, 300, 600, 800, 1000);

var reward = Array(
  Array(1, 5561000, 5), // 任意門高級劵
  Array(1, 5220000, 1), //1 轉蛋劵
  Array(2, 5220000, 3), //2 轉蛋劵
  Array(2, 2450000, 3), //3 獵人的幸運
  Array(2, 2022179, 5), //4 紫色的蘋果
  Array(2, 2022462, 3), //5 卡4
  Array(3, 2022463, 3), //6 卡5
  Array(3, 2450000, 2), //7 獵人的幸運
  Array(3, 5220000, 3), //8 轉蛋劵
  Array(3, 5510000, 5), //9 原地復活術
  Array(4, 2101120, 5), //11 魚怪召喚袋
  Array(4, 2450000, 1), //12 獵人的幸運
  Array(4, 4001456, 1), //椅子兌換卷
  Array(5, 2450000, 1), //13 獵人的幸運
  Array(5, 4001456, 1), //14 椅子兌換卷
  Array(5, 2101120, 5), //17 魚怪召喚袋
  Array(6, 2101120, 5), //18 魚怪召喚袋
  Array(6, 5220000, 5), //19 轉蛋劵
  Array(6, 2022179, 5), //20 紫色的蘋果
  Array(6, 4001456, 2), //14 椅子兌換卷
  Array(6, 4001126, 200), //14 楓葉
  Array(7, 2022179, 5), //21 紫色的蘋果
  Array(7, 5220000, 10), //23 轉蛋劵
  Array(7, 2022462, 5), //24 卡4
  Array(7, 2022463, 5), //25 卡5
  Array(7, 2450000, 3), //13 獵人的幸運
  Array(8, 5561000, 10), //28 任意門高級劵
  Array(8, 5220000, 15), //29 轉蛋劵
  Array(8, 5510000, 10), //30 原地復活術
  Array(8, 2450000, 3), //13 獵人的幸運
  Array(8, 4001126, 300), //14 楓葉
  Array(8, 4001456, 2) //14 椅子兌換卷
);

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (status == 0 && mode == 0) {
    cm.dispose();
    return;
  }
  if (mode == 1) {
    status++;
  } else {
    status--;
  }

  var time = cm.getOnlineTime();
  var curlevel = -1;

  if (status == 0) {
    text =
      "#e#d您今天在線時長為： #r" +
      time +
      "#k #d分鐘#n#k\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b時無法領取在線獎勵。#k\r\n#b請在 #e#r23：50#n#b 分前領取當天未領取的獎勵。以免造成損失。#k\r\n\r\n#fUI/Basic.img/icon/arrow#請確保每個欄位皆有5格以上的空間。\r\n";
    for (var i = 1; i <= condition.length; i++) {
      text +=
        "#b#L" + i + "#" + aaa + " 領取在線" + condition[i - 1] + "分鐘獎勵";
      if (
        cm.getBossLog2(
          "" + Year + "年" + MonthS[Month] + tzc + "日在線禮包" + i
        ) > 0
      ) {
        text += "#r(已領取)#b";
        curlevel = curlevel == -1 ? i : curlevel;
      }
      text += "#l\r\n";
    }
    text += "#k";
    cm.sendYesNo(text);
  } else if (status == 1) {
    // 23:50 ~ 23: 59 前一天不能領取的時間  00:00 ~ 00:10 第二天能不領取的時間
    if (
      (hour == 23 && minute >= 50 && minute <= 59) ||
      (hour == 0 && minute >= 0 && minute <= 10)
    ) {
      cm.sendOk(
        "#d伺服器當前時間： #r" +
          hour +
          " 時 " +
          minute +
          " 分 " +
          second +
          " 秒#k\r\n\r\n#e#d提示#n#k：#e#r23 ： 50#n #b至#r #e00 ： 10#n #b時無法領取在線獎勵。#k"
      );
      cm.dispose();
      return;
    }
    if (cm.getBossLog2("在線禮包" + selection) > 0) {
      cm.sendOk("這個禮包您已經領取過了");
      cm.dispose();
      return;
    }
    sel = selection;
    text = "#e#r- 在線 " + condition[selection - 1] + " 分鐘獎勵 -#k#n\r\n\r\n";
    for (var i = 0; i < reward.length; i++) {
      if (reward[i][0] == selection) {
        text +=
          "#i" +
          reward[i][1] +
          "# #z" +
          reward[i][1] +
          "#[" +
          reward[i][2] +
          "個]\r\n";
      }
    }
    cm.sendYesNo(text);
  } else if (status == 2) {
    if (time < condition[sel - 1]) {
      cm.sendOk("在線時間不足，無法領取。");
      cm.dispose();
      return;
    }
    var rewardlist = new Array();
    for (var i = 0; i < reward.length; i++) {
      if (reward[i][0] == sel) {
        if (reward[i][3] == null || reward[i][3] == "") reward[i][3] = 0;
        rewardlist.push(new Array(reward[i][1], reward[i][2], reward[i][3]));
      }
    }
    /* if (cm.getSpace(5) < 4 || cm.getSpace(4) < 2 || cm.getSpace(2) < 4) {
        cm.sendOk("包裹空間不足，請確保包裹每個欄位有至少4格空間");
        cm.dispose();
        return;
    } */
    for (var i = 0; i < rewardlist.length; i++) {
      cm.gainItem(rewardlist[i][0], rewardlist[i][1]);
    }
    cm.setBossLog2("" + Year + "年" + MonthS[Month] + tzc + "日在線禮包" + sel);
    cm.sendOk("領取在線禮包成功！");
    cm.worldMessage(
      6,
      "『在線時間獎勵』" +
        " : " +
        "玩家 " +
        cm.getPlayer().getName() +
        " 領取了在線 " +
        condition[sel - 1] +
        " 分鐘獎勵。"
    );

    cm.dispose();
  }
}
