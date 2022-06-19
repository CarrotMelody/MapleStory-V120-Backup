/*神話耳環升階*/

var status = 0;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("之後再來升級吧~");
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
        "您好，我是強化#b神話耳環#k的店員！\r\n#r【強化條件】 #k強化一階需要100個#i4001126##b\r\n#L1#領取#i1032206##z1032206##l\r\n#L2#升級#i1032207##z1032207##l\r\n#L3#升級#i1032208##z1032208##l\r\n#L4#升級#i1032209##z1032209##l\r\n#L5#升級#i1032219##z1032219##l"
      );
    } else if (status == 1) {
      if (selection == 1) {
        if (cm.getPlayer().haveItem(1032206, 1)) {
          cm.sendOk("您已經領取過#z1032206#。");
          cm.dispose();
        } else {
          cm.gainItem(1032206, 1);
          cm.sendOk("恭喜獲得#z1032206#。");
          cm.dispose();
        }
      } else if (selection == 2) {
        if (
          !cm.getPlayer().haveItem(1032206, 1) ||
          !cm.getPlayer().haveItem(4001126, 100)
        ) {
          cm.sendOk(
            "請記得將#z1032206#脫下放在裝備欄，或者你的#z4001126#不足。"
          );
          cm.dispose();
        } else {
          cm.gainItem(1032206, -1);
          cm.gainItem(4001126, -100);
          cm.gainItem(1032207, 1);
          cm.sendOk("恭喜獲得#z1032207#");
          cm.dispose();
        }
      } else if (selection == 3) {
        if (
          !cm.getPlayer().haveItem(1032207, 1) ||
          !cm.getPlayer().haveItem(4001126, 100)
        ) {
          cm.sendOk(
            "請記得將#z1032207#脫下放在裝備欄，或者你的#z4001126#不足。"
          );
          cm.dispose();
        } else {
          cm.gainItem(1032207, -1);
          cm.gainItem(4001126, -100);
          cm.gainItem(1032208, 1);
          cm.sendOk("恭喜獲得#z1032208#");
          cm.dispose();
        }
      } else if (selection == 4) {
        if (
          !cm.getPlayer().haveItem(1032208, 1) ||
          !cm.getPlayer().haveItem(4001126, 100)
        ) {
          cm.sendOk(
            "請記得將#z1032208#脫下放在裝備欄，或者你的#z4001126#不足。"
          );
          cm.dispose();
        } else {
          cm.gainItem(1032208, -1);
          cm.gainItem(4001126, -100);
          cm.gainItem(1032209, 1);
          cm.sendOk("恭喜獲得#z1032209#");
          cm.dispose();
        }
      } else if (selection == 5) {
        if (
          !cm.getPlayer().haveItem(1032209, 1) ||
          !cm.getPlayer().haveItem(4001126, 100)
        ) {
          cm.sendOk(
            "請記得將#z1032209#脫下放在裝備欄，或者你的#z4001126#不足。"
          );
          cm.dispose();
        } else {
          cm.gainItem(1032209, -1);
          cm.gainItem(4001126, -100);
          cm.gainItem(1032219, 1);
          cm.sendOk("恭喜獲得#z1032219#");
          cm.dispose();
        }
      }
    }
  }
}
