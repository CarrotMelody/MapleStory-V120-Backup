var status = 0;
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
var weekday = ["日", "一", "二", "三", "四", "五", "六"];
var MonthB = objDate.getMonth() - 1;
var tzc = objDate.getDate();
var Year = objDate.getFullYear();

var itemList = Array(
  Array(5561000, 5), //從下一個開始
  Array(5561000, 3), //1 任意門高級劵
  Array(5220000, 10), //2 轉蛋劵
  Array(2450000, 3), //3 獵人的幸運
  Array(2022179, 5), //4 紫色的蘋果
  Array(2022462, 3), //5 卡4
  Array(2022463, 3), //6 卡5
  Array(2450000, 2), //7 獵人的幸運
  Array(5220010, 3), //8 超級轉蛋劵
  Array(5510000, 5), //9 原地復活術
  Array(5201003, 2), //10 小鋼珠盒子(100)
  Array(2101120, 5), //11 魚怪召喚袋
  Array(2450000, 1), //12 獵人的幸運
  Array(2450000, 1), //13 獵人的幸運
  Array(2450000, 1), //14 獵人的幸運
  Array(5201001, 1), //15 小鋼珠盒子(500)
  Array(4000313, 200), //16 黃金楓葉
  Array(2101120, 5), //17 魚怪召喚袋
  Array(2101120, 5), //18 魚怪召喚袋
  Array(5220010, 1), //19 超級轉蛋劵
  Array(2022179, 5), //20 紫色的蘋果
  Array(2022179, 5), //21 紫色的蘋果
  Array(4000313, 200), //22 黃金楓葉
  Array(5220000, 30), //23 轉蛋劵
  Array(2022462, 5), //24 卡4
  Array(2022463, 5), //25 卡5
  Array(5201003, 3), //26 小鋼珠盒子(100)
  Array(4000313, 200), //27 黃金楓葉
  Array(5561000, 10), //28 任意門高級劵
  Array(5220000, 50), //29 轉蛋劵
  Array(5510000, 10), //30 原地復活術
  Array(5201001, 1) //31 小鋼珠盒子(500)
); // 因為沒0日 從第 1 開始設置物品 第一格道具id 第二格設置數量

var debug = false;

function start() {
  status = -1;
  if (debug && cm.getPlayer().getGMLevel() < 4) {
    cm.dispose();
    return;
  }
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 0 && status == 0) {
      cm.dispose();
      return;
    }
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
      var tt = 31;
      if (
        Month == 0 ||
        Month == 2 ||
        Month == 4 ||
        Month == 6 ||
        Month == 7 ||
        Month == 9 ||
        Month == 11
      ) {
        // 1月 3月 5月 78 月 10月 12月
        tt = 32;
      }
      if (Month == 1) {
        // 2月的話
        tt = 29;
      }
      var text3 = 0;
      for (var i = 1; i < tt; i++) {
        text3 += cm
          .getPlayer()
          .getPrizeLog_n("" + Year + "年" + MonthS[Month] + i + "日");
      }

      var ta = "#b";

      var text = "";

      for (var i = 1, ytz = 1; i < tt; i++, ytz++) {
        if (
          cm
            .getPlayer()
            .getPrizeLog_n("" + Year + "年" + MonthS[Month] + i + "日") == 0
        ) {
          ta = "#b";
        }
        if (
          cm
            .getPlayer()
            .getPrizeLog_n("" + Year + "年" + MonthS[Month] + i + "日") != 0
        ) {
          ta = "#r";
        }
        text +=
          ta +
          ytz +
          "#i" +
          itemList[i][0] +
          "#" +
          ((i + 0) % 7 == 0 ? "\r\n" : "");
      }
      var text2 = 0;

      cm.sendSimple(
        "#e現在時間:#b" +
          Year +
          "年" +
          MonthS[Month] +
          tzc +
          "日星期" +
          weekday[day] +
          "\r\n#k本月累積簽到【 #r" +
          text3 +
          "#k 】天" +
          "\r\n#k本日在線時間【 #r" +
          cm.getOnlineTime() +
          "#k 】分" +
          "\r\n#b上線時間需滿60分鐘才可進行每日簽到" +
          "\r\n#k" +
          "\r\n#L0# #r每日簽到獲得100點#l\r\n\r\n#k"
      );
    } else if (status == 1) {
      if (selection == 0) {
        if (!cm.canHold(itemList[tzc][0], itemList[tzc][1])) {
          cm.sendOk("您的背包空間不足");
          cm.dispose();
          return;
        }
        if (
          cm
            .getPlayer()
            .getPrizeLog_n("" + Year + "年" + MonthS[Month] + tzc + "日") < 1 &&
          cm.getOnlineTime() >= 60
        ) {
          // 在線時數 120
          cm.getPlayer().setPrizeLog_n(
            "" + Year + "年" + MonthS[Month] + tzc + "日"
          );

          //  cm.gainItem(itemList[tzc][0], itemList[tzc][1]);
          cm.getPlayer().modifyCSPoints(1, 100, true);

          cm.sendOk("恭喜您成功進行簽到並獲取100點!!");
          cm.worldMessage(
            5,
            "『XX谷』" +
              " : " +
              "玩家 " +
              cm.getChar().getName() +
              " 已進行每日簽到!!!"
          );
          cm.dispose();
        } else {
          // 已進行每日簽到 or 未達60分鐘
          cm.sendOk("已進行每日簽到或上線時間未達60分鐘!。");
          cm.dispose();
        }
      }
    }
  }
}
