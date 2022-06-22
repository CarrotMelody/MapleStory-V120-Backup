/*
	This file is part of the OdinMS Maple Story Server
	Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc> 
					   Matthias Butz <matze@odinms.de>
					   Jan Christian Meyer <vimes@odinms.de>

	This program is free software: you can redistribute it and/or modify
	it under the terms of the GNU Affero General Public License as
	published by the Free Software Foundation version 3 as published by
	the Free Software Foundation. You may not use, modify or distribute
	this program under any other version of the GNU Affero General Public
	License.

	This program is distributed in the hope that it will be useful,
	but WITHOUT ANY WARRANTY; without even the implied warranty of
	MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
	GNU Affero General Public License for more details.

	You should have received a copy of the GNU Affero General Public License
	along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

/**
 * Guild Alliance NPC
 */

var status;
var choice;
var guildName;
var partymembers;

function start() {
	partymembers = cm.getPartyMembers();
	status = -1;
	action(1, 0, 0);
}

function action(mode, type, selection) {
	if (mode == 1) {
		status++;
	} else {
		cm.dispose();
		return;
	}
	if (status == 0) {
		cm.sendSimple("嗨！我是 #b雷娜里歐#k\r\n#b#L0#你能告訴我什麼是公會聯盟嗎？#l\r\n#L1#如何才能創建公會聯盟？#l\r\n#L2#我要創建公會聯盟。#l\r\n#L3#我想擴充公會聯盟的人數。#l\r\n#L4#我想解散公會聯盟。#l");
	} else if (status == 1) {
		choice = selection;
		if (selection == 0) {
			cm.sendOk("公會聯盟顧名思義就是多個公會聯合起來，而我是負責管理這些公會聯盟的人。");
			cm.dispose();
		} else if (selection == 1) { // 如何才能創建公會聯盟？
			cm.sendOk("若需要創建公會聯盟，需要兩個不同公會的公會長在同一個隊伍裡，這個隊伍的隊長就會是聯盟的盟主。");
			cm.dispose();
		} else if (selection == 2) { // 我要創建公會聯盟
			if (cm.getPlayer().getParty() == null || partymembers == null || partymembers.size() != 2 || !cm.isLeader()) {
				cm.sendOk("您的隊伍至少需要兩個人，或者您不是隊長。"); //Not real text
				cm.dispose();
			} else if (partymembers.get(0).getGuildId() <= 0 || partymembers.get(0).getGuildRank() > 1) {
				cm.sendOk("沒有加入公會不能創建公會聯盟。");
				cm.dispose();
			} else if (partymembers.get(1).getGuildId() <= 0 || partymembers.get(1).getGuildRank() > 1) {
				cm.sendOk("您的隊友沒有公會。");
				cm.dispose();
			} else {
				var gs = cm.getGuild(cm.getPlayer().getGuildId());
				var gs2 = cm.getGuild(partymembers.get(1).getGuildId());
				if (gs.getAllianceId() > 0) {
					cm.sendOk("如果您已經隸屬於其他公會聯盟，則無法再創建公會聯盟。");
					cm.dispose();
				} else if (gs2.getAllianceId() > 0) {
					cm.sendOk("您的隊友已隸屬於其他公會聯盟。");
					cm.dispose();
				} else if (cm.partyMembersInMap() < 2) {
					cm.sendOk("請讓您的隊友和您在同一張地圖中。");
					cm.dispose();
				} else {
					cm.sendYesNo("嗨！您有興趣創建公會聯盟嗎？");
				}
			}
		} else if (selection == 3) { // 我想擴充公會聯盟的人數
			if (cm.getPlayer().getGuildRank() == 1 && cm.getPlayer().getAllianceRank() == 1) {
				cm.sendYesNo("要擴充公會聯盟人數需要支付 10,000,000 楓幣，您確定要繼續嗎？"); //ExpandGuild Text
			} else {
				cm.sendOk("只有聯盟盟主才可以擴充公會聯盟人數。");
				cm.dispose();
			}
		} else if (selection == 4) { // 我想解散公會聯盟
			if (cm.getPlayer().getGuildRank() == 1 && cm.getPlayer().getAllianceRank() == 1) {
				cm.sendYesNo("您確定要解散公會聯盟嗎？");
			} else {
				cm.sendOk("只有聯盟盟主才可以解散公會聯盟。");
				cm.dispose();
			}
		}
	} else if (status == 2) {
		if (choice == 2) {
			cm.sendGetText("現在請輸入您的新公會聯盟的名稱：（最多 12 個字母）");
		} else if (choice == 3) {
			if (cm.getPlayer().getGuildId() <= 0) {
				cm.sendOk("您不能擴充一個不存在的公會聯盟。");
				cm.dispose();
			} else {
				if (cm.addCapacityToAlliance()) {
					cm.sendOk("您已經為您的聯盟擴充了容量。");
				} else {
					cm.sendOk("您的公會已經擴充到最大值，最大值為：5 個公會。");
				}
				cm.dispose();
			}
		} else if (choice == 4) {
			if (cm.getPlayer().getGuildId() <= 0) {
				cm.sendOk("您不能解散一個不存在的公會聯盟。");
				cm.dispose();
			} else {
				if (cm.disbandAlliance()) {
					cm.sendOk("您的公會聯盟已經解散");
				} else {
					cm.sendOk("解散公會聯盟時出錯");
				}
				cm.dispose();
			}
		}
	} else if (status == 3) {
		guildName = cm.getText();
		cm.sendYesNo("您確定將： #b" + guildName + "#k 設為您的公會聯盟名稱？");
	} else if (status == 4) {
		if (!cm.createAlliance(guildName)) {
			cm.sendNext("這個名稱不合法，請使用別的名稱。");
			status = 1;
			choice = 2;
		} else {
			cm.sendOk("您已成功組建公會聯盟。");
		}
		cm.dispose();
	}
}