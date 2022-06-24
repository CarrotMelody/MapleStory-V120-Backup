/*
  算命 NPC
  2022/06/24
*/
var status = 0;
var fee = 1000000; // 算一次命的香油錢
var random = parseInt((Math.random() * 100) + 1);

// 抽籤結果
// [random下限, random上限, 籤的id, 結果, 說明]
var results = [
  [0, 5, 4031065, "大吉", 2, "一分耕耘，一分收穫。你的運氣正像盛開的花朵，現在已結成果實，是收穫的季節了。"],
  [5, 10, 4031066, "中吉", 1.8, "心中正直。理順法寬。聖無私語。終有分明。"],
  [10, 45, 4031067, "小吉", 1.4, "因遇害反得利。因無心，反得益。不管遇到的是龍般的巨大或虎般的可怕，都當勇敢的去面對。若能如此，則能有益。"],
  [45, 90, 4031069, "末吉", 1.2, "有否極泰來的好運，動起來就能提升運勢。"],
  [90, 95, 4031070, "凶", -1, "雖然困難，如能克服，雲開月出的時機馬上到來。"],
  [95, 100, 4031071, "大凶", -1.5, "命裡有時終須有，命裡無時莫強求。"],
]

// 日期處理
var objDate = new Date();
var month = objDate.getMonth();
var monthList = [
  "1月",
  "2月",
  "3月",
  "4月",
  "5月",
  "6月",
  "7月",
  "8月",
  "9月",
  "10月",
  "11月",
  "12月",
];
var date = objDate.getDate();
var year = objDate.getFullYear();

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
  if (mode == 1) {
    status++;
  } else {
    status--;
  }

  if (status == -1 || mode !== 1) {
    cm.sendOk("後悔了就再來吧。");
    cm.dispose();
    return;
  }

  /**
   * 大吉: 4031065
   * 吉: 4031066
   * 凶: 4031070
   * 大凶: 4031071
   */
  if (status == 0) {
     // 檢查今日是否已經抽過籤
     if (cm.getBossLog2(year + "年" + monthList[month] + date + "日算命") > 0) {
      cm.sendSimple("你今天已經算過命了，明天再來吧。");
      cm.dispose();
    } else {
      cm.sendNext("需要我為你算一簽嗎？\r\n #e總共有這幾種簽 : \r\n\r\n#v4031065#、#v4031066#、#v4031067#、#v4031069#、#v4031070#、#v4031071#" + 
        "\r\n如果運氣好抽到#v4031065#這支簽，可以獲得#r" + thousands(fee * 2) + "#k的楓幣，但如果運氣不好抽到#v4031071#的話，可是會需要添#r" + thousands(fee * 1.5) + "#k的香油錢哦！");
    }
  } else if (status == 1) {
    cm.sendSimple("算一卦也不容易，看我跟你有緣，一次收#r 100 #k萬楓幣怎麼樣？");
  } else if (status == 2) {
    cm.sendYesNo("你確定要給 #r" + thousands(fee) + "#k 元的香油錢嗎？");
  } else if (status == 3) {
    if (cm.getMeso() < fee) {
      cm.sendOk("沒有錢也不強求...");
      cm.dispose();
    } else if (cm.getMeso() + fee * 2 > 2000000000) { // 20e 滿幣
      cm.sendOk("#v5160001#:如果將#r" + (fee * 2) +"#k萬的楓幣給你的話會滿幣的！");
      cm.dispose();
    } else if (cm.getMeso() < fee * 1.5) {
      cm.sendOk("#v5160000#:你的錢可能不夠添香油錢喔！");
      cm.dispose();
    } else {
      // 記錄到 db
      cm.setBossLog2(year + "年" + monthList[month] + date + "日算命");

      for (var i = 0; i < results.length; i++) {
        if (random > results[i][0] && random <= results[i][1]) {
          var msg = "結果出爐:\r\n\r\n#v" + results[i][2] + "#\r\n\r\n此籤為#r" + results[i][3] + "#k。\r\n\r\n#b" + results[i][5] + "#k";
          cm.sendOk(msg);
          cm.gainMeso(fee * results[i][4]);
          cm.dispose();
        }
      }
    }
  }
}

/**
  1. 在 SRC 加上 bosslog2 相關的 function：

  ==src/scripting/NPCConversationManager.java==

  public int getBossLog2(String bossid) {
    return getPlayer().getBossLog2(bossid);
  }
 
  public void setBossLog2(String bossid) {
    getPlayer().setBossLog2(bossid);
  }

  ==src/client/MapleCharacter.java==

  public int getBossLog2(String bossid) {
    Connection con1 = DatabaseConnection.getConnection();
    try {
        int ret_count = 0;
        PreparedStatement ps;
        ps = con1.prepareStatement("select count(*) from bosslog2 where characterid = ? and bossid = ? ");
        ps.setInt(1, id);
        ps.setString(2, bossid);
        ResultSet rs = ps.executeQuery();
        if (rs.next())
            ret_count = rs.getInt(1);
        else
            ret_count = -1;
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
    } catch (Exception Ex) {}
  }

  2. SQL：

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
  ) ENGINE=InnoDB DEFAULT CHARSET=latin1;
 */
