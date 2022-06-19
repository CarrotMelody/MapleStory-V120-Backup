/**
 * 點裝附魔 + 能力轉移
 */
load("nashorn:mozilla_compat.js");
importPackage(java.lang);
var status = -1;
var slot = Array();
var sel;
var item = 4001126; // 楓葉
var items = 4001197; // 附魔之石

function start() {
  //status = -1;
  action(1, 0, 0);
}

var icon01 = "#fUI/UIWindow.img/CashTradingRoom/BtCoin/normal/0#";
var icon02 = "#fUI/UIWindow.img/UserInfo/bossPetCrown#";
var icon03 = "#fUI/UIWindow.img/AriantMatch/characterIcon/0#";
var icon04 = "#fUI/UIWindow.img/AriantMatch/characterIcon/1#";
var icon05 = "#fUI/UIWindow.img/AriantMatch/characterIcon/2#";
var icon06 = "#fUI/UIWindow.img/AriantMatch/characterIcon/3#";
var icon07 = "#fUI/UIWindow.img/AriantMatch/characterIcon/4#";
var icon08 = "#fUI/UIWindow.img/AriantMatch/characterIcon/5#";
var icon09 = "#fUI/UIWindow.img/Megaphone/0#";
var icon10 = "#fUI/UIWindow.img/CashTradingRoom/icon1#";

var status = -1;

function action(mode, type, selection) {
  if (mode == 0 && status == 0) {
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
      "#b請問您是否要使用點裝附魔功能呢？#d" +
        "\r\n#L1#附魔一次需要使用#r#z" +
        item +
        "##k#d 350 個與#r#z4001197##d 10 個!#l \r\n\r\n#L2##r我要轉移附魔的點裝#d#l "
    );
  } else if (status == 1) {
    sel = selection;
    switch (sel) {
      // 附魔
      case 1:
        var avail = "";
        for (var i = 0; i < 96; i++) {
          if (cm.getInventory(1).getItem(i) != null) {
            if (
              Packages.server.MapleItemInformationProvider.getInstance().isCash(
                cm.getInventory(1).getItem(i).getItemId()
              )
            ) {
              avail +=
                "#L" +
                Math.abs(i) +
                "##z" +
                cm.getInventory(1).getItem(i).getItemId() +
                "##l\r\n";
            }
          }
        }
        if (avail == "") {
          avail += "很抱歉,您的裝備欄沒有任何的點裝哦!!~";
        }
        cm.sendSimple("想要附魔哪一件點數裝備呢？？\r\n#b" + avail);
        break;
      // 轉移
      case 2:
        var avail2 = "";
        for (var i = 0; i < 96; i++) {
          if (cm.getInventory(1).getItem(i) != null) {
            if (
              Packages.server.MapleItemInformationProvider.getInstance().isCash(
                cm.getInventory(1).getItem(i).getItemId()
              )
            ) {
              avail2 +=
                "#L" +
                Math.abs(i) +
                "##z" +
                cm.getInventory(1).getItem(i).getItemId() +
                "##l\r\n";
            }
          }
        }
        if (avail2 == "") {
          avail2 += "很抱歉,您的裝備欄沒有任何的點裝哦!!~";
        }
        cm.sendSimple("想要轉移哪一件點數裝備呢？？\r\n#b" + avail2);
        break;
    }
  } else if (status == 2) {
    switch (sel) {
      case 1:
        selected = selection;
        cm.sendYesNo(
          "你想要附魔的點裝是 #b#t" +
            cm.getInventory(1).getItem(selected).getItemId() +
            "##k.\r\n您確定要對此點裝附魔？？\r\n"
        );
        break;
      case 2:
        selected2 = selection;
        cm.sendYesNo(
          "你想要轉移的點裝是 #b#t" +
            cm.getInventory(1).getItem(selected2).getItemId() +
            "##k.\r\n您確定要轉移此點裝？？\r\n"
        );
        break;
    }
  } else if (status == 3) {
    switch (sel) {
      case 1:
        var type;
        if (cm.haveItem(item, 350) && cm.haveItem(items, 10)) {
          status = 6;
          cm.sendYesNo(cm.EnchantCashEqip(selected));
          cm.gainItem(item, -350);
          cm.gainItem(items, -10);
        } else {
          status = 3;
          cm.sendOk("您的#b#z" + item + "##k或#b#z" + items + "##k不足哦!!");
          cm.dispose();
        }
        break;
      case 2:
        var avail3 = "";
        for (var i = 0; i < 96; i++) {
          if (cm.getInventory(1).getItem(i) != null) {
            if (
              Packages.server.MapleItemInformationProvider.getInstance().isCash(
                cm.getInventory(1).getItem(i).getItemId()
              )
            ) {
              avail3 +=
                "#L" +
                Math.abs(i) +
                "##z" +
                cm.getInventory(1).getItem(i).getItemId() +
                "##l\r\n";
            }
          }
        }
        if (avail3 == "") {
          avail3 += "很抱歉,您的裝備欄沒有任何的點裝哦!!~";
        }
        cm.sendSimple("想要轉移到哪一件點數裝備呢？？\r\n#b" + avail3);
        break;
    }
  } else if (status == 4) {
    selected3 = selection;
    cm.sendYesNo(
      "你想要轉移到的點裝是 #b#t" +
        cm.getInventory(1).getItem(selected3).getItemId() +
        "##k.\r\n您確定要轉移到此點裝？？\r\n"
    );
  } else if (status == 5) {
    cm.sendYesNo(cm.EnchantCashEqip2(selected2, selected3));
    cm.dispose();
  } else if (status == 7) {
    status = 2;
    cm.sendOk(
      "即將花費#b#z" +
        item +
        "##k350個及#b#z" +
        items +
        "##k10個重新附魔此點裝..."
    );
  }
}

/**
 點裝附魔需要改 SRC，在 scripting/NPCConversationManager.java 加上下方程式碼：

 //裝備附魔
public String EnchantCashEqip(byte slot) {
    Equip item = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
    Equip sel = (Equip) item;
    int itemid = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot).getItemId();
    boolean isCash = MapleItemInformationProvider.getInstance().isCash(itemid);
    String msg = "";
    if (isCash) {

        msg += "您此次所附魔的點裝為#b#z" + itemid + "##k\r\n";
        msg += "您此次的附魔為:\r\n";
        msg += "－－－－－－－－－－－－－－－－－－－－－－－\r\n";

        short Str = (short) Randomizer.rand(-3, 5);
        sel.setStr((short) (sel.getStr() + Str));
        msg += "力量 +" + " " + Str + "\r\n";

        short Dex = (short) Randomizer.rand(-3, 5);
        sel.setDex((short) (sel.getDex() + Dex));
        msg += "敏捷: " + " " + Dex + "\r\n";

        short Int = (short) Randomizer.rand(-3, 5);
        sel.setInt((short) (sel.getInt() + Int));
        msg += "智力: " + " " + Int + "\r\n";

        short Luk = (short) Randomizer.rand(-3, 5);
        sel.setLuk((short) (sel.getLuk() + Luk));
        msg += "幸運: " + " " + Luk + "\r\n";

        short Watk = (short) Randomizer.rand(-3, 5);
        sel.setWatk((short) (sel.getWatk() + Watk));
        msg += "物理攻擊: " + " " + Watk + "\r\n";

        short Matk = (short) Randomizer.rand(-3, 5);
        sel.setMatk((short) (sel.getMatk() + Matk));
        msg += "魔法攻擊: " + " " + Matk + "\r\n";

        msg += "－－－－－－－－－－－－－－－－－－－－－－－\r\n";
        msg += "請問您是否要繼續附魔?\r\n#d[點選#r是#d,繼續附魔] [點選#r否#d,存取目前附魔]\r\n#d若裝備素質未改變,請重新登入或換頻即可生效!";
        int used = StringTool.getIntFromString(sel.getOwner());
        used++;
        sel.setOwner("附魔" + used + "次");
        item = (Equip) sel.copy();
        MapleInventoryManipulator.removeFromSlot(getClient(), MapleInventoryType.EQUIP, (short) slot, item.getQuantity(), false);
        MapleInventoryManipulator.addFromDrop(getClient(), item, false);
        c.getPlayer().equipChanged();
        return msg;
    } else {
        return "此裝備並非點裝唷!僅有點裝才可以附魔~";
    }
}

// 點裝附魔
 public String EnchantCashEqip2(byte slot,byte slot2) {
    Equip item = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot);
    Equip sel = (Equip) item;
    Equip item2 = (Equip) c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot2);
    Equip sel2 = (Equip) item2;
    int itemid = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot).getItemId();
    int itemid2 = c.getPlayer().getInventory(MapleInventoryType.EQUIP).getItem(slot2).getItemId();
    boolean isCash = MapleItemInformationProvider.getInstance().isCash(itemid);
    boolean isCash2 = MapleItemInformationProvider.getInstance().isCash(itemid2);
    String msg = "";
    if (isCash&&isCash2) {

    msg += "原本的點裝為#b#z" + itemid + "##k\r\n";
    msg += "轉移後的點裝為#b#z" + itemid2 + "##k\r\n";

        sel2.setStr((short) (sel.getStr()));
        sel2.setDex((short) (sel.getDex()));
        sel2.setInt((short) (sel.getInt()));
        sel2.setLuk((short) (sel.getLuk()));
        sel2.setWatk((short) (sel.getWatk()));
        sel2.setMatk((short) (sel.getMatk()));

        int used = StringTool.getIntFromString(sel.getOwner());
        sel2.setOwner("已附魔" + used + "次");

        item = (Equip) sel.copy();
        item2 = (Equip) sel2.copy();
        MapleInventoryManipulator.removeFromSlot(getClient(), MapleInventoryType.EQUIP, (short) slot, item.getQuantity(), false);
            MapleInventoryManipulator.removeFromSlot(getClient(), MapleInventoryType.EQUIP, (short) slot2, item2.getQuantity(), false);

        MapleInventoryManipulator.addFromDrop(getClient(), item2, false);
        c.getPlayer().equipChanged();
        return msg;
    } else {
        return "此裝備並非點裝唷!僅有點裝才可以轉移~";
    }
}
 */
