/**
 * 占卜 + 變性 NPC
 * 2022/06/30
 */
var normal = Array(2022216, 2022222, 2022223);
var common = Array(2022221, 2022220, 2022218);
var rare = Array(2022217, 2022219);

function getRandom(min, max) {
  if (min > max) {
    return -1;
  }
  if (min == max) {
    return min;
  }
  return min + parseInt(Math.random() * (max - min + 1));
}

var icommon = common[getRandom(0, common.length - 1)];
var inormal = normal[getRandom(0, normal.length - 1)];
var irare = rare[getRandom(0, rare.length - 1)];
var chance = getRandom(0, 20);
var status = 0;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 0) {
      cm.dispose();
      return;
    }

    if (mode == 1) {
			status++;
		} else {
			status--;
		}

    if (status == 0) {
      cm.sendYesNo("我掐指一算，你今天是來：\r\n #L0##r想算算今日運勢，占卜一下。#k#l \r\n #L1##d我要變性#k！#l");
    } else if (status == 1) {
      sel = selection;
      switch (sel) {
				// 占卜
        case 0:
          if (cm.haveItem(5310000)) {
            cm.sendYesNo("占卜一次需要給我一個#k#v" + 5310000 + "##t" + 5310000 + "#！\r\n#L2##b我確定要占卜#l");
          } else {
            cm.sendOk("您身上似乎沒有#k#v" + 5310000 + "##t" + 5310000 + "#！");
            cm.dispose();
          }
          break;
				// 變性
        case 1:
          cm.sendYesNo("變性一次需要給我#b 1000 GASH #k的手術費才行...您目前身上還剩下#b " + cm.getPlayer().getCSPoints(1) + " GASH #k準備好要變性了嗎？\r\n #L3# #r準備好了！#k#l");
          break;
      }
    } else if (status == 2) {
      sel = selection;
      switch (sel) {
				// 繼續占卜
        case 2:
					// 2000000: 紅色藥水, 因為跟御守同為消耗類所以拿它來判斷消耗欄是否足夠
					// 5310000: 占卜所需要的幸運御守
          if (cm.haveItem(5310000) && cm.canHold(2000000)) {
            if (chance > 0 && chance <= 14) {
              cm.sendOk("你的今日運勢普通:#d★★☆☆☆#k，送你一個#k#v" + icommon + "##b#t" + icommon + "##k吧！");
              cm.gainItem(icommon, 1);
            } else if (chance > 14 && chance <= 18) {
              cm.sendOk("你的今日運勢不錯:#b★★★☆☆#k，送你一個#k#v" + inormal + "##b#t" + inormal + "##k吧！");
              cm.gainItem(inormal, 1);
            } else {
              cm.sendOk("你的今日運勢非常好:#r★★★★★#k，送你一個#k#v" + irare + "##b#t" + irare + "##k，祝福你每天的運勢都如同今天一樣！");
              cm.gainItem(irare, 1);
            }
            cm.gainItem(5310000, -1);
          } else {
            cm.sendOk("請確認你的身上是否有#v" + 5310000 + "##t" + 5310000 + "#或者背包空間不足。");
          }
					cm.dispose();
          break;
				// 繼續變性
        case 3:
          if (cm.getPlayer().getCSPoints(1) > 1000) {
						// 獲取角色性別
            var gender = cm.getPlayer().getGender();
						// gender 0: 男, 1: 女
            if (gender == 0) {
              cm.getPlayer().setGender(1);
            } else {
              cm.getPlayer().setGender(0);
            }
            cm.getPlayer().modifyCSPoints(1, -1000, true);
            cm.sendOk("變性成功！");
          } else {
            cm.sendOk("您身上的 GASH 不足#r 1000 #k！");
          }
          cm.dispose();
          break;
      }
    }
  }
}
