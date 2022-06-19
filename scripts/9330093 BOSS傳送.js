function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("打不起！？");
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
        "#k我是BOSS傳送員，請選擇你的目的地： \r\n#L99#奧芙赫班的後院#r【每日限制一次，固定掉落#i4001456#】#k#l \r\n#L98#凡雷恩的聖殿#r【機率掉落高級飾品】#k#l \r\n#L0#殭屍蘑菇王(HP#r35,000#k)#l    \r\n#L1#蜈蚣王(HP#r40,000#k)#l   \r\n#L2#地獄巴洛古(HP#r55,000#k)#l    \r\n#L3#達納托斯(HP#r70,000#k)#l      \r\n#L4#通道守門人(HP#r78,000#k)#l   \r\n#L5#藍蘑菇王(HP#r200,000#k)#l           \r\n#L6#格瑞芬多(HP#r3,700,000#k)#l       \r\n#L7#噴火龍(HP#r3,700,000#k)#l    \r\n#L8#瘋狂喵Z客(HP#r6,000,000#k)#l   \r\n#L9#巴洛古#l       \r\n#L10#拉圖斯(HP#r23,000,000#k)#l     \r\n#L11#海怒斯(HP#r30,000,000#k)#l     \r\n#L12#天狗(HP#r35,000,000#k)#l  \r\n#L13#六手邪神#l   \r\n#L14#大姐頭#l  \r\n#L15#天皇蟾蜍#l  \r\n#L16#殘暴炎魔#l    \r\n#L17#闇黑龍王#l    \r\n#L18#皮卡啾#l"
      );
    } else if (status == 1) {
      if (selection == 0) {
        cm.warp(105070002, 0);
        cm.sendOk("我已經將你傳送到#r蘑菇王之墓#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 1) {
        cm.warp(701010323, 0);
        cm.sendOk(
          "我已經將你傳送到#r危險的山丘#n#k了.召喚蜈蚣王請點#r公安#k，歡迎再次光臨!"
        );
        cm.dispose();
      } else if (selection == 99) {
        cm.warp(999999994, 0);
        cm.sendOk(
          "我已經將你傳送到#r奧芙赫班的後院#n#k了.請點擊NPC召喚奧芙赫班，歡迎再次光臨!"
        );
        cm.dispose();
      } else if (selection == 98) {
        cm.warp(999999995, 0);
        cm.sendOk(
          "我已經將你傳送到#r凡雷恩的聖殿#n#k了.請點擊NPC召喚凡雷恩，歡迎再次光臨!"
        );
        cm.dispose();
      } else if (selection == 5) {
        cm.warp(800010100, 0);
        cm.sendOk("我已經將你傳送到#r藍蘑菇王#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 2) {
        cm.warp(105090900, 0);
        cm.sendOk("我已經將你傳送到#r被詛咒的寺院#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 3) {
        cm.warp(220070400, 0);
        cm.sendOk("我已經將你傳送到#遺忘的迴廊#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 4) {
        cm.warp(220060400, 0);
        cm.sendOk("我已經將你傳送到#r扭曲的迴廊#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 8) {
        cm.warp(103040400, 0);
        cm.sendOk(
          "我已經將你傳送到#r福爾摩沙：7層8層 A區域#n#k了.召喚瘋狂喵Z客請點#r俊伊#k，歡迎再次光臨!"
        );
        cm.dispose();
      } else if (selection == 9) {
        cm.warp(105100000, 0);
        cm.sendOk("我已經將你傳送到#r巴洛古入口#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 6) {
        cm.warp(240020101, 0);
        cm.sendOk("我已經將你傳送到#r格瑞芬多森林#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 7) {
        cm.warp(240020401, 0);
        cm.sendOk("我已經將你傳送到#r噴火龍棲息地#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 14) {
        cm.warp(801040003, 0);
        cm.sendOk("我已經將你傳送到#r迎賓室#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 11) {
        cm.warp(230040420, 0);
        cm.sendOk("我已經將你傳送到#r海怒斯洞穴#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 10) {
        cm.warp(220080000, 0);
        cm.sendOk("我已經將你傳送到#r時間塔#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 12) {
        cm.warp(800020130, 0);
        cm.sendOk("我已經將你傳送到#r與大佛的邂逅#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 13) {
        cm.warp(501030105, 0);
        cm.sendOk("我已經將你傳送到#r惡靈洞穴#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 15) {
        cm.warp(800040410, 0);
        cm.sendOk("我已經將你傳送到#r楓葉古城：天守閣室#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 16) {
        cm.warp(280030000, 0);
        cm.sendOk("我已經將你傳送到#r殘暴炎魔祭壇#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 17) {
        cm.warp(240060200, 0);
        cm.sendOk("我已經將你傳送到#r闇黑龍王入口#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 18) {
        cm.warp(270050000, 0);
        cm.sendOk("我已經將你傳送到#r神的黃昏#n#k了.歡迎再次光臨!");
        cm.dispose();
      }
    }
  }
}
