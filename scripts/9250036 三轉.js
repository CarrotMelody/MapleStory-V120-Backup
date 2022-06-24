/** 
 * 三轉轉職 NPC
 * 2022/06/24
 * 普通腳本, 待簡化
 */

var status = 0;
var selectedJob, selectedJobName;
// 可以轉職的職業
var canChange = [110, 120, 130, 210, 220, 230, 310, 320, 410, 420, 510, 520, 2110, 2210, 1110, 1210, 1310, 1410, 1510];

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  var job = cm.getPlayer().getJob();
  var level = cm.getPlayer().getLevel();

  if (mode == 1) {
    status++;
  } else {
    status--;
  }

  if (status == -1) {
    cm.dispose();
  }

  if (status == 0) {
    if (level < 70) {
      cm.sendNext("對不起，你還不夠70級進行第三次轉職，請到70級再來吧！");
      cm.dispose();
      status = 98;
    } else if (canChange.indexOf(job) === -1) {
      cm.sendNext("你不符合三轉需求！");
      cm.dispose();
    } else if (level >= 70) {
      cm.sendNext("我是#r轉職職官#k，你需要我幫助你轉職嗎？");
    }
  } else if (status == 1) {
    var msg = "你已經符合條件，可以進行第三次轉職，請選擇你的職業:#b";
    if (job > 400 && job < 500) {
      cm.sendSimple(msg + "\r\n#L0#暗殺者#l\r\n#L1#神偷#l#k");
    }
    if (job > 100 && job < 200) {
      cm.sendSimple(msg + "\r\n#L2#十字軍#l\r\n#L3#騎士#l\r\n#L4#嗜血狂騎#l#k");
    }
    if (job > 200 && job < 300) {
      cm.sendSimple(msg + "\r\n#L5#魔導士之路(冰雷)#l\r\n#L6#魔導士之路(火毒)#l\r\n#L7#祭司#l#k");
    }
    if (job > 300 && job < 400) {
      cm.sendSimple(msg + "\r\n#L8#遊俠#l#k\r\n#L9#狙擊手#l#k");
    }
    if (job > 500 && job < 600) {
      cm.sendSimple(msg + "\r\n#L10#格鬥家#l\r\n#L11#神槍手#l#k");
    }
    if (job == 2110) {
      cm.sendSimple(msg + "\r\n#L12#狂狼勇士(3轉)#l#k");
    }
    if (job == 2210) {
      cm.sendSimple(msg + "\r\n#L13#龍魔導士(3轉)#l#k");
    }
    if (job == 1100) {
      cm.sendSimple(msg + "\r\n#L14#聖魂劍士(3轉)#l#k");
    }
    if (job == 1200) {
      cm.sendSimple(msg + "\r\n#L15#烈焰巫師(3轉)#l#k");
    }
    if (job == 1300) {
      cm.sendSimple(msg + "\r\n#L16#破風使者(3轉)#l#k");
    }
    if (job == 1400) {
      cm.sendSimple(msg + "\r\n#L17#暗夜行者(3轉)#l#k");
    }
    if (job == 1500) {
      cm.sendSimple(msg + "\r\n#L18#閃雷悍將(3轉)#l#k");
    }
  } else if (status == 2) {
    if (selection == 0) {
      if (job == 410) {
        selectedJobName = "暗殺者";
        selectedJob = 411;
      } else {
        cm.sendOk("你貌似不能轉暗殺者哦！");
        cm.dispose();
      }
    }
    if (selection == 1) {
      if (job == 420) {
        selectedJobName = "神偷";
        selectedJob = 421;
      } else {
        cm.sendOk("你貌似不能轉神偷哦！");
        cm.dispose();
      }
    }
    if (selection == 2) {
      if (job == 110) {
        selectedJobName = "十字軍";
        selectedJob = 111;
      } else {
        cm.sendOk("你貌似不能轉十字軍哦！");
        cm.dispose();
      }
    }
    if (selection == 3) {
      if (job == 120) {
        selectedJobName = "騎士";
        selectedJob = 121;
      } else {
        cm.sendOk("你貌似不能轉騎士哦！");
        cm.dispose();
      }
    }
    if (selection == 4) {
      if (job == 130) {
        selectedJobName = "嗜血狂騎";
        selectedJob = 131;
      } else {
        cm.sendOk("你貌似不能轉嗜血狂騎哦！");
        cm.dispose();
      }
    }
    if (selection == 5) {
      if (job == 220) {
        selectedJobName = "魔導士之路(冰雷)";
        selectedJob = 221;
      } else {
        cm.sendOk("你貌似不能轉魔導士之路(冰雷)哦！");
        cm.dispose();
      }
    }
    if (selection == 6) {
      if (job == 210) {
        selectedJobName = "魔導士之路(火毒)";
        selectedJob = 211;
      } else {
        cm.sendOk("你貌似不能轉魔導士之路(火毒)哦！");
        cm.dispose();
      }
    }
    if (selection == 7) {
      if (job == 230) {
        selectedJobName = "祭司";
        selectedJob = 231;
      } else {
        cm.sendOk("你貌似不能轉祭司哦！");
        cm.dispose();
      }
    }
    if (selection == 8) {
      if (job == 310) {
        selectedJobName = "遊俠";
        selectedJob = 311;
      } else {
        cm.sendOk("你貌似不能轉遊俠哦！");
        cm.dispose();
      }
    }
    if (selection == 9) {
      if (job == 320) {
        selectedJobName = "狙擊手";
        selectedJob = 321;
      } else {
        cm.sendOk("你貌似不能轉狙擊手哦！");
        cm.dispose();
      }
    }
    if (selection == 10) {
      if (job == 510) {
        selectedJobName = "格鬥家";
        selectedJob = 511;
      } else {
        cm.sendOk("你貌似不能轉格鬥家哦！");
        cm.dispose();
      }
    }
    if (selection == 11) {
      if (job == 520) {
        selectedJobName = "神槍手";
        selectedJob = 521;
      } else {
        cm.sendOk("你貌似不能轉神槍手哦！");
        cm.dispose();
      }
    }
    if (selection == 12) {
      if (job == 2110) {
        selectedJobName = "狂狼勇士(3轉)";
        selectedJob = 2111;
      } else {
        cm.sendOk("你貌似不能轉狂狼勇士(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 13) {
      if (job == 2200) {
        selectedJobName = "龍魔導士(3轉)";
        selectedJob = 2210;
      } else {
        cm.sendOk("你貌似不能轉龍魔導士(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 14) {
      if (job == 1110) {
        selectedJobName = "聖魂劍士(3轉)";
        selectedJob = 1111;
      } else {
        cm.sendOk("你貌似不能轉聖魂劍士(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 15) {
      if (job == 2110) {
        selectedJobName = "狂狼勇士(3轉)";
        selectedJob = 2111;
      } else {
        cm.sendOk("你貌似不能轉狂狼勇士(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 16) {
      if (job == 1210) {
        selectedJobName = "烈焰巫師(3轉)";
        selectedJob = 1211;
      } else {
        cm.sendOk("你貌似不能轉烈焰巫師(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 17) {
      if (job == 1310) {
        selectedJobName = "破風使者(3轉)";
        selectedJob = 1311;
      } else {
        cm.sendOk("你貌似不能轉破風使者(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 1410) {
      if (job == 1411) {
        selectedJobName = "暗夜行者(3轉)";
        selectedJob = 1211;
      } else {
        cm.sendOk("你貌似不能轉暗夜行者(3轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 19) {
      if (job == 1510) {
        selectedJobName = "閃雷悍將(3轉)";
        selectedJob = 1511;
      } else {
        cm.sendOk("你貌似不能轉閃雷悍將(3轉)哦！");
        cm.dispose();
      }
    }
    cm.sendYesNo("你真的決定要成為一名#r" + selectedJobName + "#k嗎?");
  } else if (status == 3) {
    cm.changeJob(selectedJob);
    cm.sendOk("轉職成功");
    cm.dispose();
  }
}
