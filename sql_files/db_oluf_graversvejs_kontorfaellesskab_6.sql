-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 13. 05 2019 kl. 12:49:06
-- Serverversion: 10.1.37-MariaDB
-- PHP-version: 7.3.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `oluf_graversvejs_kontorfaellesskab`
--

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `booked_offices`
--

CREATE TABLE `booked_offices` (
  `id` int(11) NOT NULL,
  `fk_user` int(11) NOT NULL,
  `fk_office` int(11) NOT NULL,
  `booked_date` date NOT NULL,
  `unbooked_date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `booked_offices`
--

INSERT INTO `booked_offices` (`id`, `fk_user`, `fk_office`, `booked_date`, `unbooked_date`) VALUES
(2, 2, 14, '2019-05-16', '2019-05-23'),
(3, 1, 15, '2019-05-15', '2019-05-19'),
(4, 3, 13, '2019-05-07', '2019-05-16'),
(5, 4, 16, '2019-05-14', '2019-05-21');

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `office_ads`
--

CREATE TABLE `office_ads` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(8,2) NOT NULL,
  `img_src` varchar(126) NOT NULL,
  `img_alt` varchar(126) NOT NULL,
  `booked_true_or_false` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `office_ads`
--

INSERT INTO `office_ads` (`id`, `title`, `description`, `price`, `img_src`, `img_alt`, `booked_true_or_false`) VALUES
(12, 'An actual title - 2', 'qwwewqråoopr ', '500.00', '1557737119784_catmoney.jpg', 'Et kat', 0),
(13, 'ewreweqrq3qwrq3wr', '3qwrq3wrq3wrq3wrq3wrq3wrr', '2000.00', '1557737347725_cat-635932_960_720.jpg', '3eqqrwdffswdwwsdqdwwqw', 1),
(14, 'An actual title - 3', 'wqwerrwqrwqrwq', '435.00', '1557737594038_A-gray-cat-crying-looking-upset.jpg', 'wqwqewqwqeeqwewqewq', 1),
(15, 'dwqfewvdsdwfqwdqwqe', 'wqwqrwqrwqrrqwqrw', '145.00', '1557737603995_Cat03.jpg', 'ddwqfwqwqrrwqwqrrqw', 1),
(16, 'dsasddasasddsaa', 'dwqqdwqdwqdwqwdqwdq', '555.00', '1557737615353_cat-care_urine-marking_main-image.jpg', 'edqdwqwwdqwqwdqwqe', 1);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(84) NOT NULL,
  `password` text NOT NULL,
  `fk_user_role` int(11) NOT NULL DEFAULT '2'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `users`
--

INSERT INTO `users` (`id`, `email`, `username`, `password`, `fk_user_role`) VALUES
(1, 'ben@123.com', 'ben123', '$2a$10$PhDynONweyI/yLO4LgEGVO5D.BKYfhK1bZKj7SnOysQpjC0oQiU3O', 2),
(2, 'ben@123.com', 'ben1234', '$2a$10$VfOkG4exGZtGZ27VgrsP4etwO2m1rGg34JFIYAl3SldPVi6HuzApC', 2),
(3, 'admin@admin.com', 'admin', '$2a$10$etsm.PNWoLHDySy2wqeMH.oZUIWUAVSvXyK/5Q1SgZJ3rWjv8Ylg6', 1),
(4, 'qwpnijeqwjpoei@wqeqw.com', 'www', '$2a$10$EhTdGW7o.7bJCjiJrogBV.WxJDcWIcvVzVCdXxBfH3VrvUX2pf3l2', 2);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `user_roles`
--

CREATE TABLE `user_roles` (
  `id` int(11) NOT NULL,
  `user_role` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `user_roles`
--

INSERT INTO `user_roles` (`id`, `user_role`) VALUES
(1, 'Admin'),
(2, 'User');

--
-- Begrænsninger for dumpede tabeller
--

--
-- Indeks for tabel `booked_offices`
--
ALTER TABLE `booked_offices`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `office_ads`
--
ALTER TABLE `office_ads`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`);

--
-- Indeks for tabel `user_roles`
--
ALTER TABLE `user_roles`
  ADD PRIMARY KEY (`id`);

--
-- Brug ikke AUTO_INCREMENT for slettede tabeller
--

--
-- Tilføj AUTO_INCREMENT i tabel `booked_offices`
--
ALTER TABLE `booked_offices`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- Tilføj AUTO_INCREMENT i tabel `office_ads`
--
ALTER TABLE `office_ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- Tilføj AUTO_INCREMENT i tabel `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
