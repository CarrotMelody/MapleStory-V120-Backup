-- ----------------------------
-- Table structure for bank
-- ----------------------------
DROP TABLE IF EXISTS `bank`;
CREATE TABLE `bank` (
  `id` int(11) NOT NULL auto_increment,
  `charid` int(11) NOT NULL,
  `money` int(11) NOT NULL,
  PRIMARY KEY  (`id`),
  UNIQUE KEY `charid` (`charid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=latin1;