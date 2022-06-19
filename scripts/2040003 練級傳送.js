/* Author: aaroncsn(MapleSea Like)
	NPC Name: 		Assistant Cheng
	Map(s): 		Ludibrium: Toy Factory Zone 1(220020000)
	Description: 		Unknown

    function start(){
        cm.sendNext("Thanks to you, the Toy Factory is running smoothly again. I'm so glad you came to help us out. We've been keeping an extra eye on all of our partys, so don't worry about it. Well then, I need to get back to work!");
        cm.dispose();
    }
*/

/*練級傳送*/

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
      cm.sendOk("練級要勤奮，別偷懶啊！");
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
        "#k我是練級傳送員，請選擇你的目的地： \r\n#L0##r高等玩家專屬練級地(150↑)#b#l  \r\n#L1##r中等玩家專屬練級地(45↑~120)#b#l   \r\n#L2#地鐵一號線[地區01] (10-20級)#l \r\n#L3#捷運車廂內部2 (20-30級)#l   \r\n#L4#遺跡發掘地II(25-30級)#l    \r\n#L5#露臺中庭(30-40級)#l  \r\n#L6#郊區2(30-40級)#l   \r\n#L7#地鐵一號線[地區02](30-45級)#l     \r\n#L8#紅螃蟹海灘1(40-50級)#l  \r\n#L9#時間之路<4>(40-50級)#l \r\n#L10#地鐵一號線[地區04](43-50級)#l  \r\n#L11#鋼之黑肥肥之地(45-55級)#l   \r\n#L12#初級修煉場(50-60級)#l   \r\n#L13#神秘小徑2(51-70級)#l   \r\n#L14#夜市徒步區3、4(55-75級)#l   \r\n#L15#第一軍營(60-70級)#l   \r\n#L16#鬼怪山脊(60-75級)#l     \r\n#L17#巨人之林(60-80級)#l     \r\n#L18#機械蜘蛛洞穴(70-85級)#l    \r\n#L19#夢幻公園入口(85-95級)#l     \r\n#L20#毀壞的時間(90-100級)#l    \r\n#L21#武器庫(90-100級)#l     \r\n#L22#暗黑半人馬領土(90-120級)#l    \r\n#L23#烏魯莊園I(95-105級)#l    \r\n#L24#禁忌的時間(100-120級)#l   \r\n#L25#彎曲的時間(100-120級)#l  \r\n#L26#火焰死亡戰場(100-120級)#l   \r\n#L27#遭破壞的龍之巢穴(105-120級)#l   \r\n#L28#龍的峽谷(105-120級)#l  \r\n#L29#回憶之路1(105-120級)#l  \r\n#L30#未來東京（台場）(120級以上)#l  \r\n#L31#日本江戶川公園(120級以上)#l  \r\n#L32#未來東京（廢墟）(120級以上)#l  \r\n#L33#未來東京（築波研究所）(120級以上)#l   \r\n#L34#未來東京（太空艦隊）(120級以上)#l"
      );
    } else if (status == 1) {
      if (selection == 0) {
        if (cm.getPlayer().getLevel() >= 150) {
          cm.warp(800040401, 0);
          cm.sendOk(
            "我已經將你傳送到#r高等玩家專屬練級地#n#k了.歡迎再次光臨！"
          );
          cm.dispose();
        } else {
          cm.sendOk("你似乎還不到150級哦！");
          cm.dispose();
        }
      } else if (selection == 1) {
        if (
          cm.getPlayer().getLevel() >= 45 &&
          cm.getPlayer().getLevel() <= 120
        ) {
          cm.warp(800040300, 0);
          cm.sendOk(
            "我已經將你傳送到#r中等玩家專屬練級地#n#k了.歡迎再次光臨！"
          );
          cm.dispose();
        } else {
          cm.sendOk("你似乎超過等級範圍哦！");
          cm.dispose();
        }
      } else if (selection == 2) {
        cm.warp(103000101, 0);
        cm.sendOk("我已經將你傳送到#r地鐵一號線[地區01]#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 3) {
        cm.warp(742000103, 0);
        cm.sendOk("我已經將你傳送到#r捷運車廂內部2#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 4) {
        cm.warp(101030102, 0);
        cm.sendOk("我已經將你傳送到#r遺跡發掘地II#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 5) {
        cm.warp(220010500, 0);
        cm.sendOk("我已經將你傳送到#r露臺中庭#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 6) {
        cm.warp(540020100, 0);
        cm.sendOk("我已經將你傳送到#r郊區2#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 7) {
        cm.warp(103000103, 0);
        cm.sendOk("我已經將你傳送到#r地鐵一號線[地區02]#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 10) {
        cm.warp(103000105, 0);
        cm.sendOk("我已經將你傳送到#r地鐵一號線[地區04]#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 8) {
        cm.warp(110020000, 0);
        cm.sendOk("我已經將你傳送到#r紅螃蟹海灘I#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 9) {
        cm.warp(220040400, 0);
        cm.sendOk("我已經將你傳送到#r時間之路<4>#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 11) {
        cm.warp(541000200, 0);
        cm.sendOk("我已經將你傳送到#r鋼之黑肥肥之地#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 12) {
        cm.warp(250020000, 0);
        cm.sendOk("我已經將你傳送到#r初級修練場#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 13) {
        cm.warp(541000200, 0);
        cm.sendOk("我已經將你傳送到#r神秘小徑2#n#k了.歡迎再次光臨!");
        cm.dispose();
      } else if (selection == 14) {
        cm.warp(741010200, 0);
        cm.sendOk("我已經將你傳送到#r夜市徒步區3#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 15) {
        cm.warp(101030110, 0);
        cm.sendOk("我已經將你傳送到#r第一軍營#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 16) {
        cm.warp(222010400, 0);
        cm.sendOk("我已經將你傳送到#r鬼怪山脊#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 17) {
        cm.warp(105040306, 0);
        cm.sendOk("我已經將你傳送到#r巨人之林#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 18) {
        cm.warp(600020300, 0);
        cm.sendOk("我已經將你傳送到#r機械蜘蛛洞穴#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 19) {
        cm.warp(551030100, 0);
        cm.sendOk("我已經將你傳送到#r夢幻公園入口#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 20) {
        cm.warp(220070201, 0);
        cm.sendOk("我已經將你傳送到#r毀壞的時間#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 21) {
        cm.warp(801040004, 0);
        cm.sendOk("我已經將你傳送到#r武器庫#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 22) {
        cm.warp(240020200, 0);
        cm.sendOk("我已經將你傳送到#r暗黑半人馬領土#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 23) {
        cm.warp(541020100, 0);
        cm.sendOk("我已經將你傳送到#r烏魯莊園I#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 24) {
        cm.warp(220070301, 0);
        cm.sendOk("我已經將你傳送到#r禁忌的時間#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 25) {
        cm.warp(220060201, 0);
        cm.sendOk("我已經將你傳送到#r彎曲的時間#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 26) {
        cm.warp(240020100, 0);
        cm.sendOk("我已經將你傳送到#r火焰死亡戰場#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 27) {
        cm.warp(240040520, 0);
        cm.sendOk("我已經將你傳送到#r遭破壞的龍之巢穴#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 28) {
        cm.warp(240040000, 0);
        cm.sendOk("我已經將你傳送到#r龍的峽谷#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 29) {
        cm.warp(270010100, 0);
        cm.sendOk("我已經將你傳送到#r回憶之路1#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 30) {
        cm.warp(802000200, 0);
        cm.sendOk("我已經將你傳送到#r未來東京（台場）#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 31) {
        cm.warp(802000300, 0);
        cm.sendOk("我已經將你傳送到#r日本江戶川公園#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 32) {
        cm.warp(802000400, 0);
        cm.sendOk("我已經將你傳送到#r未來東京（廢墟）#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      } else if (selection == 33) {
        cm.warp(802000500, 0);
        cm.sendOk(
          "我已經將你傳送到#r未來東京（築波研究所）#n#k了.歡迎再次光臨!"
        );
        cm.dispose();
        cm.dispose();
      } else if (selection == 34) {
        cm.warp(802000600, 0);
        cm.sendOk("我已經將你傳送到#r未來東京（太空艦隊）#n#k了.歡迎再次光臨!");
        cm.dispose();
        cm.dispose();
      }
    }
  }
}
