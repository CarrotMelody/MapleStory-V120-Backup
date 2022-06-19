var status = 0;
var fee;
var chance = Math.floor(Math.random() * 13 + 1);

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
        "#r【#fUI/Basic.img/BtCoin/normal/0#楓幣賭博機】\r\n#d- 歡迎光臨全場唯一以楓幣作為賭注的機器，\r\n該機器得獎機率約等於#r15%#d。\r\n你準備好接受挑戰了嗎？ #k"
      );
    } else if (status == 1) {
      cm.sendOk(
        "\r\n#fUI/UIWindow.img/AriantMatch/characterIcon/0#　如果你能贏我，我會將你的籌碼數倍奉還，而且還有神秘禮品！"
      );
    } else if (status == 2) {
      fee = cm.getText();
      cm.sendYesNo("　你確認要繼續下注嗎？一次消耗#r1000萬楓幣#k。");
    } else if (status == 3) {
      if (cm.getPlayer().getLevel() < 70) {
        cm.sendOk("必須達到70級才能使用。");
        cm.dispose();
      } else if (cm.getPlayer().getMeso() < 10000000) {
        cm.sendOk("你沒有1000萬楓幣。");
        cm.dispose();
      } else {
        if (chance <= 1) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          // cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 2) {
          cm.sendNext("#r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 3) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 4) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場五倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 5) {
          cm.sendNext("#r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 6) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 7) {
          cm.sendNext("#r這把不算，重新再來，你手不要抖動。#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機手抖了一下，賭局作廢。");
          cm.dispose();
        } else if (chance == 8) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 9) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 10) {
          cm.gainMeso(-10000000);
          cm.sendNext("#r你輸了#k");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance == 11) {
          cm.gainMeso(-10000000);
          cm.sendNext("哦··你的運氣不怎麼好哦··哈哈 再來一把嘛!");
          //cm.worldMessage(6, "[賭場公告]：玩家 " + cm.getChar().getName() + " ，在賭場十倍賭博機輸了，看來今天並不被女神眷顧!");
          cm.dispose();
        } else if (chance >= 12) {
          cm.gainMeso(100000000);
          cm.gainItem(4031189, 1);
          cm.sendNext("#r不錯哦，恭喜你贏了，我願賭服輸!獲得1億楓幣!");
          cm.worldMessage(
            6,
            "[賭場公告]：玩家 " +
              cm.getPlayer().getName() +
              " ，在賭場楓幣賭博機贏了，將籌碼翻了【十倍】獲得1億楓幣!"
          );
          cm.dispose();
        }
      }
    }
  }
}
