/** 
 * 四轉轉職 NPC
 * 2022/06/24
 * 普通腳本, 待簡化
 */

var status = 0;
var selectedJob, selectedJobName;

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
    if (level < 120) {
      cm.sendNext("對不起，你還不夠120級進行第四次轉職，請到120級再來吧！");
      cm.dispose();
    } else if (level >= 120) {
      cm.sendNext("我是#r轉職職官#k，你需要我幫助你轉職嗎？");
    }
  } else if (status == 1) {
    var msg = "你已經符合條件，可以進行第三次轉職，請選擇你的職業:#b";

    if (job > 400 && job < 500) {
      cm.sendSimple(msg + "\r\n#L0#暗殺者#l\r\n#L1#神偷#l#k");
    } else if (job > 100 && job < 200) {
      cm.sendSimple(msg + "\r\n#L2#英雄#l\r\n#L3#聖騎士#l\r\n#L4#黑騎士#l#k");
    } else if (job > 200 && job < 300) {
      cm.sendSimple(msg +  "\r\n#L5#大魔導士(冰雷)#l\r\n#L6#大魔導士(火毒)#l\r\n#L7#主教#l#k");
    } else if (job > 300 && job < 400) {
      cm.sendSimple(msg + "\r\n#L8#箭神#l#k\r\n#L9#神射手#l#k");
    } else if (job > 500 && job < 600) {
      cm.sendSimple(job + "#b\r\n#L10#拳霸#l\r\n#L11#槍神#l#k");
    } else if (job == 2111) {
      cm.sendSimple(msg + "\r\n#L12#狂狼勇士(4轉)#l#k");
    } else if (job == 2210) {
      cm.sendSimple(msg + "\r\n#L13#龍魔導士(4轉)#l#k");
    } else if (job == 1111) {
      cm.sendSimple(msg + "\r\n#L14#聖魂劍士(4轉)#l#k");
    } else if (job == 1210) {
      cm.sendSimple(msg + "\r\n#L15#烈焰巫師(4轉)#l#k");
    } else if (job == 1310) {
      cm.sendSimple(msg + "\r\n#L16#破風使者(4轉)#l#k");
    } else if (job == 1410) {
      cm.sendSimple(msg + "\r\n#L17#暗夜行者(4轉)#l#k");
    } else if (job == 1510) {
      cm.sendSimple(msg + "\r\n#L18#閃雷悍將(4轉)#l#k");
    } else {
      cm.sendNext("你貌似已經四轉或不符合四轉條件哦！");
      cm.dispose();
    }
  } else if (status == 2) {
    if (selection == 0) {
      if (job == 411) {
        selectedJobName = "夜使者";
        selectedJob = 412;
      } else {
        cm.sendOk("你貌似不能轉夜使者哦！");
        cm.dispose();
      }
    }
    if (selection == 1) {
      if (job == 421) {
        selectedJobName = "暗影神偷";
        selectedJob = 422;
      } else {
        cm.sendOk("你貌似不能轉暗影神偷哦！");
        cm.dispose();
      }
    }
    if (selection == 2) {
      if (job == 111) {
        selectedJobName = "英雄";
        selectedJob = 112;
      } else {
        cm.sendOk("你貌似不能轉英雄哦！");
        cm.dispose();
      }
    }
    if (selection == 3) {
      if (job == 121) {
        selectedJobName = "聖騎士";
        selectedJob = 122;
      } else {
        cm.sendOk("你貌似不能轉聖騎士哦！");
        cm.dispose();
      }
    }
    if (selection == 4) {
      if (job == 131) {
        selectedJobName = "黑騎士";
        selectedJob = 132;
      } else {
        cm.sendOk("你貌似不能轉黑騎士哦！");
        cm.dispose();
      }
    }
    if (selection == 5) {
      if (job == 221) {
        selectedJobName = "大魔導士(冰雷)";
        selectedJob = 222;
      } else {
        cm.sendOk("你貌似不能轉大魔導士(冰雷)哦！");
        cm.dispose();
      }
    }
    if (selection == 6) {
      if (job == 211) {
        selectedJobName = "大魔導士(火毒)";
        selectedJob = 212;
      } else {
        cm.sendOk("你貌似不能轉大魔導士(火毒)哦！");
        cm.dispose();
      }
    }
    if (selection == 7) {
      if (job == 231) {
        selectedJobName = "主教";
        selectedJob = 232;
      } else {
        cm.sendOk("你貌似不能轉主教哦！");
        cm.dispose();
      }
    }
    if (selection == 8) {
      if (job == 311) {
        selectedJobName = "箭神";
        selectedJob = 312;
      } else {
        cm.sendOk("你貌似不能轉箭神哦！");
        cm.dispose();
      }
    }
    if (selection == 9) {
      if (job == 321) {
        selectedJobName = "神射手";
        selectedJob = 322;
      } else {
        cm.sendOk("你貌似不能轉神射手哦！");
        cm.dispose();
      }
    }
    if (selection == 10) {
      if (job == 511) {
        selectedJobName = "拳霸";
        selectedJob = 512;
      } else {
        cm.sendOk("你貌似不能轉拳霸哦！");
        cm.dispose();
      }
    }
    if (selection == 11) {
      if (job == 521) {
        selectedJobName = "槍神";
        selectedJob = 522;
      } else {
        cm.sendOk("你貌似不能轉槍神哦！");
        cm.dispose();
      }
    }
    if (selection == 12) {
      if (job == 2111) {
        selectedJobName = "狂狼勇士(4轉)";
        selectedJob = 2112;
      } else {
        cm.sendOk("你貌似不能轉狂狼勇士(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 13) {
      if (job == 2210) {
        selectedJobName = "龍魔導士(4轉)";
        selectedJob = 2211;
      } else {
        cm.sendOk("你貌似不能轉狂狼勇士(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 14) {
      if (job == 1111) {
        selectedJobName = "聖魂劍士(4轉)";
        selectedJob = 1112;
      } else {
        cm.sendOk("你貌似不能轉聖魂劍士(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 15) {
      if (job == 1211) {
        selectedJobName = "烈焰巫師(4轉)";
        selectedJob = 1212;
      } else {
        cm.sendOk("你貌似不能轉烈焰巫師(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 16) {
      if (job == 1311) {
        selectedJobName = "破風使者(4轉)";
        selectedJob = 1312;
      } else {
        cm.sendOk("你貌似不能轉破風使者(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 17) {
      if (job == 1411) {
        selectedJobName = "暗夜行者(4轉)";
        selectedJob = 1412;
      } else {
        cm.sendOk("你貌似不能轉暗夜行者(4轉)哦！");
        cm.dispose();
      }
    }
    if (selection == 18) {
      if (job == 1511) {
        selectedJobName = "閃雷悍將(4轉)";
        selectedJob = 1512;
      } else {
        cm.sendOk("你貌似不能轉閃雷悍將(4轉)哦！");
        cm.dispose();
      }
    }
    cm.sendYesNo("你真的決定要成為一名#r" + selectedJobName + "#k嗎？");
  } else if (status == 3) {
    cm.changeJob(selectedJob);
    cm.sendOk("轉職成功");
    cm.dispose();
  }
}
