/** 
 * 一轉轉職 NPC
 * 2022/06/24 簡化
 */
var status = 0;
var selectedJob, selectedJobName;
var jobList = [
  ["劍士", 100], ["法師", 200], ["弓箭手", 300], ["盜賊", 400], ["海盜", 500], ["下忍", 430], 
  ["狂狼勇士", 2100], ["龍魔導士", 2200], ["聖魂劍士", 1100], ["烈焰巫師", 1200], ["破風使者", 1300], 
  ["暗夜行者", 1400], ["閃雷悍將", 1500]
];

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
    // 可以進行一轉的職業: 初心者, 貴族, 傳說, 龍魔導士(0轉); 可以進行一轉的等級: 10 ~ 30
    if ([0, 1000, 2000, 2001].indexOf(job) !== -1 && level >= 10) {
      var msg = "這裡為一轉轉職NPC，你想成為：\r\n#r";
      for (var i = 0; i < jobList.length; i++) {
        msg += "#L" + i + "#" + jobList[i][0] + "#l ";
      }
      cm.sendSimple(msg);
    } else {
      cm.sendOk("你似乎不符合一轉資格哦！");
      cm.dispose();
    }
  } else if (status == 1) {
    selectedJobName = jobList[selection][0];
    selectedJob = jobList[selection][1];

    // 狂狼勇士須為傳說才能轉職
    if (selectedJob === 2100) {
      if (job !== 2000) {
        cm.sendOk("你不能轉為" + selectedJobName + "哦！必須是傳說才能轉職。");
      }
    }
    // 龍魔導士(1轉)須為龍魔導士(0轉)才能轉職
    if (selectedJob === 2200) {
      if (job !== 2001) {
        cm.sendOk("你不能轉為" + selectedJobName + "哦！必須是龍魔導士(0轉)才能轉職。");
      }
    }
    // 皇家騎士團須為貴族才能轉職
    if (selectedJob >= 1100 && selectedJob <= 1500) {
      if (job !== 1000) {
        cm.sendOk("你不能轉為" + selectedJobName + "哦！必須是貴族才能轉職。");
      }
    }
    // 其他都是初心者才能轉
    if (selectedJob < 1000) {
      if (job !== 0) {
        cm.sendOk("你不能轉為" + selectedJobName + "哦！必須是初心者才能轉職。");
      }
    }

    cm.sendYesNo("#d你確認要轉職為: #r[" + selectedJobName + "]#k #d嗎？");
  } else if (status == 2) {
    cm.changeJob(selectedJob);
    cm.dispose();
  }
}