var status = 0;
var 黑水晶 = 4021008;
var 蓝色箭头 = "#fUI/UIWindow/Quest/icon2/7#";
var 红色箭头 = "#fUI/UIWindow/Quest/icon6/7#";
var 圆形 = "#fUI/UIWindow/Quest/icon3/6#";
var 美化new = "#fUI/UIWindow/Quest/icon5/1#";
var 感叹号 = "#fUI/UIWindow/Quest/icon0#";
var 正方箭头 = "#fUI/Basic/BtHide3/mouseOver/0#";
var 忠告 = "#k温馨提示：任何非法程序和外挂封号处理.封杀侥幸心理.";
function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.dispose();
      return;
    }
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
      var a1 = "#L1##b" + 正方箭头 + " 50 GASH 【大】【小】\r\n";
      var a2 = "#L2##b" + 正方箭头 + " 250GASH 【大】【小】\r\n";
      var a3 = "#L3##b" + 正方箭头 + " 500GASH 【大】【小】\r\n";

      cm.sendSimple(
        "\r\n#d-來來來，買大買小，買定離手#i3994122# #r【大小賭博機】\r\n#r  【賠率】1:2【概率】5:5\r\n" +
          a1 +
          "" +
          a2 +
          "" +
          a3 +
          ""
      );
    } else if (selection == 1) {
      if (cm.getPlayer().getLevel() < 25) {
        cm.sendOk("必須達到25級才能使用。");
        cm.dispose();
        return;
      } else {
        if (cm.getPlayer().getCSPoints(1) >= 50) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          var rand = Math.floor(Math.random() * 100);
          if (rand < 50) {
            cm.getPlayer().modifyCSPoints(1, 100, true);
            cm.gainItem(4031189, 1);
            cm.sendOk("恭喜你，贏了");
            cm.dispose();
            cm.worldMessage(
              6,
              "[賭場公告]：玩家 " +
                cm.getPlayer().getName() +
                " ，在賭場選大小點贏了，將籌碼x1翻了【兩倍】獲得100點GASH!"
            );
            return;
          } else {
            cm.sendOk("唉，輸了");
            cm.dispose();
            return;
          }
        } else {
          cm.sendOk("你沒有足夠的GASH.~");
          cm.dispose();
          return;
        }
      }
    } else if (selection == 2) {
      if (cm.getPlayer().getLevel() < 25) {
        cm.sendOk("必須達到25級才能使用。");
        cm.dispose();
        return;
      } else {
        if (cm.getPlayer().getCSPoints(1) >= 250) {
          cm.getPlayer().modifyCSPoints(1, -250, true);
          var rand = Math.floor(Math.random() * 100);
          if (rand < 50) {
            cm.getPlayer().modifyCSPoints(1, 500, true);
            cm.gainItem(4031189, 1);
            cm.sendOk("恭喜你，贏了");
            cm.dispose();
            cm.worldMessage(
              6,
              "[賭場公告]：玩家 " +
                cm.getPlayer().getName() +
                " ，在賭場選大小點贏了，將籌碼x5翻了【兩倍】獲得500點GASH!"
            );
            return;
          } else {
            cm.sendOk("唉，輸了");
            cm.dispose();
            return;
          }
        } else {
          cm.sendOk("你沒有足夠的GASH~");
          cm.dispose();
          return;
        }
      }
    } else if (selection == 3) {
      if (cm.getPlayer().getLevel() < 25) {
        cm.sendOk("必須達到25級才能使用。");
        cm.dispose();
        return;
      } else {
        if (cm.getPlayer().getCSPoints(1) >= 500) {
          cm.getPlayer().modifyCSPoints(1, -500, true);
          var rand = Math.floor(Math.random() * 100);
          if (rand < 50) {
            cm.getPlayer().modifyCSPoints(1, 1000, true);
            cm.gainItem(4031189, 1);
            cm.sendOk("恭喜你，贏了");
            cm.dispose();
            cm.worldMessage(
              6,
              "[賭場公告]：玩家 " +
                cm.getPlayer().getName() +
                " ，在賭場選大小點贏了，將籌碼x10翻了【兩倍】獲得1000點GASH!"
            );
            return;
          } else {
            cm.sendOk("唉，輸了");
            cm.dispose();
            return;
          }
        } else {
          cm.sendOk("你沒有足夠的GASH~");
          cm.dispose();
          return;
        }
      }
    }
  }
}
