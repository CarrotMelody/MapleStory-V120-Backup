/**
 * 點裝領取 NPC
 * 2022/06/26 簡化
 */
var status = 0;
var id; // 欲領取的道具 id
var categories = [
  ["臉飾", 1010001, 1012672],
  ["眼飾", 1020000, 1022280],
  ["耳環", 1032051, 1033000],
  ["帽子", 1000000, 1005232],
  ["上衣", 1040001, 1049000],
  ["褲子", 1060000, 1062124],
  ["手套", 1080000, 1082691],
  ["套服", 1050040, 1053378],
  ["披風", 1102005, 1102945],
  ["戒指", 1112000, 1115158],
  ["盾牌", 1092031, 1092067],
  ["鞋子", 1070000, 1073240],
  ["武器", 1702000, 1702883],
];

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("改天再來領吧~");
      cm.dispose();
      return;
    }

    if (mode == 1) {
      status++;
    } else {
      status--;
    }

    if (status == 0) {
      var msg = "該系統可以讓您輸入代碼獲得點裝，請選擇分類後自行上網搜索喜愛的點裝代碼領取。#d";

      for (var i = 0; i < categories.length; i++) {
        if (i % 4 === 0) msg += "\r\n"; // 每四個分類換行一次
        msg += "#L" + i + "#" + categories[i][0] + "#l";
      }

      cm.sendSimple(msg);
    } else if (status == 1) {
      var category = categories[selection][0];
      var start = categories[selection][1];
      var end = categories[selection][2];

      cm.sendGetNumber("#h0#，你想領取什麼" + category + "呢？請輸入代碼吧！\r\n", start, start, end);
    } else if (status == 2) {
      id = selection;
      // 判斷是否為點數裝備
      if (cm.isCash(id)) {
        // 判斷是否為無法直接領取的道具
        if (id == 1112127) { // welcome back戒指
          cm.sendOk("#z" + id + "##i" + id + "#可不能用領取的哦！！！！");
          cm.dispose();
        } else {
          cm.sendYesNo("你確定要領取#i" + id + "##r#z" + id + "##k嗎？");
        }
      } else {
        cm.sendOk("你輸入的代碼不存在或者非點裝！");
        cm.dispose();
      }
    } else if (status == 3) {
      cm.gainItem(id, 1);
      cm.sendOk("已經將#z" + id + "##i" + id + "#送給您了，滿不滿意？\r\n#L99##r我想回去繼續領取#k#l");
    } else if (status == 4) {
      // 回去繼續領取
      if (selection === 99) {
        status = -1;
        action(1, 0, 0);
      }
    }
  }
}