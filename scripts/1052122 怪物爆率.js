/*
	製作：彩虹工作室
	功能：查看地圖怪物爆率
	時間：2016年12月23日
*/

var status = -1;

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else {
    if (status == 0) {
      cm.dispose();
    }
    status--;
  }
  if (status == 0) {
    if (cm.getMap().getAllMonstersThreadsafe().size() <= 0) {
      cm.sendOk(
        "當前地圖沒有刷新怪物，無法查看怪物掉寶資訊。\r\n還是你想要#L99#輸入怪物名稱查詢#l "
      );
      return;
    }
    var selStr = "請選擇你要查看怪物的掉寶資訊。\r\n\r\n#b";
    var iz = cm.getMap().getAllUniqueMonsters().iterator();
    while (iz.hasNext()) {
      var zz = iz.next();
      selStr += "#L" + zz + "##o" + zz + "##l\r\n";
    }
    if (cm.getPlayer().isAdmin()) {
      selStr += "\r\n#L0# #r查看全地圖掉寶資訊#k#l";
    }
    cm.sendSimple(selStr);
  } else if (status == 1) {
    if (selection == 0) {
      cm.sendNext(cm.checkMapDrop());
      cm.dispose();
    } else if (selection == 99) {
      cm.sendGetText("請輸入需要檢索的怪物名稱:");
    } else {
      cm.sendOk(cm.checkDrop(selection));
      cm.dispose();
    }
  } else if (status == 2) {
    cm.sendOk(cm.searchMobs(cm.getText()));
  } else if (status == 3) {
    cm.sendOk(cm.checkDrop(selection));
    cm.dispose();
  }
}

/* 需要改 SRC

在  src/scripting/NPCConversationManager.java 加上：

import provider.MapleDataTool;
import provider.MapleDataProviderFactory; 
import server.life.MonsterDropEntry;

public String checkMapDrop() {
    List<MonsterGlobalDropEntry> ranks = new ArrayList<>(MapleMonsterInformationProvider.getInstance().getGlobalDrop());
    int mapid = getPlayer().getMap().getId();
    int globalServerRate = 1; //特殊數據庫道具掉寶率

    if (ranks != null && ranks.size() > 0) {
        int num = 0, itemId, chance;
        MonsterGlobalDropEntry de;
        StringBuilder name = new StringBuilder();
        for (MonsterGlobalDropEntry rank : ranks) {
            de = rank;
            if (de.continent < 0 || (de.continent < 10 && mapid / 100000000 == de.continent) || (de.continent < 100 && mapid / 10000000 == de.continent) || (de.continent < 1000 && mapid / 1000000 == de.continent)) {
                itemId = de.itemId;
                if (num == 0) {
                    name.append("當前地圖 #r").append(mapid).append("#k - #m").append(mapid).append("# 的全局掉寶率為:");
                    name.append("\r\n--------------------------------------\r\n");
                }
                String names = "#z" + itemId + "#";
                chance = de.chance * globalServerRate;
                if (getPlayer().isAdmin()) {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(names).append(" - ").append(Integer.valueOf(chance >= 999999 ? 1000000 : chance).doubleValue() / 10000.0).append("%的掉寶率. ").append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? ("需要接受任務: " + MapleQuest.getInstance(de.questid).getName()) : "").append("\r\n");
                } else {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(names).append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? ("需要接受任務: " + MapleQuest.getInstance(de.questid).getName()) : "").append("\r\n");
                }
                num++;
            }
        }
        if (name.length() > 0) {
            return name.toString();
        }
    }
    return "當前地圖沒有設置全局掉寶率。";
}

public String checkDrop(int mobId) {
    MapleItemInformationProvider ii = MapleItemInformationProvider.getInstance();
    List<MonsterDropEntry> ranks = MapleMonsterInformationProvider.getInstance().retrieveDrop(mobId);
    if (!ranks.isEmpty() && ranks.size() > 0) {
        int num = 0, itemId, chance;
        MonsterDropEntry de;
        StringBuilder name = new StringBuilder();
        for (MonsterDropEntry rank : ranks) {
            de = rank;
            if (de.chance > 0 && (de.questid <= 0 || (de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0))) {
                itemId = de.itemId;
                if (itemId == 0) {
                    continue;
                } else if (!ii.itemExists(itemId)) {
                    continue;
                }
                if (num == 0) {
                    name.append("當前怪物 #o").append(mobId).append("# 的掉寶率為:\r\n");
                    name.append("--------------------------------------\r\n");
                }
                String namez = "";
                if (itemId == 0) { //金幣 物品ID為0就是金幣道具
                    itemId = 4031041; //休咪的錢包 display sack of cash
                    namez = (de.Minimum * getClient().getChannelServer().getMesoRate()) + " - " + (de.Maximum * getClient().getChannelServer().getMesoRate()) + " 的金幣";
                } else {
                    namez = "#z" + itemId + "#";
                }
                chance = de.chance * getClient().getChannelServer().getDropRate();
                if (getPlayer().isAdmin()) {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(namez).append(" - ").append(Integer.valueOf(chance >= 999999 ? 1000000 : chance).doubleValue() / 10000.0).append("%的掉寶率. ").append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? ("需要接受任務: " + MapleQuest.getInstance(de.questid).getName()) : "").append("\r\n");
                } else {
                    name.append(num + 1).append(") #v").append(itemId).append("#").append(namez).append(de.questid > 0 && MapleQuest.getInstance(de.questid).getName().length() > 0 ? ("需要接受任務: " + MapleQuest.getInstance(de.questid).getName()) : "").append("\r\n");
                }
                num++;
            }
        }
        if (name.length() > 0) {
            return name.toString();
        }
    }
    return "沒有找到這個怪物的掉寶率數據。";
}

public String searchMobs(String mob_name) {
    StringBuilder sb = new StringBuilder();
    MapleDataProvider dataProvider = MapleDataProviderFactory.getDataProvider(new File("wz/String.wz"));
    MapleData data = dataProvider.getData("Mob.img");
    if (data != null) {
        String name;
        for (MapleData searchData : data.getChildren()) {
            name = MapleDataTool.getString(searchData.getChildByPath("name"), "NO-NAME");
            if (name.toLowerCase().contains(mob_name.toLowerCase())) {
                sb.append("#L" + searchData.getName() + "##b").append(Integer.parseInt(searchData.getName())).append("#k - #r").append(name).append("\r\n");
                
            }
        }
    }
    if (sb.length() == 0) {
        sb.append("查無此怪物名稱.");
    }
    return sb.toString();
}
*/