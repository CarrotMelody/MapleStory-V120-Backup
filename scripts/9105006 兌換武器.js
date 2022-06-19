//兌換楓武

var status = -1,
  sel = -1,
  sel_ = -1,
  otherreq = false;

var req = [
  [4001126, 1, 250000, 0, 0], //300,25w
  [4001126, 500, 300000, 0, 0], //500 30w
  [4001126, 800, 3000000, 0, 0],
  [4001126, 1000, 5000000, 0, 0],
  [4001126, 2000, 20000000, 4031843, 1000],
  [4001126, 2000, 30000000, 4031456, 3000], //2000 , 3000
];

var wp1 = [
  1302020, 1382009, 1442083, 1452016, 1462014, 1472030, 1492020, 1342025,
  1482020, 1092030,
];
var wp2 = [
  1302030, 1382012, 1412011, 1442024, 1422014, 1332025, 1432012, 1452022,
  1462019, 1342026, 1472032, 1492021, 1482021,
];
var wp3 = [
  1302064, 1402039, 1312032, 1412027, 1322054, 1422029, 1452045, 1462040,
  1472055, 1332056, 1332055, 1432040, 1442051, 1372034, 1382039, 1482022,
  1492022, 1092046, 1092045, 1092047,
];

var wp4 = [
  1302142, 1312056, 1322084, 1332114, 1372071, 1382093, 1402085, 1412055,
  1422057, 1432075, 1452100, 1442104, 1462085, 1472111, 1482073, 1492073,
];

var wp5 = [
  //女皇
  1302152, 1312065, 1322096, 1402095, 1412065, 1432086, 1452111, 1462099,
  1372084, 1382104, 1332130, 1342036, 1472122, 1482084, 1492085,
];

var wp6 = [
  1302333, 1312199, 1322250, 1332274, 1342101, 1372222, 1382259, 1402251,
  1412177, 1422184, 1432214, 1452252, 1462239, 1472261, 1482216, 1492231,
];

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else if (mode == 0) {
    cm.dispose();
    return;
  } else {
    cm.dispose();
    return;
  }
  var i = -1;
  if (status <= i++) {
    cm.dispose();
  } else if (status === i++) {
    cm.sendSimple(
      "嗨，準備好用#b#i4001126##t4001126##k來兌換武器了嗎？ \r\n#b#L0#兌換35等楓葉武器。#l \r\n#L1#兌換42等楓葉武器。#l\r\n#L2#兌換64等楓葉武器。#l\r\n#L3#兌換77等黃金楓葉武器。#l\r\n#L4#兌換140等女皇武器。#l  \r\n#L5#兌換160等航海武器。#l  #k"
    );
  } else if (status === i++) {
    var msg = "";
    sel = selection;
    switch (sel) {
      case 0:
        for (var v = 0; v < wp1.length; v++) {
          var id = wp1[v];
          msg += "\r\n#b#L" + v + "##i" + id + "##z" + id + "##l ";
        }
        break;
      case 1:
        for (var v = 0; v < wp2.length; v++) {
          var id = wp2[v];
          msg += "\r\n#b#L" + v + "##i" + id + "##z" + id + "##l ";
        }
        break;
      case 2:
        for (var v = 0; v < wp3.length; v++) {
          var id = wp3[v];
          msg += "\r\n#b#L" + v + "##i" + id + "##z" + id + "##l ";
        }
        break;
      case 3:
        for (var v = 0; v < wp4.length; v++) {
          var id = wp4[v];
          msg += "\r\n#b#L" + v + "##i" + id + "##z" + id + "##l ";
        }
        break;
      case 4:
        for (var v = 0; v < wp5.length; v++) {
          var id = wp5[v];
          msg += "\r\n#b#L" + v + "##z" + id + "##l ";
        }
        break;
      case 5:
        for (var v = 0; v < wp6.length; v++) {
          var id = wp6[v];
          msg += "\r\n#b#L" + v + "##z" + id + "##l ";
        }
        break;
    }
    cm.sendSimple("您想換什麼？？" + msg);
  } else if (status == i++) {
    sel_ = selection;
    switch (sel) {
      case 0:
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp1[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
      case 1:
        var other = otherreq ? "#i" + wp1[sel_] + "# x 1\r\n" : "";
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp2[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n" +
            other +
            "#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
      case 2:
        var other = otherreq ? "#i" + wp2[sel_] + "# x 1\r\n" : "";
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp3[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n" +
            other +
            "#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
      case 3:
        var other = otherreq ? "#i" + wp3[sel_] + "# x 1\r\n" : "";
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp4[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n" +
            other +
            "#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
      case 4:
        var other = otherreq ? "#i" + wp4[sel_] + "# x 1\r\n" : "";
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp5[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n" +
            other +
            "#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#i" +
            req[sel][3] +
            "# x" +
            req[sel][4] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
      case 5:
        var other = otherreq ? "#i" + wp5[sel_] + "# x 1\r\n" : "";
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp6[sel_] +
            "##k? \r\n以下是你所需要的材料。\r\n" +
            other +
            "#i" +
            req[sel][0] +
            "# x" +
            req[sel][1] +
            "#i" +
            req[sel][3] +
            "# x" +
            req[sel][4] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
    }
  } else if (status == i++) {
    var gain;
    switch (sel) {
      case 0:
        gain = wp1[sel_];
        break;
      case 1:
        gain = wp2[sel_];
        break;
      case 2:
        gain = wp3[sel_];
        break;
      case 3:
        gain = wp4[sel_];
        break;
      case 4:
        gain = wp5[sel_];
        break;
      case 5:
        gain = wp6[sel_];
        break;
    }

    if (!cm.canHold(gain)) {
      cm.sendNext("你的背包裝不下");
      cm.dispose();
      return;
    } else if (cm.getPlayer().getMeso() < req[sel][2]) {
      cm.sendNext("你的楓幣不足");
      cm.dispose();
      return;
    } else if (
      !cm.getPlayer().haveItem(req[sel][0], req[sel][1]) ||
      !cm.getPlayer().haveItem(req[sel][3], req[sel][4])
    ) {
      cm.sendNext(
        "很抱歉，由於您的材料不足所以無法幫您製作，假如需要的話可以再來找我談談。"
      );
      cm.dispose();
      return;
    }
    cm.gainItem(gain, 1);
    cm.sendOk("感謝您，看看有沒有拿到囉。 ");
    cm.gainMeso(-req[sel][2]);
    cm.gainItem(req[sel][0], -req[sel][1]);
    cm.gainItem(req[sel][3], -req[sel][4]);

    cm.dispose();
  }
}
