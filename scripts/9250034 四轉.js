/* 
	四轉
*/

var status = 0;
var job;
function start() {
  status = -1;
  action(1, 0, 0);
}
function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
      if (cm.getPlayer().getLevel() < 120) {
        cm.sendNext("對不起，你還不夠120級進行第四次轉職，請到120級再來吧！");
        cm.dispose();
        status = 98;
      } else if (cm.getPlayer().getLevel() >= 120) {
        cm.sendNext("我是#r轉職職官#k，你需要我幫助你轉職嗎？");
      }
    } else if (status == 1) {
      if (cm.getPlayer().getJob() == 411 || cm.getPlayer().getJob() == 421) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業:#b\r\n#L0#暗殺者#l\r\n#L1#神偷#l#k"
        );
      }
      if (
        cm.getPlayer().getJob() == 111 ||
        cm.getPlayer().getJob() == 121 ||
        cm.getPlayer().getJob() == 131
      ) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業:#b\r\n#L2#英雄#l\r\n#L3#聖騎士#l\r\n#L4#黑騎士#l#k"
        );
      }
      if (
        cm.getPlayer().getJob() == 231 ||
        cm.getPlayer().getJob() == 211 ||
        cm.getPlayer().getJob() == 221
      ) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業:#b\r\n#L5#大魔導士(冰雷)#l\r\n#L6#大魔導士(火毒)#l\r\n#L7#主教#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 311 || cm.getPlayer().getJob() == 321) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業: #b\r\n#L8#箭神#l#k\r\n#L9#神射手#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 511 || cm.getPlayer().getJob() == 521) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業: #b\r\n#L10#拳霸#l\r\n#L11#槍神#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 2111) {
        cm.sendSimple(
          "你已經符合條件，可以進行第四次轉職，請選擇你的職業: #b\r\n#L12#狂狼勇士(4轉)#l#k"
        );
      }
      if (
        cm.getPlayer().getJob() == 2112 ||
        cm.getPlayer().getJob() == 412 ||
        cm.getPlayer().getJob() == 422 ||
        cm.getPlayer().getJob() == 112 ||
        cm.getPlayer().getJob() == 122 ||
        cm.getPlayer().getJob() == 132 ||
        cm.getPlayer().getJob() == 232 ||
        cm.getPlayer().getJob() == 222 ||
        cm.getPlayer().getJob() == 322 ||
        cm.getPlayer().getJob() == 512 ||
        cm.getPlayer().getJob() == 312 ||
        cm.getPlayer().getJob() == 522 ||
        cm.getPlayer().getJob() == 212
      ) {
        cm.sendNext("你貌似已經四轉了哦！");
        cm.dispose();
      }
    } else if (status == 2) {
      var jobName;
      if (selection == 0) {
        if (cm.getPlayer().getJob() == 411) {
          jobName = "夜使者";
          job = 412;
        } else {
          cm.sendOk("你貌似不能轉夜使者哦！");
          cm.dispose();
        }
      }
      if (selection == 1) {
        if (cm.getPlayer().getJob() == 421) {
          jobName = "暗影神偷";
          job = 422;
        } else {
          cm.sendOk("你貌似不能轉暗影神偷哦！");
          cm.dispose();
        }
      }
      if (selection == 2) {
        if (cm.getPlayer().getJob() == 111) {
          jobName = "英雄";
          job = 112;
        } else {
          cm.sendOk("你貌似不能轉英雄哦！");
          cm.dispose();
        }
      }
      if (selection == 3) {
        if (cm.getPlayer().getJob() == 121) {
          jobName = "聖騎士";
          job = 122;
        } else {
          cm.sendOk("你貌似不能轉聖騎士哦！");
          cm.dispose();
        }
      }
      if (selection == 4) {
        if (cm.getPlayer().getJob() == 131) {
          jobName = "黑騎士";
          job = 132;
        } else {
          cm.sendOk("你貌似不能轉黑騎士哦！");
          cm.dispose();
        }
      }
      if (selection == 5) {
        if (cm.getPlayer().getJob() == 221) {
          jobName = "大魔導士(冰雷)";
          job = 222;
        } else {
          cm.sendOk("你貌似不能轉大魔導士(冰雷)哦！");
          cm.dispose();
        }
      }
      if (selection == 6) {
        if (cm.getPlayer().getJob() == 211) {
          jobName = "大魔導士(火毒)";
          job = 212;
        } else {
          cm.sendOk("你貌似不能轉大魔導士(火毒)哦！");
          cm.dispose();
        }
      }
      if (selection == 7) {
        if (cm.getPlayer().getJob() == 231) {
          jobName = "主教";
          job = 232;
        } else {
          cm.sendOk("你貌似不能轉主教哦！");
          cm.dispose();
        }
      }
      if (selection == 8) {
        if (cm.getPlayer().getJob() == 311) {
          jobName = "箭神";
          job = 312;
        } else {
          cm.sendOk("你貌似不能轉箭神哦！");
          cm.dispose();
        }
      }
      if (selection == 9) {
        if (cm.getPlayer().getJob() == 321) {
          jobName = "神射手";
          job = 322;
        } else {
          cm.sendOk("你貌似不能轉神射手哦！");
          cm.dispose();
        }
      }
      if (selection == 10) {
        if (cm.getPlayer().getJob() == 511) {
          jobName = "拳霸";
          job = 512;
        } else {
          cm.sendOk("你貌似不能轉拳霸哦！");
          cm.dispose();
        }
      }
      if (selection == 11) {
        if (cm.getPlayer().getJob() == 521) {
          jobName = "槍神";
          job = 522;
        } else {
          cm.sendOk("你貌似不能轉槍神哦！");
          cm.dispose();
        }
      }
      if (selection == 12) {
        if (cm.getPlayer().getJob() == 2111) {
          jobName = "狂狼勇士(4轉)";
          job = 2112;
        } else {
          cm.sendOk("你貌似不能轉狂狼勇士(4轉)哦！");
          cm.dispose();
        }
      }
      cm.sendYesNo("你真的決定要成為一名#r" + jobName + "#k嗎?");
    } else if (status == 3) {
      cm.changeJob(job);
      cm.sendOk("轉職成功");
      cm.dispose();
    }
  }
}
