/*兌換飾品*/

var status = -1;
var req = 4001126; //楓葉
var reqs = 4032181; //楓幣未來東京
var item = [
  [1012070, 30, 0],
  [1012071, 30, 0],
  [1012072, 30, 0],
  [1012073, 30, 0],
  [1012056, 50, 0],
  [1022097, 50, 0],
  [2040211, 30, 0],
  [2040212, 30, 0],
  [1022058, 50, 0],
  [1022246, 300, 0],
  [1032025, 30, 0],
  [1032032, 30, 0],
  [1032028, 50, 0],
  [1032027, 100, 0],
  [1032026, 200, 0],
  [1032055, 50, 0],
  [1032056, 50, 0],
  [1032057, 50, 0],
  [1032058, 100, 0],
  [1032077, 200, 0],
  [1032078, 200, 0],
  [1032079, 200, 0],
  [1122007, 300, 0],
  [1122017, 500, 0],
  [1122077, 500, 0],
  [1122000, 1500, 300],
  [1122267, 3000, 1000],
  [2041200, 300, 50],
  [1112414, 200, 0],
  [1112585, 200, 0],
  [1112683, 300, 0],
  [1118791, 400, 0],
  [1112586, 800, 0],
  [1113185, 800, 0],
  [1112735, 1500, 300],
  [1113075, 3000, 1000],
  [1132246, 3000, 1000],
  [1012438, 3000, 350],
  [1022211, 3000, 350],
  [1032224, 3000, 350],
  [1122269, 3000, 350],
  [1132247, 3000, 350],
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
      var qtys = item[v][2];
      msg +=
        "\r\n#b#L" +
        v +
        "#" +
        qty +
        "個#i" +
        req +
        "#及" +
        qtys +
        "個#i" +
        reqs +
        "#兌換#v" +
        id +
        "##z" +
        id +
        "##b";
    }
    cm.sendSimple(
      "#r親愛的玩家新年快樂，以下豐富的物品需要#i4001126#才可兌換!!高級飾品還會另外需要#i4032181##b" +
        msg
    );
  } else if (status === i++) {
    if (!cm.canHold(item[selection][0])) {
      cm.sendNext("你的背包裝不下");
      cm.dispose();
      return;
    } else if (
      !cm.haveItem(req, item[selection][1]) ||
      !cm.haveItem(reqs, item[selection][2])
    ) {
      cm.sendNext(
        "身上沒有#v" +
          req +
          "#" +
          item[selection][1] +
          "個或沒有#v" +
          reqs +
          "#" +
          item[selection][2] +
          "個"
      );
      cm.dispose();
      return;
    }
    cm.gainItem(req, -item[selection][1]);
    cm.gainItem(reqs, -item[selection][2]);
    cm.gainItem(item[selection][0], 1);
    cm.sendOk("感謝您，看看有沒有拿到囉。");
    cm.dispose();
  }
}
