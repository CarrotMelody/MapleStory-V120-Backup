/* [NPC] 二轉
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
      if (cm.getPlayer().getLevel() < 30) {
        cm.sendNext("對不起,你還不夠30級進行第二次轉職,請到30級再來吧");
        cm.dispose();
        status = 98;
      } else if (
        cm.getPlayer().getLevel() >= 30 &&
        cm.getPlayer().getLevel() < 70
      ) {
        cm.sendNext("我是#r轉職職官#k,你需要我幫助你轉職嗎?");
      }
    } else if (status == 1) {
      if (cm.getPlayer().getJob() == 400) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L0#刺客#l\r\n#L1#俠盜#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 100) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L2#狂戰士#l\r\n#L3#見習騎士#l\r\n#L4#槍騎兵#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 200) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b\r\n#L5#法師(冰,雷)#l\r\n#L6#法師(火,毒)#l\r\n#L7#僧侶#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 300) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業: #b\r\n#L8#獵人#l#k\r\n#L9#弩手#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 500) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業: #b\r\n#L10#打手#l\r\n#L11#槍手#l#k"
        );
      }
      if (cm.getPlayer().getJob() == 2100) {
        cm.sendSimple(
          "你已經符合條件，可以進行第二次轉職，請選擇你的職業: #b\r\n#L12#狂狼勇士(2轉)#l#k"
        );
      }
    } else if (status == 2) {
      var jobName;
      if (selection == 0) {
        jobName = "刺客";
        job = 410;
      }
      if (selection == 1) {
        jobName = "俠盜";
        job = 420;
      }
      if (selection == 2) {
        jobName = "狂戰士";
        job = 110;
      }
      if (selection == 3) {
        jobName = "見習騎士";
        job = 120;
      }
      if (selection == 4) {
        jobName = "槍騎兵";
        job = 130;
      }
      if (selection == 5) {
        jobName = "法師(冰,雷)";
        job = 220;
      }
      if (selection == 6) {
        jobName = "法師(火,毒)";
        job = 210;
      }
      if (selection == 7) {
        jobName = "僧侶";
        job = 230;
      }
      if (selection == 8) {
        jobName = "獵人";
        job = 310;
      }
      if (selection == 9) {
        jobName = "弩手";
        job = 320;
      }
      if (selection == 10) {
        jobName = "打手";
        job = 510;
      }
      if (selection == 11) {
        jobName = "槍手";
        job = 520;
      }
      if (selection == 12) {
        jobName = "狂狼勇士(2轉)";
        job = 2110;
      }
      cm.sendYesNo("你真的決定要成為一名#r" + jobName + "#k嗎?");
    } else if (status == 3) {
      cm.changeJob(job);
      cm.sendOk("轉職成功");
    }
  }
}
