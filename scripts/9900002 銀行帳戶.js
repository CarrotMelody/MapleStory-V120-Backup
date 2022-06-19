/* KIN
  annfine制作-银行系统测试版-Memory修正
*/
var status = 0;
var t = new Array("存錢", "取錢", "查看", "開戶");
var money = new Array("500W", "1000W", "5000W", "1E");
var money1 = new Array("5000000", "10000000", "50000000", "100000000");
var x = 0;
function start() {
  status = -1;
  action(1, 0, 0);
}
function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (mode == 0 && status == 0) {
      cm.dispose();
      return;
    }
    if (mode == 1) status++;
    else status--;
    if (status == 0) {
      cm.sendNext(
        "歡迎使用 #b銀行系統#k 我的朋友! 請先開戶後再進行存款以及取錢的動作，請注意#r存錢之後需要一點時間才能取錢#k，否則系統抓不到數據哦！"
      );
    } else if (status == 1) {
      var a = "請選擇你需要的功能.#b";
      for (var i = 0; i < t.length; i++) {
        a += "\r\n#L" + i + "#" + t[i] + "";
      }
      cm.sendSimple(a);
    } else if (status == 2) {
      x = selection;
      if (x == 2) {
        cm.sendOk("您的存款有" + cm.getMoney() + " ");
        cm.dispose();
      } else if (x == 3) {
        if (cm.addBank() > 0) {
          cm.sendOk("恭喜您,開戶成功!");
        } else {
          cm.sendOk("很抱歉,開戶失敗!可能您已經開戶過了哦!");
        }
        cm.dispose();
      } else {
        var b = " 請選擇金額.#b";
        for (var i = 0; i < money.length; i++) {
          b += "\r\n#L" + i + "#" + money[i] + "";
        }
        cm.sendSimple(b);
      }
    } else if (status == 3) {
      var choose = money1[selection];
      if (x == 0) {
        //存
        if (cm.getMeso() < choose) {
          cm.sendOk("Oh,Sorry,您的錢不夠!");
        } else if (cm.addMoney(choose, 0) > 0) {
          cm.gainMeso(-choose);
          cm.sendOk("好的,已經存入!");
        } else {
          cm.sendOk("Error:請反饋給管理員!");
        }
        cm.dispose();
      } else if (x == 1) {
        //取
        if (cm.getMoney() < choose) {
          cm.sendOk("Oh,Sorry,您存款沒有那麼多呢!");
        } else if (cm.addMoney(-choose, 1) > 0) {
          cm.gainMeso(choose);
          cm.sendOk("好的,請收好您的錢!");
        } else {
          cm.sendOk("Error:請反饋給管理員!");
        }
        cm.dispose();
      }
    } else {
      cm.dispose();
    }
  }
}

/**
  修改 SRC scripting/NPCConversationManager.java

  public int getMoney() {
      int money = 0;
      try {
          int cid = getPlayer().getId();
          Connection con = DatabaseConnection.getConnection();
          PreparedStatement limitCheck = con.prepareStatement("SELECT * FROM Bank WHERE charid=" + cid + "");
          ResultSet rs = limitCheck.executeQuery();
          if (rs.next()) {
              money = rs.getInt("money");
          }
          limitCheck.close();
          rs.close();
      } catch (SQLException ex) {
      }
      return money;
  }

  public int addMoney(int money, int type) {
      try {
          int cid = getPlayer().getId();

          Connection con = DatabaseConnection.getConnection();
          PreparedStatement ps = con.prepareStatement("select * from bank where charid=?");
          ps.setInt(1, cid);
          ResultSet rs = ps.executeQuery();
          if (rs.next()) {
              if (type == 1) {
                  if (money > rs.getInt("money")) {
                      return -1;
                  }
              }
              ps = con.prepareStatement("UPDATE Bank SET money =money+ " + money + " WHERE charid = " + cid + "");
              return ps.executeUpdate();
          }

      } catch (SQLException ex) {
      }
      return 0;
  }

  public int addBank() {
      int r = 0;
      try {
          Connection con = DatabaseConnection.getConnection();
          PreparedStatement ps = con.prepareStatement("insert into bank (charid,money) values (?,0)");
          ps.setInt(1, getPlayer().getId());
          r = ps.executeUpdate();
          ps.close();

      } catch (SQLException ex) {
          r = 0;
      }
      return r;
  }

  新增 db table:

  -- ----------------------------
  -- Table structure for bank
  -- ----------------------------
  DROP TABLE IF EXISTS `bank`;
  CREATE TABLE `bank` (
    `id` int(11) NOT NULL auto_increment,
    `charid` int(11) NOT NULL,
    `money` int(11) NOT NULL,
    PRIMARY KEY  (`id`),
    UNIQUE KEY `charid` (`charid`)
  ) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;
 */