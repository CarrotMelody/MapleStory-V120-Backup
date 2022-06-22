/* guild emblem npc */
var status = 0;
var sel;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 0 && status == 0) {
    cm.dispose();
    return;
  }
  if (mode == 1) status++;
  else status--;

  if (status == 0) {
    cm.sendSimple("你找本宮有什麼事情？\r\n#b#L0#創建/更改公會徽章#l#k");
  } else if (status == 1) {
    sel = selection;
    if (selection == 0) {
      if (cm.getPlayerStat("GRANK") == 1) {
        cm.sendYesNo("創建或更改公會徽章需要 #b1,000,000楓幣#k，你確定要繼續？");
      } else {
        cm.sendOk("只有公會長才能創建/更改公會徽章，請讓您的公會長來找我。");
      }
    }
  } else if (status == 2) {
    if (sel == 0) {
      cm.genericGuildMessage(17);
      cm.dispose();
    }
  }
}
