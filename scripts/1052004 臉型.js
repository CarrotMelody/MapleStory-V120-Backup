/* Denma the Owner
	Henesys VIP Eye Change.
	換臉型 NPC
*/
var status = -1;
var facetype;
var maleFaceType = [
  20000, 20001, 20002, 20003, 20004, 20005, 20006, 20007, 20008, 20012, 20014,
  20045, 20046, 20047, 20048, 20049, 20050, 20051, 20052, 20053, 20054, 20055,
  20057, 20056, 20058, 20059, 20060, 20061, 20062, 20063, 20064, 20065, 20066,
  20067, 20068, 20069, 20070,
];
var femaleFaceType = [
  21000, 21001, 21002, 21003, 21004, 21005, 21006, 21007, 21008, 21009, 21010,
  21011, 21012, 21013, 21014, 21010, 21011, 21016, 21110, 21118, 21119, 21120,
  21121, 21122, 21123, 21126, 21127, 21034, 21135, 21036, 21038, 21039, 21040,
  21041, 21042, 21043, 21044, 21045, 21046, 21047, 21048, 21049, 21050, 21051,
  21052, 21053, 21054, 21055, 21056, 21057, 21058, 21059, 21060, 21061, 21062,
  21063, 21064, 21065, 21069, 21070,
];

function start() {
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 0) {
    cm.dispose();
    return;
  } else {
    status++;
  }

  if (status == 0) {
    cm.sendNext(
      "你想不想換張帥氣、美麗的臉龐呢？只需要#r1#b#t4001126##k，本醫師就為您提供整形！"
    );
  } else if (status == 1) {
    var face = cm.getPlayerStat("FACE");

    if (cm.getPlayerStat("GENDER") == 0) {
      // 男性
      facetype = maleFaceType;
    } else {
      // 女性
      facetype = femaleFaceType;
    }
    for (var i = 0; i < facetype.length; i++) {
      facetype[i] = facetype[i] + (face % 1000) - (face % 100);
    }
    cm.askAvatar("你確定要選擇這個臉型嗎？", facetype);
  } else if (status == 2) {
    if (cm.setAvatar(4001126, facetype[selection]) == 1) {
      cm.sendOk("煥然一新！");
    } else {
      cm.sendOk("下次再說吧！");
    }
    cm.dispose();
  }
}
