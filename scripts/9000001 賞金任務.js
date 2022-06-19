/**
 * 賞金任務(純JS)
 */
importPackage(Packages.tools);
importPackage(Packages.server);
importPackage(Packages.constants);

var status = 0;
var db;
var choose = -1;

// 任務列表
var Job = new Array(
    // (任務代號, 任務名稱, 道具需求數, 怪物 id, 任務 code, 道具 id, 獎勵, 前置任務 code, 前置任務名稱)
    new nature("M-Z01", "白狼人獵殺", 333, 8140000, "mob1", 4000054, "GASH 150", "", ""), 
    new nature("L-ZV001", "水靈水靈，藍色？綠色？", 555, 1210103, "mob2", 4000037, "GASH 150", "", ""), 
    new nature("M-Z02", "龍族捕殺計畫！骷髏龍！", 1299, 8190003, "mob3", 4000274, "GASH 300", "", ""), 
    new nature("TM-01", "天空巢穴1，清理哈維！", 299, 8140001, "mob4", 4000238, "GASH 150", "", ""), 
    new nature("TM-02", "天空巢穴2，血腥哈維！", 499, 8140002, "mob5", 4000239, "GASH 300", "mob4", "TM-01,天空巢穴的通告1，清理哈維！"), 
    new nature("TM-03", "天空巢穴3，惡魔綿羊！", 699, 8140111, "mob6", 4000242, "GASH 500", "mob5", "TM-02,天空巢穴的通告2，血腥哈維！"), 
    new nature("L-ZV002", "恆心？賞金獵人鍛鍊<耐性>！", 1999, 9600021, "mob7", 4000404, "GASH 150\r\n#v1032139# 属性:(800).", "mob6", "TM-03,天空巢穴的通告3，惡魔綿羊！"), 
    new nature("M-Z03-01", "老虎捕殺計畫！小虎！", 399, 9800032, "mob8", 4000170, "GASH 150.", "", ""), 
    new nature("M-Z03-02", "老虎捕殺計畫！虎精！", 999, 9800034, "mob9", 4000171, "GASH 300.\r\n#v1142153# 屬性:(999).", "mob8", "M-Z03-01,老虎捕殺計畫！小虎！"), 
    new nature("B-01", "[BOSS]殭屍蘑菇王!", 9, 9300426, "mob10", 4000176, "GASH 300", "", ""), 
    new nature("B-02", "[BOSS]噴火龍!", 12, 9600031, "mob11", 4000235, "GASH 500", "mob10", "", "[BOSS]殭屍蘑菇王!"), 
    new nature("B-03", "[BOSS]海怒斯!", 3, 9500363, "mob12", 4000175, "#v1122148# 属性:(1500).\r\nGASH 500", "mob11", "[BOSS]噴火龍!")
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
        if (mode == 1) status++;
        else status--;
        if (status == 0) {
            var str = "";
            for (var i = 0; i < Job.length; i++) {
                str += "#L" + i + "##b代號" + Job[i].code + "," + Job[i].name + "#r( " + db.CalculationOfcompletion(Job[i].mobIdSql, Job[i].maxQuanlitys, Job[i].needSqlFirst) + " )#l" + "\r\n";
            }
            cm.sendSimple("#b#e<簡單模式>#n#k\r\n我是追殺全楓之谷怪物的賞金獵人，為了錢，我需要你的幫助！" + "#b我有下列任務給你選擇，你可以同時進行N個任務，但是部分高級任務需要完成前面的任務才能解鎖喔！" + "#r越高級的任務我給你的賞金也會越多！\r\n" +
            //"#b 所有任務會在晚上十二點清空 \r\n"+
            "#e<任務列表>#n\r\n" + str + "");
        } else if (status == 1) {
            choose = selection;
            var firstCode = "";
            if (Job[choose].needSqlFirst != "") {
                firstCode += "#d>>前置任務>>  代號" + Job[choose].needSqlFirstCode;
            }
            cm.sendSimple(
                "想要完成這項任務，我需要你去擊敗#r" + Job[choose].maxQuanlitys + //需要最大怪物数量
                "只#o" +  Job[choose].mobId + "##k,然後收回怪物道具#b#z" + Job[choose].mobNeedItem + "# " + //需要怪物掉落物品名稱
                Job[choose].maxQuanlitys + "個，它的樣子是:#v" + Job[choose].mobNeedItem + "# " + //需要最大怪物數量
                "\r\n" + "當前你有:" + "#r" + cm.itemQuantity(Job[choose].mobNeedItem) + "#b個可以上交" + "\r\n" + "#d>>任務進度>>  #e#r" +
                db.CalculationOfcompletion(Job[choose].mobIdSql, Job[choose].maxQuanlitys, Job[choose].needSqlFirst) + 
                "#n\r\n" + firstCode + "#n\r\n" + "#L0##b交差#l\r\n" + "#L1##r領取賞金#l\r\n" + "#L2##b查看懸賞獎勵#l\r\n"
            );
        } else if (status == 2) {
            if (selection < 2) {
                //确定是否有資格
                if (Job[choose].needSqlFirst != "" && db.getMobQuantitys(Job[choose].needSqlFirst) >= 0) {
                    cm.sendOk("抱歉，你需要先完成前置任務:#b\r\n" + Job[choose].needSqlFirstCode);
                    cm.dispose();
                    return;
                }
            }
            if (selection == 0) {
                //上交物品
                if (db.getMobQuantitys(Job[choose].mobIdSql) >= Job[choose].maxQuanlitys) {
                    cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了，請領取賞金!");
                    cm.dispose();
                    return;
                }
                if (db.getMobQuantitys(Job[choose].mobIdSql) < 0) {
                    cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了,該項任務不能重復!");
                    cm.dispose();
                    return;
                }
                cm.sendGetText("當前你有:" + "#r" + cm.itemQuantity(Job[choose].mobNeedItem) + "#k個可以上交." + "\r\n" + 
                    "請輸入個數,當前#d任務進度#k>> #e#r(" + db.CalculationOfcompletion(Job[choose].mobIdSql, Job[choose].maxQuanlitys, Job[choose].needSqlFirst) + ")");
            } else if (selection == 1) {
                // 領取賞金
                if (db.getMobQuantitys(Job[choose].mobIdSql) >= Job[choose].maxQuanlitys) {
                    gainReword(choose);
                } else if (db.getMobQuantitys(Job[choose].mobIdSql) < 0) {
                    cm.sendOk("抱歉，該項任務你已經#b#e完成#n#k了,該項任務不能重復!");
                    cm.dispose();
                    return;
                } else {
                    cm.sendOk("現在還不能領取喔！還差那麼一點點.");
                }
                cm.dispose();
            } else if (selection == 2) {
                //查看懸賞獎勵
                cm.sendOk("#e#b<代號-" + Job[choose].code + ">#n#k \r\n\r\n" + Job[choose].reword + "\r\n\r\n\t\t\t\t");
                cm.dispose();
            }
        } else if (status == 3) {
            var input_num = parseInt(cm.getText());
            if (isNaN(input_num)) {
                cm.sendOk("請輸入數字！");
                cm.dispose();
                return;
            }
            if (cm.haveItem(Job[choose].mobNeedItem, input_num)) {
                cm.gainItem(Job[choose].mobNeedItem, -input_num);
                db.gainMobQuantitys(Job[choose].mobIdSql, input_num);
                cm.sendOk("上交成功！請繼續努力！");
            } else {
                cm.sendOk("輸入錯誤！");
            }
            cm.dispose();
        }

    }
}

// 初始化
function nature(code, name, mq, mobid, sql, item, wd, nd, ndcd) {
    this.code = code;
    this.name = name;
    this.maxQuanlitys = mq;
    this.mobId = mobid;
    this.mobIdSql = sql;
    this.mobNeedItem = item;
    this.reword = wd;
    //需要前置任務
    this.needSqlFirst = nd;
    //前置任務 code
    this.needSqlFirstCode = ndcd;
}

// 獎勵
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
    db.gainMobQuantitys(Job[choose].mobIdSql, -(db.getMobQuantitys(Job[choose].mobIdSql) + 1));
    cm.sendOk("恭喜你完成了任務，獲得了賞金！");
    cm.worldMessage(6,"[賞金任務]:恭喜玩家「"+ cm.getPlayer().getName() + "」完成了代號:" + Job[choose].code + "<" + Job[choose].name + ">任務！");
}

// 給予獎勵
function giveItem(id, shuxing, txt) {
    var ii = MapleItemInformationProvider.getInstance();
    var type = GameConstants.getInventoryType(id);
    var toDrop = ii.randomizeStats(ii.getEquipById(id)).copy(); // 生成一個 Equip 類別

    toDrop.setLevel(0);
    toDrop.setStr(shuxing);
    toDrop.setDex(shuxing);
    toDrop.setInt(shuxing);
    toDrop.setLuk(shuxing);
    toDrop.setHp(shuxing);
    toDrop.setMp(shuxing);
    toDrop.setMatk(shuxing);
    toDrop.setWatk(shuxing);
    cm.getPlayer().getInventory(type).addItem(toDrop); // 放入背包
    cm.getC().getSession().write(MaplePacketCreator.addInventorySlot(type, toDrop)); // 刷新背包

    cm.worldMessage(6,"[賞金任務]:恭喜玩家「"+ cm.getPlayer().getName() + "」完成了代號:" + Job[choose].code + "<" + Job[choose].name + ">任務！");
}

// db
var dataBaseOperate = function() {
    this.db = Packages.database.DatabaseConnection.getConnection();
    /* 獲取值 */
    this.getMobQuantitys = function(mobid) {
        var ps = this.db.prepareStatement("SELECT * FROM kill_mob WHERE character_id = ?");
        ps.setInt(1, cm.getPlayer().getId());
        var rs = ps.executeQuery();
        if (!rs.next()) {
            this.addNewCharacter(); // 增加新數據
            return 0;
        }
        var quantitys = rs.getInt(mobid);
        rs.close();
        ps.close();
        return quantitys;
    }
    /* 創建新數據 */
    this.addNewCharacter = function() {
        var ps = this.db.prepareStatement("INSERT INTO kill_mob (character_id) VALUES (?)");
        ps.setInt(1, cm.getPlayer().getId());
        ps.executeUpdate();
        ps.close();
    }
    /* 增加怪物數量 */
    this.gainMobQuantitys = function(mobid, quantity) {
        var ps = this.db.prepareStatement("UPDATE kill_mob SET " + mobid + " = ? WHERE character_id = ?");
        ps.setInt(1, this.getMobQuantitys(mobid) + quantity);
        ps.setInt(2, cm.getPlayer().getId());
        ps.executeUpdate();
        ps.close();
    }
    /* 完成情况計算*/
    this.CalculationOfcompletion = function(mobid, max, needSqlFirst) {
        if (needSqlFirst != "" && this.getMobQuantitys(needSqlFirst) >= 0) {
            return "#k!前置任務#r";
        }
        if (this.getMobQuantitys(mobid) >= max) {
            return "#d領賞金#r";
        } else if (this.getMobQuantitys(mobid) < 0) {
            return "已完成";
        } else if (this.getMobQuantitys(mobid) == 0) {
            return "可開始";
        } else {
            return this.getMobQuantitys(mobid) + " / " + max;
        }
    }

}

/**
    需要在 db 新增 table

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