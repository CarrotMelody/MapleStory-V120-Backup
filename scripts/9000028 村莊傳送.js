/**
 * 村莊傳送
 * 2022/06/21 簡化
 * 日期處理及血統驗證區為個人服新增地圖, 可自行刪除
 */
var status = 0;
// 日期處理
var objDate = new Date();
var Month = objDate.getMonth();
var MonthS = [
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
var tzc = objDate.getDate();
var Year = objDate.getFullYear();

var mapList = [
  ["維多利亞港", 104000000],
  ["弓箭手村", 100000000],
  ["魔法森林",  101000000],
  ["勇士之村", 102000000],
  ["墮落城市", 103000000],
  ["鯨魚號", 120000000],
  ["耶雷弗", 130000000],
  ["天空之城", 200000000],
  ["冰原雪域", 211000000],
  ["水世界", 230000000],
  ["童話村", 222000000],
  ["玩具城", 220000000],
  ["東方神州", 701000000],
  ["武陵", 250000000],
  ["少林寺", 702000000],
  ["不夜城", 741000000],
  ["新葉城", 600000000],
  ["神木村", 240000000],
  ["都會潮流區", 550000000],
  ["馬加提亞", 261000000],
  ["地球防衛本部", 221000000],
  ["西門町", 740000000],
  ["昭和村", 801000000],
  ["馬來西亞鄉村鎮", 551000000],
  ["新加坡機場", 540010000],
  ["古代神社", 800000000],
  ["上海豫園", 701000200],
  ["靈藥幻境", 251000000],
  ["艾靈森林", 300000000],
  ["黃金寺廟", 501000000],
  ["少林寺藏經閣", 702100000]
];

function start() {
  status = -1;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 1) {
    status++;
  } else {
    status--;
    cm.dispose();
    return;
  }

  if (status == 0) {
    var msg = "#k我是村莊傳送員，請選擇你的目的地：#b\r\n#L99#血統驗證區#r【每日限制一次，機率掉落#i4001456#】#k#l";
    // 遍歷選項
    for (var i = 0; i < mapList.length; i++) {
      if (i % 4 === 0 || i === 0) {
        msg += "\r\n\\r\n";
      }
      msg += "#L" + i + "#" + mapList[i][0] + "#l";;
    }
    cm.sendSimple(msg);
  } else if (status == 1) {
    // selection 99 : 血統驗證區 (個人端口新增地圖, 大家可以自行刪除)
    if (selection === 99) {
      var playerName = cm.getPlayer().getName();
      var text = playerName + Year + "年" + MonthS[Month] + tzc + "日xtyzq";
      var record = cm.getBossLog2(text);
      // 檢查 db 中是否已有紀錄, 若有代表今日已經去過
      if (record == 0) {
        // 重置地圖
        cm.getMap(999999993).resetFully(); 
        // 新增紀錄
        cm.setBossLog2(text);
        cm.warp(999999993, 0);
      } else {
        cm.sendOk("今天去過血統驗證區！！不要太貪心!");
        cm.dispose();
      }
    } else {
      // 除血統驗證區以外的地圖
      cm.warp(mapList[selection][1], 0);
    }
    // 傳送成功
    cm.sendOk("我已經將你傳送到#r" + cm.getMap().getMapName() + "#n#k了。歡迎再次光臨！");
    cm.dispose();
  }
}
