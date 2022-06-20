/*
 * 練級傳送
 * 2022/06/20 簡化
 * 含部分個人端口地圖，請自行刪減或修改。
 */
var status = 0;
// [地圖名稱, 等級限制, 機率性掉落道具, 等級下限, 等級上限]
var mapList = [
    ["高等玩家專屬練級地", "150↑", 4031456, 150, null, 800040401],
    ["中等玩家專屬練級地", "120↑~150", 4031843, 120, 150, 800040300],
    ["新手玩家專屬練級地2", "70↑~120", null, 70, 120, 999999998],
    ["新手玩家專屬練級地", "45↑~120", null, 45, 120, 800040300],
    ["地鐵一號線[地區01]", "10-20", null, null, null, 103000101],
    ["捷運車廂內部2", "20-30", null, null, null, 742000103],
    ["遺跡發掘地II", "25-30", null, null, null, 101030102],
    ["露臺中庭", "30-40", null, null, null, 220010500],
    ["郊區2", "30-40", null, null, null, 540020100],
    ["地鐵一號線[地區02]", "30-45", null, null, null, 103000103],
    ["紅螃蟹海灘1", "40-50", null, null, null, 110020000],
    ["時間之路<4>", "40-50", null, null, null, 220040400],
    ["地鐵一號線[地區04]", "43-50", null, null, null, 103000105],
    ["鋼之黑肥肥之地", "45-55", null, null, null, 541000200],
    ["初級修煉場", "50-60", null, null, null, 250020000],
    ["神秘小徑2", "51-70", null, null, null, 541000200],
    ["夜市徒步區3、4", "55-75", null, null, null, 741010200],
    ["第一軍營", "60-70", null, null, null, 101030110],
    ["鬼怪山脊", "60-75", null, null, null, 222010400],
    ["巨人之林", "60-80", null, null, null, 105040306],
    ["機械蜘蛛洞穴", "70-85", null, null, null, 600020300],
    ["夢幻公園入口", "85-95", null, null, null, 551030100],
    ["毀壞的時間", "90-100", null, null, null, 220070201],
    ["武器庫", "90-100", 4001197, null, null, 801040004],
    ["暗黑半人馬領土", "90-120", null, null, null, 240020200],
    ["烏魯莊園I", "95-105", null, null, null, 541020100],
    ["禁忌的時間", "100-120", null, null, null, 220070301],
    ["彎曲的時間", "100-120", null, null, null, 220060201],
    ["火焰死亡戰場", "100-120", null, null, null, 240020100],
    ["遭破壞的龍之巢穴", "105-120", null, null, null, 240040520],
    ["龍的峽谷", "105-120", null, null, null, 240040000],
    ["回憶之路1", "105-120", null, null, null, 270010100],
    ["未來東京（台場）", "120↑", 4032181, 120, null, 802000200],
    ["日本江戶川公園", "120↑", 4032181, 120, null, 802000300],
    ["未來東京（廢墟）", "120↑", 4032181, 120, null, 802000400],
    ["未來東京（築波研究所）", "120↑", 4032181, 120, null, 802000500],
    ["未來東京（太空艦隊）", "120↑", 4032181, 120, null, 802000600],
]

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
        var msg = "#k我是練級傳送員，請選擇你的目的地：";
        for (var i = 0; i < mapList.length; i++) {
            msg += "\r\n#L" + i + "#";

            var mapName = mapList[i][0];
            var mapLevel = mapList[i][1];
            var mapItem = mapList[i][2];

            // 前四張自製地圖
            if (i < 4) {
                // 前四張自製地圖整行字是紅的
                msg += "#r" + mapName + "(" + mapLevel + ")"; // 未來東京（太空艦隊）(120↑)
                if (mapItem) {
                    msg += "【會掉落#z" + mapItem + "#】"; // 【會掉落楓幣】
                }
                msg += "#b#l";
            } else {
                // 其他地圖名稱是白的
                msg += mapName + "(" + mapLevel + ")";

                if (mapItem) {
                    // 武器庫和未來東京地圖掉落物用紅字強調
                    if (i === 23 || i > 31) {
                        msg += "#r【會掉落#z" + mapItem + "#】#b";
                    } else {
                        msg += "【會掉落#z" + mapItem + "#】";
                    }
                }
                msg += "#l";
            }
        }
      cm.sendSimple(msg);
    } else if (status == 1) {
        // 是否可以前往
        var flag = true; 

        // 地圖等級限制
        var level = cm.getPlayer().getLevel();
        var lower = mapList[selection][3];
        var upper = mapList[selection][4];

        if (lower || upper) {
            // 等級超出地圖限制
            if (lower && level < lower) {
                flag = false;
            }
            if (upper && level > upper) {
                flag = false;
            }
        }

        if (flag) {
            cm.warp(mapList[selection][5], 0);
            cm.sendOk("我已經將你傳送到#r" + cm.getMap().getMapName() + "#n#k了。歡迎再次光臨！");
            cm.dispose();
        } else {
            cm.sendOk("你似乎不在等級範圍內哦！");
            cm.dispose();
        }
    }
  }
}
