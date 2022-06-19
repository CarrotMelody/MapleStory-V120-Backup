/**
 * 萬能轉職
 */
var status = 0;

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (status == 1 && mode == 0) {
    cm.dispose();
    return;
  }
  if (mode == 1) {
    status++;
  } else {
    status--;
    cm.dispose();
  }
  if (status == 0) {
    switch (cm.getJob()) {
      //一转
      case 0: //新手
        cm.sendSimple(
          "請選擇你要轉職的職業\r\n#b#L100#劍士#l #L200#法師#l #L300#弓箭手#l #L400#盜賊#l #L500#海盜#l \r\n#L1100#聖魂劍士#l #L1200#烈焰巫師#l #L1300#破風使者#l #L1400#暗夜行者#l #L1500#閃雷悍將#l \r\n#L2100#狂狼勇士#l \r\n#L2200#龍魔導士#l #L430#影武者(下忍)#l "
        );
        break;
      //二转
      case 100:
        cm.sendSimple(
          "請選擇你要轉職的方向\r\n#b#L110#狂戰士#l\r\n#L120#見習騎士#l\r\n#L130#槍騎兵#l"
        );
        break;
      case 200:
        cm.sendSimple(
          "請選擇你要轉職的方向\r\n#b#L210#法師(火,毒)#l\r\n#L220#法師(冰,雷)#l\r\n#L230#僧侶#l"
        );
        break;
      case 300:
        cm.sendSimple(
          "請選擇你要轉職的方向\r\n#b#L310#獵人#l\r\n#L320#弩弓手#l"
        );
        break;
      case 400:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L410#刺客#l\r\n#L420#俠盜#l");
        break;
      case 500:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L510#打手#l\r\n#L520#槍手#l");
        break;

      case 1100:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1110#聖魂劍士2轉#l");
        break;
      case 1200:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1210#烈焰巫師2轉#l");
        break;
      case 1300:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1310#破風使者2轉#l");
        break;
      case 1400:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1410#暗夜行者2轉#l");
        break;
      case 1500:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1510#閃雷悍將2轉#l");
        break;

      case 2100:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2110#狂狼勇士2轉#l");
        break;
      case 430:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L432#影武者2轉#l");
        break;

      //三转
      case 110:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L111#十字軍#l");
        break;
      case 120:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L121#騎士#l");
        break;
      case 130:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L131#龍骑士#l");
        break;
      case 210:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L211#魔導士（火、毒）#l");
        break;
      case 220:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L221#魔導士（冰、雷）#l");
        break;
      case 230:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L231#祭司#l");
        break;
      case 310:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L311#遊俠#l");
        break;
      case 320:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L321#狙擊手#l");
        break;
      case 410:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L411#暗殺者#l");
        break;
      case 420:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L421#神偷#l");
        break;
      case 510:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L511#格鬥家#l");
        break;
      case 520:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L521#神槍手#l");
        break;

      case 1110:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1111#聖魂劍士3轉#l");
        break;
      case 1210:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1211#烈焰巫師3轉#l");
        break;
      case 1310:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1311#破風使者3轉#l");
        break;
      case 1410:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1411#暗夜行者3轉#l");
        break;
      case 1510:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L1511#閃雷悍將3轉#l");
        break;

      case 2110:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2111#狂狼勇士3轉#l");
        break;
      case 432:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L433#影武者3轉#l");
        break;

      //四转
      case 111:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L112#英雄#l");
        break;
      case 121:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L122#聖騎士#l");
        break;
      case 131:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L132#黑騎士#l");
        break;
      case 211:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L212#火毒魔導師#l");
        break;
      case 221:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L222#冰雷魔導師#l");
        break;
      case 231:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L232#主教#l");
        break;
      case 311:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L312#箭神#l");
        break;
      case 321:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L322#神射手#l");
        break;
      case 411:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L412#夜使者#l");
        break;
      case 421:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L422#暗影神偷#l");
        break;
      case 511:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L512#拳霸#l");
        break;
      case 521:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L522#槍神#l");
        break;

      case 2111:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2112#狂狼勇士4轉#l");
        break;
      case 433:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L434#影武者4轉#l");
        break;

      //龙神
      case 2200:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2210#龍魔導士2轉#l");
        break;
      case 2210:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2211#龍魔導士3轉#l");
        break;
      case 2211:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2212#龍魔導士4轉#l");
        break;
      case 2212:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2213#龍魔導士5轉#l");
        break;
      case 2213:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2214#龍魔導士6轉#l");
        break;
      case 2214:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2215#龍魔導士7轉#l");
        break;
      case 2215:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2216#龍魔導士8轉#l");
        break;
      case 2216:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2217#龍魔導士9轉#l");
        break;
      case 2217:
        cm.sendSimple("請選擇你要轉職的方向\r\n#b#L2218#龍魔導士10轉#l");
        break;

      default:
        cm.sendOk("如果你需要轉職記得找我，你現在並不需要轉職的樣子。");
        cm.dispose();
    }
  } else if (status == 1) {
    switch (selection) {
      case 200:
        if (cm.getJob() == 0 && cm.getPlayer().getLevel() >= 8) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你不是初心者，或你的等級沒有達到8。");
        }
        cm.dispose();
        break;
      // 一轉
      case 100:
      case 300:
      case 400:
      case 500:
      case 1100:
      case 1200:
      case 1300:
      case 1400:
      case 1500:
      case 2100:
      case 2200:
      //case 430:
      case 3200:
      case 3300:
      case 3500:
      case 2300:
      case 501:
      case 3100:
      case 5100:
      case 2400:
      case 508:
        if (cm.getJob() == 0 && cm.getPlayer().getLevel() >= 10) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你不是初心者，或你的等級沒有達到10。");
        }
        cm.dispose();
        break;
      // 二轉
      case 110:
      case 120:
      case 130:
      case 210:
      case 220:
      case 230:
      case 310:
      case 320:
      case 410:
      case 420:
      case 510:
      case 520:
      case 1110:
      case 1210:
      case 1310:
      case 1410:
      case 1510:
      case 2110:
      case 431:
      case 3210:
      case 3310:
      case 3510:
      case 2310:
      case 530:
      case 3110:
      case 5110:
      case 2410:
      case 570:
        if (cm.getPlayer().getLevel() >= 30) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到30。");
        }
        cm.dispose();
        break;

      case 430: //下忍 20
        if (cm.getPlayer().getLevel() >= 20) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到20。");
        }
        cm.dispose();
        break;
      case 432: //上忍 55
        if (cm.getPlayer().getLevel() >= 55) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到55。");
        }
        cm.dispose();
        break;
      //三轉
      case 111:
      case 121:
      case 131:
      case 211:
      case 221:
      case 231:
      case 311:
      case 321:
      case 411:
      case 421:
      case 511:
      case 521:

      case 1111:
      case 1211:
      case 1311:
      case 1411:
      case 1511:

      case 2111:
      case 433:
      case 3211:
      case 3311:
      case 3511:
      case 2311:
      case 531:
      case 3111:
      case 5111:
      case 2411:
      case 571:
        if (cm.getPlayer().getLevel() >= 70) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到70。");
        }
        cm.dispose();
        break;
      // 四轉
      case 112:
      case 122:
      case 132:
      case 212:
      case 222:
      case 232:
      case 312:
      case 322:
      case 412:
      case 422:
      case 512:
      case 522:
      case 2112:
      case 434:
      case 3212:
      case 3312:
      case 3512:
      case 2312:
      case 532:
      case 3112:
      case 5112:
      case 2412:
      case 572:
        if (cm.getPlayer().getLevel() >= 120) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到120。");
        }
        cm.dispose();
        break;

      // 龍魔島士
      case 2210:
        if (cm.getPlayer().getLevel() >= 20) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到20。");
        }
        cm.dispose();
        break;
      case 2211:
        if (cm.getPlayer().getLevel() >= 30) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到30。");
        }
        cm.dispose();
        break;
      case 2212:
        if (cm.getPlayer().getLevel() >= 40) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到40。");
        }
        cm.dispose();
        break;
      case 2213:
        if (cm.getPlayer().getLevel() >= 50) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到50。");
        }
        cm.dispose();
        break;
      case 2214:
        if (cm.getPlayer().getLevel() >= 60) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到60。");
        }
        cm.dispose();
        break;
      case 2215:
        if (cm.getPlayer().getLevel() >= 70) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到70。");
        }
        cm.dispose();
        break;
      case 2216:
        if (cm.getPlayer().getLevel() >= 80) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到80。");
        }
        cm.dispose();
        break;
      case 2217:
        if (cm.getPlayer().getLevel() >= 120) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到120。");
        }
        cm.dispose();
        break;
      case 2218:
        if (cm.getPlayer().getLevel() >= 160) {
          cm.getPlayer().changeJob(selection);
        } else {
          cm.sendOk("你的等級沒有達到160。");
        }
        cm.dispose();
        break;
    }
  }
}
