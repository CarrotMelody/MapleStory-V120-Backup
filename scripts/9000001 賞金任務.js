/**
 * 賞金任務(純JS)
 * 2022/06/26
 */
var status = 0;
var db;
var choose = -1; // 選擇的任務
var needSqlFirst, needSqlFirstCode, maxQuantities, mobNeedItem, mobIdSql, mobQuantities;

// 任務列表
var taskList = new Array(
  new task("M-Z01", "白狼人獵殺", 333, 8140000, "mob1", 4000054, "GASH 150", "", ""), 
  new task("L-ZV001", "水靈水靈，藍色？綠色？", 555, 1210103, "mob2", 4000037, "GASH 150", "", ""), 
  new task("M-Z02", "龍族捕殺計畫！骷髏龍！", 1299, 8190003, "mob3", 4000274, "GASH 300", "", ""), 
  new task("TM-01", "天空巢穴1，清理哈維！", 299, 8140001, "mob4", 4000238, "GASH 150", "", ""), 
  new task("TM-02", "天空巢穴2，血腥哈維！", 499, 8140002, "mob5", 4000239, "GASH 300", "mob4", "TM-01,天空巢穴的通告1，清理哈維！"), 
  new task("TM-03", "天空巢穴3，惡魔綿羊！", 699, 8140111, "mob6", 4000242, "GASH 500", "mob5", "TM-02,天空巢穴的通告2，血腥哈維！"), 
  new task("L-ZV002", "恆心？賞金獵人鍛鍊<耐性>！", 1999, 9600021, "mob7", 4000404, "GASH 150\r\n#v1032139# 属性:(800).", "mob6", "TM-03,天空巢穴的通告3，惡魔綿羊！"), 
  new task("M-Z03-01", "老虎捕殺計畫！小虎！", 399, 9800032, "mob8", 4000170, "GASH 150.", "", ""), 
  new task("M-Z03-02", "老虎捕殺計畫！虎精！", 999, 9800034, "mob9", 4000171, "GASH 300.\r\n#v1142153# 屬性:(999).", "mob8", "M-Z03-01,老虎捕殺計畫！小虎！"), 
  new task("B-01", "[BOSS]殭屍蘑菇王!", 9, 9300426, "mob10", 4000176, "GASH 300", "", ""), 
  new task("B-02", "[BOSS]噴火龍!", 12, 9600031, "mob11", 4000235, "GASH 500", "mob10", "", "[BOSS]殭屍蘑菇王!"), 
  new task("B-03", "[BOSS]海怒斯!", 3, 9500363, "mob12", 4000175, "#v1122148# 属性:(1500).\r\nGASH 500", "mob11", "[BOSS]噴火龍!")
);

function start() {
  status = -1;
  db = new dataBaseOperate();
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == -1) {
    cm.dispose();
  } else {
    if (status == 0 && mode == 0) {
      cm.dispose();
      return;
    }

    if (mode == 1) {
      status++;
    } else {
      status--;
    }

    if (status == 0) {
      var msg = "#b#e<賞金任務>#n#k\r\n我是追殺全楓之谷怪物的賞金獵人，為了錢，我需要你的幫助！我有下列任務給你選擇，你可以同時進行 N 個任務，但是部分高級任務需要完成前面的任務才能解鎖喔！" + 
          "#r越高級的任務我給你的賞金也會越多！\r\n\r\n#e<任務列表>#n\r\n";

      for (var i = 0; i < taskList.length; i++) {
        msg += "#L" + i + "##k代號 #b" + taskList[i].code + "#k," + taskList[i].name + "#r( " + db.CalculationOfcompletion(taskList[i].mobIdSql, taskList[i].maxQuantities, taskList[i].needSqlFirst) + " )#l" + "\r\n";
      }

      cm.sendSimple(msg);
    } else if (status == 1) {
      choose = selection;
      needSqlFirst = taskList[choose].needSqlFirst; // 是否需要完成前置任務
      needSqlFirstCode = taskList[choose].needSqlFirstCode; // 需要完成的前置任務代碼
      maxQuantities = taskList[choose].maxQuantities; // 需要最大怪物數量
      mobNeedItem = taskList[choose].mobNeedItem; // 完成任務需要的道具
      mobIdSql = taskList[choose].mobIdSql; // 任務在 db 中的識別 id
      mobQuantities = db.getMobQuantitys(mobIdSql); // 完成進度

      var firstCode = "";
      if (needSqlFirst != "") {
        firstCode += "#d<<前置任務>>  #k#e代號" + needSqlFirstCode + "#n";
      }
  
      var msg = "想要完成這項任務，我需要你去擊敗#r" + maxQuantities + " 隻#o" + taskList[choose].mobId + "##k，然後收回怪物道具#b#z " + mobNeedItem + "##r " +
        maxQuantities + "#k 個，它的樣子是：#v" + mobNeedItem + "#\r\n\r\n當前你有：#r" + cm.itemQuantity(mobNeedItem) + "#k 個可以上交" + "\r\n" + 
        "\r\n#d<<任務進度>>  #e#r" + db.CalculationOfcompletion(mobIdSql, maxQuantities, needSqlFirst) + "#n\r\n" + firstCode + 
        "#n\r\n#L0##b交差#l\r\n#L1##r領取賞金#l\r\n#L2##k查看懸賞獎勵#l";

      cm.sendSimple(msg);
    } else if (status == 2) {
      if (selection < 2) {
        // 檢查是否已完成前置
        if (needSqlFirst != "" && db.getMobQuantitys(needSqlFirst) >= 0) {
          cm.sendOk("抱歉，你需要先完成前置任務:#b\r\n" + needSqlFirstCode);
          cm.dispose();
          return;
        }
      }
      /* 交差 */
      if (selection == 0) {
        // 上交任務需求物品
        if (mobQuantities >= maxQuantities) {
          cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了，請領取賞金!");
          cm.dispose();
          return;
        }
        // 檢查是否已完成
        if (mobQuantities < 0) {
          cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了，該任務不能重複解！");
          cm.dispose();
          return;
        }

        cm.sendGetText( "當前#d<<任務進度#k>> #e#r(" + db.CalculationOfcompletion(mobIdSql, maxQuantities, needSqlFirst) + ")\r\n" + 
          "#k當前你有：" + "#r" + cm.itemQuantity(mobNeedItem) + "#k 個可以上交。" + "\r\n" + "請輸入欲上交個數：");
      } else if (selection == 1) {
        /* 領取賞金 */
        if (mobQuantities >= maxQuantities) {
          gainReword(choose);
        } else if (mobQuantities < 0) {
          cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了，該任務不能重複解！");
          cm.dispose();
          return;
        } else {
          cm.sendOk("現在還不能領取喔！任務還沒有完成。");
        }
        cm.dispose();
      } else if (selection == 2) {
        /* 查看懸賞獎勵 */
        cm.sendOk("#e#b<代號-" + taskList[choose].code + ">#n#k \r\n\r\n" + taskList[choose].reward + "\r\n\r\n\t\t\t\t");
        cm.dispose();
      }
    } else if (status == 3) {
      // 自行輸入要上交的任務道具數量
      var num = parseInt(cm.getText());
      // 檢查輸入是否為數字
      if (isNaN(num)) {
        cm.sendOk("請輸入數字！");
        cm.dispose();
        return;
      }
      // 檢查身上是否真的有這個數量的道具
      if (cm.haveItem(mobNeedItem, num)) {
        // 若超過需求數量則只交出需求數量, 不多給
        var quantities = num;
        if (num > maxQuantities) {
          quantities = maxQuantities;
        }
        cm.gainItem(mobNeedItem, -quantities);
        db.gainMobQuantitys(mobIdSql, quantities);
        cm.sendOk("上交成功！請繼續努力！");
      } else {
        cm.sendOk("您身上沒有這麼多個#r#z" + mobNeedItem + "##k，請再繼續收集吧！");
      }
      cm.dispose();
    }
  }
}

/* 任務實例 */
function task(code, name, quantities, mobid, sql, item, reward, needSql, needTask) {
  this.code = code; // 任務代號
  this.name = name; // 任務名稱
  this.maxQuantities = quantities; // 任務道具需求數
  this.mobId = mobid; // 任務怪物 id
  this.mobIdSql = sql; // 任務 SQL id
  this.mobNeedItem = item; // 需求道具 id
  this.reward = reward; // 獎勵
  this.needSqlFirst = needSql; // 前置任務 SQL id
  this.needSqlFirstCode = needTask; // 前置任務名稱
}

/* 獲取獎勵 */
function gainReword(choose) {
  switch (choose) {
    case 0:
      cm.getPlayer().modifyCSPoints(1, 150, true);
      break;
    case 1:
      cm.getPlayer().modifyCSPoints(1, 150, true);
      break;
    case 2:
      cm.getPlayer().modifyCSPoints(1, 300, true);
      break;
    case 3:
      cm.getPlayer().modifyCSPoints(1, 150, true);
      break;
    case 4:
      cm.getPlayer().modifyCSPoints(1, 300, true);
      break;
    case 5:
      cm.getPlayer().modifyCSPoints(1, 500, true);
      break;
    case 6:
      cm.getPlayer().modifyCSPoints(1, 150, true);
      break;
    case 7:
      cm.getPlayer().modifyCSPoints(1, 150, true);
      break;
    case 8:
      cm.getPlayer().modifyCSPoints(1, 300, true);
      break;
    case 9:
      cm.getPlayer().modifyCSPoints(1, 500, true);
      break;
    case 10:
      cm.getPlayer().modifyCSPoints(1, 500, true);
      break;
    case 11:
      cm.getPlayer().modifyCSPoints(1, 500, true);
      break;
    default:
      break;
  }
  db.gainMobQuantitys(mobIdSql, -(db.getMobQuantitys(mobIdSql) + 1));
  cm.sendOk("恭喜你完成了任務，獲得了賞金！");
  var msg = "【賞金任務】恭喜玩家「" + cm.getPlayer().getName() + "」完成了代號：" + taskList[choose].code + "<" + taskList[choose].name + ">任務！";
  cm.worldMessage(5, msg);
}

/* 資料庫部分業務邏輯 */
var dataBaseOperate = function () {
  this.db = Packages.database.DatabaseConnection.getConnection();

  /* 獲取角色任務數據 */
  this.getMobQuantitys = function (mobid) {
    var ps = this.db.prepareStatement("SELECT * FROM kill_mob WHERE character_id = ?");
    ps.setInt(1, cm.getPlayer().getId());
    var rs = ps.executeQuery();

    if (!rs.next()) {
      this.addNewCharacter(); //增加新数据
      return 0;
    }

    var quantitys = rs.getInt(mobid);
    rs.close();
    ps.close();
    return quantitys;
  }

  /* 創建新數據 */
  this.addNewCharacter = function () {
    var ps = this.db.prepareStatement("INSERT INTO kill_mob (character_id) VALUES (?)");
    ps.setInt(1, cm.getPlayer().getId());
    ps.executeUpdate();
    ps.close();
  }

  /* 增加怪物數量 */
  this.gainMobQuantitys = function (mobid, quantity) {
    var ps = this.db.prepareStatement("UPDATE kill_mob SET " + mobid + " = ? WHERE character_id = ?");
    ps.setInt(1, this.getMobQuantitys(mobid) + quantity);
    ps.setInt(2, cm.getPlayer().getId());
    ps.executeUpdate();
    ps.close();
  }

  /* 完成情况計算 */
  this.CalculationOfcompletion = function (mobid, max, needSqlFirst) {
    if (needSqlFirst != "" && this.getMobQuantitys(needSqlFirst) >= 0) {
      return "#e#k!前置任務#n#r";
    }

    if (this.getMobQuantitys(mobid) >= max) {
      return "#e#d領賞金#n#r";
    } else if (this.getMobQuantitys(mobid) < 0) {
      return "#e已完成#n";
    } else if (this.getMobQuantitys(mobid) == 0) {
      return "#e#b可開始#n#r";
    } else {
      return this.getMobQuantitys(mobid) + " / " + max;
    }
  }
}

/**
  1. 需要在 db 新增 table:

  SET FOREIGN_KEY_CHECKS=0;
  -- ----------------------------
  -- Table structure for `kill_mob`
  -- ----------------------------
  DROP TABLE IF EXISTS `kill_mob`;
  CREATE TABLE `kill_mob` (
    `character_id` int(11) NOT NULL DEFAULT '0',
    `mob1` int(11) NOT NULL DEFAULT '0',
    `mob2` int(11) NOT NULL DEFAULT '0',
    `mob3` int(11) NOT NULL DEFAULT '0',
    `mob4` int(11) NOT NULL DEFAULT '0',
    `mob5` int(11) NOT NULL DEFAULT '0',
    `mob6` int(11) NOT NULL DEFAULT '0',
    `mob7` int(11) NOT NULL DEFAULT '0',
    `mob8` int(11) NOT NULL DEFAULT '0',
    `mob9` int(11) NOT NULL DEFAULT '0',
    `mob10` int(11) NOT NULL DEFAULT '0',
    `mob11` int(11) NOT NULL DEFAULT '0',
    `mob12` int(11) NOT NULL DEFAULT '0',
    `mob13` int(11) NOT NULL DEFAULT '0',
    PRIMARY KEY (`character_id`),
    CONSTRAINT `kill_mob_ibfk_1` FOREIGN KEY (`character_id`) REFERENCES `characters` (`id`) ON DELETE CASCADE
  ) ENGINE=InnoDB DEFAULT CHARSET=BIG5;
  -- ----------------------------
  -- Records of kill_mob
  -- ----------------------------
 */
