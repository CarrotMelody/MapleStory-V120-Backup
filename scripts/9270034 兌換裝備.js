//兌換裝備

var status = -1,
  sel = -1,
  sel_ = -1,
  otherreq = false;

var req = [
  [4001126, 100, 1000, 0, 0, 0, 0], //100 1000
  [4001126, 500, 10000000, 4031843, 1000, 0, 0],
  [4001126, 600, 20000000, 4031456, 3000, 4000474, 800],
];

var wp1 = [
  1012098, 1012101, 1012102, 1012103, 1032041, 1032042, 1082252, 1002511,
  1102198, 1002510, 1012191,
];
var wp2 = [
  1003172, 1003173, 1003174, 1003175, 1003176, 1052314, 1052315, 1052316,
  1052317, 1052318, 1072485, 1072486, 1072487, 1072488, 1072489, 1102275,
  1102276, 1102277, 1102278, 1102279, 1152108, 1152110, 1152111, 1152112,
  1152113, 1082295, 1082296, 1082297, 1082298, 1082299,
];
var wp3 = [
  1004422, 1004423, 1004424, 1004425, 1004426, 1102775, 1102794, 1102795,
  1102796, 1102797, 1082636, 1082637, 1082638, 1082639, 1082640, 1052882,
  1052887, 1052888, 1052889, 1052890, 1073030, 1073032, 1073033, 1073034,
  1073035, 1152174, 1152176, 1152177, 1152178, 1152179,
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
      "嗨，準備好來兌換裝備了嗎？ \r\n#b#L0#兌換楓葉裝備。#l \r\n#L1#兌換女皇裝備。#l\r\n#L2#兌換航海裝備。#l #k"
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
    }
    cm.sendSimple("您想換什麼？？" + msg);
  } else if (status === i++) {
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
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp2[sel_] +
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
      case 2:
        cm.sendYesNo(
          "您確定要做一個 #b#t" +
            wp3[sel_] +
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
            "#i" +
            req[sel][5] +
            "# x" +
            req[sel][6] +
            "#k\r\n\r\n#fUI/UIWindow.img/QuestIcon/7/0# " +
            req[sel][2]
        );
        break;
    }
  } else if (status === i++) {
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
      !cm.getPlayer().haveItem(req[sel][3], req[sel][4]) ||
      !cm.getPlayer().haveItem(req[sel][5], req[sel][6])
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

    if (req[sel][6] != 0) {
      cm.gainItem(req[sel][5], -req[sel][6]);
    }

    cm.dispose();
  }
}
