var status = -1;
var req = 4001126; // 楓葉
var item = [
  [1012098, 1],
  [1012101, 1],
  [1012102, 1],
  [1012103, 1],
  [1032041, 1],
  [1032042, 1],
  [1002510, 1],
  [1002511, 1],
  [1102071, 1],
  [1082252, 1],
];

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else if (mode == 0) {
    status--;
  } else {
    cm.dispose();
    return;
  }
  var i = -1;
  if (status <= i++) {
    cm.dispose();
  } else if (status === i++) {
    var msg = "";
    for (var v = 0; v < item.length; v++) {
      var id = item[v][0];
      var qty = item[v][1];
      msg +=
        "\r\n#b#L" +
        v +
        "#" +
        qty +
        "個#i" +
        req +
        "#兌換#i" +
        id +
        "##t" +
        id +
        "##b";
    }
    cm.sendSimple(
      "#r親愛的玩家新年快樂，以下豐富的物品需要#i4001126#才可兌換!!#b" + msg
    );
  } else if (status === i++) {
    if (!cm.canHold(item[selection][0])) {
      cm.sendNext("你的背包裝不下");
      cm.dispose();
      return;
    } else if (!cm.haveItem(req, item[selection][1])) {
      cm.sendNext("身上沒有#v" + req + "#" + item[selection][1] + "個");
      cm.dispose();
      return;
    }
    cm.gainItem(req, -item[selection][1]);
    cm.gainItem(item[selection][0], 1);
    cm.sendOk("感謝您，看看有沒有拿到囉。");
    cm.dispose();
  }
}
