/**
 * 技能學習
 * 2022/06/25
 */
var status = 0;
var skillList = [[1004, 1], [1003, 1], [1007, 3], [8, 3]]; // [技能id, 等級]

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("學而時習之，不亦說乎？");
      cm.dispose();
      return;
    }

    if (mode == 1) {
      status++;
    } else {
      status--;
    }

    if (status == 0) {
      var msg = "#k請選擇你要學的技能：";

      for (var i = 0; i < skillList.length; i++) {
        msg += "\r\n#L" + i + "##s" + skillList[i][0] + "##q" + skillList[i][0] + "##l";
      }

      cm.sendSimple(msg);
    } else if (status == 1) {
      var skill = skillList[selection][0];
      var level = skillList[selection][1];

      cm.teachSkill(skill, level, level);
      cm.sendOk("你已經獲得「#q" + skill + "#」技能！");
      cm.dispose();
    }
  }
} 
