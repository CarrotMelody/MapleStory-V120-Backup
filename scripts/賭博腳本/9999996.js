/*
    NPC Name:Gachapon (Generic)
    Author:AngelSpirit
    Description:Multi-purpose Gachapon NPC, built to be easily editable and adaptable.
*/
importPackage(java.util);
importPackage(Packages.client.inventory);
importPackage(Packages.server);

//Constants -- change these to suit your needs

//Set to false to disable this NPC.
var enabled = true;

//Whether or not to allow players to view the list of rewards.  Note that GM's may always see the reward list, regardless of this setting.
var showRewards = false;

//Whether or not to show the individual chances of obtaining items.  Only useful if "showRewards" is set to true.
var showRewardChances = true;

//Rewards, listed as (ItemID, Quantity, Weight).  Weights are relative, and do not have to add up to 100.
var rewards = Array(1302000, 1, 20, 1302001, 1, 30, 4050000, 7, 70);

Constants = {
  //ItemID to use as the "ticket"
  Ticket: 5220000,
  //Number of free inventory slots the player must have in each tab -- do not set this lower than 1.
  FreeInventory: 2,
};

// INTERNAL VARS
var status = -1;
var rewardItems = Array();
var rewardWeights = Array();
var rewardQuantity = Array();
var totalWeights = Array();
var rng = new Random();

function start() {
  if (enabled || cm.getPlayer().isGM()) {
    //Split the reward items
    for (var i = 0; i < rewards.length; i++) {
      if (i % 3 == 0) {
        rewardItems.push(rewards[i]);
      } else if (i % 3 == 1) {
        rewardQuantity.push(rewards[i]);
      } else {
        rewardWeights.push(rewards[i]);
        //For each weight, generate the sum of all previous weights
        var total = 0;
        for (var k = 0; k < rewardWeights.length; k++) {
          total += rewardWeights[k];
        }
        totalWeights.push(total);
      }
    }
    action(1, 0, 0);
  } else {
    cm.sendOk(
      "有些東西在轉蛋機裡發出聲響, 然後完全停止。\r\n#r(轉蛋機當前處於禁用狀態)#k"
    );
    cm.dispose();
    return;
  }
}

function action(mode, type, selection) {
  if (mode == 1 && selection != 99) {
    status++;
  } else {
    cm.dispose();
    return;
  }

  if (status == 0) {
    cm.sendSimple(getMainMenu());
  } else {
    if (selection == 2) {
      //show rewards
      if (!showRewards && !cm.getPlayer().isGM()) {
        cm.sendOk("#r獎勵顯示已被禁用。#k\r\n#b#L99#Okay.#l#k");
        cm.dispose();
      } else {
        cm.sendOk(
          "此轉蛋機的獎勵清單： \r\n" +
            getRewardsDisplay() +
            "\r\n#b#L99#Okay.#l#k"
        );
        cm.dispose();
      }
    } else {
      //use ticket
      if (checkInventorySpace()) {
        if (cm.haveItem(Constants.Ticket, 1)) {
          cm.gainItem(Constants.Ticket, -1);
          var reward = getRewardIndex();
          cm.gainItem(rewardItems[reward], rewardQuantity[reward]);
          cm.sendSimple(getRewardMessage(reward));
        } else {
          cm.sendOk(
            "你並不擁有 #d#v" +
              Constants.Ticket +
              "##z" +
              Constants.Ticket +
              "##k.\r\n#b#L99#Okay.#l#k"
          );
          cm.dispose();
        }
      } else {
        cm.sendOk(
          "轉蛋機發出嗶嗶聲一次，然後停止。它沒有回應。  #r(你需要 " +
            Constants.FreeInventory +
            " 確保背包有空位)#k\r\n#b#L99#Okay.#l#k"
        );
        cm.dispose();
        return;
      }
    }
  }
}

function getMainMenu() {
  var retText = "轉蛋機發出低沉（喀啷）的聲音。\r\n#b";
  retText +=
    "#L1#使用 #k#d#v" +
    Constants.Ticket +
    "##z" +
    Constants.Ticket +
    "##k#b#l\r\n";
  if (showRewards || cm.getPlayer().isGM()) {
    retText += "#L2#顯示獎勵列表。#l\r\n";
  }
  retText += "#L99#(緩緩離開...)#l\r\n";
  retText += "#k";
  return retText;
}

function getRewardMessage(reward) {
  var retText =
    "轉蛋機發出嗶嗶聲。隨之而來的是一系列無法辨認的噪音，然後一個物品掉到了獎勵槽。你撿起來\r\n";
  retText += "#r您已獲得以下物品：#k\r\n#d";
  retText +=
    rewardQuantity[reward] +
    "x #v" +
    rewardItems[reward] +
    "##z" +
    rewardItems[reward] +
    "##k\r\n";
  retText +=
    "您目前剩下 #r" +
    getRemainingTickets() +
    "#k #z" +
    Constants.Ticket +
    "# \r\n";
  retText += "#b#L1#我想再轉蛋一次！#l\r\n";
  retText += "#L99#停止使用轉蛋機。#l#k\r\n";
  return retText;
}

function getRewardIndex() {
  //random # between 1 and the sum of all weights
  var weight = rng.nextInt(totalWeights[totalWeights.length - 1] + 1);
  var retIndex = 0;
  while (retIndex < totalWeights.length - 1) {
    if (
      weight < totalWeights[retIndex + 1] &&
      weight >= totalWeights[retIndex]
    ) {
      break;
    }
    retIndex++;
  }
  return retIndex;
}

//Check for slots in each tab
function checkInventorySpace() {
  for (var i = 1; i <= 5; i++) {
    if (
      cm
        .getPlayer()
        .getInventory(MapleInventoryType.getByType(i))
        .getNumFreeSlot() < Constants.FreeInventory
    ) {
      return false;
    }
  }
  return true;
}

function getInventoryType(itemID) {
  return Math.floor(itemID / 1000000);
}

function getRemainingTickets() {
  return cm
    .getPlayer()
    .getInventory(
      MapleInventoryType.getByType(getInventoryType(Constants.Ticket))
    )
    .countById(Constants.Ticket);
}

function getRewardsDisplay() {
  var ret = "#r";
  for (var i = 0; i < rewardItems.length; i++) {
    if (rewardQuantity[i] > 1) {
      //don't show the quantity if there's only one
      ret += rewardQuantity[i] + "x ";
    }
    ret += "#v" + rewardItems[i] + "##z" + rewardItems[i] + "# ";
    if (showRewardChances) {
      ret +=
        "#k#b(" +
        (
          (rewardWeights[i] / totalWeights[totalWeights.length - 1]) *
          100
        ).toFixed(3) +
        "%)#k#r";
    }
    ret += "\r\n";
  }
  ret += "#k";
  return ret;
}
