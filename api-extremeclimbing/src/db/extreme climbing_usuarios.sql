CREATE DATABASE  IF NOT EXISTS `extreme climbing` /*!40100 DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci */ /*!80016 DEFAULT ENCRYPTION='N' */;
USE `extreme climbing`;
-- MySQL dump 10.13  Distrib 8.0.34, for Win64 (x86_64)
--
-- Host: localhost    Database: extreme climbing
-- ------------------------------------------------------
-- Server version	8.0.34

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
-- Table structure for table `usuarios`
--

DROP TABLE IF EXISTS `usuarios`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `usuarios` (
  `id_usuario` int unsigned NOT NULL AUTO_INCREMENT,
  `nombre` varchar(100) NOT NULL,
  `apellido` varchar(100) NOT NULL,
  `nacimiento` date NOT NULL,
  `email` varchar(100) NOT NULL,
  `contraseña` varchar(255) NOT NULL,
  `provincia` varchar(100) DEFAULT NULL,
  `localidad` varchar(100) DEFAULT NULL,
  `codigo_postal` varchar(10) DEFAULT NULL,
  `direccion_nombre` varchar(100) DEFAULT NULL,
  `direccion_numero` varchar(10) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL,
  `rol` varchar(45) DEFAULT 'usuario',
  PRIMARY KEY (`id_usuario`),
  UNIQUE KEY `idusuarios_UNIQUE` (`id_usuario`),
  UNIQUE KEY `email_UNIQUE` (`email`)
) ENGINE=InnoDB AUTO_INCREMENT=29 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `usuarios`
--

LOCK TABLES `usuarios` WRITE;
/*!40000 ALTER TABLE `usuarios` DISABLE KEYS */;
INSERT INTO `usuarios` VALUES (1,'Bruno','Vidales','2001-02-22','brunoelmasmasli@gmail.com','$2b$10$rsRlFBM8guhulWsKSrxbGOYw9vFmN5jyYfHKeZNH1H2T3Ekkb9H9a',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(2,'Camila','Zarate','1998-02-15','camila@gmail.com','$2b$10$8Pj9eln03iExYwBEKGpLzO.2ebJvmBV5SvFQtkHBPyX53Wfw/5bLC',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(3,'Martita','Zarate','2002-01-17','martitazarate@gmail.com','$2b$10$xTpo8sRrg/PtgMqVkPYNTOuaYCQ7YYXwrE2zWXkLG50NrU4RlBYfu',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(4,'Marcos','Garcia','1995-03-22','marcosgarcia@gmail.com','$2b$10$vleflwzIHn38jHA.PERl7ewcgZq11PyNzKLyIwCVRW8X28WYhEju.',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(5,'Matias','Martinelli','1983-06-24','matiasmartinelli@gmail.com','$2b$10$wadUgL88wfVJjfbuwGuaduARy5JKfjhETmmakFirWaALDNGeX7I92',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(7,'Andrea','Gonzalez','1987-07-29','andreagonzalez2907@gmail.com','$2b$10$RZJbXEmAw2y930oUIxXWhOtcUKvht9.8pf8tLbaPvvmQWbaR3qVBq',NULL,NULL,NULL,NULL,NULL,NULL,'admin'),(8,'Bruno','Vidales','2001-02-22','brunovidales01@gmail.com','$2b$10$7dEAjYKLU64HaW02IiBnPewlpjldJB0XeGYrbLdJSv3SomE9sJWlG',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(9,'Pepito','Fulano','1989-12-05','pepitofulano@gmail.com','$2b$10$M5W0uilS0spI/7a3HKcJhOQpaXYF4gRySZspkT9nT5bj/6mXvLYby',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(14,'Pepito','Fulano','1989-12-05','pepitofulano89@gmail.com','$2b$10$34.ejDyjttwbXhwrEIsT8.9Q0BBj3HmzcpeJf3kpIlfV3w3BKwKYu',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(19,'OtroPepito','Fulano','1989-12-05','otropepitofulano89@gmail.com','$2b$10$xPMGnt1qiZ7NtsFJmfaem.Q.vTRN.myyvI6b5gZ9FlQAOjhFRxrnW',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(20,'Jorgelina','Cardoso','1995-05-29','jorgelinacardoso95@gmail.com','$2b$10$WbkUjj/rmQbcHwH6x5ozXODqKLSHSSd.Wb8I081miUleJ5ASPMwxu',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(21,'Pruebo','registro','2001-02-26','prueboregistro@gmail.com','$2b$10$.Hm4c9q4qZBgmuFlDP77cetv07VyBgha8Smu2bJ9x9by4iPCYMKVy',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(22,'Pedro','Pedro','1996-01-17','pedromengano96@gmail.com','$2b$10$1hWno2xoRL2iBPwvhoyxSe.5EiDbNE8uN5uCwYz5OuAzY4CyaI4ma',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(23,'Pedro','MenganoDos','1996-05-05','pedromengano296@gmail.com','$2b$10$FaL.dZiptYaatsM7bAHwx.XWdAu2v4ruLOblJ5mD.hqVUP9jvYE3i',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(24,'Valentina','Flores','1929-12-12','valentinaflores29@gmail.com','$2b$10$m4fgLqPWdXrGpceI/X250u76StQWRdYfJ3A9duh7TkqDD01EMtadO',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(25,'Valentina','Garcia','1995-11-23','valentinagarcia95@gmail.com','$2b$10$FQ4c63l72N8VBtSViUnXm.hYtS3xiwh2wcUCrdWN4x3/QBn4IiCuW',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(26,'Martita','Vidales','1996-10-06','martitavidales96@gmail.com','$2b$10$HGHpfCCgpTODs6PR2O0AB.eGd.FMf3bZnQr3ecyEaGHdkgubUpKXK',NULL,NULL,NULL,NULL,NULL,NULL,'usuario'),(27,'Pia','Vidales','1998-01-17','piavidales98@gmail.com','$2b$10$iNFlJ0zAI7WX0IX6BvgbNeEl/BgmWn.j4WhKdgibCjvJpzByBrPCa','Tierra del fuego','Rio grande','9420',NULL,NULL,'29645166','usuario'),(28,'Rogelia','Alvarez','1966-02-15','rogeliaalvarez66@gmail.com','$2b$10$SkQtC4Izo.Ktsdc99qeUoeM1TVdGQzTKvBH1/Tf/2Dkw2YV5keMrO','Mendoza','Mendoza','9420','Acuerdo Nicolas','988','02964668755','usuario');
/*!40000 ALTER TABLE `usuarios` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2024-02-14 15:32:44
