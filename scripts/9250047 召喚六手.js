/* 召喚六手 */

var status = 0;

function start() {
  status = -1;

  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("加油~");
      cm.dispose();
      return;
    }
    if (mode == 1) {
      status++;
    } else {
      status--;
    }
    if (status == 0) {
      cm.sendSimple(
        "#k請選擇你要做的事： \r\n#L0#召喚六手邪神#l   \r\n#L1##r離開這裡#k#l "
      );
    } else if (status == 1) {
      if (selection == 0) {
        if (cm.getPlayer().getMap().getMonsterById(9420014) == null) {
          cm.spawnMonster(9420014, 1);
          cm.dispose();
        } else {
          cm.sendOk("似乎已經召喚過了哦！");
          cm.dispose();
        }
      } else if (selection == 1) {
        cm.warp(501030104, 0);
        cm.dispose();
      }
    }
  }
}
