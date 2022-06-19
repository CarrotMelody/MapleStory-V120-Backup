/* 一轉轉職 */

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
      if (
        (cm.getPlayer().getJob() == 0 || cm.getPlayer().getJob() == 2000) &&
        cm.getPlayer().getLevel() >= 10 &&
        cm.getPlayer().getLevel() < 30
      ) {
        cm.sendSimple(
          "這裡為一轉轉職，你想成為：\r\n#r #L1#劍士#l #L11#魔法師#l #L21#弓箭手#l #L28#盜賊#l #L35#海盜#l #L46#狂狼勇士#l"
        );
      } else {
        cm.sendOk("你似乎不符合一轉資格哦！");
        cm.dispose();
      }
    } else if (status == 1) {
      if (selection == 1) {
        jobName = "劍士";
        job = 100;
      } else if (selection == 11) {
        jobName = "魔法師";
        job = 200;
      } else if (selection == 21) {
        jobName = "弓箭手";
        job = 300;
      } else if (selection == 28) {
        jobName = "盜賊";
        job = 400;
      } else if (selection == 35) {
        jobName = "海盜";
        job = 500;
      } else if (selection == 46) {
        if (cm.getPlayer().getJob() == 2000) {
          jobName = "狂狼勇士";
          job = 2100;
        } else {
          cm.sendOk("你不能轉為狂狼勇士哦！");
        }
      }
      cm.sendYesNo("#d你想成為: #r[" + jobName + "]#k #d嗎?");
    } else if (status == 2) {
      if (
        (cm.getPlayer().getJob() == 0 || cm.getPlayer().getJob() == 2000) &&
        cm.getPlayer().getLevel() >= 10
      ) {
        cm.changeJob(job);
        cm.dispose();
      } else {
        cm.sendOk("#d你沒有符合一轉的需求#k #d!");
        cm.dispose();
      }
    } else {
      cm.dispose();
    }
  }
}
