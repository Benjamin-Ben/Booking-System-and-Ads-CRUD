-- phpMyAdmin SQL Dump
-- version 4.8.4
-- https://www.phpmyadmin.net/
--
-- Vært: 127.0.0.1
-- Genereringstid: 09. 05 2019 kl. 14:53:16
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
  `date_booked` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `office_ads`
--

CREATE TABLE `office_ads` (
  `id` int(11) NOT NULL,
  `title` varchar(50) NOT NULL,
  `description` text NOT NULL,
  `price` decimal(5,2) NOT NULL,
  `img_src` varchar(126) NOT NULL,
  `img_alt` varchar(126) NOT NULL,
  `booked_true_or_false` tinyint(1) NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Data dump for tabellen `office_ads`
--

INSERT INTO `office_ads` (`id`, `title`, `description`, `price`, `img_src`, `img_alt`, `booked_true_or_false`) VALUES
(9, 'www', 'qwwij b enwqeiwqe npwqne o129en0921ne01230n12o3 021m3o12n3o  12p3m ', '300.00', '1557400906787_A-gray-cat-crying-looking-upset.jpg', 'Et godt billede af en sød kat', 0),
(10, 'Yes2 22 333', '3ewqwerwqrqrw 22 ', '400.00', '1557403769896_A-fluffy-cat-looking-funny-surprised-or-concerned.jpg', 'Et godt billede af en sød kat', 0);

-- --------------------------------------------------------

--
-- Struktur-dump for tabellen `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `name` varchar(84) NOT NULL,
  `email` varchar(200) NOT NULL,
  `username` varchar(84) NOT NULL,
  `password` text NOT NULL,
  `fk_user_role` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tilføj AUTO_INCREMENT i tabel `office_ads`
--
ALTER TABLE `office_ads`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Tilføj AUTO_INCREMENT i tabel `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Tilføj AUTO_INCREMENT i tabel `user_roles`
--
ALTER TABLE `user_roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
