/*技能獲得*/

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
      cm.sendOk("改天再來學吧~");
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
        "#k請選擇你要學的技能： \r\n#L0##s1004##q1004##l       \r\n#L1##s1003##q1003##l    \r\n#L2##s1007##q1007##l      \r\n#L3##s8##q8##l  \r\n#L4##s4311003##q4311003##r(影武者)#k#l \r\n#L5##s4321000##q4321000##r(影武者)#b#k \r\n#L6#領取#i1902000##z1902000##l \r\n#L7#領取#i1902001##z1902001##l \r\n#L8#領取#i1912000##z1912000##l"
      );
    } else if (status == 1) {
      if (selection == 0) {
        cm.teachSkill(1004, 1, 1);
        cm.sendOk("你已經獲得「怪物騎乘」技能！");
        cm.dispose();
      } else if (selection == 1) {
        cm.teachSkill(1003, 1, 1);
        cm.sendOk("你已經獲得「神匠之魂」技能！");
        cm.dispose();
      } else if (selection == 2) {
        cm.teachSkill(1007, 3, 3);
        cm.sendOk("你已經獲得「強化合成」技能！");
        cm.dispose();
      } else if (selection == 3) {
        cm.teachSkill(8, 3, 3);
        cm.sendOk("你已經獲得「寵物達人」技能！");
        cm.dispose();
      } else if (selection == 4) {
        cm.teachSkill(4311003, 7, 20);
        cm.sendOk("你已經獲得「狂刃風暴」技能！");
        cm.dispose();
      } else if (selection == 5) {
        cm.teachSkill(4321000, 7, 20);
        cm.sendOk("你已經獲得「雙刃旋」技能！");
        cm.dispose();
      } else if (selection == 6) {
        cm.gainItem(1902000, 1);
        cm.sendOk("你已經獲得「野豬」！");
        cm.dispose();
      } else if (selection == 7) {
        cm.gainItem(1902001, 1);
        cm.sendOk("你已經獲得「銀色鬃毛」！");
        cm.dispose();
      } else if (selection == 8) {
        cm.gainItem(1912000, 1);
        cm.sendOk("你已經獲得「馬鞍」！");
        cm.dispose();
      }
    }
  }
}
