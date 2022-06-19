/*擔心鬼 - 楓葉換點數*/

//兌換楓葉

var status = -1,
  sel = -1,
  sel_ = -1,
  otherreq = false;

var req = [
  //楓葉
  [100, 4001126],
  [200, 4001126],
  [300, 4001126],
  [400, 4001126],
  [500, 4001126],
  [600, 4001126],
  [700, 4001126],
  [800, 4001126],
  [900, 4001126],
  [1000, 4001126],
];

var change = [
  //換多少點數
  30, 50, 100, 150, 200, 250, 300, 350, 400, 500,
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
      "嗨，準備好用#b#i4001126##t4001126##k來兌換點數了嗎？ \r\n#b#L0#兌換30點。#l \r\n#L1#兌換50點。#l\r\n#L2#兌換100點。#l\r\n#L3#兌換150點。#l\r\n#L4#兌換200點。#l\r\n#L5#兌換250點。#l\r\n#L6#兌換300點。#l\r\n#L7#兌換350點。#l\r\n#L8#兌換400點。#l\r\n#L9#兌換500點。#l#k"
    );
  } else if (status === i++) {
    sel_ = selection;
    switch (sel_) {
      case 0:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎?" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 1:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 2:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 3:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 4:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 5:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 6:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 7:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 8:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
      case 9:
        cm.sendYesNo(
          "您確定要做兌換 #b" +
            change[sel_] +
            "點嗎" +
            "#k? \r\n你需要支付" +
            req[sel_][0] +
            "個楓葉。"
        );
        break;
    }
  } else if (status === i++) {
    var gain;

    switch (sel_) {
      case 0:
        gain = change[sel_];
        break;
      case 1:
        gain = change[sel_];
        break;
      case 2:
        gain = change[sel_];
        break;
      case 3:
        gain = change[sel_];
        break;
      case 4:
        gain = change[sel_];
        break;
      case 5:
        gain = change[sel_];
        break;
      case 6:
        gain = change[sel_];
        break;
      case 7:
        gain = change[sel_];
        break;
      case 8:
        gain = change[sel_];
        break;
      case 9:
        gain = change[sel_];
        break;
    }

    if (!cm.haveItem(req[sel_][1], req[sel_][0])) {
      cm.sendNext("你的楓葉數量不足！");
      cm.dispose();
      return;
    }

    cm.getPlayer().modifyCSPoints(1, change[sel_], true);
    cm.gainItem(req[sel_][1], -req[sel_][0]);
    cm.sendOk("感謝您，看看有沒有拿到囉。 ");
    cm.dispose();
  }
}
