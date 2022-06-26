/**
 * 音樂播放 NPC
 * 2022/06/26
 */
var status = 0;
var price = 5;
var category; // 選擇的類別
var music; // 選取的歌曲

// 歌曲列表
var musicWzList = Array("musicWzList/01", "musicWzList/02", "musicWzList/03", "musicWzList/04");
var musicList = Array("紅蓮華 - LiSA", "The Reason Why - TWICE", "What You Waiting For - TWICE", "PLANET - ラムジ");

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode < 1) {
    cm.dispose();
    return;
  } else if (mode == 1) {
    status++;
  } else {
    status--;
  }
  if (status == 0) {
    cm.sendSimple("嘿！玩遊戲玩膩了吧？聽點不同的歌曲如何？我們提供了各類最有名的歌曲供各位欣賞，只需付些少少的楓幣即可與所有人同樂\r\n#b" +
      "#L0#選取歌曲#l\r\n#b" +
      "#L1#聽聽歌曲系統說明#l");
  } if (status == 1) {
    if (selection == 0) {
      cm.sendSimple("你要播放哪種類型音樂呢？？\r\n\r\n#b" + "#L2#GM喜愛類#l#k\r\n#b");
    } else if (selection == 1) {
      cm.sendSimple("音樂系統蒐集了GM本人喜愛的歌曲，會不會合您口味就不知道啦。\r\n本地圖播放所需楓幣：#r" + price + "#k\r\n");
      cm.dispose();
    }
  } if (status == 2) {
    category = selection;

    if (category == 2) {
      switch (category) {
        case 2: 
          if (cm.getMeso() > 5) {
            var msg = "#b#e音樂機#k#n\r\n來聽點歌曲吧！\r\n";
            for (var i = 0; i < musicList.length; i++) {
              msg += "\r\n#L" + i + "# " + musicList[i] + "#l";
            }
            cm.sendSimple(msg);
          }
          break;
      }
    }
  } else if (status == 3) {
    if (category == 2) {
      music = selection;
      cm.sendYesNo("請問要聆聽#r " + musicList[music] + " #k?");
    } else {
      cm.sendOk("音源出現問題！");
      cm.dispose();
    }
  } else if (status == 4) {
    if (cm.getMeso() < price) {
      cm.sendOk("您沒有足夠的楓幣喔！");
      cm.dispose();
    } else if (category == 2) {
      cm.gainMeso(-price);
      cm.changeMusic(musicWzList[music]);
      cm.mapMessage("玩家" + cm.getChar().getName() + "為各位點播了【" + musicList[music] + "】 敬請欣賞！");
      cm.dispose();
    } else {
      cm.sendOk("不明錯誤，請向 GM 回報。");
      cm.dispose();
    }
  }
}