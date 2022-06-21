/**
 * 每日簽到
 * 2022/06/21 簡化
 */
 var status = 0;

 // 日期處理
 var objDate = new Date();
 var year = objDate.getFullYear();
 var day = objDate.getDay();
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
 var weekday = ["日", "一", "二", "三", "四", "五", "六"];
 var today = objDate.getDate(); // 今天是幾號
 
 // 獎勵列表: [道具id, 數量]
 var itemList = [
   null, // 索引值代表日, 日從 1 開始
   [5561000, 3], //1 任意門高級劵
   [5220000, 10], //2 轉蛋劵
   [2450000, 3], //3 獵人的幸運
   [2022179, 5], //4 紫色的蘋果
   [2022462, 3], //5 卡珊德拉的獎勵4
   [2022463, 3], //6 卡珊德拉的獎勵5
   [2450000, 2], //7 獵人的幸運
   [5220010, 3], //8 超級轉蛋劵
   [5510000, 5], //9 原地復活術
   [5201003, 2], //10 小鋼珠盒子(100)
   [2101120, 5], //11 魚怪召喚袋
   [2450000, 1], //12 獵人的幸運
   [2450000, 1], //13 獵人的幸運
   [2450000, 1], //14 獵人的幸運
   [5201001, 1], //15 小鋼珠盒子(500)
   [4000313, 200], //16 黃金楓葉
   [2101120, 5], //17 魚怪召喚袋
   [2101120, 5], //18 魚怪召喚袋
   [5220010, 1], //19 超級轉蛋劵
   [2022179, 5], //20 紫色的蘋果
   [2022179, 5], //21 紫色的蘋果
   [4000313, 200], //22 黃金楓葉
   [5220000, 30], //23 轉蛋劵
   [2022462, 5], //24 卡珊德拉的獎勵4
   [2022463, 5], //25 卡珊德拉的獎勵5
   [5201003, 3], //26 小鋼珠盒子(100)
   [4000313, 200], //27 黃金楓葉
   [5561000, 10], //28 任意門高級劵
   [5220000, 50], //29 轉蛋劵
   [5510000, 10], //30 原地復活術
   [5201001, 1], //31 小鋼珠盒子(500)
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
   }
 
   if (status == -1) {
     cm.dispose();
   }
 
   if (status == 0) {
     var days = 31; // 這個月總共幾天, 預設 30 天
     var punchDaysOfMonth = 0; // 本月累積簽到天數
 
     if ([0, 2, 4, 6, 7, 9, 11].indexOf(month) !== -1) {
       // 1,3,5,7,8,10,12月 都是 31 天
       days = 32;
     }
     if (month == 1) {
       // 2月 28 天
       days = 29;
     }
 
     for (var i = 1; i < days; i++) {
       // 獲取玩家該月份的簽到記錄天數
       var record = cm.getPlayer().getPrizeLog_n("" + year + "年" + monthList[month] + i + "日");
       punchDaysOfMonth += record;
     }
 
     var msg = "#e現在時間:#b" + year + "年" + monthList[month] + today + "日 星期" + weekday[day] + "\r\n#k" + 
       "本月累積簽到【 #r" + punchDaysOfMonth + "#k 】天\r\n" + 
       "#k本日在線時間【 #r" + cm.getOnlineTime() + "#k 】分\r\n\r\n" + 
       "#b*上線時間需滿#r 30 #b分鐘才可進行每日簽到\r\n" + 
       "#k今日的簽到獎勵為：#i" + itemList[today][0] + "##r * " + itemList[today][1] + "#k個！\r\n\r\n" +
       "#L0##r現在就要進行每日簽到！#l\r\n#k";
 
     cm.sendSimple(msg);
   } else if (status == 1) {
     if (selection == 0) {
       // 檢查背包空間是否能夠領取獎勵
       if (!cm.canHold(itemList[today][0], itemList[today][1])) {
         cm.sendOk("您的背包空間不足");
         cm.dispose();
       }
 
       /* 每天簽到 */
       var recordText = "" + year + "年" + monthList[month] + today + "日";
       // 若今日還沒簽到且在線時長已經超過半小時才能簽到
       if (cm.getPlayer().getPrizeLog_n(recordText) < 1 && cm.getOnlineTime() >= 30) {
         // 新增簽到記錄
         cm.getPlayer().setPrizeLog_n(recordText);
         // 獲取簽到獎勵
         cm.gainItem(itemList[today][0], itemList[today][1]);
         // cm.getPlayer().modifyCSPoints(1, 100, true);
         cm.sendOk("恭喜您成功進行簽到並獲得#i" + itemList[today][0] + "##r * " + itemList[today][1] +"#k個！");
         var notice = "【XX谷】：玩家 " + cm.getChar().getName() + " 已進行每日簽到！祝您擁有美好的一天！";
         cm.worldMessage(5, notice);
         cm.dispose();
       } else {
         // 已進行每日簽到 or 在線時長未達60分鐘
         if (cm.getPlayer().getPrizeLog_n(recordText) > 0) {
           cm.sendOk("已進行過每日簽到！");
         } else if (cm.getOnlineTime() < 30) {
           cm.sendOk("上線時間未達 #r30#k 分鐘無法打卡！");
         }
         cm.dispose();
       }
     }
   }
 }
 
 /* SRC 及 sql 檔自行找夢夢谷端, 太多要加的東西了 */