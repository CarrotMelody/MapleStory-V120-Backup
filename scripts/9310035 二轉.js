/** 
 * 二轉轉職 NPC
 * 2022/06/24 簡化
 */

var status = 0;
var selectedJob, selectedJobName;
var jobList = {
  100: [{ name: "狂戰士", job: 110 }, { name: "見習騎士", job: 120 }, { name: "槍騎兵", job: 130 }], // 劍士
  200: [{ name: "法師(冰,雷)", job: 220 }, { name: "法師(火,毒)", job: 210 }, { name: "僧侶", job: 230 }], // 法師
  300: [{ name: "獵人", job: 310 }, { name: "弩手", job: 320 }], // 弓箭手
  400: [{ name: "刺客", job: 410 }, { name: "俠盜", job: 420 }], // 盜賊
  500: [{ name: "打手", job: 510 }, { name: "槍手", job: 520 }], // 海盜
  2100: [{ name: "狂狼勇士(2轉)", job: 2110 }], // 狂狼勇士
  2200: [{ name: "龍魔導士(2轉)", job: 2210 }], // 龍魔導士
  1100: [{ name: "聖魂劍士(2轉)", job: 1110 }], // 聖魂劍士
  1200: [{ name: "烈焰巫師(2轉)", job: 1210 }], // 烈焰巫師
  1300: [{ name: "破風使者(2轉)", job: 1310 }], // 破風使者
  1400: [{ name: "暗夜行者(2轉)", job: 1410 }], // 暗夜行者
  1500: [{ name: "閃雷悍將(2轉)", job: 1510 }], // 閃雷悍將
}

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  var job = cm.getPlayer().getLevel();
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
    if (level < 30) {
      cm.sendNext("對不起，你還不夠 30 級進行二轉，請到30級再來吧！");
      cm.dispose();
    } else if (level >= 30) {
      cm.sendNext("我是#r轉職職官#k，你需要我幫助你二轉嗎？");
    }
  } else if (status == 1) {
    if (jobList[job]?.length) {
      var msg = "你已經符合條件，可以進行第二次轉職，請選擇你的職業:#b";
      for (var i = 0; i < jobList[job].length; i++) {
        msg += "\r\n#L" + i + "#" + jobList[job][i].name + "#l";
      }
      cm.sendSimple(msg + "#k");
    } else {
      cm.sendSimple("您貌似不符合二轉條件，或者您的職業目前不支持使用NPC快速轉職！");
      cm.dispose();
    }
  } else if (status == 2) {
    selectedJobName = jobList[job][selection].name;
    selectedJob = jobList[job][selection].job;
    cm.sendYesNo("你真的決定要轉職為#r" + name + "#k嗎？");
  } else if (status == 3) {
    cm.changeJob(selectedJob);
    cm.sendOk("轉職成功");
  }
}
