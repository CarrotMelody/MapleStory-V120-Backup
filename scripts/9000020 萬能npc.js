/* 萬能NPC */
var status = -1;
var options = [
  "每日簽到",
  "自由市場",
  "轉蛋屋",
  "結婚小鎮",
  "公會本部",
  "賭博屋",
  "武陵道場",
  "村莊傳送",
  "練級傳送",
  "BOSS傳送",
  "組隊任務",
  "每日運氣",
  "美髮造型",
  "臉型美容",
  "點裝領取",
  "兌換裝備",
  "兌換武器",
  "兌換飾品",
  "楓幣換楓葉",
  "楓葉換點數",
  "椅子兌換",
  "等級獎勵",
  "防具商人",
  "學習技能",
  "快速轉職",
  "點裝附魔",
  "雜貨店",
  "神話耳環升階",
  "查詢爆率",
  "賞金任務",
  "銀行帳戶",
];
var npcid = 9000020;
var name = "XX谷";
var log = "123";

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
    if (mode == 1) {
      status++;
    } else {
      status--;
    }
    if (status == 0) {
      var msg =
        "#i3994014##i3994018##i3994070##i3994061##i3994005##i3991038##i3991004#\r\n";
      msg +=
        "親愛的 [#r" +
        cm.getPlayer().getName() +
        "#k] 你好，我是 #d" +
        name +
        "#k 的萬能NPC\r\n";
      msg += "【擁有楓幣：#r" + cm.getPlayer().getMeso() + "#k楓幣】\r\n";
      msg +=
        "【持有楓葉：#r" + cm.getPlayer().itemQuantity(4001126) + "#k個】\r\n";
      msg += "【擁有點數：#r" + cm.getPlayer().getCSPoints(1) + "#k點】\r\n";
      msg += "【您的銀行存款：#r" + cm.getMoney() + "#k楓幣】#b\r\n";
      msg += "目前在線時間：#r" + cm.getOnlineTime() + "#k分鐘#b";

      msg += "\r\n#r===============<常用功能>=================";
      for (var i = 0; i <= 11; i++) {
        if (i % 3 == 0) {
          msg += "\r\n";
        }
        msg +=
          "#d#L" +
          i +
          "##e#fUI/Basic.img/icon/arrow#[" +
          options[i] +
          "#d]#n#l";
      }

      msg += "\r\n\r\n#r===============<美化功能>=================\r\n";
      for (var j = 12; j <= 14; j++) {
        if (j % 15 == 0) {
          msg += "\r\n";
        }

        msg +=
          "#d#L" +
          j +
          "##e#fUI/Basic.img/icon/arrow#[" +
          options[j] +
          "#d]#n#l";
      }

      msg += "\r\n\r\n#r===============<兌換專區>=================\r\n";
      for (var k = 15; k <= 20; k++) {
        if (k % 18 == 0) {
          msg += "\r\n";
        }

        msg +=
          "#d#L" +
          k +
          "##e#fUI/Basic.img/icon/arrow#[" +
          options[k] +
          "#d]#n#l";
      }

      msg += "\r\n\r\n#r===============<其他專區>=================\r\n";
      for (var u = 21; u <= 30; u++) {
        if (u % 24 == 0 || u % 27 == 0) {
          msg += "\r\n";
        }

        msg +=
          "#d#L" +
          u +
          "##e#fUI/Basic.img/icon/arrow#[" +
          options[u] +
          "#d]#n#l";
      }

      cm.sendOk(msg);
    } else if (status == 1) {
      if (selection == 1) {
        //回自由市場
        cm.warp(999999992, 0);
        cm.sendOk("我已經將你傳送到#r自由市場#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 2) {
        //轉蛋屋傳送
        cm.warp(749050400, 0);
        cm.sendOk("我已經將你傳送到#r轉蛋屋#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 3) {
        //結婚小鎮
        cm.warp(680000000, 0);
        cm.sendOk("我已經將你傳送到#r結婚小鎮#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 4) {
        //公會本部
        cm.warp(200000301, 0);
        cm.sendOk("我已經將你傳送到#r公會本部#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 5) {
        //英語村傳送
        cm.warp(809030000, 0);
        cm.sendOk("我已經將你傳送到#r賭博屋#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 6) {
        //武陵道場傳送
        cm.warp(925020000, 0);
        cm.sendOk("我已經將你傳送到#r武陵道場#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 7) {
        //村莊傳送
        cm.dispose();
        cm.openNpc(9000028);
      } else if (selection == 8) {
        //練級傳送
        cm.dispose();
        cm.openNpc(2040003);
      } else if (selection == 9) {
        //BOSS傳送
        cm.dispose();
        cm.openNpc(9330093);
      } else if (selection == 10) {
        //組隊任務
        cm.dispose();
        cm.openNpc(9209007);
      } else if (selection == 11) {
        //每日運氣
        if (cm.getBossLog2(Year + "年" + MonthS[Month] + tzc + "日qy") == 0) {
          cm.dispose();
          cm.setBossLog2(Year + "年" + MonthS[Month] + tzc + "日qy");
          cm.openNpc(9330021);
        } else {
          cm.sendSimple("你今天已經抽過籤了哦！");
          cm.dispose();
        }
      } else if (selection == 12) {
        //美髮傳送
        cm.dispose();
        cm.openNpc(1012103);
      } else if (selection == 13) {
        //臉型美容
        cm.dispose();
        cm.openNpc(1052004);
      } else if (selection == 14) {
        //點裝領取
        cm.dispose();
        cm.openNpc(9330072);
      } else if (selection == 16) {
        //兌換武器
        cm.dispose();
        cm.openNpc(9105006);
      } else if (selection == 15) {
        //兌換裝備
        cm.dispose();
        cm.openNpc(9270034);
      } else if (selection == 17) {
        //兌換飾品
        cm.dispose();
        cm.openNpc(9330094);
      } else if (selection == 18) {
        //楓幣換楓葉
        cm.dispose();
        cm.openNpc(9310002);
      } else if (selection == 19) {
        //楓葉換點數
        cm.dispose();
        cm.openNpc(9330090);
      } else if (selection == 20) {
        //椅子兌換
        cm.dispose();
        cm.openNpc(9201121);
      } else if (selection == 21) {
        //等級獎勵
        cm.dispose();
        cm.openNpc(9010010);
      } else if (selection == 26) {
        //雜貨店
        cm.dispose();
        cm.openShop(61);
      } else if (selection == 22) {
        //防具商人
        cm.dispose();
        cm.openShop(54);
      } else if (selection == 23) {
        //學習技能
        cm.dispose();
        cm.openNpc(9310018);
      } else if (selection == 24) {
        //一轉轉職
        cm.dispose();
        cm.openNpc(9000038); //9250032
      } else if (selection == 25) {
        //附魔
        cm.dispose();
        cm.openNpc(1052119);
      } else if (selection == 0) {
        //簽到
        cm.dispose();
        cm.openNpc(1012008);
      } else if (selection == 27) {
        //神話耳環升階
        cm.dispose();
        cm.openNpc(9270029);
      } else if (selection == 28) {
        //查詢爆率
        cm.dispose();
        cm.openNpc(1052122);
      } else if (selection == 29) {
        //賞金任務
        cm.dispose();
        cm.openNpc(9000001);
      } else if (selection == 30) {
        //銀行帳戶
        cm.dispose();
        cm.openNpc(9900002);
      }
    }
  }
}
