-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: localhost    Database: rsp
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `game`
--

DROP TABLE IF EXISTS `game`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `game` (
  `id` int NOT NULL AUTO_INCREMENT,
  `count` int NOT NULL,
  `time` int DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,4,NULL),(2,5,NULL),(3,3,NULL),(4,55,NULL),(5,2,NULL),(6,2,NULL),(7,2,NULL),(8,2,NULL),(9,2,NULL),(10,2,NULL),(11,2,NULL),(12,2,NULL),(13,2,NULL),(14,2,NULL),(15,2,NULL),(16,2,NULL),(17,2,NULL),(18,2,NULL),(19,2,NULL),(20,2,NULL),(21,2,NULL),(22,2,NULL),(23,2,NULL),(24,2,NULL),(25,2,NULL),(26,2,NULL),(27,2,1658447917),(28,2,1658448315);
/*!40000 ALTER TABLE `game` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `pair`
--

DROP TABLE IF EXISTS `pair`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `pair` (
  `id` int NOT NULL,
  `round_id` int NOT NULL,
  `game_id` int NOT NULL,
  `player1_move` int NOT NULL DEFAULT '0',
  `player2_move` int NOT NULL DEFAULT '0',
  `winner` int NOT NULL DEFAULT '0',
  `player1` varchar(64) DEFAULT NULL,
  `player2` varchar(64) DEFAULT NULL,
  PRIMARY KEY (`id`,`round_id`,`game_id`),
  KEY `round_id` (`round_id`),
  KEY `game_id` (`game_id`),
  KEY `player1` (`player1`),
  KEY `player2` (`player2`),
  CONSTRAINT `pair_ibfk_1` FOREIGN KEY (`round_id`) REFERENCES `round` (`id`),
  CONSTRAINT `pair_ibfk_2` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`),
  CONSTRAINT `pair_ibfk_3` FOREIGN KEY (`player1`) REFERENCES `player` (`token`),
  CONSTRAINT `pair_ibfk_4` FOREIGN KEY (`player2`) REFERENCES `player` (`token`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pair`
--

LOCK TABLES `pair` WRITE;
/*!40000 ALTER TABLE `pair` DISABLE KEYS */;
INSERT INTO `pair` VALUES (0,0,23,0,0,0,'9c8ff4ca611507df5d9f10be7ac9b7e0e7d2591905a3e71be48fd7d5268f6f61','8ed4c0ede4471b287d617c5155661610e110eac9d032214b715a68525a6455ef'),(0,0,24,0,0,0,'a6129292699fe1df9ff97a9ac986c2413fddf5e40916a4c061ba11d0985dc30f','43328971d0e1dfb2b28ec2a53f952b58487e90dba1e2dbf0b0a8edb6794b5e4c'),(0,0,25,0,0,0,'dca552afcb28ff0dc02d2726db62868a9c5462d6dfd4f4cac992b70ff43e550a','7d834317b7888aab0690be91625b564ba66645b4ce56d3b36d5276d81b51955b'),(0,0,26,0,0,0,'f4ec3ff0b1e7dbff806880b5b852d0d19555ffdf04ffd9a65b9c8bb63f36f264','b4f6ac801d68d5ae7a87cdf33cf9627db3822533c334ae30dbc6a1480a26a251'),(0,0,27,0,0,0,'7551dc5f8549c1476bf5fccbc806ea2fa38da650c0cf477f1a5d1b7b77f2c609','cf9ee7fee054d43f721020434b9525b67761069e8b56e684dd13ae374e0f6b5c'),(0,0,28,2,3,0,'2e90b30ab5b28a7926fabe9cf7e90ebb5a5f43b25433490b3d99926bdf30316b','049037e1c0baef00be02a5353b1a7a51897ccde6f9a023b9bf9cddabbdef6479'),(0,1,1,0,0,0,NULL,NULL),(1,0,1,0,0,0,'fsdfg','fsdfghh'),(1,0,2,0,0,0,NULL,NULL),(1,1,1,0,0,0,NULL,NULL),(2,0,1,0,0,0,NULL,NULL),(2,0,2,0,0,0,NULL,NULL),(3,0,1,0,0,0,NULL,NULL);
/*!40000 ALTER TABLE `pair` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `player`
--

DROP TABLE IF EXISTS `player`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `player` (
  `game_id` int NOT NULL,
  `nickname` varchar(255) NOT NULL,
  `token` varchar(64) NOT NULL,
  PRIMARY KEY (`token`,`game_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (28,'hkhkh','049037e1c0baef00be02a5353b1a7a51897ccde6f9a023b9bf9cddabbdef6479'),(19,'vvbnvb','07b50620a716718085bd91173c4f5483d79e28a1614f52068c9ec46447b4c055'),(9,'bbb3','0b3e7dcbe26f312b1c2b260bc27aadc32d9f7129da1c87a5d98e74985f000261'),(10,'f1','0bab113a382690e388dcaa01f38693c086bbbb2c588fa766bd8aaaec2079df92'),(17,'hhh','0ec34a31f6741ce3b6858b1a36c2fc510ee65c32cafbbda19ff3f723e2bb3e12'),(21,'2fg','17601d80764ba4d855d13e7269c3e867262de47fc5adc03fc5ec63108d447e91'),(11,'a1','20d3f0faef9f7aed819618a62a1e4184cd55e3aa010c8b1f0f1f3aee54de271d'),(28,'llll','2e90b30ab5b28a7926fabe9cf7e90ebb5a5f43b25433490b3d99926bdf30316b'),(13,'jljlk','419935382ffe308796c90406b2287d766ae39620ef8d11c7df50a2589324f683'),(24,'sdf1','43328971d0e1dfb2b28ec2a53f952b58487e90dba1e2dbf0b0a8edb6794b5e4c'),(20,'thfh','44ec102451f3b59320de359b2020354ea8ec5af0054c973d8584fa440b6aab5f'),(21,'dfhf','48c81b6027290772fefccb73751008d1b4463e6a5c4c996c7b5212881acc638d'),(8,'nick2','5950f273ad2ec9a8d856117c6246c30ec168dac244ee81a2e0cef292878f09f6'),(20,'ghf','66c8576cfc03da23a55deea361972e5626938ae1c7269eaf02fffeb5a1a2ff5d'),(12,'s1','6f3dc6881f5e12dadfa1979dd6000fbb98349f087b9c5ac8e2f0fb2732860511'),(10,'f2','728104db5c3d7f0ae51a64eae74cb15120da22944c3f5f44e1dd445640af8735'),(9,'abc1','751c953a5d81631d35a1ffc29e43c01e938617d57c3cb2148ee717c8b4f824f0'),(27,'fgghjgh','7551dc5f8549c1476bf5fccbc806ea2fa38da650c0cf477f1a5d1b7b77f2c609'),(17,'nnn','75986153c048f033f8ff820f0e37dcf9f55be38745132c0f1ac15aa89e2d5fcc'),(25,'hgjhgj','7d834317b7888aab0690be91625b564ba66645b4ce56d3b36d5276d81b51955b'),(7,'второй23','81b387d7183fe2139c8c4b1220cab14c8d86645eb4a661366777889355a9c6f1'),(15,'hghm','8c42fcefa82652389930c368b22e2f8c5123a14863099cac94b27eab14efb6b3'),(22,'gdd','8c73e86b1e6ce3db297f5432d2b432a3ffb3377f26e276fb65606cd2618feabc'),(23,'jjjkjk','8ed4c0ede4471b287d617c5155661610e110eac9d032214b715a68525a6455ef'),(23,'ggggg','9c8ff4ca611507df5d9f10be7ac9b7e0e7d2591905a3e71be48fd7d5268f6f61'),(24,'jghj2','a6129292699fe1df9ff97a9ac986c2413fddf5e40916a4c061ba11d0985dc30f'),(16,'jjjj','aa9d090a3a1ad72b3184591c11c9e59355f03a0bad8d5b619104f029b8444624'),(26,'lpl','b4f6ac801d68d5ae7a87cdf33cf9627db3822533c334ae30dbc6a1480a26a251'),(12,'s2','bae2241704f7e65e6d3496e5bd43e2076c3c377840af94a6dc7494499ac1ccaa'),(13,'dfgfdg','c7f6c58a5a28cd3cce54fa26f709a7ac56faff8884d1e4c524fa49dab4011863'),(14,'uyi','ca307fe28ad1efee17543a42a9bddeb39614a66a1b445faf809ffff698abbc01'),(22,'fhgf','ca9cf6c469c59d793835ceac28753ca2fb6638cc6783b4a21d9dccd10337667d'),(7,'nickname123','cc1929fedf9ffe98a8bb8d21dfe2d52a083015a1fbe065e8acb0e21747d5f22a'),(16,'dfgdfg','cd686ace50a03deae45a139834f7509e4a36f561b427de4f86f7e35982959824'),(27,'dfhfg','cf9ee7fee054d43f721020434b9525b67761069e8b56e684dd13ae374e0f6b5c'),(25,'htgh56','dca552afcb28ff0dc02d2726db62868a9c5462d6dfd4f4cac992b70ff43e550a'),(18,'aadad','dcc4aaa5f7c691e75f1b7b19ab6566429756315749283e07a1b4621c0b77b5e6'),(18,'bvsd','dff48335f1072d34fe29f5e6b643a4d859719381a0601268cb5fb17763bfa713'),(11,'a2','e2569faac352145743420134fce2255f5d5225cffed7d1c7d44a0bf767952842'),(19,'sfsdf','ec5f9cb5d17a050b52efbdae0d465d47c1615770f861bb224011c98786a48e51'),(6,'ghg','ee0df6d7f624f3d49a80ee6d9879ba8c8bd470818b159ab3b5b98f7bb2fd208d'),(14,'hjjhkhj','f164a6114f3c849675146dae7cd078ddf0d25fad805f5f35b9841036b69a6a06'),(8,'name1','f4e4257c1367e7ccfdf87e7c28784a83a9abf8d0d59b576cadcae85663441050'),(26,'eter12','f4ec3ff0b1e7dbff806880b5b852d0d19555ffdf04ffd9a65b9c8bb63f36f264'),(15,'jyuyj','f9bdb9db7cca371377ad0879ef1180141d6b7a798a271d5d1755827cf749c820'),(1,'nick','fsdfg'),(1,'nick2','fsdfghh');
/*!40000 ALTER TABLE `player` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `round`
--

DROP TABLE IF EXISTS `round`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `round` (
  `id` int NOT NULL,
  `state` int NOT NULL DEFAULT '1',
  `game_id` int NOT NULL,
  PRIMARY KEY (`id`,`game_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `round_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round`
--

LOCK TABLES `round` WRITE;
/*!40000 ALTER TABLE `round` DISABLE KEYS */;
INSERT INTO `round` VALUES (0,1,1),(0,1,2),(0,1,16),(0,1,17),(0,1,18),(0,1,19),(0,3,20),(0,1,21),(0,1,22),(0,1,23),(0,1,24),(0,3,25),(0,1,26),(0,3,27),(0,3,28),(1,1,1);
/*!40000 ALTER TABLE `round` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-07-22  3:41:31
