-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: chaqiwang
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `address_list`
--

DROP TABLE IF EXISTS `address_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `address_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uId` varchar(45) NOT NULL,
  `name` varchar(45) NOT NULL,
  `tel` varchar(45) NOT NULL,
  `province` varchar(45) NOT NULL,
  `city` varchar(45) NOT NULL,
  `county` varchar(45) NOT NULL,
  `addressDetail` varchar(255) NOT NULL,
  `isDefault` int NOT NULL,
  `areaCode` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=13 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address_list`
--

LOCK TABLES `address_list` WRITE;
/*!40000 ALTER TABLE `address_list` DISABLE KEYS */;
INSERT INTO `address_list` VALUES (8,'14','小廿','15016711375','河北省','石家庄市','桥西区','BBBBBB',1,'130104'),(9,'14','小廿','15016711375','内蒙古自治区','呼和浩特市','回民区','CCCCCC',0,'150103'),(10,'14','小廿','15016711375','辽宁省','沈阳市','沈河区','DDDDDD',0,'210103'),(11,'14','小廿老婆','15016711374','福建省','福州市','鼓楼区','EEEEEE',0,'350102'),(12,'14','小廿兄弟','15016711376','北京市','北京市','东城区','FFFFFF',0,'110101');
/*!40000 ALTER TABLE `address_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_cart`
--

DROP TABLE IF EXISTS `goods_cart`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `goods_cart` (
  `id` int NOT NULL AUTO_INCREMENT,
  `uid` varchar(255) NOT NULL,
  `goods_id` varchar(255) NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_price` varchar(255) NOT NULL,
  `goods_num` varchar(255) NOT NULL DEFAULT '1',
  `goods_imgUrl` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_cart`
--

LOCK TABLES `goods_cart` WRITE;
/*!40000 ALTER TABLE `goods_cart` DISABLE KEYS */;
INSERT INTO `goods_cart` VALUES (7,'15','5','龙井红茶1號铁罐250g','68.66','1','./images/recommend1.jpeg'),(8,'15','2','新茶茶叶红茶正山小种叶礼盒装浓香型600g','61.83','1','./images/like2.jpeg'),(9,'15','4','福茗源 龙井茶 2022新红茶浓香型礼盒装250g','125.99','1','./images/like4.jpeg'),(13,'16','6','四大红茶组合特级茶叶礼盒装455g','99.66','1','./images/recommend2.jpeg'),(20,'14','8','新茶武夷正山红茶小种蜜香耐泡型礼盒装125g','166.99','2','./images/recommend4.jpeg'),(21,'14','5','龙井红茶1號铁罐250g','68.66','2','./images/recommend1.jpeg'),(22,'14','2','新茶茶叶红茶正山小种叶礼盒装浓香型600g','61.83','3','./images/like2.jpeg'),(23,'14','3','茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','136.62','2','./images/like3.jpeg');
/*!40000 ALTER TABLE `goods_cart` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `goods_list`
--

DROP TABLE IF EXISTS `goods_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `goods_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(45) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `num` int DEFAULT NULL,
  `imgUrl` varchar(45) DEFAULT NULL,
  `zh` varchar(45) DEFAULT NULL,
  `content` varchar(45) DEFAULT NULL,
  `oldprice` double DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `goods_list`
--

LOCK TABLES `goods_list` WRITE;
/*!40000 ALTER TABLE `goods_list` DISABLE KEYS */;
INSERT INTO `goods_list` VALUES (1,'福茗源 茶叶 碧螺春绿茶 首件28元拍2罐',299.45,1,'./images/like1.jpeg',NULL,'镇店之宝，热销200万罐+，嫩芽焙制上等茶本地仓发货',300),(2,'新茶茶叶红茶正山小种叶礼盒装浓香型600g',61.83,2,'./images/like2.jpeg',NULL,'热销100W罐+，明前花果香，店长推荐-618大促狂欢开启',100),(3,'茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装',136.62,3,'./images/like3.jpeg',NULL,'热销100万罐，500g大份量，性价比之选，全国12仓发货！',155),(4,'福茗源 龙井茶 2022新红茶浓香型礼盒装250g',125.99,4,'./images/like4.jpeg',NULL,'支持30天价保,30天无理由退换货,品质保证，售后无忧',166),(5,'龙井红茶1號铁罐250g',68.66,5,'./images/recommend1.jpeg',NULL,'鲜爽甘醇，口粮首选',98),(6,'四大红茶组合特级茶叶礼盒装455g',99.66,6,'./images/recommend2.jpeg',NULL,'四大红茶组合，好喝不单调',129),(7,'新茶安溪铁观音春茶礼盒500g送礼袋',218.22,7,'./images/recommend3.jpeg',NULL,'臻品质，敢保证，珍稀原料核心产区兰花香清高悠长清醇鲜爽正味传统工艺',248),(8,'新茶武夷正山红茶小种蜜香耐泡型礼盒装125g',166.99,8,'./images/recommend4.jpeg',NULL,'福茗源，金骏眉红茶，茶叶首件28元买2送1',196);
/*!40000 ALTER TABLE `goods_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `store_order`
--

DROP TABLE IF EXISTS `store_order`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `store_order` (
  `id` int NOT NULL AUTO_INCREMENT,
  `order_id` varchar(255) NOT NULL,
  `uId` int NOT NULL,
  `goods_name` varchar(255) NOT NULL,
  `goods_price` varchar(45) NOT NULL,
  `goods_num` varchar(45) NOT NULL,
  `order_status` varchar(45) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=37 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `store_order`
--

LOCK TABLES `store_order` WRITE;
/*!40000 ALTER TABLE `store_order` DISABLE KEYS */;
INSERT INTO `store_order` VALUES (28,'2022061519441568716',14,'四大红茶组合特级茶叶礼盒装455g,龙井红茶1號铁罐250g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','709.54','7','1'),(29,'20220615194722725881',14,'新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,新茶茶叶红茶正山小种叶礼盒装浓香型600g','519.47','5','1'),(30,'20220615233523303844',14,'四大红茶组合特级茶叶礼盒装455g,新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','1229.01','12','1'),(31,'20220616000600545616',14,'四大红茶组合特级茶叶礼盒装455g,新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','1229.01','12','1'),(32,'2022061600061822843',14,'四大红茶组合特级茶叶礼盒装455g,新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','1229.01','12','1'),(33,'20220616000628926173',14,'龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g','322.81','5','1'),(34,'20220616095600978575',14,'四大红茶组合特级茶叶礼盒装455g,新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','1229.01','12','1'),(35,'20220616095825828658',14,'四大红茶组合特级茶叶礼盒装455g,新茶武夷正山红茶小种蜜香耐泡型礼盒装125g,龙井红茶1號铁罐250g,新茶茶叶红茶正山小种叶礼盒装浓香型600g,茶叶绿茶一杯香明前龙井茶2盒共250g礼盒装','1229.01','12','1'),(36,'20220616100437120991',14,'四大红茶组合特级茶叶礼盒装455g','298.98','3','1');
/*!40000 ALTER TABLE `store_order` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users_list`
--

DROP TABLE IF EXISTS `users_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8 */;
CREATE TABLE `users_list` (
  `id` int NOT NULL AUTO_INCREMENT,
  `tel` varchar(45) DEFAULT NULL,
  `pwd` varchar(45) DEFAULT NULL,
  `imgUrl` varchar(45) DEFAULT NULL,
  `nickName` varchar(45) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id_UNIQUE` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users_list`
--

LOCK TABLES `users_list` WRITE;
/*!40000 ALTER TABLE `users_list` DISABLE KEYS */;
INSERT INTO `users_list` VALUES (14,'15016711375','123456','/images/user.jpg','小廿','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVGVsIjoiMTUwMTY3MTEzNzUiLCJpYXQiOjE2NTQ3MTIxMjV9.YdNmWOwIHTe7cDlktZ2r3H-5aEsXjQlNcbAZOr4XA8k'),(15,'13645128991','abcabc','/images/user.jpg','小廿','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVGVsIjoiMTM2NDUxMjg5OTEiLCJpYXQiOjE2NTQ4NTIxNjZ9.Kt9YrrMqpixH4eTCBVRaBt7waHn_GwfJ5nmX6Dplgyc'),(16,'13645128992','123abc','/images/user.jpg','小廿','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVGVsIjoiMTM2NDUxMjg5OTIiLCJpYXQiOjE2NTQ4NTU4OTF9.hP2_z7FJJ_qV0ahBlY7A68yOVvcXeAod4reZRxPODLA'),(17,'13645128993','123456','/images/user.jpg','小廿','eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyVGVsIjoiMTM2NDUxMjg5OTMiLCJpYXQiOjE2NTQ4NzE4MjF9.ZY8KyvXFN0n1eYxo_DH44YPl4GoHqmKLXOYCj6sMnuo');
/*!40000 ALTER TABLE `users_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping events for database 'chaqiwang'
--

--
-- Dumping routines for database 'chaqiwang'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-06-16 10:52:50
