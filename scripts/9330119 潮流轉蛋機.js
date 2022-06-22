/*
 * 轉蛋機 NPC
 * 2022/06/19 優化版
 */
var status = -1;
var req = [5220000, 1];

// 獎池
var itemList = [
  1002391, 1002392, 1002393, 1012169, 1002394, 1002395, 1112414, 1022097,
  1702256, 1702257, 1702258, 1702259, 1702260, 1102040, 1102041, 1102042,
  1102043, 1482073, 1492073, 1122075, 1122077, 1472111, 1302142, 1312056,
  1322084, 1332114, 1372071, 1382093, 1402085, 1412055, 1422057, 1012167,
  1432075, 1452100, 1442104, 1462085, 1122036, 1082243, 1082242, 1082241,
  1082240, 1082239, 1082244, 1082245, 1072275, 1072369, 1132000, 1132002,
  1132001, 1132003, 1132004, 1132012, 2041200, 1492023, 1332074, 1442063,
  1462050, 1452057, 1112915, 1002858, 1012168, 1002859, 1002860, 1002861,
  1472068, 1432047, 1422037, 1412033, 1122038, 1402046, 1302081, 1312037,
  1322060, 1332073, 1372044, 1382057, 1072355, 1072356, 1072357, 1112478,
  1112480, 1012164, 1012171, 1012172, 1092059, 1052159, 1082234, 1082235,
  1002571, 1002572, 1002573, 1072358, 1072359, 1092057, 1002777, 1002778,
  1002779, 1002780, 1122000, 1122017, 1332101, 2070019, 1122037, 2049100,
  1112446, 1112447, 1112448, 1112449, 1112450, 1112451, 1112452, 1112453,
  1112454, 1112455, 1112456, 1112457, 1112458, 1112459, 1112460, 1112461,
  1112462, 1112472, 1112473, 1112474, 1112475, 1112476, 1112477, 1092058,
  1052155, 1000039, 1050162, 1072434, 1082264, 1102235, 1442095, 1052156,
  1052157, 1052158, 1082237, 1082236, 1082238, 1002776, 1002574, 1012170,
  1102001, 1102002, 1102003, 1002934, 1052187, 1052188, 1052189, 1442104,
  1462085, 1001059, 1051201, 1012173, 1012174, 1122023, 1012157, 1492073,
  1482073, 1402085, 1122034, 1102004, 1102040, 1102041, 1002931, 1052190,
  1122035, 1002932, 1002933, 1372071, 1382093, 1312056, 1412055, 1322084,
  1422057, 1332114, 1472111, 1432075, 1452100, 1002585, 1002586, 1002587,
  1102042, 1102043, 1102079, 1102081, 1102082, 1102000,
];

// 特殊獎品, 會上綠廣的
var gachItem = [1122034, 1122035, 1122036, 1122037, 1122038, 1122000, 1012169, 
  1012170, 1012171, 1012172, 1012173, 1012174];

function start() {
  action(1, 0, 0);
}

var rewards = ""; // 獎品列表
var times = 0; // 消耗的轉蛋卷數
var haveSpace = true; // 還有沒有空間
var haveItem = true; // 還有沒有轉蛋卷
var stop; // result = -1;  => SRC : gainGachaponItem 方法裡面的 addbyId_Gachapon 如果有某個類別欄位已滿會回傳 -1

/* 重置 */
function init() {
  rewards = "";
  times = 0;
  haveSpace = true;
  haveItem = true;
}

/* 轉蛋 */
function draw() {
  var result;
  var random = Math.floor(Math.random() * itemList.length); // 產生亂數抽取獎池其中一個道具
  var item = itemList[random]; // 抽中的道具

  if (cm.getPlayer().itemQuantity(req[0]) - times < 1) {
    // 情況1: 剩餘轉蛋卷不足
    haveItem = false;
  } else if (!cm.getPlayer().haveSpaceForId(item)) {
    // 情況2: 剩餘空間不足
    haveSpace = false;
  } else {
    var special = gachItem.indexOf(item) !== -1;

    // 中了特殊獎
    if (special) {
      result = cm.gainGachaponItem(item, 1, true);
    } else if (!special) { // 一般獎
      result = cm.gainItem(item, 1);
    }

    if (result === -1) {
      stop = true;
    } else {
      rewards += "#i" + item + "#";
      times++;
    }
  }
}

/**
 * 結算
 * @param {*} type 0: 單抽 1: 十抽
 */
function finish(type) {
  if (times > 0) {
    var msg = type === 1 ? "\r\n#L996##b繼續十抽#l　#L997##b前往單抽#l" : "\r\n#L997##b繼續單抽#l　#L996##b前往十抽#l";
    cm.gainItem(req[0], -times);
    cm.sendNext("恭喜獲得\r\n" + rewards + msg + "\r\n#L998##r結束轉蛋#l　#L999##d返回上一頁#l");
  } else if (!haveSpace || stop) {
    cm.sendOk("不好意思，請確認您的背包是否有空位。");
  } else if (!haveItem) {
    cm.sendOk("不好意思，您身上的#b#t" + req[0] + "##i" + req[0] + "##k不足！");
  }
  init();
}

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else {
    cm.dispose();
    return;
  }

  if (status === 0) {
    /* 檢查身上是否有轉蛋卷 */
    if (cm.haveItem(req[0], req[1])) {
      var msg = "您身上有#b#t" + req[0] +"##i" + req[0] + "##k可以進行轉蛋。\r\n你確定要使用 #b#p" + cm.getNpc() + "##k 進行轉蛋嗎?\r\n #L0#我要單抽！ #l \r\n #L1#我要一次抽#r十個#k！#l \r\n #L2##b查看轉蛋機內容物！#l";
      cm.sendYesNo(msg);
    } else {
      cm.sendOk("不好意思！您沒有#b#t" + req[0] + "##i" + req[0] + "##k，無法進行轉蛋。");
      cm.dispose();
    }
  } else if (status === 1) {
    /* 根據選擇擇的選項做對應的事情 */
    switch (selection) {
      // 單抽
      case 0:
        if (!stop && haveSpace) {
          draw();
        }
        finish(0);
        break;
      // 十抽
      case 1:
        for (var counts = 0; counts < 10; counts++) {
          if (stop || !haveSpace) {
            break;
          }
          draw();
        }
        finish(1);
        break;
      // 確認獎池
      case 2:
        var msg = "";
        for (var i = 0; i < itemList.length; i++) {
          if (i % 8 == 0) {
            msg += "\r\n";
          }
          msg += "#i" + itemList[i] + "#";
        }
        cm.sendSimple("" + msg + "\r\n #L999##r退回上一頁#l");
        break;
    }
  } else if (status === 2) {
    switch (selection) {
      // 繼續十抽
      case 996:
        status = 0;
        action(1, 0, 1);
        break;
      // 繼續單抽
      case 997:
        status = 0;
        action(1, 0, 0);
        break;
      // 退出轉蛋
      case 998:
        cm.dispose();
        break;
      // 退回菜單重選
      case 999:
        status = -1;
        action(1, 0, 0);
        break;
      default:
        cm.dispose();
        break;
    }
  } else {
    cm.dispose();
  }
}
