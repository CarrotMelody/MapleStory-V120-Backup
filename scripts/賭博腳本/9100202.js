//importPackage(net.sf.odinms.client);

var status = 0;
var fee;
var chance = Math.floor(Math.random() * 12 + 1);

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 0) {
      cm.sendOk("#i3994125# - 我會繼續在這裡等著你。");
      cm.dispose();
      return;
    }
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
      cm.sendAcceptDecline(
        "#r【五倍賭博機】\r\n#d-看來你的心很大啊，其他賭博機滿足不了你了嗎？#i3994125# #k\r\n "
      );
    } else if (status == 1) {
      cm.sendOk(
        "#i3994125#\r\n如果你能贏我，我會將你的籌碼數倍奉還，而且還有神秘禮品"
      );
    } else if (status == 2) {
      fee = cm.getText();
      cm.sendYesNo("#i3994125# - 你確認要繼續下注嗎？一次消耗#r50GASH#k。");
    } else if (status == 3) {
      if (cm.getPlayer().getLevel() < 25) {
        cm.sendOk("必須達到25級才能使用。");
        cm.dispose();
      } else if (cm.getPlayer().getCSPoints(1) < 50) {
        cm.sendOk("你沒有50GASH");
        cm.dispose();
      } else {
        if (chance <= 1) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          // cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 2) {
          cm.sendNext("#i3994125# - #r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 3) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 4) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場五倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 5) {
          cm.sendNext("#i3994125# - #r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 6) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 7) {
          cm.sendNext("#i3994125# - #r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 8) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 9) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 10) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("#i3994125# - #r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 11) {
          cm.getPlayer().modifyCSPoints(1, -50, true);
          cm.sendNext("哦··你的運氣不怎麼好哦··哈哈 再來一把嘛!");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance >= 12) {
          cm.getPlayer().modifyCSPoints(1, 250, true);
          cm.gainItem(4031189, 1);
          cm.sendNext(
            "#i3994125# -#r不錯哦，恭喜你贏了，我願賭服輸!獲得250點數"
          );
          cm.worldMessage(
            6,
            "[賭場公告]：玩家 " +
              cm.getPlayer().getName() +
              " ，在賭場五倍賭博機贏了，將籌碼翻了【五倍】獲得250點數!"
          );
          cm.dispose();
        }
      }
    }
  }
}
