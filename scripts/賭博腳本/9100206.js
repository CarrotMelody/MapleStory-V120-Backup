/*老虎機*/

var status = 0;
var fee;
var winner;
var item = 4021000;

var card1 = Math.floor(Math.random() * 8 + item);
var card2 = Math.floor(Math.random() * 8 + item);
var card3 = Math.floor(Math.random() * 8 + item);
var card4 = Math.floor(Math.random() * 8 + item);
var card5 = Math.floor(Math.random() * 8 + item);
var card6 = Math.floor(Math.random() * 8 + item);
var card7 = Math.floor(Math.random() * 8 + item);
var card8 = Math.floor(Math.random() * 8 + item);
var card9 = Math.floor(Math.random() * 8 + item);

function start() {
  status = -1;

  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 0) {
      cm.sendOk("你的損失。你或許可以贏得大錢。");
      cm.dispose();
      return;
    }

    if (mode == 1) status++;
    else status--;

    if (status == 0) {
      cm.sendNext(
        "你想玩#b老虎機#k嗎? 這個機台是六倍的賠率喔!!\r\n#v4021000##v4021001##v4021002##v4021003##v4021004##v4021005##v4021006##v4021007#寶石連線，就可獲勝"
      );
    } else if (status == 1) {
      fee = 10000000;
      cm.sendYesNo("你確定要下注 #r" + fee + "#k 楓幣嗎?... ");
    } else if (status == 2) {
      if (cm.getMeso() < fee) {
        cm.sendOk("你沒有那麼多錢");
        cm.dispose();
      } else if (cm.getMeso() + fee * 6 > 2100000000) {
        cm.sendOk(
          "如果你贏了這一把，身上的錢會超過21億，請先將金錢存放至倉庫。"
        );
        cm.dispose();
      } else {
        if (card1 == card2 && card2 == card3) {
          winner = 1;
        } else if (card1 == card5 && card5 == card9) {
          winner = 1;
        } else if (card4 == card5 && card5 == card6) {
          winner = 1;
        } else if (card7 == card8 && card8 == card9) {
          winner = 1;
        } else if (card7 == card5 && card5 == card3) {
          winner = 1;
        } else if (card1 == card4 && card4 == card7) {
          winner = 1;
        } else if (card2 == card5 && card5 == card8) {
          winner = 1;
        } else if (card3 == card6 && card6 == card9) {
          winner = 1;
        } else {
          winner = 2;
        }

        if (winner == 1) {
          cm.sendOk(
            "老虎機: \r\n\r\n#v" +
              card1 +
              "##v " +
              card2 +
              "##v " +
              card3 +
              "# \r\n#v" +
              card4 +
              "##v " +
              card5 +
              "##v " +
              card6 +
              "# \r\n#v" +
              card7 +
              "##v " +
              card8 +
              "##v " +
              card9 +
              "#\r\n\r\n 恭喜！你贏了！"
          );

          cm.gainMeso(fee * 6);
          cm.gainItem(4031189, 1);
          cm.dispose();
        } else if (winner == 2) {
          cm.sendOk(
            "老虎機: \r\n\r\n#v" +
              card1 +
              "##v " +
              card2 +
              "##v " +
              card3 +
              "# \r\n#v" +
              card4 +
              "##v " +
              card5 +
              "##v " +
              card6 +
              "# \r\n#v" +
              card7 +
              "##v " +
              card8 +
              "##v " +
              card9 +
              "#\r\n\r\n 你輸了！再接再厲！"
          );

          cm.gainMeso(-fee);
          cm.dispose();
        } else {
          cm.dispose();
        }
      }
    }
  }
}
