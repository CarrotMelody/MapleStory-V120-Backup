/* guild creation npc */
var status = -1;
var sel;

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  var GID = cm.getPlayerStat("GID"); // �j�� 0 �N��w�g�����|
  var GRANK = cm.getPlayerStat("GRANK"); // 1: ���|��

  if (mode == 0 && status == 0) {
    cm.dispose();
    return;
  }
  if (mode == 1) status++;
  else status--;

  if (status == 0)
    cm.sendSimple(
      "�A�Q���ƻ�?\r\n#b#L0#�Ыؤ��|#l\r\n#L1#�Ѵ����|#l\r\n#L2#�ϥη����X�R���|�H��#l\r\n#L3#�ϥ�GP�X�R���|�H��#l#k"
    );
  else if (status == 1) {
    sel = selection;
    if (selection == 0) {
      // �Ыؤ��|
      if (GID > 0) {
        cm.sendOk("�A�w�g���u�|�F�C");
        cm.dispose();
      } else {
        cm.sendYesNo("�إߤ��|�N��O�A#b500,000 ����#k, �T�w��?");
      }
    } else if (selection == 1) {
      // �Ѵ����|
      if (GID <= 0 || GRANK != 1) {
        cm.sendOk("�u���|���i�H�Ѵ����|�C");
        cm.dispose();
      } else {
        cm.sendYesNo("�A�T�w�n�Ѵ����|��?");
      }
    } else if (selection == 2) {
      // �X�R���|�H��
      if (GID <= 0 || GRANK != 1) {
        cm.sendOk("�u�����|���i�H�X�R�H�ơC");
        cm.dispose();
      } else {
        cm.sendYesNo("�X�R #b5#k �Ӥ��|���ݭn��O #b250,000 ����#k, �T�w��?");
      }
    } else if (selection == 3) {
      // �X�R���|�H��
      if (GID <= 0 || GRANK != 1) {
        cm.sendOk("�u�����|���i�H�X�R�H�ơC");
        cm.dispose();
      } else {
        cm.sendYesNo("�X�R #b5#k �Ӥ��|���ݭn��O #b2500 GP#k, �T�w��?");
      }
    }
  } else if (status == 2) {
    if (sel == 0 && GID <= 0) {
      cm.genericGuildMessage(1);
      cm.dispose();
    } else if (sel == 1 && GID > 0 && GRANK == 1) {
      cm.disbandGuild();
      cm.dispose();
    } else if (sel == 2 && GID > 0 && GRANK == 1) {
      cm.increaseGuildCapacity(false);
      cm.dispose();
    } else if (sel == 3 && GID > 0 && GRANK == 1) {
      cm.increaseGuildCapacity(true);
      cm.dispose();
    }
  }
}
