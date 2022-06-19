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
) ENGINE=InnoDB AUTO_INCREMENT=1416 DEFAULT CHARSET=latin1;