-- phpMyAdmin SQL Dump
-- version 4.1.14
-- http://www.phpmyadmin.net
--
-- Počítač: 127.0.0.1
-- Vytvořeno: Úte 31. kvě 2016, 12:35
-- Verze serveru: 5.6.17
-- Verze PHP: 5.5.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Databáze: `bc`
--

-- --------------------------------------------------------

--
-- Struktura tabulky `farby`
--

CREATE TABLE IF NOT EXISTS `farby` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `slovom` varchar(40) COLLATE utf8_slovak_ci DEFAULT NULL,
  `atrament` varchar(40) COLLATE utf8_slovak_ci DEFAULT NULL,
  `jeModra` tinyint(1) NOT NULL DEFAULT '0',
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8 COLLATE=utf8_slovak_ci COMMENT='slovnik farieb a atramentu k nim prislusny' AUTO_INCREMENT=7 ;

--
-- Vypisuji data pro tabulku `farby`
--

INSERT INTO `farby` (`id`, `slovom`, `atrament`, `jeModra`) VALUES
(1, 'červená', 'E90919', 0),
(2, 'modrá', '2C04AB', 1),
(3, 'žltá', 'F8F000', 0),
(4, 'zelená', '05A705', 0),
(5, 'oranžová', 'F89000', 0),
(6, 'čierna', '000000', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `uspesnost_farba`
--

CREATE TABLE IF NOT EXISTS `uspesnost_farba` (
  `pocet` int(11) NOT NULL DEFAULT '0',
  `uzivatel_id` int(11) NOT NULL,
  `rgb` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovak_ci NOT NULL,
  `spravne` tinyint(1) NOT NULL,
  `slovom` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovak_ci NOT NULL,
  `datum` date NOT NULL,
  PRIMARY KEY (`uzivatel_id`,`rgb`,`spravne`,`datum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `uspesnost_farba`
--

INSERT INTO `uspesnost_farba` (`pocet`, `uzivatel_id`, `rgb`, `spravne`, `slovom`, `datum`) VALUES
(1, 1, '000000', 0, 'oranžová', '2016-05-03'),
(1, 1, '000000', 0, 'žltá', '2016-05-25'),
(1, 1, '000000', 1, 'čierna', '2016-05-03'),
(1, 1, '000000', 1, 'čierna', '2016-05-25'),
(3, 1, '000000', 1, 'čierna', '2016-05-28'),
(1, 1, '05A705', 0, 'červená', '2016-05-03'),
(2, 1, '05A705', 0, 'červená', '2016-05-28'),
(6, 1, '05A705', 1, 'zelená', '2016-05-03'),
(1, 1, '05A705', 1, 'zelená', '2016-05-25'),
(1, 1, '05A705', 1, 'zelená', '2016-05-28'),
(1, 1, '2C04AB', 0, 'oranžová', '2016-05-25'),
(4, 1, '2C04AB', 0, 'zelená', '2016-05-28'),
(5, 1, '2C04AB', 1, 'modrá', '2016-05-03'),
(2, 1, '2C04AB', 1, 'modrá', '2016-05-24'),
(1, 1, '2C04AB', 1, 'modrá', '2016-05-25'),
(1, 1, '2C04AB', 1, 'modrá', '2016-05-28'),
(1, 1, 'E90919', 0, 'oranžová', '2016-05-03'),
(2, 1, 'E90919', 0, 'zelená', '2016-05-28'),
(7, 1, 'E90919', 1, 'červená', '2016-05-03'),
(2, 1, 'E90919', 1, 'červená', '2016-05-25'),
(2, 1, 'F89000', 0, 'žltá', '2016-05-24'),
(5, 1, 'F89000', 0, 'červená', '2016-05-28'),
(4, 1, 'F89000', 1, 'oranžová', '2016-05-03'),
(1, 1, 'F89000', 1, 'oranžová', '2016-05-24'),
(1, 1, 'F89000', 1, 'oranžová', '2016-05-25'),
(5, 1, 'F89000', 1, 'oranžová', '2016-05-28'),
(1, 1, 'F8F000', 0, 'oranžová', '2016-05-25'),
(2, 1, 'F8F000', 0, 'modrá', '2016-05-28'),
(7, 1, 'F8F000', 1, 'žltá', '2016-05-03'),
(3, 1, 'F8F000', 1, 'žltá', '2016-05-28'),
(2, 2, '000000', 1, 'čierna', '2016-05-28'),
(3, 2, '000000', 1, 'čierna', '2016-05-29'),
(3, 2, '05A705', 0, 'žltá', '2016-05-28'),
(2, 2, '05A705', 1, 'zelená', '2016-05-28'),
(2, 2, '05A705', 1, 'zelená', '2016-05-29'),
(4, 2, '2C04AB', 0, 'zelená', '2016-05-28'),
(1, 2, '2C04AB', 0, 'čierna', '2016-05-29'),
(1, 2, '2C04AB', 1, 'modrá', '2016-05-28'),
(1, 2, '2C04AB', 1, 'modrá', '2016-05-29'),
(2, 2, 'E90919', 0, 'modrá', '2016-05-28'),
(6, 2, 'E90919', 1, 'červená', '2016-05-28'),
(3, 2, 'F89000', 0, 'červená', '2016-05-28'),
(2, 2, 'F89000', 0, 'žltá', '2016-05-29'),
(1, 2, 'F89000', 1, 'oranžová', '2016-05-28'),
(1, 2, 'F89000', 1, 'oranžová', '2016-05-29'),
(3, 2, 'F8F000', 0, 'modrá', '2016-05-28'),
(1, 2, 'F8F000', 1, 'žltá', '2016-05-28'),
(3, 6, '000000', 0, 'oranžová', '2016-05-28'),
(1, 6, '000000', 0, 'zelená', '2016-05-29'),
(1, 6, '000000', 1, 'čierna', '2016-05-03'),
(1, 6, '000000', 1, 'čierna', '2016-05-28'),
(2, 6, '05A705', 0, 'žltá', '2016-05-28'),
(1, 6, '05A705', 0, 'čierna', '2016-05-29'),
(1, 6, '05A705', 1, 'zelená', '2016-05-28'),
(2, 6, '05A705', 1, 'zelená', '2016-05-29'),
(1, 6, '2C04AB', 0, 'červená', '2016-05-29'),
(2, 6, '2C04AB', 1, 'modrá', '2016-05-03'),
(1, 6, '2C04AB', 1, 'modrá', '2016-05-29'),
(1, 6, 'E90919', 0, 'žltá', '2016-05-28'),
(1, 6, 'E90919', 0, 'zelená', '2016-05-29'),
(3, 6, 'E90919', 1, 'červená', '2016-05-03'),
(2, 6, 'F89000', 0, 'modrá', '2016-05-28'),
(1, 6, 'F89000', 0, 'zelená', '2016-05-29'),
(1, 6, 'F89000', 1, 'oranžová', '2016-05-03'),
(2, 6, 'F89000', 1, 'oranžová', '2016-05-28'),
(2, 6, 'F89000', 1, 'oranžová', '2016-05-29'),
(2, 6, 'F8F000', 0, 'červená', '2016-05-28'),
(1, 6, 'F8F000', 0, 'zelená', '2016-05-29'),
(1, 6, 'F8F000', 1, 'žltá', '2016-05-29'),
(1, 7, '000000', 0, 'žltá', '2016-05-24'),
(1, 7, '000000', 0, 'oranžová', '2016-05-25'),
(1, 7, '000000', 0, 'oranžová', '2016-05-29'),
(2, 7, '000000', 1, 'čierna', '2016-05-24'),
(1, 7, '000000', 1, 'čierna', '2016-05-25'),
(1, 7, '000000', 1, 'čierna', '2016-05-29'),
(1, 7, '05A705', 0, 'modrá', '2016-05-24'),
(2, 7, '05A705', 0, 'čierna', '2016-05-25'),
(2, 7, '05A705', 0, 'červená', '2016-05-29'),
(1, 7, '05A705', 1, 'zelená', '2016-05-25'),
(2, 7, '05A705', 1, 'zelená', '2016-05-29'),
(1, 7, '2C04AB', 0, 'čierna', '2016-05-25'),
(1, 7, '2C04AB', 1, 'modrá', '2016-05-24'),
(2, 7, '2C04AB', 1, 'modrá', '2016-05-25'),
(2, 7, 'E90919', 0, 'čierna', '2016-05-25'),
(2, 7, 'E90919', 0, 'modrá', '2016-05-29'),
(2, 7, 'E90919', 1, 'červená', '2016-05-24'),
(1, 7, 'E90919', 1, 'červená', '2016-05-25'),
(1, 7, 'E90919', 1, 'červená', '2016-05-29'),
(2, 7, 'F89000', 0, 'žltá', '2016-05-29'),
(1, 7, 'F89000', 1, 'oranžová', '2016-05-03'),
(1, 7, 'F89000', 1, 'oranžová', '2016-05-24'),
(2, 7, 'F8F000', 0, 'čierna', '2016-05-24'),
(1, 7, 'F8F000', 0, 'červená', '2016-05-25'),
(3, 7, 'F8F000', 0, 'modrá', '2016-05-29'),
(1, 7, 'F8F000', 1, 'žltá', '2016-05-24'),
(1, 8, '000000', 0, 'zelená', '2016-05-28'),
(4, 8, '000000', 1, 'čierna', '2016-05-03'),
(2, 8, '000000', 1, 'čierna', '2016-05-28'),
(1, 8, '05A705', 0, 'žltá', '2016-05-28'),
(3, 8, '05A705', 1, 'zelená', '2016-05-03'),
(1, 8, '05A705', 1, 'zelená', '2016-05-28'),
(2, 8, '05A705', 1, 'zelená', '2016-05-29'),
(2, 8, '2C04AB', 1, 'modrá', '2016-05-03'),
(1, 8, '2C04AB', 1, 'modrá', '2016-05-28'),
(1, 8, 'E90919', 0, 'žltá', '2016-05-28'),
(1, 8, 'E90919', 0, 'oranžová', '2016-05-29'),
(3, 8, 'E90919', 1, 'červená', '2016-05-03'),
(1, 8, 'E90919', 1, 'červená', '2016-05-28'),
(5, 8, 'E90919', 1, 'červená', '2016-05-29'),
(1, 8, 'F89000', 0, 'červená', '2016-05-29'),
(4, 8, 'F89000', 1, 'oranžová', '2016-05-03'),
(1, 8, 'F89000', 1, 'oranžová', '2016-05-29'),
(2, 8, 'F8F000', 0, 'červená', '2016-05-28'),
(3, 8, 'F8F000', 0, 'zelená', '2016-05-29'),
(3, 8, 'F8F000', 1, 'žltá', '2016-05-03'),
(1, 8, 'F8F000', 1, 'žltá', '2016-05-28');

-- --------------------------------------------------------

--
-- Struktura tabulky `uspesnost_zviera`
--

CREATE TABLE IF NOT EXISTS `uspesnost_zviera` (
  `uzivatel_id` int(11) NOT NULL,
  `telo` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovak_ci NOT NULL,
  `hlava` varchar(50) CHARACTER SET utf8 COLLATE utf8_slovak_ci NOT NULL,
  `pocet` int(11) NOT NULL,
  `spravne` int(11) NOT NULL DEFAULT '0',
  `datum` date NOT NULL,
  PRIMARY KEY (`uzivatel_id`,`telo`,`hlava`,`spravne`,`datum`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Vypisuji data pro tabulku `uspesnost_zviera`
--

INSERT INTO `uspesnost_zviera` (`uzivatel_id`, `telo`, `hlava`, `pocet`, `spravne`, `datum`) VALUES
(1, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-25'),
(1, 'kacka-telo.png', 'kacka-hlava.png', 5, 1, '2016-05-28'),
(1, 'kacka-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-25'),
(1, 'kacka-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-28'),
(1, 'krava-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-25'),
(1, 'krava-telo.png', 'krava-hlava.png', 5, 1, '2016-05-25'),
(1, 'krava-telo.png', 'krava-hlava.png', 1, 1, '2016-05-28'),
(1, 'krava-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-25'),
(1, 'krava-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-28'),
(1, 'ovca-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-28'),
(1, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-24'),
(1, 'ovca-telo.png', 'ovca-hlava.png', 1, 1, '2016-05-25'),
(1, 'ovca-telo.png', 'ovca-hlava.png', 1, 1, '2016-05-28'),
(1, 'ovca-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-25'),
(1, 'prasa-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-25'),
(1, 'prasa-telo.png', 'prasa-hlava.png', 3, 1, '2016-05-24'),
(1, 'prasa-telo.png', 'prasa-hlava.png', 1, 1, '2016-05-28'),
(1, 'prasa-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-28'),
(1, 'slimak-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-24'),
(1, 'slimak-telo.png', 'krava-hlava.png', 1, 0, '2016-05-25'),
(1, 'slimak-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-28'),
(1, 'slimak-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-28'),
(1, 'slimak-telo.png', 'slimak-hlava.png', 4, 1, '2016-05-24'),
(1, 'slimak-telo.png', 'slimak-hlava.png', 2, 1, '2016-05-25'),
(1, 'slimak-telo.png', 'slimak-hlava.png', 2, 1, '2016-05-28'),
(2, 'kacka-telo.png', 'krava-hlava.png', 1, 0, '2016-05-29'),
(2, 'kacka-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-28'),
(2, 'krava-telo.png', 'krava-hlava.png', 1, 1, '2016-05-29'),
(2, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-28'),
(2, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-29'),
(2, 'ovca-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-28'),
(2, 'prasa-telo.png', 'prasa-hlava.png', 2, 1, '2016-05-29'),
(2, 'slimak-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-29'),
(6, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-29'),
(6, 'kacka-telo.png', 'prasa-hlava.png', 2, 0, '2016-05-29'),
(6, 'kacka-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-29'),
(6, 'krava-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-29'),
(6, 'krava-telo.png', 'krava-hlava.png', 5, 1, '2016-05-28'),
(6, 'ovca-telo.png', 'krava-hlava.png', 1, 0, '2016-05-29'),
(6, 'ovca-telo.png', 'ovca-hlava.png', 4, 1, '2016-05-28'),
(6, 'ovca-telo.png', 'ovca-hlava.png', 1, 1, '2016-05-29'),
(6, 'ovca-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-29'),
(6, 'ovca-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-29'),
(6, 'prasa-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-29'),
(6, 'prasa-telo.png', 'krava-hlava.png', 1, 0, '2016-05-28'),
(6, 'prasa-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-28'),
(6, 'prasa-telo.png', 'prasa-hlava.png', 1, 1, '2016-05-28'),
(6, 'prasa-telo.png', 'prasa-hlava.png', 1, 1, '2016-05-29'),
(6, 'slimak-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-29'),
(6, 'slimak-telo.png', 'slimak-hlava.png', 2, 1, '2016-05-28'),
(7, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-24'),
(7, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-25'),
(7, 'krava-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-29'),
(7, 'krava-telo.png', 'krava-hlava.png', 1, 1, '2016-05-29'),
(7, 'krava-telo.png', 'ovca-hlava.png', 2, 0, '2016-05-24'),
(7, 'krava-telo.png', 'prasa-hlava.png', 2, 0, '2016-05-25'),
(7, 'krava-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-29'),
(7, 'ovca-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-24'),
(7, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-24'),
(7, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-25'),
(7, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-29'),
(7, 'ovca-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-24'),
(7, 'ovca-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-29'),
(7, 'prasa-telo.png', 'kacka-hlava.png', 2, 0, '2016-05-24'),
(7, 'prasa-telo.png', 'prasa-hlava.png', 2, 1, '2016-05-24'),
(7, 'prasa-telo.png', 'prasa-hlava.png', 1, 1, '2016-05-25'),
(7, 'prasa-telo.png', 'prasa-hlava.png', 4, 1, '2016-05-29'),
(7, 'slimak-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-25'),
(7, 'slimak-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-29'),
(7, 'slimak-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-24'),
(7, 'slimak-telo.png', 'prasa-hlava.png', 1, 0, '2016-05-25'),
(7, 'slimak-telo.png', 'slimak-hlava.png', 2, 1, '2016-05-25'),
(8, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-28'),
(8, 'kacka-telo.png', 'kacka-hlava.png', 2, 1, '2016-05-29'),
(8, 'kacka-telo.png', 'kacka-hlava.png', 1, 1, '2016-05-31'),
(8, 'kacka-telo.png', 'krava-hlava.png', 1, 0, '2016-05-28'),
(8, 'kacka-telo.png', 'krava-hlava.png', 1, 0, '2016-05-29'),
(8, 'kacka-telo.png', 'krava-hlava.png', 2, 0, '2016-05-31'),
(8, 'kacka-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-29'),
(8, 'kacka-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-29'),
(8, 'kacka-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-31'),
(8, 'krava-telo.png', 'krava-hlava.png', 1, 1, '2016-05-28'),
(8, 'krava-telo.png', 'krava-hlava.png', 3, 1, '2016-05-29'),
(8, 'krava-telo.png', 'krava-hlava.png', 2, 1, '2016-05-31'),
(8, 'krava-telo.png', 'ovca-hlava.png', 1, 0, '2016-05-28'),
(8, 'ovca-telo.png', 'krava-hlava.png', 1, 0, '2016-05-28'),
(8, 'ovca-telo.png', 'ovca-hlava.png', 1, 1, '2016-05-29'),
(8, 'ovca-telo.png', 'ovca-hlava.png', 2, 1, '2016-05-31'),
(8, 'ovca-telo.png', 'slimak-hlava.png', 2, 0, '2016-05-29'),
(8, 'prasa-telo.png', 'krava-hlava.png', 1, 0, '2016-05-29'),
(8, 'prasa-telo.png', 'krava-hlava.png', 1, 0, '2016-05-31'),
(8, 'prasa-telo.png', 'prasa-hlava.png', 2, 1, '2016-05-29'),
(8, 'prasa-telo.png', 'prasa-hlava.png', 1, 1, '2016-05-31'),
(8, 'prasa-telo.png', 'slimak-hlava.png', 1, 0, '2016-05-28'),
(8, 'slimak-telo.png', 'kacka-hlava.png', 1, 0, '2016-05-29'),
(8, 'slimak-telo.png', 'slimak-hlava.png', 2, 1, '2016-05-29');

-- --------------------------------------------------------

--
-- Struktura tabulky `uzivatelia`
--

CREATE TABLE IF NOT EXISTS `uzivatelia` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `meno` varchar(50) DEFAULT NULL,
  `jeUcitel` tinyint(1) NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='zakladne info o hracovi' AUTO_INCREMENT=9 ;

--
-- Vypisuji data pro tabulku `uzivatelia`
--

INSERT INTO `uzivatelia` (`id`, `meno`, `jeUcitel`) VALUES
(1, 'Katka Moravcova', 0),
(2, 'Janko Novak', 0),
(5, 'Veronika Dikosova Ucitelka', 1),
(6, 'Daniel Moravec', 0),
(7, 'Jaroslav Moravec', 0),
(8, 'Peter Cvopa', 0);

-- --------------------------------------------------------

--
-- Struktura tabulky `zvierata`
--

CREATE TABLE IF NOT EXISTS `zvierata` (
  `id` bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  `popis` varchar(100) NOT NULL,
  `hlava` varchar(100) NOT NULL,
  `telo` varchar(100) NOT NULL,
  UNIQUE KEY `id` (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=latin1 COMMENT='zvieratka-Stroop effect' AUTO_INCREMENT=6 ;

--
-- Vypisuji data pro tabulku `zvierata`
--

INSERT INTO `zvierata` (`id`, `popis`, `hlava`, `telo`) VALUES
(1, 'krava', 'krava-hlava.png', 'krava-telo.png'),
(2, 'ovca', 'ovca-hlava.png', 'ovca-telo.png'),
(3, 'slimak', 'slimak-hlava.png', 'slimak-telo.png'),
(4, 'prasa', 'prasa-hlava.png', 'prasa-telo.png'),
(5, 'kacka', 'kacka-hlava.png', 'kacka-telo.png');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
