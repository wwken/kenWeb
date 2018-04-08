-- phpMyAdmin SQL Dump
-- version 4.6.4
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jan 14, 2017 at 01:18 AM
-- Server version: 5.6.32-78.1-log
-- PHP Version: 5.6.25-1+0~20160829102648.9+jessie~1.gbpbb5cad

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `test_wemeetnow`
--

-- --------------------------------------------------------

--
-- Table structure for table `Resource`
--

CREATE TABLE `Resource` (
  `id` tinyint(3) UNSIGNED NOT NULL,
  `description` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `User`
--

CREATE TABLE `User` (
  `id` int(10) UNSIGNED NOT NULL,
  `facebook_id` varchar(50) DEFAULT NULL,
  `google_id` varchar(50) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `email` varchar(30) NOT NULL,
  `first_name` varchar(255) DEFAULT NULL,
  `last_name` varchar(255) DEFAULT NULL,
  `sex` bit(1) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `online_status` tinyint(4) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `User`
--

INSERT INTO `User` (`id`, `facebook_id`, `google_id`, `password`, `email`, `first_name`, `last_name`, `sex`, `birthday`, `online_status`) VALUES
(1, '10102389334147174', NULL, 'test', 'wwken926@gmail.com', 'Ken', 'Wu', b'0', '1981-09-26', NULL),
(2, '10154259488517057', NULL, 'testGeo', 'geoffrery.cheung@gmail.com', 'Geoffrery', 'Cheng', b'0', '1980-12-11', NULL),
(3, NULL, NULL, 'testDavid', 'lycheng529@gmail.com', 'David', 'Cheng', b'0', NULL, NULL);

-- --------------------------------------------------------

--
-- Table structure for table `UserLocation`
--

CREATE TABLE `UserLocation` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `location` geometry NOT NULL,
  `message` text,
  `created_time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=MyISAM DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Table structure for table `UserResource`
--

CREATE TABLE `UserResource` (
  `id` int(10) UNSIGNED NOT NULL,
  `user_id` int(10) UNSIGNED NOT NULL,
  `resource_id` tinyint(3) UNSIGNED NOT NULL DEFAULT '0',
  `resource` mediumblob NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `Resource`
--
ALTER TABLE `Resource`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `User`
--
ALTER TABLE `User`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `facebook_id` (`facebook_id`),
  ADD UNIQUE KEY `google_id` (`google_id`);

--
-- Indexes for table `UserLocation`
--
ALTER TABLE `UserLocation`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`),
  ADD SPATIAL KEY `location` (`location`);
ALTER TABLE `UserLocation` ADD FULLTEXT KEY `message` (`message`);

--
-- Indexes for table `UserResource`
--
ALTER TABLE `UserResource`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `Resource`
--
ALTER TABLE `Resource`
  MODIFY `id` tinyint(3) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `User`
--
ALTER TABLE `User`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;
--
-- AUTO_INCREMENT for table `UserLocation`
--
ALTER TABLE `UserLocation`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
--
-- AUTO_INCREMENT for table `UserResource`
--
ALTER TABLE `UserResource`
  MODIFY `id` int(10) UNSIGNED NOT NULL AUTO_INCREMENT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
