/**
 * 村莊傳送
 */
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

function start() {
  status = -1;

  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("好的,如果你決定要去哪裡,我會很樂意傳送你的.");
      cm.dispose();
      return;
    }
    if (mode == 1) {
      status++;
    } else {
      status--;
    }
    if (status == 0) {
      cm.sendSimple(
        "#k我是村莊傳送員，請選擇你的目的地：#b  \r\n#L99#血統驗證區#r【每日限制一次，機率掉落#i4001456#】#k#l \r\n#L0#楓葉村#l   \r\n#L1#楓之港#l    \r\n#L2#維多利亞港#l  \r\n#L3#弓箭手村#l   \r\n#L4#魔法森林#l   \r\n#L5#勇士之村#l  \r\n#L6#墮落城市#l  \r\n#L7#鯨魚號#l    \r\n#L8#耶雷弗#l   \r\n#L9#天空之城#l     \r\n#L10#冰原雪域#l     \r\n#L11#水世界#l     \r\n#L12#童話村#l     \r\n#L13#玩具城#l     \r\n#L14#東方神州#l     \r\n#L15#武陵#l     \r\n#L16#少林寺#l     \r\n#L17#不夜城#l     \r\n#L18#新葉城#l     \r\n#L19#神木村#l     \r\n#L20#馬加提亞#l     \r\n#L21#地球防衛本部#l     \r\n#L22#西門町#l     \r\n#L23#昭和村#l     \r\n#L24#新加坡機場#l     \r\n#L25#古代神社#l     \r\n#L26#武陵道場入口#l        \r\n#L27#馬來西亞 鄉村鎮#l     \r\n#L28#馬來西亞 都會潮流區#l     \r\n#L29#上海豫園#l     \r\n#L30#靈藥幻境#l     \r\n#L31#艾靈森林#l     \r\n#L32#黃金寺廟#l  \r\n#L33#少林寺 藏經閣#l   "
      );
    } else if (status == 1) {
      if (selection == 1) {
        cm.warp(1000000, 0);
        cm.sendOk("我已經將你傳送到#r楓葉村#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 99) {
        if (
          cm.getBossLog2(Year + "年" + MonthS[Month] + tzc + "日xtyzq") == 0
        ) {
          var FantMap = cm.getMap(999999993);
          FantMap.resetFully();
          cm.setBossLog2(Year + "年" + MonthS[Month] + tzc + "日xtyzq");
          cm.warp(999999993, 0);
          cm.sendOk("我已經將你傳送到#r血統驗證區#n#k了.歡迎再次光臨!");
          cm.dispose();
        } else {
          cm.sendOk("今天去過血統驗證區！！不要太貪心!");
          cm.dispose();
        }
        cm.dispose();
      } else if (selection == 1) {
        cm.warp(60000, 0);
        cm.sendOk("我已經將你傳送到#r楓之港#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 8) {
        cm.warp(130000000, 0);
        cm.sendOk("我已經將你傳送到#r耶雷弗#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 2) {
        cm.warp(104000000, 0);
        cm.sendOk("我已經將你傳送到#r維多利亞港#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 3) {
        cm.warp(100000000, 0);
        cm.sendOk("我已經將你傳送到#r弓箭手村#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 4) {
        cm.warp(101000000, 0);
        cm.sendOk("我已經將你傳送到#r魔法森林#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 5) {
        cm.warp(102000000, 0);
        cm.sendOk("我已經將你傳送到#r勇士之村#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 6) {
        cm.warp(103000000, 0);
        cm.sendOk("我已經將你傳送到#r墮落城市#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 7) {
        cm.warp(120000000, 0);
        cm.sendOk("我已經將你傳送到#r鯨魚號#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 9) {
        cm.warp(200000000, 0);
        cm.sendOk("我已經將你傳送到#r天空之城#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 10) {
        cm.warp(211000000, 0);
        cm.sendOk("我已經將你傳送到#r冰原雪域#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 11) {
        cm.warp(230000000, 0);
        cm.sendOk("我已經將你傳送到#r水世界#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 12) {
        cm.warp(222000000, 0);
        cm.sendOk("我已經將你傳送到#r童話村#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 13) {
        cm.warp(220000000, 0);
        cm.sendOk("我已經將你傳送到#r玩具城#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 14) {
        cm.warp(701000000, 0);
        cm.sendOk("我已經將你傳送到#r東方神州#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 15) {
        cm.warp(250000000, 0);
        cm.sendOk("我已經將你傳送到#r武陵#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 16) {
        cm.warp(702000000, 0);
        cm.sendOk("我已經將你傳送到#r少林寺#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 17) {
        cm.warp(741000000, 0);
        cm.sendOk("我已經將你傳送到#r不夜城#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 18) {
        cm.warp(600000000, 0);
        cm.sendOk("我已經將你傳送到#r新葉城#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 19) {
        cm.warp(240000000, 0);
        cm.sendOk("我已經將你傳送到#r神木村#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 20) {
        cm.warp(261000000, 0);
        cm.sendOk("我已經將你傳送到#r馬加提亞#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 21) {
        cm.warp(221000000, 0);
        cm.sendOk("我已經將你傳送到#r地球防衛本部#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 22) {
        cm.warp(740000000, 0);
        cm.sendOk("我已經將你傳送到#r西門町#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 23) {
        cm.warp(801000000, 0);
        cm.sendOk("我已經將你傳送到#r昭和村#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 24) {
        cm.warp(540010000, 0);
        cm.sendOk("我已經將你傳送到#r新加坡機場#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 25) {
        cm.warp(800000000, 0);
        cm.sendOk("我已經將你傳送到#r古代神社#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 26) {
        cm.warp(925020000, 0);
        cm.sendOk("我已經將你傳送到#r武陵道場入口#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 27) {
        cm.warp(551000000, 0);
        cm.sendOk("我已經將你傳送到#r馬來西亞 鄉村鎮#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 28) {
        cm.warp(550000000, 0);
        cm.sendOk("我已經將你傳送到#r馬來西亞 都會潮流區#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 29) {
        cm.warp(701000200, 0);
        cm.sendOk("我已經將你傳送到#r上海豫園#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 30) {
        cm.warp(251000000, 0);
        cm.sendOk("我已經將你傳送到#r靈藥幻境#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 31) {
        cm.warp(300000000, 0);
        cm.sendOk("我已經將你傳送到#r艾靈森林#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 32) {
        cm.warp(501000000, 0);
        cm.sendOk("我已經將你傳送到#r黃金寺廟#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 33) {
        cm.warp(702100000, 0);
        cm.sendOk("我已經將你傳送到#r少林寺 藏經閣#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      }
    }
  }
}
