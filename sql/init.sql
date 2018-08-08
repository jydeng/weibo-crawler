/*
 Navicat MySQL Data Transfer

 Source Server         : localhost
 Source Server Type    : MySQL
 Source Server Version : 80012
 Source Host           : localhost:3306
 Source Schema         : crawler

 Target Server Type    : MySQL
 Target Server Version : 80012
 File Encoding         : 65001

 Date: 08/08/2018 17:50:15
*/

SET NAMES utf8mb4;
SET FOREIGN_KEY_CHECKS = 0;

-- ----------------------------
-- Table structure for feeds
-- ----------------------------
DROP TABLE IF EXISTS `feeds`;
CREATE TABLE `feeds`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `uid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '微博id',
  `content` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '正文',
  `url` varchar(512) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '链接',
  `feed_time` datetime(0) NULL DEFAULT NULL COMMENT '发表时间'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Table structure for subscribe
-- ----------------------------
DROP TABLE IF EXISTS `subscribe`;
CREATE TABLE `subscribe`  (
  `id` varchar(36) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '主键',
  `uid` varchar(20) CHARACTER SET utf8 COLLATE utf8_general_ci NOT NULL COMMENT '订阅微博id',
  `last_title` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '最后发表标题',
  `last_url` varchar(4096) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NULL DEFAULT NULL COMMENT '最后发表url',
  `last_feed_time` datetime(0) NULL DEFAULT NULL COMMENT '最后发表时间',
  `last_crawle_time` datetime(0) NULL DEFAULT NULL COMMENT '最后爬取时间',
  `deleted` tinyint(1) NOT NULL COMMENT '删除标志'
) ENGINE = InnoDB CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci ROW_FORMAT = Dynamic;

-- ----------------------------
-- Records of subscribe
-- ----------------------------
INSERT INTO `subscribe` VALUES ('d8ff4217-8e5c-fba9-dc7f-17c5997eb142', '3591355593', '回家过年[酷]  17到18 感谢陪伴 祝大家新年快乐 ​​​', 'https://weibo.cn/comment/FCg3azYjv?uid=3591355593&rl=0#cmtfrm', NULL, '2018-08-08 17:23:07', 0);
INSERT INTO `subscribe` VALUES ('d701128f-9b7c-8181-559c-ccf0481c764b', '2637469352', '【薛之谦跨年】薛之谦 #江苏卫视跨年##薛之谦江苏卫视跨年# 演唱《初学者》，是薛之谦对人情世故的直面剖析，也是他对社会生存法则的深入诠释。不忘初心，方得始终。2018，即使“不及格”，也要做“认真的初学者”！演唱链接在这里，快加入歌单吧>>江苏卫视跨年演唱会的微博视频 ​​​', 'https://weibo.cn/comment/FCiMej7n3?uid=2637469352&rl=0#cmtfrm', NULL, '2018-08-08 17:23:13', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f99d825e', '5834040068', '王俊凯也长大了 ​​​', 'https://weibo.cn/comment/FCtmP5piP?uid=5834040068&rl=0#cmtfrm', NULL, '2018-08-08 17:33:57', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f991825e', '1772928060', '何炅哭了 2018跨年，田馥甄唱完《小幸运》，台下何炅李维嘉吴昕全都哭了，也是感动了很多人的一首歌，希望大家都有自己的小幸运[爱你] 2018一切都好[心]扒圈青年的秒拍视频 ​ ​​​', 'https://weibo.cn/comment/FCjXbmyPq?uid=1772928060&rl=0#cmtfrm', NULL, '2018-08-08 17:43:50', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f991824e', '3884293614', NULL, NULL, NULL, '2018-01-01 00:00:00', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f991823e', '5888328091', NULL, NULL, NULL, '2018-01-01 00:00:00', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f991821e', '6027167937', NULL, NULL, NULL, '2018-01-01 00:00:00', 0);
INSERT INTO `subscribe` VALUES ('c589783c-2909-0c0f-9b85-93f3f991825e', '278235511', NULL, NULL, NULL, '2018-01-01 00:00:00', 0);

SET FOREIGN_KEY_CHECKS = 1;
