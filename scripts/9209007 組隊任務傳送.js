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
      cm.sendOk("沒朋友！？");
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
        "#k我是組隊任務傳送員，請選擇你的目的地：#b \r\n#L0#第一次同行(21~30級)#l \r\n#L1#怪物擂台賽(30~50級)#l   \r\n#L2#時空的裂縫(35~50級)#l    \r\n#L3#奈特的金字塔(40~60級)#l  \r\n#L4#毒霧森林(45~55級)#l   \r\n#L5#女神的遺跡(51~70級)#l   \r\n#L6#羅密歐與茱麗葉(71~85級)#l  "
      );
    } else if (status == 1) {
      if (selection == 0) {
        cm.warp(103000000, 0);
        cm.sendOk("我已經將你傳送到#r第一次同行#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 1) {
        cm.warp(980000000, 0);
        cm.sendOk("我已經將你傳送到#r怪物擂台賽#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 2) {
        cm.warp(221024500, 0);
        cm.sendOk("我已經將你傳送到#r時空的裂縫#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 3) {
        cm.warp(926010000, 0);
        cm.sendOk("我已經將你傳送到#r奈特的金字塔#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 4) {
        cm.warp(300030100, 0);
        cm.sendOk("我已經將你傳送到#r毒霧森林#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 5) {
        cm.warp(200080101, 0);
        cm.sendOk("我已經將你傳送到#r女神的遺跡#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 6) {
        cm.warp(261000021, 0);
        cm.sendOk("我已經將你傳送到#r羅密歐與茱麗葉#n#k了.歡迎再次光臨!");
        cm.dispose();
      }
    }
  }
}
