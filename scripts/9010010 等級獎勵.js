/* 	Cassandra */

var status = 0;
var log = "1000";
var log1 = "2000";
var log2 = "3000";
var log3 = "4000";
var log4 = "5000";
var log5 = "6000";
var log6 = "7000";
var log7 = "8000";

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("加油升級吧~");
      cm.dispose();
      return;
    }
    if (mode == 1) {
      status++;
    } else {
      status--;
    }
    if (status == 0) {
      /* 判斷是否領取或符合資格 */
      if (cm.getBossLog2(log) >= 1) {
        var text = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 10 && cm.getBossLog2(log) < 1) {
        var text = "#r(可領取)#b";
      } else {
        var text = "";
      }
      if (cm.getBossLog2(log1) >= 1) {
        var text1 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 30 && cm.getBossLog2(log1) < 1) {
        var text1 = "#r(可領取)#b";
      } else {
        var text1 = "";
      }
      if (cm.getBossLog2(log2) >= 1) {
        var text2 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 50 && cm.getBossLog2(log2) < 1) {
        var text2 = "#r(可領取)#b";
      } else {
        var text2 = "";
      }
      if (cm.getBossLog2(log3) >= 1) {
        var text3 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 70 && cm.getBossLog2(log3) < 1) {
        var text3 = "#r(可領取)#b";
      } else {
        var text3 = "";
      }
      if (cm.getBossLog2(log4) >= 1) {
        var text4 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 100 && cm.getBossLog2(log4) < 1) {
        var text4 = "#r(可領取)#b";
      } else {
        var text4 = "";
      }
      if (cm.getBossLog2(log5) >= 1) {
        var text5 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 120 && cm.getBossLog2(log5) < 1) {
        var text5 = "#r(可領取)#b";
      } else {
        var text5 = "";
      }
      if (cm.getBossLog2(log6) >= 1) {
        var text6 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 150 && cm.getBossLog2(log6) < 1) {
        var text6 = "#r(可領取)#b";
      } else {
        var text6 = "";
      }
      if (cm.getBossLog2(log7) >= 1) {
        var text7 = "#d(已領取)#b";
      } else if (cm.getPlayer().getLevel() >= 200 && cm.getBossLog2(log) < 7) {
        var text7 = "#r(可領取)#b";
      } else {
        var text7 = "";
      }
      /*判斷結束*/
      cm.sendSimple(
        "#k請選擇你要領取的等級獎勵(#r請確保背包有5格以上空間#k)： \r\n#L0##b領10級獎勵" +
          text +
          "#l   \r\n#L1#領30級獎勵" +
          text1 +
          "#l    \r\n#L2#領50級獎勵" +
          text2 +
          "#l      \r\n#L3#領70級獎勵" +
          text3 +
          "#l  \r\n#L4#領100級獎勵" +
          text4 +
          "#l \r\n#L5#領120級獎勵" +
          text5 +
          "#l \r\n#L6#領150級獎勵" +
          text6 +
          "#l \r\n#L7#領200級獎勵" +
          text7 +
          "#l"
      );
    } else if (status == 1) {
      if (selection == 0) {
        if (cm.getBossLog2(log) >= 1) {
          cm.sendOk("請確認你是否領取過或者等級已到達10級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 10) {
          cm.setBossLog2(log);
          cm.gainItem(1142070, 1);
          cm.gainItem(1112127, 1);
          cm.gainItem(2450000, 5); //獵人
          cm.gainItem(2000005, 100);
          cm.gainItem(5220000, 5);
          cm.gainItem(2101120, 5);
          cm.gainMeso(200000);
          cm.sendOk(
            "你已成功領取10級獎勵：1個#z1142070#、1個#z1112127#、5個#z2450000#、100個#z2000005#、5個#z5220000#、5個#z2101120#、20萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 1) {
        if (cm.getBossLog2(log1) >= 1 || cm.getPlayer().getLevel() < 30) {
          cm.sendOk("請確認你是否領取過或者等級已到達30級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 30) {
          cm.setBossLog2(log1);
          cm.gainItem(2450000, 5); //獵人
          cm.gainItem(2000005, 100); //超水
          cm.gainItem(5220000, 5); //轉蛋
          cm.gainItem(2101120, 5); //魚包
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取30級獎勵：5個#z2450000#、100個#z2000005#、5個#z5220000#、5個#z2101120#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 2) {
        if (cm.getBossLog2(log2) >= 1 || cm.getPlayer().getLevel() < 50) {
          cm.sendOk("請確認你是否領取過或者等級已到達50級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 50) {
          cm.setBossLog2(log2);
          cm.gainItem(2000005, 100); //超水
          cm.gainItem(5220000, 5); //轉蛋
          cm.gainItem(2101120, 5); //魚包
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取50級獎勵：100個#z2000005#、5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 3) {
        if (cm.getBossLog2(log3) >= 1 || cm.getPlayer().getLevel() < 70) {
          cm.sendOk("請確認你是否領取過或者等級已到達70級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 70) {
          cm.setBossLog2(log3);
          //cm.gainItem(2450000,3); //獵人
          cm.gainItem(1012168, 1); //鬼洽
          cm.gainItem(5220000, 5); //轉蛋
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取70級獎勵：1個#z1012168#、5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 4) {
        if (cm.getBossLog2(log4) >= 1 || cm.getPlayer().getLevel() < 100) {
          cm.sendOk("請確認你是否領取過或者等級已到達100級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 100) {
          cm.setBossLog2(log4);
          cm.gainItem(2450000, 3); //獵人
          cm.gainItem(5220000, 5); //轉蛋
          cm.gainItem(1112915, 1); //歡樂指環
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取100級獎勵：3個#z2450000#、1個#z1112915#、5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 5) {
        if (cm.getBossLog2(log5) >= 1 || cm.getPlayer().getLevel() < 120) {
          cm.sendOk("請確認你是否領取過或者等級已到達120級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 120) {
          cm.setBossLog2(log5);
          cm.gainItem(5220000, 5); //轉蛋
          cm.gainItem(1113185, 1); //黑扉戒指
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取120級獎勵：1個#z1113185#、5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 6) {
        if (cm.getBossLog2(log6) >= 1 || cm.getPlayer().getLevel() < 150) {
          cm.sendOk("請確認你是否領取過或者等級已到達150級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 150) {
          cm.setBossLog2(log6);
          cm.gainItem(2450000, 3); //獵人
          cm.gainItem(5220000, 5); //轉蛋
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取150級獎勵：3個#z2450000#、5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      } else if (selection == 7) {
        if (cm.getBossLog2(log7) >= 1 || cm.getPlayer().getLevel() < 200) {
          cm.sendOk("請確認你是否領取過或者等級已到達200級！");
          cm.dispose();
        } else if (cm.getPlayer().getLevel() >= 200) {
          cm.setBossLog2(log7);
          cm.gainItem(5220000, 5); //轉蛋
          cm.getPlayer().modifyCSPoints(1, 150, true);
          cm.gainMeso(1000000);
          cm.sendOk(
            "你已成功領取200級獎勵：5個#z5220000#、150 Cash、100萬楓幣！"
          );
          cm.dispose();
        }
      }
    }
  }
}

/**
 修改 SRC
 
  1. scripting/NPCConversationManager.java

  //限角色執行一次
  public int getBossLog2(String bossid) {
      return getPlayer().getBossLog2(bossid);
  }

  public void setBossLog2(String bossid) {
      getPlayer().setBossLog2(bossid);
  }

  2. client/MapleCharacter.java

  public int getBossLog2(String bossid) {
      Connection con1 = DatabaseConnection.getConnection();
      try {
          int ret_count = 0;
          PreparedStatement ps;
          ps = con1.prepareStatement("select count(*) from bosslog2 where characterid = ? and bossid = ? ");
          ps.setInt(1, id);
          ps.setString(2, bossid);
          ResultSet rs = ps.executeQuery();
          if (rs.next()) {
              ret_count = rs.getInt(1);
          } else {
              ret_count = -1;
          }
          rs.close();
          ps.close();
          return ret_count;
      } catch (Exception Ex) {
          return -1;
      }
  }

  public void setBossLog2(String bossid) {
      Connection con1 = DatabaseConnection.getConnection();
      try {
          PreparedStatement ps;
          ps = con1.prepareStatement("insert into bosslog2 (accountid, characterid, bossid) values (?,?,?)");
          ps.setInt(1, accountid);
          ps.setInt(2, id);
          ps.setString(3, bossid);
          ps.executeUpdate();
          ps.close();
      } catch (Exception Ex) {
      }
  }

  新增 db table : bosslog2

  -- ----------------------------
  -- Table structure for bosslog2
  -- ----------------------------
  DROP TABLE IF EXISTS `bosslog2`;
  CREATE TABLE `bosslog2` (
    `bosslog2` int(10) unsigned NOT NULL auto_increment,
    `accountid` int(11) unsigned NOT NULL,
    `characterid` int(11) unsigned NOT NULL,
    `bossid` varchar(20) character set big5 NOT NULL,
    PRIMARY KEY  (`bosslog2`)
  ) ENGINE=InnoDB AUTO_INCREMENT=1416 DEFAULT CHARSET=latin1;
 */
