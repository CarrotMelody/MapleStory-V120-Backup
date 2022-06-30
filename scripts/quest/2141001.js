/*
	NPC Name: 		The Forgotten Temple Manager
	Map(s): 		Deep in the Shrine - Forgotten Twilight
	Description: 		Pink Bean battle starter
*/
var status = -1;

function start() {
  if (cm.getPlayer().getLevel() < 120) {
    cm.sendOk("挑戰皮卡啾的等級要求為至少120級以上。");
    cm.dispose();
    return;
  }
  if (cm.getPlayer().getClient().getChannel() != 5) {
    cm.sendOk("皮卡啾只能在頻道 5 挑戰。");
    cm.dispose();
    return;
  }
  var em = cm.getEventManager("PinkBeanBattle");

  if (em == null) {
    cm.sendOk("此伺服器尚未開放挑戰皮卡啾，請聯繫GM。");
    cm.dispose();
    return;
  }
  var eim_status = em.getProperty("state");
  if (eim_status == null || eim_status.equals("0")) {
    var squadAvailability = cm.getSquadAvailability("PinkBean");
    if (squadAvailability == -1) {
      status = 0;
      cm.sendYesNo(
        "你有興趣成為遠征隊的隊長嗎？"
      );
    } else if (squadAvailability == 1) {
      // -1 = Cancelled, 0 = not, 1 = true
      var type = cm.isSquadLeader("PinkBean");
      if (type == -1) {
        cm.sendOk("遠征隊已解散，請重新組隊。");
        cm.dispose();
      } else if (type == 0) {
        var memberType = cm.isSquadMember("PinkBean");
        if (memberType == 2) {
          cm.sendOk("你被隊伍踢除了。");
          cm.dispose();
        } else if (memberType == 1) {
          status = 5;
          cm.sendSimple("你想做什麼？\r\n#b#L0#加入隊伍前往神祇的黃昏#l\r\n#b#L1#離開隊伍前往神祇的黃昏#l\r\n#b#L2#查看遠征隊成員#l");
        } else if (memberType == -1) {
          cm.sendOk("遠征隊已解散，請重新組隊。");
          cm.dispose();
        } else {
          status = 5;
          cm.sendSimple("你想做什麼？\r\n#b#L0#加入隊伍前往神祇的黃昏#l\r\n#b#L1#離開隊伍前往神祇的黃昏#l\r\n#b#L2#查看遠征隊成員#l");
        }
      } else {
        // 是遠征隊隊長
        status = 10;
        cm.sendSimple("你想做什麼，遠征隊隊長？\r\n#b#L0#查看遠征隊名單#l\r\n#b#L1#從遠征隊中踢出隊友#l\r\n#b#L2#從黑名單中移除用戶#l\r\n#r#L3#開始挑戰#l");
      }
    } else {
      var eim = cm.getDisconnected("PinkBeanBattle");
      if (eim == null) {
        cm.sendOk("裡面已經有人在挑戰 BOSS，請稍後再試。");
        cm.safeDispose();
      } else {
        cm.sendYesNo("啊，你回來了。你想重新進入和你的隊伍再次戰鬥嗎？");
        status = 2;
      }
    }
  } else {
    var eim = cm.getDisconnected("PinkBeanBattle");
    if (eim == null) {
      cm.sendOk("裡面已經有人在挑戰 BOSS，請稍後再試。");
      cm.safeDispose();
    } else {
      cm.sendYesNo("啊，你回來了。你想重新進入和你的隊伍再次戰鬥嗎？");
      status = 2;
    }
  }
}

function action(mode, type, selection) {
  switch (status) {
    case 0:
      if (mode == 1) {
        if (cm.registerSquad("PinkBean",5,"已被任命為遠征隊隊長。如果您想挑戰皮卡啾，請在規定時間內組建遠征隊。")) {
          cm.sendOk("你被任命為隊長，在接下來的 5 分鐘內，您可以添加遠征隊的成員。");
        } else {
          cm.sendOk("添加隊伍時發生錯誤。");
        }
      }
      cm.dispose();
      break;
    case 2:
      if (!cm.reAdd("PinkBeanBattle", "PinkBean")) {
        cm.sendOk("發生錯誤...請重試。");
      }
      cm.safeDispose();
      break;
    case 5:
      if (selection == 0) {
        // join
        var ba = cm.addMember("PinkBean", true);
        if (ba == 2) {
          cm.sendOk("遠征隊目前已滿，請稍後再試。");
        } else if (ba == 1) {
          cm.sendOk("您已成功加入遠征隊。");
        } else {
          cm.sendOk("你已經是遠征隊的一員了。");
        }
      } else if (selection == 1) {
        // withdraw
        var baa = cm.addMember("PinkBean", false);
        if (baa == 1) {
          cm.sendOk("您已成功退隊。");
        } else {
          cm.sendOk("你不是遠征隊的一員。");
        }
      } else if (selection == 2) {
        if (!cm.getSquadList("PinkBean", 0)) {
          cm.sendOk("由於未知錯誤，對遠征隊的請求已被拒絕。");
        }
      }
      cm.dispose();
      break;
    case 10:
      if (mode == 1) {
        if (selection == 0) {
          if (!cm.getSquadList("PinkBean", 0)) {
            cm.sendOk(
              "由於未知錯誤，對遠征隊的請求已被拒絕。"
            );
          }
          cm.dispose();
        } else if (selection == 1) {
          status = 11;
          if (!cm.getSquadList("PinkBean", 1)) {
            cm.sendOk(
              "由於未知錯誤，對遠征隊的請求已被拒絕。"
            );
            cm.dispose();
          }
        } else if (selection == 2) {
          status = 12;
          if (!cm.getSquadList("PinkBean", 2)) {
            cm.sendOk(
              "由於未知錯誤，對遠征隊的請求已被拒絕。"
            );
            cm.dispose();
          }
        } else if (selection == 3) {
          // get insode
          if (cm.getSquad("PinkBean") != null) {
            var dd = cm.getEventManager("PinkBeanBattle");
            dd.startInstance(cm.getSquad("PinkBean"), cm.getMap());
          } else {
            cm.sendOk(
              "由於未知錯誤，對遠征隊的請求已被拒絕。"
            );
          }
          cm.dispose();
        }
      } else {
        cm.dispose();
      }
      break;
    case 11:
      cm.banMember("PinkBean", selection);
      cm.dispose();
      break;
    case 12:
      if (selection != -1) {
        cm.acceptMember("PinkBean", selection);
      }
      cm.dispose();
      break;
  }
}
