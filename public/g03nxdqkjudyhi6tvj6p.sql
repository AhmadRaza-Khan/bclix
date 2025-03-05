-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 04, 2025 at 11:52 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `kinsey`
--

-- --------------------------------------------------------

--
-- Table structure for table `kinseys_orders`
--

CREATE TABLE `kinseys_orders` (
  `id` int(11) NOT NULL,
  `order_number` varchar(333) NOT NULL,
  `name` varchar(333) NOT NULL,
  `address1` varchar(333) NOT NULL,
  `address2` varchar(333) DEFAULT NULL,
  `phone` varchar(333) NOT NULL,
  `city` varchar(333) NOT NULL,
  `zipcode` varchar(333) NOT NULL,
  `country` varchar(333) NOT NULL,
  `sku` varchar(333) NOT NULL,
  `qty` varchar(333) NOT NULL,
  `price` varchar(333) NOT NULL,
  `kinseys_refno` varchar(333) NOT NULL,
  `kinseys_orderno` varchar(333) NOT NULL,
  `created_on` varchar(333) NOT NULL,
  `is_deleted` varchar(333) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `kinseys_orders`
--
ALTER TABLE `kinseys_orders`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `kinseys_orders`
--
ALTER TABLE `kinseys_orders`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
