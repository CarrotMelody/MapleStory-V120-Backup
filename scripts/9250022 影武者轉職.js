/*
 * Yai bua - Fortune Teller
 影武者轉職
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
      if (cm.getPlayer().getLevel() < 20) {
        cm.sendNext("對不起,你還不夠20級進行下忍轉職！");
        cm.dispose();
        status = 98;
      } else if (cm.getPlayer().getLevel() >= 20) {
        cm.sendNext("我是#r影武者轉職官#k，你需要我幫助你轉職嗎？");
      }
    } else if (status == 1) {
      if (
        cm.getPlayer().getJob() == 400 ||
        cm.getPlayer().getJob() == 430 ||
        cm.getPlayer().getJob() == 431 ||
        cm.getPlayer().getJob() == 432 ||
        cm.getPlayer().getJob() == 433 ||
        cm.getPlayer().getJob() == 434
      ) {
        cm.sendSimple(
          "你已經符合條件，可以進行轉職，請選擇你的職業:#b\r\n#L0#下忍#l\r\n#L1#中忍#l\r\n#L2#上忍#l\r\n#L3#隱忍#l\r\n#L4#影武者#l#k"
        );
      }
    } else if (status == 2) {
      var jobName;
      if (selection == 0) {
        if (cm.getPlayer().getJob() == 400) {
          jobName = "下忍";
          job = 430;
        } else {
          cm.sendOk("你貌似不能轉下忍哦！");
          cm.dispose();
        }
      }
      if (selection == 1) {
        if (cm.getPlayer().getJob() == 430 && cm.getPlayer().getLevel() >= 30) {
          jobName = "中忍";
          job = 431;
        } else {
          cm.sendOk("你貌似不能轉中忍哦！");
          cm.dispose();
        }
      }
      if (selection == 2) {
        if (cm.getPlayer().getJob() == 431 && cm.getPlayer().getLevel() >= 45) {
          jobName = "上忍";
          job = 432;
        } else {
          cm.sendOk("你貌似不能轉上忍哦！");
          cm.dispose();
        }
      }
      if (selection == 3) {
        if (cm.getPlayer().getJob() == 432 && cm.getPlayer().getLevel() >= 60) {
          jobName = "隱忍";
          job = 433;
        } else {
          cm.sendOk("你貌似不能轉隱忍哦！");
          cm.dispose();
        }
      }
      if (selection == 4) {
        if (
          cm.getPlayer().getJob() == 433 &&
          cm.getPlayer().getLevel() >= 100
        ) {
          jobName = "影武者";
          job = 434;
        } else {
          cm.sendOk("你貌似不能轉影武者哦！");
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
