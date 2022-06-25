/**
 * 道具清除
 * 2022/06/26
 */
var status = 0;
var types = ["裝備欄", "消耗欄", "裝飾欄", "其他欄", "特殊欄"];

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else {
    status--;
  }

  if (status == -1) {
    cm.dispose();
  }

  if (status == 0) {
    var msg = "你好我是物品回收員，請問您要清空哪個欄位的道具呢？\r\n #b";

    for (var i = 0; i < types.length; i++) {
      msg += "\r\n#L" + i + "#" + types[i] + "";
    }

    cm.sendSimple(msg);
  } else if (status == 1) {
    cm.deleteItem(selection + 1);
    cm.sendOk("清理成功!");
    cm.dispose();
  }
}

/*
  1. src/scripting/NPCConversationManager.java 新增 deleteItem 函式: 

  public void deleteItem(int inventorytype) {
    try {
        Connection con = DatabaseConnection.getConnection();
        PreparedStatement ps = con.prepareStatement("Select * from inventoryitems where characterid = ? and inventorytype = ?");
        ps.setInt(1, getPlayer().getId());
        ps.setInt(2, inventorytype);
        ResultSet re = ps.executeQuery();
        MapleInventoryType type = null;

        switch (inventorytype) { 
            case 1: 
                type=MapleInventoryType.EQUIP; 
                break; 
            case 2: 
                type=MapleInventoryType.USE; 
                break; 
            case 3: 
                type=MapleInventoryType.SETUP; 
                break; 
            case 4: 
                type=MapleInventoryType.ETC; 
                break; 
            case 5: 
                type=MapleInventoryType.CASH; 
                break; 
        }

        while (re.next()) {
          MapleInventoryManipulator.removeById(getC(), type, re.getInt("itemid"), 1, true, true); 
        }

        re.close();
        ps.close();

    } catch (SQLException ex) {} 
  }
 */