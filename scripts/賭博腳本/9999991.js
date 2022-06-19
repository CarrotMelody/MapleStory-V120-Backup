status = -1;
playerFlag = 0;
computerFlag = 0;
var playerColor;
var computerColor;

function start() {
  cm.sendYesNo(
    "嗨 #h #.\r\n想與無腦的電腦玩OX遊戲嗎？勝利的話可以贏得#b#t5220000##k1張"
  );
}

function action(mode, type, selection) {
  if (mode != 1) {
    if (type == 1 && mode == 0) {
      cm.sendNext("膽小鬼。");
    }
    cm.dispose();
    return;
  }
  status++;
  if (status == 0) {
    cm.sendSimple("你想做?\r\n\r\n#b#L0#先手.\r\n#L1#後手.");
  } else if (status == 1) {
    playerColor = selection == 0 ? 3991040 : 3991049;
    computerColor = selection == 0 ? 3991023 : 3991014;
    if (selection == 1) {
      computerMoves();
    }
    play();
  } else {
    if (
      (playerFlag & (1 << selection)) == 1 << selection ||
      (computerFlag & (1 << selection)) == 1 << selection ||
      selection < 0 ||
      selection > 9
    ) {
      cm.sendNext("禁止作弊。");
      cm.dispose();
      return;
    }
    playerFlag |= 1 << selection;
    if (((playerFlag | computerFlag) ^ 511) == 0) {
      tie();
      return;
    }
    for (var i = 0; i < 3; ) {
      if (isWinner(playerFlag, i++)) {
        win();
        return;
      }
    }
    computerMoves();
    for (var i = 0; i < 3; ) {
      if (isWinner(computerFlag, i++)) {
        lose();
        return;
      }
    }
    play();
  }
}

function play() {
  cm.sendSimple(loadText(true));
}

function win() {
  if (cm.canHold(5220000)) {
    cm.gainItem(5220000, 1);
    cm.sendNext(
      loadText(false) + "\r\n\r\n哇！你做到了！恭喜你！您贏得了#b#t5220000##k."
    );
  } else {
    cm.sendNext(
      "哇！你做到了！恭喜你！但很抱歉告訴您，我不能給您 #b#t5220000##k 因為您的背包似乎已滿。稍後再試。"
    );
  }
  cm.dispose();
}

function isWinner(player, val) {
  return (
    (player & (7 << (val * 3))) == 7 << (val * 3) ||
    (player & (73 << val)) == 73 << val ||
    ((player & (1 << 4)) == 1 << 4 &&
      player & ((1 << 6) << (val * 2)) &&
      player & ((1 << 2) >> (val * 2)))
  );
}

function lose() {
  cm.sendNext(
    loadText(false) +
      "\r\n\r\n可惜您輕視了這台電腦。您應該再試一次，您可能只是累了。"
  );
  cm.dispose();
}

function computerMoves() {
  if (playerFlag == 0) {
    var rand = (Math.random() * 9) | 0;
    computerFlag |= 1 << ((rand + 1) & (1 == 1) ? rand : 4);
  } else {
    if (computerFlag == 0) {
      for (var i = 0; i < 4; i++) {
        if (playerFlag & (2 << i == 2 << i)) {
          computerFlag |= 1 << 4;
          return;
        }
      }
      var rand = (Math.random() * 9) | 0;
      if (playerFlag == 1 << 4) {
        computerFlag |= 1 << ((rand + 1) & (1 == 1) ? rand : 0);
      } else {
        if (
          (playerFlag & 1) << ((rand + 1) & (1 == 1) ? rand : 4) !=
          1 << ((rand + 1) & (1 == 1) ? rand : 4)
        ) {
          computerFlag |= 1 << ((rand + 1) & (1 == 1) ? rand : 4);
        } else {
          computerFlag |= 1 << 4;
        }
      }
    } else {
      for (var i = 0; i < 9; i++) {
        if (((computerFlag | playerFlag) & (1 << i)) != 0) {
          continue;
        }
        var nextMove = computerFlag | (1 << i);
        for (var x = 0; x < 3; x++) {
          if (isWinner(nextMove, x)) {
            computerFlag |= 1 << i;
            return;
          }
        }
        var playerPossibleMove = playerFlag | (1 << i);
        for (var x = 0; x < 3; x++) {
          if (isWinner(playerPossibleMove, x)) {
            computerFlag |= 1 << i;
            return;
          }
        }
      }
      for (var i = 0; i < 9; i++) {
        if (((computerFlag | playerFlag) & (1 << i)) != 0) {
          continue;
        }
        computerFlag |= 1 << i;
        break;
      }
    }
  }
}

function loadText(sendSimple) {
  var text = (sendSimple ? "選擇你的位置." : "比賽結果.") + "\r\n\r\n";
  for (var i = 0; i < 9; i++) {
    text +=
      ((playerFlag & (1 << i)) == 1 << i
        ? "#i" + playerColor + "#"
        : (computerFlag & (1 << i)) == 1 << i
        ? "#i" + computerColor + "#"
        : (sendSimple ? "#L" + i + "#" : "") + "___") +
      "\t\t" +
      ((i + 1) % 3 == 0 ? "\r\n" : "");
  }
  return text;
}

function tie() {
  cm.sendNext(
    loadText(false) + "\r\n\r\n哦，看起來您與電腦平手了。你需要更加努力。"
  );
  cm.dispose();
}
