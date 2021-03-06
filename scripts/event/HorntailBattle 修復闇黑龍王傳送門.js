/*
 * This file is part of the OdinMS Maple Story Server
    Copyright (C) 2008 Patrick Huy <patrick.huy@frz.cc>
                       Matthias Butz <matze@odinms.de>
                       Jan Christian Meyer <vimes@odinms.de>
    This program is free software: you can redistribute it and/or modify
    it under the terms of the GNU Affero General Public License version 3
    as published by the Free Software Foundation. You may not use, modify
    or distribute this program under any other version of the
    GNU Affero General Public License.
    This program is distributed in the hope that it will be useful,
    but WITHOUT ANY WARRANTY; without even the implied warranty of
    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
    GNU Affero General Public License for more details.
    You should have received a copy of the GNU Affero General Public License
    along with this program.  If not, see <http://www.gnu.org/licenses/>.

	THIS  FILE WAS MADE BY JVLAPLE. REMOVING THIS NOTICE MEANS YOU CAN'T USE THIS SCRIPT OR ANY OTHER SCRIPT PROVIDED BY JVLAPLE.
 */

/*
 * @Author Jvlaple
 *
 * Horntail Party Quest
 *
 * 前置修復 By 宗達
 */
importPackage(java.lang);
importPackage(java.awt);

importPackage(Packages.world);
importPackage(Packages.client);
importPackage(Packages.server.maps);
importPackage(Packages.server.life);
importPackage(Packages.tools);

var exitMap;
var instanceId;
var minPlayers = 3;

function init() {
  instanceId = 1;
}

function monsterValue(eim, mobId) {
  if (mobId == 8810000) {
    eim.setProperty("head1", "yes");
  } else if (mobId == 8810001) {
    eim.setProperty("head2", "yes");
  }
  return 1;
}

function setup() {
  exitMap = em.getChannelServer().getMapFactory().getMap(240050500); //Teh exit map :) <---------t
  var instanceName = "HontaleSquad"; // + instanceId;

  var eim = em.newInstance(instanceName);

  var mf = eim.getMapFactory();

  var map = mf.getMap(240060000); //wutt
  em.schedule("headOne", 3000);
  eim.startEventTimer(60000 * 600);
  eim.setProperty("head1", "no");
  eim.setProperty("head2", "no");
  eim.setProperty("head2spawned", "no");

  return eim;
}

function playerEntry(eim, player) {
  var map = eim.getMapInstance(240060000);
  player.changeMap(map, map.getPortal(0));
}

function playerDead(eim, player) {}

function playerRevive(eim, player) {
  if (eim.isLeader(player)) {
    //check for party leader
    //boot whole party and end
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
      playerExit(eim, party.get(i));
    }
    eim.dispose();
  } else {
    //boot dead player
    // If only 5 players are left, uncompletable:
    var party = eim.getPlayers();
    if (party.size() <= minPlayers) {
      for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
      }
      eim.dispose();
    } else playerExit(eim, player);
  }
}

function playerDisconnected(eim, player) {
  if (eim.isLeader(player)) {
    //check for party leader
    //PWN THE PARTY (KICK OUT)
    var party = eim.getPlayers();
    for (var i = 0; i < party.size(); i++) {
      if (party.get(i).equals(player)) {
        removePlayer(eim, player);
      } else {
        playerExit(eim, party.get(i));
      }
    }
    eim.dispose();
  } else {
    //KICK THE DISCONNECTED PLAYERS
    // If only 5 players are left, uncompletable:
    var party = eim.getPlayers();
    if (party.size() < minPlayers) {
      for (var i = 0; i < party.size(); i++) {
        playerExit(eim, party.get(i));
      }
      eim.dispose();
    } else playerExit(eim, player);
  }
}

function leftParty(eim, player) {}

function disbandParty(eim) {}

function playerExit(eim, player) {
  eim.unregisterPlayer(player);
  player.changeMap(exitMap, exitMap.getPortal(0));
}

function removePlayer(eim, player) {
  eim.unregisterPlayer(player);
  player.getMap().removePlayer(player);
  player.setMap(exitMap);
}

function clearPQ(eim) {
  //HTPQ does nothing special with winners
  var party = eim.getPlayers();
  for (var i = 0; i < party.size(); i++) {
    playerExit(eim, party.get(i));
  }
  eim.dispose();
}

function allMonstersDead(eim) {}

function cancelSchedule() {}

function scheduledTimeout() {
  var iter = em.getInstances().iterator();
  while (iter.hasNext()) {
    var eim = iter.next();
    if (eim.getPlayerCount() > 0) {
      var pIter = eim.getPlayers().iterator();
      while (pIter.hasNext()) {
        playerExit(eim, pIter.next());
      }
    }
    eim.dispose();
  }
}

function headOne(eim, player) {
  var iter = em.getInstances().iterator();
  while (iter.hasNext()) {
    var eim = iter.next();
    if (eim.getPlayerCount() > 0) {
      var pIter = eim.getPlayers().iterator();
      while (pIter.hasNext()) {
        pIter
          .next()
          .getClient()
          .getSession()
          .write(
            MaplePacketCreator.serverNotice(
              6,
              "The Enormous Creature is Approaching from the Deep Cave..."
            )
          );
      }
    }
    var theMap = eim.getMapFactory().getMap(240060000);
    var mob = em.getMonster(8810024);
    eim.registerMonster(mob);
    var headd = theMap.spawnMonsterOnGroundBelow(
      mob,
      new java.awt.Point(850, 230)
    ); //Spawn the head
  }
}

function headTwo(eim, player) {
  var iter = em.getInstances().iterator();
  while (iter.hasNext()) {
    var eim = iter.next();
    if (eim.getPlayerCount() > 0) {
      var pIter = eim.getPlayers().iterator();
      while (pIter.hasNext()) {
        pIter
          .next()
          .getClient()
          .getSession()
          .write(
            MaplePacketCreator.serverNotice(
              6,
              "Watch out for Horntail... Be prepared for a long fight."
            )
          );
      }
    }
    var theMap = eim.getMapFactory().getMap(240060100);
    var mob = em.getMonster(8810025);
    eim.registerMonster(mob);
    var headdd = theMap.spawnMonsterOnGroundBelow(
      mob,
      new java.awt.Point(-345, 230)
    ); //Spawn the head
  }
}

function changedMap(eim, player, mapid) {
  if (mapid < 240060000 || mapid > 240060200) {
    eim.unregisterPlayer(player);
  }
}
