/**
 * 等級獎勵兌換 NPC
 * 2022/06/25 簡化
 */
var status = 0;
var receiveStatus = []; // 領取狀態
var log = [10, 30, 50, 70, 100, 120, 150, 200]; // 可領取獎勵等級
var rewards = [ // 各等級獎勵
  // 10 級
  {
    meso: 200000,
    cash: 150,
    list:[
      { item: 1142070, count: 1 },
      { item: 1112127, count: 1 },
      { item: 2450000, count: 5 },
      { item: 5220000, count: 5 },
      { item: 2101120, count: 5 },
    ]
  },
  // 30 級
  {
    meso: 200000,
    cash: 150,
    list:[
      { item: 1142070, count: 1 },
      { item: 1112127, count: 1 },
      { item: 2450000, count: 5 },
      { item: 5220000, count: 5 },
      { item: 2101120, count: 5 },
    ]
  },
  // 50 級
  {
    meso: 1000000,
    cash: 150,
    list:[
      { item: 2000005, count: 5 },
      { item: 2450000, count: 5 },
      { item: 5220000, count: 5 },
      { item: 2101120, count: 5 },
    ]
  },
  // 70 級
  {
    meso: 1000000,
    cash: 150,
    list:[
      { item: 1012168, count: 1 },
      { item: 5220000, count: 5 },
    ]
  },
  // 100 級
  {
    meso: 70000000,
    cash: 250,
    list:[
      { item: 1112915, count: 1 },
      { item: 5220000, count: 5 },
      { item: 2450000, count: 3 },
    ]
  },
  // 120 級
  {
    meso: 80000000,
    cash: 350,
    list:[
      { item: 1113185, count: 1 },
      { item: 2450000, count: 3 },
      { item: 5220000, count: 5 },
    ]
  },
  // 150 級
  {
    meso: 90000000,
    cash: 450,
    list:[
      { item: 2450000, count: 3 },
      { item: 5220000, count: 5 },
    ]
  },
  // 200 級
  {
    meso: 100000000,
    cash: 550,
    list:[
      { item: 5220000, count: 50 },
    ]
  }
];

// 格式化楓幣
function thousands(num){
  var str = num.toString();
  var reg = str.indexOf(".") > -1 ? /(\d)(?=(\d{3})+\.)/g : /(\d)(?=(?:\d{3})+$)/g;
  return str.replace(reg,"$1,");
}

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  var level = cm.getPlayer().getLevel();

  if (mode == -1) {
    cm.dispose();
  } else {
    if (status >= 0 && mode == 0) {
      cm.sendOk("加油升級吧！");
      cm.dispose();
      return;
    }

    if (mode == 1) {
      status++;
    } else {
      status--;
    }

    if (status == 0) {
      // 判斷是否領取或符合資格
      for (var i = 0; i < log.length; i++) {
        var record = log[i] + "級獎勵";

        if (cm.getBossLog2(record) >= 1) {
          receiveStatus.push("#d(已領取)#b");
        } else if (level >= log[i] && cm.getBossLog2(record) < 1) {
          receiveStatus.push("#r(可領取)#b");
        } else {
          receiveStatus.push("");
        }
      }

      var msg = "#k請選擇你要領取的等級獎勵(#r請確保背包有5格以上空間#k)：";
      for (var i = 0; i < log.length; i++) {
        msg += "\r\n#L" + i + "##b領取" + log[i] + "級獎勵" + receiveStatus[i] + "#l";
      }
      cm.sendSimple(msg);
    } else if (status == 1) {
      var selected = log[selection];
      var record = selected + "級獎勵";

      if (cm.getBossLog2(record) >= 1) {
        cm.sendOk("您已經領取過" + selected + "級獎勵了！做人不能太貪心！");
        cm.dispose();
      } else if (level >= selected) {
        var msg = "#e========你已成功領取" + record + "#k：========#n\r\n";

        // 記錄到 db
        cm.setBossLog2(record);

        // 獲取楓幣及 GASH
        var meso = rewards[selection].meso;
        var cash = rewards[selection].cash;
        cm.gainMeso(meso);
        cm.getPlayer().modifyCSPoints(1, cash, true);
        msg += "#r" + thousands(meso) + "#k 楓幣\r\n#r" + cash + "#k GASH\r\n";

        // 獲取道具獎勵
        var rewardList = rewards[selection].list;
        for (var i = 0; i < rewardList.length; i++) {
          var item = rewardList[i].item;
          var count = rewardList[i].count;
          // 紀錄獲取的獎勵內容
          msg += "#i" + item +"##z" + item + "# * #r" + count + "#k\r\n";
          // 給予獎勵
          cm.gainItem(item, count);
        }

        cm.sendOk(msg);
        cm.dispose();
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
