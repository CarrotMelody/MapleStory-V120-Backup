var status;
var chance;

function start() {
  status = -1;
  chance = Math.random() * 122;
  action(1, 0, 0);
}

function action(mode, type, selection) {
  if (mode == 1) status++;
  else {
    cm.dispose();
    return;
  }
  if (status == 0) {
    cm.sendAcceptDecline(
      "嗨！我正在主持一個小遊戲 #bColor Gamble#k! 您先選擇要使用的顏色，並為每種顏色下注，然後看球是否落在您的顏色上！"
    );
  } else if (status == 1) {
    //黑色 == 35%
    //藍色 == 35%
    //紅色 == 15%
    //紫色 == 10%
    //綠色 == 5%
    cm.sendSimple(
      "做出選擇: \r\n#e#L0#黑色 (25K 楓幣) \r\n#b#L1#藍色 (25K 楓幣) \r\n#r#L2#紅色 (45K 楓幣) \r\n#d#L3#紫色 (75k 楓幣) \r\n#g#L4#綠色 (125K 楓幣)"
    );
  } else if (selection == 0) {
    var chance = Math.random() * 100;
    if (cm.getMeso() >= 25000 && chance <= 40) {
      cm.sendOk(
        "#e你選擇的顏色: 黑色 \r\n#e#k滾出來的球顏色: 黑色 \r\n\r\n你贏了!! 恭喜你得到 2,000,000 楓幣!"
      );
      cm.gainMeso(2000000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 40 && chance <= 80) {
      cm.sendOk(
        "#e你選擇的顏色: 黑色 \r\n#e#k滾出來的球顏色: #b藍色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 80 && chance <= 105) {
      cm.sendOk(
        "#e你選擇的顏色: 黑色 \r\n#e#k滾出來的球顏色: #r紅色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 105 && chance <= 122) {
      cm.sendOk(
        "#e你選擇的顏色: 黑色 \r\n#e#k滾出來的球顏色: #d紫色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 95) {
      cm.sendOk(
        "#e你選擇的顏色: 黑色 \r\n#e#k滾出來的球顏色: #g綠色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else {
      cm.sendOk("您沒有下注正確的數量...");
      cm.dispose();
    }
  } else if (selection == 1) {
    var chance = Math.random() * 100;
    if (cm.getMeso() >= 25000 && chance <= 35) {
      cm.sendOk(
        "#e你選擇的顏色: #b藍色 \r\n#e#k滾出來的球顏色: #k黑色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 35 && chance <= 70) {
      cm.sendOk(
        "#e你選擇的顏色: #藍色 \r\n#e#k滾出來的球顏色: #b藍色 \r\n\r\n你贏了!! 恭喜你得到 2,000,000 楓幣!"
      );
      cm.gainMeso(2000000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 70 && chance <= 85) {
      cm.sendOk(
        "#e你選擇的顏色: #b藍色 \r\n#e#k滾出來的球顏色: #r紅色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 85 && chance <= 95) {
      cm.sendOk(
        "#e你選擇的顏色: #b藍色 \r\n#e#k滾出來的球顏色: #d紫色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else if (cm.getMeso() >= 25000 && chance > 95) {
      cm.sendOk(
        "#e你選擇的顏色: #b藍色 \r\n#e#k滾出來的球顏色: #g綠色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-25000);
      cm.dispose();
    } else {
      cm.sendOk("您沒有下注正確的數量...");
      cm.dispose();
    }
  } else if (selection == 2) {
    var chance = Math.random() * 100;
    if (cm.getMeso() >= 45000 && chance <= 35) {
      cm.sendOk(
        "#e你選擇的顏色: #r紅色 \r\n#e#k滾出來的球顏色: #k黑色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-45000);
      cm.dispose();
    } else if (cm.getMeso() >= 45000 && chance > 35 && chance <= 70) {
      cm.sendOk(
        "#e你選擇的顏色: #r紅色 \r\n#e#k滾出來的球顏色: #b藍色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-45000);
      cm.dispose();
    } else if (cm.getMeso() >= 45000 && chance > 70 && chance <= 85) {
      cm.sendOk(
        "#e你選擇的顏色: #r紅色 \r\n#e#k滾出來的球顏色: #r紅色 \r\n\r\n你贏了!! 恭喜你得到 3,000,000 楓幣!"
      );
      cm.gainMeso(3000000);
      cm.dispose();
    } else if (cm.getMeso() >= 45000 && chance > 85 && chance <= 95) {
      cm.sendOk(
        "#e你選擇的顏色: #r紅色 \r\n#e#k滾出來的球顏色: #d紫色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-45000);
      cm.dispose();
    } else if (cm.getMeso() >= 45000 && chance > 95) {
      cm.sendOk(
        "#e你選擇的顏色: #r紅色 \r\n#e#k滾出來的球顏色: #g綠色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-45000);
      cm.dispose();
    } else {
      cm.sendOk("您沒有下注正確的數量...");
      cm.dispose();
    }
  } else if (selection == 3) {
    var chance = Math.random() * 100;
    if (cm.getMeso() >= 75000 && chance <= 35) {
      cm.sendOk(
        "#e你選擇的顏色: #d紫色 \r\n#e#k滾出來的球顏色: #k黑色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-75000);
      cm.dispose();
    } else if (cm.getMeso() >= 75000 && chance > 35 && chance <= 70) {
      cm.sendOk(
        "#e你選擇的顏色: #d紫色 \r\n#e#k滾出來的球顏色: #b藍色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-75000);
      cm.dispose();
    } else if (cm.getMeso() >= 75000 && chance > 70 && chance <= 85) {
      cm.sendOk(
        "#e你選擇的顏色: #d紫色 \r\n#e#k滾出來的球顏色: #r紅色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-75000);
      cm.dispose();
    } else if (cm.getMeso() >= 75000 && chance > 85 && chance <= 95) {
      cm.sendOk(
        "#e你選擇的顏色: #d紫色 \r\n#e#k滾出來的球顏色: #d紫色 \r\n\r\n你贏了!! 恭喜你得到 5,000,000 楓幣!"
      );
      cm.gainMeso(5000000);
      cm.dispose();
    } else if (cm.getMeso() >= 725000 && chance > 95) {
      cm.sendOk(
        "#e你選擇的顏色: #d紫色 \r\n#e#k滾出來的球顏色: #g綠色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-75000);
      cm.dispose();
    } else {
      cm.sendOk("您沒有下注正確的數量...");
      cm.dispose();
    }
  } else if (selection == 4) {
    var chance = Math.random() * 100;
    if (cm.getMeso() >= 125000 && chance <= 35) {
      cm.sendOk(
        "#e你選擇的顏色: #g綠色 \r\n#e#k滾出來的球顏色: #k黑色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-125000);
      cm.dispose();
    } else if (cm.getMeso() >= 125000 && chance > 35 && chance <= 70) {
      cm.sendOk(
        "#e你選擇的顏色: #g綠色 \r\n#e#k滾出來的球顏色: #b藍色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-125000);
      cm.dispose();
    } else if (cm.getMeso() >= 125000 && chance > 70 && chance <= 85) {
      cm.sendOk(
        "#e你選擇的顏色: #g綠色 \r\n#e#k滾出來的球顏色: #r紅色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-125000);
      cm.dispose();
    } else if (cm.getMeso() >= 125000 && chance > 85 && chance <= 95) {
      cm.sendOk(
        "#e你選擇的顏色: #g綠色 \r\n#e#k滾出來的球顏色: #d紫色 \r\n\r\n你輸了!! 抱歉，請下次加油!"
      );
      cm.gainMeso(-125000);
      cm.dispose();
    } else if (cm.getMeso() >= 125000 && chance > 95) {
      cm.sendOk(
        "#e你選擇的顏色: #g綠色 \r\n#e#k滾出來的球顏色: #g綠色 \r\n\r\n你贏了!! 恭喜你得到 10,000,000 楓幣!"
      );
      cm.gainMeso(10000000);
      cm.dispose();
    } else {
      cm.sendOk("您沒有下注正確的數量...");
      cm.dispose();
    }
  }
}
