/* [NPC] 三轉
Job Advancer
Made by Tryst (wasdwasd) of Odinms Forums.
Please don't release this anywhere else.
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
      if (cm.getPlayer().getLevel() < 70) {
        cm.sendNext("對不起，你還不夠70級進行第三次轉職，請到70級再來吧！");
        cm.dispose();
        status = 98;
      } else if (
        cm.getPlayer().getJob() != 2110 ||
        cm.getPlayer().getJob() != 410 ||
        cm.getPlayer().getJob() != 420 ||
        cm.getPlayer().getJob() != 110 ||
        cm.getPlayer().getJob() != 120 ||
        cm.getPlayer().getJob() != 130 ||
        cm.getPlayer().getJob() != 230 ||
        cm.getPlayer().getJob() != 220 ||
        cm.getPlayer().getJob() != 320 ||
        cm.getPlayer().getJob() != 510 ||
        cm.getPlayer().getJob() != 310 ||
        cm.getPlayer().getJob() != 520 ||
        cm.getPlayer().getJob() != 210
      ) {
        cm.sendNext("你不符合三轉需求！");
        cm.dispose();
      } else if (
        cm.getPlayer().getLevel() >= 70 &&
        cm.getPlayer().getLevel() < 120
      ) {
        cm.sendNext("我是#r轉職職官#k，你需要我幫助你轉職嗎？");
      }
    } else if (status == 1) {
      if (cm.getPlayer().getJob() == 410 || cm.getPlayer().getJob() == 420) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業:#b\r\n#L0#暗殺者#l\r\n#L1#神偷#l#k"
        );
      }
      if (
        cm.getPlayer().getJob() == 110 ||
        cm.getPlayer().getJob() == 120 ||
        cm.getPlayer().getJob() == 130
      ) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業:#b\r\n#L2#十字軍#l\r\n#L3#騎士#l\r\n#L4#嗜血狂騎#l#k"
        );
      }
      if (
        cm.getPlayer().getJob() == 230 ||
        cm.getPlayer().getJob() == 210 ||
        cm.getPlayer().getJob() == 220
      ) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業:#b\r\n#L5#魔導士之路(冰雷)#l\r\n#L6#魔導士之路(火毒)#l\r\n#L7#祭司#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 310 || cm.getPlayer().getJob() == 320) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業: #b\r\n#L8#遊俠#l#k\r\n#L9#狙擊手#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 510 || cm.getPlayer().getJob() == 520) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業: #b\r\n#L10#格鬥家#l\r\n#L11#神槍手#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 2110) {
        cm.sendSimple(
          "你已經符合條件，可以進行第三次轉職，請選擇你的職業: #b\r\n#L12#狂狼勇士(3轉)#l#k"
        );
      }
    } else if (status == 2) {
      var jobName;
      if (selection == 0) {
        if (cm.getPlayer().getJob() == 410) {
          jobName = "暗殺者";
          job = 411;
        } else {
          cm.sendOk("你貌似不能轉暗殺者哦！");
          cm.dispose();
        }
      }
      if (selection == 1) {
        if (cm.getPlayer().getJob() == 420) {
          jobName = "神偷";
          job = 421;
        } else {
          cm.sendOk("你貌似不能轉神偷哦！");
          cm.dispose();
        }
      }
      if (selection == 2) {
        if (cm.getPlayer().getJob() == 110) {
          jobName = "十字軍";
          job = 111;
        } else {
          cm.sendOk("你貌似不能轉十字軍哦！");
          cm.dispose();
        }
      }
      if (selection == 3) {
        if (cm.getPlayer().getJob() == 120) {
          jobName = "騎士";
          job = 121;
        } else {
          cm.sendOk("你貌似不能轉騎士哦！");
          cm.dispose();
        }
      }
      if (selection == 4) {
        if (cm.getPlayer().getJob() == 130) {
          jobName = "嗜血狂騎";
          job = 131;
        } else {
          cm.sendOk("你貌似不能轉嗜血狂騎哦！");
          cm.dispose();
        }
      }
      if (selection == 5) {
        if (cm.getPlayer().getJob() == 220) {
          jobName = "魔導士之路(冰雷)";
          job = 221;
        } else {
          cm.sendOk("你貌似不能轉魔導士之路(冰雷)哦！");
          cm.dispose();
        }
      }
      if (selection == 6) {
        if (cm.getPlayer().getJob() == 210) {
          jobName = "魔導士之路(火毒)";
          job = 211;
        } else {
          cm.sendOk("你貌似不能轉魔導士之路(火毒)哦！");
          cm.dispose();
        }
      }
      if (selection == 7) {
        if (cm.getPlayer().getJob() == 230) {
          jobName = "祭司";
          job = 231;
        } else {
          cm.sendOk("你貌似不能轉祭司哦！");
          cm.dispose();
        }
      }
      if (selection == 8) {
        if (cm.getPlayer().getJob() == 310) {
          jobName = "遊俠";
          job = 311;
        } else {
          cm.sendOk("你貌似不能轉遊俠哦！");
          cm.dispose();
        }
      }
      if (selection == 9) {
        if (cm.getPlayer().getJob() == 320) {
          jobName = "狙擊手";
          job = 321;
        } else {
          cm.sendOk("你貌似不能轉狙擊手哦！");
          cm.dispose();
        }
      }
      if (selection == 10) {
        if (cm.getPlayer().getJob() == 510) {
          jobName = "格鬥家";
          job = 511;
        } else {
          cm.sendOk("你貌似不能轉格鬥家哦！");
          cm.dispose();
        }
      }
      if (selection == 11) {
        if (cm.getPlayer().getJob() == 520) {
          jobName = "神槍手";
          job = 521;
        } else {
          cm.sendOk("你貌似不能轉神槍手哦！");
          cm.dispose();
        }
      }
      if (selection == 12) {
        if (cm.getPlayer().getJob() == 2110) {
          jobName = "狂狼勇士(3轉)";
          job = 2111;
        } else {
          cm.sendOk("你貌似不能轉狂狼勇士(3轉)哦！");
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
