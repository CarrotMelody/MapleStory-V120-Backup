/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50520
Source Host           : localhost:3306
Source Database       : odinms2

Target Server Type    : MYSQL
Target Server Version : 50520
File Encoding         : 65001

Date: 2013-07-27 11:00:11
*/

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
