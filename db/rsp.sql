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
  `ended` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=77 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `game`
--

LOCK TABLES `game` WRITE;
/*!40000 ALTER TABLE `game` DISABLE KEYS */;
INSERT INTO `game` VALUES (1,4,NULL,0),(2,5,NULL,0),(3,3,NULL,0),(4,55,NULL,0),(5,2,NULL,0),(6,2,NULL,0),(7,2,NULL,0),(8,2,NULL,0),(9,2,NULL,0),(10,2,NULL,0),(11,2,NULL,0),(12,2,NULL,0),(13,2,NULL,0),(14,2,NULL,0),(15,2,NULL,0),(16,2,NULL,0),(17,2,NULL,0),(18,2,NULL,0),(19,2,NULL,0),(20,2,NULL,0),(21,2,NULL,0),(22,2,NULL,0),(23,2,NULL,0),(24,2,NULL,0),(25,2,NULL,0),(26,2,NULL,0),(27,2,1658447917,1),(28,2,1658448315,1),(29,2,1658604440,1),(30,2,1658605233,1),(31,2,1658605429,1),(32,2,1658605723,1),(33,2,1658606003,1),(34,2,1658607321,1),(35,2,1658607422,1),(36,5,1658607585,1),(37,2,1658608275,1),(38,2,1658608402,1),(39,2,1658608659,1),(40,2,1658609022,1),(41,2,1658609255,1),(42,2,1658612642,1),(43,2,1658613458,1),(44,2,1658622680,1),(45,2,1658622801,1),(46,2,1658623193,1),(47,2,1658627972,1),(48,2,1658628850,1),(49,2,1658628925,1),(50,2,1658629056,1),(51,2,1658629328,1),(52,2,1658630052,1),(53,2,1658630194,1),(54,2,1658630570,1),(55,2,1658631528,1),(56,2,NULL,0),(57,2,1658632456,1),(58,2,1658634317,1),(59,3,1658634477,1),(60,3,1658634830,1),(61,3,1658635260,1),(62,3,1658635357,1),(63,3,1658800723,1),(64,3,1658801194,1),(65,3,1658801349,1),(66,3,1658801459,1),(67,3,1658801618,1),(68,3,1658801853,1),(69,3,1658802046,1),(70,3,NULL,0),(71,3,1658802372,1),(72,3,1658803125,1),(73,3,1658803196,1),(74,3,1658803954,1),(75,3,1658804624,1),(76,2,1658824494,1);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `pair`
--

LOCK TABLES `pair` WRITE;
/*!40000 ALTER TABLE `pair` DISABLE KEYS */;
INSERT INTO `pair` VALUES (0,0,23,0,0,0,'9c8ff4ca611507df5d9f10be7ac9b7e0e7d2591905a3e71be48fd7d5268f6f61','8ed4c0ede4471b287d617c5155661610e110eac9d032214b715a68525a6455ef'),(0,0,24,0,0,0,'a6129292699fe1df9ff97a9ac986c2413fddf5e40916a4c061ba11d0985dc30f','43328971d0e1dfb2b28ec2a53f952b58487e90dba1e2dbf0b0a8edb6794b5e4c'),(0,0,25,0,0,0,'dca552afcb28ff0dc02d2726db62868a9c5462d6dfd4f4cac992b70ff43e550a','7d834317b7888aab0690be91625b564ba66645b4ce56d3b36d5276d81b51955b'),(0,0,26,0,0,0,'f4ec3ff0b1e7dbff806880b5b852d0d19555ffdf04ffd9a65b9c8bb63f36f264','b4f6ac801d68d5ae7a87cdf33cf9627db3822533c334ae30dbc6a1480a26a251'),(0,0,27,0,0,0,'7551dc5f8549c1476bf5fccbc806ea2fa38da650c0cf477f1a5d1b7b77f2c609','cf9ee7fee054d43f721020434b9525b67761069e8b56e684dd13ae374e0f6b5c'),(0,0,28,2,3,0,'2e90b30ab5b28a7926fabe9cf7e90ebb5a5f43b25433490b3d99926bdf30316b','049037e1c0baef00be02a5353b1a7a51897ccde6f9a023b9bf9cddabbdef6479'),(0,0,29,3,2,0,'8ef94ff41c476dc923334af4310ed4a77a2a279a70c4e93782ee8b361ff1c6b9','b3ea14caf96e9b2d950bdb20510803965dc00284d0ff20f68e7bfd0d9e675b38'),(0,0,30,0,0,0,'677d2e1cff01b72be23a1d7011f5fae5e4d68e82cf48aaba2e46747241c81af4','f06462eb87bb2c022f94c58bfe4a72dca4ce8622b23dc2a2eba90bf1a5de8246'),(0,0,31,3,2,0,'75641abc0b773d8f3fc7ae8bf6ebe9cd40385d6983e97964217d51be831fa206','f1f1c0ba63c753f0c26f5e21aade181896e3f0b870809c95b7065686fd517a07'),(0,0,32,3,2,0,'cab468e2bed8fd04fa96774201744bebe472a229557f16cf8c6858ab54191d8a','52df788477a748f03348b7d327d91779f4a85fa5ed8441911e939a406c6f735a'),(0,0,33,1,3,0,'2096b2f313537dd38d2f237394b63802b89b52be5039834ab5f17cfed750d645','a101bf76c4de1547b64051d49996d7a8ca38bab4d6e8288b5958331dd777af76'),(0,0,34,1,2,0,'67f1b9df976af3b38c85be72e966e94f93ec698a7d90eb9e1a675c5b774a2f7c','350767e6fead8ea5acbc1ef828b834ca0fcbf6de00a436dd59cdd0a703284478'),(0,0,35,2,1,2,'71251189b1b0efd64e332f579ae6b365a0a4dea82c26941de16446ff14795440','e677236bbb6c7fd783891e1ef7b3666ff774078000a10e525c12857242201701'),(0,0,36,0,0,0,'65f3bc216cfb40bf38f64a7037e7fd7973d55d2126287fed11dd89de26def816','6ad4f24d3ad3645a98e2e5c046105ab41c230cf04e021f87677c06d9b6d7a9d7'),(0,0,37,1,2,0,'cce509d08208eb6c3f8ae024563a41464a4b00f82f4afb24ef48e148ab88e183','d33067db9f61896261148945a3e86bd90138154bfc7358a4620c88b95010c742'),(0,0,38,1,2,0,'5f8f32ad870e26b26ef5444d563abbc6a1c452dc918efcc3a7e78e94217d5294','d5ef48c8ed383de7cb0dc90888cd0a2799dd7bf6b6b76279bb79b0775fe349a5'),(0,0,39,2,1,2,'db8a4952065c760093d40e1dc13677c75ca698c653630197564a20c1595313c7','0431e8544135020dc4326296625409772287fbab2a6946369ca12ab813c88f2f'),(0,0,40,2,1,0,'7c6031e036050ac024f256e0f1cff36cac5ddd5eb5ca2cbcefe08c9074eaa11a','97a24a2ec8f32a0a4b3f283551ef7386967218c605dcf5854d21e523ebf031fb'),(0,0,41,1,2,0,'bb039cf9b33901e5c288dc20e155bab1a6162a8136d526d6a066a3eab967763c','2c78c8b68e6200440397053159c5281234f1b3d649f7b6187d26283855fdba86'),(0,0,42,2,1,2,'b83df63a0b7365407095adb85d145d3b3a96e3249781e3640572cd64a1eff598','21def6e7c4037b6f08f41c67d4bcaa2580b4bd6686de3a4f3eaf3e1fa38f002c'),(0,0,43,1,2,1,'7c5e48900d2a0d69b8ee5ad657888f659d34f58af3a1b6f73701867a7969560b','57ae6e502d9f4f21389d38bd3fd897a3804f5d57630ac3efc7c8342918e53411'),(0,0,44,0,0,0,'0bbc1b11555d1c218d1def38f118f59151b90483a5a75a131656e27c441114fb','ebec67d6fa6bb6f99c3b4ebe1eb1845caf2a071263181baefb84aca4a0d109fd'),(0,0,45,0,0,0,'248e52404da4d82b2671a06131b7166f693a66392f2bb27ceea6c961b4be99b9','465067b92f2820886e2a0acc04df9940e3a793e48feece1fdc54b2f66dba76b4'),(0,0,46,0,0,0,'dbd041e849f40d861f2d12400814f965b450913126a3f9db4602106423adafdc','30b15f8e10c2a8e67d59bad4e1f13fbe92100df1cf6327a7be638e1005a58ed6'),(0,0,47,0,0,0,'d824c95a11628b973befdcd6775a04b6ab25b0f9b5bce50c7e7e3990791286c5','c09b1cafca637cf41f54066e00d163ec546252d277bdbc13a017cc6898d11caa'),(0,0,48,0,0,0,'2cfdf67916824c7c472f2829dbcda298fb97ec66a6965c58bec53d96fe2d02ca','63eae70f8346ddd24d5a3bdb94b99fcd3090fed9c78e5955eec55ce302433404'),(0,0,49,0,0,0,'84c97e6e3ed5521c121d99b89b2adfcb3f584583091851945c300e3e8d48f2b9','34cb93ccf19ca8d0d0b6d951a9012111ceaa3e45efd184dd07fcc04b3cbb36a8'),(0,0,50,0,0,0,'8a761cbe6bc78fe873455b55d2688ecd02fd8b8047cf2311da73c52280ba8b4c','53817482738c8721e0f0b08deeddeae26e5390c7618eeb75321e9f7c407268d8'),(0,0,51,0,1,2,'fbb3f0e3ee86bddb1779ad9d6481d178fbb68aa881de5681f4c3a896a4412e33','246dd0d4da447234e3f1740a60c143b6ac2dfff11cb8899398284207e8e6aad3'),(0,0,52,0,1,2,'ee197ff38ca5fd15731edce92f7e39c8ed44eb6abaa521b843a42a12dc03a5a1','38187d8e02884b50b8d772020988d5368a17ef20e57a053daab6724c057c44c0'),(0,0,53,3,0,1,'1f18214f5ec531a2941f9393789dcfcf87405ce91f42f0cb2a38b420d4854a12','225421a571d27ba15ecdb7ddd3d0d14789aeb31a5844d4e71371a5a02d984b5e'),(0,0,54,3,1,1,'f54ce2301600fa6f58222ad4046e17e354845486acd396a3b191f8c641b5ae8a','8732d0bfd972224780b71e66eae5519fbebf86269096a2a7ae66319a92f8bf02'),(0,0,55,1,3,2,'d091003d713155850d6394f6db328eac51ca3d6e0f629abe3a1712ee6d83a077','5851ec30d620540d4036b62a71e981d23f310a381b035299a66094d6c107092d'),(0,0,57,0,3,2,'30a68b715011847f7fc5171bc1be21ee2391a9ff412329f7f98cdc1ff23e7516','cf18912e74ca9a183a529224c4483ab9df5e9644705058c6e0837b0be8ded6aa'),(0,0,58,0,3,2,'ce143073a69c5f471799e3e8279171263aeff3d01af74efd57820ebad1122bdf','e619029c1b9f11069c281a9c4ed3e79f4137e3089a0dcd10b04b4dfeaf7b72e2'),(0,0,59,0,1,2,'45eea3fa0cdc041181be8c3dbf34da73657a1b8f48b98620df8450b3b000dd87','1b52e335da54a4d3865f889f4e4e8d7c116345b559ee58c78a0973825e09c3a6'),(0,0,60,0,3,2,'63bfcd34a049b1ae5d177cc64d88092a606f9967d60e4a29539cd6c68276f3fc','e327cf32baf6da4055f2645e76f96dcdfc39cdb5aae7d253b6f1abd6987e1b92'),(0,0,61,0,0,0,'5f820737cf2da1ff5aff3f55ff3cf550b2326f3b198a45a6f7b315495ea93c78','cce3d63e00ca0d113d687bcd9516a20b1cf66fa4606eb3c03c000426ef9145b7'),(0,0,62,0,0,0,'573771fec4c3e6cc4ec42c5cac2f505cfe4bfcc30549476fb29d10c12cedc949','3d8f9827f476be7f0b0d8b4b70f3b16bdef97f07557f86385396676eb363e0da'),(0,0,63,0,0,0,'47c5de86240ba2287d529a50eb5b1d71b2dc95561afe03127db94d0bdd1f740a','7b14e7c732d85cb243a324d8b79d5e52a520f3fe9630ec9e082d4208cb58e1ed'),(0,0,64,0,0,0,'affc2c431d1df87447516c7f75b693005351bd61036b0d19748a50846647f32f','caab5b3d748d5086b0e92700913782d3f2e4c734a638de349224d9df770cd0ea'),(0,0,65,3,0,1,'19f3346851125fdb2d1642682c6cff7ff4a68a4c398f72b97911d8a331d00b63','8d2c2ab96b24871decaf0f51ce44690c25d87b04f98c0c0edb2efeb7e73d0718'),(0,0,66,1,0,1,'a44c4f89e07141a6db896e6c109c91972af0a94bea86eb390229dc6a024af2fc','17d3ebb46799859388ac68b5d0d88664c4d8b596df1e9300cd0614241b5a231c'),(0,0,67,0,2,2,'fe46f97c682fda9d0904ea23fbd861a02e5360e131ca6f412fae60d20643777e','2b01d59cd4275c7b7bbf5ffab34c4fbb66b330df437ab708a589b36a2409c50b'),(0,0,68,0,0,0,'c3906618061a6dd86403c725fc6c5f6a90b6dac376033b7adc4ff98ada85411f','1ff7b813171d62c34b8d88a1625a3830bc5e110f8f1b2f00edfac3603cd446d1'),(0,0,69,1,0,1,'3bc9ce41cd15a6c8e29f23b18dc734f2f3959484efb089d2ec88e6e651f38ab8','74dc87731e63b404d971810a1fbdff02629f920a18234d465d254964c28188fe'),(0,0,71,2,0,1,'ec763865a4d05f75bd86c4931682584f3eb1768f78b80e0b215532c35b97c6bd','8050dee32d383754882622ee878dadbf8525dc61ef34ca46d7d99d12cf489dbf'),(0,0,72,1,2,1,'b840f4052b1680322ee60c3f10595525b39433d6aa3c168b0d30bec94f46c9e4','0c19ea2f256a84f22e9344be4bd2288b410043a7854a59ab20267db7de701fbf'),(0,0,73,0,1,2,'215549c77763a9671221c3f646f0ba7486bfabde03cc6b50196245e5ca475fb9','eca8f6cfab68b3c594643a2c47b0d04a2f31042c44ff13dfa3545d0cbbf8a6a1'),(0,0,74,0,2,2,'ecb424b3234ce1ad47903a8b69b2ad15cb01f38e38f413592d3fb8b8804ff490','1e1db1f9c4ce8c5e3dfd357f84d4a3d13075a519d0b4a8e5cf7c1985789d455c'),(0,0,75,0,2,2,'5c62e948fbaf747ad4c597109973b3d7d21485abcb970059bbd385925762f405','0703b20d6ff51c3befb8c64726db90adeae9f4ce47c9046250844f6e705cac17'),(0,0,76,3,0,1,'2dcb39afc718b5a0e08659786c5dd004d02a481fcfceb0acd32f3671120be491','de2fe92af3200bec7a6f64ffc5411b7c8fe3cccf34e2818c236361d8026a27f8'),(0,1,1,0,0,0,NULL,NULL),(0,1,71,0,0,0,'a9694c8c269fe1e9222a36a78e328e91cf2cbaa4d3279e508361fb684ceaf98b','ec763865a4d05f75bd86c4931682584f3eb1768f78b80e0b215532c35b97c6bd'),(0,1,73,0,0,0,'162577955010018150d381c55f6b1f737da3bd49233523a2280eb8c73bab52bf','eca8f6cfab68b3c594643a2c47b0d04a2f31042c44ff13dfa3545d0cbbf8a6a1'),(0,1,74,2,1,2,'1e1db1f9c4ce8c5e3dfd357f84d4a3d13075a519d0b4a8e5cf7c1985789d455c','76aab88913db906d2bcbdc99abaf91d870591e917c01d4961f4466a6e3e35dd1'),(0,1,75,1,2,1,'0703b20d6ff51c3befb8c64726db90adeae9f4ce47c9046250844f6e705cac17','41b99863c8f99ad08386e95607deb374be2c46ea031bb0022dc713596b44960b'),(1,0,1,0,0,0,'fsdfg','fsdfghh'),(1,0,2,0,0,0,NULL,NULL),(1,1,1,0,0,0,NULL,NULL),(2,0,1,0,0,0,NULL,NULL),(2,0,2,0,0,0,NULL,NULL),(2,0,71,3,0,1,'a9694c8c269fe1e9222a36a78e328e91cf2cbaa4d3279e508361fb684ceaf98b',NULL),(2,0,72,0,0,0,'a259893b24f52297427256bca67f5eec7ca6d548b4ea7f3bf157e110b9cb2283',NULL),(2,0,73,2,0,1,'162577955010018150d381c55f6b1f737da3bd49233523a2280eb8c73bab52bf',NULL),(2,0,74,1,0,1,'76aab88913db906d2bcbdc99abaf91d870591e917c01d4961f4466a6e3e35dd1',NULL),(2,0,75,1,0,1,'41b99863c8f99ad08386e95607deb374be2c46ea031bb0022dc713596b44960b',NULL),(3,0,1,0,0,0,NULL,NULL);
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
  `status_update` int NOT NULL DEFAULT '1',
  `seen` int NOT NULL DEFAULT '0',
  PRIMARY KEY (`token`,`game_id`),
  KEY `game_id` (`game_id`),
  CONSTRAINT `player_ibfk_1` FOREIGN KEY (`game_id`) REFERENCES `game` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `player`
--

LOCK TABLES `player` WRITE;
/*!40000 ALTER TABLE `player` DISABLE KEYS */;
INSERT INTO `player` VALUES (39,'rty','0431e8544135020dc4326296625409772287fbab2a6946369ca12ab813c88f2f',5,0),(28,'hkhkh','049037e1c0baef00be02a5353b1a7a51897ccde6f9a023b9bf9cddabbdef6479',5,0),(75,'shss','0703b20d6ff51c3befb8c64726db90adeae9f4ce47c9046250844f6e705cac17',5,1),(19,'vvbnvb','07b50620a716718085bd91173c4f5483d79e28a1614f52068c9ec46447b4c055',5,0),(9,'bbb3','0b3e7dcbe26f312b1c2b260bc27aadc32d9f7129da1c87a5d98e74985f000261',5,0),(10,'f1','0bab113a382690e388dcaa01f38693c086bbbb2c588fa766bd8aaaec2079df92',5,0),(44,'lplp','0bbc1b11555d1c218d1def38f118f59151b90483a5a75a131656e27c441114fb',5,1),(72,'asd2','0c19ea2f256a84f22e9344be4bd2288b410043a7854a59ab20267db7de701fbf',5,1),(17,'hhh','0ec34a31f6741ce3b6858b1a36c2fc510ee65c32cafbbda19ff3f723e2bb3e12',5,0),(73,'plpl','162577955010018150d381c55f6b1f737da3bd49233523a2280eb8c73bab52bf',5,0),(21,'2fg','17601d80764ba4d855d13e7269c3e867262de47fc5adc03fc5ec63108d447e91',5,0),(66,'first','17d3ebb46799859388ac68b5d0d88664c4d8b596df1e9300cd0614241b5a231c',5,1),(70,'gay','18367efc107701666e6d5884a504865e2773faa66a92ec8d058f0c9281460bab',1,0),(65,'third','19f3346851125fdb2d1642682c6cff7ff4a68a4c398f72b97911d8a331d00b63',5,1),(59,'третий','1b52e335da54a4d3865f889f4e4e8d7c116345b559ee58c78a0973825e09c3a6',5,1),(74,'asd2','1e1db1f9c4ce8c5e3dfd357f84d4a3d13075a519d0b4a8e5cf7c1985789d455c',5,1),(53,'bbb','1f18214f5ec531a2941f9393789dcfcf87405ce91f42f0cb2a38b420d4854a12',5,1),(60,'первый','1f2ccb6d79bad978716f79fb2b4b4f871ed55ebfb45f173ffcccf3f34cea1af8',5,1),(68,'etet','1ff7b813171d62c34b8d88a1625a3830bc5e110f8f1b2f00edfac3603cd446d1',5,1),(33,'wer','2096b2f313537dd38d2f237394b63802b89b52be5039834ab5f17cfed750d645',5,0),(11,'a1','20d3f0faef9f7aed819618a62a1e4184cd55e3aa010c8b1f0f1f3aee54de271d',5,0),(73,'lolol','215549c77763a9671221c3f646f0ba7486bfabde03cc6b50196245e5ca475fb9',5,0),(42,'123','21def6e7c4037b6f08f41c67d4bcaa2580b4bd6686de3a4f3eaf3e1fa38f002c',5,0),(53,'asd','225421a571d27ba15ecdb7ddd3d0d14789aeb31a5844d4e71371a5a02d984b5e',5,1),(51,'123f','246dd0d4da447234e3f1740a60c143b6ac2dfff11cb8899398284207e8e6aad3',5,1),(45,'qwqwq','248e52404da4d82b2671a06131b7166f693a66392f2bb27ceea6c961b4be99b9',5,1),(67,'third','2b01d59cd4275c7b7bbf5ffab34c4fbb66b330df437ab708a589b36a2409c50b',5,1),(41,'ert','2c78c8b68e6200440397053159c5281234f1b3d649f7b6187d26283855fdba86',5,0),(48,'ass','2cfdf67916824c7c472f2829dbcda298fb97ec66a6965c58bec53d96fe2d02ca',5,1),(76,'guy2','2dcb39afc718b5a0e08659786c5dd004d02a481fcfceb0acd32f3671120be491',5,1),(28,'llll','2e90b30ab5b28a7926fabe9cf7e90ebb5a5f43b25433490b3d99926bdf30316b',5,0),(57,'dima','30a68b715011847f7fc5171bc1be21ee2391a9ff412329f7f98cdc1ff23e7516',5,1),(46,'lplp','30b15f8e10c2a8e67d59bad4e1f13fbe92100df1cf6327a7be638e1005a58ed6',5,1),(49,'assq','34cb93ccf19ca8d0d0b6d951a9012111ceaa3e45efd184dd07fcc04b3cbb36a8',5,1),(34,'lplplp','350767e6fead8ea5acbc1ef828b834ca0fcbf6de00a436dd59cdd0a703284478',5,0),(52,'sdf','38187d8e02884b50b8d772020988d5368a17ef20e57a053daab6724c057c44c0',5,1),(69,'gay','3bc9ce41cd15a6c8e29f23b18dc734f2f3959484efb089d2ec88e6e651f38ab8',5,1),(62,'bip','3d8f9827f476be7f0b0d8b4b70f3b16bdef97f07557f86385396676eb363e0da',5,1),(13,'jljlk','419935382ffe308796c90406b2287d766ae39620ef8d11c7df50a2589324f683',5,0),(75,'lplp','41b99863c8f99ad08386e95607deb374be2c46ea031bb0022dc713596b44960b',5,1),(24,'sdf1','43328971d0e1dfb2b28ec2a53f952b58487e90dba1e2dbf0b0a8edb6794b5e4c',5,0),(59,'первый','44c7fa559a02a800985c489847008d6af8df6921c01b9748fbe44b7dbcc3b9e2',5,1),(20,'thfh','44ec102451f3b59320de359b2020354ea8ec5af0054c973d8584fa440b6aab5f',5,0),(59,'второй','45eea3fa0cdc041181be8c3dbf34da73657a1b8f48b98620df8450b3b000dd87',5,1),(45,'lol','465067b92f2820886e2a0acc04df9940e3a793e48feece1fdc54b2f66dba76b4',5,1),(63,'asd','47c5de86240ba2287d529a50eb5b1d71b2dc95561afe03127db94d0bdd1f740a',5,1),(21,'dfhf','48c81b6027290772fefccb73751008d1b4463e6a5c4c996c7b5212881acc638d',5,0),(61,'lol','5114f671472013eff802ce80a046c9dbe2cc46b155344049c7352cb7ab7e787e',5,1),(32,'kikiki','52df788477a748f03348b7d327d91779f4a85fa5ed8441911e939a406c6f735a',5,0),(50,'ert','53817482738c8721e0f0b08deeddeae26e5390c7618eeb75321e9f7c407268d8',5,1),(62,'bib','5513454a1eebfc40c3a15f3172b2d39dda118186a6b8f89c2c2cdcb019fefe83',5,1),(62,'pip','573771fec4c3e6cc4ec42c5cac2f505cfe4bfcc30549476fb29d10c12cedc949',5,1),(43,'htht','57ae6e502d9f4f21389d38bd3fd897a3804f5d57630ac3efc7c8342918e53411',5,1),(55,'mary','5851ec30d620540d4036b62a71e981d23f310a381b035299a66094d6c107092d',5,1),(8,'nick2','5950f273ad2ec9a8d856117c6246c30ec168dac244ee81a2e0cef292878f09f6',5,0),(75,'ctrl','5c62e948fbaf747ad4c597109973b3d7d21485abcb970059bbd385925762f405',5,1),(61,'asd','5f820737cf2da1ff5aff3f55ff3cf550b2326f3b198a45a6f7b315495ea93c78',5,1),(38,'ololo','5f8f32ad870e26b26ef5444d563abbc6a1c452dc918efcc3a7e78e94217d5294',5,0),(60,'dnjhj1','63bfcd34a049b1ae5d177cc64d88092a606f9967d60e4a29539cd6c68276f3fc',5,1),(48,'gtgtg','63eae70f8346ddd24d5a3bdb94b99fcd3090fed9c78e5955eec55ce302433404',5,1),(36,'r1','65f3bc216cfb40bf38f64a7037e7fd7973d55d2126287fed11dd89de26def816',5,0),(20,'ghf','66c8576cfc03da23a55deea361972e5626938ae1c7269eaf02fffeb5a1a2ff5d',5,0),(30,'jhjhjhhtr','677d2e1cff01b72be23a1d7011f5fae5e4d68e82cf48aaba2e46747241c81af4',5,0),(34,'ghjhj','67f1b9df976af3b38c85be72e966e94f93ec698a7d90eb9e1a675c5b774a2f7c',5,0),(68,'gay','6a70a74daa87564afb7bbfb9079aa546e7d24433f2862deaab51654cae8588a1',5,1),(36,'r4','6ad4f24d3ad3645a98e2e5c046105ab41c230cf04e021f87677c06d9b6d7a9d7',5,0),(12,'s1','6f3dc6881f5e12dadfa1979dd6000fbb98349f087b9c5ac8e2f0fb2732860511',5,0),(35,'вова','71251189b1b0efd64e332f579ae6b365a0a4dea82c26941de16446ff14795440',5,0),(10,'f2','728104db5c3d7f0ae51a64eae74cb15120da22944c3f5f44e1dd445640af8735',5,0),(69,'f','74dc87731e63b404d971810a1fbdff02629f920a18234d465d254964c28188fe',5,1),(9,'abc1','751c953a5d81631d35a1ffc29e43c01e938617d57c3cb2148ee717c8b4f824f0',5,0),(27,'fgghjgh','7551dc5f8549c1476bf5fccbc806ea2fa38da650c0cf477f1a5d1b7b77f2c609',5,0),(31,'lolo','75641abc0b773d8f3fc7ae8bf6ebe9cd40385d6983e97964217d51be831fa206',5,0),(17,'nnn','75986153c048f033f8ff820f0e37dcf9f55be38745132c0f1ac15aa89e2d5fcc',5,0),(74,'djdj','76aab88913db906d2bcbdc99abaf91d870591e917c01d4961f4466a6e3e35dd1',5,1),(63,'thth','7b14e7c732d85cb243a324d8b79d5e52a520f3fe9630ec9e082d4208cb58e1ed',5,1),(43,'lolol','7c5e48900d2a0d69b8ee5ad657888f659d34f58af3a1b6f73701867a7969560b',5,1),(40,'iiii','7c6031e036050ac024f256e0f1cff36cac5ddd5eb5ca2cbcefe08c9074eaa11a',5,0),(25,'hgjhgj','7d834317b7888aab0690be91625b564ba66645b4ce56d3b36d5276d81b51955b',5,0),(71,'фыв1','8050dee32d383754882622ee878dadbf8525dc61ef34ca46d7d99d12cf489dbf',5,0),(36,'r5','813f79bcac3f7af01ea58c678c965ec71965765e9dcb560eddac7631855d5e4c',5,0),(7,'второй23','81b387d7183fe2139c8c4b1220cab14c8d86645eb4a661366777889355a9c6f1',5,0),(69,'45','8245dd142635b615e45ec49f54ccd2f20822cec90b477c926377047d1b76a857',5,1),(49,'4545','84c97e6e3ed5521c121d99b89b2adfcb3f584583091851945c300e3e8d48f2b9',5,1),(70,'юбилейный70трай','8711886ad716e0002624733d0db2ed016ab463f7ab03409949154bcc3872cb71',1,1),(54,'rtrtr','8732d0bfd972224780b71e66eae5519fbebf86269096a2a7ae66319a92f8bf02',5,1),(50,'qwe','8a761cbe6bc78fe873455b55d2688ecd02fd8b8047cf2311da73c52280ba8b4c',5,1),(15,'hghm','8c42fcefa82652389930c368b22e2f8c5123a14863099cac94b27eab14efb6b3',5,0),(22,'gdd','8c73e86b1e6ce3db297f5432d2b432a3ffb3377f26e276fb65606cd2618feabc',5,0),(65,'second','8d2c2ab96b24871decaf0f51ce44690c25d87b04f98c0c0edb2efeb7e73d0718',5,1),(67,'s','8e9a15aa2195fd0932df31445722eb9d4afff6869c65f74910454eaf16bebe6c',5,1),(23,'jjjkjk','8ed4c0ede4471b287d617c5155661610e110eac9d032214b715a68525a6455ef',5,0),(29,'tgdf','8ef94ff41c476dc923334af4310ed4a77a2a279a70c4e93782ee8b361ff1c6b9',5,0),(40,'qwqwq','97a24a2ec8f32a0a4b3f283551ef7386967218c605dcf5854d21e523ebf031fb',5,0),(23,'ggggg','9c8ff4ca611507df5d9f10be7ac9b7e0e7d2591905a3e71be48fd7d5268f6f61',5,0),(33,'ert','a101bf76c4de1547b64051d49996d7a8ca38bab4d6e8288b5958331dd777af76',5,0),(66,'third','a1245fc317533c62c3cdb14bdb2af63343183fa09d8786db486769c914976d64',5,1),(72,'asd1','a259893b24f52297427256bca67f5eec7ca6d548b4ea7f3bf157e110b9cb2283',5,1),(66,'second','a44c4f89e07141a6db896e6c109c91972af0a94bea86eb390229dc6a024af2fc',5,1),(63,'cvb','a459762ede6d5513194ba682e838a45d8e66fb96b8f8730d42eac2ca5df17306',5,1),(24,'jghj2','a6129292699fe1df9ff97a9ac986c2413fddf5e40916a4c061ba11d0985dc30f',5,0),(36,'r2','a7673eecdd7558080018d616a74aeba87a9e4f32cdffff2bfc2cd1c09bd1373e',5,0),(71,'asd3','a9694c8c269fe1e9222a36a78e328e91cf2cbaa4d3279e508361fb684ceaf98b',5,0),(16,'jjjj','aa9d090a3a1ad72b3184591c11c9e59355f03a0bad8d5b619104f029b8444624',5,0),(64,'ghthft','affc2c431d1df87447516c7f75b693005351bd61036b0d19748a50846647f32f',5,1),(29,'kkk','b3ea14caf96e9b2d950bdb20510803965dc00284d0ff20f68e7bfd0d9e675b38',5,0),(26,'lpl','b4f6ac801d68d5ae7a87cdf33cf9627db3822533c334ae30dbc6a1480a26a251',5,0),(42,'fgh','b83df63a0b7365407095adb85d145d3b3a96e3249781e3640572cd64a1eff598',5,0),(72,'ass3','b840f4052b1680322ee60c3f10595525b39433d6aa3c168b0d30bec94f46c9e4',5,1),(12,'s2','bae2241704f7e65e6d3496e5bd43e2076c3c377840af94a6dc7494499ac1ccaa',5,0),(41,'iop','bb039cf9b33901e5c288dc20e155bab1a6162a8136d526d6a066a3eab967763c',5,0),(36,'r3','bb251bd575b9aabedb8aa67bd32b72b6c6cb5b6cc96fc36ba7a939ee368ebe77',5,0),(47,'qwqwq','c09b1cafca637cf41f54066e00d163ec546252d277bdbc13a017cc6898d11caa',5,1),(65,'first','c270a1be025c4e44c76bfa383d9ea8919174baa995c8ec2293b389b28735f53e',5,1),(68,'qtqt','c3906618061a6dd86403c725fc6c5f6a90b6dac376033b7adc4ff98ada85411f',5,1),(13,'dfgfdg','c7f6c58a5a28cd3cce54fa26f709a7ac56faff8884d1e4c524fa49dab4011863',5,0),(14,'uyi','ca307fe28ad1efee17543a42a9bddeb39614a66a1b445faf809ffff698abbc01',5,0),(22,'fhgf','ca9cf6c469c59d793835ceac28753ca2fb6638cc6783b4a21d9dccd10337667d',5,0),(64,'wer','caab5b3d748d5086b0e92700913782d3f2e4c734a638de349224d9df770cd0ea',5,1),(32,'ggngg','cab468e2bed8fd04fa96774201744bebe472a229557f16cf8c6858ab54191d8a',5,0),(7,'nickname123','cc1929fedf9ffe98a8bb8d21dfe2d52a083015a1fbe065e8acb0e21747d5f22a',5,0),(61,'pop','cce3d63e00ca0d113d687bcd9516a20b1cf66fa4606eb3c03c000426ef9145b7',5,1),(37,'ytyty','cce509d08208eb6c3f8ae024563a41464a4b00f82f4afb24ef48e148ab88e183',5,0),(16,'dfgdfg','cd686ace50a03deae45a139834f7509e4a36f561b427de4f86f7e35982959824',5,0),(58,'михалпалыч','ce143073a69c5f471799e3e8279171263aeff3d01af74efd57820ebad1122bdf',5,1),(57,'nedima','cf18912e74ca9a183a529224c4483ab9df5e9644705058c6e0837b0be8ded6aa',5,1),(27,'dfhfg','cf9ee7fee054d43f721020434b9525b67761069e8b56e684dd13ae374e0f6b5c',5,0),(55,'kirill','d091003d713155850d6394f6db328eac51ca3d6e0f629abe3a1712ee6d83a077',5,1),(37,'ioio','d33067db9f61896261148945a3e86bd90138154bfc7358a4620c88b95010c742',5,0),(38,'ll','d5ef48c8ed383de7cb0dc90888cd0a2799dd7bf6b6b76279bb79b0775fe349a5',5,0),(47,'yhyh','d824c95a11628b973befdcd6775a04b6ab25b0f9b5bce50c7e7e3990791286c5',5,1),(39,'aqaq','db8a4952065c760093d40e1dc13677c75ca698c653630197564a20c1595313c7',5,0),(46,'cvb','dbd041e849f40d861f2d12400814f965b450913126a3f9db4602106423adafdc',5,1),(25,'htgh56','dca552afcb28ff0dc02d2726db62868a9c5462d6dfd4f4cac992b70ff43e550a',5,0),(18,'aadad','dcc4aaa5f7c691e75f1b7b19ab6566429756315749283e07a1b4621c0b77b5e6',5,0),(76,'gay','de2fe92af3200bec7a6f64ffc5411b7c8fe3cccf34e2818c236361d8026a27f8',5,1),(18,'bvsd','dff48335f1072d34fe29f5e6b643a4d859719381a0601268cb5fb17763bfa713',5,0),(11,'a2','e2569faac352145743420134fce2255f5d5225cffed7d1c7d44a0bf767952842',5,0),(60,'посмешище','e327cf32baf6da4055f2645e76f96dcdfc39cdb5aae7d253b6f1abd6987e1b92',5,1),(58,'степан','e619029c1b9f11069c281a9c4ed3e79f4137e3089a0dcd10b04b4dfeaf7b72e2',5,1),(35,'lpopp','e677236bbb6c7fd783891e1ef7b3666ff774078000a10e525c12857242201701',5,0),(44,'wqdqw','ebec67d6fa6bb6f99c3b4ebe1eb1845caf2a071263181baefb84aca4a0d109fd',5,1),(19,'sfsdf','ec5f9cb5d17a050b52efbdae0d465d47c1615770f861bb224011c98786a48e51',5,0),(71,'фыв2','ec763865a4d05f75bd86c4931682584f3eb1768f78b80e0b215532c35b97c6bd',5,0),(73,'ass','eca8f6cfab68b3c594643a2c47b0d04a2f31042c44ff13dfa3545d0cbbf8a6a1',5,0),(74,'asd1','ecb424b3234ce1ad47903a8b69b2ad15cb01f38e38f413592d3fb8b8804ff490',5,1),(70,'второй','ed32535a3fa0093426bcd81a8fb8cd91513928e52e3dba922bd8e5b0e036b921',1,1),(6,'ghg','ee0df6d7f624f3d49a80ee6d9879ba8c8bd470818b159ab3b5b98f7bb2fd208d',5,0),(52,'asd','ee197ff38ca5fd15731edce92f7e39c8ed44eb6abaa521b843a42a12dc03a5a1',5,1),(30,'fdf','f06462eb87bb2c022f94c58bfe4a72dca4ce8622b23dc2a2eba90bf1a5de8246',5,0),(14,'hjjhkhj','f164a6114f3c849675146dae7cd078ddf0d25fad805f5f35b9841036b69a6a06',5,0),(56,'dima','f17ccbd866470302b06de8aa7960cc5e831f0a44c8ba5ad1940bcdb6afdf3d6b',1,0),(31,'jjjj','f1f1c0ba63c753f0c26f5e21aade181896e3f0b870809c95b7065686fd517a07',5,0),(64,'ololo','f3e598d7ea12d53257838ea3220911c4e0c89b25b23e912e82f3b6675098031b',5,1),(8,'name1','f4e4257c1367e7ccfdf87e7c28784a83a9abf8d0d59b576cadcae85663441050',5,0),(26,'eter12','f4ec3ff0b1e7dbff806880b5b852d0d19555ffdf04ffd9a65b9c8bb63f36f264',5,0),(54,'fsfsfsf','f54ce2301600fa6f58222ad4046e17e354845486acd396a3b191f8c641b5ae8a',5,1),(15,'jyuyj','f9bdb9db7cca371377ad0879ef1180141d6b7a798a271d5d1755827cf749c820',5,0),(51,'asd','fbb3f0e3ee86bddb1779ad9d6481d178fbb68aa881de5681f4c3a896a4412e33',5,1),(67,'f','fe46f97c682fda9d0904ea23fbd861a02e5360e131ca6f412fae60d20643777e',5,1),(1,'nick','fsdfg',5,0),(1,'nick2','fsdfghh',5,0);
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
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `round`
--

LOCK TABLES `round` WRITE;
/*!40000 ALTER TABLE `round` DISABLE KEYS */;
INSERT INTO `round` VALUES (0,1,1),(0,1,2),(0,1,16),(0,1,17),(0,1,18),(0,1,19),(0,3,20),(0,1,21),(0,1,22),(0,1,23),(0,1,24),(0,3,25),(0,1,26),(0,3,27),(0,3,28),(0,3,29),(0,3,30),(0,3,31),(0,3,32),(0,3,33),(0,3,34),(0,3,35),(0,3,36),(0,3,37),(0,3,38),(0,3,39),(0,3,40),(0,3,41),(0,3,42),(0,3,43),(0,3,44),(0,3,45),(0,3,46),(0,3,47),(0,3,48),(0,3,49),(0,3,50),(0,3,51),(0,3,52),(0,3,53),(0,3,54),(0,3,55),(0,3,57),(0,3,58),(0,3,59),(0,3,60),(0,3,61),(0,3,62),(0,3,63),(0,3,64),(0,3,65),(0,3,66),(0,3,67),(0,3,68),(0,3,69),(0,1,70),(0,3,71),(0,3,72),(0,3,73),(0,3,74),(0,3,75),(0,3,76),(1,1,1),(1,1,71),(1,1,73),(1,3,74),(1,3,75);
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

-- Dump completed on 2022-07-26 12:04:11
